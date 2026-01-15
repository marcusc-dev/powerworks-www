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

interface ServicePageClientProps {
  service: ServiceData;
  relatedServices: ServiceData[];
  reviews?: Testimonial[];
  vehicleMakes?: VehicleMake[];
}

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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Connector Line */}
                {index < service.process.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                    style={{ originX: 0 }}
                  />
                )}

                <div className="relative z-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-power-blue/20">
                  {/* Step Number */}
                  <motion.div
                    className="w-12 h-12 bg-power-blue text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-power-red"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-power-blue">
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
