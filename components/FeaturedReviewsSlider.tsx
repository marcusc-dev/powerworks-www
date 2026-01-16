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
      <div className="text-center mb-10">
        <span className="text-power-red font-bold uppercase tracking-wider text-sm">Featured Stories</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Happy Customers</h2>
      </div>

      {/* Main Slider - Split Layout */}
      <div className="relative flex flex-col lg:flex-row items-stretch gap-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">

        {/* Image Section - Clean white background */}
        <div className="lg:w-1/2 relative bg-white">
          <div className="relative h-72 md:h-80 lg:h-[420px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <img
                  src={currentReview.image}
                  alt={`${currentReview.name}'s ${currentReview.carDescription.replace(' Owner', '')}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Car badge floating on image */}
            <div className="absolute bottom-4 left-4 bg-power-blue text-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">{currentReview.carDescription.replace(' Owner', '')}</span>
            </div>
          </div>
        </div>

        {/* Content Section - Dark gradient */}
        <div className="lg:w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-800 to-power-blue overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-power-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-power-blue/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-power-red mb-4 -scale-x-100" fill="currentColor" />

            {/* Animated Quote */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex-1 flex flex-col justify-center"
              >
                <blockquote className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed mb-8">
                  {currentReview.quote}
                </blockquote>

                {/* Author with Stars */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-white">{currentReview.name}</div>
                  <div className="text-white/60 text-sm mt-1">{currentReview.carDescription}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-3 rounded-full bg-white/10 hover:bg-power-red transition-colors group"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} className="text-white group-hover:text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-3 rounded-full bg-white/10 hover:bg-power-red transition-colors group"
                  aria-label="Next review"
                >
                  <ChevronRight size={20} className="text-white group-hover:text-white" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 flex gap-2">
                {FEATURED_REVIEWS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-power-red'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="text-white/50 text-sm font-mono">
                {String(currentIndex + 1).padStart(2, '0')}/{String(FEATURED_REVIEWS.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Preview Strip */}
      <div className="flex justify-center gap-4 mt-8">
        {FEATURED_REVIEWS.map((review, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 bg-white shadow-md ${
              index === currentIndex
                ? 'ring-2 ring-power-red ring-offset-2 scale-110'
                : 'opacity-50 hover:opacity-100 hover:scale-105'
            }`}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-14 md:w-24 md:h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviewsSlider;
