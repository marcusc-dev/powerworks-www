import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SuccessClient from './SuccessClient';

export const metadata: Metadata = {
  title: 'Payment Successful | Powerworks Garage Dubai',
  description: 'Your payment to Powerworks Garage has been received. Thank you!',
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="pt-32 pb-20 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 animate-pulse">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          </div>
        }
      >
        <SuccessClient />
      </Suspense>
      <Footer />
    </div>
  );
}
