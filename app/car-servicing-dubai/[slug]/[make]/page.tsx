import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data';
import { VEHICLE_MAKES, getMakeBySlug } from '@/lib/vehicle-makes-data';
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
  const description = `Expert ${service.shortTitle.toLowerCase()} for ${vehicleMake.name} in Dubai. Specialist technicians, dealer-level diagnostics, genuine parts. ${vehicleMake.popularModels.slice(0, 3).join(', ')} serviced. Al Quoz.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [vehicleMake.vehicleImage || service.heroImage],
    },
  };
}

export default async function MakeServicePage({ params }: PageProps) {
  const { slug, make } = await params;
  const service = getServiceBySlug(slug);
  const vehicleMake = getMakeBySlug(make);

  if (!service || !vehicleMake) {
    notFound();
  }

  return <MakeServicePageClient service={service} vehicleMake={vehicleMake} />;
}
