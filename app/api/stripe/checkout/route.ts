import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { PAYMENT_CONFIG } from '@/lib/payment-config';
import Stripe from 'stripe';

const INVOICE_PATTERN = /^[A-Za-z0-9\-_]{1,50}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoice, amount, currency, email, name, description, source } = body;

    // Validate invoice
    if (!invoice || typeof invoice !== 'string' || !INVOICE_PATTERN.test(invoice)) {
      return NextResponse.json(
        { error: 'Invalid invoice reference. Please check and try again.' },
        { status: 400 }
      );
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (
      !amount ||
      isNaN(parsedAmount) ||
      parsedAmount < PAYMENT_CONFIG.minimumAmount ||
      parsedAmount > PAYMENT_CONFIG.maximumAmount
    ) {
      return NextResponse.json(
        { error: `Invalid amount. Must be between ${PAYMENT_CONFIG.minimumAmount} and ${PAYMENT_CONFIG.maximumAmount} AED.` },
        { status: 400 }
      );
    }

    // Validate currency if provided
    const paymentCurrency = (currency || PAYMENT_CONFIG.defaultCurrency).toLowerCase();
    const allowedCurrencies = ['aed', 'usd', 'gbp', 'eur'];
    if (!allowedCurrencies.includes(paymentCurrency)) {
      return NextResponse.json(
        { error: 'Unsupported currency.' },
        { status: 400 }
      );
    }

    // Stripe expects amount in smallest unit (fils for AED = amount * 100)
    const amountInSmallestUnit = Math.round(parsedAmount * 100);

    const baseUrl = PAYMENT_CONFIG.baseUrl;

    // Build success/cancel URLs preserving invoice for the success page
    const successUrl = `${baseUrl}/pay/success?invoice=${encodeURIComponent(invoice)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/pay?invoice=${encodeURIComponent(invoice)}&amount=${parsedAmount}${email ? `&email=${encodeURIComponent(email)}` : ''}${name ? `&name=${encodeURIComponent(name)}` : ''}`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: paymentCurrency,
            product_data: {
              name: PAYMENT_CONFIG.stripeProductName,
              description: description || `Invoice ${invoice}`,
            },
            unit_amount: amountInSmallestUnit,
          },
          quantity: 1,
        },
      ],
      metadata: {
        invoice,
        source: source || 'direct',
      },
      payment_intent_data: {
        metadata: {
          invoice,
          source: source || 'direct',
        },
        statement_descriptor: PAYMENT_CONFIG.stripeStatementDescriptor.slice(0, 22),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    };

    // Pre-fill customer email if provided
    if (email && typeof email === 'string' && email.includes('@')) {
      sessionParams.customer_email = email;
    }

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[Stripe Checkout] Error creating session:', err);
    return NextResponse.json(
      { error: 'Unable to create payment session. Please try again or contact us.' },
      { status: 500 }
    );
  }
}
