import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { SERVICES_DATA } from '@/lib/services-data';
import { Phone, MessageCircle, MapPin, Clock, Star, Shield, Award, Wrench, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Garage in Dubai Investment Park (DIP) | Powerworks Garage',
  description: 'Looking for a trusted car garage in Dubai Investment Park? Powerworks Garage in DIP 1 offers expert car service, AC repair, engine work & more. British-owned, 20+ years experience. Call 052 121 7425.',
  keywords: 'car garage DIP, car repair Dubai Investment Park, car service DIP, mechanic DIP Dubai, auto repair DIP, garage near DIP, car workshop Dubai Investment Park',
  alternates: {
    canonical: '/locations/dubai-investment-park',
  },
  openGraph: {
    title: 'Car Garage in Dubai Investment Park (DIP) | Powerworks Garage',
    description: 'Your trusted British-owned car garage in Dubai Investment Park. Expert car service, repair & diagnostics for all makes. Located in DIP 1.',
    images: ['/full_logo.png'],
  },
};

const locationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Powerworks Garage - Dubai Investment Park',
  image: 'https://powerworksgarage.com/full_logo.png',
  description: 'British-owned car repair and service centre in Dubai Investment Park (DIP). Specialists in European and Japanese vehicles with 20+ years experience.',
  url: 'https://powerworksgarage.com/locations/dubai-investment-park',
  telephone: '+971521217425',
  email: 'help@powerworksgarage.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dubai Investment Park 1',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.9861876,
    longitude: 55.1508571,
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
  areaServed: [
    { '@type': 'Place', name: 'Dubai Investment Park' },
    { '@type': 'Place', name: 'DIP 1' },
    { '@type': 'Place', name: 'DIP 2' },
    { '@type': 'Place', name: 'Al Quoz' },
    { '@type': 'Place', name: 'JVC' },
    { '@type': 'City', name: 'Dubai' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '$$',
};

const DIP_FEATURES = [
  {
    icon: Shield,
    title: 'British Workshop Standards',
    description: 'UK-trained technicians applying proper procedures and honest diagnostics to every job.',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    description: 'Glenn Power brings over two decades of automotive expertise from the UK to DIP.',
  },
  {
    icon: Wrench,
    title: 'All Makes & Models',
    description: 'European, Japanese, American vehicles. From family SUVs to luxury sports cars.',
  },
  {
    icon: Star,
    title: '4.9 Stars on Google',
    description: 'Rated 4.9/5 by 150+ customers. Honest work builds honest reviews.',
  },
];

export default function DubaiInvestmentParkPage() {
  const topServices = SERVICES_DATA.slice(0, 12);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/locations/dubai-investment-park' },
        { name: 'Dubai Investment Park', url: '/locations/dubai-investment-park' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/pwg_slide2.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-power-blue/95 via-power-blue/80 to-power-blue/60" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <MapPin size={14} className="text-power-red" />
                <span className="text-white text-sm font-medium">Dubai Investment Park 1</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Car Garage in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">Dubai Investment Park</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                Your trusted British-owned garage in DIP. Expert car service, repair, and diagnostics for all makes and models. Honest work, fair prices, no surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+971521217425"
                  className="bg-power-red text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call 052 121 7425
                </a>
                <a
                  href="https://wa.me/971521217425"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-[#1da851] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us in DIP */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Why DIP Drivers Choose Powerworks
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conveniently located in Dubai Investment Park 1, we serve drivers across DIP 1, DIP 2, and surrounding areas including Al Quoz, JVC, and Dubai Marina.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIP_FEATURES.map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-power-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-power-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Available at DIP */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Car Services at Our DIP Workshop
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Full range of mechanical and electrical services available at our Dubai Investment Park location. From routine maintenance to complex repairs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/car-servicing-dubai/${service.slug}`}
                  className="flex items-center justify-between bg-gray-50 hover:bg-power-blue hover:text-white rounded-xl px-5 py-4 transition-all group border border-gray-100 hover:border-power-blue"
                >
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-white">{service.shortTitle}</p>
                    <p className="text-sm text-gray-500 group-hover:text-blue-100">From {service.priceFrom}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/car-servicing-dubai"
                className="inline-flex items-center gap-2 text-power-blue font-bold hover:underline"
              >
                View All Services <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Location & Directions */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                  Find Us in Dubai Investment Park
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={22} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Address</p>
                      <p className="text-gray-600">Dubai Investment Park 1, Dubai, UAE</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock size={22} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Opening Hours</p>
                      <p className="text-gray-600">Monday - Sunday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Friday: 8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={22} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Contact</p>
                      <p className="text-gray-600">Phone: <a href="tel:+971521217425" className="text-power-blue font-semibold">052 121 7425</a></p>
                      <p className="text-gray-600">Email: <a href="mailto:help@powerworksgarage.com" className="text-power-blue font-semibold">help@powerworksgarage.com</a></p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <p className="font-bold text-gray-900 mb-2">Easy Access from:</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>DIP 1 & DIP 2 - within the park</li>
                    <li>Al Quoz - 15 minutes via E311</li>
                    <li>JVC / JVT - 10 minutes via Al Yalayis Road</li>
                    <li>Dubai Marina - 20 minutes via Sheikh Zayed Road</li>
                    <li>Business Bay / Downtown - 25 minutes via E44</li>
                  </ul>
                </div>
              </div>
              <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.0!2d55.1508571!3d24.9861876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f7389305297f7%3A0xe85f630215780c08!2sPowerworks%20Garage%20DIP!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Powerworks Garage DIP Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-power-blue">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Book Your Service at DIP
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Located in Dubai Investment Park 1. Call, WhatsApp, or book online. Free pickup available for DIP residents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+971521217425"
                className="bg-white text-power-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                052 121 7425
              </a>
              <Link
                href="/contact"
                className="bg-power-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Book Online
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
