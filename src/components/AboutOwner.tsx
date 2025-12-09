import React from 'react';
import { Quote } from 'lucide-react';
import { IMAGES } from '../constants';

const AboutOwner: React.FC = () => {
  return (
    <section id="owner" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img
                src="/team-gp.jpg"
                alt="Glenn Power - Owner of Powerworks Garage"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <p className="text-white font-bold text-2xl">Glenn Power</p>
                <p className="text-gray-300 font-medium">Owner and Lead Mechanic</p>
              </div>
            </div>
            {/* Decor elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-power-blue/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-power-red/10 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-12 bg-power-red"></span>
              <span className="text-power-red font-bold uppercase tracking-wider text-sm">Meet the Owner</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              "We don't just fix cars. We build trust."
            </h2>

            <div className="relative mb-8">
              <Quote className="absolute -top-2 -left-4 text-gray-100 w-16 h-16 -z-10" />
              <p className="text-gray-600 text-lg leading-relaxed">
                Welcome to Powerworks. As a British ex-pat in Dubai, I started this garage with a simple mission: to bring the transparency, reliability, and technical excellence of a top-tier UK workshop to the UAE.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                Whether you're driving a daily commuter or a high-performance sports car, my team and I treat your vehicle with the same care we would our own. We pride ourselves on honest advice—no hidden costs, no unnecessary upsells, just quality work you can rely on.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="text-center px-6 py-3 border-r border-gray-200">
                <span className="block text-3xl font-bold text-power-blue">15+</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Years Exp.</span>
              </div>
              <div className="text-center px-6 py-3">
                <span className="block text-3xl font-bold text-power-blue">100%</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Satisfaction</span>
              </div>
            </div>

            <div className="mt-8">
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 opacity-50" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutOwner;