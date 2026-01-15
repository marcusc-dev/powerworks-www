'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '@/lib/constants';

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-power-dark text-white relative">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2 text-white">What Our Customers Say</h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
             <div className="flex items-center gap-2 mb-1">
                 <span className="text-3xl font-bold text-white">4.9</span>
                 <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                 </div>
             </div>
             <p className="text-gray-400 text-sm">Based on 150+ Google Reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex justify-between items-center mt-auto border-t border-gray-700 pt-4">
                <span className="font-bold text-white">{review.name}</span>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
             <a
                href="https://g.page/r/CaXX8WWhIsOLEAE/review"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-white border-b border-power-red pb-1 hover:text-power-red transition-colors"
             >
                Read all reviews on Google &rarr;
             </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
