'use client';

import dynamic from 'next/dynamic';

// Use the new Gemini Live API version for real-time streaming voice
// This provides: built-in VAD (no more cutoff issues), native TTS, lower latency
const VoiceLiveFloatingButton = dynamic(
  () => import('./VoiceLiveFloatingButton'),
  {
    ssr: false,
    loading: () => null, // No loading state, just render nothing during SSR
  }
);

// Legacy version using Web Speech API (kept for fallback)
// const VoiceAssistantFloatingButton = dynamic(
//   () => import('./VoiceAssistantFloatingButton'),
//   {
//     ssr: false,
//     loading: () => null,
//   }
// );

export default function VoiceAssistantProvider() {
  return <VoiceLiveFloatingButton />;
}
