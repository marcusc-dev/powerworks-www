import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { VEHICLE_MAKES, getMakesByTier } from '@/lib/vehicle-makes-data';

export const metadata: Metadata = {
  title: 'Car Brands We Service | All Makes Welcome | Powerworks Garage Dubai',
  description: 'Expert service for all car brands in Dubai. BMW, Mercedes, Audi, Porsche, Land Rover, Toyota & more. Specialist knowledge, dealer-level diagnostics.',
  alternates: {
    canonical: '/makes',
  },
};

export default function MakesPage() {
  const luxuryMakes = getMakesByTier('luxury');
  const premiumMakes = getMakesByTier('premium');
  const mainstreamMakes = getMakesByTier('mainstream');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 relative bg-gray-900"
        style={{
          backgroundImage: 'url(/makes-header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">All Makes Welcome</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">
              Brands We Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From luxury European marques to reliable Japanese workhorses, our technicians have the expertise and equipment for your vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Any Make. Any Model. Any Year.
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Powerworks, we believe great service shouldn&apos;t be limited by badge or brand. Our team of experienced technicians are equipped with the latest diagnostic tools and genuine expertise to work on virtually any vehicle that comes through our doors—whether it&apos;s a classic European sports car, a robust American pickup, a reliable Japanese saloon, or the latest Korean SUV.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From routine maintenance to complex repairs, we&apos;ve got the skills, equipment, and parts network to keep your car running at its best. No need to visit multiple specialists—Powerworks is your one-stop garage for all makes and models.
          </p>
        </div>
      </section>

      {/* Luxury Makes */}
      {luxuryMakes.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🏆</span>
              <h2 className="text-2xl font-bold text-gray-900">Luxury Brands</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {luxuryMakes.map((make) => (
                <Link
                  key={make.slug}
                  href={`/makes/${make.slug}`}
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-xl hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {make.logo ? (
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img
                          src={make.logo}
                          alt={make.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-power-blue rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                        {make.shortName.substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-power-blue transition-colors">
                        {make.name}
                      </h3>
                      <p className="text-sm text-gray-500">{make.country}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {make.popularModels.slice(0, 4).map((model) => (
                      <span key={model} className="bg-white text-gray-600 px-2 py-1 rounded text-xs">
                        {model}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">View services</span>
                    <span className="text-power-blue font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Makes */}
      {premiumMakes.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">⭐</span>
              <h2 className="text-2xl font-bold text-gray-900">Premium Brands</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumMakes.map((make) => (
                <Link
                  key={make.slug}
                  href={`/makes/${make.slug}`}
                  className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {make.logo ? (
                      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                        <img
                          src={make.logo}
                          alt={make.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-power-blue rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                        {make.shortName.substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-power-blue transition-colors">
                        {make.name}
                      </h3>
                      <p className="text-sm text-gray-500">{make.country}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {make.popularModels.slice(0, 4).map((model) => (
                      <span key={model} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                        {model}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">View services</span>
                    <span className="text-power-blue font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mainstream Makes */}
      {mainstreamMakes.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">✓</span>
              <h2 className="text-2xl font-bold text-gray-900">Mainstream Brands</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainstreamMakes.map((make) => (
                <Link
                  key={make.slug}
                  href={`/makes/${make.slug}`}
                  className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {make.logo ? (
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 group-hover:shadow-md transition-all duration-300">
                        <img
                          src={make.logo}
                          alt={make.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-power-blue rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                        {make.shortName.substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-power-blue transition-colors">
                        {make.name}
                      </h3>
                      <p className="text-sm text-gray-500">{make.country}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {make.popularModels.slice(0, 4).map((model) => (
                      <span key={model} className="bg-white text-gray-600 px-2 py-1 rounded text-xs">
                        {model}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">View services</span>
                    <span className="text-power-blue font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Makes CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Don&apos;t See Your Brand?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We service all makes and models. Contact us to discuss your vehicle&apos;s needs.
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
