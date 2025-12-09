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
import { ServiceItem, Testimonial, NavItem, BrandItem, BlogPost } from './types';

// Placeholder images - REPLACE THESE URLS WITH THE ACTUAL ASSETS
export const IMAGES = {
  // Use the uploaded logo image here. 
  // If you are running this locally, import the image file or put it in the public folder.
  // For this demo, I am using a placeholder that represents where the logo goes.
  logo: "https://placehold.co/400x150/ffffff/1e3a8a?text=POWERWORKS+LOGO&font=montserrat",
  
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
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000", // Mechanic working
  "https://images.unsplash.com/photo-1505798577917-36e1183590f2?auto=format&fit=crop&q=80&w=2000", // Garage interior
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000", // Engine closeup
  "https://images.unsplash.com/photo-1530046339160-ce3e41600f2e?auto=format&fit=crop&q=80&w=2000"  // Car on lift
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
  { name: "Land Rover", logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Land_Rover_logo_black.svg", url: "#land-rover" },
  { name: "Jaguar", logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Jaguar_Cars_logo_2012.svg", url: "#jaguar" },
  { name: "Range Rover", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Range_Rover_Logo.svg", url: "#range-rover" },
  { name: "Mini", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Mini_logo.svg", url: "#mini" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", url: "#bmw" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_logo.svg", url: "#mercedes" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg", url: "#audi" },
  { name: "Porsche", logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Porsche_Wappen.svg", url: "#porsche" },
  { name: "Bentley", logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/Bentley_logo.svg", url: "#bentley" },
  { name: "Aston Martin", logo: "https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_Lagonda_brand_logo.svg", url: "#aston-martin" },
];

export const SERVICES: ServiceItem[] = [
  { title: "Car Service", description: "Comprehensive maintenance for all makes and models.", icon: CarFront },
  { title: "AC Repair", description: "Keep your cool in the Dubai heat with expert AC diagnostics.", icon: ThermometerSnowflake },
  { title: "Oil Change", description: "Premium oils and filters to protect your engine's longevity.", icon: Droplet },
  { title: "Electrical Diagnostics", description: "Advanced troubleshooting for modern vehicle electronics.", icon: Zap },
  { title: "Brake Service", description: "Safety first with high-quality brake pads and rotor services.", icon: Disc },
  { title: "Suspension", description: "Smooth ride guarantee with shock and strut replacement.", icon: Activity },
  { title: "Transmission Repair", description: "Expert gearbox maintenance and fluid changes.", icon: Cog },
  { title: "Engine Work", description: "From tune-ups to complete overhauls by certified pros.", icon: Wrench },
  { title: "Battery Replacement", description: "High-performance batteries for reliable starting.", icon: Battery },
  { title: "Tyre Replacement", description: "Top brands fitted and balanced perfectly.", icon: CircleDot },
  { title: "Pre-Purchase Inspection", description: "Buy with confidence. Detailed reports on used cars.", icon: ClipboardCheck },
];

export const FLEET_FEATURES = [
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
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AC Blowing Warm? It's Not Always Gas",
    excerpt: "Before you pay for a regas, read this. The most common AC issues in the UAE are often related to compressors and condensers.",
    category: "AC Repair",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1626075982260-3cb837072935?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Truth About 'Lifetime' Transmission Fluid",
    excerpt: "Manufacturers say it lasts forever. Mechanics know it doesn't. Here is the recommended interval for changing gearbox oil in this climate.",
    category: "Expert Advice",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800"
  }
];

export const REVIEWS: Testimonial[] = [
  {
    name: "James Anderson",
    rating: 5,
    text: "Finally a garage in Dubai I can trust. Glenn and the team explained everything clearly and the pricing was transparent. Felt just like my local back in the UK.",
    date: "2 weeks ago"
  },
  {
    name: "Sarah Jenkins",
    rating: 5,
    text: "Top notch service! My AC died in July and they fixed it same day. The customer lounge is comfortable and the staff are incredibly polite. Highly recommended.",
    date: "1 month ago"
  },
  {
    name: "Mohammed Al-Fayed",
    rating: 5,
    text: "Excellent diagnostic skills. The dealer wanted to replace the whole engine, but Powerworks found the specific sensor issue saving me thousands. 5 stars!",
    date: "3 months ago"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Glenn", href: "#owner" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Ask Glenn", href: "#ask-glenn" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];