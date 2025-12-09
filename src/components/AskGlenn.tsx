'use client';

import Image from 'next/image';
import Link from 'next/link';

interface AskGlennProps {
  title?: string;
  quote: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export default function AskGlenn({
  title = 'Ask Glenn',
  quote,
  ctaText = "Read more of Glenn's advice",
  ctaHref = '/ask-glenn',
  variant = 'default',
}: AskGlennProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-4 p-5 bg-[var(--pw-blue)]/5 rounded-xl border-l-4 border-[var(--pw-red)]">
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-[var(--pw-blue)]">
          <Image
            src="/glen-2-about-pw.jpg"
            alt="Glenn - Master Technician"
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[var(--pw-blue-dark)] text-sm leading-relaxed mb-2">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="text-xs text-[var(--pw-gray-600)]">
            — Glenn, British-trained Master Technician
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <section className="py-20 lg:py-28 bg-[var(--pw-blue)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" className="text-white" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/glen-2-about-pw.jpg"
                  alt="Glenn - British-trained Master Technician at Powerworks Garage"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--pw-blue)] via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 bg-[var(--pw-red)] text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-xs uppercase tracking-wider">Years Experience</div>
              </div>
            </div>

            {/* Content Column */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--pw-red)] text-white text-sm font-semibold uppercase tracking-wider rounded-md mb-6">
                <span>Expert Advice</span>
                <span className="opacity-60">•</span>
                <span>{title}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                &ldquo;Hearing a noise?{' '}
                <span className="text-[var(--pw-red)]">Don&apos;t turn up the radio.</span>&rdquo;
              </h2>

              <blockquote className="text-lg text-white/80 leading-relaxed mb-8">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--pw-red)]">
                  <Image
                    src="/glen-2-about-pw.jpg"
                    alt="Glenn"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Glenn</p>
                  <p className="text-white/60 text-sm">British-Trained Master Technician</p>
                </div>
              </div>

              <Link
                href="https://wa.me/971521217425?text=Hi%20Glenn%2C%20I%20have%20a%20question%20about%20my%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pw-green-whatsapp)] text-white font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Glenn on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <div className="relative p-8 bg-gradient-to-br from-[var(--pw-blue)] to-[var(--pw-blue-light)] rounded-2xl text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--pw-red)]/20 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[var(--pw-red)] shadow-lg">
            <Image
              src="/glen-2-about-pw.jpg"
              alt="Glenn - Master Technician"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--pw-red)] text-white text-xs font-semibold uppercase tracking-wider rounded mb-4">
            {title}
          </div>

          <blockquote className="text-lg leading-relaxed mb-4 text-white/90">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-white/60">
              — Glenn, British-trained Master Technician at Powerworks Garage
            </p>

            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 text-[var(--pw-red-light)] hover:text-white font-semibold text-sm transition-colors"
              >
                <span>{ctaText}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
