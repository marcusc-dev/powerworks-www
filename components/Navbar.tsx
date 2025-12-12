'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Clock, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, IMAGES, SERVICES } from '@/lib/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [tabBounds, setTabBounds] = useState({ left: 0, width: 0 });

  // Filter nav items for the morphic menu (excluding Services which has dropdown)
  const morphicNavItems = NAV_ITEMS.filter(item => item.label !== 'Services');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateTabBounds = (index: number | null) => {
    if (index === null || !navRef.current) {
      return;
    }
    const navItems = navRef.current.querySelectorAll('[data-nav-item]');
    const item = navItems[index] as HTMLElement;
    if (item) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setTabBounds({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  };

  useEffect(() => {
    updateTabBounds(hoveredIndex ?? activeIndex);
  }, [hoveredIndex, activeIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const showIndicator = hoveredIndex !== null || activeIndex !== null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-gradient-to-b from-gray-100 to-white py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top info row - hidden when scrolled */}
        <div className={`hidden md:flex justify-between items-center text-xs border-b border-gray-200 transition-all duration-300 ${
          scrolled ? 'h-0 overflow-hidden opacity-0 pb-0 mb-0' : 'pb-2 mb-2 opacity-100'
        }`}>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-power-blue" />
              <a href="tel:0521217425" className="hover:text-power-blue transition-colors font-medium">052 121 7425</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-power-blue" />
              <span>Mon - Sun: 8:00AM - 6:00PM</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-power-blue tracking-wide">Car Repair and Service in Dubai</span>
          </div>
        </div>

        {/* Main nav row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center">
              <img
                src={IMAGES.logo}
                alt="Powerworks Garage"
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}
              />
            </a>
          </div>

          {/* Desktop Nav - Morphic Style */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Morphic Nav Container */}
            <div
              ref={navRef}
              className="relative flex items-center bg-gray-100 rounded-full p-1.5"
              onMouseLeave={handleMouseLeave}
            >
              {/* Animated Background Indicator */}
              {showIndicator && (
                <motion.div
                  className="absolute h-[calc(100%-12px)] bg-power-blue rounded-full"
                  initial={false}
                  animate={{
                    left: tabBounds.left,
                    width: tabBounds.width,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{ top: '6px' }}
                />
              )}

              {/* Nav Items */}
              {morphicNavItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-nav-item
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                    (hoveredIndex === index || (hoveredIndex === null && activeIndex === index))
                      ? 'text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Services Dropdown Button */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-200 flex items-center gap-1 ${
                    servicesOpen ? 'text-power-blue' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Services Dropdown */}
                <div className={`absolute top-full right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                  servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {SERVICES.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <a
                          key={idx}
                          href="#services"
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group/item"
                        >
                          <div className="w-8 h-8 bg-power-blue/10 rounded-lg flex items-center justify-center text-power-blue group-hover/item:bg-power-blue group-hover/item:text-white transition-colors">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover/item:text-power-blue transition-colors">
                            {service.title}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-100 p-3 bg-gray-50">
                    <a href="#services" className="text-xs font-bold text-power-blue hover:text-power-red transition-colors">
                      View All Services →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-4 py-2.5 rounded-full font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-md flex items-center gap-2 hover:scale-105 ml-3"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="#contact"
              className="bg-power-red text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-all shadow-md flex items-center gap-2 hover:scale-105"
            >
              <Phone size={16} />
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white p-2.5 rounded-full"
            >
              <MessageCircle size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="lg:hidden bg-white shadow-xl overflow-hidden"
      >
        <div className="px-4 pt-4 pb-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-power-blue hover:bg-power-blue/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold"
            >
              <MessageCircle size={18} />
              WhatsApp Quote
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-power-red text-white px-6 py-3.5 rounded-xl font-bold"
            >
              <Phone size={18} />
              Book Appointment
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
