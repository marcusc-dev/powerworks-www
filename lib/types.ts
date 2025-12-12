import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BrandItem {
  name: string;
  logo: string;
  url: string;
  slug?: string;
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
