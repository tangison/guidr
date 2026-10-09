# 12. Roadmap

Estimates assume one lead developer, one designer and part-time help, and are rough **[VERIFY]**. Each phase has an exit criterion. Do not start the next phase until the exit criterion is met.

## Phase 0: Foundations (week 1)
- Confirm decisions D1 to D9 (`00-DECISIONS.md`).
- Register domain, handles, email; set up GitHub, Vercel, Hetzner, Cloudflare, Clerk.
- Create the monorepo, design tokens, fonts, base components.
- Receive missing assets (portraits, heroes); run the asset pipeline.
- **Exit:** a deployed "hello" site on `getguidr.com` with the brand shell.

## Phase 1: Marketing site (weeks 2 to 3)
- Home, how it works, destinations (7), experiences index and pages (16), for operators, about, contact, FAQ, help, safety, app waitlist, legal drafts, blog shell.
- Scroll story and hero motion (M1 to M11) with fallbacks.
- SEO basics, analytics, cookie consent, 404 and 500 pages.
- **Exit:** passes the quality budgets; content approved; indexable.

## Phase 2: Web app core (weeks 3 to 6)
- Auth, roles, onboarding.
- Search, experience page, availability picker, wishlist.
- Booking request, operator inbox (basic), status timeline, emails.
- Payment methods A and B including proof upload.
- **Exit:** a demo operator and a demo traveller can complete a booking from request to completed.

## Phase 3: Operator portal and billing (weeks 6 to 8)
- Application and approval, listing wizard, calendar, payment settings.
- Reviews, analytics basics.
- Invoices, billing run preview and send, late-payment rules.
- Admin queues and audit log.
- **Exit:** a full billing cycle runs on test data and an accountant can reconcile it.

## Phase 4: AI planner and WhatsApp (weeks 8 to 10)
- Planner pipeline, UI, fallback chain, scripted mode, evaluations.
- WhatsApp click-to-chat everywhere; Business API pilot with approved templates.
- **Exit:** 20 of 20 evaluation prompts pass; WhatsApp messages delivered in test.

## Phase 5: Hardening and launch (weeks 10 to 12)
- Security review, load test, accessibility audit, restore test, game-day drill.
- Ops agent in observe mode, then tier 1 fixes.
- Soft launch, feedback, fixes, public launch.
- **Exit:** launch checklist complete.

## Later (backlog)
German language; reconcilable payment links with webhooks; card payments for operator fees; in-app messaging; mobile app; supplier API integrations; gift cards; loyalty; more regions (Etosha lodges, Zambezi, Luderitz).

## Dependencies
Missing assets block Phase 1 visuals. D1 (backend) blocks Phase 2. D3 (fees) blocks Phase 3. Legal review blocks launch. WhatsApp business verification can take time; start in Phase 2.
