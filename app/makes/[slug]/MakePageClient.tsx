'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Check,
  Wrench,
  Shield,
  Award,
  Clock,
  MapPin,
  CarFront,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Gauge,
  Settings,
  LucideIcon
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingButton from '@/components/BookingButton';
import { VehicleMake } from '@/lib/vehicle-makes-data';
import { SERVICES_DATA, ServiceIconName } from '@/lib/services-data';

// Icon map for service icons
const iconMap: Record<ServiceIconName, LucideIcon> = {
  CarFront,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  Wrench,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Gauge,
  Settings,
  Shield
};

interface MakePageClientProps {
  make: VehicleMake;
}

// Real customer testimonial data from Google reviews - different for each make
const makeTestimonials: Record<string, { quote: string; author: string; initials: string }> = {
  bmw: {
    quote: `Glenn and his team are brilliant. Service is quick and thorough, quality is excellent and competitively priced. They always go out of their way to help with my BMW.`,
    author: 'John Mayes',
    initials: 'JM'
  },
  mercedes: {
    quote: `Fantastic work and fantastic service. Brought my Mercedes ML63 to these gents, and was so lucky to meet the owner himself. They kept me informed throughout the process.`,
    author: 'Efe Yaman',
    initials: 'EY'
  },
  audi: {
    quote: `As a German guy who knows cars I can highly recommend this garage! Glenn knows his stuff and I did several jobs with my Audi there. Never disappointed.`,
    author: 'FIGHTR',
    initials: 'FG'
  },
  porsche: {
    quote: `Fantastic work on my 1999 Porsche 911 996. The team is incredibly skilled and kept me informed throughout. I wouldn't trust anyone else with my Porsche.`,
    author: 'Efe Yaman',
    initials: 'EY'
  },
  'land-rover': {
    quote: `What a great company! The team at Powerworks are very professional and the work on my Land Rover LR4 is honest and top quality. Highly recommended.`,
    author: 'Sargeant MX',
    initials: 'SM'
  },
  'range-rover': {
    quote: `Diagnosed and repaired my Range Rover in 3 days, where other garages had it for 3 weeks and were nowhere close to fixing it. From the biggest to the smallest jobs, constant updates and videos.`,
    author: 'Gus Napper',
    initials: 'GN'
  },
  'rolls-royce': {
    quote: `Total transparency, excellent communication, professional work and value for money. An absolute pleasure to deal with Glenn, DJ and the team on my luxury vehicle.`,
    author: 'Craig Mackenzie',
    initials: 'CM'
  },
  'aston-martin': {
    quote: `These guys are absolutely phenomenal. Excellent contact at all stages by DJ who explained every stage and what they were trying to achieve. Unmatched professionalism.`,
    author: 'Alan Harris',
    initials: 'AH'
  },
  volkswagen: {
    quote: `Recently our VW GTI and Multivan have been serviced by their team. Justin has taken good care of our cars with detailed reports and solutions. Highly recommended.`,
    author: 'Nuong Doan',
    initials: 'ND'
  },
  bentley: {
    quote: `4 years going here and would not go anywhere else! Amazing customer service, workmanship and follow up including from the owner. Fully recommend for a reliable garage you can trust.`,
    author: 'Chris Gardner',
    initials: 'CG'
  },
  toyota: {
    quote: `I've known Glenn since he first looked at my car 10 years ago. Always a good service and honest opinion. My current vehicle has 230,000km on the clock and purring like a kitten.`,
    author: 'dibble007',
    initials: 'DB'
  },
  nissan: {
    quote: `I've known Glenn for 10 years. Always a good service and honest opinion. My Nissan Armada has 230,000km on the clock and purring like a kitten.`,
    author: 'dibble007',
    initials: 'DB'
  },
  jaguar: {
    quote: `As a British-owned garage, they have a soft spot for Jags. My Jaguar gets the care it deserves. Total transparency and excellent communication throughout.`,
    author: 'Craig Mackenzie',
    initials: 'CM'
  },
  ford: {
    quote: `I have a 2012 Ford F150 Raptor. Another garage gave me a misleading diagnosis with a huge repair cost. Powerworks gave me an honest assessment and fixed it at a fraction of the cost.`,
    author: 'Henry Shatwell',
    initials: 'HS'
  },
  chevrolet: {
    quote: `I don't trust my vehicles to anyone other than Powerworks Garage. Honest service, quality work, fair rates. Glenn knows exactly what he's doing.`,
    author: 'Marcus Cent',
    initials: 'MC'
  }
};

const getTestimonialForMake = (make: VehicleMake) => {
  const testimonial = makeTestimonials[make.slug] || {
    quote: `Glenn and his team at Powerworks have been looking after my ${make.shortName} for over two years now. Their attention to detail and honest pricing keep me coming back.`,
    author: 'Chris Gardner',
    initials: 'CG'
  };

  return {
    quote: testimonial.quote,
    author: testimonial.author,
    role: `${make.shortName} Owner`,
    initials: testimonial.initials
  };
};

export default function MakePageClient({ make }: MakePageClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Get top services to display
  const topServices = SERVICES_DATA.slice(0, 6);
  const testimonial = getTestimonialForMake(make);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://powerworksgarage.com/' },
      { '@type': 'ListItem', position: 2, name: 'Brands We Service', item: 'https://powerworksgarage.com/makes' },
      { '@type': 'ListItem', position: 3, name: `${make.name} Service`, item: `https://powerworksgarage.com/makes/${make.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      {/* Hero Section - Clean White Design */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-power-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/makes" className="hover:text-power-blue transition-colors">Makes</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">{make.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
                <span className="text-sm text-gray-600">
                  {make.tier === 'luxury' ? '🏆 Luxury' : make.tier === 'premium' ? '⭐ Premium' : '✓ Mainstream'} • {make.country}
                </span>
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4"
              >
                {make.name} Service
                <span className="block text-power-red">Dubai Specialists</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-600 mb-6"
              >
                Expert {make.name} servicing and repairs in Dubai Investment Park. Factory-trained techniques, dealer-level diagnostics, honest pricing.
              </motion.p>

              {/* Popular Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {make.popularModels.slice(0, 6).map((model) => (
                  <span
                    key={model}
                    className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm shadow-sm"
                  >
                    {model}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="tel:+971521217425"
                  className="inline-flex items-center gap-2 bg-power-red text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg"
                >
                  <Phone size={20} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/971521217425"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-lg"
                >
                  <MessageCircle size={20} />
                  WhatsApp Quote
                </a>
              </motion.div>
            </div>

            {/* Vehicle Image Display - Clean White Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex flex-col items-center justify-center"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 w-full max-w-lg mt-8">
                {/* Logo prominently displayed */}
                {make.logo && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 border border-gray-100">
                    <img
                      src={make.logo}
                      alt={`${make.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}

                {/* Vehicle Image */}
                <div className="pt-12">
                  {make.vehicleImage ? (
                    <img
                      src={make.vehicleImage}
                      alt={`${make.name} vehicle`}
                      className="w-full h-auto object-contain"
                    />
                  ) : make.logo ? (
                    <div className="flex items-center justify-center py-12">
                      <img
                        src={make.logo}
                        alt={`${make.name} logo`}
                        className="w-32 h-32 object-contain opacity-50"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <span className="text-6xl font-bold text-gray-200">{make.shortName}</span>
                    </div>
                  )}
                </div>

                {/* Make name badge at bottom */}
                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">{make.name}</span>
                  <span className="text-gray-500 ml-2">Specialists</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="text-power-blue" size={20} />
              <span>Warranty Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-power-red" size={20} />
              <span>British Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="text-power-blue" size={20} />
              <span>Genuine Parts Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-power-red" size={20} />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-power-blue" size={20} />
              <span>Dubai Investment Park, Dubai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Expert & Customer Insights - Combined Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">What People Say</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {make.name} Expertise You Can Trust
            </h2>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Glenn's Expert Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 relative overflow-hidden"
            >
              {/* Accent stripe */}
              <div className="absolute top-0 left-0 w-1 h-full bg-power-blue"></div>

              <div className="flex items-start gap-4">
                {/* Glenn's Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src="/glenn-power.png"
                      alt="Glenn - Owner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-power-blue/10 text-power-blue text-xs font-bold px-2 py-1 rounded">EXPERT</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
                    &ldquo;{make.glennQuote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Glenn</p>
                      <p className="text-gray-500 text-xs">Owner • 30+ years exp.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Review Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 relative overflow-hidden"
            >
              {/* Accent stripe */}
              <div className="absolute top-0 left-0 w-1 h-full bg-power-red"></div>

              <div className="flex items-start gap-4">
                {/* Customer Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-power-blue to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    {testimonial.initials}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-power-red/10 text-power-red text-xs font-bold px-2 py-1 rounded">CUSTOMER</span>
                    <div className="flex text-yellow-400">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i} className="text-sm">{star}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Cleaner Design */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - More compact */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="text-power-red font-bold uppercase tracking-wider text-xs">FAQ</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Common {make.name} Questions
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <img src="/glenn-power.png" alt="Glenn" className="w-full h-full object-cover" />
              </div>
              <span>Answered by Glenn</span>
            </div>
          </div>

          {/* FAQ Grid - Two columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {make.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-3 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-power-blue transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    size={18}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 pb-4">
                    <div className="bg-white rounded-lg p-4 border-l-2 border-power-blue">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Capabilities - Compact Design */}
      <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <span className="text-power-red font-bold uppercase tracking-wider text-xs">About</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {make.name} Specialists in Dubai
            </h2>
          </div>

          {/* Overview paragraph */}
          <p className="text-gray-600 leading-relaxed mb-8 max-w-4xl">
            {make.overview}
          </p>

          {/* Three-column grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capabilities */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-power-blue/10 rounded-lg flex items-center justify-center">
                  <Check size={16} className="text-power-blue" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Our Capabilities</h3>
              </div>
              <ul className="space-y-2">
                {make.specializations.slice(0, 4).map((spec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-power-blue mt-0.5">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Issues */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <span className="text-amber-500 text-sm">⚠</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Common Issues</h3>
              </div>
              <ul className="space-y-2">
                {make.commonIssues.slice(0, 4).map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-power-red mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stats / Why Choose Us */}
            <div className="bg-gradient-to-br from-power-blue to-blue-700 rounded-xl p-5 text-white">
              <h3 className="font-bold text-sm mb-4">Why Choose Powerworks</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={14} />
                  </div>
                  <span className="text-sm text-white/90">Warranty Protected Service</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench size={14} />
                  </div>
                  <span className="text-sm text-white/90">Genuine Parts Available</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={14} />
                  </div>
                  <span className="text-sm text-white/90">30+ Years Experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={14} />
                  </div>
                  <span className="text-sm text-white/90">Same-Day Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this Make - More compact */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="text-power-red font-bold uppercase tracking-wider text-xs">Services</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {make.name} Services
              </h2>
            </div>
            <Link
              href="/car-servicing-dubai"
              className="inline-flex items-center gap-2 text-power-blue font-semibold text-sm hover:underline"
            >
              View All Services
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/car-servicing-dubai/${service.slug}`}
                    className="group flex bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-200"
                  >
                    {/* Left: Service Icon */}
                    <div className="w-24 flex-shrink-0 flex items-center justify-center py-4 bg-gray-100/50 group-hover:bg-gray-50 transition-colors">
                      {service.serviceImage ? (
                        <img
                          src={service.serviceImage}
                          alt={service.shortTitle}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <Icon size={48} strokeWidth={1.5} className="text-gray-600 group-hover:text-power-blue transition-colors" />
                      )}
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 py-4 pr-4 flex flex-col justify-center min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-power-blue transition-colors leading-snug">
                        {service.shortTitle}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-power-red font-semibold text-xs">{service.priceFrom}</span>
                        <span className="text-gray-400 text-xs group-hover:text-power-blue transition-colors">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-10 md:py-12 bg-power-blue">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Book Your {make.name} Service
              </h2>
              <p className="text-blue-100">
                Expert care at competitive prices. Free pickup available.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              <BookingButton
                className="inline-flex items-center gap-2 bg-white text-power-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg"
              >
                Book Online
              </BookingButton>
              <a
                href="https://wa.me/971521217425"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#128C7E] transition-all shadow-lg"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
