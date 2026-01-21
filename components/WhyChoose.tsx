'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Banknote,
  Users,
  Wrench,
  Building2,
  HeartHandshake,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Automotive Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        {/* Tire track pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://pixabay.com/get/g5aaa92be7d7d429f0d94936dad5347f4d24bae441d78a5628004bfac8a54eb396aadcd99c276f32a5b42b369a49ce4b9.svg")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.05
          }}
        />

        {/* Blueprint pattern overlay */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            backgroundImage: `url("/blueprint-pattern.svg")`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat',
            opacity: 0.08
          }}
        />
      </div>

      {/* Animated Gear Decorations */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <img
          src="https://pixabay.com/get/gb35e207e36af73cf5d7e2a9ce25dba036de76bd09c3f905e571ddf435c17ea4c440e23d8e1da853edbeb91d3ce9d989e.svg"
          alt="Gear decoration"
          className="w-full h-full"
          style={{ filter: 'invert(1)' }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 opacity-5"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <img
          src="https://pixabay.com/get/g3d3569eba75a1cf382a4ccff767f4c758e3548dc4b0a52f28546f24bf1118d5b4bb9273e5f6f82f1b957478f930650e9.svg"
          alt="Gear decoration"
          className="w-full h-full"
          style={{ filter: 'invert(1)' }}
        />
      </motion.div>

      {/* Checkered Flag Accent - Top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent">
        <div
          className="h-full opacity-20"
          style={{
            backgroundImage: `url("https://pixabay.com/get/gd644de7a7289bb3b8727b028bf07e9785eddd5d24f639333fc64a3c5c36822b34c12cafba478b5099917252b4f0404b9.svg")`,
            backgroundSize: '60px 100%',
            backgroundRepeat: 'repeat-x'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Speedometer Accent */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-power-red"></span>
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">The Powerworks Difference</span>
            <span className="h-px w-8 bg-power-red"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Why Dubai Trusts <span className="text-power-red">Powerworks</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We&apos;re not just another garage. We bring British precision, transparency, and genuine care to every vehicle that comes through our doors.
          </p>

          {/* Speedometer-inspired decorative element */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-8 bg-power-red rounded-full"
                initial={{ scaleY: 0.3, opacity: 0.3 }}
                animate={{
                  scaleY: [0.3, 1, 0.3],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Bento Grid with Automotive Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLarge = item.large;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  group relative bg-gray-800/50 backdrop-blur-sm
                  rounded-2xl p-8 border border-gray-700/50
                  hover:border-gray-600 hover:shadow-2xl hover:shadow-power-red/10
                  transition-all duration-500 ease-out
                  ${isLarge ? 'md:col-span-2' : ''}
                `}
              >
                {/* Tire tread corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("https://pixabay.com/get/g5aaa92be7d7d429f0d94936dad5347f4d24bae441d78a5628004bfac8a54eb396aadcd99c276f32a5b42b369a49ce4b9.svg")`,
                      backgroundSize: '40px 40px',
                      opacity: 0.1
                    }}
                  />
                </div>

                {/* Racing stripe accent */}
                <div className={`
                  absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl
                  transition-all duration-500 group-hover:w-2
                  ${item.accent === 'power-blue' ? 'bg-power-blue' : ''}
                  ${item.accent === 'power-red' ? 'bg-power-red' : ''}
                  ${item.accent === 'emerald-500' ? 'bg-emerald-500' : ''}
                  ${item.accent === 'amber-500' ? 'bg-amber-500' : ''}
                `}></div>

                {/* Icon with metallic effect */}
                <div className={`
                  relative z-10 w-14 h-14 rounded-xl
                  flex items-center justify-center mb-6
                  transition-all duration-300
                  shadow-lg group-hover:shadow-2xl
                  ${item.accent === 'power-blue' ? 'bg-gradient-to-br from-power-blue to-blue-900 text-white group-hover:scale-110' : ''}
                  ${item.accent === 'power-red' ? 'bg-gradient-to-br from-power-red to-red-900 text-white group-hover:scale-110' : ''}
                  ${item.accent === 'emerald-500' ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white group-hover:scale-110' : ''}
                  ${item.accent === 'amber-500' ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white group-hover:scale-110' : ''}
                `}>
                  <Icon size={28} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-power-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Subtle gauge/dial decoration in corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img
                    src="https://pixabay.com/get/gfad6f477bdd4e6f3525ad598828113842d37fe6c7725d409cf8d7badb18654bf94409161e785ac3de2d9692b89b8265e.svg"
                    alt="Speedometer decoration"
                    className="w-full h-full"
                    style={{ filter: 'invert(1)' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA with Automotive Styling */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">150+ happy customers</span> this month
              </p>
            </div>
            <a
              href="/reviews"
              className="bg-power-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:shadow-power-red/50 hover:scale-105 flex items-center gap-2"
            >
              Experience the Difference
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom checkered accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent">
        <div
          className="h-full opacity-20"
          style={{
            backgroundImage: `url("https://pixabay.com/get/gd644de7a7289bb3b8727b028bf07e9785eddd5d24f639333fc64a3c5c36822b34c12cafba478b5099917252b4f0404b9.svg")`,
            backgroundSize: '60px 100%',
            backgroundRepeat: 'repeat-x'
          }}
        />
      </div>
    </section>
  );
};

export default WhyChoose;
