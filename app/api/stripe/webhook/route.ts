import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import Stripe from 'stripe';

const BREVO_LIST_ID = 2;

async function subscribeToBrevo(email: string, name?: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[Brevo] BREVO_API_KEY not set, skipping subscribe');
    return;
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {
        ...(name ? { FIRSTNAME: name.split(' ')[0], LASTNAME: name.split(' ').slice(1).join(' ') } : {}),
        SOURCE: 'payment',
      },
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    // "Contact already exist" is fine
    if (data?.message?.includes('already exist')) return;
    throw new Error(`Brevo API error ${res.status}: ${data?.message || res.statusText}`);
  }

  console.log(`[Brevo] Subscribed ${email} to list ${BREVO_LIST_ID}`);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const invoice = session.metadata?.invoice;
      const source = session.metadata?.source;
      const amountTotal = session.amount_total;
      const currency = session.currency;
      const customerEmail = session.customer_details?.email;
      const customerName = session.metadata?.customer_name || session.customer_details?.name;
      const marketingOptIn = session.metadata?.marketing_opt_in === 'true';

      console.log(
        `[Payment Confirmed] Invoice: ${invoice} | Amount: ${amountTotal} ${currency} | Email: ${customerEmail} | Source: ${source} | OptIn: ${marketingOptIn}`
      );

      // Subscribe to Brevo mailing list if opted in
      if (marketingOptIn && customerEmail) {
        subscribeToBrevo(customerEmail, customerName || undefined).catch((err) =>
          console.error('[Webhook] Brevo subscribe failed:', err)
        );
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const invoice = paymentIntent.metadata?.invoice;
      console.error(
        `[Payment Failed] Invoice: ${invoice} | Error: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }

    default:
      // Unhandled event type — ignore silently
      break;
  }

  return NextResponse.json({ received: true });
}
