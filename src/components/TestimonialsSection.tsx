'use client';

import Link from 'next/link';

const testimonial = {
  text: "I'd highly recommend Glenn, Justin & the Powerworks team having always provided excellent support for my car service and repairs. Most recently help repair via a breakdown recovery. Swift diagnostic, detailed explanation of both necessary and suggested actions to resolve and get back on the road. As always, friendly and super efficient service. 5 Star value guys, that's why...",
  author: 'MARK REED',
};

const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place//data=!4m3!3m2!1s0x3e5f6921b362aa0d:0x8bc322a165f1d7a5!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation';

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--pw-blue-dark)] mb-12 flex items-center justify-center gap-4">
          Our Customers Say...
          <span className="hidden sm:inline-block w-16 h-0.5 bg-[var(--pw-red)]"></span>
        </h2>

        {/* Quote */}
        <div className="relative">
          {/* Large Quote Mark */}
          <div className="text-[120px] leading-none text-[var(--pw-red)]/20 font-serif absolute -top-8 left-0">
            &ldquo;
          </div>

          <blockquote className="relative z-10 text-lg text-[var(--pw-gray-700)] leading-relaxed mb-8 italic">
            {testimonial.text}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-[var(--pw-red)]"></span>
            <Link
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-red)] font-semibold hover:underline"
            >
              {testimonial.author}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
