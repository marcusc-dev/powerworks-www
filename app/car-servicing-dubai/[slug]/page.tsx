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
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.heroImage],
    },
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

  return <ServicePageClient service={service} relatedServices={relatedServices} reviews={serviceReviews} vehicleMakes={VEHICLE_MAKES} />;
}
