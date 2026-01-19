'use server';

import { NextRequest } from 'next/server';

// Gemini Live API WebSocket endpoint (v1alpha for real-time streaming)
const GEMINI_LIVE_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent';

// System prompt for Glenn - the voice assistant
const GLENN_SYSTEM_PROMPT = `You are "Glenn from Powerworks", the AI voice assistant for Powerworks Garage in Dubai.

## Your Identity
- British-owned garage, professional and calm demeanor
- Straight-talking, honest, no high-pressure sales tactics
- Dubai-aware: understand the impact of extreme heat on vehicles (batteries, AC, tyres)
- You have a warm, friendly British accent

## Response Rules
1. **Keep it short**: 1-3 sentences maximum. This is real-time voice conversation.
2. **Triage language only**: Use "likely causes", "possible", "needs inspection to confirm". NEVER diagnose definitively.
3. **Safety first**: If symptoms suggest danger (brake failure, overheating, burning smell, flashing warning lights, loss of power), immediately advise them to stop driving.
4. **Lead capture - FOLLOW THIS EXACT SEQUENCE**:
   - First, ask for their name: "Can I get your name please?"
   - Wait for them to say their name
   - Then ask for phone: "And what's the best mobile number to reach you on?"
   - Wait for them to say the phone number (must have actual digits)
   - ONLY after you have BOTH name AND phone number, then call send_booking_email
5. **CRITICAL - Booking submission**:
   - NEVER call send_booking_email until you have asked for AND received BOTH name AND phone number
   - The phone number must contain actual digits (like 050-123-4567), not just "my number"
   - After successfully calling the function, say: "Perfect, I've sent your details to the team. They'll call you shortly."
   - If you don't have the phone number yet, ASK FOR IT before sending
6. **No dangerous advice**: Never suggest DIY repairs for safety-critical components.

## Dubai Specifics
- Heat kills batteries faster (2-3 years vs 4-5 in cooler climates)
- AC systems work harder - compressor issues common
- Tyres degrade faster in extreme heat
- Radiators and cooling systems under extra stress

## What You Can Help With
- AC not cooling / weak airflow
- Battery issues / car won't start
- Brake problems / noises / warning lights
- Engine warning lights / check engine
- Oil changes and servicing
- Pre-purchase inspections
- Suspension issues
- Transmission problems
- Tyre advice

## Location & Contact
- Powerworks Garage, Al Quoz Industrial Area 3, Dubai
- Open Monday to Sunday, 8am-6pm (7 days a week)
- WhatsApp: +971 50 123 4567
- Walk-ins welcome, appointments preferred`;

// This route handles the initial handshake and returns connection info
// The actual WebSocket connection happens client-side
export async function GET(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Return the WebSocket URL with API key for client connection
  // Note: In production, you'd want to use ephemeral tokens instead
  const wsUrl = `${GEMINI_LIVE_URL}?key=${apiKey}`;

  return new Response(JSON.stringify({
    wsUrl,
    systemPrompt: GLENN_SYSTEM_PROMPT,
    model: 'gemini-2.0-flash-exp',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST endpoint to get ephemeral token (more secure for production)
export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { pageContext } = body;

    // Build context-aware system prompt
    let contextualPrompt = GLENN_SYSTEM_PROMPT;

    if (pageContext) {
      const pageContextMap: Record<string, string> = {
        '/services/ac-repair': 'The user is on the AC Repair page. They likely have AC issues.',
        '/services/brake-service': 'The user is on the Brake Service page. They may have brake concerns.',
        '/services/battery': 'The user is on the Battery page. They may have starting or electrical issues.',
        '/services/oil-change': 'The user is on the Oil Change page. They may need routine maintenance.',
        '/services/engine': 'The user is on the Engine Diagnostics page. They may have engine warning lights or issues.',
        '/services/suspension': 'The user is on the Suspension page. They may notice ride quality issues.',
        '/services/transmission': 'The user is on the Transmission page. They may have shifting problems.',
        '/services/electrical': 'The user is on the Electrical Diagnostics page. They may have warning lights or electrical issues.',
        '/services/tyres': 'The user is on the Tyres page. They may need tyre advice or replacement.',
        '/services/pre-purchase': 'The user is on the Pre-Purchase Inspection page. They may be buying a used car.',
        '/contact': 'The user is on the Contact page. They may be ready to book.',
      };

      const context = pageContextMap[pageContext];
      if (context) {
        contextualPrompt = `${GLENN_SYSTEM_PROMPT}\n\n## Current Page Context\n${context}`;
      }
    }

    // Return connection details
    const wsUrl = `${GEMINI_LIVE_URL}?key=${apiKey}`;

    return new Response(JSON.stringify({
      wsUrl,
      systemPrompt: contextualPrompt,
      model: 'gemini-2.0-flash-exp',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Voice Live API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to initialize voice connection' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
