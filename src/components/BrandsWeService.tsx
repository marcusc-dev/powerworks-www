'use client';

import Image from 'next/image';

// Only include brands we have actual logos for
const brands = [
  { name: 'Porsche', logo: '/porsche.png' },
  { name: 'Audi', logo: '/audi.png' },
  { name: 'Volkswagen', logo: '/vw.png' },
  { name: 'Bentley', logo: '/bentley.png' },
  { name: 'Land Rover', logo: '/landrover.png' },
];

export default function BrandsWeService() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple, clean logo strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative w-20 h-16 md:w-28 md:h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} service Dubai`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Simple tagline */}
        <p className="text-center text-[var(--pw-gray-500)] text-sm mt-8">
          Specialists in European vehicles • All makes welcome
        </p>
      </div>
    </section>
  );
}
