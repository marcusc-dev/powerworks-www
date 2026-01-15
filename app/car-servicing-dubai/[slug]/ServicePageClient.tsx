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
  Clock,
  Shield,
  Award,
  Star,
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
  LucideIcon
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceData, ServiceIconName } from '@/lib/services-data';

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

interface ServicePageClientProps {
  service: ServiceData;
  relatedServices: ServiceData[];
}

export default function ServicePageClient({ service, relatedServices }: ServicePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = iconMap[service.iconName];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-power-blue/95 via-power-blue/80 to-power-blue/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/car-servicing-dubai" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">{service.shortTitle}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-8 h-8 bg-power-red rounded-lg flex items-center justify-center text-white"
              >
                <Icon size={18} />
              </motion.div>
              <span className="text-white/90 text-sm font-medium">Professional {service.shortTitle}</span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            >
              {service.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              {service.description}
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
                href="https://wa.me/971521217425"
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
              <span>British Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-power-red" />
              <span>5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-power-red" />
              <span>Same-Day Service</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Overview Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Overview
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.overview}
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-gray-50 rounded-2xl p-8">
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

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to deliver quality results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
                )}

                <div className="relative z-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                  {/* Step Number */}
                  <div className="w-12 h-12 bg-power-blue text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our {service.shortTitle.toLowerCase()} service.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
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
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <p className="text-lg text-gray-600">
                You might also be interested in these services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((related, index) => {
                const RelatedIcon = iconMap[related.iconName];
                return (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/car-servicing-dubai/${related.slug}`}
                      className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-power-blue/30 transition-all group"
                    >
                      <div className="w-12 h-12 bg-power-blue/10 rounded-lg flex items-center justify-center text-power-blue mb-4 group-hover:bg-power-blue group-hover:text-white transition-all">
                        <RelatedIcon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-power-blue transition-colors">
                        {related.shortTitle}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {related.description}
                      </p>
                      <div className="flex items-center gap-2 text-power-blue font-semibold">
                        <span>From {related.priceFrom}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your {service.shortTitle}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for expert service at competitive prices.
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
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-lg"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-power-red text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg"
            >
              Book Online
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
