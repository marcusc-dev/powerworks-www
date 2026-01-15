# Powerworks Garage Dubai - Consolidated Execution Plan

> Single source of truth combining PRD requirements and UI/UX specifications

---

## Project Overview

**Business**: Powerworks Garage - British-owned car repair specialists in Dubai
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
**Target**: 30-40 pages, mobile-first, SEO-optimized

---

## Phase 1: Foundation + Homepage

### 1.1 Project Setup
- [ ] Configure Next.js 15 App Router structure
- [ ] Set up Tailwind with custom theme (colors, fonts, breakpoints)
- [ ] Configure Framer Motion for animations
- [ ] Set up ESLint, Prettier, TypeScript strict mode
- [ ] Create folder structure: `/components`, `/app`, `/lib`, `/styles`

### 1.2 Design Tokens
```
Colors:
- Primary Blue: #1E3A5F
- Accent Orange: #F26522
- British Racing Green: #004225
- Light Gray BG: #F5F5F5
- White: #FFFFFF

Fonts:
- Headings: Montserrat (700, 600)
- Body: Open Sans (400, 600)

Breakpoints:
- Mobile: 320px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px
```

### 1.3 Shared Components
- [ ] **Header/Navbar**
  - Sticky on scroll with backdrop blur
  - Logo left, nav center, CTA right
  - Mobile hamburger menu with slide-in drawer
  - Dropdowns: Services (mega-menu), About, Locations
  - Trust badge: "British-Owned Since 2015"
  - CTA: "Book Now" button (orange)

- [ ] **Footer**
  - 4-column layout: About, Services, Locations, Contact
  - Social links, Google Reviews badge
  - Copyright, Privacy, Terms links

- [ ] **BentoBox Grid Component**
  - Flexible grid system for service showcases
  - Supports 2x2, 3x2, custom layouts
  - Hover animations (scale, shadow lift)

- [ ] **ServiceCard Component**
  - Icon + Title + Short description
  - Hover state with arrow indicator
  - Links to service detail page

- [ ] **TestimonialCarousel**
  - Auto-rotating Google reviews
  - Star ratings display
  - Customer name + vehicle type

- [ ] **CTABanner Component**
  - Reusable call-to-action sections
  - Primary and secondary variants

### 1.4 Homepage Sections

#### Hero Section
- [ ] Split layout: Content left (60%), Image right (40%)
- [ ] Headline: "British-Owned & Trusted Car Repair Specialists in Dubai"
- [ ] Subheadline: "From Ferraris to family cars..."
- [ ] Dual CTAs: "Book a Service" (primary), "Get a Quote" (secondary)
- [ ] Trust indicators row: Years in business, cars serviced, 5-star rating
- [ ] Glenn cutout image with gradient fade
- [ ] Subtle background pattern/texture

#### Services Bento Grid
- [ ] 6-8 service cards in bento layout
- [ ] Categories: General Servicing, Diagnostics, AC Repair, Brakes, Engine, Transmission, Electrical, Pre-Purchase
- [ ] "View All Services" link

#### Why Choose Us
- [ ] 4 feature cards with icons
- [ ] British Standards, Genuine Parts, Transparent Pricing, All Makes Welcome
- [ ] Optional: Short video embed or animation

#### Meet Glenn / Ask Glenn Preview
- [ ] Glenn photo with brief intro
- [ ] "30+ years experience" highlight
- [ ] Sample FAQ questions (3)
- [ ] CTA: "Ask Glenn a Question"

#### Testimonials
- [ ] Google Reviews integration display
- [ ] 3-5 rotating testimonials
- [ ] Overall rating badge

#### Location Preview
- [ ] Map or visual showing Dubai locations
- [ ] Al Quoz (main), Dubai Marina, JVC
- [ ] Quick contact info per location

#### Final CTA Banner
- [ ] "Ready to Book?" section
- [ ] Phone number prominent
- [ ] WhatsApp link
- [ ] Online booking button

---

## Phase 2: Service Pages

### 2.1 Service Page Template
- [ ] Create reusable template component
- [ ] Structure:
  - Hero with service name + image
  - Overview paragraph
  - What's Included (checklist)
  - Our Process (numbered steps)
  - Pricing indicator (from AED X)
  - FAQ accordion (3-5 questions)
  - Related Services
  - CTA Banner

### 2.2 Service Pages to Create (15-20)
- [ ] General Car Servicing
- [ ] Minor Service
- [ ] Major Service
- [ ] Car Diagnostics
- [ ] AC Repair & Regas
- [ ] Brake Service & Repair
- [ ] Engine Repair
- [ ] Transmission Service
- [ ] Electrical Repairs
- [ ] Battery Replacement
- [ ] Oil Change
- [ ] Tire Services
- [ ] Suspension & Steering
- [ ] Pre-Purchase Inspection
- [ ] Car Recovery Service
- [ ] Fleet Maintenance

---

## Phase 3: Supporting Pages

### 3.1 About Pages
- [ ] **About Us / Our Story**
  - British heritage narrative
  - Timeline/history
  - Mission & values

- [ ] **British Standards**
  - What it means
  - Quality commitments
  - Certifications

- [ ] **Meet the Technicians**
  - Team photos and bios
  - Specializations
  - Experience highlights

### 3.2 Location Pages (3)
- [ ] **Al Quoz** (Primary location)
- [ ] **Dubai Marina**
- [ ] **JVC (Jumeirah Village Circle)**

Each includes:
- Address, map embed
- Opening hours
- Contact details
- Services available
- Directions/parking info
- LocalBusiness schema

### 3.3 Fleet Services Page
- [ ] B2B focused content
- [ ] Fleet management benefits
- [ ] Volume pricing mention
- [ ] Contact form for fleet inquiries

### 3.4 Contact Page
- [ ] All locations contact info
- [ ] Contact form
- [ ] WhatsApp integration
- [ ] Google Maps embed
- [ ] Operating hours

---

## Phase 4: Content & SEO

### 4.1 Ask Glenn Section
- [ ] **Ask Glenn Page**
  - Question submission form
  - FAQ categories
  - Video responses (if available)
  - Search functionality

### 4.2 Blog Structure
- [ ] Blog listing page with filters
- [ ] Blog post template
- [ ] Categories: Tips, News, Guides
- [ ] Author attribution (Glenn)
- [ ] Related posts

### 4.3 SEO Implementation
- [ ] **Schema Markup**
  - LocalBusiness (per location)
  - AutoRepair service schema
  - FAQ schema on relevant pages
  - Review/Rating schema
  - BreadcrumbList

- [ ] **Meta & OG Tags**
  - Unique titles per page
  - Meta descriptions
  - OG images
  - Twitter cards

- [ ] **Technical SEO**
  - XML sitemap
  - robots.txt
  - Canonical URLs
  - Internal linking strategy
  - Image alt texts
  - Core Web Vitals optimization

---

## Phase 5: Integrations & Launch

### 5.1 Third-Party Integrations
- [ ] Google Reviews API/widget
- [ ] WhatsApp Business link
- [ ] Google Maps embeds
- [ ] Analytics (GA4)
- [ ] Google Search Console

### 5.2 Optional Enhancements
- [ ] Supabase CMS for blog/testimonials
- [ ] Online booking system integration
- [ ] Live chat widget

### 5.3 Pre-Launch Checklist
- [ ] Cross-browser testing
- [ ] Mobile responsiveness audit
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Form testing
- [ ] 404 page
- [ ] SSL verification
- [ ] Analytics verification

---

## File Structure

```
/app
  /page.tsx (homepage)
  /about
    /page.tsx
    /british-standards/page.tsx
    /team/page.tsx
  /services
    /page.tsx (listing)
    /[slug]/page.tsx (template)
  /locations
    /al-quoz/page.tsx
    /dubai-marina/page.tsx
    /jvc/page.tsx
  /fleet/page.tsx
  /ask-glenn/page.tsx
  /blog
    /page.tsx
    /[slug]/page.tsx
  /contact/page.tsx

/components
  /layout
    /Header.tsx
    /Footer.tsx
    /MobileMenu.tsx
  /ui
    /Button.tsx
    /Card.tsx
    /BentoGrid.tsx
    /ServiceCard.tsx
    /TestimonialCarousel.tsx
    /CTABanner.tsx
    /Accordion.tsx
  /sections
    /Hero.tsx
    /ServicesGrid.tsx
    /WhyChooseUs.tsx
    /AskGlennPreview.tsx
    /Testimonials.tsx
    /LocationPreview.tsx

/lib
  /constants.ts
  /utils.ts
  /seo.ts

/styles
  /globals.css

/public
  /images
  /icons
```

---

## Priority Order

1. **Now**: Phase 1 (Foundation + Homepage)
2. **Next**: Phase 2 (Service Pages)
3. **Then**: Phase 3 (Supporting Pages)
4. **Finally**: Phase 4 & 5 (Content, SEO, Launch)

---

*This document supersedes powerworks-prd.md and powerworks-plan.md for execution purposes.*