'use client';

import dynamic from 'next/dynamic';

// Dynamically import the floating button to avoid SSR issues with browser APIs
const VoiceAssistantFloatingButton = dynamic(
  () => import('./VoiceAssistantFloatingButton'),
  {
    ssr: false,
    loading: () => null, // No loading state, just render nothing during SSR
  }
);

export default function VoiceAssistantProvider() {
  return <VoiceAssistantFloatingButton />;
}
