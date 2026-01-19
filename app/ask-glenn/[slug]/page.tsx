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
              <div className="flex items-end justify-between gap-8">
                {/* Left Content */}
                <div className="flex-1 max-w-3xl">
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
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
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

                {/* Glenn Image - Right Side */}
                <div className="hidden lg:block relative flex-shrink-0">
                  <div className="relative w-48 h-56 xl:w-56 xl:h-64">
                    <Image
                      src="/glenn.jpg"
                      alt="Glenn Power"
                      fill
                      priority
                      className="object-cover object-top rounded-lg shadow-2xl"
                      style={{
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      }}
                    />
                    {/* Signature overlay */}
                    <div className="absolute -bottom-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                      <Image
                        src="/signature-gp.png"
                        alt="Glenn Power Signature"
                        width={80}
                        height={28}
                        priority
                        className="opacity-90"
                      />
                    </div>
                  </div>
                </div>
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
                  className="prose prose-base max-w-none
                    prose-headings:font-semibold prose-headings:text-gray-900
                    prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pt-6 prose-h2:border-t prose-h2:border-gray-200
                    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[15px]
                    prose-a:text-power-blue prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-6 prose-ul:pl-6 prose-ul:list-disc prose-ul:space-y-3
                    prose-ol:my-6 prose-ol:pl-6 prose-ol:list-decimal prose-ol:space-y-3
                    prose-li:text-gray-700 prose-li:text-[15px] prose-li:leading-[1.8] prose-li:pl-2
                    [&_ul>li]:marker:text-power-red [&_ol>li]:marker:text-power-blue [&_ol>li]:marker:font-semibold
                    prose-table:my-8 prose-table:w-full prose-table:text-sm
                    prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-200 prose-th:text-gray-900
                    prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
                    [&_.lead]:text-lg [&_.lead]:text-gray-600 [&_.lead]:leading-relaxed [&_.lead]:mb-8 [&_.lead]:font-normal [&_.lead]:border-l-4 [&_.lead]:border-power-blue [&_.lead]:pl-4 [&_.lead]:py-1
                    [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-8
                  "
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />

                {/* Author Block */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Author Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src="/glenn.jpg"
                          alt="Glenn Power - Owner of Powerworks Garage"
                          fill
                          priority
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">Glenn Power</h4>
                        <span className="text-sm text-power-blue font-medium">Owner & Master Technician</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        With over 25 years of experience in automotive repair, Glenn founded Powerworks Garage to bring British standards of quality and honesty to Dubai. He personally oversees every job and is always happy to chat about your car.
                      </p>
                      {/* Signature */}
                      <div className="flex items-center gap-4">
                        <Image
                          src="/signature-gp.png"
                          alt="Glenn Power Signature"
                          width={120}
                          height={40}
                          priority
                          className="opacity-80"
                        />
                        <a
                          href="https://wa.me/971521217425"
                          className="text-sm text-[#25D366] hover:underline font-medium flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Message Glenn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

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
            <aside className="lg:w-72 xl:w-80 space-y-5">
              {/* Sticky Container */}
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Dubai Weather Widget */}
                <DubaiWeatherWidget />

                {/* Related Articles */}
                <RelatedArticles articles={relatedArticles} currentSlug={slug} />

                {/* Contact CTA Card */}
                <div className="bg-power-blue rounded-xl p-4 text-white">
                  <h3 className="font-semibold text-base mb-2">Need Help With Your Car?</h3>
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
