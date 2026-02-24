'use client';

import { ReactNode } from 'react';
import { BOOKING_URL } from '@/lib/constants';

interface BookingButtonProps {
  children: ReactNode;
  className?: string;
  bookingUrl?: string;
}

export default function BookingButton({ children, className = '', bookingUrl }: BookingButtonProps) {
  const handleClick = () => {
    window.open(bookingUrl || BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
