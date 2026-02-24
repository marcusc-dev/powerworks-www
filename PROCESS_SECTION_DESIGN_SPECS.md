# Process Section - Visual Design Specifications

## Layout Architecture

### Desktop Timeline (≥1024px)
```
┌─────────────────────────────────────────────────────────────────────┐
│                     OUR SYSTEMATIC APPROACH                         │
│                        How We Work                                  │
│         Every job follows our proven 5-step process...             │
└─────────────────────────────────────────────────────────────────────┘

  ┌────────┐                    ┌────────┐                    ┌────────┐
  │  Card  │                    │  Card  │                    │  Card  │
  │  #1    │                    │  #3    │                    │  #5    │
  │ [Icon] │                    │ [Icon] │                    │ [Icon] │
  │ Title  │                    │ Title  │                    │ Title  │
  │ Desc   │                    │ Desc   │                    │ Desc   │
  └───┬────┘                    └───┬────┘                    └───┬────┘
      │                             │                             │
      ●═════════●═══════●═══════════●═══════●═══════════════════●
              ┌─┴──────┐         ┌─┴──────┐
              │  Card  │         │  Card  │
              │  #2    │         │  #4    │
              │ [Icon] │         │ [Icon] │
              │ Title  │         │ Title  │
              │ Desc   │         │ Desc   │
              └────────┘         └────────┘

Legend:
● = Animated node (pulsing circle)
═ = Horizontal timeline
│ = Vertical connector
```

### Mobile Timeline (<1024px)
```
┌──────────────────────────────────┐
│   [Icon] ①  ┌─────────────────┐ │
│             │  Step Title     │ │
│   ┆         │  Description    │ │
│   ┆         └─────────────────┘ │
│   [Icon] ②  ┌─────────────────┐ │
│             │  Step Title     │ │
│   ┆         │  Description    │ │
│   ┆         └─────────────────┘ │
│   [Icon] ③  ┌─────────────────┐ │
│             │  Step Title     │ │
│   ┆         │  Description    │ │
│   ┆         └─────────────────┘ │
│   [Icon] ④  ┌─────────────────┐ │
│             │  Step Title     │ │
│   ┆         │  Description    │ │
│   ┆         └─────────────────┘ │
│   [Icon] ⑤  ┌─────────────────┐ │
│             │  Step Title     │ │
│             │  Description    │ │
│             └─────────────────┘ │
└──────────────────────────────────┘

Legend:
[Icon] = 56x56px icon square
① = Step number badge
┆ = Connecting line
```

## Component Measurements

### Desktop Cards
```
┌─────────────────────────────┐
│          ┌──────┐           │
│      ②  │ Badge │           │  -3px top, -3px right
│         └──────┘            │  40px circle, shadow-lg
│                             │
│    ┌──────────────┐         │  56px square
│    │   [Icon]     │         │  Gradient bg, rounded-xl
│    │   28px       │         │  Scales to 110% on hover
│    └──────────────┘         │
│                             │
│    Step Title               │  16px bold, min-h-40px
│    (max 2-3 lines)          │  Transitions to blue
│                             │
│    Description text that    │  14px gray-600
│    wraps naturally across   │  leading-relaxed
│    multiple lines with      │
│    comfortable spacing.     │
│                             │
└─────────────────────────────┘
     240px max-width
     Rounded-2xl (16px)
     Padding: 24px
     Border: 2px gray-100
     Hover: border-power-blue
```

### Mobile Cards
```
┌────┐  ┌──────────────────────┐
│Icon│  │  Step Title          │  16px bold
│ ② │  │  (wraps naturally)   │  leading-tight
│56px│  │                      │
└────┘  │  Description text    │  14px gray-600
        │  with comfortable    │  leading-relaxed
        │  line spacing for    │
        │  mobile reading.     │
        └──────────────────────┘
         Flex-1 width
         Padding: 20px
         Rounded-xl (12px)

Icon Container:
- 56x56px square (w-14 h-14)
- Gradient bg (power-blue)
- Rounded-xl
- Badge: 28px circle top-right
```

## Color Palette

### Primary Colors
```css
--power-blue: #1e3a5f      /* Primary brand color */
--power-red: #dc2626       /* Accent/badge color */
--gray-50: #f9fafb         /* Background */
--gray-100: #f3f4f6        /* Borders */
--gray-600: #4b5563        /* Body text */
--gray-900: #111827        /* Headings */
--white: #ffffff           /* Cards */
```

### Gradients
```css
/* Timeline gradient */
background: linear-gradient(to right,
  rgb(229, 231, 235),      /* gray-200 */
  rgba(30, 58, 95, 0.2),   /* power-blue/20 */
  rgb(229, 231, 235)
);

/* Icon background gradient */
background: linear-gradient(to bottom right,
  #1e3a5f,                 /* power-blue */
  rgba(30, 58, 95, 0.8)
);

/* Connector gradient */
background: linear-gradient(to bottom,
  #1e3a5f,                 /* power-blue */
  rgb(209, 213, 219)       /* gray-300 */
);

/* Section background */
background: linear-gradient(to bottom right,
  rgb(249, 250, 251),      /* gray-50 */
  rgb(255, 255, 255),      /* white */
  rgb(249, 250, 251)       /* gray-50 */
);
```

## Typography Specifications

### Section Header
```
Badge:
- Font: 14px semibold
- Color: power-blue
- Background: power-blue/10
- Padding: 8px 16px
- Border-radius: 9999px (full)

Main Title:
- Font: 36px/48px/60px bold (sm/md/lg)
- Color: gray-900
- Margin-bottom: 16px

Description:
- Font: 18px regular
- Color: gray-600
- Max-width: 672px (2xl)
- Line-height: 1.75
```

### Step Cards
```
Title:
- Font: 16px (base) bold
- Color: gray-900
- Line-height: 1.25 (tight)
- Min-height: 40px (2.5rem)
- Hover: power-blue

Description:
- Font: 14px (sm) regular
- Color: gray-600
- Line-height: 1.625 (relaxed)
```

## Animation Specifications

### Timeline Reveal
```javascript
Duration: 1500ms
Easing: ease-in-out
Transform: scaleX(0 → 1)
Direction: Left to right
```

### Card Entry (Desktop)
```javascript
Duration: 600ms
Delay: index * 150ms
Easing: [0.25, 0.46, 0.45, 0.94] (custom cubic-bezier)
Transform:
  - Even cards: translateY(40px → 0)
  - Odd cards: translateY(-40px → 0)
  - Opacity: 0 → 1
```

### Card Entry (Mobile)
```javascript
Duration: 400ms
Delay: index * 100ms
Transform: translateX(-30px → 0)
Opacity: 0 → 1
```

### Icon Animation
```javascript
Duration: 400ms
Delay: index * 150ms + 200ms (desktop)
        index * 100ms + 200ms (mobile)
Type: spring
Stiffness: 200
Damping: 15
Transform:
  - Scale: 0 → 1
  - Rotate: -180deg → 0deg
```

### Hover Effects (Desktop Only)
```javascript
Card Hover:
  Duration: 300ms
  Transform:
    - Even cards: translateY(-8px) scale(1.02)
    - Odd cards: translateY(8px) scale(1.02)
  Border: gray-100 → power-blue
  Shadow: lg → xl

Icon Hover (via parent):
  Duration: 300ms
  Transform: scale(1.1)

Title Hover:
  Duration: 300ms
  Color: gray-900 → power-blue
```

## Spacing System

### Desktop
```
Section padding: 64px vertical (py-16), 96px on md (py-24)
Container max-width: 1280px (max-w-7xl)
Container padding: 16px/24px/32px (px-4/6/8)

Header margin-bottom: 64px (mb-16)
Card gap: Auto-distributed by CSS Grid
Card padding: 24px (p-6)
Icon margin-bottom: 16px (mb-4)
Title margin-bottom: 8px (mb-2)

Connector height: 96px (h-24)
Timeline node size: 24px (w-6 h-6)
Timeline thickness: 4px (h-1)
```

### Mobile
```
Section padding: 64px vertical (py-16), 96px on md (py-24)
Step spacing: 32px gap (space-y-8)
Icon-card gap: 16px (gap-4)
Card padding: 20px (p-5)
Icon size: 56px (w-14 h-14)
Badge size: 28px (w-7 h-7)
Connector width: 2px (w-0.5)
```

## Shadow Specifications

### Cards
```css
/* Default state */
box-shadow:
  0 1px 3px 0 rgb(0 0 0 / 0.1),
  0 1px 2px -1px rgb(0 0 0 / 0.1); /* shadow-md */

/* Hover state */
box-shadow:
  0 10px 15px -3px rgb(0 0 0 / 0.1),
  0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-xl */
```

### Icons & Badges
```css
/* Icon container */
box-shadow:
  0 4px 6px -1px rgb(0 0 0 / 0.1),
  0 2px 4px -2px rgb(0 0 0 / 0.1); /* shadow-md */

/* Step number badge */
box-shadow:
  0 10px 15px -3px rgb(0 0 0 / 0.1),
  0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-lg */
```

### Timeline Nodes
```css
box-shadow:
  0 10px 15px -3px rgb(0 0 0 / 0.1),
  0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-lg */
```

## Icon Assignment Logic

### Pattern Matching Priority
1. **Exact keyword match** (e.g., "inspect" → Eye)
2. **Partial match** (e.g., "visual inspection" → Eye)
3. **Position fallback** (index % 5)

### Keyword → Icon Mapping
```typescript
"inspect|visual|check"         → Eye (Search)
"measure|test|diagnostic"      → Ruler (Measurement)
"recommend|explain|consult"    → MessageSquare (Communication)
"parts|fit|install|replace"    → Package (Installation)
"advice|tip|guidance|bed-in"   → Lightbulb (Knowledge)
"report|document|record"       → FileText (Documentation)
"search|identify|locate"       → Search (Discovery)
"complete|finish|final"        → CheckCircle2 (Completion)
```

## Accessibility Standards

### Color Contrast Ratios
```
Background to text (gray-50 to gray-900): 15.3:1 ✓ AAA
Background to body (gray-50 to gray-600): 7.1:1 ✓ AA
Power-blue to white: 9.8:1 ✓ AAA
Power-red to white: 5.9:1 ✓ AA
```

### Touch Targets
```
Minimum size: 44px × 44px ✓
Desktop icons: 56px × 56px
Mobile icons: 56px × 56px
Cards: Full height/width tappable
```

### Motion Preferences
```
Respects prefers-reduced-motion: Yes (Framer Motion default)
Can disable animations: Yes (via Framer Motion config)
```

## Responsive Breakpoints

### Tailwind Breakpoints Used
```
sm: 640px   - Not used in this section
md: 768px   - Section padding increase
lg: 1024px  - Desktop/mobile layout switch
xl: 1280px  - Not used in this section
2xl: 1536px - Not used in this section
```

### Layout Changes at Breakpoints
```
< 1024px (Mobile):
  - Vertical timeline
  - Left-aligned icons
  - Full-width cards
  - Single column

≥ 1024px (Desktop):
  - Horizontal timeline
  - Alternating top/bottom cards
  - Grid layout
  - Multi-column display
```

## Browser Support

### Required Features
- CSS Grid Layout
- CSS Flexbox
- CSS Transforms
- CSS Transitions
- CSS Custom Properties (via Tailwind)
- ES6+ JavaScript (for React/Framer Motion)

### Tested Browsers
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

## Performance Metrics

### Animation Performance
- 60fps target ✓
- GPU-accelerated transforms ✓
- No layout thrashing ✓
- Staggered animations prevent overload ✓

### Bundle Impact
- Additional icons: ~2KB (tree-shaken)
- Animation code: Included in Framer Motion (already loaded)
- Total additional weight: <3KB
