'use client';

import Link from 'next/link';

const services = [
  {
    title: 'Car Service',
    description: 'Full service to manufacturer standards',
    icon: '🔧',
    href: '/services/car-service',
  },
  {
    title: 'Car Repair',
    description: 'Expert diagnostics and repairs',
    icon: '🛠️',
    href: '/services/car-repair',
  },
  {
    title: 'AC Repair',
    description: 'Beat the Dubai heat',
    icon: '❄️',
    href: '/services/ac-repair',
  },
  {
    title: 'Diagnostics',
    description: 'Dealer-level fault finding',
    icon: '⚡',
    href: '/services/diagnostics',
  },
  {
    title: 'Brake Service',
    description: 'Pads, discs, fluid & more',
    icon: '🛑',
    href: '/services/brake-service',
  },
  {
    title: 'Engine Work',
    description: 'Minor repairs to rebuilds',
    icon: '🔩',
    href: '/services/engine',
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-[var(--pw-off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--pw-blue-dark)] mb-4">
            What We Do
          </h2>
          <p className="text-lg text-[var(--pw-gray-600)] max-w-2xl mx-auto">
            From routine maintenance to complex repairs, we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[var(--pw-gray-200)]"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-bold text-[var(--pw-blue-dark)] mb-2 group-hover:text-[var(--pw-red)] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--pw-gray-600)]">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--pw-red)] font-semibold hover:gap-3 transition-all"
          >
            <span>View all services</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
