'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Star,
  Mail,
  MessageCircle,
  Facebook,
  Youtube,
  Phone,
  MapPin,
  Send,
  Loader2,
  ExternalLink,
  Bookmark,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const invoice = searchParams.get('invoice') || '';

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'payment_success',
      invoice,
    });
  }, [invoice]);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-lg mx-auto px-4 space-y-6">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-emerald-600 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-heading mb-1">
              {PAYMENT_CONFIG.copy.successTitle}
            </h1>
            <p className="text-emerald-100 text-sm">
              {PAYMENT_CONFIG.copy.successSubtitle}
            </p>
          </div>

          <div className="px-6 py-5">
            {invoice && (
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-4">
                <span className="text-sm text-gray-500">Invoice Reference</span>
                <span className="font-bold text-gray-900">{invoice}</span>
              </div>
            )}
            <p className="text-gray-500 text-sm text-center">
              Your payment has been processed securely. You&apos;ll receive a confirmation from Stripe shortly.
            </p>
          </div>
        </div>

        {/* Google Review — primary CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-5">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">
              {PAYMENT_CONFIG.copy.reviewHeading}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {PAYMENT_CONFIG.copy.reviewDescription}
            </p>
          </div>
          <a
            href={PAYMENT_CONFIG.reviews.google}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 w-full px-5 py-4 rounded-xl bg-power-blue text-white font-bold text-base hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity={0.8} />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" fillOpacity={0.6} />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity={0.9} />
            </svg>
            {PAYMENT_CONFIG.copy.googleReviewCta}
          </a>
          <a
            href={PAYMENT_CONFIG.reviews.trustpilot}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#00b67a] hover:text-[#00b67a] transition-all"
          >
            <Star className="w-5 h-5 text-[#00b67a]" />
            {PAYMENT_CONFIG.copy.trustpilotReviewCta}
          </a>
        </div>

        {/* Mailing List */}
        <EmailSignup />

        {/* Save Our Details */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-5">
            <Bookmark className="w-6 h-6 text-power-blue mx-auto mb-2" />
            <h2 className="text-lg font-bold text-gray-900 font-heading">
              {PAYMENT_CONFIG.copy.saveContactHeading}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {PAYMENT_CONFIG.copy.saveContactDescription}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={PAYMENT_CONFIG.contact.whatsappMessage}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Save on WhatsApp</p>
                <p className="text-xs text-gray-500 truncate">{PAYMENT_CONFIG.contact.phoneDisplay}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
            </a>

            <a
              href={`tel:${PAYMENT_CONFIG.contact.phone}`}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-power-blue/10 hover:bg-power-blue/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-power-blue flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Call Us</p>
                <p className="text-xs text-gray-500">{PAYMENT_CONFIG.contact.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${PAYMENT_CONFIG.contact.email}`}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <p className="text-xs text-gray-500 truncate">{PAYMENT_CONFIG.contact.email}</p>
              </div>
            </a>

            <a
              href={PAYMENT_CONFIG.contact.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Find Us</p>
                <p className="text-xs text-gray-500">{PAYMENT_CONFIG.contact.location}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 font-heading text-center mb-4">Follow Us</h2>
          <div className="flex justify-center gap-3">
            <a
              href={PAYMENT_CONFIG.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={PAYMENT_CONFIG.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={PAYMENT_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'email_signup', source: 'payment_success' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="text-center mb-5">
        <Mail className="w-6 h-6 text-power-blue mx-auto mb-2" />
        <h2 className="text-lg font-bold text-gray-900 font-heading">
          {PAYMENT_CONFIG.copy.mailingListHeading}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {PAYMENT_CONFIG.copy.mailingListDescription}
        </p>
      </div>

      {status === 'success' ? (
        <div className="flex items-center gap-2 justify-center text-emerald-600 bg-emerald-50 rounded-xl p-4">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">You&apos;re on the list!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-power-blue text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-blue-900 transition-all flex items-center gap-1.5 disabled:opacity-70 flex-shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Join
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2 text-center">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
