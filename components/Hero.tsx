'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/constants';
import BackgroundPaths from './BackgroundPaths';
import { motion, AnimatePresence } from 'framer-motion';

// Headlines - each as a complete message
const HERO_HEADLINES = [
  { line1: "Your Car.", line2: "Our Priority." },
  { line1: "British Standards.", line2: "At Great Rates." },
  { line1: "More Care & Attention.", line2: "Than the Main Dealer." },
  { line1: "Honest Workmanship.", line2: "Care & Attention." },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change image every 5 seconds

    return () => {
        clearInterval(slideTimer);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const headlineTimer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % HERO_HEADLINES.length);
    }, 4000); // Change headline every 4 seconds

    return () => {
        clearInterval(headlineTimer);
    };
  }, [isMounted]);

  return (
    <div id="home" className="relative h-[620px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Slideshow Background */}
      {HERO_SLIDES.map((slide, index) => (
        <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <img
                src={slide}
                alt={`Workshop Slide ${index + 1}`}
                className="w-full h-full object-cover"
            />
        </div>
      ))}

      {/* Static Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-power-blue/95 via-power-blue/75 to-transparent z-10"></div>

      {/* Animated Background Paths */}
      <BackgroundPaths className="z-[15]" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40 h-full">
        <div className="flex items-center justify-between h-full">
        <div className="max-w-2xl">
          {/* Trust Badge - positioned to the right to avoid logo overlap */}
          <div className="inline-flex flex-col md:flex-row items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-full px-4 py-2 md:py-1.5 mb-4 md:mb-6 animate-fade-in-up ml-48 sm:ml-40 lg:ml-48">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-white text-xs font-medium tracking-wide">Rated 5 Stars on Google</span>
          </div>

          <h1 className="text-[1.4rem] sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6 min-h-[90px] md:min-h-[140px]">
            {isMounted ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeadline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="text-white">
                    {HERO_HEADLINES[currentHeadline].line1}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                    {HERO_HEADLINES[currentHeadline].line2}
                  </span>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col">
                <span className="text-white">
                  {HERO_HEADLINES[0].line1}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                  {HERO_HEADLINES[0].line2}
                </span>
              </div>
            )}
          </h1>

          <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-lg">
            Your trusted British-owned garage in Dubai. From routine service to complex engine work, we treat every car as if it were our own.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-power-red text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/50 flex justify-center items-center"
            >
              Get a Quote
            </a>
            <a
              href="#services"
              className="bg-white/10 text-white border border-white/30 backdrop-blur-sm px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-white hover:text-power-blue transition-all flex justify-center items-center"
            >
              View Services
            </a>
          </div>

        </div>

        {/* Glenn Cutout Image - Full height, boxed horizontally */}
        <div className="hidden lg:block absolute right-0 bottom-0 h-full">
          <img
            src="/glenn.jpg"
            alt="Glenn - Your Trusted Mechanic"
            className="h-full w-auto object-cover object-top"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
            }}
          />
          {/* Glenn's Signature */}
          <img
            src="/signature-gp.png"
            alt="Glenn Power Signature"
            className="absolute bottom-8 right-8 w-56 opacity-90 drop-shadow-lg"
            style={{
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4">
         <div className="flex gap-2">
            {HERO_SLIDES.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
