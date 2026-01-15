import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import { Star, ExternalLink, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Reviews | 4.9★ Google Rating | Powerworks Garage Dubai',
  description: 'Read what our customers say about Powerworks Garage Dubai. 4.9-star Google rating with 150+ reviews. Real testimonials from satisfied car owners.',
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-power-red rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-4">
              4.9 Star Rating
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Based on 150+ verified Google reviews from real customers.
            </p>
            <a
              href="https://www.google.com/search?q=powerworks+garage+dubai+reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              View on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-power-blue">150+</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Google Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">4.9</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">98%</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Would Recommend</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">5000+</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Cars Serviced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (reused component) */}
      <Testimonials />

      {/* Featured Review */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-power-blue to-blue-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 italic">
                &ldquo;Finally a garage in Dubai I can trust. Glenn and the team explained everything clearly and the pricing was transparent. They found an issue the dealer had missed and saved me thousands. Felt just like my local back in the UK—highly recommended!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  JA
                </div>
                <div>
                  <div className="font-bold text-lg">James Anderson</div>
                  <div className="text-blue-200 text-sm">Range Rover Sport Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Love Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">What They Say</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Why Customers Love Powerworks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { theme: 'Honest & Transparent', quote: 'No hidden costs, no surprise charges. They tell you exactly what needs doing.' },
              { theme: 'Expert Diagnostics', quote: 'Found the real problem when other garages couldn\'t. Saved me from replacing parts I didn\'t need.' },
              { theme: 'Great Communication', quote: 'Glenn kept me updated throughout. Photos, explanations—felt involved in the process.' },
              { theme: 'Fair Pricing', quote: 'Half the price of the dealer for the same quality work. Genuine parts too.' },
              { theme: 'Convenient Service', quote: 'They picked up and dropped off my car. Made the whole thing effortless.' },
              { theme: 'British Standards', quote: 'Finally, a garage that works to the standards I\'m used to from the UK.' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-power-blue mb-3">{item.theme}</h3>
                <p className="text-gray-600 italic">&ldquo;{item.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-power-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Happy Customers
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the Powerworks difference for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-power-blue px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Your Service
            </a>
            <a
              href="https://www.google.com/search?q=powerworks+garage+dubai+reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Read All Reviews
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
