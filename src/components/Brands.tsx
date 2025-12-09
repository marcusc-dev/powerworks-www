import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">We Specialize In</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {BRANDS.map((brand) => (
            <a 
              key={brand.name} 
              href={brand.url} 
              className="group w-full flex justify-center items-center h-20 p-4 transition-all duration-300 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-105"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} Repair Dubai`} 
                className="max-h-12 w-auto object-contain"
              />
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
           <p className="text-gray-400 text-sm">And many other major manufacturers</p>
        </div>
      </div>
    </section>
  );
};

export default Brands;