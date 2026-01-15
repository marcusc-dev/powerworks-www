---
name: site-audit
description: Comprehensive site health audit for all Visit Network sites. Checks broken images, page loading, article counts, pillar posts, tour enrichment, and nginx configuration. Can be run manually or scheduled. (project)
---

# Site Audit Skill

This skill performs a comprehensive health audit across all Visit Network sites, checking for:

1. **Elements Live** - Detects which content types have actual content (Articles, Tours, Restaurants, Places to Stay, Neighborhoods)
2. **Partner Links** - Detects affiliate partner integrations (Viator, GetYourGuide, Tiqets, Agoda, Booking.com)
3. **Broken Image Paths** - Validates CDN images are accessible
4. **Page Loading** - Verifies all enabled page types load correctly (Homepage, Sitemap, etc.)
5. **Article Health** - Checks article counts, pillar posts per category
6. **Tour Enrichment** - Identifies tours missing AI-generated content
7. **Sitemap Validation** - Verifies sitemap.xml is accessible and counts pages
8. **Nginx Configuration** - Verifies domain is properly configured in nginx
9. **Content Completeness** - Flags missing critical content

## Usage

### Manual Execution
```bash
# Audit all sites
npx tsx scripts/site-audit/run-audit.ts

# Audit specific site
npx tsx scripts/site-audit/run-audit.ts --site=visitrome

# Output JSON report
npx tsx scripts/site-audit/run-audit.ts --output=json

# Send email report (requires BREVO_API_KEY or SENDGRID_API_KEY)
npx tsx scripts/site-audit/run-audit.ts --email=marcus@visit.network
```

### Scheduled Execution
The audit can be scheduled via:
1. GitHub Actions workflow (daily at 6am UTC)
2. Supabase Edge Function (if needed for real-time)

## Audit Checks

### 1. Image Validation
Checks that featured images exist and are accessible:
- Article featured images
- Tour featured images
- Accommodation featured images
- Restaurant featured images
- Neighborhood featured images
- City hero images

**Threshold**: Any broken image is flagged as ERROR

### 2. Page Loading Checks
Verifies each page type returns HTTP 200:

| Page Type | URL Pattern | Condition |
|-----------|-------------|-----------|
| Homepage | `/` | Always |
| Things to Do | `/things-to-do` or `/{root}/things-to-do` | features.tours |
| Tour Detail | `/{root}/things-to-do/tour/{slug}` | features.tours |
| Places to Stay | `/{root}/places-to-stay` | features.accommodation |
| Accommodation Detail | `/{root}/places-to-stay/{type}/{city}/{slug}` | features.accommodation |
| Travel Guides | `/{root}/travel-guides` | features.articles |
| Article Detail | `/{root}/travel-guides/{category}/{slug}` | features.articles |
| Restaurants | `/{root}/restaurants` | features.restaurants |
| Restaurant Detail | `/{root}/restaurants/{slug}` | features.restaurants |
| Neighborhoods | `/{root}/neighborhoods` | features.neighborhoods |
| Neighborhood Detail | `/{root}/neighborhoods/{slug}` | features.neighborhoods |
| Cities | `/{root}/cities` | site_type = 'country' |
| City Detail | `/{root}/cities/{slug}` or `/cities/{slug}` | site_type != 'city' |

**Threshold**: Any non-200 response is flagged as ERROR

### 3. Article Health
Checks article content completeness:

| Check | Threshold | Severity |
|-------|-----------|----------|
| Total published articles | < 30 | WARNING |
| Total published articles | < 10 | ERROR |
| Missing pillar for category | Any | ERROR |
| Pillar has no linked articles | Any | WARNING |
| Articles without featured image | Any | WARNING |
| Articles without meta description | > 10% | WARNING |

### 4. Tour Enrichment
Checks tour content quality:

| Check | Threshold | Severity |
|-------|-----------|----------|
| Tours without description | Any | WARNING |
| Tours without AI enrichment | > 20% | WARNING |
| Tours without featured image | Any | WARNING |
| Tours without booking URL | Any | WARNING |
| Tours without category | Any | WARNING |

### 5. Nginx Configuration
Verifies nginx routing is correct:

| Check | Condition | Severity |
|-------|-----------|----------|
| Domain in HTTP block | Must exist | ERROR |
| Domain in HTTPS block | Must exist | ERROR |
| SSL certificate exists | Must exist | ERROR |
| Site returns 200 via nginx | Must pass | ERROR |

### 6. Content Completeness
Per-site content requirements:

| Check | Threshold | Severity |
|-------|-----------|----------|
| Has at least 1 tour | features.tours | ERROR |
| Has at least 1 accommodation | features.accommodation | WARNING |
| Has at least 1 restaurant | features.restaurants | WARNING |
| Has at least 1 neighborhood | features.neighborhoods | WARNING |
| Has at least 1 city | site_type != 'city' | WARNING |

## Output Format

### Console Output
```
╔══════════════════════════════════════════════════════════════════╗
║              SITE AUDIT REPORT - 2026-01-04                    ║
╚══════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────┐
│ ✗ VISITROME.COM                                                │
└─────────────────────────────────────────────────────────────────┘
  Elements Live: Articles, Tours, Places to Stay, Neighborhoods
  Partner Links: Viator, Tiqets
  Homepage Check: ✓ PASS
  Sitemap Check:  ✓ PASS
  Images Check:   ○ SKIPPED
  Pillars Check:  ✗ FAIL (5/7 categories)

  Content Counts:
    Articles:          48
    Tours:           1355
    Accommodations:  3821
    Restaurants:        0
    Neighborhoods:     19

  Issues: 2 errors, 6 warnings

  ERRORS:
    ✗ [PILLAR] Category "Accommodation Guides" has no pillar post
    ✗ [PILLAR] Category "Common Rome Questions" has no pillar post

  WARNINGS:
    ⚠ [PILLAR] Pillar "..." has no linked articles in category
    ...

╔══════════════════════════════════════════════════════════════════╗
║  SUMMARY                                                         ║
╠══════════════════════════════════════════════════════════════════╣
║  Total Sites:          8                                        ║
║  Healthy:              1  ✓                                     ║
║  With Warnings:        3  ⚠                                     ║
║  With Errors:          4  ✗                                     ║
╚══════════════════════════════════════════════════════════════════╝
```

### JSON Output
```json
{
  "timestamp": "2026-01-04T06:00:00Z",
  "summary": {
    "totalSites": 8,
    "sitesWithErrors": 4,
    "sitesWithWarnings": 3,
    "healthySites": 1
  },
  "sites": [
    {
      "siteId": "visitrome",
      "siteName": "VisitRome.com",
      "domain": "visitrome.com",
      "status": "error",
      "issues": [...],
      "metrics": {
        "articleCount": 48,
        "tourCount": 1355,
        "accommodationCount": 3821,
        "restaurantCount": 0,
        "neighborhoodCount": 19,
        "cityCount": 0,
        "brokenImages": 0,
        "failedPages": 0,
        "categoriesWithoutPillar": 2,
        "totalCategories": 7
      },
      "elementsLive": {
        "articles": true,
        "tours": true,
        "restaurants": false,
        "accommodation": true,
        "neighborhoods": true
      },
      "partnerLinks": {
        "viator": true,
        "getYourGuide": false,
        "tiqets": true,
        "agoda": false,
        "booking": false
      },
      "checks": {
        "homepage": "pass",
        "sitemap": "pass",
        "images": "skipped",
        "pillars": "fail"
      },
      "duration": 3421
    }
  ]
}
```

## Email Report Format

Subject: `[VNetwork Audit] 2 sites need attention - 2025-01-04`

The email includes:
- Summary of all sites
- Detailed errors/warnings per site
- Action items
- Links to fix common issues

## Integration with Claude

When running the audit via Claude Code:

1. Execute the audit script
2. Parse the results
3. Offer to fix common issues:
   - Add missing pillar posts (invoke article-creator skill)
   - Fix broken image paths (invoke image-uploader skill)
   - Enrich tours missing content (invoke viator-enricher skill)
   - Add site to nginx config (invoke go-live skill)

## Configuration

### Environment Variables
```bash
# Required for database access
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# Optional for email reports (Brevo preferred)
BREVO_API_KEY=xxx
SENDGRID_API_KEY=xxx
AUDIT_EMAIL_TO=marcus@visit.network
AUDIT_EMAIL_FROM=audit@visit.network

# Optional for SSH checks
SSH_HOST=vnetwork@57.129.114.80
```

### Thresholds (configurable in script)
```typescript
const THRESHOLDS = {
  MIN_ARTICLES_WARNING: 30,
  MIN_ARTICLES_ERROR: 10,
  MAX_UNENRICHED_TOURS_PERCENT: 20,
  MAX_ARTICLES_WITHOUT_META_PERCENT: 10,
};
```

## Scheduled Runs

### GitHub Actions (Recommended)
Add `.github/workflows/site-audit.yml`:

```yaml
name: Daily Site Audit

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6am UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx tsx scripts/site-audit/run-audit.ts --email=${{ secrets.AUDIT_EMAIL }}
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
```

## Troubleshooting

### Audit times out
- Reduce number of image checks (sample instead of all)
- Run for single site instead of all

### SSH checks fail
- Verify SSH key is configured
- Check server is accessible
- Skip nginx checks with `--skip-nginx` flag

### Email not sending
- Verify SENDGRID_API_KEY is set
- Check SendGrid sender verification
