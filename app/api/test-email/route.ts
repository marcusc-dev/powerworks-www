'use server';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  const smtpLogin = process.env.BREVO_SMTP_LOGIN;
  const smtpPassword = process.env.BREVO_SMTP_PASSWORD;

  if (!smtpLogin || !smtpPassword) {
    return NextResponse.json({
      error: 'SMTP credentials not configured',
      hasLogin: !!smtpLogin,
      hasPassword: !!smtpPassword,
    }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpLogin,
        pass: smtpPassword,
      },
    });

    // Test connection
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: '"Powerworks Test" <noreply@powerworksgaragedubai.com>',
      to: 'marcus@powerworksgarage.com',
      subject: 'Test Email - Voice Assistant SMTP',
      text: 'This is a test email from the Powerworks voice assistant. If you receive this, SMTP is working correctly!',
      html: '<h1>SMTP Test Successful!</h1><p>This is a test email from the Powerworks voice assistant. If you receive this, SMTP is working correctly!</p>',
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (error) {
    console.error('SMTP test error:', error);
    return NextResponse.json({
      error: 'SMTP test failed',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
