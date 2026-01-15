import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VEHICLE_MAKES, getMakeBySlug } from '@/lib/vehicle-makes-data';
import MakePageClient from './MakePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VEHICLE_MAKES.map((make) => ({
    slug: make.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const make = getMakeBySlug(slug);

  if (!make) {
    return {
      title: 'Make Not Found | Powerworks Garage Dubai',
    };
  }

  return {
    title: make.metaTitle,
    description: make.metaDescription,
    openGraph: {
      title: make.metaTitle,
      description: make.metaDescription,
    },
  };
}

export default async function MakePage({ params }: PageProps) {
  const { slug } = await params;
  const make = getMakeBySlug(slug);

  if (!make) {
    notFound();
  }

  return <MakePageClient make={make} />;
}
