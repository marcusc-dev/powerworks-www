'use client';

import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Tips for Tyre Maintenance in Dubai',
    date: 'June 5, 2023',
    category: 'Power Blog',
    image: '/blog-tyre-maintenance.jpg',
    slug: '/blog/tyre-maintenance-dubai',
  },
  {
    title: 'Car AC and Brake Fluid Service in Dubai - A very special Summer Offer',
    date: 'August 21, 2022',
    category: 'Power Blog',
    image: '/ac-service-dubai.jpg',
    slug: '/blog/ac-brake-fluid-service',
  },
  {
    title: 'Reliable VW Car Service in Dubai',
    date: 'May 17, 2022',
    category: 'Power Blog',
    image: '/general-service-dubai.jpg',
    slug: '/blog/vw-car-service-dubai',
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--pw-off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--pw-blue-dark)] flex items-center gap-4">
            From The Power Blog
            <span className="hidden sm:inline-block w-16 h-0.5 bg-[var(--pw-red)]"></span>
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--pw-red)] font-semibold hover:gap-3 transition-all"
          >
            <span>VIEW MORE</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href={post.slug}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[var(--pw-blue-dark)] text-white px-3 py-1 text-xs font-semibold rounded">
                  {post.date} | {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-[var(--pw-blue-dark)] text-lg mb-4 group-hover:text-[var(--pw-red)] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Read More */}
                <div className="flex items-center gap-2 text-[var(--pw-red)] font-semibold text-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--pw-red)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
