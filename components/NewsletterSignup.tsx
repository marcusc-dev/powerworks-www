'use client';

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  source?: string;
  variant?: 'light' | 'dark';
}

export default function NewsletterSignup({ source = 'footer', variant = 'dark' }: NewsletterSignupProps) {
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
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'email_signup', source });
    } catch {
      setStatus('error');
    }
  }

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={`rounded-2xl p-5 ${isDark ? 'bg-gray-800' : 'bg-emerald-50'}`}>
        <div className="flex items-center gap-2.5">
          <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-emerald-700'}`}>
            You&apos;re on the list!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Mail className={`w-5 h-5 ${isDark ? 'text-power-red' : 'text-power-blue'}`} />
        <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Stay in the Loop
        </h4>
      </div>
      <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Get service reminders, seasonal tips, and exclusive offers. No spam, ever.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={`flex-1 min-w-0 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-power-blue transition-all ${
            isDark
              ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-500'
              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-power-red text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-all flex items-center gap-1.5 disabled:opacity-70 flex-shrink-0"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className={`text-xs mt-2 ${isDark ? 'text-red-400' : 'text-red-500'}`}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
