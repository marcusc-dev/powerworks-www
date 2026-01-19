import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Jost } from 'next/font/google';
import './globals.css';
import { VoiceAssistantProvider } from '@/components/voice';

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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '08:00',
      closes: '16:00',
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
    'https://www.youtube.com/@PowerworksGarage',
    'https://www.linkedin.com/company/powerworks-garage',
  ],
  founder: {
    '@type': 'Person',
    name: 'Glenn Power',
    jobTitle: 'Owner & Master Technician',
    description: 'British automotive expert with over 25 years of experience in vehicle repair and maintenance.',
  },
  foundingDate: '2015',
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'Place', name: 'Al Quoz' },
    { '@type': 'Place', name: 'Business Bay' },
    { '@type': 'Place', name: 'Downtown Dubai' },
    { '@type': 'Place', name: 'JLT' },
    { '@type': 'Place', name: 'Dubai Marina' },
    { '@type': 'Place', name: 'Jumeirah' },
    { '@type': 'Place', name: 'Dubai Investment Park' },
  ],
  knowsAbout: [
    'BMW repair Dubai',
    'Mercedes service Dubai',
    'Land Rover maintenance',
    'Range Rover specialist',
    'Porsche service Dubai',
    'European car diagnostics',
    'AC repair Dubai',
    'Car battery replacement Dubai',
    'Brake service Dubai',
    'Transmission repair',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Service Dubai',
          description: 'Comprehensive maintenance for all makes and models',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '349',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AC Repair Dubai',
          description: 'Expert AC diagnostics and repair for Dubai climate',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '199',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Oil Change Dubai',
          description: 'Premium oils and filters to protect your engine',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '199',
          maxPrice: '450',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Battery Replacement Dubai',
          description: 'High-performance batteries for reliable starting in Dubai heat',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '299',
          maxPrice: '1200',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brake Service Dubai',
          description: 'Safety-first brake pad and rotor services',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '299',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pre-Purchase Inspection',
          description: 'Detailed inspection reports for used car buyers',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '349',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Engine Repair',
          description: 'From tune-ups to complete overhauls by certified professionals',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: '299',
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KH2CHZ9M');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH2CHZ9M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* Voice Assistant - Floating Button on Every Page */}
        <VoiceAssistantProvider />
      </body>
    </html>
  );
}
