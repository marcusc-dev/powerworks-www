import { Testimonial } from './types';
import { ALL_REVIEWS } from './reviews-data';

/**
 * Configuration for enriching articles with relevant service links and customer reviews
 * Each article maps to specific services and review filter criteria
 */

export interface ArticleServiceLink {
  serviceSlug: string;
  brandSlug?: string;
}

export interface ArticleEnrichmentConfig {
  /** Related services section config */
  services?: {
    title: string;
    description: string;
    links: ArticleServiceLink[];
  };
  /** Review filter criteria */
  reviewCriteria?: {
    services?: string[];      // Service tags to match
    carMakes?: string[];      // Car makes to match
    keywords?: string[];      // Keywords to search in review text
  };
  /** Custom review context for this article */
  reviewContext?: string;
}

/**
 * Maps article slugs to their enrichment configuration
 */
export const ARTICLE_ENRICHMENT: Record<string, ArticleEnrichmentConfig> = {
  'why-dubai-summers-kill-car-batteries': {
    services: {
      title: 'Battery Services in Dubai',
      description: 'Professional battery testing, replacement, and electrical diagnostics.',
      links: [
        { serviceSlug: 'battery-replacement-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'battery-replacement-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'battery-replacement-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'battery-replacement-dubai', brandSlug: 'land-rover' },
      ],
    },
    reviewCriteria: {
      services: ['battery', 'electrical', 'diagnostics', 'breakdown-recovery'],
      keywords: ['battery', 'electrical', 'stranded', 'breakdown'],
    },
    reviewContext: 'about their electrical system service',
  },

  'ac-blowing-warm-not-always-gas': {
    services: {
      title: 'AC Repair Services',
      description: 'Expert AC diagnostics and repair for all vehicle makes.',
      links: [
        { serviceSlug: 'ac-repair-dubai' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'land-rover' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'porsche' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['ac', 'ac-service', 'ac-repair'],
      keywords: ['AC', 'air conditioning', 'cooling', 'cool', 'cold air'],
    },
    reviewContext: 'about their AC repair',
  },

  'truth-about-lifetime-transmission-fluid': {
    services: {
      title: 'Transmission Services',
      description: 'Expert gearbox maintenance and fluid services for all vehicles.',
      links: [
        { serviceSlug: 'transmission-repair-dubai' },
        { serviceSlug: 'transmission-repair-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'transmission-repair-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'transmission-repair-dubai', brandSlug: 'land-rover' },
        { serviceSlug: 'car-service-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['transmission', 'gearbox', 'car-service'],
      carMakes: ['BMW', 'Mercedes', 'Range Rover'],
      keywords: ['transmission', 'gearbox', 'shift', 'automatic'],
    },
    reviewContext: 'about their transmission service',
  },

  'should-you-buy-used-european-car-dubai': {
    services: {
      title: 'Pre-Purchase & Inspection Services',
      description: 'Make informed buying decisions with our thorough inspections.',
      links: [
        { serviceSlug: 'pre-purchase-inspection-dubai' },
        { serviceSlug: 'car-inspection-dubai' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'porsche' },
      ],
    },
    reviewCriteria: {
      services: ['pre-purchase-inspection', 'inspection', 'diagnostics'],
      carMakes: ['BMW', 'Mercedes', 'Porsche', 'Range Rover', 'Audi'],
      keywords: ['inspection', 'pre-purchase', 'buying', 'European', 'German'],
    },
    reviewContext: 'about their pre-purchase inspection',
  },

  '10000km-service-myth': {
    services: {
      title: 'Car Servicing in Dubai',
      description: 'Comprehensive servicing tailored for Dubai driving conditions.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'oil-change-dubai' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'audi' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'general-service', 'oil', 'annual-service'],
      keywords: ['service', 'oil change', 'maintenance', 'regular'],
    },
    reviewContext: 'about their car servicing experience',
  },

  'warning-signs-cooling-system-failing': {
    services: {
      title: 'Engine & Cooling System Services',
      description: 'Protect your engine from Dubai heat with proper cooling system care.',
      links: [
        { serviceSlug: 'engine-repair-dubai' },
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'engine-repair-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'engine-repair-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'engine-repair-dubai', brandSlug: 'land-rover' },
      ],
    },
    reviewCriteria: {
      services: ['engine', 'engine-repair', 'car-service', 'diagnostics'],
      keywords: ['engine', 'overheating', 'coolant', 'cooling', 'temperature'],
    },
    reviewContext: 'about their engine service',
  },
};

/**
 * Get relevant reviews for an article based on its enrichment criteria
 */
export function getArticleReviews(articleSlug: string, maxReviews: number = 3): Testimonial[] {
  const config = ARTICLE_ENRICHMENT[articleSlug];
  if (!config?.reviewCriteria) return [];

  const { services, carMakes, keywords } = config.reviewCriteria;
  const matchedReviews: Array<{ review: Testimonial; score: number }> = [];

  ALL_REVIEWS.forEach(review => {
    let score = 0;

    // Match by service tags
    if (services && review.services) {
      const serviceMatches = review.services.filter(s =>
        services.some(tag => s.toLowerCase().includes(tag.toLowerCase()))
      ).length;
      score += serviceMatches * 3; // Service match is weighted higher
    }

    // Match by car make
    if (carMakes && review.carMakes) {
      const makeMatches = review.carMakes.filter(m =>
        carMakes.some(make => m.toLowerCase().includes(make.toLowerCase()))
      ).length;
      score += makeMatches * 2;
    }

    // Match by keywords in review text
    if (keywords) {
      const textLower = review.text.toLowerCase();
      const keywordMatches = keywords.filter(kw =>
        textLower.includes(kw.toLowerCase())
      ).length;
      score += keywordMatches;
    }

    // Only include reviews with some relevance
    if (score > 0) {
      matchedReviews.push({ review, score });
    }
  });

  // Sort by relevance score and return top matches
  return matchedReviews
    .sort((a, b) => b.score - a.score)
    .slice(0, maxReviews)
    .map(m => m.review);
}

/**
 * Get the enrichment config for an article
 */
export function getArticleEnrichment(articleSlug: string): ArticleEnrichmentConfig | undefined {
  return ARTICLE_ENRICHMENT[articleSlug];
}
