// ─── Payment & Post-Payment Configuration ───
// Edit these values to update links, text, and branding across the payment flow.

export const PAYMENT_CONFIG = {
  // Currency & amounts
  defaultCurrency: 'aed' as const,
  minimumAmount: 1, // AED
  maximumAmount: 500_000, // AED

  // Contact details (shown on payment + success pages)
  contact: {
    phone: '+971521217425',
    phoneDisplay: '052 121 7425',
    whatsapp: 'https://wa.me/971521217425',
    whatsappMessage: 'https://wa.me/971521217425?text=Hi%20Glenn%2C%20I%20just%20made%20a%20payment%20and%20have%20a%20question.',
    email: 'help@powerworksgarage.com',
    location: 'Dubai Investment Park 1, Dubai, UAE',
    googleMapsUrl: 'https://maps.app.goo.gl/powerworks',
  },

  // Review links
  reviews: {
    google: 'https://g.page/r/CaXX8WWhIsOLEBM/review',
    trustpilot: 'https://www.trustpilot.com/evaluate/powerworksgarage.com',
  },

  // Social links
  social: {
    facebook: 'https://www.facebook.com/powerworksdxb/',
    youtube: 'https://www.youtube.com/@PowerworksGarage',
    instagram: 'https://www.instagram.com/powerworksgarage/',
  },

  // Page copy
  copy: {
    paymentPageTitle: 'Pay Your Invoice',
    paymentPageSubtitle: 'Secure payment processed by Stripe',
    successTitle: 'Payment Successful',
    successSubtitle: 'Thank you for choosing Powerworks Garage.',
    mailingListHeading: 'Stay in the Loop',
    mailingListDescription: 'Get service reminders, seasonal tips, and exclusive offers. No spam, ever.',
    reviewHeading: 'Enjoyed Your Experience?',
    reviewDescription: 'If you were happy with our service, we\'d really appreciate a quick review. It helps other car owners find a garage they can trust.',
    googleReviewCta: 'Review on Google',
    trustpilotReviewCta: 'Review on Trustpilot',
    saveContactHeading: 'Save Our Details',
    saveContactDescription: 'Keep our number handy for your next service, MOT, or any car trouble.',
  },

  // Stripe product description shown in checkout
  stripeProductName: 'Powerworks Garage',
  stripeStatementDescriptor: 'POWERWORKS GARAGE', // max 22 chars, uppercase

  // Base URL for redirects (overridden by NEXT_PUBLIC_BASE_URL env var)
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://powerworksgarage.com',
} as const;

export type PaymentCurrency = typeof PAYMENT_CONFIG.defaultCurrency;
