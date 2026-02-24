'use client';

import { useCallback, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useGeminiLive } from './useGeminiLive';
import VoiceLivePanel from './VoiceLivePanel';

export default function VoiceLiveFloatingButton() {
  const {
    state,
    openPanel,
    closePanel,
    sendTextMessage,
    resetConversation,
    clearError,
    pathname,
  } = useGeminiLive();

  // Track if we've already sent the transcript for this conversation
  const transcriptSentRef = useRef(false);

  // Reset transcript sent flag when conversation is reset
  useEffect(() => {
    if (state.messages.length === 0) {
      transcriptSentRef.current = false;
    }
  }, [state.messages.length]);

  // Auto-send transcript when panel closes (if there are messages)
  const handleCloseWithTranscript = useCallback(async () => {
    if (state.messages.length > 0 && !transcriptSentRef.current) {
      transcriptSentRef.current = true;

      const transcript = state.messages
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'Glenn'}: ${msg.content}`)
        .join('\n\n');

      fetch('/api/voice-live-booking', {
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
      }).then(res => {
        if (res.ok) {
          console.log('Transcript auto-sent on panel close');
        }
      }).catch(err => {
        console.error('Failed to auto-send transcript:', err);
      });
    }

    closePanel();
  }, [state.messages, pathname, closePanel]);

  // Handle click outside to close panel
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        state.isOpen &&
        !target.closest('[data-voice-assistant="button"]') &&
        !target.closest('[data-voice-assistant="panel"]')
      ) {
        handleCloseWithTranscript();
      }
    },
    [state.isOpen, handleCloseWithTranscript]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      {/* Floating chat button */}
      <button
        data-voice-assistant="button"
        onClick={() => (state.isOpen ? handleCloseWithTranscript() : openPanel())}
        className={`fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-[9998] focus:outline-none focus:ring-4 focus:ring-power-red/30 ${
          state.isOpen
            ? 'bg-power-red text-white scale-110'
            : 'bg-white text-power-red hover:scale-110 hover:shadow-xl'
        }`}
        aria-label={state.isOpen ? 'Close chat' : 'Chat with Glenn'}
        aria-expanded={state.isOpen}
        aria-haspopup="dialog"
      >
        {state.isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {/* Unread dot when there are new messages and panel is closed */}
        {!state.isOpen && state.messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-power-red rounded-full border-2 border-white" />
        )}
      </button>

      {/* Panel */}
      {state.isOpen && (
        <div data-voice-assistant="panel">
          <VoiceLivePanel
            state={state}
            pathname={pathname}
            onClose={handleCloseWithTranscript}
            onSendText={sendTextMessage}
            onReset={resetConversation}
            onClearError={clearError}
          />
        </div>
      )}

      {/* Mobile backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[9997] sm:hidden"
          aria-hidden="true"
          onClick={handleCloseWithTranscript}
        />
      )}
    </>
  );
}
