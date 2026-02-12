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

  // === NEW POSTS (Top 20 by search volume) ===

  'car-service-cost-dubai-2026': {
    services: {
      title: 'Car Servicing in Dubai',
      description: 'Transparent pricing with no hidden costs.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'oil-change-dubai' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'toyota' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'general-service', 'oil', 'annual-service'],
      keywords: ['service', 'price', 'value', 'honest', 'fair'],
    },
    reviewContext: 'about their service experience',
  },

  'car-battery-replacement-cost-dubai': {
    services: {
      title: 'Battery Services',
      description: 'Quality batteries for Dubai heat with proper coding.',
      links: [
        { serviceSlug: 'battery-replacement-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'battery-replacement-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'battery-replacement-dubai', brandSlug: 'mercedes' },
      ],
    },
    reviewCriteria: {
      services: ['battery', 'electrical'],
      keywords: ['battery', 'start', 'electrical'],
    },
    reviewContext: 'about their battery replacement',
  },

  'check-car-accident-history-uae': {
    services: {
      title: 'Pre-Purchase Inspection',
      description: 'Don\'t buy blind. Get a full mechanical inspection.',
      links: [
        { serviceSlug: 'pre-purchase-inspection-dubai' },
        { serviceSlug: 'car-inspection-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['pre-purchase-inspection', 'inspection', 'diagnostics'],
      keywords: ['inspection', 'buying', 'purchase', 'check'],
    },
    reviewContext: 'about their inspection service',
  },

  'car-repair-cost-dubai-average': {
    services: {
      title: 'Repair Services',
      description: 'Honest pricing on all repairs. No surprises.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'engine-repair-dubai' },
        { serviceSlug: 'brake-service-dubai' },
        { serviceSlug: 'ac-repair-dubai' },
        { serviceSlug: 'suspension-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'engine', 'brake', 'ac', 'suspension'],
      keywords: ['repair', 'price', 'cost', 'honest', 'fair', 'value'],
    },
    reviewContext: 'about their repair experience',
  },

  'tyres-cost-dubai-price-guide': {
    services: {
      title: 'Tyre Services',
      description: 'Quality tyres fitted and balanced at fair prices.',
      links: [
        { serviceSlug: 'tyre-replacement-dubai' },
        { serviceSlug: 'tyre-replacement-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'tyre-replacement-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'tyre-replacement-dubai', brandSlug: 'porsche' },
      ],
    },
    reviewCriteria: {
      services: ['tyre', 'wheel', 'alignment'],
      keywords: ['tyre', 'tire', 'wheel', 'alignment'],
    },
    reviewContext: 'about their tyre service',
  },

  'how-to-jump-start-car': {
    services: {
      title: 'Battery & Recovery Services',
      description: 'Dead battery? We can help.',
      links: [
        { serviceSlug: 'battery-replacement-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'car-recovery-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['battery', 'breakdown-recovery', 'electrical'],
      keywords: ['battery', 'stranded', 'breakdown', 'start'],
    },
    reviewContext: 'about their breakdown support',
  },

  'car-ac-repair-cost-dubai-guide': {
    services: {
      title: 'AC Repair Services',
      description: 'Proper AC diagnostics—not just a regas.',
      links: [
        { serviceSlug: 'ac-repair-dubai' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'ac-repair-dubai', brandSlug: 'land-rover' },
      ],
    },
    reviewCriteria: {
      services: ['ac', 'ac-service', 'ac-repair'],
      keywords: ['AC', 'air conditioning', 'cooling', 'cold'],
    },
    reviewContext: 'about their AC repair',
  },

  'complete-car-service-checklist': {
    services: {
      title: 'Full Service Packages',
      description: 'Every item on the checklist, done properly.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'oil-change-dubai' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'mercedes' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'general-service', 'annual-service'],
      keywords: ['service', 'thorough', 'detailed', 'comprehensive'],
    },
    reviewContext: 'about the thoroughness of their service',
  },

  'car-valuation-uae-guide': {
    services: {
      title: 'Inspection Services',
      description: 'Know your car\'s true condition before selling.',
      links: [
        { serviceSlug: 'pre-purchase-inspection-dubai' },
        { serviceSlug: 'car-inspection-dubai' },
        { serviceSlug: 'car-service-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['inspection', 'diagnostics', 'pre-purchase-inspection'],
      keywords: ['inspection', 'condition', 'value', 'selling'],
    },
    reviewContext: 'about their vehicle inspection',
  },

  'car-maintenance-schedule-mileage': {
    services: {
      title: 'Scheduled Maintenance',
      description: 'Stay on track with the right service intervals.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'oil-change-dubai' },
        { serviceSlug: 'brake-service-dubai' },
        { serviceSlug: 'transmission-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'oil', 'brake', 'transmission'],
      keywords: ['service', 'maintenance', 'regular', 'schedule'],
    },
    reviewContext: 'about their scheduled maintenance',
  },

  'abs-warning-light-meaning': {
    services: {
      title: 'Brake & Diagnostic Services',
      description: 'Warning light on? We\'ll find the cause.',
      links: [
        { serviceSlug: 'brake-service-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'brake-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'brake-service-dubai', brandSlug: 'mercedes' },
      ],
    },
    reviewCriteria: {
      services: ['brake', 'diagnostics', 'electrical'],
      keywords: ['brake', 'ABS', 'warning', 'light', 'diagnostic'],
    },
    reviewContext: 'about their brake service',
  },

  'car-breakdown-dubai-what-to-do': {
    services: {
      title: 'Recovery & Emergency Services',
      description: 'Broken down? We offer car recovery across Dubai.',
      links: [
        { serviceSlug: 'car-recovery-dubai' },
        { serviceSlug: 'battery-replacement-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['breakdown-recovery', 'battery', 'electrical'],
      keywords: ['breakdown', 'recovery', 'stranded', 'emergency'],
    },
    reviewContext: 'about their recovery service',
  },

  'car-recovery-dubai-cost': {
    services: {
      title: 'Car Recovery Service',
      description: 'Fast, reliable recovery anywhere in Dubai.',
      links: [
        { serviceSlug: 'car-recovery-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'engine-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['breakdown-recovery', 'battery'],
      keywords: ['recovery', 'tow', 'breakdown', 'stranded'],
    },
    reviewContext: 'about their recovery service',
  },

  'check-engine-light-causes': {
    services: {
      title: 'Diagnostic Services',
      description: 'We read and interpret diagnostic codes accurately.',
      links: [
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'engine-repair-dubai' },
        { serviceSlug: 'car-service-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['diagnostics', 'engine', 'electrical'],
      keywords: ['check engine', 'warning', 'diagnostic', 'light'],
    },
    reviewContext: 'about their diagnostic expertise',
  },

  'dashboard-warning-lights-meaning': {
    services: {
      title: 'Diagnostics & Repair',
      description: 'We diagnose every warning light accurately.',
      links: [
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'engine-repair-dubai' },
        { serviceSlug: 'brake-service-dubai' },
        { serviceSlug: 'battery-replacement-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['diagnostics', 'electrical', 'engine', 'brake'],
      keywords: ['warning', 'light', 'diagnostic', 'check'],
    },
    reviewContext: 'about their diagnostic service',
  },

  'wheel-alignment-matters-dubai': {
    services: {
      title: 'Tyre & Alignment Services',
      description: 'Precision alignment for Dubai\'s demanding roads.',
      links: [
        { serviceSlug: 'tyre-replacement-dubai' },
        { serviceSlug: 'suspension-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['tyre', 'wheel', 'alignment', 'suspension'],
      keywords: ['alignment', 'tyre', 'wheel', 'pulling'],
    },
    reviewContext: 'about their alignment service',
  },

  'dealer-vs-independent-garage-dubai': {
    services: {
      title: 'Independent Car Servicing',
      description: 'Dealer quality at honest prices.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'bmw' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'mercedes' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'porsche' },
        { serviceSlug: 'car-service-dubai', brandSlug: 'land-rover' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'general-service'],
      keywords: ['dealer', 'independent', 'honest', 'value', 'trust'],
    },
    reviewContext: 'about choosing Powerworks over the dealer',
  },

  'chinese-cars-uae-reliability': {
    services: {
      title: 'Multi-Brand Service',
      description: 'We service all makes—including Chinese brands.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'electrical-diagnostics-dubai' },
        { serviceSlug: 'pre-purchase-inspection-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'diagnostics', 'inspection'],
      keywords: ['service', 'reliable', 'honest'],
    },
    reviewContext: 'about their multi-brand expertise',
  },

  'gcc-spec-vs-non-gcc': {
    services: {
      title: 'Pre-Purchase Inspection',
      description: 'We check spec, history, and condition.',
      links: [
        { serviceSlug: 'pre-purchase-inspection-dubai' },
        { serviceSlug: 'car-inspection-dubai' },
        { serviceSlug: 'ac-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['pre-purchase-inspection', 'inspection'],
      keywords: ['inspection', 'buying', 'GCC', 'spec'],
    },
    reviewContext: 'about their pre-purchase inspection',
  },

  'preventive-maintenance-saves-thousands': {
    services: {
      title: 'Preventive Maintenance',
      description: 'Catch problems before they become expensive.',
      links: [
        { serviceSlug: 'car-service-dubai' },
        { serviceSlug: 'oil-change-dubai' },
        { serviceSlug: 'brake-service-dubai' },
        { serviceSlug: 'battery-replacement-dubai' },
        { serviceSlug: 'ac-repair-dubai' },
      ],
    },
    reviewCriteria: {
      services: ['car-service', 'oil', 'brake', 'battery', 'ac'],
      keywords: ['maintenance', 'preventive', 'service', 'regular', 'save'],
    },
    reviewContext: 'about their preventive maintenance approach',
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
