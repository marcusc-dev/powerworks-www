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

interface GeminiClientContentMessage {
  clientContent: {
    turns: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }>;
    turnComplete: boolean;
  };
}

export type LiveStatus = 'disconnected' | 'connecting' | 'connected' | 'thinking' | 'error';

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

  // Refs for WebSocket
  const wsRef = useRef<WebSocket | null>(null);
  const configRef = useRef<GeminiLiveConfig | null>(null);
  const sessionActiveRef = useRef<boolean>(false);
  const currentResponseRef = useRef<string>('');

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

  // Handle function calls from Gemini
  const handleFunctionCall = useCallback(async (functionCall: { name: string; args?: Record<string, string>; id?: string }) => {
    console.log('handleFunctionCall called with:', JSON.stringify(functionCall));

    if (functionCall.name === 'send_booking_email') {
      let args = functionCall.args || {};
      if (typeof args === 'string') {
        try {
          args = JSON.parse(args);
        } catch (e) {
          console.error('Failed to parse function args:', e);
        }
      }
      console.log('Processing booking email with args:', args);

      const currentMessages = state.messages;
      const transcript = currentMessages
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'Glenn'}: ${msg.content}`)
        .join('\n\n');

      try {
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
            issue_summary: args.issue_summary || 'Chat conversation inquiry',
            page_context: pathname,
            conversation_transcript: transcript,
          }),
        });

        const bookingResult = await bookingResponse.json();
        console.log('Booking API response:', bookingResult);

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
          wsRef.current.send(JSON.stringify(toolResponse));
        }
      } catch (error) {
        console.error('Failed to process booking:', error);

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
      let data;
      if (event.data instanceof Blob) {
        const text = await event.data.text();
        data = JSON.parse(text);
      } else {
        data = JSON.parse(event.data);
      }

      const logData = JSON.stringify(data);
      if (logData.length > 500) {
        console.log('Gemini message received (truncated):', logData.substring(0, 500) + '...');
      } else {
        console.log('Gemini message received:', logData);
      }

      if (data.toolCall) {
        console.log('TOOL CALL DETECTED:', JSON.stringify(data.toolCall));
      }
      if (data.serverContent?.modelTurn?.parts) {
        for (const part of data.serverContent.modelTurn.parts) {
          if (part.functionCall) {
            console.log('FUNCTION CALL IN PARTS:', JSON.stringify(part.functionCall));
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

      // Server content (text)
      if (data.serverContent) {
        const { modelTurn, turnComplete } = data.serverContent;

        if (modelTurn?.parts) {
          for (const part of modelTurn.parts) {
            // Text response - stream it
            if (part.text) {
              currentResponseRef.current += part.text;
              setState(prev => ({ ...prev, currentTranscript: currentResponseRef.current, status: 'thinking' }));
            }

            // Function call in parts
            if (part.functionCall) {
              console.log('Function call in parts:', part.functionCall);
              await handleFunctionCall(part.functionCall);
            }
          }
        }

        // Turn complete - finalize response
        if (turnComplete) {
          if (currentResponseRef.current.trim()) {
            addMessage('assistant', currentResponseRef.current.trim());
            currentResponseRef.current = '';
          }
          setState(prev => ({ ...prev, currentTranscript: '', status: 'connected' }));
        }
      }

      // Tool calls (alternative format - array at root level)
      if (data.toolCall) {
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
  }, [addMessage, pathname, handleFunctionCall]);

  // Initialize connection
  const connect = useCallback(async () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setState(prev => ({ ...prev, status: 'connecting', error: null }));

    try {
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

      const ws = new WebSocket(config.wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected to Gemini Live');

        // Send setup message with TEXT modality only (no audio)
        const setupMessage = {
          setup: {
            model: `models/${config.model}`,
            generationConfig: {
              responseModalities: ['TEXT'],
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

    addMessage('user', text);
    setState(prev => ({ ...prev, status: 'thinking' }));

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
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      connect();
    }
  }, [connect]);

  // Close panel
  const closePanel = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Panel closed');
      wsRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isOpen: false,
      status: 'disconnected',
      currentTranscript: '',
    }));
  }, []);

  // Reset conversation
  const resetConversation = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Reset');
      wsRef.current = null;
    }

    sessionActiveRef.current = false;
    currentResponseRef.current = '';

    setState(prev => ({
      ...prev,
      messages: [],
      currentTranscript: '',
      status: 'disconnected',
      error: null,
    }));

    connect();
  }, [connect]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    state,
    openPanel,
    closePanel,
    sendTextMessage,
    resetConversation,
    clearError,
    pathname,
  };
}
