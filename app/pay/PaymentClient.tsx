'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Loader2,
  AlertCircle,
  Phone,
  MessageCircle,
  CreditCard,
  FileText,
  User,
  Mail,
  Receipt,
  Star,
  ExternalLink,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '@/lib/payment-config';
import { REVIEW_STATS } from '@/lib/reviews-data';

const INVOICE_PATTERN = /^[A-Za-z0-9\-_]{1,50}$/;

function formatAmount(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    aed: 'AED',
    usd: 'USD',
    gbp: 'GBP',
    eur: 'EUR',
  };
  const sym = symbols[currency.toLowerCase()] || currency.toUpperCase();
  return `${sym} ${amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PaymentClient() {
  const searchParams = useSearchParams();

  const invoiceParam = searchParams.get('invoice') || '';
  const amountParam = searchParams.get('amount') || '';
  const emailParam = searchParams.get('email') || '';
  const nameParam = searchParams.get('name') || '';
  const currencyParam = searchParams.get('currency') || PAYMENT_CONFIG.defaultCurrency;
  const descriptionParam = searchParams.get('description') || '';
  const sourceParam = searchParams.get('source') || '';

  // Editable state — prefilled from URL params when available
  const [invoice, setInvoice] = useState(invoiceParam);
  const [amount, setAmount] = useState(amountParam);
  const [email, setEmail] = useState(emailParam);
  const [name, setName] = useState(nameParam);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Whether invoice + amount came from URL (prefilled = read-only display)
  const isPrefilled = !!(invoiceParam && amountParam);

  const parsedAmount = parseFloat(amount);
  const isValidInvoice = INVOICE_PATTERN.test(invoice);
  const isValidAmount =
    !isNaN(parsedAmount) &&
    parsedAmount >= PAYMENT_CONFIG.minimumAmount &&
    parsedAmount <= PAYMENT_CONFIG.maximumAmount;

  const canPay = isValidInvoice && isValidAmount;

  useEffect(() => {
    if (canPay && isPrefilled) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'payment_page_view',
        invoice,
        amount: parsedAmount,
        source: sourceParam || 'direct',
      });
    }
  }, [canPay, isPrefilled, invoice, parsedAmount, sourceParam]);

  async function handlePay() {
    if (!isValidInvoice) {
      setError('Please enter a valid invoice reference (e.g. PW-10428).');
      return;
    }
    if (!isValidAmount) {
      setError('Please enter a valid amount.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice,
          amount: parsedAmount,
          currency: currencyParam,
          email: email || undefined,
          name: name || undefined,
          description: descriptionParam || undefined,
          source: sourceParam || undefined,
          marketingOptIn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start payment. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <section className="pt-24 pb-16 md:pt-40 md:pb-28">
      <div className="max-w-md mx-auto px-4">
        {/* Page heading */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 font-heading mb-1.5">
            {PAYMENT_CONFIG.copy.paymentPageTitle}
          </h1>
          <p className="text-gray-500">{PAYMENT_CONFIG.copy.paymentPageSubtitle}</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header — shown only when prefilled */}
          {isPrefilled && (
            <div className="bg-power-dark px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Invoice</p>
                  <p className="text-white text-lg font-bold font-heading">{invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Amount Due</p>
                  <p className="text-white text-2xl font-bold font-heading">
                    {formatAmount(parsedAmount, currencyParam)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Body */}
          <div className="p-5 md:p-6 space-y-4 md:space-y-5">
            {/* Invoice field — editable when not prefilled */}
            {!isPrefilled && (
              <>
                <div>
                  <label htmlFor="pay-invoice" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Receipt className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    Invoice Reference *
                  </label>
                  <input
                    type="text"
                    id="pay-invoice"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                    placeholder="PW-10428"
                  />
                </div>

                <div>
                  <label htmlFor="pay-amount" className="block text-sm font-semibold text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    Amount (AED) *
                  </label>
                  <input
                    type="number"
                    id="pay-amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={PAYMENT_CONFIG.minimumAmount}
                    max={PAYMENT_CONFIG.maximumAmount}
                    step="0.01"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                    placeholder="1450.00"
                  />
                </div>
              </>
            )}

            {/* Name field */}
            {!nameParam && (
              <div>
                <label htmlFor="pay-name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  Your Name
                </label>
                <input
                  type="text"
                  id="pay-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                  placeholder="John Smith"
                />
              </div>
            )}

            {/* Email field */}
            {!emailParam && (
              <div>
                <label htmlFor="pay-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="pay-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
                <p className="text-xs text-gray-400 mt-1.5">For your payment receipt</p>
              </div>
            )}

            {/* Marketing opt-in */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-power-blue focus:ring-power-blue cursor-pointer"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                Allow us to send you updates about your vehicle and occasional special offers and news from Powerworks Garage. You can unsubscribe at any time.
              </span>
            </label>

            {/* Pre-filled customer info display */}
            {(nameParam || emailParam) && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {nameParam && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{nameParam}</span>
                  </div>
                )}
                {emailParam && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{emailParam}</span>
                  </div>
                )}
              </div>
            )}

            {/* Description if provided */}
            {descriptionParam && (
              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>{descriptionParam}</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isLoading}
              className="w-full bg-power-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 group disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting to payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {canPay ? `Pay ${formatAmount(parsedAmount, currencyParam)}` : 'Pay Now'}
                </>
              )}
            </button>

            {/* Security reassurance */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> SSL Encrypted
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Stripe Secure
              </span>
            </div>
          </div>

          {/* Help Block */}
          <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">
            <HelpBlock />
          </div>
        </div>

        {/* Review CTA */}
        <ReviewBlock />
      </div>
    </section>
  );
}

function ReviewBlock() {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(REVIEW_STATS.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-gray-900">{REVIEW_STATS.averageRating}</span>
          <span className="text-sm text-gray-400">({REVIEW_STATS.totalReviews}+ reviews)</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          We love hearing from our customers. If you had a good experience with Powerworks, we&apos;d really appreciate a quick review — it helps other car owners find a garage they can trust.
        </p>

        <a
          href={PAYMENT_CONFIG.reviews.google}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-xl bg-power-blue text-white font-bold text-sm hover:bg-blue-900 transition-all shadow-md hover:shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity={0.8} />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" fillOpacity={0.6} />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity={0.9} />
          </svg>
          Leave a Google Review
          <ExternalLink className="w-4 h-4 opacity-60" />
        </a>
      </div>
    </div>
  );
}

function HelpBlock() {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-3">Questions before paying?</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={PAYMENT_CONFIG.contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/20 transition-colors w-full sm:w-auto justify-center"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Us
        </a>
        <a
          href={`tel:${PAYMENT_CONFIG.contact.phone}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-power-blue/10 text-power-blue font-semibold text-sm hover:bg-power-blue/20 transition-colors w-full sm:w-auto justify-center"
        >
          <Phone className="w-4 h-4" />
          {PAYMENT_CONFIG.contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
