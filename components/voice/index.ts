// Voice Assistant Components - Barrel Export

// Legacy components (using Web Speech API + separate Gemini calls)
export { default as VoiceAssistantFloatingButton } from './VoiceAssistantFloatingButton';
export { default as VoiceAssistantPanel } from './VoiceAssistantPanel';
export { default as VoiceAssistantProvider } from './VoiceAssistantProvider';
export { useVoiceAssistant } from './useVoiceAssistant';

// New Gemini Live API components (real-time streaming)
export { default as VoiceLiveFloatingButton } from './VoiceLiveFloatingButton';
export { default as VoiceLivePanel } from './VoiceLivePanel';
export { useGeminiLive } from './useGeminiLive';

// Shared utilities
export { buildContactUrl, parseContactParams, WHATSAPP_URL, buildWhatsAppUrl } from './contactPrefill';
export type * from './types';
