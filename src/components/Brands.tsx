import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">We Specialize In</p>
        </div>

        {/* Scrolling container */}
        <div className="relative">
          <div className="flex animate-scroll gap-12 md:gap-16">
            {/* First set of logos */}
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                className="group flex-shrink-0 flex justify-center items-center h-28 px-6 transition-all duration-300 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Repair Dubai`}
                  className="w-auto object-contain"
                  style={{ maxHeight: '4.5rem' }}
                />
              </a>
            ))}
            {/* Duplicate set for seamless loop */}
            {BRANDS.map((brand) => (
              <a
                key={`${brand.name}-dup`}
                href={brand.url}
                className="group flex-shrink-0 flex justify-center items-center h-28 px-6 transition-all duration-300 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Repair Dubai`}
                  className="w-auto object-contain"
                  style={{ maxHeight: '4.5rem' }}
                />
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
           <p className="text-gray-400 text-sm">And many other major manufacturers</p>
        </div>
      </div>
    </section>
  );
};

export default Brands;