# 13. Risks and Open Questions

## Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Name confusion or trademark conflict with a large existing brand (the "Get ... Guide" family) | Medium | High | Trademark search in target markets before printing at scale; keep Guidr spelling and footprint identity distinct; avoid look-alike colours and phrasing |
| R2 | Off-platform bookings reduce commission | High | Medium | Reviews, vouchers, trip tools, repeat-traveller perks, agreement terms, honest relationship with operators |
| R3 | Operators ignore requests | Medium | High | 24-hour expiry, reminders, ranking by response time, WhatsApp-first notices |
| R4 | Payment fraud or fake proof of payment | Medium | Medium | Operator must verify in their bank; reference codes; reject proofs; warnings on the page |
| R5 | Free AI models unreliable | High | Low to Medium | Fallback chain, scripted mode, retrieval-first validation, config-driven upgrade |
| R6 | Single server failure | Medium | High | Backups, offsite copies, rebuild runbook, uptime alerts, marketing site hosted elsewhere |
| R7 | Ops agent causes damage | Low | High | Allowlist tools, approval tiers, audit log, separate credentials, drills |
| R8 | Price data goes stale or is wrong | High | Medium | Source notes, `checked_on`, refresh cadence, "from" pricing, demo tags |
| R9 | Legal gaps (data protection, tourism licensing, consumer law, VAT) | Medium | High | Lawyer review of terms, privacy, operator agreement; accountant on invoices |
| R10 | Low image resolution looks cheap | High | Medium | Regenerate heroes at 2400 px; show photos at appropriate sizes |
| R11 | AI-generated people mislead | Low | Medium | Label as demo; replace with real photography before launch |
| R12 | Performance on slow networks | Medium | High | Budgets, CDN, lazy loading, reduced motion on low-end devices |
| R13 | Safety incidents on tours | Low | High | Operator licensing and insurance checks, safety page, incident process, clear liability terms |
| R14 | Data breach | Low | High | Least privilege, encryption, minimal data, monitoring, incident plan |
| R15 | Scope creep | High | Medium | Roadmap exit criteria; backlog for later items |
| R16 | WhatsApp Business verification delays | Medium | Medium | Start early; keep click-to-chat as the base experience |

## Open questions (need an answer)

1. Final backend: Convex or Postgres (D1)?
2. Which legal entity owns the Guidr billing and bank account (D2)? This decides which payment services are possible later.
3. What are the monthly fee and commission percentage (D3)?
4. Does Guidr approve every operator and listing manually at launch (proposed: yes)?
5. Are guest bookings allowed with name, email and WhatsApp only (proposed: yes)?
6. Which Hetzner region and what is acceptable latency (D4)?
7. Which email and storage providers (D5, D6)?
8. Will real operators be onboarded before launch, or is the first release a labelled demo (D7)?
9. German at launch (D8)?
10. Final social handles (D9)?
11. Who owns the server day to day, and who is on call?
12. Which payment-link providers do the first operators use, and do they support a reference parameter?
13. Insurance and licensing evidence required from operators?
14. What VAT and invoice rules apply to Guidr's fees?
15. How will refunds be evidenced when operators pay them outside Guidr?
16. What is the customer-support promise (hours, WhatsApp number, response time)?
17. Is the mobile app planned for iOS and Android, and on what timeline?

## Assumptions to confirm
- Hetzner data-centre locations and pricing.
- OpenRouter free-model availability and JSON support.
- Self-hosted Convex maturity and backup tooling (if chosen).
- Namibian data-protection law status and its application to a site hosted abroad.
- Current rules for WhatsApp Business templates and fees.
- Cloudflare terms for the intended use.
