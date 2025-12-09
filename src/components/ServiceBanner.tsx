'use client';

import Image from 'next/image';

export default function ServiceBanner() {
  return (
    <section className="relative bg-[var(--pw-red)] py-16 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/pattern.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Service and<br />
              satisfaction is our goal.
            </h2>
            <p className="text-white/80 max-w-lg leading-relaxed">
              We know how important it is for you your car looked after by people you can
              trust. We aim to offer the highest quality of car services and repairs matched
              with excellent customer service, and an honest, practical advice. Just read
              what our customers say.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/inspect2.jpg"
                alt="Team inspecting vehicle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
