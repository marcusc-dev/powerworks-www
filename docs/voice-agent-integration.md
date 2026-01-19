# Voice Agent Integration Documentation

## Overview

This document describes the integration of the Powerworks Voice Agent into the Next.js (App Router) website.

## Source Repository Analysis

**Repository:** https://github.com/marcusc-dev/Powerworks-Voice-Agent.git

### What the Original Repo Provides

1. **Tech Stack:**
   - React 19 + Vite standalone app
   - `@google/genai` SDK for Gemini Live API (v1.37.0)
   - lucide-react for icons
   - TypeScript

2. **Key Features:**
   - Real-time voice conversation with Gemini's native audio model (`gemini-2.5-flash-native-audio-preview-12-2025`)
   - Bidirectional audio streaming (PCM 16kHz input, 24kHz output)
   - Live transcription of both user input and assistant output
   - Page-aware context (detects URL path for service-specific prompts)
   - Safety flag detection (stop_driving triggers)
   - Floating widget UI with conversation history

3. **Core Components:**
   - `App.tsx` - Main React component with all voice logic
   - `types.ts` - TypeScript enums/interfaces (SafetyFlag, BookingIntent, AssistantState)
   - `services/audioUtils.ts` - Base64 encoding/decoding for PCM audio

4. **How It Works:**
   - Uses `GoogleGenAI.live.connect()` to establish WebSocket connection
   - Captures microphone audio via `getUserMedia` + `ScriptProcessorNode`
   - Sends PCM audio chunks to Gemini in real-time
   - Receives audio response + transcription back
   - Plays audio via `AudioBufferSourceNode`

### Limitations for Next.js/Vercel Integration

1. **API Key Exposure:** The original uses `process.env.API_KEY` directly in client-side code - NOT acceptable for production.

2. **No Server-Side Proxy:** Direct Gemini API calls from browser expose the API key.

3. **No Lead Capture:** Original doesn't collect name/phone with consent flow.

4. **No Structured JSON Output:** Returns free-form text, not structured booking intent/safety flags.

5. **No Form Prefill:** Doesn't generate summaries or prefill contact form.

## Chosen Integration Approach

**Approach C (Hybrid):** Port client widget and route through Next.js server.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│  VoiceAssistantFloatingButton.tsx                               │
│  └── VoiceAssistantPanel.tsx                                    │
│      ├── useVoiceAssistant.ts (STT/TTS via Web Speech API)      │
│      └── contactPrefill.ts (URL builder)                        │
│                                                                 │
│  Speech Recognition (Web Speech API) ─────────────────────────┐ │
│                                                                │ │
│  Text transcript ──────────────────────────────────────────────┼─┤
│                                                                │ │
└────────────────────────────────────────────────────────────────┼─┘
                                                                 │
                         POST /api/voice-agent                   │
                                                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS SERVER                              │
├─────────────────────────────────────────────────────────────────┤
│  /app/api/voice-agent/route.ts                                  │
│  ├── Rate limiting (IP-based)                                   │
│  ├── Session management                                         │
│  ├── Gemini API call (server-side, key protected)              │
│  ├── Structured JSON response generation                        │
│  └── Lead capture state machine                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Approach

1. **Security:** Gemini API key stays server-side only
2. **Vercel Compatible:** Uses standard Next.js Route Handlers
3. **Structured Output:** Server controls JSON response format
4. **Lead Capture:** Server manages consent flow state
5. **Summary Generation:** Server builds contact form prefill message
6. **Simpler STT/TTS:** Web Speech API is free and requires no API keys

## API Contract

### Request

```typescript
POST /api/voice-agent

{
  sessionId: string;          // Client-generated UUID
  text: string;               // User's spoken/typed message
  pageContext: string;        // Current URL pathname
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

### Response

```typescript
{
  spoken_response: string;           // What Glenn says back
  follow_up_question: string;        // Clarifying question
  booking_intent: 'low' | 'medium' | 'high';
  safety_flag: 'none' | 'caution' | 'stop_driving';
  suggested_cta: 'book' | 'whatsapp' | 'none';
  lead_capture: {
    consent_requested: boolean;      // Did Glenn ask for phone?
    consent_granted: boolean;        // Did user agree?
    name?: string;                   // Extracted name
    phone?: string;                  // Extracted phone
  };
  contact_prefill: {
    name?: string;
    phone?: string;
    message?: string;                // Summary for textarea
    page?: string;                   // Source page hint
  };
}
```

## Files to Create

```
/components/voice/
├── VoiceAssistantFloatingButton.tsx  # Floating CTA button
├── VoiceAssistantPanel.tsx           # Chat panel UI
├── useVoiceAssistant.ts              # React hook for voice logic
├── contactPrefill.ts                 # URL builder for /contact
├── types.ts                          # TypeScript interfaces
└── index.ts                          # Barrel export

/app/api/voice-agent/
└── route.ts                          # Next.js Route Handler
```

## Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (if using external voice agent server)
VOICE_AGENT_BASE_URL=https://voice-agent.example.com
```

## Key Implementation Details

### Lead Capture Flow

1. **Low Intent:** Normal conversation, answer questions
2. **Medium Intent:** Ask for name naturally
3. **High Intent + Name Captured:** Request phone consent:
   > "Can I take a mobile number so we can confirm your booking?"
4. **Consent Granted:** Collect phone
5. **Consent Refused:** Proceed without phone

### Safety Flag Triggers

Keywords that set `safety_flag: 'stop_driving'`:
- Brake failure / no brakes
- Burning smell
- Overheating / steam
- Oil/coolant leak while driving
- Warning lights (engine, oil pressure, brake)
- Loss of power steering
- Smoke from hood/exhaust

### Message Summary Policy

Generate based on user-provided info + pageContext:
- 2-6 bullet points OR 2-4 short sentences
- Include: vehicle, symptom(s), when started, warning lights, triggers
- Include safety warning if applicable
- NEVER invent details not mentioned

### Contact Form Fields

The summary maps to `/contact` textarea `name="message"`:

```
/contact?name=John&phone=0501234567&message=Summary+text+here&page=/services/brakes
```

## WhatsApp URL

Discovered from existing site code:
```
https://wa.me/971521217425
```

Phone number: `+971521217425` (displayed as `052 121 7425`)

## Styling Reference

### Colors (from tailwind.config.js)
- `power-blue`: #1e3a8a
- `power-red`: #dc2626
- `power-dark`: #111827
- `power-light`: #f3f4f6
- WhatsApp green: #25D366

### Common Patterns
- Rounded corners: `rounded-xl`, `rounded-2xl`
- Inputs: `bg-white border border-gray-200 rounded-xl px-4 py-3`
- Primary button: `bg-power-red text-white rounded-xl font-bold`
- Focus states: `focus:ring-2 focus:ring-power-blue`

## Accessibility Requirements

- Keyboard navigation (Tab, Enter, Escape)
- Focus trap when panel is open
- ARIA labels for all interactive elements
- `prefers-reduced-motion` support
- Screen reader announcements for status changes
