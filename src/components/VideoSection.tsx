'use client';

import Image from 'next/image';

export default function VideoSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/ramp-long.jpg"
          alt="Powerworks Garage Workshop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--pw-blue-dark)]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-white/60 text-sm tracking-wider uppercase mb-4">
              Since 2020
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Dubai&apos;s leading independent auto technicians.
            </h2>

            {/* Play Button */}
            <a
              href="#"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--pw-red)] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white font-semibold uppercase tracking-wider text-sm">
                Learn more about our services here!
              </span>
            </a>
          </div>

          {/* Decorative Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/mechs.png"
                alt="Mechanics illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
