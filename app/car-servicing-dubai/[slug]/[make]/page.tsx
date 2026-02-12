import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data';
import { VEHICLE_MAKES, getMakeBySlug } from '@/lib/vehicle-makes-data';
import { getReviewsByCarMake } from '@/lib/reviews-data';
import MakeServicePageClient from './MakeServicePageClient';

interface PageProps {
  params: Promise<{ slug: string; make: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; make: string }[] = [];

  for (const service of SERVICES_DATA) {
    for (const make of VEHICLE_MAKES) {
      params.push({
        slug: service.slug,
        make: make.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, make } = await params;
  const service = getServiceBySlug(slug);
  const vehicleMake = getMakeBySlug(make);

  if (!service || !vehicleMake) {
    return {
      title: 'Service Not Found | Powerworks Garage Dubai',
    };
  }

  const title = `${service.shortTitle} for ${vehicleMake.name} Dubai | Powerworks Garage`;
  const description = `Expert ${service.shortTitle.toLowerCase()} for ${vehicleMake.name} in Dubai. From ${service.priceFrom}. Specialist technicians, dealer-level diagnostics, genuine parts. ${vehicleMake.popularModels.slice(0, 3).join(', ')} serviced. Same-day service in Al Quoz.`;
  const pageUrl = `/car-servicing-dubai/${slug}/${make}`;

  return {
    title,
    description,
    keywords: `${service.shortTitle.toLowerCase()} ${vehicleMake.name.toLowerCase()}, ${vehicleMake.name.toLowerCase()} ${service.shortTitle.toLowerCase()} dubai, ${vehicleMake.popularModels.slice(0, 3).map(m => `${vehicleMake.shortName} ${m} ${service.shortTitle.toLowerCase()}`).join(', ')}, ${service.shortTitle.toLowerCase()} al quoz`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: `https://powerworksgarage.com${pageUrl}`,
      type: 'website',
      images: [vehicleMake.vehicleImage || service.heroImage],
    },
  };
}

// Generate FAQ Schema for SEO
function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate Service Schema specific to this make+service combination
function generateServiceSchema(service: { title: string; shortTitle: string; description: string; priceFrom: string; slug: string }, vehicleMake: { name: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.shortTitle} for ${vehicleMake.name}`,
    description: `Expert ${service.shortTitle.toLowerCase()} for ${vehicleMake.name} vehicles in Dubai. Dealer-level diagnostics and genuine parts at competitive prices.`,
    provider: {
      '@type': 'AutoRepair',
      name: 'Powerworks Garage',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Al Quoz Industrial Area 3',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      telephone: '+971521217425',
      url: 'https://powerworksgarage.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: service.priceFrom.replace(/[^0-9]/g, ''),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AED',
        price: service.priceFrom.replace(/[^0-9]/g, ''),
        description: `Starting from ${service.priceFrom}`,
      },
    },
    url: `https://powerworksgarage.com/car-servicing-dubai/${service.slug}/${vehicleMake.slug}`,
  };
}

export default async function MakeServicePage({ params }: PageProps) {
  const { slug, make } = await params;
  const service = getServiceBySlug(slug);
  const vehicleMake = getMakeBySlug(make);

  if (!service || !vehicleMake) {
    notFound();
  }

  // Generate make-specific FAQs for schema (same logic as client component)
  const makeServiceFAQs: { question: string; answer: string }[] = [];

  if (service.faqs.length > 0) {
    makeServiceFAQs.push({
      question: `How often should I get ${service.shortTitle.toLowerCase()} for my ${vehicleMake.name}?`,
      answer: `For ${vehicleMake.name} vehicles in Dubai's climate, we recommend ${service.shortTitle.toLowerCase()} based on your specific model's requirements. ${vehicleMake.name} vehicles benefit from regular maintenance schedules - typically every 10,000-15,000 km or annually. Our technicians are familiar with ${vehicleMake.name}'s specific service intervals and can advise based on your exact model.`
    });
  }

  if (vehicleMake.commonIssues.length > 0) {
    makeServiceFAQs.push({
      question: `What are common ${service.shortTitle.toLowerCase()} issues in ${vehicleMake.name} vehicles?`,
      answer: `${vehicleMake.name} vehicles can experience specific issues that we frequently address: ${vehicleMake.commonIssues.slice(0, 3).join(', ')}. Our ${vehicleMake.name} specialists are trained to identify and resolve these issues efficiently using proper diagnostic equipment.`
    });
  }

  if (vehicleMake.specializations.length > 0) {
    makeServiceFAQs.push({
      question: `Do you have specialist equipment for ${vehicleMake.name} ${service.shortTitle.toLowerCase()}?`,
      answer: `Yes, we use ${vehicleMake.specializations[0]} for accurate diagnosis and repair of ${vehicleMake.name} vehicles. This dealer-level equipment allows us to perform ${service.shortTitle.toLowerCase()} to factory standards, ensuring your ${vehicleMake.name} receives the care it deserves.`
    });
  }

  makeServiceFAQs.push({
    question: `Will ${service.shortTitle.toLowerCase()} at Powerworks affect my ${vehicleMake.name} warranty?`,
    answer: `No. Under UAE consumer protection laws, you can service your ${vehicleMake.name} at any qualified independent garage without affecting your manufacturer warranty. We use genuine or OEM-equivalent parts and provide full documentation that meets ${vehicleMake.name}'s standards.`
  });

  // Get make-specific reviews
  const makeReviews = getReviewsByCarMake(vehicleMake.name);

  // Generate structured data for SEO
  const faqSchema = generateFAQSchema(makeServiceFAQs);
  const serviceSchema = generateServiceSchema(service, vehicleMake);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <MakeServicePageClient service={service} vehicleMake={vehicleMake} reviews={makeReviews} />
    </>
  );
}
