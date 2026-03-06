import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import Stripe from 'stripe';

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

      console.log(
        `[Payment Confirmed] Invoice: ${invoice} | Amount: ${amountTotal} ${currency} | Email: ${customerEmail} | Source: ${source}`
      );

      // Future: persist payment record to database
      // Future: send confirmation email
      // Future: update CRM / invoice system
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
