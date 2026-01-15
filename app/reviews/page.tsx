import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedReviewsSlider from '@/components/FeaturedReviewsSlider';
import { Star, ExternalLink, Car, Wrench } from 'lucide-react';
import { ALL_REVIEWS, REVIEW_STATS, CAR_MAKE_CATEGORIES, SERVICE_REVIEW_CATEGORIES, getReviewsByCarMake, getReviewsByService } from '@/lib/reviews-data';

export const metadata: Metadata = {
  title: `Customer Reviews | ${REVIEW_STATS.averageRating}★ Google Rating | Powerworks Garage Dubai`,
  description: `Read what our customers say about Powerworks Garage Dubai. ${REVIEW_STATS.averageRating}-star Google rating with ${REVIEW_STATS.totalReviews}+ reviews. Real testimonials from satisfied car owners.`,
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Custom Background */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/banner-1920-1.jpg"
            alt="Powerworks Garage technician performing diagnostics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
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
              {REVIEW_STATS.averageRating} Star Rating
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Based on {REVIEW_STATS.totalReviews}+ verified Google reviews from real customers.
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
              <div className="text-4xl font-extrabold text-power-blue">{REVIEW_STATS.totalReviews}+</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Google Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">{REVIEW_STATS.averageRating}</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">{REVIEW_STATS.fiveStarPercentage}%</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">5-Star Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-power-blue">5000+</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-wide mt-1">Cars Serviced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Slider */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedReviewsSlider />
        </div>
      </section>

      {/* All Reviews Grid */}
      <section className="py-20 bg-power-dark text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-power-red font-bold uppercase tracking-wider text-sm">Real Reviews</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-2 text-white">What Our Customers Say</h2>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-white">{REVIEW_STATS.averageRating}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-gray-400 text-sm">Based on {REVIEW_STATS.totalReviews}+ Google Reviews</p>
            </div>
          </div>

          {/* Car Makes Filter Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Car size={16} /> Reviews by Car Make
            </h3>
            <div className="flex flex-wrap gap-2">
              {CAR_MAKE_CATEGORIES.filter(make => getReviewsByCarMake(make).length > 0).map((make) => (
                <span
                  key={make}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-power-red transition-colors cursor-default"
                >
                  {make} ({getReviewsByCarMake(make).length})
                </span>
              ))}
            </div>
          </div>

          {/* Service Filter Tags */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Wrench size={16} /> Reviews by Service
            </h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_REVIEW_CATEGORIES.map((category) => {
                const count = getReviewsByService(category.slug).length;
                if (count === 0) return null;
                return (
                  <span
                    key={category.slug}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-power-red transition-colors cursor-default"
                  >
                    {category.label} ({count})
                  </span>
                );
              })}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_REVIEWS.slice(0, 30).map((review, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors flex flex-col"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4 leading-relaxed text-sm flex-grow line-clamp-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Tags */}
                {(review.carMakes || review.services) && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {review.carMakes?.map((make, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded text-xs">
                        {make}
                      </span>
                    ))}
                    {review.services?.slice(0, 2).map((service, i) => (
                      <span key={i} className="px-2 py-0.5 bg-power-red/20 text-red-300 rounded text-xs">
                        {service.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-auto border-t border-gray-700 pt-3">
                  <span className="font-bold text-white text-sm">{review.name}</span>
                  <span className="text-xs text-gray-500">{review.source === 'google' ? '✓ Google' : review.source}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More / View All */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Showing 30 of {ALL_REVIEWS.length} reviews</p>
            <a
              href="https://g.page/r/CaXX8WWhIsOLEAE/review"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-white border-b border-power-red pb-1 hover:text-power-red transition-colors"
            >
              Read all {REVIEW_STATS.totalReviews}+ reviews on Google &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Why Customers Love Us - Real Quotes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Common Themes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Why Customers Love Powerworks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { theme: 'Honest & Transparent', quote: 'No hidden costs, no surprise charges. They tell you exactly what needs doing.', source: 'Steven D.' },
              { theme: 'Expert Diagnostics', quote: 'Found the real problem when other garages couldn\'t. Saved me from replacing parts I didn\'t need.', source: 'Henry S.' },
              { theme: 'Great Communication', quote: 'Glenn kept me updated throughout. Photos, explanations—felt involved in the process.', source: 'Gus N.' },
              { theme: 'Fair Pricing', quote: 'Half the price of the dealer for the same quality work. Genuine parts too.', source: 'Tina H.' },
              { theme: 'Convenient Service', quote: 'They picked up and dropped off my car. Made the whole thing effortless.', source: 'Oliver P.' },
              { theme: 'British Standards', quote: 'Finally, a garage that works to the standards I\'m used to from the UK.', source: 'James A.' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-power-blue mb-3">{item.theme}</h3>
                <p className="text-gray-600 italic">&ldquo;{item.quote}&rdquo;</p>
                <p className="text-gray-400 text-sm mt-2">— {item.source}</p>
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
              href="https://g.page/r/CaXX8WWhIsOLEAE/review"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Read All {REVIEW_STATS.totalReviews}+ Reviews
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
