import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  serviceImage?: string;
  priceFrom?: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
  // SEO tags for filtering
  carMakes?: string[];
  carModels?: string[];
  services?: string[];
  source?: 'google' | 'facebook' | '2gis' | 'website';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BrandItem {
  name: string;
  logo: string;
  url: string;
  slug: string;
  vehicleImage?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface FleetFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}
