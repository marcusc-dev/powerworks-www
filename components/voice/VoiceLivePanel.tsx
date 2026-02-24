'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  Send,
  AlertTriangle,
  Loader2,
  Calendar,
  MessageCircle,
  RotateCcw,
  Mail,
  Check,
} from 'lucide-react';
import { GeminiLiveState, LiveStatus } from './useGeminiLive';
import { WHATSAPP_URL } from './contactPrefill';
import { BOOKING_URL } from '@/lib/constants';

interface ChatPanelProps {
  state: GeminiLiveState;
  pathname: string;
  onClose: () => void;
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

  for (const [key, greeting] of Object.entries(greetings)) {
    if (pathname.includes(key)) {
      return greeting;
    }
  }

  return {
    title: "Hi, I'm Glenn!",
    subtitle: "Ask me anything about your car — I'll help you figure out what's wrong and get it sorted.",
  };
}

const STATUS_LABELS: Record<LiveStatus, string> = {
  disconnected: 'Connecting...',
  connecting: 'Connecting...',
  connected: 'Online',
  thinking: 'Glenn is typing...',
  error: 'Something went wrong',
};

export default function VoiceLivePanel({
  state,
  pathname,
  onClose,
  onSendText,
  onReset,
  onClearError,
}: ChatPanelProps) {
  const greeting = getContextualGreeting(pathname);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [textInput, setTextInput] = useState('');
  const [isSendingTranscript, setIsSendingTranscript] = useState(false);
  const [transcriptSent, setTranscriptSent] = useState(false);

  // Send transcript to Powerworks
  const handleSendTranscript = useCallback(async () => {
    if (state.messages.length === 0 || isSendingTranscript) return;

    setIsSendingTranscript(true);
    try {
      const transcript = state.messages
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'Glenn'}: ${msg.content}`)
        .join('\n\n');

      const response = await fetch('/api/voice-live-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: 'Chat Conversation',
          customer_phone: 'See transcript',
          service_type: 'Chat Inquiry',
          issue_summary: 'Customer had a chat conversation with Glenn. See full transcript below.',
          page_context: pathname,
          conversation_transcript: transcript,
        }),
      });

      if (response.ok) {
        setTranscriptSent(true);
        setTimeout(() => setTranscriptSent(false), 5000);
      }
    } catch (error) {
      console.error('Failed to send transcript:', error);
    } finally {
      setIsSendingTranscript(false);
    }
  }, [state.messages, pathname, isSendingTranscript]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.currentTranscript]);

  // Escape to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus input when panel opens
  useEffect(() => {
    if (state.status === 'connected') {
      inputRef.current?.focus();
    }
  }, [state.status]);

  // Handle text submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (textInput.trim() && state.status !== 'thinking') {
        onSendText(textInput.trim());
        setTextInput('');
      }
    },
    [textInput, state.status, onSendText]
  );

  const isThinking = state.status === 'thinking';
  const isConnecting = state.status === 'connecting' || state.status === 'disconnected';
  const canType = state.status === 'connected' || state.status === 'thinking';

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-assistant-title"
      className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[9999] motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in motion-safe:duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-power-dark to-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-power-red rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 id="chat-assistant-title" className="text-white font-bold text-sm">
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
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]"
        role="log"
        aria-live="polite"
        aria-label="Conversation history"
      >
        {/* Welcome message */}
        {state.messages.length === 0 && !state.currentTranscript && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-power-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-power-red" />
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

        {/* Streaming response */}
        {state.currentTranscript && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm bg-gray-100 text-gray-900 rounded-bl-md">
              {state.currentTranscript}
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
            </div>
          </div>
        )}

        {/* Thinking indicator */}
        {isThinking && !state.currentTranscript && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Glenn is typing...
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

      {/* Text Input */}
      <div className="p-3 border-t border-gray-100 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={isConnecting ? 'Connecting...' : 'Type your message...'}
            disabled={isConnecting}
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!canType || !textInput.trim()}
            aria-label="Send message"
            className="p-2.5 bg-power-blue text-white rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-power-blue focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* CTA Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-100 space-y-2">
        {/* Send Transcript Button */}
        {state.messages.length > 0 && (
          <button
            onClick={handleSendTranscript}
            disabled={isSendingTranscript || transcriptSent}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              transcriptSent
                ? 'bg-green-600 text-white focus:ring-green-600'
                : 'bg-power-red text-white hover:bg-red-700 focus:ring-power-red'
            } disabled:opacity-70`}
          >
            {isSendingTranscript ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : transcriptSent ? (
              <>
                <Check className="w-4 h-4" />
                Sent to Powerworks!
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Send Conversation to Powerworks
              </>
            )}
          </button>
        )}
        <button
          onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
          className="w-full bg-power-dark text-white py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-power-dark focus:ring-offset-2"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
