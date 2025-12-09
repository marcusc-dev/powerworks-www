'use client';

const reviews = [
  {
    name: 'James Mitchell',
    rating: 5,
    text: "Absolutely brilliant service! Glenn and the team diagnosed an issue that two other garages couldn't find. Honest pricing and they kept me updated throughout. Won't go anywhere else now.",
    date: '2 weeks ago',
    vehicle: 'Range Rover Sport',
  },
  {
    name: 'Sarah Al-Mahmoud',
    rating: 5,
    text: "Finally found a trustworthy garage in Dubai. They don't try to upsell unnecessary work. My BMW has never run better. The WhatsApp updates with photos were a nice touch.",
    date: '1 month ago',
    vehicle: 'BMW X5',
  },
  {
    name: 'Michael Thompson',
    rating: 5,
    text: "As a fleet manager, reliability is everything. Powerworks handles all our company vehicles and the turnaround time is exceptional. Professional, honest, and great value.",
    date: '3 weeks ago',
    vehicle: 'Fleet Manager - We Will Fix It',
  },
  {
    name: 'Ahmed Hassan',
    rating: 5,
    text: "Brought my Porsche in for service and was impressed by their knowledge and attention to detail. They use genuine parts and the workshop is spotlessly clean. Highly recommend!",
    date: '1 month ago',
    vehicle: 'Porsche Cayenne',
  },
  {
    name: 'Emma Richards',
    rating: 5,
    text: "So refreshing to find British standards of service here in Dubai. No hidden charges, clear communication, and they actually fix the problem first time. Thank you Glenn!",
    date: '2 months ago',
    vehicle: 'Audi Q7',
  },
  {
    name: 'David Wong',
    rating: 5,
    text: "My car was overheating and I was worried about a big bill. Glenn diagnosed it quickly, explained everything clearly, and the repair cost was very fair. Excellent experience.",
    date: '1 month ago',
    vehicle: 'Mercedes E-Class',
  },
];

const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place//data=!4m3!3m2!1s0x3e5f6921b362aa0d:0x8bc322a165f1d7a5!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="inline-block text-[var(--pw-red)] font-semibold text-sm uppercase tracking-wider mb-4">
              Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pw-blue-dark)] mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[var(--pw-gold)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[var(--pw-blue-dark)] font-semibold">5.0</span>
              <span className="text-[var(--pw-gray-600)]">on Google Reviews</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--pw-red)] text-white font-semibold rounded-lg hover:bg-[var(--pw-red-hover)] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Read More Reviews
            </a>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[var(--pw-blue-dark)] text-[var(--pw-blue-dark)] font-semibold rounded-lg hover:bg-[var(--pw-blue-dark)] hover:text-white transition-all"
            >
              Leave a Review
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group relative p-6 bg-[var(--pw-off-white)] rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Mark */}
              <div className="absolute top-4 right-4 text-[var(--pw-red)]/20 text-6xl font-serif leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--pw-gold)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[var(--pw-blue-dark)] mb-6 leading-relaxed relative z-10">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--pw-blue)] flex items-center justify-center text-white font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[var(--pw-blue-dark)]">{review.name}</p>
                  <p className="text-sm text-[var(--pw-gray-600)]">{review.vehicle} • {review.date}</p>
                </div>
              </div>

              {/* Google Badge */}
              <div className="absolute bottom-4 right-4">
                <svg className="w-6 h-6 text-[var(--pw-gray-400)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
