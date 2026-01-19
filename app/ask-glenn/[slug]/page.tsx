import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DubaiWeatherWidget from '@/components/DubaiWeatherWidget';
import RelatedArticles from '@/components/RelatedArticles';
import { BLOG_POSTS } from '@/lib/constants';
import { Clock, User, ArrowLeft, MessageCircle, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_POSTS.find((post) => post.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | Powerworks Garage',
    };
  }

  return {
    title: `${article.title} | Ask Glenn | Powerworks Garage Dubai`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_POSTS.find((post) => post.slug === slug);

  if (!article) {
    notFound();
  }

  // Get related articles from the same category
  const relatedArticles = BLOG_POSTS.filter(
    (post) => post.category === article.category || post.slug !== article.slug
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Article Image */}
      <section className="relative pt-20">
        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[450px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 md:pb-12">
              {/* Back Link */}
              <Link
                href="/ask-glenn"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Ask Glenn
              </Link>

              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-power-red text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By {article.author || 'Glenn'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/50"></span>
                    <span>{article.readTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Article Content - Left Side */}
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-power-blue prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-ul:my-4 prose-ul:pl-6
                    prose-ol:my-4 prose-ol:pl-6
                    prose-li:text-gray-700 prose-li:my-1
                    prose-table:my-6 prose-table:w-full
                    prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-200
                    prose-td:p-3 prose-td:border prose-td:border-gray-200
                    [&_.lead]:text-xl [&_.lead]:text-gray-600 [&_.lead]:leading-relaxed [&_.lead]:mb-6 [&_.lead]:font-normal
                  "
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />

                {/* WhatsApp CTA */}
                <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-2xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Have Questions About This Topic?
                      </h3>
                      <p className="text-white/90">
                        Message Glenn directly on WhatsApp for free, honest advice.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/971521217425"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#25D366] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Ask Glenn
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Right Side */}
            <aside className="lg:w-80 xl:w-96 space-y-6">
              {/* Sticky Container */}
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Dubai Weather Widget */}
                <DubaiWeatherWidget />

                {/* Related Articles */}
                <RelatedArticles articles={relatedArticles} currentSlug={slug} />

                {/* Contact CTA Card */}
                <div className="bg-power-blue rounded-xl p-5 text-white">
                  <h3 className="font-bold text-lg mb-2">Need Help With Your Car?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Book a service or get a free quote from our team.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/971521217425"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20bd5a] transition-colors w-full"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:+971521217425"
                      className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors w-full"
                    >
                      Call: +971 52 121 7425
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
