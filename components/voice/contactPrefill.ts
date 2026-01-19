// Contact Form Prefill Utilities

import { ContactPrefill } from './types';

/**
 * Builds a URL to the contact page with prefilled query parameters
 */
export function buildContactUrl(prefill: ContactPrefill): string {
  const params = new URLSearchParams();

  if (prefill.name) {
    params.set('name', prefill.name);
  }

  if (prefill.phone) {
    params.set('phone', prefill.phone);
  }

  if (prefill.message) {
    // Encode the message properly, preserving line breaks
    params.set('message', prefill.message);
  }

  if (prefill.page) {
    params.set('page', prefill.page);
  }

  const queryString = params.toString();
  return queryString ? `/contact?${queryString}` : '/contact';
}

/**
 * Parses contact prefill data from URL search params
 */
export function parseContactParams(searchParams: URLSearchParams): ContactPrefill {
  return {
    name: searchParams.get('name') || undefined,
    phone: searchParams.get('phone') || undefined,
    message: searchParams.get('message') || undefined,
    page: searchParams.get('page') || undefined,
  };
}

/**
 * WhatsApp URL for Powerworks Garage
 */
export const WHATSAPP_URL = 'https://wa.me/971521217425';

/**
 * Builds a WhatsApp URL with a pre-filled message
 */
export function buildWhatsAppUrl(message?: string): string {
  if (message) {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }
  return WHATSAPP_URL;
}
