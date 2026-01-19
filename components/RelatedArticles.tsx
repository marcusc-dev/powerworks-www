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
      <div className="bg-power-red px-5 py-3">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">
          Related Articles
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/ask-glenn/${post.slug}`}
            className="flex gap-3 p-4 hover:bg-gray-50 transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-power-blue transition-colors leading-tight">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
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
