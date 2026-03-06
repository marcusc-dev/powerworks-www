import type { Metadata } from 'next';
import { Suspense } from 'react';
import PaymentClient from './PaymentClient';

export const metadata: Metadata = {
  title: 'Pay Your Invoice | Powerworks Garage Dubai',
  description: 'Securely pay your Powerworks Garage invoice online via Stripe.',
  robots: { index: false, follow: false },
};

export default function PayPage() {
  return (
    <Suspense fallback={<PaymentSkeleton />}>
      <PaymentClient />
    </Suspense>
  );
}

function PaymentSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-6" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
        <div className="h-12 bg-gray-200 rounded-xl mb-4" />
        <div className="h-12 bg-gray-200 rounded-xl mb-4" />
        <div className="h-14 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
