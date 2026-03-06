import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_LIST_ID = 2;

export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn('[Subscribe] BREVO_API_KEY not set');
      return NextResponse.json({ success: true });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: {
          ...(name ? { FIRSTNAME: name.split(' ')[0], LASTNAME: name.split(' ').slice(1).join(' ') } : {}),
          SOURCE: source || 'website',
        },
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (!data?.message?.includes('already exist')) {
        console.error(`[Subscribe] Brevo error: ${data?.message || res.statusText}`);
      }
    } else {
      console.log(`[Subscribe] Added ${normalizedEmail} to Brevo list ${BREVO_LIST_ID}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Subscribe] Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
