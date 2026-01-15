import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SERVICES_DATA, ServiceIconName } from '@/lib/services-data';
import {
  CarFront,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  Wrench,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Gauge,
  Settings,
  Shield,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<ServiceIconName, LucideIcon> = {
  CarFront,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  Wrench,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Gauge,
  Settings,
  Shield
};

export const metadata: Metadata = {
  title: 'Car Services Dubai | Full Service Menu | Powerworks Garage',
  description: 'Complete car service menu in Dubai. Servicing, AC repair, brakes, engine, transmission, tyres, batteries & more. British-standard repairs for all makes.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/header-services.jpg"
            alt="Powerworks Garage Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-power-blue/95 via-power-blue/80 to-power-blue/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-power-red rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">British-Standard Service in Dubai</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Complete Car Care.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                No Shortcuts.
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              From routine maintenance to complex engine rebuilds, our certified technicians treat every car like it&apos;s their own. Honest diagnostics, transparent pricing, quality parts.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-extrabold text-white">15+</span>
                <span className="text-sm text-gray-300 font-medium">Services</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-extrabold text-white">5000+</span>
                <span className="text-sm text-gray-300 font-medium">Cars Serviced</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-extrabold text-white">4.9★</span>
                <span className="text-sm text-gray-300 font-medium">Google Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <Link
                  key={service.slug}
                  href={`/car-servicing-dubai/${service.slug}`}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-power-blue/30 transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-power-blue via-power-red to-power-blue opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-power-blue/10 rounded-xl flex items-center justify-center text-power-blue mb-6 group-hover:bg-power-blue group-hover:text-white transition-all duration-300">
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-power-blue transition-colors">
                    {service.shortTitle}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-power-red font-bold">From {service.priceFrom}</span>
                    <span className="text-power-blue font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Regular Servicing Matters in Dubai */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-power-red font-semibold text-sm tracking-wider uppercase mb-3">
              Why It Matters
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Car Servicing in Dubai&apos;s Climate
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-power-blue to-power-red mx-auto"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Personal Vehicle Owners */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-power-blue via-power-blue/50 to-transparent rounded-full hidden lg:block"></div>
              <div className="lg:pl-8">
                {/* Image */}
                <div className="mb-8">
                  <img
                    src="/retail.png"
                    alt="Personal car owner with luxury vehicle"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-power-blue/10 rounded-xl flex items-center justify-center">
                    <CarFront className="text-power-blue" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Car Owners</h3>
                </div>

                <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Dubai puts vehicles through conditions most manufacturers never anticipated. Summer temperatures regularly exceed 50°C on road surfaces, accelerating oil degradation and placing extraordinary stress on cooling systems, batteries, and air conditioning components. Add fine desert sand that infiltrates air filters and brake assemblies, and you have an environment that demands more frequent attention than service schedules designed for temperate European climates.
                  </p>
                  <p>
                    The city&apos;s stop-start traffic compounds these challenges. Constant acceleration and braking in crawling Sheikh Zayed Road queues generates heat in transmissions and brake systems that highway driving would dissipate. Clutches wear faster. Brake pads thin more quickly. Automatic gearboxes run hotter than their designers intended.
                  </p>
                  <p>
                    At Powerworks, we adjust service intervals to account for these realities. We don&apos;t simply follow the handbook written for a car driven in Stuttgart or Tokyo. We inspect components that typically fail early in this region: coolant hoses that perish from UV exposure, suspension bushings that harden in the heat, and electrical connections corroded by the humidity that arrives each coastal summer.
                  </p>
                  <p>
                    Catching a worn timing belt before it snaps saves an engine. Replacing degraded coolant before it fails to protect aluminium heads prevents a repair bill that exceeds the car&apos;s value. Regular servicing isn&apos;t an expense—it&apos;s the most reliable protection for your investment.
                  </p>
                </div>
              </div>
            </div>

            {/* Fleet Managers */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-power-red via-power-red/50 to-transparent rounded-full hidden lg:block"></div>
              <div className="lg:pl-8">
                {/* Image */}
                <div className="mb-8">
                  <img
                    src="/fleet.png"
                    alt="Fleet manager with commercial vehicle"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-power-red/10 rounded-xl flex items-center justify-center">
                    <Truck className="text-power-red" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Fleet Managers</h3>
                </div>

                <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Vehicle downtime costs money. Every day a delivery van sits waiting for parts, every sales representative stranded roadside, every urgent airport transfer missed—these failures carry costs far beyond the repair invoice. Reactive maintenance is expensive maintenance.
                  </p>
                  <p>
                    Powerworks approaches fleet servicing as partners in your operational efficiency. We track each vehicle&apos;s service history, monitor wear patterns across your fleet, and schedule maintenance during periods that minimise disruption to your business. Our pickup and delivery service means your drivers stay productive while we handle the mechanical work.
                  </p>
                  <p>
                    We provide detailed reporting that helps you forecast costs and plan vehicle replacement cycles based on actual condition rather than arbitrary mileage thresholds. Some vehicles in gentle use have years of life remaining; others driven hard in construction sites need closer attention. We help you make informed decisions about where to invest and when to retire.
                  </p>
                  <p>
                    Our fleet clients receive priority scheduling and a dedicated account manager who understands your specific vehicles and operational requirements. Whether you run three executive cars or thirty delivery vans, we structure our service around your business needs.
                  </p>
                </div>

                {/* Fleet CTA */}
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                  <p className="text-gray-700 font-medium mb-4">
                    Looking for a dedicated fleet maintenance partner?
                  </p>
                  <Link
                    href="/#fleet"
                    className="inline-flex items-center gap-2 text-power-blue font-bold hover:text-power-red transition-colors"
                  >
                    Explore Fleet Services
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 bg-gradient-to-r from-power-blue to-blue-900 rounded-2xl text-white">
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold">30+</span>
              <span className="text-blue-200 text-sm">Years Experience</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold">50+</span>
              <span className="text-blue-200 text-sm">Inspection Points</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold">100%</span>
              <span className="text-blue-200 text-sm">Transparent Pricing</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-extrabold">Same Day</span>
              <span className="text-blue-200 text-sm">Service Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us and we&apos;ll help diagnose your issue and recommend the right service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+971521217425"
              className="inline-flex items-center gap-2 bg-power-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg"
            >
              Call 052 121 7425
            </a>
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
  );
}
