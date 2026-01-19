'use client';

import { useMemo } from 'react';
import { InlineServiceLinks, InlineReviewsBlock, InlineCustomerReview } from './ArticleInlineBlocks';
import { getArticleEnrichment, getArticleReviews } from '@/lib/article-enrichment';

interface ArticleBodyProps {
  content: string;
  slug: string;
}

/**
 * Renders article content with inline service links and customer reviews
 * Splits the HTML content and injects React components at strategic positions
 */
export default function ArticleBody({ content, slug }: ArticleBodyProps) {
  const enrichment = getArticleEnrichment(slug);
  const relevantReviews = getArticleReviews(slug, 3);

  // Parse content into sections based on h2 headings
  const contentSections = useMemo(() => {
    if (!content) return [];

    // Split content by h2 tags, keeping the tags
    const sections: string[] = [];
    const h2Regex = /<h2[^>]*>/gi;
    let lastIndex = 0;
    let match;
    const matches: number[] = [];

    // Find all h2 positions
    while ((match = h2Regex.exec(content)) !== null) {
      matches.push(match.index);
    }

    // If no h2s, return the whole content as one section
    if (matches.length === 0) {
      return [content];
    }

    // Split into sections
    matches.forEach((pos, index) => {
      if (index === 0 && pos > 0) {
        // Content before first h2
        sections.push(content.slice(0, pos));
      }

      if (index < matches.length - 1) {
        sections.push(content.slice(pos, matches[index + 1]));
      } else {
        sections.push(content.slice(pos));
      }

      lastIndex = pos;
    });

    return sections;
  }, [content]);

  // Determine where to place enrichment blocks
  // Services block: after 2nd section (about 40% through)
  // Reviews block: after 4th section or second-to-last (about 70% through)
  const servicesPosition = Math.min(2, Math.floor(contentSections.length * 0.4));
  const reviewsPosition = Math.min(
    contentSections.length - 1,
    Math.max(servicesPosition + 2, Math.floor(contentSections.length * 0.7))
  );

  // If we have few sections, show both at the end
  const showServicesSeparately = contentSections.length >= 4;
  const showReviewsSeparately = contentSections.length >= 3 && relevantReviews.length > 0;

  return (
    <div className="article-content">
      {contentSections.map((section, index) => (
        <div key={index}>
          {/* Render the content section */}
          <div dangerouslySetInnerHTML={{ __html: section }} />

          {/* Inject services block after appropriate section */}
          {showServicesSeparately && index === servicesPosition && enrichment?.services && (
            <InlineServiceLinks
              title={enrichment.services.title}
              description={enrichment.services.description}
              services={enrichment.services.links}
            />
          )}

          {/* Inject reviews block after appropriate section */}
          {showReviewsSeparately && index === reviewsPosition && relevantReviews.length > 0 && (
            <InlineReviewsBlock
              reviews={relevantReviews}
              title="What Our Customers Say"
              subtitle={enrichment?.reviewContext ? `Real feedback ${enrichment.reviewContext}` : 'Real experiences from Powerworks customers'}
            />
          )}
        </div>
      ))}

      {/* If content has few sections, show enrichment at the end */}
      {!showServicesSeparately && enrichment?.services && (
        <InlineServiceLinks
          title={enrichment.services.title}
          description={enrichment.services.description}
          services={enrichment.services.links}
        />
      )}

      {!showReviewsSeparately && relevantReviews.length > 0 && (
        <InlineReviewsBlock
          reviews={relevantReviews}
          title="What Our Customers Say"
          subtitle={enrichment?.reviewContext ? `Real feedback ${enrichment.reviewContext}` : 'Real experiences from Powerworks customers'}
        />
      )}

      {/* If no enrichment data, show a single featured review if available */}
      {!enrichment && relevantReviews.length === 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
          {/* Placeholder - would normally show nothing, but keeping for debug visibility */}
        </div>
      )}
    </div>
  );
}
