import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { FLEET_FEATURES } from '@/lib/constants';
import { Truck, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fleet Services Dubai | Corporate Vehicle Maintenance | Powerworks Garage',
  description: 'Specialized fleet maintenance programs in Dubai. Free pickup & dropoff, priority service, and 100% uptime focus for corporate vehicle fleets.',
  alternates: {
    canonical: '/fleet-service-dubai',
  },
};

export default function FleetPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Fleet Services', url: '/fleet-service-dubai' },
      ]} />
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner-1.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Corporate Partners</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">
              Fleet Services Dubai
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Keep your business moving with specialized fleet maintenance programs designed for 100% uptime and operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="/fleet.png"
                alt="Fleet Maintenance Service Dubai - We Will Fix It Partnership"
                className="w-full h-auto -mt-8"
              />
              {/* WeWillFixIt Testimonial */}
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl text-power-blue/20">&ldquo;</div>
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Glenn and his team at Powerworks have been instrumental to our fleet operations. Their attention to detail, fast turnaround, and honest communication make them an invaluable partner. We trust them with our entire vehicle fleet.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-power-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                        WF
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">We Will Fix It</p>
                        <p className="text-sm text-gray-500">Property Maintenance Partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                Why Choose Powerworks for Your Fleet?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We understand that every minute your vehicle is off the road costs you money. Our fleet programs are designed to minimize downtime and maximize the lifespan of your assets.
              </p>

              <div className="space-y-6">
                {FLEET_FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-power-blue/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-power-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Fleet Benefits</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              What&apos;s Included
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Dedicated account manager',
              'Priority booking & fast-track service',
              'Free vehicle pickup & delivery',
              'Preventative maintenance scheduling',
              'Detailed service reports',
              'Competitive fleet pricing',
              'Emergency breakdown support',
              '24/7 WhatsApp communication',
              'Monthly billing options',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Fleet Solutions for Every Business
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Property Management', icon: '🏢' },
              { name: 'Delivery & Logistics', icon: '📦' },
              { name: 'Construction', icon: '🏗️' },
              { name: 'Hospitality', icon: '🏨' },
              { name: 'Healthcare', icon: '🏥' },
              { name: 'Transportation', icon: '🚐' },
              { name: 'Retail', icon: '🛒' },
              { name: 'Corporate Executive', icon: '💼' },
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Let&apos;s Discuss Your Fleet Needs
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us for a customized fleet maintenance proposal tailored to your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+971521217425"
              className="inline-flex items-center gap-2 bg-white text-power-blue px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call 052 121 7425
            </a>
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
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
