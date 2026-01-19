'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface RelatedArticlesProps {
  articles: BlogPost[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article and limit to 4
  const relatedPosts = articles
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 4);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-power-red/90 px-4 py-2.5">
        <h3 className="text-white font-medium text-xs uppercase tracking-wider">
          Related Articles
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/ask-glenn/${post.slug}`}
            className="block p-4 hover:bg-gray-50 transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>

            {/* Content */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-power-blue transition-colors leading-snug mb-1.5">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-4 pb-4">
        <Link
          href="/ask-glenn"
          className="block text-center text-sm font-semibold text-power-blue hover:text-power-red transition-colors py-2 border border-gray-200 rounded-lg hover:border-power-blue"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
}
