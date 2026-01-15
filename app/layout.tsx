import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Jost } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Powerworks Garage | British-Owned Car Repair Specialists in Dubai',
  description: 'British-owned car repair and service centre in Dubai. 20+ years experience, honest diagnostics, transparent pricing. Specialists in European and Japanese vehicles.',
  keywords: 'car repair dubai, car service dubai, british garage dubai, land rover service dubai, bmw repair dubai, mercedes service dubai, auto repair al quoz',
  icons: {
    icon: [
      { url: '/Icons/favicon.ico' },
      { url: '/Icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/Icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Powerworks Garage | British-Owned Car Repair Specialists in Dubai',
    description: 'British precision meets Dubai hospitality. Your trusted car repair and service centre with 20+ years experience.',
    type: 'website',
    url: 'https://powerworksgarage.com',
    images: [
      {
        url: 'https://powerworksgarage.com/full_logo.png',
        width: 1200,
        height: 630,
        alt: 'Powerworks Garage Dubai',
      },
    ],
  },
  metadataBase: new URL('https://powerworksgarage.com'),
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Powerworks Garage',
  image: 'https://powerworksgarage.com/full_logo.png',
  logo: 'https://powerworksgarage.com/full_logo.png',
  description: 'British-owned car repair and service centre in Dubai. Specialists in European and Japanese vehicles with 20+ years experience.',
  url: 'https://powerworksgarage.com',
  telephone: '+971521217425',
  email: 'info@powerworksgarage.ae',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Quoz Industrial Area 3',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: '',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.1065,
    longitude: 55.2274,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'AED',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/powerworksgarage',
    'https://www.facebook.com/powerworksgarage',
  ],
  areaServed: {
    '@type': 'City',
    name: 'Dubai',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Service',
          description: 'Comprehensive maintenance for all makes and models',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AC Repair',
          description: 'Expert AC diagnostics and repair for Dubai climate',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Engine Repair',
          description: 'From tune-ups to complete overhauls by certified professionals',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fleet Maintenance',
          description: 'Corporate fleet maintenance programs with pickup and delivery',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
