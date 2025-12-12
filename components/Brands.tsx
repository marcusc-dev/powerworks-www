'use client';

import React from 'react';
import { BRANDS } from '@/lib/constants';

const Brands: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-power-red font-bold uppercase tracking-wider text-sm">Marques We Service</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Specialists in Premium Brands
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Factory-trained expertise and dealer-level diagnostics for European luxury and performance vehicles.
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="relative">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                title={`${brand.name} Service & Repair Dubai`}
                className="group flex flex-col justify-center items-center h-32 w-32 md:w-40 transition-all duration-300 hover:scale-110"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Service Dubai - Powerworks Garage`}
                  className="w-auto h-14 md:h-16 object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="text-xs font-semibold text-gray-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {brand.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Plus Toyota, Nissan, Honda, and other major manufacturers.{' '}
            <a href="#contact" className="text-power-blue hover:text-power-red font-medium transition-colors">
              Contact us for your brand →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brands;
