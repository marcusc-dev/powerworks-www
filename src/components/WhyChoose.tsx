import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Banknote,
  Users,
  Wrench,
  Building2,
  HeartHandshake
} from 'lucide-react';

const WHY_CHOOSE_ITEMS = [
  {
    icon: ShieldCheck,
    title: "British-Owned & Managed",
    description: "Founded and operated by British ex-pats with UK workshop standards and ethics.",
    accent: "power-blue",
    large: true
  },
  {
    icon: Award,
    title: "20+ Years Experience",
    description: "Decades of hands-on expertise across European and Japanese vehicles.",
    accent: "power-red"
  },
  {
    icon: HeartHandshake,
    title: "Honest Diagnostics",
    description: "We tell you what's wrong and what's not. No upselling, no unnecessary work.",
    accent: "emerald-500"
  },
  {
    icon: Banknote,
    title: "Transparent Pricing",
    description: "Clear quotes upfront. No hidden fees, no surprises when you collect your car.",
    accent: "power-blue"
  },
  {
    icon: Building2,
    title: "Real Workshop",
    description: "Not a marketplace or broker. Your car stays with us in our fully-equipped facility.",
    accent: "power-red",
    large: true
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most services completed same-day. We respect your time.",
    accent: "amber-500"
  },
  {
    icon: Users,
    title: "Fleet Specialists",
    description: "Trusted by We Will Fix It and corporate clients across Dubai.",
    accent: "power-blue"
  },
  {
    icon: Wrench,
    title: "Dealer-Level Equipment",
    description: "Factory diagnostic tools and genuine parts for precision service.",
    accent: "power-red"
  }
];

const WhyChoose: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-power-red"></span>
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">The Powerworks Difference</span>
            <span className="h-px w-8 bg-power-red"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Why Dubai Trusts <span className="text-power-blue">Powerworks</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We're not just another garage. We bring British precision, transparency, and genuine care to every vehicle that comes through our doors.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLarge = item.large;

            return (
              <div
                key={index}
                className={`
                  group relative bg-white
                  rounded-2xl p-8 border border-gray-200
                  hover:border-gray-300 hover:shadow-xl
                  transition-all duration-500 ease-out
                  ${isLarge ? 'md:col-span-2' : ''}
                `}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${item.accent}/5 to-transparent`}></div>

                {/* Icon */}
                <div className={`
                  relative z-10 w-14 h-14 rounded-xl
                  flex items-center justify-center mb-6
                  transition-all duration-300
                  ${item.accent === 'power-blue' ? 'bg-power-blue/10 text-power-blue group-hover:bg-power-blue group-hover:text-white' : ''}
                  ${item.accent === 'power-red' ? 'bg-power-red/10 text-power-red group-hover:bg-power-red group-hover:text-white' : ''}
                  ${item.accent === 'emerald-500' ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' : ''}
                  ${item.accent === 'amber-500' ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' : ''}
                `}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-power-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className={`
                  absolute top-0 right-0 w-20 h-20
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  ${item.accent === 'power-blue' ? 'bg-power-blue/5' : ''}
                  ${item.accent === 'power-red' ? 'bg-power-red/5' : ''}
                  ${item.accent === 'emerald-500' ? 'bg-emerald-500/5' : ''}
                  ${item.accent === 'amber-500' ? 'bg-amber-500/5' : ''}
                  rounded-bl-[100px]
                `}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-power-blue flex items-center justify-center text-white text-xs font-bold border-2 border-white">GP</div>
                <div className="w-10 h-10 rounded-full bg-power-red flex items-center justify-center text-white text-xs font-bold border-2 border-white">PW</div>
              </div>
              <p className="text-gray-600 text-sm">
                <span className="font-bold text-gray-900">150+ happy customers</span> this month
              </p>
            </div>
            <a
              href="#contact"
              className="bg-power-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Experience the Difference
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
