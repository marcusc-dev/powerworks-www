'use client';

import Image from 'next/image';

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Certified Mechanics',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Customer-First',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Great Value',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '3 Locations in Dubai',
  },
];

const services = [
  'General Auto Repair & Maintenance',
  'Transmission Repair & Replacement',
  'Tyre Repair and Replacement',
  'Pre-purchase Inspection',
  'Brakes Service & Repair',
  'Electrical Diagnostics',
  'Fuel System Repairs',
  'Engine and Chassis Repair',
  'Steering and Suspension Work',
  'Fleet Servicing Contracts',
  'Computer Diagnostics Testing',
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--pw-off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Why Choose Us Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--pw-blue-dark)] mb-2 flex items-center gap-3">
              Why Choose Us
              <span className="flex-1 h-0.5 bg-[var(--pw-red)] max-w-[60px]"></span>
            </h2>
            <p className="text-[var(--pw-gray-600)] mb-8">
              Your Car, Your Priority. We Keep It (here and us) wheels!
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[var(--pw-blue-dark)] text-white flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-[var(--pw-blue-dark)]">
                      {benefit.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Else Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--pw-blue-dark)] mb-2 flex items-center gap-3">
              What Else?
              <span className="flex-1 h-0.5 bg-[var(--pw-red)] max-w-[60px]"></span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-8 mt-8">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 sm:mb-0">
                <Image
                  src="/diganosing-a-vehicle.jpg"
                  alt="Vehicle diagnostics"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Services Checklist */}
              <div>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[var(--pw-gray-700)]">
                      <svg className="w-5 h-5 text-[var(--pw-red)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
