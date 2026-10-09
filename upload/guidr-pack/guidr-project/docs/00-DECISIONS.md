# 00. Decisions

## Locked

| Area | Decision |
|---|---|
| Brand | Guidr. Wordmark, footprint icon, palette and Poppins type as in the brand identity kit. |
| Domain | `getguidr.com`. Subdomains: `app.` (traveller web app), `ops.` (operator portal), `status.` (uptime page). **[VERIFY]** availability and register `getguidr.app` for the future mobile app. |
| Scope now | Marketing site plus a logged-in web app. The mobile app is shown as "coming soon" with a waitlist. |
| Payments v1 | (1) Bank transfer (EFT) with proof-of-payment upload, confirmed by the operator. (2) The operator's own payment link. Guidr does not collect or hold traveller funds. |
| Operator billing | Monthly listing fee plus a commission on completed bookings, invoiced twice a month (1st and 16th). Paid by EFT or payment link. |
| WhatsApp | WhatsApp first. Click-to-chat links at launch; the WhatsApp Business Platform later. |
| Hosting | Marketing site on Vercel. App, database, workers and agents on a Hetzner server managed with Coolify or Dokploy. **[VERIFY]** Hetzner data-centre locations (to my knowledge Germany, Finland, the US and Singapore; not Switzerland). |
| Auth | Clerk. Roles: traveller, operator, operator staff, admin. |
| AI planner | OpenRouter free models now, with a fallback chain and a scripted last resort; switch to Claude when budget allows. Retrieval first. |
| Server-ops agent | A first responder with a command allowlist and human approval for risky actions. A human owns the server. |
| Design | Premium, editorial, warm. Rounded images. Footprint motif. See `07-DESIGN-SYSTEM.md`. |
| Credit | "Designed by Tangison Studio" in the brand kit; "Built by Tangison Studio" in the site footer. |

## Proposed defaults (change if you disagree)

| Area | Default | Reason |
|---|---|---|
| Operator onboarding | Manual approval of each operator and each first listing | Protects quality at launch |
| Guest checkout | Travellers may request a booking with name, email and WhatsApp number; an account is created lazily | Lowest friction; WhatsApp is the real identity |
| Currency | N$ is the base; USD shown as an option using one editable rate | Most operators price in N$ or USD |
| Language | English at launch; German next | Large German-speaking visitor segment **[VERIFY]** |
| Commission accrual | When a booking reaches COMPLETED | Avoids billing for no-shows and cancellations |
| Reviews | Only travellers with a COMPLETED booking can review | Keeps reviews trustworthy |
| Cancellation presets | Flexible (24 h), Moderate (48 h), Strict (7 days) | Simple for operators and travellers |

## Open decisions

| # | Decision | Options | Notes |
|---|---|---|---|
| D1 | Backend | Convex or Postgres | Both specified in `04-DATA-MODEL.md` and `05-TECH-ARCHITECTURE.md`. Guide below. |
| D2 | Legal entity that owns billing and the bank account | Namibian company, other | Affects any future gateway or Stripe use |
| D3 | Commission rate and monthly fee amounts | To be set | Placeholders used in the spec |
| D4 | Hosting region | Germany, Finland, other | Latency to Namibia vs cost vs data-law comfort |
| D5 | Email provider | Resend, Postmark, other | |
| D6 | Image storage and CDN | Cloudflare R2 plus Cloudflare, Hetzner object storage, other | |
| D7 | Operators before launch | Pre-seeded demo operators only, or real ones | Real prices need real operators |
| D8 | German language at launch | Yes or no | |
| D9 | Social handles | `@getguidr` assumed **[VERIFY]** | |

## Backend decision guide (D1)

Choose **Convex** if the team is TypeScript-heavy, you want real-time updates (chat, availability, booking status) with little code, and speed of building beats SQL flexibility. Confirm the maturity and backup story of self-hosted Convex before relying on it for bookings **[VERIFY]**.

Choose **Postgres** if bookings, invoices and reporting must be auditable with plain SQL, you want mature tooling (migrations, backups, replicas), or an accountant will query the data. This is the default for the transactional core.

A hybrid is possible: Postgres for bookings, invoices and users, with a real-time layer (LISTEN/NOTIFY, or Convex only for chat) for live features.

Whatever is chosen, keep data access behind a thin repository layer (`packages/data`) so the choice can change.
