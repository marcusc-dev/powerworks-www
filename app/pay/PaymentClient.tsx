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
} from 'lucide-react';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

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
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-md mx-auto px-4">
        {/* Page heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-2">
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
          <div className="p-6 space-y-5">
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
      </div>
    </section>
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
