'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column with Badge */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/glen-1-about-pw.jpg"
                alt="Glenn Power - British Master Technician"
                fill
                className="object-cover"
              />
            </div>

            {/* Years Badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:right-8">
              <div className="bg-white rounded-lg shadow-xl p-6 text-center">
                <div className="text-5xl lg:text-6xl font-bold text-[var(--pw-blue-dark)]">3</div>
                <div className="text-sm text-[var(--pw-gray-600)] uppercase tracking-wider">
                  YEARS<br />IN DUBAI
                </div>
              </div>
            </div>

            {/* Small Logo */}
            <div className="absolute top-6 left-6">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <Image
                  src="/logo.png"
                  alt="Powerworks Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <span className="inline-block text-[var(--pw-gray-500)] text-sm tracking-wider mb-4">
              Welcome to Powerworks Garage
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pw-blue-dark)] mb-6 leading-tight">
              British Owned Automotive Experts in Dubai
            </h2>

            <div className="space-y-4 text-[var(--pw-gray-600)] leading-relaxed mb-8">
              <p>
                Are you looking for a company you can trust with British-trained technicians? Come over to
                us at the Powerworks Garage, as we offer car service and repair for all types of vehicles.
              </p>
              <p>
                Our experienced team in Al Quoz can repair any vehicle, make or model. We are British trained, our British
                Technicians and team strive to offer the highest levels of service at fair prices.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pw-blue-dark)] text-white font-semibold rounded hover:bg-[var(--pw-blue)] transition-all group"
            >
              <span>ABOUT US</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
