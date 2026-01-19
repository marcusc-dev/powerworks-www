'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  VoiceAssistantState,
  Message,
  VoiceAgentRequest,
  VoiceAgentResponse,
} from './types';

// Generate a simple UUID for session tracking
function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Check for speech recognition support
function getSpeechRecognition(): typeof SpeechRecognition | null {
  if (typeof window === 'undefined') return null;
  return (
    (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition ||
    null
  );
}

// Check for speech synthesis support
function hasSpeechSynthesis(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

// Get a good quality voice (prefer natural-sounding voices)
function getBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Prefer premium/natural voices - these typically have better quality
  const preferredVoices = [
    // Google voices (usually better quality)
    'Google UK English Male',
    'Google UK English Female',
    // Microsoft neural voices (Edge/Windows 11)
    'Microsoft Ryan Online (Natural)',
    'Microsoft Sonia Online (Natural)',
    'Microsoft George Online (Natural)',
    // macOS voices
    'Daniel',
    'Oliver',
    'Samantha',
    // Generic good options
    'en-GB',
  ];

  // First try to find a specifically named premium voice
  for (const preferred of preferredVoices) {
    const voice = voices.find(
      (v) => v.name.includes(preferred) || (preferred === 'en-GB' && v.lang === 'en-GB')
    );
    if (voice) return voice;
  }

  // Fall back to any British English voice
  const britishVoice = voices.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
  if (britishVoice) return britishVoice;

  // Fall back to any English voice
  const englishVoice = voices.find((v) => v.lang.startsWith('en'));
  return englishVoice || null;
}

const initialState: VoiceAssistantState = {
  isOpen: false,
  status: 'idle',
  messages: [],
  safetyFlag: 'none',
  bookingIntent: 'low',
  leadCapture: {
    consent_requested: false,
    consent_granted: false,
  },
  contactPrefill: {},
  currentTranscript: '',
  error: null,
  speechSupported: false,
};

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceAssistantState>(initialState);
  const pathname = usePathname();

  const sessionIdRef = useRef<string>(generateSessionId());
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const voicesLoadedRef = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cloudTtsAvailableRef = useRef<boolean | null>(null); // null = not checked yet

  // Initialize speech APIs on mount
  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    const hasRecognition = !!SpeechRecognitionClass;
    const hasSynth = hasSpeechSynthesis();

    setState((prev) => ({
      ...prev,
      speechSupported: hasRecognition || hasSynth,
    }));

    if (hasRecognition) {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-GB';
      recognitionRef.current = recognition;
    }

    if (hasSynth) {
      synthRef.current = window.speechSynthesis;

      // Voices may not be loaded immediately - wait for them
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length > 0) {
          selectedVoiceRef.current = getBestVoice(voices);
          voicesLoadedRef.current = true;
        }
      };

      // Try immediately (might work in some browsers)
      loadVoices();

      // Also listen for voiceschanged event (Chrome needs this)
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      // Cleanup
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore errors on cleanup
        }
      }
      if (synthRef.current) {
        synthRef.current.cancel();
        synthRef.current.onvoiceschanged = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Open/close panel
  const openPanel = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const closePanel = useCallback(() => {
    // Stop any ongoing speech/recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState((prev) => ({
      ...prev,
      isOpen: false,
      status: 'idle',
      currentTranscript: '',
    }));
  }, []);

  // Add a message to the conversation
  const addMessage = useCallback((role: 'user' | 'assistant', content: string): Message => {
    const message: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    return message;
  }, []);

  // Send message to API
  const sendToAgent = useCallback(
    async (text: string): Promise<VoiceAgentResponse | null> => {
      // Abort any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setState((prev) => ({ ...prev, status: 'thinking', error: null }));

      try {
        const request: VoiceAgentRequest = {
          sessionId: sessionIdRef.current,
          text,
          pageContext: pathname,
          history: state.messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        };

        const response = await fetch('/api/voice-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Request failed: ${response.status}`);
        }

        const data: VoiceAgentResponse = await response.json();

        // Update state with response data
        setState((prev) => ({
          ...prev,
          safetyFlag: data.safety_flag,
          bookingIntent: data.booking_intent,
          leadCapture: {
            ...prev.leadCapture,
            ...data.lead_capture,
          },
          contactPrefill: {
            ...prev.contactPrefill,
            ...data.contact_prefill,
          },
          bookingConfirmation: data.booking_confirmation,
          // If booking is confirmed, update status
          ...(data.booking_confirmation?.confirmed ? { status: 'booking_confirmed' as const } : {}),
        }));

        return data;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return null;
        }

        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: errorMessage,
        }));
        return null;
      }
    },
    [pathname, state.messages]
  );

  // Speak text using Cloud TTS (with browser fallback)
  const speakWithCloudTTS = useCallback(async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok || data.fallback) {
        // Cloud TTS not available, mark as unavailable
        cloudTtsAvailableRef.current = false;
        throw new Error('Cloud TTS not available');
      }

      // Cloud TTS is available
      cloudTtsAvailableRef.current = true;

      // Create audio element and play
      const audioData = `data:${data.contentType};base64,${data.audio}`;

      return new Promise((resolve, reject) => {
        const audio = new Audio(audioData);
        audioRef.current = audio;

        audio.onended = () => {
          setState((prev) => ({ ...prev, status: 'idle' }));
          audioRef.current = null;
          resolve();
        };

        audio.onerror = () => {
          setState((prev) => ({ ...prev, status: 'idle' }));
          audioRef.current = null;
          reject(new Error('Audio playback failed'));
        };

        setState((prev) => ({ ...prev, status: 'speaking' }));
        audio.play().catch(reject);
      });
    } catch {
      // Throw to trigger fallback
      throw new Error('Cloud TTS failed');
    }
  }, []);

  // Speak text using browser TTS (fallback)
  const speakWithBrowserTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!synthRef.current) {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      } else {
        const voices = synthRef.current.getVoices();
        const bestVoice = getBestVoice(voices);
        if (bestVoice) {
          utterance.voice = bestVoice;
          selectedVoiceRef.current = bestVoice;
        }
      }

      utterance.onend = () => {
        setState((prev) => ({ ...prev, status: 'idle' }));
        resolve();
      };

      utterance.onerror = (event) => {
        if (event.error === 'interrupted' || event.error === 'canceled') {
          resolve();
        } else {
          setState((prev) => ({ ...prev, status: 'idle' }));
          reject(new Error(event.error));
        }
      };

      utteranceRef.current = utterance;
      setState((prev) => ({ ...prev, status: 'speaking' }));
      synthRef.current.speak(utterance);
    });
  }, []);

  // Main speak function - tries Cloud TTS first, falls back to browser
  const speak = useCallback(async (text: string): Promise<void> => {
    // If we already know Cloud TTS is unavailable, skip it
    if (cloudTtsAvailableRef.current === false) {
      return speakWithBrowserTTS(text);
    }

    try {
      await speakWithCloudTTS(text);
    } catch {
      // Fall back to browser TTS
      console.log('Cloud TTS unavailable, using browser fallback');
      return speakWithBrowserTTS(text);
    }
  }, [speakWithCloudTTS, speakWithBrowserTTS]);

  // Process user input (voice or text)
  const processUserInput = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Add user message
      addMessage('user', text.trim());

      // Send to API
      const response = await sendToAgent(text.trim());

      if (response) {
        // Combine spoken response with follow-up question
        const fullResponse = response.follow_up_question
          ? `${response.spoken_response} ${response.follow_up_question}`
          : response.spoken_response;

        // Add assistant message
        addMessage('assistant', fullResponse);

        // Speak the response
        try {
          await speak(fullResponse);
        } catch {
          // TTS failed, but message is still shown
          setState((prev) => ({ ...prev, status: 'idle' }));
        }
      }
    },
    [addMessage, sendToAgent, speak]
  );

  // Start voice recognition
  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setState((prev) => ({
        ...prev,
        error: 'Voice recognition is not supported in your browser. Please type your message.',
      }));
      return;
    }

    // Stop any ongoing TTS
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    setState((prev) => ({
      ...prev,
      status: 'listening',
      currentTranscript: '',
      error: null,
    }));

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setState((prev) => ({ ...prev, currentTranscript: transcript }));

      // If final result, process it
      if (event.results[event.results.length - 1].isFinal) {
        processUserInput(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed') {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Microphone access denied. Please allow microphone access or type your message.',
        }));
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: `Speech recognition error: ${event.error}`,
        }));
      } else {
        setState((prev) => ({ ...prev, status: 'idle' }));
      }
    };

    recognition.onend = () => {
      // Only set to idle if we're still in listening state
      setState((prev) => {
        if (prev.status === 'listening') {
          return { ...prev, status: 'idle' };
        }
        return prev;
      });
    };

    try {
      recognition.start();
    } catch (error) {
      // Recognition might already be running
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: 'Failed to start voice recognition. Please try again.',
      }));
    }
  }, [processUserInput]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setState((prev) => ({ ...prev, status: 'idle' }));
  }, []);

  // Send text message (for fallback input)
  const sendTextMessage = useCallback(
    (text: string) => {
      processUserInput(text);
    },
    [processUserInput]
  );

  // Reset conversation
  const resetConversation = useCallback(() => {
    sessionIdRef.current = generateSessionId();
    setState((prev) => ({
      ...initialState,
      isOpen: prev.isOpen,
      speechSupported: prev.speechSupported,
    }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
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
