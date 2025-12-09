import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { IMAGES, HERO_SLIDES, LOTTIE_URLS, HERO_HEADLINES } from '../constants';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change image every 5 seconds

    const headlineTimer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % HERO_HEADLINES.length);
    }, 4000); // Change text every 4 seconds

    return () => {
        clearInterval(slideTimer);
        clearInterval(headlineTimer);
    };
  }, []);

  const headlineData = HERO_HEADLINES[currentHeadline];

  return (
    <div id="home" className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
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

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-white text-xs font-medium tracking-wide">Rated 5 Stars on Google</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
            <span key={`primary-${currentHeadline}`} className="block animate-fade-in-up">
                {headlineData.primary}
            </span>
            <span key={`secondary-${currentHeadline}`} className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {headlineData.secondary}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
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

          {/* Key Selling Points */}
          <div className="mt-10 flex items-center gap-8 text-white/80 text-sm font-medium">
             <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-400" size={20} />
                <span>Fully Licensed</span>
             </div>
             <div className="flex items-center gap-2">
                <img src={IMAGES.logoUnionJack} alt="UK Flag" className="w-6 h-4 object-cover rounded-sm opacity-90" />
                <span>British Owned & Managed</span>
             </div>
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
        
        {/* Lottie Scroll Indicator */}
        <div className="hidden md:block opacity-70">
           <Player
              autoplay
              loop
              src={LOTTIE_URLS.scrollDown}
              style={{ height: '40px', width: '40px' }}
           />
        </div>
      </div>
    </div>
  );
};

export default Hero;