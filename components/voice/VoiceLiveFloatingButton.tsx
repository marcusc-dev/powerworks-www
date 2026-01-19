'use client';

import { useCallback, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { useGeminiLive } from './useGeminiLive';
import VoiceLivePanel from './VoiceLivePanel';

export default function VoiceLiveFloatingButton() {
  const {
    state,
    openPanel,
    closePanel,
    startListening,
    stopListening,
    sendTextMessage,
    resetConversation,
    clearError,
    pathname,
  } = useGeminiLive();

  // Handle click outside to close panel
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        state.isOpen &&
        !target.closest('[data-voice-assistant="button"]') &&
        !target.closest('[data-voice-assistant="panel"]')
      ) {
        closePanel();
      }
    },
    [state.isOpen, closePanel]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Determine button appearance based on status
  const isActive = state.status === 'listening' || state.status === 'speaking';
  const isConnecting = state.status === 'connecting';

  return (
    <>
      {/* Floating button */}
      <button
        data-voice-assistant="button"
        onClick={() => (state.isOpen ? closePanel() : openPanel())}
        className={`fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-[9998] focus:outline-none focus:ring-4 focus:ring-power-red/30 ${
          state.isOpen || isActive
            ? 'bg-power-red text-white scale-110'
            : 'bg-white text-power-red hover:scale-110 hover:shadow-xl'
        } ${isConnecting ? 'animate-pulse' : ''}`}
        aria-label={state.isOpen ? 'Close voice assistant' : 'Open voice assistant'}
        aria-expanded={state.isOpen}
        aria-haspopup="dialog"
      >
        {isActive ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
        {/* Pulse ring when active */}
        {isActive && (
          <span className="absolute inset-0 rounded-full bg-power-red/30 animate-ping" />
        )}
        {/* Badge showing "Live" status */}
        {state.isOpen && (state.status === 'connected' || state.status === 'listening' || state.status === 'speaking') && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Panel */}
      {state.isOpen && (
        <div data-voice-assistant="panel">
          <VoiceLivePanel
            state={state}
            pathname={pathname}
            onClose={closePanel}
            onStartListening={startListening}
            onStopListening={stopListening}
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
          onClick={closePanel}
        />
      )}
    </>
  );
}
