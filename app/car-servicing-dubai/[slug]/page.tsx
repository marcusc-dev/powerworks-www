import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, getServiceBySlug, getRelatedServices } from '@/lib/services-data';
import { getReviewsByTags } from '@/lib/reviews-data';
import { VEHICLE_MAKES } from '@/lib/vehicle-makes-data';
import ServicePageClient from './ServicePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Powerworks Garage Dubai',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/car-servicing-dubai/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.heroImage],
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

// Generate Service Schema for SEO
function generateServiceSchema(service: { title: string; description: string; priceFrom: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
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
    url: `https://powerworksgarage.com/car-servicing-dubai/${service.slug}`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedServices);
  const serviceReviews = service.reviewTags ? getReviewsByTags(service.reviewTags) : [];

  // Generate structured data for SEO
  const faqSchema = generateFAQSchema(service.faqs);
  const serviceSchema = generateServiceSchema(service);

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
      <ServicePageClient service={service} relatedServices={relatedServices} reviews={serviceReviews} vehicleMakes={VEHICLE_MAKES} />
    </>
  );
}
