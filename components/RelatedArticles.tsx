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
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* Subtle header - no aggressive background */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Related Articles
        </p>
      </div>

      <div className="divide-y divide-gray-50">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/ask-glenn/${post.slug}`}
            className="flex gap-3 p-3 hover:bg-gray-50/50 transition-colors group"
          >
            {/* Small thumbnail */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="64px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-power-blue transition-colors leading-snug">
                {post.title}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1">
                {post.readTime || '5 min read'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Subtle view all link */}
      <div className="px-3 pb-3 pt-1">
        <Link
          href="/ask-glenn"
          className="block text-center text-xs font-medium text-gray-500 hover:text-power-blue transition-colors py-2"
        >
          View All Articles →
        </Link>
      </div>
    </div>
  );
}
