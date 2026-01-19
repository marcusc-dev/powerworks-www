import { Suspense } from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

// Wrapper component to handle Suspense for useSearchParams
function ContactFormWrapper() {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactForm />
    </Suspense>
  );
}

// Loading skeleton for the contact form
function ContactFormSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
        <div className="h-12 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-28 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-14 bg-gray-200 rounded-xl" />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Contact Us | Book Your Service | Powerworks Garage Dubai',
  description: 'Contact Powerworks Garage in Al Quoz, Dubai. Book your car service, get a quote, or ask a question. Call 052 121 7425 or WhatsApp us.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/contact-header.jpg')" }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">
              Contact Powerworks
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book your service, get a quote, or just ask a question. We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Reach out via phone, WhatsApp, or email. We typically respond within 2 hours during business hours.
              </p>

              {/* Rose - Team Member Card (Featured) */}
              <div className="mb-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src="/rose.jpg"
                      alt="Rose - Customer Service at Powerworks Garage"
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xl font-bold text-gray-900">Rose</p>
                    <p className="text-power-blue font-medium">Customer Service & Parts</p>
                    <p className="text-sm text-emerald-600 font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      Usually responds in minutes
                    </p>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                      &ldquo;Send us your enquiry and I&apos;ll make sure you get a quick, helpful response. You can also hit the Ask Glenn button and we&apos;ll chat to you right now to see how best to assist. Looking forward to hearing from you!&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <a href="tel:+971521217425" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-power-red group-hover:bg-power-red group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="text-xl font-bold text-gray-900 group-hover:text-power-red transition-colors">052 121 7425</p>
                  </div>
                </a>

                <a href="https://wa.me/971521217425" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">WhatsApp</p>
                    <p className="text-xl font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">Quick Response</p>
                  </div>
                </a>

                <a href="mailto:help@powerworksgarage.com" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-power-blue group-hover:bg-power-blue group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</p>
                    <p className="text-lg font-bold text-gray-900 group-hover:text-power-blue transition-colors">help@powerworksgarage.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-amber-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Opening Hours</p>
                    <p className="text-gray-900 font-medium">Mon - Sun: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                    <p className="text-gray-900 font-medium">Al Quoz Industrial Area 3<br/>Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                <a href="https://www.instagram.com/powerworksgarage/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/powerworksdxb/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Service</h2>
              <p className="text-gray-500 mb-8">Fill out the form and we&apos;ll get back to you within 2 hours.</p>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                <ContactFormWrapper />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.8687702868843!2d55.2274!3d25.1065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f696655555555%3A0x5555555555555555!2sAl%20Quoz!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          title="Powerworks Garage Location"
        ></iframe>
        <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-xl">
          <p className="font-bold text-gray-900">Powerworks Garage</p>
          <p className="text-sm text-gray-500">Al Quoz Industrial Area 3, Dubai</p>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Powerworks Garage Dubai. British Precision. Dubai Hospitality.</p>
        </div>
      </footer>
    </div>
  );
}
