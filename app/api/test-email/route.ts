'use server';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json({
      error: 'RESEND_API_KEY not configured',
      hasKey: false,
    }, { status: 500 });
  }

  try {
    const resend = new Resend(resendApiKey);

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'Powerworks Test <voice@powerworksgaragedubai.com>',
      to: ['marcus@powerworksgarage.com'],
      subject: 'Test Email - Voice Assistant',
      html: '<h1>Test Successful!</h1><p>This is a test email from the Powerworks voice assistant. If you receive this, email sending is working correctly!</p>',
    });

    if (error) {
      return NextResponse.json({
        error: 'Email send failed',
        details: error,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      error: 'Email test failed',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
