import { NextRequest, NextResponse } from 'next/server';

// Types
interface VoiceAgentRequest {
  sessionId: string;
  text: string;
  pageContext: string;
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface VoiceAgentResponse {
  spoken_response: string;
  follow_up_question: string;
  booking_intent: 'low' | 'medium' | 'high';
  safety_flag: 'none' | 'caution' | 'stop_driving';
  suggested_cta: 'book' | 'whatsapp' | 'none';
  lead_capture: {
    consent_requested: boolean;
    consent_granted: boolean;
    name?: string;
    phone?: string;
    email?: string;
    email_consent_requested?: boolean;
    email_consent_granted?: boolean;
  };
  contact_prefill: {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    page?: string;
  };
  booking_confirmation?: {
    confirmed: boolean;
    requested_time?: string;
    service_type?: string;
    vehicle?: string;
    notes?: string;
  };
}

// Simple in-memory rate limiter (resets on cold start, suitable for Vercel)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Clean up old entries periodically (simple garbage collection)
function cleanupRateLimiter() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Get page-specific context for the prompt
function getPageContext(path: string): string {
  const contexts: Record<string, string> = {
    '/services/ac-repair': `The user is on the AC Repair page. Focus on AC-related issues like refrigerant leaks, compressor problems, poor cooling, and Dubai heat impact on AC systems. Suggest AC diagnostics (from AED 150).`,
    '/services/brake-service': `The user is on the Brake Service page. Prioritize brake safety. Squealing, grinding, or soft pedals warrant immediate inspection. Use STOP-DRIVING warning for brake failure symptoms.`,
    '/services/oil-change': `The user is on the Oil Change page. Discuss oil types, change intervals, Dubai heat effects on oil viscosity, and the importance of regular changes.`,
    '/services/battery': `The user is on the Battery page. Focus on battery health, Dubai heat impact (shortens battery life), starting issues, and replacement options.`,
    '/services/car-service': `The user is on the Car Service page. Cover general maintenance, service intervals, multi-point inspections, and preventive care.`,
    '/services/engine': `The user is on the Engine Repair page. Address engine warning lights, performance issues, unusual sounds, and overheating concerns.`,
    '/services/electrical': `The user is on the Electrical Diagnostics page. Cover warning lights, electrical faults, sensor issues, and computer diagnostics.`,
    '/services/suspension': `The user is on the Suspension page. Discuss ride quality, handling issues, uneven tyre wear, and noise over bumps.`,
    '/services/transmission': `The user is on the Transmission page. Cover gear shifting issues, transmission fluid, and automatic vs manual concerns.`,
    '/services/tyres': `The user is on the Tyre page. Discuss tyre wear, alignment, balancing, and Dubai road conditions.`,
    '/services/pre-purchase-inspection': `The user is on the Pre-Purchase Inspection page. Help them understand what the inspection covers and why it's important when buying a used car.`,
    '/services/fleet': `The user is on the Fleet Services page. Focus on business fleet maintenance programs, pickup/delivery options, and volume service agreements.`,
    '/contact': `The user is on the Contact page. They may be ready to book - help them complete their enquiry.`,
  };

  // Check for partial matches
  for (const [route, context] of Object.entries(contexts)) {
    if (path.includes(route.replace('/services/', ''))) {
      return context;
    }
  }

  return 'The user is browsing the general website. Provide helpful automotive triage and guide them toward booking a service.';
}

// Build the system prompt for Glenn
function buildSystemPrompt(pageContext: string, conversationContext: string): string {
  return `You are "Glenn from Powerworks", the AI voice assistant for Powerworks Garage in Dubai.

## Your Identity
- British-owned garage, professional and calm demeanor
- Straight-talking, honest, no high-pressure sales tactics
- Dubai-aware: understand the impact of extreme heat on vehicles (batteries, AC, tyres)

## Current Context
${pageContext}

## Conversation Context So Far
${conversationContext || 'This is the start of the conversation.'}

## Response Rules
1. **Keep it short**: 1-3 sentences maximum. This is for voice, not reading.
2. **Triage language only**: Use "likely causes", "possible", "needs inspection to confirm". NEVER diagnose definitively.
3. **Safety first**: If symptoms suggest danger (brake failure, overheating, burning smell, flashing warning lights, loss of power), set safety_flag to "stop_driving" and advise them to stop driving immediately.
4. **Lead capture flow** (when booking_intent is medium or high):
   a. First ask for their name naturally if not provided
   b. Then ask for phone with consent: "Can I take a mobile number so we can confirm your booking?"
   c. IMPORTANT: After getting name and phone, ask for email: "Would you like a confirmation email? What's your email address?"
   d. If they refuse any field, proceed without it
5. **Booking confirmation**: When you have collected name + phone (minimum), and the customer confirms they want to book:
   - Set booking_confirmation.confirmed to true
   - Say something like "Perfect, I've sent your details to the team. They'll call you shortly to confirm your appointment."
   - Include any requested time/date in booking_confirmation.requested_time
6. **No dangerous advice**: Never suggest DIY repairs for safety-critical components.

## Dubai Specifics
- Heat kills batteries faster (2-3 years vs 4-5 in cooler climates)
- AC works harder here, needs regular servicing
- Tyres degrade faster on hot roads
- Traffic jams = more stress on cooling systems

## Contact Details (if asked)
- Phone: 052 121 7425
- WhatsApp: https://wa.me/971521217425
- Location: Al Quoz Industrial Area 3, Dubai
- Hours: Mon-Sun 8AM-6PM

## JSON Response Format
You MUST respond with valid JSON only. No markdown, no explanations outside the JSON.

{
  "spoken_response": "Your conversational response (1-3 sentences)",
  "follow_up_question": "One clarifying question to continue the conversation (or empty string if booking confirmed)",
  "booking_intent": "low" | "medium" | "high",
  "safety_flag": "none" | "caution" | "stop_driving",
  "suggested_cta": "book" | "whatsapp" | "none",
  "lead_capture": {
    "consent_requested": boolean,
    "consent_granted": boolean,
    "name": "extracted name or null",
    "phone": "extracted phone or null",
    "email": "extracted email or null",
    "email_consent_requested": boolean,
    "email_consent_granted": boolean
  },
  "contact_prefill": {
    "name": "name if captured",
    "phone": "phone if captured",
    "email": "email if captured",
    "message": "2-6 bullet points or 2-4 sentences summarizing their issue based ONLY on what they told you. Include vehicle, symptoms, when started, warning lights if mentioned. Include safety warning if applicable. Never invent details.",
    "page": "current page path"
  },
  "booking_confirmation": {
    "confirmed": boolean (true ONLY when customer has provided contact details AND confirmed they want to book),
    "requested_time": "any specific time/date mentioned (e.g. 'tomorrow morning', '10am Wednesday')",
    "service_type": "the service they need based on conversation",
    "vehicle": "vehicle make/model if mentioned",
    "notes": "any other relevant notes"
  }
}

## Booking Intent Levels
- **low**: General questions, browsing, not ready to book
- **medium**: Specific problem described, might need service soon
- **high**: Ready to book, wants quote, asked about availability

## Safety Flag Levels
- **none**: Normal conversation
- **caution**: Issue that needs attention but not immediately dangerous
- **stop_driving**: Dangerous to drive - brake failure, severe overheating, burning smell, flashing red warning lights, loss of power steering

## IMPORTANT: Booking Confirmation Flow
Only set booking_confirmation.confirmed = true when ALL of these are met:
1. You have at least the customer's name AND phone number
2. The customer has explicitly confirmed they want to book (said yes to booking, agreed to an appointment, etc.)
Do NOT set confirmed = true just because they're asking questions or showing interest.`;
}

// Build conversation context from history
function buildConversationContext(
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): string {
  if (history.length === 0) return '';

  return history
    .slice(-6) // Last 6 messages for context
    .map((msg) => `${msg.role === 'user' ? 'Customer' : 'Glenn'}: ${msg.content}`)
    .join('\n');
}

// Extract lead info from user messages
function extractLeadInfo(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): { name?: string; phone?: string; email?: string } {
  const result: { name?: string; phone?: string; email?: string } = {};

  for (const msg of messages) {
    if (msg.role !== 'user') continue;

    // Simple name extraction (look for "my name is X" or "I'm X" patterns)
    const nameMatch = msg.content.match(
      /(?:my name is|i'm|i am|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i
    );
    if (nameMatch) {
      result.name = nameMatch[1];
    }

    // Phone extraction (UAE format)
    const phoneMatch = msg.content.match(
      /(?:0|\+971|971)?[\s-]?(?:50|52|54|55|56|58)[\s-]?\d{3}[\s-]?\d{4}/
    );
    if (phoneMatch) {
      result.phone = phoneMatch[0].replace(/[\s-]/g, '');
    }

    // Email extraction
    const emailMatch = msg.content.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i
    );
    if (emailMatch) {
      result.email = emailMatch[0].toLowerCase();
    }
  }

  return result;
}

// Call Gemini API
async function callGemini(
  prompt: string,
  userMessage: string
): Promise<VoiceAgentResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Use gemini-2.0-flash for best performance
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${prompt}\n\nCustomer's message: "${userMessage}"` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', response.status, errorText);

    // Handle specific error codes
    if (response.status === 429) {
      throw new Error('QUOTA_EXCEEDED');
    } else if (response.status === 404) {
      throw new Error('MODEL_NOT_FOUND');
    } else if (response.status === 401 || response.status === 403) {
      throw new Error('API_KEY_INVALID');
    }

    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();

  // Extract the text response
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) {
    throw new Error('No response from Gemini');
  }

  // Parse JSON response
  try {
    // Clean up potential markdown code blocks
    const cleanedResponse = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', textResponse);
    // Return a fallback response
    return {
      spoken_response:
        "I understand. Let me help you with that. Could you tell me a bit more about what's happening with your car?",
      follow_up_question: '',
      booking_intent: 'low',
      safety_flag: 'none',
      suggested_cta: 'none',
      lead_capture: {
        consent_requested: false,
        consent_granted: false,
      },
      contact_prefill: {},
    };
  }
}

// Send booking notification email to Powerworks
async function sendBookingNotification(
  leadInfo: { name?: string; phone?: string; email?: string },
  booking: { requested_time?: string; service_type?: string; vehicle?: string; notes?: string },
  conversationSummary: string,
  pageContext: string
): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not configured - cannot send booking notification');
    return false;
  }

  try {
    const emailContent = `
New Voice Assistant Booking Request

Customer Details:
-----------------
Name: ${leadInfo.name || 'Not provided'}
Phone: ${leadInfo.phone || 'Not provided'}
Email: ${leadInfo.email || 'Not provided'}

Booking Request:
----------------
Requested Time: ${booking.requested_time || 'To be confirmed'}
Service Type: ${booking.service_type || 'To be discussed'}
Vehicle: ${booking.vehicle || 'Not specified'}
${booking.notes ? `Notes: ${booking.notes}` : ''}

Conversation Summary:
--------------------
${conversationSummary}

---
Page: ${pageContext}
Source: Voice Assistant (Ask Glenn)
This booking was made through the AI voice assistant on the website.
    `.trim();

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Powerworks Voice Assistant',
          email: 'noreply@powerworksgaragedubai.com',
        },
        to: [
          {
            email: 'info@powerworksgaragedubai.com',
            name: 'Powerworks Garage',
          },
        ],
        replyTo: leadInfo.email ? {
          email: leadInfo.email,
          name: leadInfo.name || 'Customer',
        } : undefined,
        subject: `🎙️ Voice Booking: ${booking.service_type || 'Service'} - ${leadInfo.name || 'Customer'}`,
        textContent: emailContent,
        htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; color: #e63946; }
    .header .badge { background: #e63946; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 10px; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .section h3 { color: #1a1a2e; border-bottom: 2px solid #e63946; padding-bottom: 5px; margin-top: 0; }
    .field { margin: 10px 0; display: flex; }
    .label { font-weight: bold; color: #555; min-width: 120px; }
    .value { color: #333; }
    .summary-box { background: #fff8f0; padding: 15px; border-left: 4px solid #e63946; margin-top: 10px; white-space: pre-line; }
    .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
    .cta { display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin: 5px; }
    .cta-phone { background: #e63946; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>POWERWORKS</h1>
      <p>New Voice Assistant Booking</p>
      <span class="badge">🎙️ Ask Glenn</span>
    </div>
    <div class="content">
      <div class="section">
        <h3>📞 Customer Details</h3>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${leadInfo.name || 'Not provided'}</span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value">${leadInfo.phone ? `<a href="tel:${leadInfo.phone}">${leadInfo.phone}</a>` : 'Not provided'}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">${leadInfo.email ? `<a href="mailto:${leadInfo.email}">${leadInfo.email}</a>` : 'Not provided'}</span>
        </div>
        ${leadInfo.phone ? `<a href="tel:${leadInfo.phone}" class="cta cta-phone">📞 Call Customer</a>` : ''}
        ${leadInfo.phone ? `<a href="https://wa.me/${leadInfo.phone.replace(/[^0-9]/g, '')}" class="cta">💬 WhatsApp</a>` : ''}
      </div>

      <div class="section">
        <h3>📅 Booking Request</h3>
        <div class="field">
          <span class="label">Requested Time:</span>
          <span class="value">${booking.requested_time || 'To be confirmed'}</span>
        </div>
        <div class="field">
          <span class="label">Service:</span>
          <span class="value">${booking.service_type || 'To be discussed'}</span>
        </div>
        <div class="field">
          <span class="label">Vehicle:</span>
          <span class="value">${booking.vehicle || 'Not specified'}</span>
        </div>
        ${booking.notes ? `<div class="field"><span class="label">Notes:</span><span class="value">${booking.notes}</span></div>` : ''}
      </div>

      <div class="section">
        <h3>💬 Conversation Summary</h3>
        <div class="summary-box">${conversationSummary.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>Source: Voice Assistant on ${pageContext}</p>
      <p>This booking was made through the AI voice assistant on the website.</p>
    </div>
  </div>
</body>
</html>
        `.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error for voice booking:', errorData);
      return false;
    }

    console.log('Booking notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    return false;
  }
}

// Send confirmation email to customer (if email provided)
async function sendCustomerConfirmation(
  email: string,
  name: string,
  booking: { requested_time?: string; service_type?: string }
): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY || !email) {
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Powerworks Garage',
          email: 'noreply@powerworksgaragedubai.com',
        },
        to: [{ email, name }],
        replyTo: {
          email: 'info@powerworksgaragedubai.com',
          name: 'Powerworks Garage',
        },
        subject: `Booking Request Received - Powerworks Garage`,
        htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; color: #e63946; font-size: 28px; }
    .content { padding: 30px; background: #ffffff; }
    .greeting { font-size: 18px; margin-bottom: 20px; }
    .details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .details h3 { color: #1a1a2e; margin-top: 0; }
    .cta { display: block; background: #e63946; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; text-align: center; font-weight: bold; margin: 20px 0; }
    .contact-info { background: #f0f4f8; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f8f9fa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>POWERWORKS</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">Garage Dubai</p>
    </div>
    <div class="content">
      <p class="greeting">Hi ${name},</p>
      <p>Thank you for your booking request through our voice assistant. We've received your details and our team will call you shortly to confirm your appointment.</p>

      <div class="details">
        <h3>📅 Your Booking Request</h3>
        <p><strong>Service:</strong> ${booking.service_type || 'To be discussed'}</p>
        <p><strong>Requested Time:</strong> ${booking.requested_time || 'To be confirmed'}</p>
      </div>

      <p>If you need to reach us before we call, you can contact us directly:</p>

      <a href="https://wa.me/971521217425" class="cta">💬 WhatsApp Us</a>

      <div class="contact-info">
        <p><strong>📞 Phone:</strong> <a href="tel:+971521217425">052 121 7425</a></p>
        <p><strong>📍 Location:</strong> Al Quoz Industrial Area 3, Dubai</p>
        <p><strong>⏰ Hours:</strong> Monday - Sunday, 8AM - 6PM</p>
      </div>
    </div>
    <div class="footer">
      <p>Powerworks Garage Dubai<br>British-Owned • Professional Service</p>
      <p style="font-size: 11px; color: #999;">This email was sent because you made a booking request through our website voice assistant.</p>
    </div>
  </div>
</body>
</html>
        `.trim(),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Clean up rate limiter periodically
  cleanupRateLimiter();

  // Get client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  // Check rate limit
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        },
      }
    );
  }

  try {
    const body: VoiceAgentRequest = await request.json();

    // Validate request
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "text" field' },
        { status: 400 }
      );
    }

    if (!body.sessionId || typeof body.sessionId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "sessionId" field' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedText = body.text.trim().slice(0, 1000); // Max 1000 chars
    const pageContext = getPageContext(body.pageContext || '/');
    const conversationContext = buildConversationContext(body.history || []);

    // Build prompt
    const systemPrompt = buildSystemPrompt(pageContext, conversationContext);

    // Call Gemini
    const geminiResponse = await callGemini(systemPrompt, sanitizedText);

    // Extract any lead info from conversation history
    const extractedLead = extractLeadInfo([
      ...(body.history || []),
      { role: 'user', content: sanitizedText },
    ]);

    // Merge extracted lead info with Gemini's response
    const finalLeadCapture = {
      ...geminiResponse.lead_capture,
      name: geminiResponse.lead_capture.name || extractedLead.name,
      phone: geminiResponse.lead_capture.phone || extractedLead.phone,
      email: geminiResponse.lead_capture.email || extractedLead.email,
    };

    const finalContactPrefill = {
      ...geminiResponse.contact_prefill,
      name:
        geminiResponse.contact_prefill.name ||
        geminiResponse.lead_capture.name ||
        extractedLead.name,
      phone:
        geminiResponse.contact_prefill.phone ||
        geminiResponse.lead_capture.phone ||
        extractedLead.phone,
      email:
        geminiResponse.contact_prefill.email ||
        geminiResponse.lead_capture.email ||
        extractedLead.email,
      page: body.pageContext || '/',
    };

    const response: VoiceAgentResponse = {
      ...geminiResponse,
      lead_capture: finalLeadCapture,
      contact_prefill: finalContactPrefill,
    };

    // If booking is confirmed, send email notifications
    if (geminiResponse.booking_confirmation?.confirmed) {
      const leadInfo = {
        name: finalLeadCapture.name,
        phone: finalLeadCapture.phone,
        email: finalLeadCapture.email,
      };

      const bookingDetails = geminiResponse.booking_confirmation;
      const conversationSummary = finalContactPrefill.message || 'No summary available';

      // Send notification to Powerworks (don't await - fire and forget to not slow down response)
      sendBookingNotification(
        leadInfo,
        bookingDetails,
        conversationSummary,
        body.pageContext || '/'
      ).catch(err => console.error('Background email send failed:', err));

      // Send confirmation to customer if they provided email
      if (finalLeadCapture.email) {
        sendCustomerConfirmation(
          finalLeadCapture.email,
          finalLeadCapture.name || 'Customer',
          bookingDetails
        ).catch(err => console.error('Customer confirmation email failed:', err));
      }
    }

    return NextResponse.json(response, {
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Voice agent error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Provide specific error messages based on error type
    let clientMessage = 'Something went wrong. Please try again.';
    let statusCode = 500;

    if (errorMessage.includes('GEMINI_API_KEY')) {
      clientMessage = 'Service temporarily unavailable. Please try again later.';
    } else if (errorMessage === 'QUOTA_EXCEEDED') {
      clientMessage = 'Service is busy right now. Please try again in a moment.';
      statusCode = 503;
    } else if (errorMessage === 'MODEL_NOT_FOUND') {
      clientMessage = 'Service configuration error. Please contact support.';
    } else if (errorMessage === 'API_KEY_INVALID') {
      clientMessage = 'Service authentication error. Please contact support.';
    }

    return NextResponse.json({ error: clientMessage }, { status: statusCode });
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
