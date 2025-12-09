'use client';

const features = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Service Excellence',
    description: 'We are only as good as our last job. We strive to keep our customers satisfied every time',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'All Makes',
    description: "We trained with the VW Group but we're used, comfortable with any make or model",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'We make it easy',
    description: "We're happy to collect and deliver if it makes your life easier",
  },
];

export default function SatisfactionStrip() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 items-center">
          {/* 100% Satisfaction Badge */}
          <div className="text-center lg:text-left">
            <div className="inline-block">
              <div className="text-6xl lg:text-7xl font-bold text-[var(--pw-red)] leading-none">
                100%
              </div>
              <div className="text-xl lg:text-2xl font-bold text-[var(--pw-blue-dark)]">
                Satisfaction
              </div>
              <div className="text-xl lg:text-2xl font-bold text-[var(--pw-blue-dark)]">
                Guarantee
              </div>
            </div>
          </div>

          {/* Features */}
          {features.map((feature, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--pw-red)] text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-[var(--pw-blue-dark)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--pw-gray-600)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
