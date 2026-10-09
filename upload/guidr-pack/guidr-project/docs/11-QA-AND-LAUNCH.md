# 11. QA and Launch

## 1. Quality budgets (binding)

| Metric | Target (mobile, 4G, mid-range Android) |
|---|---|
| Largest Contentful Paint | under 2.5 s (home), under 2.0 s (experience page) |
| Interaction to Next Paint | under 200 ms |
| Cumulative Layout Shift | under 0.1 |
| Total JS on first load (marketing) | under 180 KB gzipped |
| Home page first-load images | under 900 KB |
| Time to first byte | under 600 ms from Namibia (CDN-cached) |
| Lighthouse | Performance, Accessibility, Best Practices, SEO each 90 or higher |
| Error rate | under 0.5 percent of requests |
| Uptime | 99.5 percent monthly target for v1 |

## 2. Test plan

**Functional**
- Search and every filter combination; empty states; typo tolerance.
- Experience page for each of the 16; availability states; price math in N$ and USD.
- Booking happy path via EFT; via payment link; operator decline; expiry; cancellation by each side; proof rejection; dispute.
- Operator onboarding, listing wizard (all validation), calendar edits, billing run preview and send, late-payment pause.
- Admin approvals, moderation, audit log.
- Planner: all 20 evaluation prompts; fallback chain forced failures; scripted mode.
- Waitlist and contact forms; email delivery; WhatsApp links with correct prefilled text.

**Non-functional**
- Accessibility: keyboard-only runs, screen reader pass (VoiceOver and TalkBack), 200 percent zoom, colour contrast scan, reduced motion.
- Performance on throttled network (slow 4G) and a low-end Android device.
- Security: authorisation tests (can traveller A read traveller B's booking? can operator A edit operator B's listing?), upload abuse tests, rate-limit tests, dependency audit, header scan, basic penetration checklist (OWASP Top 10).
- Resilience: kill app container, kill database, fill disk (staging); verify alerts and recovery; restore a backup into a fresh instance.
- Browser and device matrix: Chrome and Safari latest, Firefox, Samsung Internet; small Android (360 px), iPhone SE, iPhone Pro, tablet, laptop.

**Content**
- Spelling and tone pass; every image has alt text; no real operator, person or brand claims in demo content; legal pages carry "draft" notice until reviewed.

## 3. Definition of done (feature)
Spec satisfied; design checked against the taste checklist; tests written and passing; accessibility checked; analytics events firing; error and empty states present; documented; reviewed by another person.

## 4. Launch checklist

**Business**
- [ ] Legal entity and bank account confirmed (D2)
- [ ] Fees and commission set (D3)
- [ ] Operator agreement, terms, privacy and cancellation text reviewed by a lawyer
- [ ] Accountant confirmed invoice format and VAT treatment
- [ ] Trademark and name search done for "Guidr" (and conflicts with similarly named travel brands)
- [ ] Domain `getguidr.com` registered; `getguidr.app` and any local variants registered
- [ ] Social handles secured and consistent
- [ ] Real operators onboarded or the site clearly labelled demo
- [ ] Demo reviews and demo tags handled

**Technical**
- [ ] Production environment built from the runbook
- [ ] Backups running, offsite copy verified, restore tested
- [ ] Monitoring and alerts live; phone alerts tested
- [ ] SSL, HSTS, security headers verified
- [ ] Email domain authenticated (SPF, DKIM, DMARC) and deliverability tested
- [ ] WhatsApp numbers verified; click-to-chat links tested on iOS and Android
- [ ] Analytics and consent tested; no tracking before consent where required
- [ ] Sitemap submitted; robots checked; structured data validated
- [ ] 404, 500 and maintenance pages tested
- [ ] Rate limits and abuse protections enabled
- [ ] Secrets rotated from development values
- [ ] Status page live

**Content**
- [ ] All 16 experiences complete with real photos and alt text
- [ ] Destination pages written
- [ ] FAQ, help and trust pages written
- [ ] Press kit and share images ready

**Go-live**
- [ ] Soft launch to a small group; collect feedback for one week
- [ ] Fix top issues; announce
- [ ] Daily review of requests, errors and agent logs for the first two weeks

## 5. Rollback
Deploys keep the last three releases. Roll back with one command in Coolify or Dokploy. Migrations must be backward compatible for one release. Take a database snapshot before every production migration.

## 6. Post-launch cadence
Weekly: metrics review, dependency updates, content updates. Monthly: restore test, security review, agent evaluation, price check. Quarterly: accessibility audit, performance audit, roadmap review.
