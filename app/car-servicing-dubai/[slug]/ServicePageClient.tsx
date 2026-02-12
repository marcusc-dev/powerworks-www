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
  LucideIcon,
  Eye,
  Ruler,
  MessageSquare,
  Package,
  Lightbulb,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceData, ServiceIconName } from '@/lib/services-data';
import { Testimonial } from '@/lib/types';
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

// Map service page slugs to contact form service values
const serviceFormMap: Record<string, string> = {
  'car-service-dubai': 'car-service',
  'ac-repair-dubai': 'ac-repair',
  'oil-change-dubai': 'oil-change',
  'electrical-diagnostics-dubai': 'electrical',
  'brake-service-dubai': 'brakes',
  'suspension-repair-dubai': 'suspension',
  'transmission-repair-dubai': 'transmission',
  'engine-repair-dubai': 'engine',
  'battery-replacement-dubai': 'battery',
  'tyre-replacement-dubai': 'tyres',
  'pre-purchase-inspection-dubai': 'inspection',
  'car-recovery-dubai': 'other',
  'fleet-maintenance-dubai': 'fleet',
  'timing-belt-dubai': 'engine',
  'car-inspection-dubai': 'inspection',
};

interface ServicePageClientProps {
  service: ServiceData;
  relatedServices: ServiceData[];
  reviews?: Testimonial[];
  vehicleMakes?: VehicleMake[];
}

// Helper function to determine icon for process step based on title
const getProcessStepIcon = (title: string, index: number): LucideIcon => {
  const lowerTitle = title.toLowerCase();

  // Inspection related
  if (lowerTitle.includes('inspect') || lowerTitle.includes('visual') || lowerTitle.includes('check')) {
    return Eye;
  }
  // Measurement related
  if (lowerTitle.includes('measure') || lowerTitle.includes('test') || lowerTitle.includes('diagnostic')) {
    return Ruler;
  }
  // Recommendation/Communication related
  if (lowerTitle.includes('recommend') || lowerTitle.includes('explain') || lowerTitle.includes('consult')) {
    return MessageSquare;
  }
  // Parts/Installation related
  if (lowerTitle.includes('parts') || lowerTitle.includes('fit') || lowerTitle.includes('install') || lowerTitle.includes('replace')) {
    return Package;
  }
  // Advice/Tips related
  if (lowerTitle.includes('advice') || lowerTitle.includes('tip') || lowerTitle.includes('guidance') || lowerTitle.includes('bed-in')) {
    return Lightbulb;
  }
  // Documentation related
  if (lowerTitle.includes('report') || lowerTitle.includes('document') || lowerTitle.includes('record')) {
    return FileText;
  }
  // Search/Discovery related
  if (lowerTitle.includes('search') || lowerTitle.includes('identify') || lowerTitle.includes('locate')) {
    return Search;
  }
  // Completion related
  if (lowerTitle.includes('complete') || lowerTitle.includes('finish') || lowerTitle.includes('final')) {
    return CheckCircle2;
  }

  // Default icons based on position
  const defaultIcons = [Eye, Ruler, MessageSquare, Package, Lightbulb];
  return defaultIcons[index % defaultIcons.length];
};

export default function ServicePageClient({ service, relatedServices, reviews = [], vehicleMakes = [] }: ServicePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const Icon = iconMap[service.iconName];

  const displayedReviews = showAllReviews ? reviews.slice(0, 6) : reviews.slice(0, 3);

  const toggleReviewExpanded = (index: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://powerworksgarage.com/' },
      { '@type': 'ListItem', position: 2, name: 'Car Services', item: 'https://powerworksgarage.com/car-servicing-dubai' },
      { '@type': 'ListItem', position: 3, name: service.shortTitle, item: `https://powerworksgarage.com/car-servicing-dubai/${service.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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

      {/* Overview Section - Redesigned */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-power-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-power-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Overview Text - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-power-blue/10 text-power-blue px-4 py-2 rounded-full mb-6">
                <Icon size={18} />
                <span className="font-semibold text-sm">{service.shortTitle}</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Service <span className="text-power-blue">Overview</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.overview}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-power-blue mb-1">{service.priceFrom}</div>
                  <div className="text-sm text-gray-500">Starting Price</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-power-red mb-1">{service.included.length}+</div>
                  <div className="text-sm text-gray-500">Checks Included</div>
                </div>
              </div>
            </motion.div>

            {/* What's Included - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Card Header Decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-power-blue via-power-red to-power-blue" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-power-blue to-power-blue/80 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">What&apos;s Included</h3>
                    <p className="text-sm text-gray-500">Comprehensive service checklist</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.included.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-power-blue/5 transition-colors group"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA at bottom of card */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`/contact?service=${serviceFormMap[service.slug] || 'other'}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-power-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book This Service
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="tel:+971521217425"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-power-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-power-blue/90 transition-all"
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned Timeline */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-power-blue/10 text-power-blue px-4 py-2 rounded-full mb-6"
            >
              <ClipboardCheck size={18} />
              <span className="font-semibold text-sm">Our Systematic Approach</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
            >
              How We Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Every job follows our proven {service.process.length}-step process to ensure consistent, quality results.
            </motion.p>
          </div>

          {/* Timeline - Desktop View */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Timeline Line */}
              <motion.div
                className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-power-blue/20 to-gray-200"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Steps */}
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${service.process.length}, minmax(0, 1fr))` }}>
                {service.process.map((step, index) => {
                  const StepIcon = getProcessStepIcon(step.title, index);
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="relative"
                    >
                      {/* Step Container - Alternating top/bottom */}
                      <div className={`flex flex-col items-center ${isEven ? 'pt-32' : 'pb-32 flex-col-reverse'}`}>
                        {/* Card */}
                        <motion.div
                          whileHover={{ y: isEven ? -8 : 8, scale: 1.02 }}
                          className="relative group w-full max-w-[240px]"
                        >
                          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 transition-all duration-300 group-hover:border-power-blue group-hover:shadow-xl">
                            {/* Step Number Badge */}
                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-power-red rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-white">
                              {step.step}
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 bg-gradient-to-br from-power-blue to-power-blue/80 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-md">
                              <StepIcon size={28} strokeWidth={2} />
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight min-h-[2.25rem] group-hover:text-power-blue transition-colors">
                              {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>

                        {/* Connector to Timeline */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                          className={`w-0.5 bg-gradient-to-b from-power-blue to-gray-300 ${isEven ? 'h-24' : 'h-24'}`}
                          style={{ transformOrigin: isEven ? 'top' : 'bottom' }}
                        />

                        {/* Timeline Node */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.15 + 0.5,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="relative z-10"
                        >
                          <div className="w-6 h-6 bg-power-blue rounded-full border-4 border-white shadow-lg">
                            <div className="w-full h-full rounded-full bg-power-red animate-ping absolute inset-0 opacity-20"></div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile View - Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {service.process.map((step, index) => {
              const StepIcon = getProcessStepIcon(step.title, index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Vertical Line */}
                  {index < service.process.length - 1 && (
                    <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-power-blue to-gray-200 -mb-8"></div>
                  )}

                  <div className="flex gap-4">
                    {/* Left Side - Icon & Number */}
                    <div className="flex-shrink-0 relative">
                      {/* Icon Circle */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="w-14 h-14 bg-gradient-to-br from-power-blue to-power-blue/80 rounded-xl flex items-center justify-center text-white shadow-lg relative z-10"
                      >
                        <StepIcon size={24} strokeWidth={2} />
                      </motion.div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-power-red rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white z-20">
                        {step.step}
                      </div>
                    </div>

                    {/* Right Side - Content Card */}
                    <div className="flex-1 bg-white rounded-xl p-5 shadow-md border-2 border-gray-100 hover:border-power-blue hover:shadow-lg transition-all">
                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-gray-700 font-medium">
                Quality-assured process on every job
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-power-red/10 text-power-red px-4 py-2 rounded-full mb-4">
                <Star size={16} className="fill-current" />
                <span className="font-semibold text-sm">Verified Reviews</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Customers Say About Our {service.shortTitle === 'Car Service' ? 'Car Servicing' : service.shortTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real feedback from customers who&apos;ve used this service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="mb-4">
                    <p className={`text-gray-700 leading-relaxed ${!expandedReviews.has(index) ? 'line-clamp-4' : ''}`}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    {review.text.length > 200 && (
                      <button
                        onClick={() => toggleReviewExpanded(index)}
                        className="text-power-blue text-sm font-medium mt-2 hover:text-power-red transition-colors"
                      >
                        {expandedReviews.has(index) ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 bg-power-blue rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    {review.source === 'google' && (
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5 ml-auto"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More / View All Reviews */}
            <div className="text-center mt-10 flex flex-col items-center gap-4">
              {!showAllReviews && reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Show More Reviews
                  <ChevronDown size={18} />
                </button>
              )}
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-power-blue font-semibold hover:text-power-red transition-colors"
              >
                View All Reviews
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ask Glenn FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-power-dark via-gray-900 to-power-dark relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-power-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-power-blue/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Glenn's Image */}
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
            {/* Glenn's Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-power-red shadow-2xl shadow-power-red/20">
                <img
                  src="/glenn.jpg"
                  alt="Glenn - Powerworks Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* UK Flag Badge */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                  alt="UK"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </motion.div>

            {/* Title Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-power-red/20 border border-power-red/30 rounded-full px-4 py-2 mb-4"
              >
                <MessageCircle size={16} className="text-power-red" />
                <span className="text-power-red font-semibold text-sm">Ask the Expert</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              >
                Got Questions?<br />
                <span className="text-power-red">Glenn&apos;s Got Answers.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg max-w-xl"
              >
                With over 25 years of experience in the automotive industry, I&apos;m here to answer your questions about {service.shortTitle.toLowerCase()}.
              </motion.p>
              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <img
                  src="/signature-gp.png"
                  alt="Glenn's signature"
                  className="h-12 md:h-14 brightness-0 invert opacity-60"
                />
              </motion.div>
            </div>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
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
                  {/* Question Mark Avatar */}
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
                      {/* Glenn's Mini Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-power-red flex-shrink-0">
                        <img
                          src="/glenn.jpg"
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

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">Still have questions? Get in touch directly.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/971521217425"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg"
              >
                <MessageCircle size={20} />
                Ask Glenn on WhatsApp
              </a>
              <Link
                href="/ask-glenn"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
              >
                Visit Ask Glenn
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
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

      {/* Brands We Service */}
      {vehicleMakes.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-power-blue/10 text-power-blue px-4 py-2 rounded-full mb-4">
                <CarFront size={16} />
                <span className="font-semibold text-sm">All Makes Welcome</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.shortTitle} for All Brands
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide expert {service.shortTitle.toLowerCase()} for all major car brands. Select your vehicle to learn more.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {vehicleMakes.map((make, index) => (
                <motion.div
                  key={make.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={`/car-servicing-dubai/${service.slug}/${make.slug}`}
                    className="group flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-power-blue/20 transition-all"
                  >
                    {make.logo ? (
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img
                          src={make.logo}
                          alt={make.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-power-blue rounded-full flex items-center justify-center text-white font-bold group-hover:bg-power-red transition-colors">
                        {make.shortName.substring(0, 2)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 group-hover:text-power-blue transition-colors text-center">
                      {make.shortName}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/makes"
                className="inline-flex items-center gap-2 text-power-blue font-semibold hover:text-power-red transition-colors"
              >
                View All Brands We Service
                <ArrowRight size={18} />
              </Link>
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
              href={`/contact?service=${serviceFormMap[service.slug] || 'other'}`}
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
