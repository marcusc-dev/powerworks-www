# UI/UX Design Review Agent

Automated design system QA for Visit.Network sites.

## Quick Start

### 1. Install Dependencies

```bash
npm install --save-dev puppeteer axe-core glob
```

### 2. Run Audit

**Code-only analysis:**
```bash
node scripts/ui_collect_css.mjs "app,components,styles"
```

**Live page audit:**
```bash
npm run dev  # Start dev server
node scripts/ui_audit.mjs http://localhost:3000
```

**Full audit (via Claude):**
```
Audit the homepage at http://localhost:3000 focusing on mobile conversion
```

## What It Checks

### Typography (20 points)
- ✓ Font sizes follow Major Third scale (16px → 20px → 25px...)
- ✓ Line heights appropriate (1.5 body, 1.2-1.3 headings)
- ✓ Consistent font weights (400, 600, 700)
- ✓ Readable without zoom on mobile

### Layout & Spacing (20 points)
- ✓ 8-point spacing scale (8, 16, 24, 32...)
- ✓ Consistent grid (12/8/4 cols for desktop/tablet/mobile)
- ✓ Proper visual hierarchy
- ✓ No horizontal scroll

### Color & Contrast (15 points)
- ✓ WCAG AA compliance (4.5:1 body, 3:1 large text)
- ✓ 60/30/10 color distribution
- ✓ Opacity variations over new hues
- ✓ Consistent brand colors

### Accessibility (15 points)
- ✓ All images have alt text
- ✓ Focus indicators visible (no outline:none without alternative)
- ✓ Touch targets ≥44×44px
- ✓ Semantic HTML
- ✓ Keyboard navigation
- ✓ ARIA labels where needed

### CTAs & Conversion (25 points)
- ✓ Primary CTA visible above fold
- ✓ Minimum height 48px
- ✓ Strong action labels ("Book Now" not "Click Here")
- ✓ CTAs repeat every 2-3 scrolls
- ✓ Trust signals near CTAs
- ✓ Clear hover/active/focus states

### Micro-interactions (5 points)
- ✓ Smooth transitions (200-300ms)
- ✓ Loading states on async actions
- ✓ Hover feedback on interactive elements
- ✓ Error/success states

## Output Files

After running audits, artifacts are saved to `tmp/ui-audit/`:

```
tmp/ui-audit/
├── summary.json              # Overall findings
├── lh.json                   # Lighthouse-like scores
├── axe-mobile.json          # Accessibility issues (mobile)
├── axe-tablet.json          # Accessibility issues (tablet)
├── axe-desktop.json         # Accessibility issues (desktop)
├── screenshot-mobile.png    # Visual reference
├── screenshot-tablet.png
├── screenshot-desktop.png
├── static-css-issues.json   # Code analysis findings
└── static-scores.json       # Preliminary scores
```

## Scoring System

**Total Score = Weighted Sum of Categories**

| Category | Weight | Max Points |
|----------|--------|------------|
| CTAs | 25% | 25 |
| Typography | 20% | 20 |
| Layout | 20% | 20 |
| Accessibility | 15% | 15 |
| Color | 15% | 15 |
| Micro | 5% | 5 |
| **Total** | **100%** | **100** |

**Example Calculation:**
```
Typography: 85/100 × 20% = 17.0
Layout: 78/100 × 20% = 15.6
Color: 92/100 × 15% = 13.8
Accessibility: 70/100 × 15% = 10.5
CTAs: 65/100 × 25% = 16.25
Micro: 80/100 × 5% = 4.0
──────────────────────────
Total: 77.15/100 (Good)
```

## Visit.Network Design Standards

### Typography Scale (Major Third - 1.25 ratio)

```css
/* Base: 16px */
font-size: 1rem;      /* 16px - body */
font-size: 1.25rem;   /* 20px - large body */
font-size: 1.563rem;  /* 25px - h6 */
font-size: 1.953rem;  /* 31.25px - h5 */
font-size: 2.441rem;  /* 39px - h4 */
font-size: 3.052rem;  /* 48.8px - h3 */
```

### Spacing Scale (8-point)

```css
/* Tailwind config */
spacing: {
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  6: '48px',
  8: '64px',
  12: '96px',
}
```

### Color Distribution

- **60%**: Primary color (brand blue, background)
- **30%**: Secondary color (grays, complementary)
- **10%**: Accent color (CTAs, highlights)

### WCAG AA Minimums

- **Normal text** (< 18px): 4.5:1 contrast ratio
- **Large text** (≥ 18px or 14px bold): 3:1 contrast ratio
- **Interactive elements**: 3:1 against background

## Common Issues & Fixes

### ❌ CTA Below Fold (Mobile)
**Impact**: -15 points (CTAs)
```diff
- <section className="mt-32">
+ <section className="mt-8 md:mt-16">
    <BookingCTA />
  </section>
```

### ❌ Low Contrast
**Impact**: -10 points (Accessibility + Color)
```diff
- <button className="bg-gray-200 text-gray-600">
+ <button className="bg-gray-100 text-gray-900">
    View Menu
  </button>
```

### ❌ Non-8pt Spacing
**Impact**: -8 points (Layout)
```diff
- className="p-[13px] mb-[27px]"
+ className="p-4 mb-6"  /* 16px, 24px */
```

### ❌ Missing Alt Text
**Impact**: -5 points per image (Accessibility)
```diff
- <Image src="/photo.jpg" width={800} height={600} />
+ <Image src="/photo.jpg" alt="Antwerp Grand Place" width={800} height={600} />
```

### ❌ Removed Focus Ring
**Impact**: -7 points (Accessibility)
```diff
- <button className="focus:outline-none">
+ <button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
```

### ❌ Small Touch Targets
**Impact**: -6 points (Accessibility)
```diff
- <button className="px-3 py-1">
+ <button className="px-4 py-3 min-h-[48px]">
```

## A/B Testing Opportunities

The report includes conversion optimization suggestions:

**CTA Copy:**
- ❌ "Learn More" → ✅ "Book Your Stay" (+15% CTR)
- ❌ "Explore" → ✅ "Find Perfect Hotel" (+22% CTR)

**CTA Placement:**
- ❌ Single bottom CTA → ✅ Sticky footer + inline every 2 screens (+30% conversion)

**Trust Signals:**
- ❌ No social proof → ✅ "4.8★ from 2,341 reviews" near CTA (+18% trust)

## Manual Scripts

You can also run scripts directly:

### Live Page Audit
```bash
node scripts/ui_audit.mjs http://localhost:3000
cat tmp/ui-audit/summary.json | jq
```

### Static CSS Analysis
```bash
node scripts/ui_collect_css.mjs "app/**/*.tsx,components/**/*.tsx"
cat tmp/ui-audit/static-css-issues.json | jq '.grouped'
```

### Custom Viewports (edit scripts)
```js
// In ui_audit.mjs, modify:
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },  // iPhone SE
  desktop: { width: 1920, height: 1080 }, // Full HD
};
```

## Troubleshooting

**"Cannot find module 'puppeteer'"**
```bash
npm install --save-dev puppeteer
```

**"Port 3000 not available"**
```bash
# Use different port
npm run dev -- -p 3001
node scripts/ui_audit.mjs http://localhost:3001
```

**"Permission denied: scripts/ui_audit.mjs"**
```bash
chmod +x scripts/ui_audit.mjs scripts/ui_collect_css.mjs
```

## Integration with CI/CD

Add to `.github/workflows/ui-audit.yml`:

```yaml
name: UI/UX Audit
on: [pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run start & npx wait-on http://localhost:3000
      - run: node scripts/ui_audit.mjs http://localhost:3000
      - run: node scripts/ui_collect_css.mjs "app,components"
      - name: Check score
        run: |
          SCORE=$(cat tmp/ui-audit/summary.json | jq '.totalScore')
          if [ $SCORE -lt 75 ]; then
            echo "UI/UX score too low: $SCORE (minimum: 75)"
            exit 1
          fi
```

## Additional Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Modular Scale Calculator](https://www.modularscale.com/)
- [8-Point Grid System](https://spec.fm/specifics/8-pt-grid)
