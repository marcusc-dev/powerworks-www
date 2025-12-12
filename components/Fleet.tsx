'use client';

import React from 'react';
import { FLEET_FEATURES } from '@/lib/constants';

const Fleet: React.FC = () => {
  return (
    <section id="fleet" className="py-24 overflow-hidden relative" style={{
      backgroundColor: '#f8fafc',
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(30, 58, 138, 0.03) 10px,
        rgba(30, 58, 138, 0.03) 20px
      )`
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Content Side */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <div className="relative z-10">
              <span className="text-power-red font-bold uppercase tracking-wider text-sm">Corporate Partners</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">
                Keep Your Fleet Moving
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                We understand that every minute your vehicle is off the road costs you money. That&apos;s why we offer specialized fleet maintenance programs designed for 100% uptime and operational efficiency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {FLEET_FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-power-blue/10 rounded-lg text-power-blue">
                          <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed pl-11">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <a
                  href="#contact"
                  className="bg-power-blue text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-900 transition-colors inline-flex items-center shadow-lg"
                >
                  Ask us About Fleet Services
                </a>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-power-blue/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src="/inspect2.jpg"
                alt="Fleet Maintenance Service Dubai"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Partner Badge Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-20 max-w-xs border-l-4 border-power-red">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Trusted By Industry Leaders</p>
                <p className="font-bold text-gray-900">Partnered with &ldquo;We Will Fix It&rdquo;</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Fleet;
