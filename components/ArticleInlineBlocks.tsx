'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Quote, Wrench } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { SERVICES_DATA } from '@/lib/services-data';
import { BRANDS } from '@/lib/constants';

interface ServiceLink {
  serviceSlug: string;
  brandSlug?: string;
}

interface InlineServiceLinksProps {
  title: string;
  description: string;
  services: ServiceLink[];
}

/**
 * Inline block showing relevant service + brand pages
 * Displays as a clean, styled card within article content
 */
export function InlineServiceLinks({ title, description, services }: InlineServiceLinksProps) {
  // Build the full service links with titles
  const serviceLinks = services.map(({ serviceSlug, brandSlug }) => {
    const service = SERVICES_DATA.find(s => s.slug === serviceSlug);
    const brand = brandSlug ? BRANDS.find(b => b.slug === brandSlug) : null;

    if (!service) return null;

    const url = brandSlug
      ? `/car-servicing-dubai/${serviceSlug}/${brandSlug}`
      : `/car-servicing-dubai/${serviceSlug}`;

    const displayTitle = brand
      ? `${brand.name} ${service.shortTitle}`
      : service.shortTitle;

    const priceText = service.priceFrom !== 'Custom Quote'
      ? `From ${service.priceFrom}`
      : 'Get Quote';

    return {
      url,
      title: displayTitle,
      price: priceText,
      brandLogo: brand?.logo,
      serviceIcon: service.serviceImage,
    };
  }).filter(Boolean);

  if (serviceLinks.length === 0) return null;

  return (
    <div className="my-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white/50">
        <div className="flex items-center gap-2 mb-1">
          <Wrench className="w-4 h-4 text-power-blue" />
          <span className="text-xs font-semibold uppercase tracking-wider text-power-blue">
            Related Services
          </span>
        </div>
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* Service Links Grid */}
      <div className="p-4">
        <div className="grid gap-2">
          {serviceLinks.map((link, index) => (
            <Link
              key={index}
              href={link!.url}
              className="group flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-100 hover:border-power-blue/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Show brand logo for brand-specific services, or service icon for generic */}
                {link!.brandLogo && (
                  <img
                    src={link!.brandLogo}
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain flex-shrink-0"
                  />
                )}
                {!link!.brandLogo && link!.serviceIcon && (
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-gray-50 rounded-lg">
                    <img
                      src={link!.serviceIcon}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="font-medium text-gray-900 group-hover:text-power-blue transition-colors">
                  {link!.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{link!.price}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-power-blue group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

interface InlineCustomerReviewProps {
  review: Testimonial;
  context?: string; // Optional context like "about their AC repair"
}

/**
 * Single inline customer review
 * Styled as a quote block within article content
 */
export function InlineCustomerReview({ review, context }: InlineCustomerReviewProps) {
  return (
    <div className="my-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Quote accent bar */}
      <div className="h-1 bg-gradient-to-r from-power-blue to-power-red"></div>

      <div className="p-5">
        {/* Header with quote icon */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-power-blue/5 rounded-full flex items-center justify-center">
            <Quote className="w-5 h-5 text-power-blue" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Review text */}
            <blockquote className="text-gray-700 leading-relaxed text-[15px] italic">
              "{review.text}"
            </blockquote>

            {/* Attribution */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                {context && (
                  <p className="text-xs text-gray-500 mt-0.5">{context}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{review.source === 'google' ? 'Google Review' : review.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InlineReviewsBlockProps {
  reviews: Testimonial[];
  title: string;
  subtitle?: string;
}

/**
 * Multiple reviews in a compact block
 * For showing 2-3 related reviews together
 */
export function InlineReviewsBlock({ reviews, title, subtitle }: InlineReviewsBlockProps) {
  if (reviews.length === 0) return null;

  return (
    <div className="my-8 bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-amber-100/50 bg-white/30">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-0.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Customer Stories
          </span>
        </div>
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Reviews */}
      <div className="p-4 space-y-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-amber-100/50"
          >
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              "{review.text}"
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="font-medium text-gray-900 text-sm">{review.name}</p>
              {review.carMakes && review.carMakes.length > 0 && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {review.carMakes[0]} owner
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="px-5 py-3 bg-white/50 border-t border-amber-100/50">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
        >
          Read more customer reviews
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
