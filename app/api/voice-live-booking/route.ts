'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface BookingRequest {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_type: string;
  vehicle?: string;
  requested_time?: string;
  issue_summary: string;
  page_context?: string;
  conversation_transcript?: string;
}

// Send booking notification email to Powerworks
async function sendBookingNotification(booking: BookingRequest): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  try {
    const resend = new Resend(resendApiKey);

    const htmlContent = `
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
      <span class="badge">Ask Glenn (Live)</span>
    </div>
    <div class="content">
      <div class="section">
        <h3>Customer Details</h3>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${booking.customer_name}</span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value"><a href="tel:${booking.customer_phone}">${booking.customer_phone}</a></span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">${booking.customer_email ? `<a href="mailto:${booking.customer_email}">${booking.customer_email}</a>` : 'Not provided'}</span>
        </div>
        <a href="tel:${booking.customer_phone}" class="cta cta-phone">Call Customer</a>
        <a href="https://wa.me/${booking.customer_phone.replace(/[^0-9]/g, '')}" class="cta">WhatsApp</a>
      </div>

      <div class="section">
        <h3>Booking Request</h3>
        <div class="field">
          <span class="label">Requested Time:</span>
          <span class="value">${booking.requested_time || 'To be confirmed'}</span>
        </div>
        <div class="field">
          <span class="label">Service:</span>
          <span class="value">${booking.service_type}</span>
        </div>
        <div class="field">
          <span class="label">Vehicle:</span>
          <span class="value">${booking.vehicle || 'Not specified'}</span>
        </div>
      </div>

      <div class="section">
        <h3>Issue Summary</h3>
        <div class="summary-box">${booking.issue_summary.replace(/\n/g, '<br>')}</div>
      </div>

      ${booking.conversation_transcript ? `
      <div class="section">
        <h3>Full Conversation Transcript</h3>
        <div class="summary-box" style="font-size: 13px; line-height: 1.8;">${booking.conversation_transcript.replace(/\n/g, '<br>').replace(/Customer:/g, '<strong style="color: #e63946;">Customer:</strong>').replace(/Glenn:/g, '<strong style="color: #1a1a2e;">Glenn:</strong>')}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Source: Voice Assistant (Live API) on ${booking.page_context || '/'}</p>
      <p>This booking was made through the AI voice assistant on the website.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'Powerworks Voice <voice@powerworksgarage.com>',
      to: ['marcus@powerworksgarage.com'],
      replyTo: booking.customer_email || undefined,
      subject: `Voice Booking: ${booking.service_type} - ${booking.customer_name}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log('Voice Live booking notification sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    return false;
  }
}

// Send confirmation email to customer (if email provided)
async function sendCustomerConfirmation(booking: BookingRequest): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || !booking.customer_email) {
    return false;
  }

  try {
    const resend = new Resend(resendApiKey);

    const htmlContent = `
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
      <p class="greeting">Hi ${booking.customer_name},</p>
      <p>Thank you for your booking request through our voice assistant. We've received your details and our team will call you shortly to confirm your appointment.</p>

      <div class="details">
        <h3>Your Booking Request</h3>
        <p><strong>Service:</strong> ${booking.service_type}</p>
        <p><strong>Requested Time:</strong> ${booking.requested_time || 'To be confirmed'}</p>
        ${booking.vehicle ? `<p><strong>Vehicle:</strong> ${booking.vehicle}</p>` : ''}
      </div>

      <p>If you need to reach us before we call, you can contact us directly:</p>

      <a href="https://wa.me/971521217425" class="cta">WhatsApp Us</a>

      <div class="contact-info">
        <p><strong>Phone:</strong> <a href="tel:+971521217425">052 121 7425</a></p>
        <p><strong>Location:</strong> Dubai Investment Park 1, Dubai</p>
        <p><strong>Hours:</strong> Monday - Sunday, 8AM - 6PM</p>
      </div>
    </div>
    <div class="footer">
      <p>Powerworks Garage Dubai<br>British-Owned - Professional Service</p>
      <p style="font-size: 11px; color: #999;">This email was sent because you made a booking request through our website voice assistant.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'Powerworks Garage <noreply@powerworksgarage.com>',
      to: [booking.customer_email],
      replyTo: 'info@powerworksgarage.com',
      subject: 'Booking Request Received - Powerworks Garage',
      html: htmlContent,
    });

    if (error) {
      console.error('Resend customer confirmation error:', error);
      return false;
    }

    console.log('Customer confirmation sent:', data?.id);
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.customer_name || !body.customer_phone || !body.service_type || !body.issue_summary) {
      return NextResponse.json(
        { error: 'Missing required fields: customer_name, customer_phone, service_type, issue_summary' },
        { status: 400 }
      );
    }

    console.log('Received booking request from Gemini Live:', body);

    // Send notification to Powerworks
    const notificationSent = await sendBookingNotification(body);

    // Send confirmation to customer if email provided
    let customerConfirmationSent = false;
    if (body.customer_email) {
      customerConfirmationSent = await sendCustomerConfirmation(body);
    }

    return NextResponse.json({
      success: notificationSent,
      notification_sent: notificationSent,
      customer_confirmation_sent: customerConfirmationSent,
    });
  } catch (error) {
    console.error('Voice live booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
