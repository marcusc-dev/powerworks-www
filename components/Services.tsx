'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SERVICES, LOTTIE_URLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#1e3a5f_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      {/* Decorative gradient blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-power-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-power-red/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Workshop Styling */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          {/* Animated Mechanic Lottie */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-10 pointer-events-none">
             <Player
                autoplay
                loop
                src={LOTTIE_URLS.mechanic}
                style={{ height: '100px', width: '100px' }}
             />
          </div>

          <span className="text-power-red font-bold uppercase tracking-wider text-sm">Our Expertise</span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">
            Complete <span className="text-power-blue">Car Care</span>
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            From routine maintenance to complex diagnostics, our certified technicians use state-of-the-art equipment to keep your vehicle running perfectly.
          </p>

          {/* Service Bay Visual Indicator */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-16 h-1 bg-power-red rounded-full"
                initial={{ scaleX: 0.3 }}
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Service Grid - Horizontal Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={`/car-servicing-dubai/${service.slug}`}
                className="group flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                {/* Left: Service Icon */}
                <div className="w-28 flex-shrink-0 flex items-center justify-center py-4">
                  {service.serviceImage ? (
                    <img
                      src={service.serviceImage}
                      alt={service.title}
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <Icon size={64} strokeWidth={1.5} className="text-gray-700" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 py-4 pr-4 flex flex-col justify-center min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-power-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center">
                    {service.priceFrom && (
                      <span className="text-power-red font-semibold">{service.priceFrom}</span>
                    )}
                    <span className="text-gray-400 text-sm ml-auto inline-flex items-center gap-1 group-hover:text-power-blue transition-colors">
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Enhanced CTA Section with Workshop Theme */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background with tool pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 rounded-2xl opacity-50"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left side with diagnostic illustration */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-power-blue to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-bold text-lg mb-1">Don&apos;t see what you need?</p>
                  <p className="text-gray-600 text-sm">We handle everything from basic maintenance to complex repairs</p>
                </div>
              </div>

              {/* Right side CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-power-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:scale-105 group whitespace-nowrap"
              >
                Contact Us for Custom Requests
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </div>

            {/* Bottom decorative elements */}
            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-power-red rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                <span>Certified Technicians</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-power-blue rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                <span>State-of-the-Art Equipment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                <span>Warranty on All Work</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom workshop floor accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-30"></div>
    </section>
  );
};

export default Services;
