---
name: uiux-reviewer
description: Design-systems QA for Visit.Network. Audits front-end code and live pages for typography, layout, spacing, color/contrast, accessibility, micro-interactions, and revenue CTAs. Returns scored report with minimal, copy-pasteable diffs.
---

# UI/UX Design Review Agent

This skill performs comprehensive UI/UX audits on front-end code and live pages for Visit.Network sites, providing actionable, copy-pasteable improvements with quantified scoring.

## Purpose

Evaluate and improve user interface design across multiple dimensions:
- **Typography**: Font choices, sizes, weights, line heights, readability
- **Layout & Spacing**: Grid systems, margins, padding, visual hierarchy
- **Color & Contrast**: WCAG compliance, brand consistency, visual balance
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Micro-interactions**: Hover states, transitions, loading states, feedback
- **Revenue CTAs**: Placement, visibility, urgency, conversion optimization

## Input Parameters

When invoking this skill, you can specify:

- **target_paths** (optional)
  - Description: Comma-separated globs to scan (e.g., `app/**/*.tsx,components/**/*.tsx`)
  - Default: `app,components,styles`

- **url** (optional)
  - Description: Live or local URL to audit (e.g., `http://visitantwerp.local:3000`)
  - Default: None (code-only analysis)

- **focus** (optional)
  - Description: Specific area to prioritize
  - Options: `mobile` | `tablet` | `desktop` | `typography` | `spacing` | `color` | `a11y` | `conversion`
  - Default: `mobile`

- **report_path** (optional)
  - Description: Where to write the final report (markdown)
  - Default: `tmp/uiux-report.md`

## Viewport Targets

When focus is set to a specific device:
- **Mobile**: 390×844 (iPhone 12 Pro)
- **Tablet**: 820×1180 (iPad Air)
- **Desktop**: 1440×900 (MacBook Pro 15")

## Visit.Network Design System Rules

This skill enforces the following design principles specific to Visit.Network:

### Typography Standards
- **Base size**: 16px
- **Scale**: Major Third (~1.25 ratio) with rem units
  - xs: 0.64rem (10.24px)
  - sm: 0.8rem (12.8px)
  - base: 1rem (16px)
  - lg: 1.25rem (20px)
  - xl: 1.563rem (25px)
  - 2xl: 1.953rem (31.25px)
  - 3xl: 2.441rem (39px)
  - 4xl: 3.052rem (48.8px)
- **Body text**: Default letter-spacing, line-height ~1.5
- **Headings**: Tighter line-height as size increases (1.2-1.3)

### Layout & Spacing
- **Grid columns**: 12 (desktop) / 8 (tablet) / 4 (mobile)
- **Spacing scale**: Eight-point system (8, 16, 24, 32, 40, 48, 64, 80, 96...)
- **Proximity**: Related elements closer than unrelated
- **Size contrast**: Clear visual hierarchy
- **Alignment**: Consistent throughout layout

### Color System
- **Distribution rule**: 60% primary / 30% secondary / 10% accent
- **Opacity over hues**: Prefer opacity variations to creating new colors
- **WCAG AA compliance**:
  - Body text: 4.5:1 minimum contrast
  - Large text (18px+): 3:1 minimum contrast

### CTA Optimization
- **Single primary goal** per screen
- **Hero CTA** visible on page load (above fold)
- **Minimum height**: 48px (touch-friendly)
- **Strong action labels**: "Book Now", "Get Started" (not "Click Here")
- **Repetition**: Repeat primary CTA every 2-3 scrolls
- **Trust elements**: Place near CTAs (reviews, guarantees, security badges)
- **Interactive states**: hover, active, focus-visible (never remove focus ring)

### Accessibility Requirements
- **Semantic HTML**: Use proper roles and elements
- **Link labels**: Descriptive, not "click here"
- **Focus indicators**: Visible and clear (never `outline: none` without alternative)
- **Touch targets**: Minimum 44×44px
- **Motion preferences**: Respect `prefers-reduced-motion`
- **ARIA**: Only when semantic HTML insufficient

### Performance Considerations
- **LCP element**: Properly sized and prioritized
- **Images**: Correct dimensions (no layout shift)
- **Font loading**: `font-display: swap` to prevent FOIT

## Scoring System

Every audit produces a **0-100 scorecard** with these weighted sub-scores:

| Category | Weight | Criteria |
|----------|--------|----------|
| Typography | 20 pts | Scale adherence, readability, hierarchy |
| Layout | 20 pts | Grid usage, spacing consistency, alignment |
| Color | 15 pts | Contrast ratios, distribution, consistency |
| Accessibility | 15 pts | WCAG AA compliance, keyboard nav, ARIA |
| CTAs | 25 pts | Visibility, placement, conversion optimization |
| Micro-interactions | 5 pts | States, transitions, feedback |

**Total Score Interpretation:**
- 90-100: Excellent - Production ready
- 75-89: Good - Minor improvements needed
- 60-74: Fair - Several issues to address
- Below 60: Needs work - Significant improvements required

## Audit Commands

The skill executes these commands in sequence:

```bash
# 1. Live page audit (if url provided)
node scripts/ui_audit.mjs {{url}}
# Example: node scripts/ui_audit.mjs http://visitantwerp.local:3000

# 2. Static code CSS collection
node scripts/ui_collect_css.mjs {{target_paths}}

# 3. Parse audit artifacts
cat tmp/ui-audit/summary.json
cat tmp/ui-audit/axe-*.json
cat tmp/ui-audit/lh.json
```

## Review Methodology

### 1. Code Analysis

**Typography Audit:**
```typescript
// ✗ AVOID: Hardcoded font sizes, inconsistent typography
<h1 style={{ fontSize: '24px' }}>Title</h1>
<p style={{ fontSize: '14px', lineHeight: '1.2' }}>Text</p>

// ✓ BETTER: Semantic typography system
<h1 className="text-4xl font-bold leading-tight">Title</h1>
<p className="text-base leading-relaxed">Text</p>

// ✓ BEST: Design tokens with proper hierarchy
<h1 className="typography-h1">Title</h1>
<p className="typography-body">Text</p>
```

**Spacing & Layout:**
```typescript
// ✗ AVOID: Magic numbers, inconsistent spacing
<div style={{ padding: '13px', marginBottom: '27px' }}>

// ✓ BETTER: Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
<div className="p-4 mb-6">

// ✓ BEST: Semantic spacing with responsive breakpoints
<div className="p-4 md:p-6 lg:p-8 space-y-6">
```

**Color & Contrast:**
```typescript
// ✗ AVOID: Low contrast ratios (WCAG fail)
<button className="bg-gray-300 text-gray-400">Submit</button>

// ✓ BETTER: WCAG AA compliant (4.5:1 for normal text)
<button className="bg-blue-600 text-white">Submit</button>

// ✓ BEST: Semantic color system with states
<button className="btn-primary hover:btn-primary-hover focus:ring-2">
  Submit
</button>
```

**Accessibility:**
```typescript
// ✗ AVOID: Missing ARIA, poor keyboard support
<div onClick={handleClick}>
  <img src="icon.svg" />
</div>

// ✓ BETTER: Proper semantics
<button onClick={handleClick}>
  <img src="icon.svg" alt="Close dialog" />
</button>

// ✓ BEST: Full accessibility support
<button
  onClick={handleClick}
  aria-label="Close dialog"
  className="focus-visible:outline-2 focus-visible:outline-offset-2"
>
  <span className="sr-only">Close dialog</span>
  <XIcon className="w-5 h-5" aria-hidden="true" />
</button>
```

**Micro-interactions:**
```typescript
// ✗ AVOID: No feedback, jarring transitions
<button onClick={save}>Save</button>

// ✓ BETTER: Visual feedback
<button
  onClick={save}
  className="hover:bg-blue-700 active:scale-95 transition-colors"
>
  Save
</button>

// ✓ BEST: Complete interaction states
<button
  onClick={save}
  disabled={isLoading}
  className="btn-primary disabled:opacity-50 disabled:cursor-not-wait
             hover:scale-105 active:scale-95
             transition-all duration-200 ease-out
             focus:ring-2 focus:ring-offset-2"
>
  {isLoading ? (
    <><Spinner className="animate-spin" /> Saving...</>
  ) : (
    'Save'
  )}
</button>
```

**Revenue CTAs:**
```typescript
// ✗ AVOID: Buried, unclear value proposition
<a href="/book" className="text-sm text-gray-500">Book</a>

// ✓ BETTER: Prominent, clear action
<button className="btn-primary text-lg">
  Book Your Stay
</button>

// ✓ BEST: Optimized for conversion
<div className="sticky bottom-0 bg-white shadow-2xl p-4 md:p-6">
  <div className="flex items-center justify-between mb-3">
    <div>
      <p className="text-sm text-gray-600">From</p>
      <p className="text-3xl font-bold text-gray-900">$99<span className="text-base text-gray-500">/night</span></p>
    </div>
    <button className="btn-primary btn-lg group relative overflow-hidden">
      <span className="relative z-10">Check Availability</span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </button>
  </div>
  <p className="text-xs text-gray-500 flex items-center gap-1">
    <CheckIcon className="w-4 h-4 text-green-600" />
    Free cancellation • Best price guarantee
  </p>
</div>
```

### 2. Live Page Review

When `page_url` is provided, the agent will:

1. **Visual Inspection**: Screenshot and analyze layout, spacing, alignment
2. **Responsive Testing**: Check mobile, tablet, desktop breakpoints
3. **Interaction Testing**: Verify hover states, transitions, loading states
4. **Accessibility Scan**: Run automated WCAG checks, keyboard navigation
5. **Performance**: Identify layout shifts, animation jank, render-blocking

### 3. Mobile-First Considerations (Default Focus)

**Critical Mobile UX Patterns:**
```typescript
// ✓ Touch targets minimum 44x44px
<button className="min-h-[44px] min-w-[44px] p-3">

// ✓ Thumb-friendly bottom navigation
<nav className="fixed bottom-0 inset-x-0 safe-area-inset-bottom">

// ✓ Readable without zoom (minimum 16px base)
<p className="text-base md:text-lg">

// ✓ Generous tap spacing
<div className="space-y-4">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

## Output Format

The final report is written to `{{report_path}}` (default: `tmp/uiux-report.md`) and follows this structure:

```markdown
# UI/UX Audit Report
**Site**: [Site Name]
**URL**: [URL if provided]
**Focus**: [mobile/desktop/etc]
**Date**: [ISO timestamp]

---

## 📊 Scorecard (0-100)

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Typography | 85/100 | 20% | 17.0 |
| Layout & Spacing | 78/100 | 20% | 15.6 |
| Color & Contrast | 92/100 | 15% | 13.8 |
| Accessibility | 70/100 | 15% | 10.5 |
| CTAs & Conversion | 65/100 | 25% | 16.25 |
| Micro-interactions | 80/100 | 5% | 4.0 |
| **TOTAL** | **77.15** | | **77.15** |

**Overall Grade**: Good - Minor improvements needed

---

## 🔥 Top Priority Fixes

### 1. CTA Not Visible Above Fold - `app/page.tsx:45`
**Why**: Primary booking CTA requires scrolling on mobile (390×844)
**Impact**: 30-40% conversion loss (industry benchmark)
**Score Impact**: -15 pts (CTAs category)

**Fix**:
```diff
- <section className="mt-32">
+ <section className="mt-8 md:mt-16">
    <BookingCTA />
  </section>
```

### 2. Insufficient Contrast on Secondary CTAs - `components/RestaurantCard.tsx:89`
**Why**: Text #757575 on #E0E0E0 = 2.1:1 (needs 4.5:1)
**Impact**: WCAG AA fail, illegible for low-vision users
**Score Impact**: -10 pts (Accessibility + Color)

**Fix**:
```diff
- <button className="bg-gray-200 text-gray-600">
+ <button className="bg-gray-100 text-gray-900">
    View Menu
  </button>
```

### 3. Inconsistent Spacing Scale - `styles/globals.css:12-45`
**Why**: Using 13px, 27px, 35px (not 8pt scale)
**Impact**: Visual inconsistency, harder to maintain
**Score Impact**: -8 pts (Layout)

**Fix**:
```diff
  .card {
-   padding: 13px;
+   padding: 16px; /* 2 × 8px */
-   margin-bottom: 27px;
+   margin-bottom: 24px; /* 3 × 8px */
  }
```

---

## 📝 Detailed Findings

### Typography (85/100)

**✓ Strengths:**
- Base size correctly set to 16px
- Using rem units throughout
- Good hierarchy on headings

**✗ Issues:**
- Line-height 1.3 on body text (should be 1.5) - `styles/typography.css:8`
- H1 using 2.5rem instead of scale value 3.052rem - `app/layout.tsx:12`

**Fixes**:
```diff
  body {
    font-size: 1rem;
-   line-height: 1.3;
+   line-height: 1.5;
  }
```

### Layout & Spacing (78/100)

**✓ Strengths:**
- Responsive grid implementation
- Good use of Tailwind utilities

**✗ Issues:**
- Magic numbers in padding (see Top Fix #3)
- Inconsistent gaps between sections

### Color & Contrast (92/100)

**✓ Strengths:**
- Primary palette well-defined
- Good brand consistency

**✗ Issues:**
- Secondary CTA contrast (see Top Fix #2)

### Accessibility (70/100)

**✗ Critical:**
- 15 images missing alt text - `app/neighborhoods/[slug]/page.tsx`
- Focus rings removed on buttons - `styles/globals.css:89`
- Touch targets below 44px - `components/MobileNav.tsx`

**Fixes**:
```diff
- <button className="focus:outline-none">
+ <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
```

### CTAs & Conversion (65/100)

**✗ Critical:**
- Hero CTA below fold (see Top Fix #1)
- Weak labels: "Learn More" instead of "Book Your Stay"
- No trust signals near primary CTAs
- CTA only appears once (should repeat every 2-3 scrolls)

**A/B Test Opportunities**:
1. **Hero CTA Copy**
   - Current: "Explore"
   - Test: "Find Your Perfect Stay" / "Book Now & Save 20%"

2. **CTA Placement**
   - Current: Single CTA at bottom
   - Test: Sticky footer CTA + inline CTAs every 2 screens

3. **Trust Signals**
   - Add: "4.8★ from 2,341 reviews" + "Free cancellation"

### Micro-interactions (80/100)

**✓ Strengths:**
- Smooth transitions on most elements

**✗ Issues:**
- No loading states on async buttons
- Missing hover feedback on cards

---

## 💡 Quick Wins (High ROI)

1. **Move hero CTA above fold** (+15 conversion pts, 5 min fix)
2. **Fix secondary CTA contrast** (+10 a11y pts, 2 min fix)
3. **Add alt text to images** (+8 a11y pts, 10 min fix)
4. **Restore focus indicators** (+7 a11y pts, 3 min fix)

---

## 🎨 Tailwind/React Snippets

### Optimized CTA Component
```tsx
export function PrimaryCTA({
  children,
  href,
  loading = false
}: CTAProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center",
        "min-h-[48px] px-8 py-3",
        "bg-blue-600 text-white font-semibold",
        "rounded-lg shadow-lg",
        "hover:bg-blue-700 hover:shadow-xl",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </a>
  )
}
```

### Typography Scale (Tailwind Config)
```js
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      'xs': '0.64rem',   // 10.24px
      'sm': '0.8rem',    // 12.8px
      'base': '1rem',    // 16px
      'lg': '1.25rem',   // 20px
      'xl': '1.563rem',  // 25px
      '2xl': '1.953rem', // 31.25px
      '3xl': '2.441rem', // 39px
      '4xl': '3.052rem', // 48.8px
    },
    spacing: {
      // 8-point scale
      '1': '8px',
      '2': '16px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px',
      '8': '64px',
      '10': '80px',
      '12': '96px',
    }
  }
}
```

---

## 📈 Next Steps

1. **Immediate** (Critical fixes):
   - Fix Top Priority issues #1-3
   - Estimated time: 30 minutes
   - Score improvement: +33 pts → **110/100** 🎯

2. **Short-term** (This sprint):
   - Address all Accessibility issues
   - Implement suggested CTA improvements
   - Estimated time: 4 hours
   - Score improvement: Target 85+

3. **A/B Testing** (Next 2 weeks):
   - Test CTA copy variations
   - Test sticky CTA placement
   - Add trust signals
   - Projected: +15-30% conversion lift

---

**Report generated**: [timestamp]
**Audit artifacts**: `tmp/ui-audit/`
```

### Example Output

```markdown
## UI/UX Review: BookingCTA Component

### Critical Issues (🔴)

1. **Insufficient color contrast on primary CTA** - `components/BookingCTA.tsx:28`
   - **Problem**: Text color #999 on #ddd background = 1.8:1 contrast (WCAG requires 4.5:1)
   - **Impact**: Users with low vision cannot read the CTA, failing WCAG AA
   - **Fix**:
   ```diff
   - <button className="bg-gray-300 text-gray-500">
   + <button className="bg-blue-600 text-white">
       Book Now
     </button>
   ```

2. **Missing touch target size on mobile** - `components/BookingCTA.tsx:28`
   - **Problem**: Button height is 32px, below minimum 44px for touch targets
   - **Impact**: Difficult for users to tap on mobile, increases friction
   - **Fix**:
   ```diff
   - <button className="px-4 py-2">
   + <button className="px-6 py-3 min-h-[44px]">
       Book Now
     </button>
   ```

### High Priority (🟠)

3. **No loading state feedback** - `components/BookingCTA.tsx:15`
   - **Problem**: Button has no visual feedback during booking submission
   - **Impact**: Users may click multiple times, creating duplicate bookings
   - **Fix**:
   ```diff
     <button
   +   disabled={isLoading}
   +   className={cn(
   +     "btn-primary",
   +     isLoading && "opacity-50 cursor-wait"
   +   )}
       onClick={handleBooking}
     >
   +   {isLoading ? (
   +     <><Spinner /> Processing...</>
   +   ) : (
         'Book Now'
   +   )}
     </button>
   ```

### Summary
- Total issues: 3 critical, 1 high, 2 medium
- WCAG compliance: A (failing AA on contrast)
- Mobile readiness: 6/10 (touch targets, spacing issues)
- Conversion optimization: 7/10 (good positioning, needs urgency/trust signals)
```

## Review Checklist

**Typography:**
- [ ] Font sizes use consistent scale (14px, 16px, 18px, 20px, 24px, 32px, 48px)
- [ ] Line heights appropriate for text size (1.5-1.75 for body, 1.2-1.3 for headings)
- [ ] Font weights create clear hierarchy (400 body, 600 subheads, 700 headings)
- [ ] Readable without zoom on mobile (16px minimum base size)

**Layout & Spacing:**
- [ ] Consistent spacing scale (4px base unit)
- [ ] Adequate whitespace between sections (min 24px mobile, 48px desktop)
- [ ] Responsive breakpoints handle all screen sizes
- [ ] No horizontal scroll on mobile
- [ ] Grid alignment consistent throughout

**Color & Contrast:**
- [ ] Text meets WCAG AA (4.5:1 normal, 3:1 large text)
- [ ] Interactive elements have clear states (default, hover, active, disabled)
- [ ] Brand colors used consistently
- [ ] Sufficient contrast on all backgrounds
- [ ] Dark mode support (if applicable)

**Accessibility:**
- [ ] All images have alt text
- [ ] Buttons/links have accessible labels
- [ ] Form inputs have associated labels
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible and clear
- [ ] ARIA labels where semantic HTML insufficient
- [ ] Screen reader announcements for dynamic content

**Micro-interactions:**
- [ ] Hover states on all interactive elements
- [ ] Smooth transitions (200-300ms)
- [ ] Loading states for async actions
- [ ] Error states clearly visible
- [ ] Success feedback after actions
- [ ] Skeleton screens for loading content

**Revenue CTAs:**
- [ ] Primary CTA stands out visually
- [ ] CTA placement follows F-pattern/Z-pattern
- [ ] Clear value proposition near CTA
- [ ] Urgency/scarcity indicators (if applicable)
- [ ] Trust signals (reviews, guarantees)
- [ ] Sticky/fixed positioning for key actions
- [ ] A/B test opportunities identified

## Common Patterns to Check

### Next.js / React Specific

**Image Optimization:**
```typescript
// ✗ AVOID: Unoptimized images, layout shift
<img src="/photo.jpg" alt="Photo" />

// ✓ BETTER: Next.js Image with proper sizing
import Image from 'next/image'
<Image src="/photo.jpg" alt="Photo" width={800} height={600} />

// ✓ BEST: Responsive with proper aspect ratio
<Image
  src="/photo.jpg"
  alt="Photo"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Tailwind CSS Patterns:**
```typescript
// ✗ AVOID: Inline styles, inconsistency
<div style={{ marginTop: '20px', padding: '15px' }}>

// ✓ BETTER: Tailwind utilities
<div className="mt-5 p-4">

// ✓ BEST: Responsive, semantic classes
<div className="mt-4 p-4 md:mt-6 md:p-6 lg:mt-8 lg:p-8">
```

## When Claude Should Use This Skill

Invoke this skill when:
- User asks for UI/UX review, design audit, or accessibility check
- User mentions improving layout, spacing, typography, or colors
- User wants to optimize conversion rates or CTAs
- User requests mobile responsiveness review
- User asks "how does this look?" or "is this user-friendly?"
- Before deploying major UI changes to production
- User mentions WCAG compliance or accessibility standards
- User wants to improve mobile conversion rates
- User asks about design system consistency

## Workflow When Invoked

When this skill is activated, Claude will:

1. **Parse input parameters** (target_paths, url, focus, report_path)
2. **Run audit commands** in sequence:
   - If `url` provided: Execute `node scripts/ui_audit.mjs {{url}}` for live page analysis
   - Execute `node scripts/ui_collect_css.mjs {{target_paths}}` for static code analysis
   - Read generated artifacts from `tmp/ui-audit/`
3. **Analyze findings** across all categories:
   - Typography: Check font scale, line heights, readability
   - Layout: Verify spacing scale, grid usage, alignment
   - Color: Test contrast ratios, check WCAG compliance
   - Accessibility: Review ARIA, keyboard nav, alt text
   - CTAs: Evaluate placement, sizing, conversion optimization
   - Micro-interactions: Check states, transitions, feedback
4. **Calculate scores** for each category (weighted 0-100)
5. **Generate report** with:
   - Scorecard table with weighted totals
   - Top 3-5 priority fixes with business impact
   - Detailed findings per category
   - Copy-pasteable code diffs
   - Tailwind/React snippets for improvements
   - A/B testing opportunities for CTAs
6. **Write report** to `{{report_path}}` and display to user

## Prerequisites

The audit scripts require these dependencies:

```bash
npm install --save-dev puppeteer axe-core glob
```

If dependencies are missing, Claude will inform the user and offer to install them.

## Example Invocations

**Basic code-only review:**
```
Review the UI/UX of our app
```
Claude will: Scan default paths (app, components, styles) and generate report

**Live page audit with specific focus:**
```
Audit http://visitantwerp.local:3000 with focus on mobile conversion
```
Claude will: Run full live audit + static analysis, prioritize mobile + CTA issues

**Specific paths with custom report location:**
```
Review components/BookingForm.tsx and app/checkout for accessibility issues, save report to docs/a11y-audit.md
```
Claude will: Focus on accessibility, scan specific paths, save to custom location

## Interpreting Scores

| Score Range | Grade | Action |
|-------------|-------|--------|
| 90-100 | Excellent | Ship it! Minor polish only |
| 75-89 | Good | Address high-priority items before launch |
| 60-74 | Fair | Significant improvements needed |
| 40-59 | Poor | Major redesign required |
| 0-39 | Critical | Do not ship - serious issues |

**Category Weights:**
- CTAs (25%): Highest weight - directly impacts revenue
- Typography (20%): Critical for readability and brand
- Layout (20%): Foundation of good UX
- Accessibility (15%): Legal requirement + user experience
- Color (15%): Brand consistency + WCAG
- Micro-interactions (5%): Polish and feedback

## Style Guidelines

**Tone:**
- Expert but constructive - never condescending
- Specific and actionable - provide exact fixes
- Prioritize by impact - critical issues first
- Concise - minimal explanation, maximum value

**Output:**
- Copy-pasteable diffs whenever possible
- Line numbers for easy navigation
- Business impact explanation for stakeholder buy-in
- Quick wins highlighted separately

## Integration with vNetwork Project

For this specific project (vNetwork travel sites), pay special attention to:

1. **Travel-specific CTAs**: Hotel bookings, restaurant reservations, tour bookings
2. **Map integrations**: Google Maps embeds, location cards
3. **Content hierarchy**: Articles, neighborhoods, cities, regions
4. **Mobile-first**: Travelers primarily use mobile devices
5. **Image-heavy layouts**: Optimize for performance and visual appeal
6. **Multilingual support**: Text overflow, RTL languages (if applicable)

## Additional Resources

**WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
**Contrast Checker**: https://webaim.org/resources/contrastchecker/
**Tailwind CSS**: https://tailwindcss.com/docs
**Next.js Image**: https://nextjs.org/docs/api-reference/next/image
