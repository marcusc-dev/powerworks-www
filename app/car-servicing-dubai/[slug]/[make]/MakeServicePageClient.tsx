'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Shield,
  Award,
  Star,
  AlertTriangle,
  Wrench,
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
import { ServiceData, ServiceIconName } from '@/lib/services-data';
import { VehicleMake } from '@/lib/vehicle-makes-data';

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

interface MakeServicePageClientProps {
  service: ServiceData;
  vehicleMake: VehicleMake;
}

// Generate make-specific FAQs based on the service and make
function generateMakeServiceFAQs(service: ServiceData, make: VehicleMake) {
  const faqs = [];

  // Add a make-specific variant of the first FAQ
  if (service.faqs.length > 0) {
    faqs.push({
      question: `How often should I get ${service.shortTitle.toLowerCase()} for my ${make.name}?`,
      answer: `For ${make.name} vehicles in Dubai's climate, we recommend ${service.shortTitle.toLowerCase()} based on your specific model's requirements. ${make.name} vehicles benefit from regular maintenance schedules - typically every 10,000-15,000 km or annually. Our technicians are familiar with ${make.name}'s specific service intervals and can advise based on your exact model.`
    });
  }

  // Add common issues FAQ
  if (make.commonIssues.length > 0) {
    faqs.push({
      question: `What are common ${service.shortTitle.toLowerCase()} issues in ${make.name} vehicles?`,
      answer: `${make.name} vehicles can experience specific issues that we frequently address: ${make.commonIssues.slice(0, 3).join(', ')}. Our ${make.name} specialists are trained to identify and resolve these issues efficiently using proper diagnostic equipment.`
    });
  }

  // Add specialist equipment FAQ
  if (make.specializations.length > 0) {
    faqs.push({
      question: `Do you have specialist equipment for ${make.name} ${service.shortTitle.toLowerCase()}?`,
      answer: `Yes, we use ${make.specializations[0]} for accurate diagnosis and repair of ${make.name} vehicles. This dealer-level equipment allows us to perform ${service.shortTitle.toLowerCase()} to factory standards, ensuring your ${make.name} receives the care it deserves.`
    });
  }

  // Add warranty FAQ
  faqs.push({
    question: `Will ${service.shortTitle.toLowerCase()} at Powerworks affect my ${make.name} warranty?`,
    answer: `No. Under UAE consumer protection laws, you can service your ${make.name} at any qualified independent garage without affecting your manufacturer warranty. We use genuine or OEM-equivalent parts and provide full documentation that meets ${make.name}'s standards.`
  });

  return faqs;
}

export default function MakeServicePageClient({ service, vehicleMake }: MakeServicePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = iconMap[service.iconName];
  const makeServiceFAQs = generateMakeServiceFAQs(service, vehicleMake);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://powerworksgarage.com/' },
      { '@type': 'ListItem', position: 2, name: 'Car Services', item: 'https://powerworksgarage.com/car-servicing-dubai' },
      { '@type': 'ListItem', position: 3, name: service.shortTitle, item: `https://powerworksgarage.com/car-servicing-dubai/${service.slug}` },
      { '@type': 'ListItem', position: 4, name: vehicleMake.name, item: `https://powerworksgarage.com/car-servicing-dubai/${service.slug}/${vehicleMake.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      {/* Hero Section with Make Vehicle Image */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={vehicleMake.vehicleImage || service.heroImage}
            alt={`${service.shortTitle} for ${vehicleMake.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-power-blue/95 via-power-blue/85 to-power-blue/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/car-servicing-dubai" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <Link href={`/car-servicing-dubai/${service.slug}`} className="hover:text-white transition-colors">{service.shortTitle}</Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">{vehicleMake.shortName}</span>
            </nav>

            {/* Badge with Make Logo */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              {vehicleMake.logo && (
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                  <img
                    src={vehicleMake.logo}
                    alt={vehicleMake.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <span className="text-white/90 text-sm font-medium">{vehicleMake.name} Specialist</span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            >
              {service.shortTitle} for {vehicleMake.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Expert {service.shortTitle.toLowerCase()} for your {vehicleMake.name} in Dubai.
              Our {vehicleMake.shortName} specialists use {vehicleMake.specializations[0]}
              to deliver dealer-quality service at competitive prices.
            </motion.p>

            {/* Price Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <span className="text-gray-400">Starting from</span>
              <span className="text-2xl font-bold text-power-red">{service.priceFrom}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="tel:+971521217425"
                className="inline-flex items-center gap-2 bg-power-red text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a
                href={`https://wa.me/971521217425?text=Hi, I need ${service.shortTitle} for my ${vehicleMake.name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={20} />
                WhatsApp Quote
              </a>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-power-red" />
              <span>Warranty Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-power-red" />
              <span>{vehicleMake.shortName} Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-power-red" />
              <span>5-Star Rated</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Glenn's Expert Insight Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Glenn's Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-power-red flex-shrink-0">
                  <img
                    src="/glenn-power.png"
                    alt="Glenn - Powerworks Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Glenn&apos;s Expert Insight</h3>
                  <p className="text-sm text-gray-500">25+ Years Experience</p>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed italic text-lg">
                &ldquo;{vehicleMake.glennQuote}&rdquo;
              </blockquote>
              <div className="mt-4">
                <img
                  src="/signature-gp.png"
                  alt="Glenn's signature"
                  className="h-10 opacity-60"
                />
              </div>
            </motion.div>

            {/* Make Specializations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our {vehicleMake.name} Expertise
              </h2>
              <ul className="space-y-4">
                {vehicleMake.specializations.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-power-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4">
              <AlertTriangle size={16} />
              <span className="font-semibold text-sm">Common {vehicleMake.shortName} Issues</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {vehicleMake.name} Problems We Fix
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These are the most common {vehicleMake.name} issues we diagnose and repair at Powerworks Garage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleMake.commonIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 mb-4">
                  <Wrench size={20} />
                </div>
                <p className="text-gray-700 font-medium">{issue}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Overview Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {service.shortTitle} for {vehicleMake.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {service.overview}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {vehicleMake.overview}
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What&apos;s Included
              </h3>
              <ul className="space-y-4">
                {service.included.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-power-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Models We Service */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {vehicleMake.name} Models We Service
            </h2>
            <p className="text-lg text-gray-600">
              We provide {service.shortTitle.toLowerCase()} for all {vehicleMake.name} models including:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {vehicleMake.popularModels.map((model, index) => (
              <motion.div
                key={model}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium"
              >
                {vehicleMake.shortName} {model}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-power-dark via-gray-900 to-power-dark relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {vehicleMake.name} {service.shortTitle} FAQs
            </h2>
            <p className="text-lg text-gray-400">
              Common questions about {service.shortTitle.toLowerCase()} for {vehicleMake.name} vehicles.
            </p>
          </div>

          <div className="space-y-4">
            {makeServiceFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === index
                    ? 'bg-gradient-to-r from-power-red/10 to-power-blue/10 border-2 border-power-red/30'
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-start gap-4 p-6 text-left"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg transition-colors ${
                    openFaq === index
                      ? 'bg-power-red text-white'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    Q
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white text-lg block pr-8">{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-white/50 transition-transform flex-shrink-0 mt-1 ${
                      openFaq === index ? 'rotate-180 text-power-red' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="flex gap-4 pl-14">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-power-red flex-shrink-0">
                        <img
                          src="/glenn-power.png"
                          alt="Glenn"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-power-red font-bold">Glenn says:</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed italic">&ldquo;{faq.answer}&rdquo;</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services for this Make */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other {vehicleMake.name} Services
            </h2>
            <p className="text-lg text-gray-600">
              Explore our full range of services for your {vehicleMake.name}.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/makes/${vehicleMake.slug}`}
              className="inline-flex items-center gap-2 bg-power-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
            >
              View All {vehicleMake.name} Services
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/car-servicing-dubai/${service.slug}`}
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-power-blue hover:text-power-blue transition-colors"
            >
              {service.shortTitle} for All Brands
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book {service.shortTitle} for Your {vehicleMake.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our {vehicleMake.shortName} specialists are ready to help. Contact us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+971521217425"
              className="inline-flex items-center gap-2 bg-white text-power-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <Phone size={20} />
              052 121 7425
            </a>
            <a
              href={`https://wa.me/971521217425?text=Hi, I need ${service.shortTitle} for my ${vehicleMake.name}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-lg"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
