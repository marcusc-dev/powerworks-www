'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SERVICES, LOTTIE_URLS } from '@/lib/constants';
import { motion } from 'framer-motion';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Workshop-themed Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        {/* Honeycomb technical pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://pixabay.com/get/g09a0e3c8e5baffaafd6e6807333c8bca3f1beb8726cf7c80ad6a43034a63a91fca442a83c6f5e0ab0e1f5c2d18f52f90.svg")`,
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Decorative Tool Icons */}
      <div className="absolute top-20 left-10 w-24 h-24 opacity-[0.03] rotate-12">
        <img
          src="https://pixabay.com/get/g1c143ae009a4d73778637f7301eea16e81f21b165bdebc69c23a1ab1bf93adbb4cfceff9e4eb7d4e9005f220532a8eab.svg"
          alt="Wrench decoration"
          className="w-full h-full"
        />
      </div>

      <div className="absolute bottom-32 right-16 w-20 h-20 opacity-[0.03] -rotate-45">
        <img
          src="https://pixabay.com/get/g21b4a8da76888fbac11976f519bc830fcc2e59b1f698368734af73d14f68b753b71af9fc14b62bc266f1f096bd057191.svg"
          alt="Toolbox decoration"
          className="w-full h-full"
        />
      </div>

      {/* Animated Gear */}
      <motion.div
        className="absolute top-1/2 right-8 w-32 h-32 opacity-[0.02]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <img
          src="https://pixabay.com/get/g297a83aad3174853ab2e76a10afd78fd0a41510b1b31f217bb64b14e536f8b4d1c35265e55d73e623b060b4df3cf4b68.svg"
          alt="Gear decoration"
          className="w-full h-full"
        />
      </motion.div>

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

        {/* Enhanced Service Grid with Workshop Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-power-blue/30 hover:-translate-y-2 overflow-hidden"
              >
                {/* Corner Accent - Hexagon Pattern */}
                <div className="absolute -top-8 -right-8 w-24 h-24 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500">
                  <img
                    src="https://pixabay.com/get/g09a0e3c8e5baffaafd6e6807333c8bca3f1beb8726cf7c80ad6a43034a63a91fca442a83c6f5e0ab0e1f5c2d18f52f90.svg"
                    alt="Honeycomb pattern"
                    className="w-full h-full"
                  />
                </div>

                {/* Tool Silhouette Background */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500">
                  <img
                    src="https://pixabay.com/get/g1c143ae009a4d73778637f7301eea16e81f21b165bdebc69c23a1ab1bf93adbb4cfceff9e4eb7d4e9005f220532a8eab.svg"
                    alt="Wrench"
                    className="w-full h-full"
                  />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-power-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon with metallic workshop effect */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-power-blue to-blue-900 rounded-lg flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-6 shadow-lg group-hover:shadow-xl">
                  <Icon size={28} strokeWidth={2} />

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-power-blue transition-colors relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>

                {/* Bottom corner indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-power-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-xl"></div>
              </motion.div>
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
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src="https://pixabay.com/get/gf6d8d7234acc8c17cfd227b9561ace4e7bb6eea44a8814194eab17f28551ffe0f6e1b04012f4f335329e9d6071ed3089.svg"
                    alt="Garage lift"
                    className="w-full h-full opacity-60"
                  />
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
