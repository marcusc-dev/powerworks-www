'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'CUSTOMERS AND CARS', href: '/gallery' },
  { label: 'THE POWER BLOG', href: '/blog' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[var(--pw-red)] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Car Repair and Service in Dubai</span>
            <span className="hidden sm:inline text-white/80">|</span>
            <span className="hidden sm:inline text-white/80">Monday - Sunday: 8:00AM - 6:00PM</span>
          </div>
          <a
            href="tel:0521217425"
            className="flex items-center gap-2 font-semibold hover:text-white/90 transition-colors"
          >
            <span>Schedule Your Service Appointment</span>
            <span className="bg-white text-[var(--pw-red)] px-3 py-1 rounded-full text-xs font-bold">
              052 121 7425
            </span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'} bg-white transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Powerworks Garage"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--pw-blue-dark)] font-bold text-lg tracking-wide">POWERWORKS</span>
                <span className="text-[var(--pw-red)] text-[10px] font-semibold tracking-[0.2em]">
                  GARAGE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                    item.label === 'HOME'
                      ? 'text-[var(--pw-red)]'
                      : 'text-[var(--pw-blue-dark)] hover:text-[var(--pw-red)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Icon */}
              <button className="p-2 text-[var(--pw-blue-dark)] hover:text-[var(--pw-red)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Book a Service Button */}
              <a
                href="tel:0521217425"
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pw-red)] text-white text-sm font-semibold rounded hover:bg-[var(--pw-red-hover)] transition-all"
              >
                BOOK A SERVICE
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--pw-blue-dark)] rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 animate-fade-in border-t border-gray-100">
              <nav className="space-y-1 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                      item.label === 'HOME'
                        ? 'text-[var(--pw-red)] bg-red-50'
                        : 'text-[var(--pw-blue-dark)] hover:text-[var(--pw-red)] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 px-4">
                <a
                  href="tel:0521217425"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[var(--pw-red)] text-white font-semibold rounded"
                >
                  BOOK A SERVICE
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
