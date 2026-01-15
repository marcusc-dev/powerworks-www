# PowerWorks Garage — Website Rebuild PRD (Product Requirements Document)
**Version:** 1.0  
**Date:** YYYY-MM-DD  
**Owner:** PowerWorks Garage  
**Prepared for:** Claude Code Development Workflow  
**Status:** Approved for Development  

## 1. Purpose & Vision
PowerWorks Garage requires a modern, high-performance, AI-optimized website that:
- Generates more inquiries  
- Builds a premium British-owned brand identity  
- Ranks in Google Search  
- Ranks in LLM/AI Search  
- Converts users via WhatsApp  
- Supports fleet growth  

## 2. Business Objectives
### 2.1 Traffic & Acquisition
- +150–250 monthly inquiries within 6–9 months  
- Top 3 ranking for 20+ keywords  
- Consistent presence in AI answers  

### 2.2 Brand
- Establish PowerWorks as Dubai’s trusted British-owned mechanic  

### 2.3 Revenue
- Increase retail bookings  
- Double fleet contracts  

## 3. Scope
### In Scope
- Full website rebuild (Next.js)  
- 30–40 optimized pages  
- WhatsApp workflows  
- Review engine  
- Fleet pages  
- Schema  
- Content templates  

### Out of Scope
- Complex CRM, payments, mobile apps  

## 4. User Personas
- Retail car owners  
- Fleet managers  
- LLM search engines (ChatGPT, Gemini)  

## 5. Value Proposition
British-quality automotive servicing + transparency + trust.

## 6. Functional Requirements
### 6.1 Pages
#### Homepage
- Hero: “British-Owned Car Repair Specialists in Dubai”  
- WhatsApp CTA  
- Reviews, services, bento boxes  
- Ask Glenn preview  
- Brand logos  

#### Service Pages (15–20)
Template includes:
- Pain-point intro  
- Symptoms checklist  
- Process steps  
- Pricing  
- Reasons to choose PW  
- Before/after  
- FAQs  
- WhatsApp CTA  

#### Location Pages
- Al Quoz, Dubai Marina, JVC  

#### Fleet Page
- SLAs, pickup/dropoff, invoicing, case studies  

#### About / British Standards  
#### Meet the Technicians  
#### Ask Glenn  
#### Blog  

### 6.2 Global Requirements
- WhatsApp Integration  
- Review engine  
- Booking form  
- Schema (LocalBusiness, AutoRepair, FAQ, Reviews)  
- Mega-menu navigation  

## 7. Non‑Functional Requirements
- Load < 2.5s  
- Lighthouse ≥ 85  
- Structured content for LLMs  
- HTTPS  
- Component-based architecture  

## 8. Technical Requirements
- Next.js, React, Tailwind  
- Optional Supabase CMS  

## 9. Information Architecture
/home  
/about  
/british-standards  
/meet-the-team  
/ask-glenn  
/services/...  
/locations/...  
/fleet-services  
/blog  
/contact  

## 10. Content Templates
Service page template includes:
- Symptoms  
- Process  
- Pricing table  
- FAQs  
- WhatsApp CTA  

## 11. Acceptance Criteria
- All pages complete  
- Schema validated  
- WhatsApp tested  
- Lighthouse ≥ 85  
- LLM‑friendly structure  

## 12. Risks & Constraints
- Content volume  
- Internal linking quality  

## 13. Future Enhancements
- Booking engine  
- AI symptom checker  
- Fleet dashboard  

## 14. Notes for Claude Code
Use this PRD as the authoritative spec for all development.
