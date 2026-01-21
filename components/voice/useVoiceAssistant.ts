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
  const speechRecognitionSupportedRef = useRef<boolean>(false);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const isProcessingRef = useRef<boolean>(false);

  // Create a fresh speech recognition instance (Chrome needs this for each session)
  const createRecognition = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (!SpeechRecognitionClass) return null;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true; // Keep listening until manually stopped
    recognition.interimResults = true;
    recognition.lang = 'en-GB';
    recognition.maxAlternatives = 1;
    return recognition;
  }, []);

  // Initialize speech APIs on mount
  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    const hasRecognition = !!SpeechRecognitionClass;
    const hasSynth = hasSpeechSynthesis();

    speechRecognitionSupportedRef.current = hasRecognition;

    setState((prev) => ({
      ...prev,
      speechSupported: hasRecognition || hasSynth,
    }));

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
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
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
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    // Reset refs
    finalTranscriptRef.current = '';
    isProcessingRef.current = false;

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
        // Cloud TTS not available, mark as unavailable for future calls
        cloudTtsAvailableRef.current = false;
        // Return rejected promise to trigger fallback (not a real error)
        return Promise.reject('fallback');
      }

      // Cloud TTS is available
      cloudTtsAvailableRef.current = true;

      // Create audio element and play
      const audioData = `data:${data.contentType};base64,${data.audio}`;

      return new Promise((resolve, reject) => {
        const audio = new Audio(audioData);
        audioRef.current = audio;

        const cleanup = () => {
          console.log('Cloud TTS finished, setting status to idle');
          setState((prev) => ({ ...prev, status: 'idle' }));
          audioRef.current = null;
        };

        audio.onended = () => {
          cleanup();
          resolve();
        };

        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          cleanup();
          reject(new Error('Audio playback failed'));
        };

        // Fallback timeout in case onended doesn't fire
        audio.onloadedmetadata = () => {
          const duration = audio.duration;
          if (duration && isFinite(duration)) {
            // Set a timeout slightly longer than the audio duration
            setTimeout(() => {
              if (audioRef.current === audio) {
                console.log('Cloud TTS timeout cleanup');
                cleanup();
                resolve();
              }
            }, (duration * 1000) + 500);
          }
        };

        setState((prev) => ({ ...prev, status: 'speaking' }));
        audio.play().catch((err) => {
          console.error('Audio play failed:', err);
          cleanup();
          reject(err);
        });
      });
    } catch (err) {
      // Only log actual errors, not expected fallbacks
      if (err !== 'fallback') {
        console.log('Cloud TTS unavailable, will use browser fallback');
      }
      // Reject to trigger fallback
      return Promise.reject('fallback');
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
      // Fall back to browser TTS silently (Cloud TTS logs handled in speakWithCloudTTS)
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
        // Combine spoken response with follow-up question (avoid duplicates)
        let fullResponse = response.spoken_response;
        if (response.follow_up_question && response.follow_up_question.trim()) {
          // Normalize both strings for comparison
          const normalizeForComparison = (str: string) => {
            return str
              .toLowerCase()
              .trim()
              // Remove punctuation
              .replace(/[?.!,]/g, '')
              // Normalize common phrases
              .replace(/what can i help you with/g, 'how can i help')
              .replace(/how can i assist/g, 'how can i help')
              .replace(/what seems to be/g, 'what is')
              .replace(/what's/g, 'what is')
              // Remove extra spaces
              .replace(/\s+/g, ' ');
          };

          const normalizedSpoken = normalizeForComparison(response.spoken_response);
          const normalizedFollowUp = normalizeForComparison(response.follow_up_question);

          // Check if follow-up is semantically similar to what's already in the response
          const isSimilar = normalizedSpoken.includes(normalizedFollowUp) ||
                           normalizedFollowUp.includes(normalizedSpoken) ||
                           // Check for common question patterns that might already be in the response
                           (normalizedSpoken.includes('how can i help') && normalizedFollowUp.includes('how can i help')) ||
                           (normalizedSpoken.includes('what is wrong') && normalizedFollowUp.includes('what is wrong')) ||
                           (normalizedSpoken.includes('tell me more') && normalizedFollowUp.includes('tell me more'));

          if (!isSimilar) {
            fullResponse = `${response.spoken_response} ${response.follow_up_question}`;
          }
        }

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
  const startListening = useCallback(async () => {
    if (!speechRecognitionSupportedRef.current) {
      setState((prev) => ({
        ...prev,
        error: 'Voice recognition is not supported in your browser. Please type your message.',
      }));
      return;
    }

    // On localhost (even HTTP), browsers typically allow microphone access
    // Skip the explicit getUserMedia check and let SpeechRecognition handle permissions
    // This avoids issues where mediaDevices isn't available on HTTP but speech recognition still works
    const isLocalDev = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local') ||
      window.location.hostname === 'powerworks.local'
    );

    // Only try explicit permission request on HTTPS (not local development)
    if (!isLocalDev && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately - we just needed permission
        stream.getTracks().forEach(track => track.stop());
      } catch (permissionError) {
        console.error('Microphone permission error:', permissionError);
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: 'Microphone access denied. Please check your browser settings and allow microphone access for this site.',
        }));
        return;
      }
    }
    // On localhost or when mediaDevices isn't available, let SpeechRecognition handle permissions directly

    // Stop any previous recognition instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      } catch {
        // Ignore
      }
    }

    // Stop any ongoing TTS
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create a fresh recognition instance (Chrome requires this)
    const recognition = createRecognition();
    if (!recognition) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to initialize voice recognition. Please type your message.',
      }));
      return;
    }
    recognitionRef.current = recognition;

    // Reset transcript refs for new session
    finalTranscriptRef.current = '';
    isProcessingRef.current = false;
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    // Clear any previous errors and set listening state
    setState((prev) => ({
      ...prev,
      status: 'listening',
      currentTranscript: '',
      error: null,
    }));

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Clear any existing silence timeout
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }

      // Build full transcript from all results
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Combine final + interim for display
      const displayTranscript = (finalTranscript + ' ' + interimTranscript).trim();
      finalTranscriptRef.current = finalTranscript;

      setState((prev) => ({ ...prev, currentTranscript: displayTranscript }));

      // Set a silence timeout - wait for user to stop speaking
      // Use longer timeout (2 seconds) to allow for natural pauses when speaking numbers
      const silenceDelay = 2000;

      silenceTimeoutRef.current = setTimeout(() => {
        const transcriptToProcess = (finalTranscriptRef.current + ' ' + interimTranscript).trim();

        if (transcriptToProcess && !isProcessingRef.current) {
          isProcessingRef.current = true;

          // Stop recognition before processing
          try {
            recognition.stop();
          } catch {
            // Ignore
          }

          // Process the complete transcript
          processUserInput(transcriptToProcess);

          // Reset for next input
          finalTranscriptRef.current = '';
          isProcessingRef.current = false;
        }
      }, silenceDelay);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        // On Chrome, check if there's a permission prompt in the address bar
        const helpText = isLocalDev
          ? 'Please click "Allow" in the browser popup, or check the microphone icon in your address bar.'
          : 'Please allow microphone access in your browser settings.';
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: `Microphone access denied. ${helpText}`,
        }));
      } else if (event.error === 'network') {
        // Network errors are common with speech recognition - provide helpful message
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: 'Speech service unavailable. Please type your message instead.',
        }));
      } else if (event.error === 'audio-capture') {
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: 'No microphone found. Please connect a microphone or type your message.',
        }));
      } else if (event.error === 'service-not-allowed') {
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: 'Speech recognition not available. Please type your message.',
        }));
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setState((prev) => ({
          ...prev,
          status: 'idle',
          error: `Voice recognition issue. Please type your message instead.`,
        }));
      } else {
        // For 'aborted' or 'no-speech', just go back to idle without error
        setState((prev) => ({ ...prev, status: 'idle', error: null }));
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

    // Start recognition immediately after setting up handlers
    try {
      recognition.start();
      console.log('Speech recognition started');
    } catch (error) {
      console.error('Failed to start recognition:', error);
      setState((prev) => ({
        ...prev,
        status: 'idle',
        error: 'Failed to start voice recognition. Please try again or type your message.',
      }));
    }
  }, [processUserInput, createRecognition]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    // Clear silence timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    // Get the current transcript before stopping
    const currentTranscript = finalTranscriptRef.current;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }

    // If there's a transcript and we're not already processing, process it
    if (currentTranscript && currentTranscript.trim() && !isProcessingRef.current) {
      isProcessingRef.current = true;
      processUserInput(currentTranscript.trim());
      finalTranscriptRef.current = '';
      isProcessingRef.current = false;
    } else {
      setState((prev) => ({ ...prev, status: 'idle' }));
    }
  }, [processUserInput]);

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
