# UI/UX Design Review Agent - Quick Start

## Installation Complete! ✅

Your new UI/UX Design Review Agent has been created with the following components:

### 📁 Files Created

```
.claude/skills/uiux-reviewer/
├── SKILL.md           # Main skill definition (auto-loaded by Claude)
├── README.md          # Comprehensive documentation
└── QUICKSTART.md      # This file

scripts/
├── ui_audit.mjs       # Live page audit (Puppeteer + Axe)
└── ui_collect_css.mjs # Static code analysis

package.json           # Updated with dependencies
```

## Next Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `puppeteer` - For browser automation and screenshots
- `axe-core` - For accessibility testing (WCAG AA/AAA)
- `glob` - For file pattern matching

### 2. Test the Skill

**Option A: Via Claude (Recommended)**
```
Review the UI/UX of our homepage
```

**Option B: Run scripts manually**
```bash
# Start dev server
npm run dev

# In another terminal - Live page audit
npm run ui:audit

# Static code analysis
npm run ui:tokens
```

### 3. View Results

Audit artifacts are saved to `tmp/ui-audit/`:
```bash
# View summary
cat tmp/ui-audit/summary.json | jq

# View accessibility issues
cat tmp/ui-audit/axe-mobile.json | jq '.violations'

# View screenshots
open tmp/ui-audit/screenshot-mobile.png
```

## How to Use the Skill

### Automatic Invocation

Claude will automatically use this skill when you ask:
- "Review the UI/UX"
- "Audit accessibility"
- "Check mobile responsiveness"
- "Optimize conversion rates"
- "Is this WCAG compliant?"

### Manual Invocation

Use the Skill tool explicitly:
```
skill: uiux-reviewer
```

### With Parameters

**Focus on mobile:**
```
Audit http://localhost:3000 focusing on mobile conversion
```

**Focus on accessibility:**
```
Review components/BookingForm.tsx for accessibility issues
```

**Custom report location:**
```
Audit the checkout page and save report to docs/ux-audit.md
```

## What You'll Get

### 📊 Scorecard (0-100)
Weighted scores across 6 categories:
- Typography (20%)
- Layout & Spacing (20%)
- Color & Contrast (15%)
- Accessibility (15%)
- CTAs & Conversion (25%)
- Micro-interactions (5%)

### 🔥 Top Priority Fixes
The 3-5 most impactful issues with:
- Why it matters
- Business impact (conversion %, WCAG compliance)
- Copy-pasteable code diffs
- Estimated time to fix

### 📝 Detailed Findings
Per-category analysis with:
- Strengths ✓
- Issues ✗
- File paths and line numbers
- Exact fixes

### 🎨 Code Snippets
Ready-to-use Tailwind/React components:
- Optimized CTA buttons
- Typography scale configuration
- Accessible form inputs

### 💡 A/B Test Ideas
Conversion optimization suggestions:
- CTA copy variations
- Placement strategies
- Trust signal additions

## Design System Standards

The agent enforces Visit.Network's design standards:

**Typography:** Major Third scale (16px base × 1.25 ratio)
**Spacing:** 8-point grid (8, 16, 24, 32...)
**Colors:** 60/30/10 distribution, WCAG AA (4.5:1 contrast)
**CTAs:** 48px minimum height, above fold, strong labels
**Accessibility:** Semantic HTML, focus indicators, 44px touch targets

## Example Output

```markdown
# UI/UX Audit Report

## 📊 Scorecard (0-100)
| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Typography | 85/100 | 20% | 17.0 |
| CTAs | 65/100 | 25% | 16.25 |
| **TOTAL** | **77.15** | | **77.15** |

**Overall Grade**: Good - Minor improvements needed

## 🔥 Top Priority Fixes

### 1. CTA Not Visible Above Fold - `app/page.tsx:45`
**Why**: Primary booking CTA requires scrolling on mobile
**Impact**: 30-40% conversion loss
**Score Impact**: -15 pts (CTAs)

**Fix**:
```diff
- <section className="mt-32">
+ <section className="mt-8 md:mt-16">
    <BookingCTA />
  </section>
```
```

## Troubleshooting

**"Cannot find module 'puppeteer'"**
```bash
npm install
```

**"Port 3000 already in use"**
```bash
# Use different port
npm run dev -- -p 3001
node scripts/ui_audit.mjs http://localhost:3001
```

**"Permission denied"**
```bash
chmod +x scripts/ui_audit.mjs scripts/ui_collect_css.mjs
```

## Available npm Scripts

```bash
npm run ui:audit    # Run live page audit on localhost:3000
npm run ui:tokens   # Run static CSS analysis
```

## More Information

- Full documentation: `.claude/skills/uiux-reviewer/README.md`
- Skill definition: `.claude/skills/uiux-reviewer/SKILL.md`
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Contrast Checker: https://webaim.org/resources/contrastchecker/

## Test It Now!

Try asking Claude:

```
Review the UI/UX of our homepage at http://localhost:3000
with focus on mobile conversion and accessibility
```

The agent will:
1. Launch Puppeteer and audit the live page
2. Analyze your code for design system violations
3. Generate a comprehensive scored report
4. Provide copy-pasteable fixes
5. Suggest A/B test opportunities

---

**Ready to audit!** 🚀

Just start your dev server and ask Claude to review your UI/UX.
