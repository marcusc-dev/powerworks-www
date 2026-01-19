'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Types for Gemini Live API
interface GeminiLiveConfig {
  wsUrl: string;
  systemPrompt: string;
  model: string;
}

interface GeminiSetupMessage {
  setup: {
    model: string;
    generationConfig: {
      responseModalities: string | string[];
      speechConfig?: {
        voiceConfig?: {
          prebuiltVoiceConfig?: {
            voiceName: string;
          };
        };
      };
    };
    systemInstruction?: {
      parts: Array<{ text: string }>;
    };
    tools?: Array<{
      functionDeclarations: Array<{
        name: string;
        description: string;
        parameters: {
          type: string;
          properties: Record<string, { type: string; description: string }>;
          required: string[];
        };
      }>;
    }>;
  };
}

// Booking tool declaration
const BOOKING_TOOL = {
  functionDeclarations: [
    {
      name: 'send_booking_email',
      description: 'Send a booking notification email to Powerworks Garage. CRITICAL: You MUST have collected BOTH the customer name AND their phone number (with actual digits like 050-xxx-xxxx) BEFORE calling this function. Do NOT call this function until you have asked for and received the phone number.',
      parameters: {
        type: 'object',
        properties: {
          customer_name: {
            type: 'string',
            description: 'The customer\'s full name (REQUIRED - must have been explicitly stated by customer)',
          },
          customer_phone: {
            type: 'string',
            description: 'The customer\'s phone number with digits (REQUIRED - must be actual phone number like 050-123-4567, NOT empty)',
          },
          customer_email: {
            type: 'string',
            description: 'The customer\'s email address (optional)',
          },
          service_type: {
            type: 'string',
            description: 'The type of service requested (e.g., AC repair, oil change, brake service)',
          },
          vehicle: {
            type: 'string',
            description: 'The customer\'s vehicle make/model if mentioned',
          },
          requested_time: {
            type: 'string',
            description: 'When the customer wants to come in (e.g., tomorrow morning, next week)',
          },
          issue_summary: {
            type: 'string',
            description: 'Brief summary of the customer\'s issue or reason for booking',
          },
        },
        required: ['customer_name', 'customer_phone', 'service_type', 'issue_summary'],
      },
    },
  ],
};

interface GeminiRealtimeInputMessage {
  realtimeInput: {
    mediaChunks: Array<{
      mimeType: string;
      data: string;
    }>;
  };
}

interface GeminiClientContentMessage {
  clientContent: {
    turns: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }>;
    turnComplete: boolean;
  };
}

export type LiveStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'thinking' | 'speaking' | 'error';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface GeminiLiveState {
  isOpen: boolean;
  status: LiveStatus;
  messages: Message[];
  currentTranscript: string;
  error: string | null;
}

const initialState: GeminiLiveState = {
  isOpen: false,
  status: 'disconnected',
  messages: [],
  currentTranscript: '',
  error: null,
};

export function useGeminiLive() {
  const [state, setState] = useState<GeminiLiveState>(initialState);
  const pathname = usePathname();

  // Refs for WebSocket and audio
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const configRef = useRef<GeminiLiveConfig | null>(null);
  const sessionActiveRef = useRef<boolean>(false);
  const currentResponseRef = useRef<string>('');
  const inputTranscriptRef = useRef<string>('');

  // Generate unique message ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add message to state
  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: Message = {
      id: generateId(),
      role,
      content,
      timestamp: Date.now(),
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    return message;
  }, []);

  // Play audio from PCM data (24kHz Int16)
  const playAudio = useCallback(async (pcmData: ArrayBuffer) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }

    const ctx = audioContextRef.current;

    // Convert Int16 PCM to Float32
    const int16Array = new Int16Array(pcmData);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    // Create audio buffer
    const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    // Play
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();

    return new Promise<void>(resolve => {
      source.onended = () => resolve();
    });
  }, []);

  // Process audio queue
  const processAudioQueue = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;
    setState(prev => ({ ...prev, status: 'speaking' }));

    while (audioQueueRef.current.length > 0) {
      const audioData = audioQueueRef.current.shift();
      if (audioData) {
        await playAudio(audioData);
      }
    }

    isPlayingRef.current = false;

    // If we have accumulated response text, add it as a message
    if (currentResponseRef.current.trim()) {
      addMessage('assistant', currentResponseRef.current.trim());
      currentResponseRef.current = '';
    }

    setState(prev => ({ ...prev, status: 'connected' }));
  }, [playAudio, addMessage]);

  // Handle function calls from Gemini
  const handleFunctionCall = useCallback(async (functionCall: { name: string; args?: Record<string, string>; id?: string }) => {
    console.log('handleFunctionCall called with:', JSON.stringify(functionCall));

    if (functionCall.name === 'send_booking_email') {
      // Parse args - Gemini might send them as a string or object
      let args = functionCall.args || {};
      if (typeof args === 'string') {
        try {
          args = JSON.parse(args);
        } catch (e) {
          console.error('Failed to parse function args:', e);
        }
      }
      console.log('Processing booking email with args:', args);

      // Get the current conversation transcript from state
      // We need to use a ref-based approach since this is in a callback
      const currentMessages = state.messages;
      const transcript = currentMessages
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'Glenn'}: ${msg.content}`)
        .join('\n\n');

      try {
        // Call the booking API endpoint
        const bookingResponse = await fetch('/api/voice-live-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: args.customer_name || 'Unknown',
            customer_phone: args.customer_phone || 'Not provided',
            customer_email: args.customer_email,
            service_type: args.service_type || 'General inquiry',
            vehicle: args.vehicle,
            requested_time: args.requested_time,
            issue_summary: args.issue_summary || 'Voice conversation inquiry',
            page_context: pathname,
            conversation_transcript: transcript,
          }),
        });

        const bookingResult = await bookingResponse.json();
        console.log('Booking API response:', bookingResult);

        // Send tool response back to Gemini
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const toolResponse = {
            toolResponse: {
              functionResponses: [{
                id: functionCall.id || functionCall.name,
                name: functionCall.name,
                response: {
                  success: bookingResult.success,
                  message: bookingResult.success
                    ? 'Booking notification sent successfully to the Powerworks team.'
                    : 'Failed to send booking notification.',
                },
              }],
            },
          };
          console.log('Sending tool response:', toolResponse);
          wsRef.current.send(JSON.stringify(toolResponse));
        }
      } catch (error) {
        console.error('Failed to process booking:', error);

        // Send error response back to Gemini
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const toolResponse = {
            toolResponse: {
              functionResponses: [{
                id: functionCall.id || functionCall.name,
                name: functionCall.name,
                response: {
                  success: false,
                  message: 'Failed to send booking notification due to a technical error.',
                },
              }],
            },
          };
          wsRef.current.send(JSON.stringify(toolResponse));
        }
      }
    }
  }, [pathname, state.messages]);

  // Handle WebSocket messages
  const handleMessage = useCallback(async (event: MessageEvent) => {
    try {
      // Handle binary data (audio) vs text (JSON)
      let data;
      if (event.data instanceof Blob) {
        const text = await event.data.text();
        data = JSON.parse(text);
      } else {
        data = JSON.parse(event.data);
      }
      // Log full message for debugging (truncated for large audio data)
      const logData = JSON.stringify(data);
      if (logData.length > 500) {
        console.log('Gemini message received (truncated):', logData.substring(0, 500) + '...');
      } else {
        console.log('Gemini message received:', logData);
      }

      // Log specific message types
      if (data.toolCall) {
        console.log('🔧 TOOL CALL DETECTED:', JSON.stringify(data.toolCall));
      }
      if (data.serverContent?.modelTurn?.parts) {
        for (const part of data.serverContent.modelTurn.parts) {
          if (part.functionCall) {
            console.log('🔧 FUNCTION CALL IN PARTS:', JSON.stringify(part.functionCall));
          }
        }
      }

      // Setup complete
      if (data.setupComplete) {
        console.log('Gemini Live session setup complete');
        sessionActiveRef.current = true;
        setState(prev => ({ ...prev, status: 'connected' }));
        return;
      }

      // Server content (text or audio)
      if (data.serverContent) {
        const { modelTurn, turnComplete } = data.serverContent;

        if (modelTurn?.parts) {
          for (const part of modelTurn.parts) {
            // Text response
            if (part.text) {
              currentResponseRef.current += part.text;
              setState(prev => ({ ...prev, currentTranscript: currentResponseRef.current }));
            }

            // Audio response (base64 encoded PCM)
            if (part.inlineData?.mimeType?.includes('audio') && part.inlineData?.data) {
              const binaryString = atob(part.inlineData.data);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              audioQueueRef.current.push(bytes.buffer);
              processAudioQueue();
            }

            // Function call in parts (Gemini Live API format)
            if (part.functionCall) {
              console.log('Function call in parts:', part.functionCall);
              await handleFunctionCall(part.functionCall);
            }
          }
        }

        // Turn complete - finalize response
        if (turnComplete) {
          if (currentResponseRef.current.trim() && !isPlayingRef.current) {
            addMessage('assistant', currentResponseRef.current.trim());
            currentResponseRef.current = '';
          }
          setState(prev => ({ ...prev, currentTranscript: '', status: 'connected' }));
        }
      }

      // Input transcription (what the user said)
      if (data.serverContent?.inputTranscript) {
        inputTranscriptRef.current = data.serverContent.inputTranscript;
        addMessage('user', data.serverContent.inputTranscript);
      }

      // Tool calls (alternative format - array at root level)
      if (data.toolCall) {
        console.log('Tool call received (root level):', data.toolCall);
        const functionCalls = data.toolCall.functionCalls || [];
        for (const fc of functionCalls) {
          await handleFunctionCall(fc);
        }
      }

      // Error
      if (data.error) {
        console.error('Gemini Live error:', data.error);
        setState(prev => ({
          ...prev,
          status: 'error',
          error: data.error.message || 'An error occurred',
        }));
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }, [addMessage, processAudioQueue, pathname, handleFunctionCall]);

  // Initialize connection
  const connect = useCallback(async () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setState(prev => ({ ...prev, status: 'connecting', error: null }));

    try {
      // Get connection config from API
      const response = await fetch('/api/voice-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageContext: pathname }),
      });

      if (!response.ok) {
        throw new Error('Failed to get connection config');
      }

      const config: GeminiLiveConfig = await response.json();
      configRef.current = config;

      // Create WebSocket connection
      const ws = new WebSocket(config.wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected to Gemini Live');

        // Send setup message with correct format per Gemini Live API docs
        // Using AUDIO modality with tools for function calling
        const setupMessage = {
          setup: {
            model: `models/${config.model}`,
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: 'Puck', // Male voice
                  },
                },
              },
            },
            systemInstruction: {
              parts: [{ text: config.systemPrompt }],
            },
            tools: [BOOKING_TOOL],
          },
        };

        console.log('Sending setup message:', JSON.stringify(setupMessage).substring(0, 500));
        ws.send(JSON.stringify(setupMessage));
      };

      ws.onmessage = handleMessage;

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setState(prev => ({
          ...prev,
          status: 'error',
          error: 'Connection error. Please try again.',
        }));
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        sessionActiveRef.current = false;

        if (event.code !== 1000) {
          // Common error codes:
          // 1006 = Abnormal closure (no close frame received)
          // 1008 = Policy violation
          // 1011 = Server error
          const errorMessages: Record<number, string> = {
            1006: 'Connection failed. Check your internet connection.',
            1008: 'Connection rejected by server. API key may be invalid.',
            1011: 'Server error. Please try again.',
          };
          const errorMsg = errorMessages[event.code] || `Connection lost (${event.code}). Tap to reconnect.`;
          setState(prev => ({
            ...prev,
            status: 'disconnected',
            error: errorMsg,
          }));
        } else {
          setState(prev => ({ ...prev, status: 'disconnected' }));
        }
      };
    } catch (error) {
      console.error('Connection failed:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Failed to connect. Please try again.',
      }));
    }
  }, [pathname, handleMessage]);

  // Start listening (microphone capture)
  const startListening = useCallback(async () => {
    // Ensure connected first
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      await connect();
      // Wait for connection
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!sessionActiveRef.current) {
      console.log('Session not active yet, waiting...');
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      mediaStreamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      // Load audio worklet
      await audioContext.audioWorklet.addModule('/audio-processor.js');

      // Create worklet node
      const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
      workletNodeRef.current = workletNode;

      // Handle processed audio from worklet
      workletNode.port.onmessage = (event) => {
        if (event.data.type === 'audio' && wsRef.current?.readyState === WebSocket.OPEN) {
          // Convert ArrayBuffer to base64
          const bytes = new Uint8Array(event.data.audio);
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64Audio = btoa(binary);

          // Send to Gemini
          const message: GeminiRealtimeInputMessage = {
            realtimeInput: {
              mediaChunks: [{
                mimeType: 'audio/pcm;rate=16000',
                data: base64Audio,
              }],
            },
          };

          wsRef.current.send(JSON.stringify(message));
        }
      };

      // Connect microphone to worklet
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(workletNode);

      setState(prev => ({ ...prev, status: 'listening', error: null }));
    } catch (error) {
      console.error('Failed to start listening:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Microphone access denied. Please allow microphone access.',
      }));
    }
  }, [connect]);

  // Stop listening
  const stopListening = useCallback(() => {
    // Stop microphone
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Disconnect worklet
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    setState(prev => ({
      ...prev,
      status: sessionActiveRef.current ? 'connected' : 'disconnected',
    }));
  }, []);

  // Send text message
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Ensure connected
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      await connect();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Not connected. Please try again.',
      }));
      return;
    }

    // Add user message
    addMessage('user', text);
    setState(prev => ({ ...prev, status: 'thinking' }));

    // Send to Gemini
    const message: GeminiClientContentMessage = {
      clientContent: {
        turns: [{
          role: 'user',
          parts: [{ text }],
        }],
        turnComplete: true,
      },
    };

    wsRef.current.send(JSON.stringify(message));
  }, [connect, addMessage]);

  // Open panel
  const openPanel = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
    // Auto-connect when panel opens
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      connect();
    }
  }, [connect]);

  // Close panel
  const closePanel = useCallback(() => {
    stopListening();

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close(1000, 'Panel closed');
      wsRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isOpen: false,
      status: 'disconnected',
      currentTranscript: '',
    }));
  }, [stopListening]);

  // Reset conversation
  const resetConversation = useCallback(() => {
    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close(1000, 'Reset');
      wsRef.current = null;
    }

    sessionActiveRef.current = false;
    currentResponseRef.current = '';
    audioQueueRef.current = [];

    setState(prev => ({
      ...prev,
      messages: [],
      currentTranscript: '',
      status: 'disconnected',
      error: null,
    }));

    // Reconnect
    connect();
  }, [connect]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect();
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    state,
    openPanel,
    closePanel,
    startListening,
    stopListening,
    sendTextMessage,
    resetConversation,
    clearError,
    pathname,
  };
}
