import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import AboutOwner from '@/components/AboutOwner';
import { Award, Users, Wrench, Heart, Shield, Clock } from 'lucide-react';
import BookingButton from '@/components/BookingButton';

export const metadata: Metadata = {
  title: 'About Us | Meet Glenn Power | Powerworks Garage Dubai',
  description: 'British-owned car repair specialists in Dubai. Meet Glenn Power, our founder with 15+ years experience bringing UK workshop standards to the UAE.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
      ]} />
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner-2.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">About Powerworks</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">
              British Precision.<br />Dubai Hospitality.
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A different kind of garage—where honesty, expertise, and genuine care for your vehicle come standard.
            </p>
          </div>
        </div>
      </section>

      {/* About Owner Section (reused component) */}
      <AboutOwner />

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
              Why We Started Powerworks
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              After years of working in top UK workshops, Glenn Power moved to Dubai and quickly noticed a gap in the market. Too many garages focused on quick fixes and upselling rather than genuinely helping customers. Powerworks was born from the belief that car owners deserve better—transparent pricing, honest advice, and work you can trust.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-power-blue/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-power-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Honesty First</h3>
              <p className="text-gray-600">
                We&apos;ll never recommend work you don&apos;t need. If your car is fine, we&apos;ll tell you—even if it means we earn less.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-power-red/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-power-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">UK Standards</h3>
              <p className="text-gray-600">
                Factory-trained technicians using manufacturer-approved methods and genuine or OEM-quality parts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Care</h3>
              <p className="text-gray-600">
                Your car is treated like our own. We take pride in building long-term relationships, not one-time transactions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Diagnostics</h3>
              <p className="text-gray-600">
                Dealer-level diagnostic equipment for European and premium vehicles ensures accurate fault finding.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Touch</h3>
              <p className="text-gray-600">
                You&apos;ll speak directly with Glenn or senior technicians—no call centers, no runaround.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Respect Your Time</h3>
              <p className="text-gray-600">
                Clear timelines, proactive updates, and no-surprise billing. We know your time is valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your first service and see why customers trust us with their vehicles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton
              className="inline-flex items-center gap-2 bg-white text-power-blue px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Now
            </BookingButton>
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
