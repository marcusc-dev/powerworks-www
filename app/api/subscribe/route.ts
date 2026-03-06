import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ─── Integration point ───
    // Connect your mailing list provider here:
    //
    // Brevo (already have API key in env):
    //   await fetch('https://api.brevo.com/v3/contacts', {
    //     method: 'POST',
    //     headers: { 'api-key': process.env.BREVO_API_KEY!, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: normalizedEmail, listIds: [YOUR_LIST_ID] }),
    //   });
    //
    // Mailchimp:
    //   await fetch(`https://usX.api.mailchimp.com/3.0/lists/{list_id}/members`, { ... });
    //
    // ConvertKit:
    //   await fetch('https://api.convertkit.com/v3/forms/{form_id}/subscribe', { ... });

    console.log(`[Mailing List] New signup: ${normalizedEmail}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Subscribe] Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
