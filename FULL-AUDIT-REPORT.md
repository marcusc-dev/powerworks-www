# Powerworks Garage - Full SEO Audit Report

**URL:** https://powerworksgarage.com
**Date:** 12 Feb 2026
**Business Type:** Local Auto Repair (Dubai)
**Total Pages in Sitemap:** 1,176

---

## SEO Health Score: 62/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 68/100 | 25% | 17.0 |
| Content Quality | 72/100 | 25% | 18.0 |
| On-Page SEO | 58/100 | 20% | 11.6 |
| Schema / Structured Data | 75/100 | 10% | 7.5 |
| Performance | 50/100 | 10% | 5.0 |
| Images | 35/100 | 5% | 1.75 |
| AI Search Readiness | 25/100 | 5% | 1.25 |
| **TOTAL** | | | **62.1** |

---

## Executive Summary

### Top 5 Critical Issues
1. **26 /makes/[slug] pages MISSING from sitemap** — these brand pages (BMW, Mercedes, Porsche, etc.) are your highest-value local SEO pages and Google can't efficiently discover them
2. **/makes hub page MISSING from sitemap** — the brands landing page isn't submitted
3. **No AI crawler directives** — GPTBot, ClaudeBot, PerplexityBot not addressed in robots.txt; no `llms.txt` file exists. You're invisible to AI search
4. **94 images missing width/height attributes** — causes CLS (layout shift) issues hurting Core Web Vitals
5. **Multiple H1 tags on most pages** — dilutes heading hierarchy signal for Google

### Top 5 Quick Wins
1. Add /makes and /makes/[slug] pages to sitemap (+27 URLs)
2. Add `llms.txt` file for AI search crawlers
3. Fix multiple H1 tags — keep one H1 per page
4. Add BreadcrumbList schema to all pages
5. Add explicit `lastmod` dates (not `new Date()`) to sitemap for better crawl efficiency

---

## 1. Technical SEO (68/100)

### Crawlability
| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | ✅ Pass | Properly blocks /api/, /admin/, /_next/ |
| Sitemap | ⚠️ Issues | 1,176 URLs but missing /makes/* pages (27 URLs) |
| Canonical URLs | ✅ Fixed | Individual canonicals on all pages (just fixed) |
| /fleet redirect | ✅ Fixed | 301 to /fleet-service-dubai (just added) |
| HTTPS | ✅ Pass | All pages served over HTTPS |
| Trailing slashes | ✅ Pass | Consistent URL format |

### Indexability Issues
| Issue | Severity | Detail |
|-------|----------|--------|
| /makes pages not in sitemap | 🔴 CRITICAL | 27 high-value brand pages Google may not discover efficiently |
| Sitemap uses `new Date()` | 🟡 HIGH | Every URL shows today's date as lastmod — Google ignores this signal entirely |
| 1,176 URLs in single sitemap | 🟡 HIGH | Should be split into sub-sitemaps for better crawl management |

### Security Headers (Just Added)
| Header | Status |
|--------|--------|
| X-Frame-Options | ✅ SAMEORIGIN |
| X-Content-Type-Options | ✅ nosniff |
| Referrer-Policy | ✅ strict-origin-when-cross-origin |
| Content-Security-Policy | ✅ Present |

---

## 2. Content Quality (72/100)

### Page Content Depth
| Page Type | Count | Avg Word Count | Assessment |
|-----------|-------|----------------|------------|
| Homepage | 1 | ~2,500 | ✅ Strong |
| Service pages (/car-servicing-dubai/*) | 16 | ~8,000+ | ✅ Excellent depth |
| Make pages (/makes/*) | 26 | ~1,200 | ⚠️ Could be expanded |
| Service+Make pages | ~416 | ~1,800 | ⚠️ Borderline thin for programmatic |
| Blog posts (/ask-glenn/*) | 6 | ~1,500 | ⚠️ Need more articles |
| About | 1 | ~1,100 | ✅ Good |

### Content Gaps
| Gap | Impact | Recommendation |
|-----|--------|----------------|
| Only 6 blog posts | 🔴 HIGH | Need 20-30+ articles targeting long-tail queries |
| No location-specific pages | 🟡 MEDIUM | Create pages for key Dubai areas (Al Quoz, Business Bay, Marina, etc.) |
| No pricing/comparison content | 🟡 MEDIUM | "Cost of BMW service in Dubai" type pages would capture buying intent |
| No "How To" or DIY content | 🟡 MEDIUM | These attract top-of-funnel traffic and build authority |

### E-E-A-T Assessment
| Signal | Status | Notes |
|--------|--------|-------|
| Experience | ✅ Strong | Glenn Power featured prominently, 25+ years |
| Expertise | ✅ Strong | Detailed technical content, specialist knowledge shown |
| Authoritativeness | ⚠️ Medium | Need more external signals, press mentions |
| Trustworthiness | ✅ Strong | Reviews (4.9/5), transparent pricing, real team photos |

**Issue:** Experience years inconsistent across the site (15+, 20+, 25+). Pick one and be consistent.

---

## 3. On-Page SEO (58/100)

### Title Tags
| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| Titles are well-optimized | Most pages | ✅ |
| Some titles exceed 60 chars | ~5 pages | 🟡 LOW |

### Meta Descriptions
| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| Well-written, keyword-rich | Most pages | ✅ |
| Some slightly short (<120 chars) | About, Contact | 🟡 LOW |

### Heading Structure
| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| Multiple H1 tags per page | ALL pages | 🔴 HIGH |
| Service pages have 5-7 H1s | 16 service pages | 🔴 HIGH |
| Make pages have 9+ H1 tags | 26 make pages | 🔴 HIGH |

**This is a significant ranking factor issue.** Every page should have exactly ONE H1 tag. Other major headings should be H2.

### Internal Linking
| Check | Status |
|-------|--------|
| Navigation links | ✅ Good coverage |
| Cross-linking between services | ✅ Present |
| Blog-to-service links | ⚠️ Weak — only 6 articles |
| Breadcrumb navigation | ❌ Missing — no BreadcrumbList schema |
| Anchor text quality | ⚠️ Some empty anchor text links flagged by Screaming Frog |

---

## 4. Schema / Structured Data (75/100)

### Current Implementation
| Schema Type | Where | Status |
|-------------|-------|--------|
| AutoRepair | Global (layout.tsx) | ✅ Comprehensive |
| AggregateRating | Global | ✅ 4.9/5, 150 reviews |
| OfferCatalog | Global | ✅ Services with pricing |
| Service | Service pages | ✅ FAQPage also present |
| Article | Blog posts | ✅ With author schema |
| FAQPage | Blog + Service pages | ✅ Present |

### Missing Schema Opportunities
| Schema Type | Where | Impact |
|-------------|-------|--------|
| BreadcrumbList | All pages | 🔴 HIGH — enables breadcrumb rich results |
| LocalBusiness with reviews | Reviews page | 🟡 MEDIUM |
| HowTo | Service process sections | 🟡 MEDIUM — rich result eligible |
| VideoObject | If you add videos | 🟡 MEDIUM |
| WebSite with SearchAction | Homepage | 🟡 MEDIUM — sitelinks search box |

---

## 5. Performance (50/100)

### Core Web Vitals (Estimated)
| Metric | Likely Status | Issue |
|--------|--------------|-------|
| LCP | ⚠️ Needs work | Large hero images without priority loading on some pages |
| CLS | 🔴 Poor | 94 images missing width/height cause layout shifts |
| INP | ⚠️ Unknown | Voice assistant JS may impact interactivity |

### Image Issues
- **94 images** missing explicit width/height attributes
- Many logo PNGs are oversized (500KB+ for some brand logos)
- No WebP/AVIF format usage detected for static images
- Hero images are large JPEGs without responsive `srcset`

---

## 6. AI Search Readiness (25/100)

### Current Status: POOR
| Check | Status | Impact |
|-------|--------|--------|
| llms.txt file | ❌ Missing | AI crawlers can't understand your site structure |
| AI crawler directives | ❌ Missing | GPTBot, ClaudeBot, PerplexityBot not addressed |
| Passage citability | ⚠️ Medium | Content is good but not structured for snippet extraction |
| Brand mention signals | ⚠️ Weak | Limited external authority signals |
| Structured answers | ⚠️ Medium | FAQ schema helps but needs more Q&A content |

### What's Needed
1. Create `/public/llms.txt` with site overview, services, and key pages
2. Explicitly allow AI crawlers in robots.txt (GPTBot, ClaudeBot, etc.)
3. Structure content in Q&A format for better snippet extraction
4. Add more "definitive answer" content that AI models want to cite

---

## 7. Sitemap Issues (Detailed)

### Missing from Sitemap
| URL Pattern | Count | Priority |
|-------------|-------|----------|
| /makes | 1 | 🔴 CRITICAL |
| /makes/[slug] | 26 | 🔴 CRITICAL |
| **Total missing** | **27** | |

### Sitemap Quality Issues
| Issue | Detail |
|-------|--------|
| Single flat sitemap | 1,176 URLs should be split into sub-sitemaps (static, services, makes, blog) |
| `lastModified: new Date()` | Every URL shows today's date — Google treats this as "no signal" |
| No image sitemap | Could help image indexing |
| Blog post priority too low | 0.6 should be 0.7-0.8 for content you want indexed |

---

## Priority Action Plan

### 🔴 CRITICAL (Fix This Week)

1. **Add /makes pages to sitemap** — 27 high-value brand pages are not being submitted to Google
2. **Fix multiple H1 tags** — Every page has 3-9 H1 tags; keep exactly one H1 per page
3. **Add BreadcrumbList schema** — Enables rich results and helps Google understand site hierarchy
4. **Split sitemap into sub-sitemaps** — Better crawl management for 1,176 URLs

### 🟡 HIGH (Fix Within 2 Weeks)

5. **Create `llms.txt`** — Make site AI-crawlable for ChatGPT, Perplexity, Claude citations
6. **Allow AI crawlers in robots.txt** — Add explicit GPTBot, ClaudeBot, PerplexityBot Allow rules
7. **Fix sitemap lastModified dates** — Use actual last-modified dates instead of `new Date()`
8. **Add width/height to all images** — 94 images causing CLS issues
9. **Publish more blog content** — Target 20+ articles covering common car questions in Dubai
10. **Fix experience years inconsistency** — Pick "25+ years" and use it consistently everywhere

### 🟠 MEDIUM (Fix Within 1 Month)

11. **Add HowTo schema** to service process sections
12. **Create location-specific landing pages** (Al Quoz, Business Bay, Dubai Marina, etc.)
13. **Add WebSite schema with SearchAction** for sitelinks search box
14. **Optimize brand logo images** — Many are 400-500KB PNGs, should be under 50KB
15. **Add image sitemap** for better image indexing
16. **Create pricing/cost comparison content** ("How much does BMW service cost in Dubai?")

### 🟢 LOW (Backlog)

17. Convert static images to WebP format
18. Add video content with VideoObject schema
19. Build external authority signals (press, directory listings)
20. Add hreflang if targeting other GCC countries
