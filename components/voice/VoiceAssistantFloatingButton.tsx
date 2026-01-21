'use client';

import React, { useEffect, useCallback } from 'react';
import { Mic } from 'lucide-react';
import { useVoiceAssistant } from './useVoiceAssistant';
import VoiceAssistantPanel from './VoiceAssistantPanel';

export default function VoiceAssistantFloatingButton() {
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
  } = useVoiceAssistant();

  // Handle click outside to close panel
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is outside both button and panel
      if (
        state.isOpen &&
        !target.closest('[data-voice-assistant]')
      ) {
        closePanel();
      }
    },
    [state.isOpen, closePanel]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {/* Floating Button */}
      <button
        data-voice-assistant="button"
        onClick={() => (state.isOpen ? closePanel() : openPanel())}
        aria-label={state.isOpen ? 'Close Ask Glenn assistant' : 'Open Ask Glenn voice assistant'}
        aria-expanded={state.isOpen}
        aria-controls="voice-assistant-panel"
        className={`fixed bottom-6 right-4 sm:right-6 z-[9998] group flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-power-red/30 ${
          state.isOpen
            ? 'bg-gray-800 hover:bg-gray-900'
            : 'bg-power-red hover:bg-red-700'
        } text-white rounded-full shadow-2xl`}
      >
        {/* Pulse glow effect */}
        {!state.isOpen && (
          <span
            className="absolute inset-0 rounded-full bg-power-red animate-ping opacity-25 motion-reduce:animate-none"
            aria-hidden="true"
          />
        )}

        {/* Button content */}
        <div className="relative flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5">
          <Mic className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span className="hidden sm:inline font-semibold text-sm whitespace-nowrap">
            Ask Glenn
          </span>
        </div>

        {/* Tooltip for mobile (icon-only) */}
        <span
          className="sm:hidden absolute -top-10 right-0 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none"
          role="tooltip"
        >
          Ask Glenn
        </span>
      </button>

      {/* Panel */}
      {state.isOpen && (
        <div data-voice-assistant="panel">
          <VoiceAssistantPanel
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

      {/* Backdrop for mobile */}
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
