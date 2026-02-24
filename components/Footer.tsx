'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { BRANDS } from '@/lib/constants';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-power-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-power-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* Contact Info Column */}
            <div className="lg:col-span-2">
              <img src="/logo_dark.png" alt="Powerworks Garage" className="h-16 mb-6" />
              <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
                British-owned car repair specialists in Dubai Investment Park (DIP). We bring UK workshop standards, honest diagnostics, and genuine care to every vehicle.
              </p>

              <div className="space-y-5">
                <a href="tel:+971521217425" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-power-red group-hover:bg-power-red group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="text-lg font-semibold text-white group-hover:text-power-red transition-colors">052 121 7425</p>
                  </div>
                </a>

                <a href="https://wa.me/971521217425" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">WhatsApp</p>
                    <p className="text-lg font-semibold text-white group-hover:text-[#25D366] transition-colors">Quick Quote</p>
                  </div>
                </a>

                <a href="mailto:help@powerworksgarage.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-power-blue group-hover:bg-power-blue group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</p>
                    <p className="text-lg font-semibold text-white group-hover:text-power-blue transition-colors">help@powerworksgarage.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-amber-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Hours</p>
                    <p className="text-white font-medium">Mon - Sun: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                    <p className="text-white font-medium">Dubai Investment Park 1<br/>Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                <a href="https://www.instagram.com/powerworksgarage/?hl=en-gb" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all hover:scale-110">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/powerworksdxb/?locale=en_GB" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-all hover:scale-110">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Service</h3>
                <p className="text-gray-500 mb-6">Fill out the form and we&apos;ll get back to you within 2 hours.</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-500">We&apos;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                          placeholder="050 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="vehicle" className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Make & Model</label>
                        <input
                          type="text"
                          id="vehicle"
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                          placeholder="e.g. BMW X5 2020"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1.5">Service Required</label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
                        >
                          <option value="">Select a service</option>
                          <option value="car-service">Car Service</option>
                          <option value="ac-repair">AC Repair</option>
                          <option value="oil-change">Oil Change</option>
                          <option value="electrical">Electrical Diagnostics</option>
                          <option value="brakes">Brake Service</option>
                          <option value="suspension">Suspension</option>
                          <option value="transmission">Transmission Repair</option>
                          <option value="engine">Engine Work</option>
                          <option value="battery">Battery Replacement</option>
                          <option value="tyres">Tyre Replacement</option>
                          <option value="inspection">Pre-Purchase Inspection</option>
                          <option value="fleet">Fleet Services</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Tell Us More</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all resize-none"
                        placeholder="Describe the issue or service you need..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-power-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      Send Enquiry
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      Or call us directly at <a href="tel:+971521217425" className="text-power-blue font-semibold hover:underline">052 121 7425</a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Brands We Service Section */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Brands We Service</h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
              {BRANDS.map((brand, index) => (
                <span key={brand.slug} className="flex items-center">
                  <Link
                    href={brand.url}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {brand.name}
                  </Link>
                  {index < BRANDS.length - 1 && <span className="text-gray-700 ml-6">•</span>}
                </span>
              ))}
              <span className="flex items-center">
                <span className="text-gray-700">•</span>
                <Link
                  href="/makes"
                  className="text-sm text-power-blue hover:text-white transition-colors ml-6"
                >
                  All Brands →
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-64 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.0!2d55.1508571!3d24.9861876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f7389305297f7%3A0xe85f630215780c08!2sPowerworks%20Garage%20DIP!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
            allowFullScreen={true}
            loading="lazy"
            title="Powerworks Garage Location"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>&copy; 2026 Powerworks Garage Dubai.</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline">British Precision. Dubai Hospitality.</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
