'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Check,
  AlertTriangle,
  Quote,
  Wrench,
  Shield,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { VehicleMake } from '@/lib/vehicle-makes-data';
import { SERVICES_DATA } from '@/lib/services-data';

interface MakePageClientProps {
  make: VehicleMake;
}

export default function MakePageClient({ make }: MakePageClientProps) {
  // Get top services to display
  const topServices = SERVICES_DATA.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link href="/makes" className="hover:text-white transition-colors">Makes</Link>
                <ChevronRight size={14} />
                <span className="text-power-red">{make.name}</span>
              </nav>

              {/* Flag Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm text-gray-300">
                  {make.tier === 'luxury' ? '🏆 Luxury' : make.tier === 'premium' ? '⭐ Premium' : '✓ Mainstream'} • {make.country}
                </span>
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
              >
                {make.name} Service
                <span className="block text-power-red">Dubai</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-300 mb-6"
              >
                Specialist {make.name} servicing and repairs in Al Quoz, Dubai. Factory-trained techniques, dealer-level diagnostics, honest pricing.
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
                    className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm"
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

            {/* Vehicle Image Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex items-center justify-center"
            >
              {make.vehicleImage ? (
                <div className="relative">
                  <img
                    src={make.vehicleImage}
                    alt={`${make.name} vehicle`}
                    className="max-w-md w-full h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Logo overlay */}
                  {make.logo && (
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center p-3">
                      <img
                        src={make.logo}
                        alt={`${make.name} logo`}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-64 h-64 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center p-8">
                  {make.logo ? (
                    <img
                      src={make.logo}
                      alt={`${make.name} logo`}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-white/30">{make.shortName}</div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
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
              <span>Al Quoz, Dubai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Glenn's Quote Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12"
          >
            <Quote className="absolute top-6 left-6 text-power-blue/20" size={48} />

            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-6">
                &ldquo;{make.glennQuote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/pwg_slide4.jpg"
                    alt="Glenn - Owner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Glenn</p>
                  <p className="text-gray-600">Owner, Powerworks Garage</p>
                  <p className="text-sm text-power-blue">30+ years experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview & Specializations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {make.name} Specialists in Dubai
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {make.overview}
              </p>

              {/* Specializations */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our {make.name} Capabilities
              </h3>
              <ul className="space-y-3">
                {make.specializations.map((spec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-power-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{spec}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Common Issues */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-amber-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Common {make.name} Issues We Fix
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Every manufacturer has their quirks. Here are the most common {make.name} problems we see in Dubai:
              </p>
              <ul className="space-y-4">
                {make.commonIssues.map((issue, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-2 h-2 bg-power-red rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this Make */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {make.name} Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete care for your {make.name}. From routine maintenance to complex repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/car-servicing-dubai/${service.slug}`}
                  className="block bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all group border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-power-blue transition-colors">
                    {make.shortName} {service.shortTitle}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-power-red font-semibold">From {service.priceFrom}</span>
                    <ArrowRight size={16} className="text-power-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/car-servicing-dubai"
              className="inline-flex items-center gap-2 text-power-blue font-semibold hover:underline"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your {make.name} Service Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Expert care for your {make.name} at competitive prices. Free pickup available.
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
              WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
