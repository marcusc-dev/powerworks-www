'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
    }, 8000);

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Text Content */}
        <div className="p-8 md:p-12 lg:p-16 lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 relative min-h-[400px] lg:min-h-[500px]">
          {/* Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>

          {/* Animated Quote */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed text-gray-800 font-medium mb-8">
                &ldquo;{currentReview.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="text-2xl font-bold text-gray-900">{currentReview.name}</div>
                <div className="text-gray-500 text-lg">{currentReview.carDescription}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {FEATURED_REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-power-blue w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 order-1 lg:order-2 bg-white flex items-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={currentReview.image}
              alt={`${currentReview.name} with their ${currentReview.carDescription.replace(' Owner', '')}`}
              className="w-full h-auto object-contain"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeaturedReviewsSlider;
