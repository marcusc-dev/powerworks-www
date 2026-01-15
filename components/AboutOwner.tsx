'use client';

import React from 'react';
import { Quote, Award, Star, Shield } from 'lucide-react';

const AboutOwner: React.FC = () => {
  return (
    <section id="owner" className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e3a8a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img
                  src="/team-gp.jpg"
                  alt="Glenn Power - Owner of Powerworks Garage Dubai"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                      alt="UK Flag"
                      className="w-6 h-4 rounded-sm object-cover"
                    />
                    <span className="text-white/80 text-sm font-medium">British Owned</span>
                  </div>
                  <p className="text-white font-bold text-2xl">Glenn Power</p>
                  <p className="text-gray-300 font-medium">Founder & Lead Technician</p>
                  {/* Glenn's Signature */}
                  <img
                    src="/signature-gp.png"
                    alt="Glenn Power Signature"
                    className="mt-4 w-44 opacity-90"
                    style={{
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </div>
              </div>

              {/* Floating credential badge */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-power-blue/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-power-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">UK Certified</p>
                    <p className="text-xs text-gray-500">Master Technician</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-power-blue/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-power-red/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-power-red"></span>
              <span className="text-power-red font-bold uppercase tracking-wider text-sm">Meet the Owner</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              &ldquo;We don&apos;t just fix cars.
              <span className="text-power-blue"> We build trust.&rdquo;</span>
            </h2>

            <div className="relative mb-10">
              <Quote className="absolute -top-4 -left-6 text-gray-100 w-20 h-20 -z-10" />
              <div className="space-y-4">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Welcome to Powerworks. As a British ex-pat with over 15 years of workshop experience, I started this garage with a simple mission: to bring the transparency, reliability, and technical excellence of a top-tier UK workshop to Dubai.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether you&apos;re driving a daily commuter or a high-performance sports car, my team and I treat your vehicle with the same care we would our own. We pride ourselves on honest advice—no hidden costs, no unnecessary upsells, just quality work you can rely on.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-10 p-6 bg-gray-50 rounded-2xl">
              <div className="text-center px-4">
                <span className="block text-4xl font-extrabold text-power-blue">15+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wide">Years Exp.</span>
              </div>
              <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
              <div className="text-center px-4">
                <span className="block text-4xl font-extrabold text-power-blue">5000+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wide">Cars Serviced</span>
              </div>
              <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
              <div className="text-center px-4 flex items-center gap-2">
                <div>
                  <span className="block text-4xl font-extrabold text-power-blue">4.9</span>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wide">Google Rating</span>
                </div>
                <div className="flex text-yellow-400 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Shield size={16} className="text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Fully Licensed</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Award size={16} className="text-power-blue" />
                <span className="text-sm font-medium text-gray-700">Factory Trained</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">5-Star Rated</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutOwner;
