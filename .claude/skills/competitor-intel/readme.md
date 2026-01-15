# competitor-intel (Claude Code Skill)

## What it does
Analyzes competitor websites for:
- IA (structure & coverage)
- SEO (on-page + internal linking + schema)
- AEO (LLM visibility: direct answers, FAQs, steps, price guidance)
- UX/conversion (WhatsApp flows, CTAs, trust)
Outputs an actionable Next.js 16 build backlog + component specs.

## How to use
1) Edit inputs.json to add/remove competitors or change crawl limits.
2) Run the skill in Claude Code.
3) Paste outputs into:
   - /docs/seo/
   - Jira backlog
   - Next.js component specs

## Recommended workflow
- Run once to generate “baseline backlog”
- Run again after you implement templates (compare your staging pages)
- Re-run monthly when competitors change
