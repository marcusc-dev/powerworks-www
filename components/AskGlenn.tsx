'use client';

import React from 'react';
import { ArrowRight, MessageCircle, Clock, CheckCircle, Shield, Award, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';
import { motion } from 'framer-motion';

const AskGlenn: React.FC = () => {
  return (
    <section
      id="ask-glenn"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Hero Section with Glenn */}
      <div className="relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-0">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-end">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 pb-8 md:pb-12"
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#dc2626]" />
                <span className="text-[#dc2626] font-bold uppercase tracking-wider text-sm">Expert Advice</span>
              </div>

              {/* Heading */}
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Ask Glenn
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Driving in Dubai&apos;s extreme climate requires specialized knowledge. Get honest, no-nonsense advice from someone who truly cares about your car—and your wallet.
              </p>

              {/* Value Proposition Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">25+ Years Experience</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">Zero Upselling</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">Dubai Expert</span>
                </motion.div>
              </div>

              {/* Quick WhatsApp CTA */}
              <motion.a
                href="https://wa.me/971521217425"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Message Glenn on WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Right Column - Glenn Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 md:order-2 relative"
            >
              {/* Decorative Circle Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#1e3a8a]/10 to-[#dc2626]/10 blur-2xl"></div>
              </div>

              {/* Glenn Image */}
              <div className="relative z-10 flex justify-center items-end">
                <img
                  src="/its-glenn.jpg"
                  alt="Glenn Power - Powerworks Garage Owner"
                  className="max-w-[200px] md:max-w-[280px] h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Help and Advice from Powerworks
            </h3>
            <p className="text-[#dc2626] font-semibold text-lg mb-3">
              Expert advice from Glenn and the team
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practical advice and insights to help you make smarter decisions about your vehicle
            </p>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-[#1e3a8a] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                    {post.category}
                  </div>

                  {/* Image with Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-[5]"></div>

                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-semibold text-[#1e3a8a]">By Glenn</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1e3a8a] transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[#dc2626] font-bold text-sm hover:gap-3 transition-all group/link"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom WhatsApp Banner */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gradient Background with Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] via-[#22c55e] to-[#20bd5a]"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left - Message */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  Still Have Questions About Your Car?
                </h3>
                <p className="text-white/90 text-base md:text-lg">
                  Glenn typically responds within minutes. No question is too small.
                </p>
              </div>

              {/* Right - CTA Button */}
              <a
                href="https://wa.me/971521217425"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-white text-[#25D366] px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Start Chat</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AskGlenn;
