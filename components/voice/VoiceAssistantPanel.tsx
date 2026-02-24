'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Mic,
  MicOff,
  Send,
  AlertTriangle,
  Loader2,
  Calendar,
  MessageCircle,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { VoiceAssistantState, AssistantStatus } from './types';
import { buildContactUrl, WHATSAPP_URL } from './contactPrefill';
import { BOOKING_URL } from '@/lib/constants';

interface VoiceAssistantPanelProps {
  state: VoiceAssistantState;
  pathname: string;
  onClose: () => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSendText: (text: string) => void;
  onReset: () => void;
  onClearError: () => void;
}

// Get contextual greeting based on current page
function getContextualGreeting(pathname: string): { title: string; subtitle: string } {
  const greetings: Record<string, { title: string; subtitle: string }> = {
    'ac-repair': {
      title: "AC not cooling?",
      subtitle: "Tell me about your AC issue and I'll help diagnose it.",
    },
    'brake-service': {
      title: "Brake concerns?",
      subtitle: "Describe what you're experiencing and I'll help assess the situation.",
    },
    'oil-change': {
      title: "Due for an oil change?",
      subtitle: "I can help you choose the right oil and schedule a service.",
    },
    'battery': {
      title: "Battery trouble?",
      subtitle: "Tell me the symptoms and I'll help figure out what's wrong.",
    },
    'car-service': {
      title: "Need a service?",
      subtitle: "Tell me about your car and I'll recommend the right service.",
    },
    'engine': {
      title: "Engine issues?",
      subtitle: "Describe the problem and I'll help identify likely causes.",
    },
    'electrical': {
      title: "Warning lights on?",
      subtitle: "Tell me which lights are showing and I'll explain what they mean.",
    },
    'suspension': {
      title: "Ride feeling rough?",
      subtitle: "Describe what you're noticing and I'll help diagnose it.",
    },
    'transmission': {
      title: "Gear problems?",
      subtitle: "Tell me about the shifting issue and I'll help assess it.",
    },
    'tyres': {
      title: "Tyre concerns?",
      subtitle: "Tell me what's happening and I'll advise on next steps.",
    },
    'pre-purchase': {
      title: "Buying a used car?",
      subtitle: "I can explain our inspection process and what we check.",
    },
    'fleet': {
      title: "Need fleet support?",
      subtitle: "Tell me about your fleet and I'll explain our business services.",
    },
    'contact': {
      title: "Ready to book?",
      subtitle: "I can help you schedule an appointment or answer questions.",
    },
  };

  // Check for matching page context
  for (const [key, greeting] of Object.entries(greetings)) {
    if (pathname.includes(key)) {
      return greeting;
    }
  }

  // Default greeting
  return {
    title: "Hi, I'm Glenn!",
    subtitle: "Tap the mic button and tell me about your car issue. I'll help you figure out what's wrong.",
  };
}

const STATUS_LABELS: Record<AssistantStatus, string> = {
  idle: 'Ready to listen',
  listening: 'Listening...',
  thinking: 'Glenn is thinking...',
  speaking: 'Glenn is speaking...',
  error: 'Something went wrong',
  booking_confirmed: 'Booking request sent!',
};

export default function VoiceAssistantPanel({
  state,
  pathname,
  onClose,
  onStartListening,
  onStopListening,
  onSendText,
  onReset,
  onClearError,
}: VoiceAssistantPanelProps) {
  // Get contextual greeting based on current page
  const greeting = getContextualGreeting(pathname);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [textInput, setTextInput] = useState('');

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Focus trap
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscape);

    // Focus first focusable element
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Handle text submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (textInput.trim() && state.status === 'idle') {
        onSendText(textInput.trim());
        setTextInput('');
      }
    },
    [textInput, state.status, onSendText]
  );

  // Handle mic button click
  const handleMicClick = useCallback(() => {
    if (state.status === 'listening') {
      onStopListening();
    } else if (state.status === 'idle') {
      onStartListening();
    }
  }, [state.status, onStartListening, onStopListening]);

  const handleBookAppointment = useCallback(() => {
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  }, []);

  const isListening = state.status === 'listening';
  const isThinking = state.status === 'thinking';
  const isSpeaking = state.status === 'speaking';
  const isBookingConfirmed = state.status === 'booking_confirmed';
  const isProcessing = isThinking || isSpeaking;
  const isReadyToContinue = state.status === 'idle' && state.messages.length > 0;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
      className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[9999] motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in motion-safe:duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-power-dark to-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-power-red rounded-full flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 id="voice-assistant-title" className="text-white font-bold text-sm">
              Ask Glenn
            </h2>
            <p className="text-gray-400 text-xs">Powerworks Garage</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Reset conversation"
            title="Start over"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Close voice assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Safety Banner */}
      {state.safetyFlag === 'stop_driving' && (
        <div
          className="bg-red-600 text-white px-4 py-3 flex items-center gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-semibold">
            Safety Alert: Please stop driving and call for assistance.
          </p>
        </div>
      )}

      {state.safetyFlag === 'caution' && (
        <div
          className="bg-amber-500 text-white px-4 py-3 flex items-center gap-3"
          role="alert"
          aria-live="polite"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Caution: This may need prompt attention.
          </p>
        </div>
      )}

      {/* Booking Confirmation Banner */}
      {isBookingConfirmed && (
        <div
          className="bg-green-600 text-white px-4 py-4 flex flex-col gap-2"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Booking Request Sent!</p>
              <p className="text-xs opacity-90">
                We&apos;ll call you shortly to confirm your appointment.
              </p>
            </div>
          </div>
          {state.leadCapture.email && (
            <p className="text-xs opacity-80 ml-11">
              Confirmation email sent to {state.leadCapture.email}
            </p>
          )}
        </div>
      )}

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]"
        role="log"
        aria-live="polite"
        aria-label="Conversation history"
      >
        {/* Welcome message - contextual based on page */}
        {state.messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-power-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-8 h-8 text-power-red" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">{greeting.title}</h3>
            <p className="text-gray-500 text-sm max-w-[250px] mx-auto">
              {greeting.subtitle}
            </p>
          </div>
        )}

        {/* Message bubbles */}
        {state.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-power-red text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* Current transcript while listening */}
        {isListening && state.currentTranscript && (
          <div className="flex justify-end">
            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md bg-power-red/50 text-white text-sm italic">
              {state.currentTranscript}...
            </div>
          </div>
        )}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Glenn is thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {state.error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100">
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <p className="flex-1">{state.error}</p>
            <button
              onClick={onClearError}
              className="text-red-500 hover:text-red-700"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center" aria-live="polite">
          {state.status === 'error'
            ? 'Tap the mic to try again or type below'
            : state.status === 'idle' && state.messages.length > 0
              ? 'Tap the mic to continue...'
              : STATUS_LABELS[state.status]}
        </p>
      </div>

      {/* Voice/Text Input */}
      <div className="p-4 border-t border-gray-100 bg-white">
        {/* Mic button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleMicClick}
            disabled={isProcessing}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-power-red/30 disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-power-red text-white'
                : isReadyToContinue
                  ? 'bg-power-blue text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {(isListening || isReadyToContinue) && (
              <span className={`absolute inset-0 rounded-full animate-ping motion-reduce:animate-none ${
                isListening ? 'bg-power-red/30' : 'bg-power-blue/30'
              }`} />
            )}
            {isListening ? (
              <MicOff className="w-7 h-7 relative z-10" />
            ) : (
              <Mic className="w-7 h-7 relative z-10" />
            )}
          </button>
        </div>

        {/* Text input fallback */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type your message..."
            disabled={isProcessing}
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isProcessing || !textInput.trim()}
            aria-label="Send message"
            className="p-2.5 bg-power-blue text-white rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-power-blue focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* CTA Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2">
        <button
          onClick={handleBookAppointment}
          className="w-full bg-power-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-power-red focus:ring-offset-2"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
