'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedReview {
  name: string;
  carDescription: string;
  quote: string;
  image: string;
}

const FEATURED_REVIEWS: FeaturedReview[] = [
  {
    name: 'James Anderson',
    carDescription: 'Range Rover Sport Owner',
    quote: 'Finally a garage in Dubai I can trust. Glenn and the team explained everything clearly and the pricing was transparent. They found an issue the dealer had missed and saved me thousands. Felt just like my local back in the UK—highly recommended!',
    image: '/review-rr.jpg',
  },
  {
    name: 'Henry Shatwell',
    carDescription: 'Ford F150 Raptor Owner',
    quote: 'Amazing experience. Another garage gave me a very misleading diagnosis with a huge estimated repair cost and I was going to sell it because of their assessment. Powerworks gave me an honest assessment and fixed it at a fraction of the cost.',
    image: '/review-raptor.jpg',
  },
  {
    name: 'Efe Yaman',
    carDescription: 'Porsche 911 Owner',
    quote: 'Fantastic work and fantastic service. Have brought both of my ML63 and Porsche 911 to these gents, and so lucky to meet the owner himself and the garage operations manager who cares about the garage as if it was his own! Kept me informed throughout the process.',
    image: '/review-porsche-911.jpg',
  },
  {
    name: 'Lisa Oxford',
    carDescription: 'BMW Owner',
    quote: 'Glenn has been absolutely amazing helping me out with my car issues. What I find valuable is Glenn explains everything really clearly so you understand the full picture and know you\'re not being ripped off with unnecessary works. Highly recommend this garage.',
    image: '/review-bmw.jpg',
  },
];

const FeaturedReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentReview = FEATURED_REVIEWS[currentIndex];

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-power-red font-bold uppercase tracking-wider text-sm">Featured Stories</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Happy Customers</h2>
      </div>

      {/* Main Slider Card */}
      <div className="relative bg-gradient-to-br from-power-blue via-power-blue to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Diagonal Accent */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-power-red/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-stretch">
          {/* Image Section - Left side with creative clipping */}
          <div className="md:w-2/5 relative">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentReview.image}
                    alt={`${currentReview.name}'s ${currentReview.carDescription.replace(' Owner', '')}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for blend */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-power-blue md:block hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-power-blue via-transparent to-transparent md:hidden"></div>
                </motion.div>
              </AnimatePresence>

              {/* Car badge floating on image */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <span className="text-xs font-bold text-power-blue">{currentReview.carDescription.replace(' Owner', '')}</span>
              </div>
            </div>
          </div>

          {/* Content Section - Right side */}
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            {/* Quote Icon */}
            <Quote className="w-10 h-10 text-power-red/60 mb-3 -scale-x-100" fill="currentColor" />

            {/* Animated Quote */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <blockquote className="text-lg md:text-xl text-white/95 font-medium leading-relaxed mb-6 line-clamp-4">
                  {currentReview.quote}
                </blockquote>

                {/* Author with Stars */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-xl font-bold text-white">{currentReview.name}</div>
                    <div className="text-white/60 text-sm">{currentReview.carDescription}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation - Compact inline */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
              {/* Arrows */}
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={18} className="text-white" />
              </button>

              {/* Progress Dots */}
              <div className="flex gap-1.5 ml-auto">
                {FEATURED_REVIEWS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-power-red w-6'
                        : 'bg-white/30 w-1.5 hover:bg-white/50'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="text-white/40 text-sm font-mono">
                {String(currentIndex + 1).padStart(2, '0')}/{String(FEATURED_REVIEWS.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Preview Strip */}
      <div className="flex justify-center gap-3 mt-6">
        {FEATURED_REVIEWS.map((review, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-power-red ring-offset-2 scale-105'
                : 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
            }`}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-12 md:w-20 md:h-14 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviewsSlider;
