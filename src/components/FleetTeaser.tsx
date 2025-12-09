'use client';

import Image from 'next/image';
import Link from 'next/link';

const fleetBenefits = [
  { text: 'Dedicated Account Manager', icon: '👤' },
  { text: 'Priority SLA Turnaround', icon: '⚡' },
  { text: 'Free Pickup & Dropoff', icon: '🚗' },
  { text: 'Monthly Credit Facilities', icon: '📋' },
  { text: 'Detailed Fleet Reports', icon: '📊' },
  { text: 'Volume Discounts', icon: '💰' },
];

export default function FleetTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--pw-off-white)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/fleet-service-dubai.jpg"
                alt="Fleet maintenance services at Powerworks Garage Dubai"
                fill
                className="object-cover"
              />

              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[var(--pw-blue)]/95 backdrop-blur-sm rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[var(--pw-red)]">100%</div>
                    <div className="text-sm text-white/70">Uptime Goal</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-3xl font-bold text-[var(--pw-red)]">24hr</div>
                    <div className="text-sm text-white/70">Response Time</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-3xl font-bold text-[var(--pw-red)]">50+</div>
                    <div className="text-sm text-white/70">Fleet Clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--pw-red)]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--pw-blue)]/10 rounded-full blur-2xl" />
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-[var(--pw-red)] font-semibold text-sm uppercase tracking-wider mb-4">
              For Business
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pw-blue-dark)] mb-6">
              Fleet Maintenance You Can Rely On
            </h2>

            <p className="text-lg text-[var(--pw-gray-600)] mb-8 leading-relaxed">
              Keep your business moving with our dedicated fleet solutions. We act as your
              external transport manager, offering priority booking, pickup/dropoff services,
              and monthly credit invoicing.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {fleetBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-xl">{benefit.icon}</span>
                  <span className="text-sm font-medium text-[var(--pw-blue-dark)]">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trusted by */}
            <div className="mb-8 p-4 bg-white rounded-xl border border-[var(--pw-gray-200)]">
              <p className="text-sm text-[var(--pw-gray-600)] mb-3">Trusted by companies like:</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-semibold text-[var(--pw-blue-dark)]">We Will Fix It</span>
                <span className="text-[var(--pw-gray-300)]">•</span>
                <span className="font-semibold text-[var(--pw-blue-dark)]">Home Heroes</span>
                <span className="text-[var(--pw-gray-300)]">•</span>
                <span className="font-semibold text-[var(--pw-blue-dark)]">+ more</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--pw-red)] text-white font-semibold rounded-lg hover:bg-[var(--pw-red-hover)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Request Fleet Proposal</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
