import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  vehicle?: string;
  service?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Build HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; color: #e63946; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin-bottom: 20px; }
    .section h3 { color: #1a1a2e; border-bottom: 2px solid #e63946; padding-bottom: 5px; }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #e63946; margin-top: 10px; }
    .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
    .cta { display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin: 5px; }
    .cta-phone { background: #e63946; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>POWERWORKS</h1>
      <p>New Website Enquiry</p>
    </div>
    <div class="content">
      <div class="section">
        <h3>Customer Details</h3>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${body.name}</span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value"><a href="tel:${body.phone}">${body.phone}</a></span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">${body.email ? `<a href="mailto:${body.email}">${body.email}</a>` : 'Not provided'}</span>
        </div>
        <a href="tel:${body.phone}" class="cta cta-phone">Call Customer</a>
        <a href="https://wa.me/${body.phone.replace(/[^0-9]/g, '')}" class="cta">WhatsApp</a>
      </div>

      <div class="section">
        <h3>Vehicle Information</h3>
        <div class="field">
          <span class="label">Vehicle:</span>
          <span class="value">${body.vehicle || 'Not specified'}</span>
        </div>
        <div class="field">
          <span class="label">Service Required:</span>
          <span class="value">${body.service || 'Not specified'}</span>
        </div>
      </div>

      <div class="section">
        <h3>Message</h3>
        <div class="message-box">
          ${body.message ? body.message.replace(/\n/g, '<br>') : 'No message provided'}
        </div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the Powerworks website contact form.
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'Powerworks Website <website@powerworksgarage.com>',
      to: ['marcus@powerworksgarage.com'],
      replyTo: body.email || undefined,
      subject: `New Enquiry: ${body.service || 'General'} - ${body.name}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Contact form email sent:', data?.id);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
