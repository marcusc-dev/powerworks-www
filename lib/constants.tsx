import {
  Wrench,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  CarFront,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Clock,
  ShieldCheck,
  Users
} from 'lucide-react';
import { ServiceItem, Testimonial, NavItem, BrandItem, BlogPost, FleetFeature } from './types';

// Images - using local assets from public folder
export const IMAGES = {
  logo: "/full_logo.png",

  owner: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  hero: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000",
  shopInterior: "https://images.unsplash.com/photo-1505798577917-36e1183590f2?auto=format&fit=crop&q=80&w=1200",
  logoUnionJack: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",

  // Fleet/Partner Image - Replace with specific 'We Will Fix It' van image if available
  fleet: "https://images.unsplash.com/photo-1616401784845-180886ba9bb1?auto=format&fit=crop&q=80&w=1200"
};

export const LOTTIE_URLS = {
  scrollDown: "https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json",
  mechanic: "https://assets3.lottiefiles.com/packages/lf20_3vbOcw.json",
  deliveryTruck: "https://lottie.host/7e008323-9556-432d-9051-93c4e36504a5/N6zF6i8qjW.json",
  chat: "https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json"
};

export const HERO_SLIDES = [
  "/pwg_slide1.jpg", // Technician with diagnostic equipment
  "/pwg_slide2.jpg", // Powerworks branding wall
  "/pwg_slide3.jpg", // Blue Porsche in workshop
  "/pwg_slide4.jpg"  // Glenn - owner
];

export const HERO_HEADLINES = [
  {
    primary: "British Precision.",
    secondary: "Dubai Hospitality."
  },
  {
    primary: "Your Car.",
    secondary: "Our Priority."
  },
  {
    primary: "Dealer Standards.",
    secondary: "Honest Pricing."
  }
];

export const BRANDS: BrandItem[] = [
  { name: "Land Rover", logo: "/landrover.png", url: "/makes/land-rover", slug: "land-rover", vehicleImage: "/vehicles/land-rover.jpg" },
  { name: "Range Rover", logo: "/logos/rangerover.png", url: "/makes/range-rover", slug: "range-rover", vehicleImage: "/vehicles/range-rover.jpg" },
  { name: "Porsche", logo: "/porsche.png", url: "/makes/porsche", slug: "porsche", vehicleImage: "/vehicles/porsche.jpg" },
  { name: "Bentley", logo: "/bentley.png", url: "/makes/bentley", slug: "bentley", vehicleImage: "/vehicles/bentley.jpg" },
  { name: "Mercedes-Benz", logo: "/logos/mercedes.png", url: "/makes/mercedes", slug: "mercedes", vehicleImage: "/vehicles/mercedes.jpg" },
  { name: "Rolls-Royce", logo: "/logos/rollsroyce.png", url: "/makes/rolls-royce", slug: "rolls-royce", vehicleImage: "/vehicles/rolls-royce.jpg" },
  { name: "Volkswagen", logo: "/vw.png", url: "/makes/volkswagen", slug: "volkswagen", vehicleImage: "/vehicles/volkswagen.jpg" },
  { name: "Jaguar", logo: "/logos/jaguar.png", url: "/makes/jaguar", slug: "jaguar", vehicleImage: "/vehicles/jaguar.jpg" },
  { name: "Aston Martin", logo: "/logos/astonmartin.png", url: "/makes/aston-martin", slug: "aston-martin", vehicleImage: "/vehicles/aston-martin.jpg" },
  { name: "Audi", logo: "/audi.png", url: "/makes/audi", slug: "audi" },
];

export const SERVICES: ServiceItem[] = [
  { title: "Car Service", description: "Comprehensive maintenance for all makes and models.", icon: CarFront, slug: "car-service-dubai" },
  { title: "AC Repair", description: "Keep your cool in the Dubai heat with expert AC diagnostics.", icon: ThermometerSnowflake, slug: "ac-repair-dubai" },
  { title: "Oil Change", description: "Premium oils and filters to protect your engine's longevity.", icon: Droplet, slug: "oil-change-dubai" },
  { title: "Electrical Diagnostics", description: "Advanced troubleshooting for modern vehicle electronics.", icon: Zap, slug: "electrical-diagnostics-dubai" },
  { title: "Brake Service", description: "Safety first with high-quality brake pads and rotor services.", icon: Disc, slug: "brake-service-dubai" },
  { title: "Suspension", description: "Smooth ride guarantee with shock and strut replacement.", icon: Activity, slug: "suspension-repair-dubai" },
  { title: "Transmission Repair", description: "Expert gearbox maintenance and fluid changes.", icon: Cog, slug: "transmission-repair-dubai" },
  { title: "Engine Work", description: "From tune-ups to complete overhauls by certified pros.", icon: Wrench, slug: "engine-repair-dubai" },
  { title: "Battery Replacement", description: "High-performance batteries for reliable starting.", icon: Battery, slug: "battery-replacement-dubai" },
  { title: "Tyre Replacement", description: "Top brands fitted and balanced perfectly.", icon: CircleDot, slug: "tyre-replacement-dubai" },
  { title: "Pre-Purchase Inspection", description: "Buy with confidence. Detailed reports on used cars.", icon: ClipboardCheck, slug: "pre-purchase-inspection-dubai" },
];

export const FLEET_FEATURES: FleetFeature[] = [
  {
    title: "Free Pickup & Dropoff",
    description: "We collect your fleet vehicles and return them to your HQ, saving your team valuable time.",
    icon: Truck
  },
  {
    title: "100% Uptime Focus",
    description: "Preventative maintenance schedules designed to keep your business moving without interruption.",
    icon: Clock
  },
  {
    title: "Expert & Reliable",
    description: "British-standard mechanical work you can trust, ensuring the longevity of your assets.",
    icon: ShieldCheck
  },
  {
    title: "Priority Service",
    description: "Dedicated account management and fast-track booking for all corporate partners.",
    icon: Users
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Why Dubai Summers Kill Car Batteries",
    excerpt: "Heat is the #1 enemy of your battery. Learn why they fail so often here and how to spot the warning signs before you get stranded.",
    category: "Maintenance",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AC Blowing Warm? It's Not Always Gas",
    excerpt: "Before you pay for a regas, read this. The most common AC issues in the UAE are often related to compressors and condensers.",
    category: "AC Repair",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Truth About 'Lifetime' Transmission Fluid",
    excerpt: "Manufacturers say it lasts forever. Mechanics know it doesn't. Here is the recommended interval for changing gearbox oil in this climate.",
    category: "Expert Advice",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800"
  }
];

export const REVIEWS: Testimonial[] = [
  {
    name: "John Mayes",
    rating: 5,
    text: "Glenn and his team are brilliant. Service is quick and thorough, quality is excellent and competitively priced (brilliant value for money for the trust and integrity). They always go out of their way to help.",
    date: "Google Review"
  },
  {
    name: "Laura",
    rating: 5,
    text: "Great service from Justin from start to finish, I needed a part replacing urgently and the team got it done within an hour!",
    date: "Google Review"
  },
  {
    name: "Mizia Buzaladze",
    rating: 5,
    text: "I had an excellent experience at Power Works Garage! Everything was handled very professionally and on time. The team is extremely skilled, friendly, and approachable. I really appreciate their dedication and great customer service.",
    date: "Google Review"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Fleet Services", href: "/fleet-service-dubai" },
  { label: "Ask Glenn", href: "/ask-glenn" },
  { label: "Reviews", href: "/reviews" },
];

// Contact is handled separately in Navbar as a CTA button
