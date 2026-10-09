# Guidr Project Pack

Everything needed to plan, design and build **Guidr**, a marketplace for guided tours and activities in Namibia, launching at the coast (Swakopmund and Walvis Bay).

- **Brand:** Guidr (wordmark plus footprint icon)
- **Domain:** `getguidr.com` (brand stays "Guidr"; only the web address differs because `guidr.com` is taken)
- **Version:** 1.0, October 2026
- **Prepared by:** Tangison Studio, a division of Tangison Technologies (studio.tangison.com)
- **Status:** planning pack. Nothing here is built yet. Items marked **[VERIFY]** are from memory or from unreliable sources and must be checked before relying on them. Items marked **[DECIDE]** are open decisions.

## How to read this pack

| File | What it is |
|---|---|
| `docs/00-DECISIONS.md` | Locked decisions, proposed defaults and open decisions. Read first. |
| `docs/01-PRODUCT-SPEC.md` | What Guidr is, who it serves, features, rules, KPIs. |
| `docs/02-PAGES-CHECKLIST.md` | Every page and screen, from the loading screen to the privacy policy, with acceptance criteria. |
| `docs/03-BOOKING-AND-PAYMENTS.md` | Booking state machine, EFT and payment-link flows, operator billing. |
| `docs/04-DATA-MODEL.md` | Entities and fields, with Convex and Postgres variants. |
| `docs/05-TECH-ARCHITECTURE.md` | Stack, hosting (Vercel plus Hetzner), security, backups, observability. |
| `docs/06-AI-AGENTS.md` | The traveller-facing planner agent and the server-ops agent. |
| `docs/07-DESIGN-SYSTEM.md` | Design taste, tokens, components, voice. |
| `docs/08-MOTION-AND-ASSETS.md` | Image inventory, cut-outs, animation spec, asset pipeline. |
| `docs/09-CATALOGUE-AND-PRICING.md` | The 16 launch experiences with price references. |
| `docs/10-CONTENT-AND-LEGAL.md` | Copy, message templates, legal outlines. |
| `docs/11-QA-AND-LAUNCH.md` | Test plan, quality budgets, launch checklist. |
| `docs/12-ROADMAP.md` | Phases and milestones. |
| `docs/13-RISKS-AND-OPEN-QUESTIONS.md` | Risks, mitigations and what is still unknown. |
| `skills/*/SKILL.md` | Six working skills for an AI coding or design assistant. |

## The skills

| Skill | Use it when |
|---|---|
| `guidr-web-build` | Building any page, component or API route of the site or app. |
| `guidr-design-taste` | Designing, reviewing or critiquing any interface or graphic. |
| `guidr-ai-planner` | Working on the traveller-facing AI trip planner. |
| `guidr-server-ops` | Operating the Hetzner servers, deployments and backups. |
| `guidr-content` | Writing copy, listings, emails, WhatsApp messages or legal text. |
| `guidr-asset-pipeline` | Preparing photos, cut-outs and animation assets. |

## Principles that run through everything

1. **Premium and calm.** Editorial photography, generous space, one accent per screen.
2. **WhatsApp first.** Every key moment has a WhatsApp path.
3. **Guidr never holds the money** in version 1. Travellers pay operators by bank transfer or the operator's own payment link.
4. **Honest data.** The AI and the interface only show prices and availability that come from real records.
5. **Fast on a bad network.** Namibia's mobile networks vary; budgets in `11-QA-AND-LAUNCH.md` are binding.
