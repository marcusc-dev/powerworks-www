'use client';

import dynamic from 'next/dynamic';

// Text chat using Gemini Live API WebSocket for real-time streaming responses
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
