# 01. Product Specification

## 1. Product
Guidr is a marketplace where travellers discover and request guided tours and activities in Namibia, and where local operators list and manage them. It launches on the coast (Swakopmund, Walvis Bay) and expands inland (Sossusvlei, Etosha, Damaraland, Fish River, Spitzkoppe, Kolmanskop).

**Positioning:** the friendly local alternative to global marketplaces: curated, WhatsApp-first, honest prices, guided by people who know the land.

**Surfaces**
1. **Marketing site** (`getguidr.com`): public, indexable, fast. Sells the brand, the destinations and the experiences. Drives search traffic.
2. **Traveller web app** (`app.getguidr.com`): search, book, manage trips, chat with operators, review.
3. **Operator portal** (`ops.getguidr.com`): listings, calendar, bookings, payment settings, invoices.
4. **Admin** (inside the app, role-gated): approvals, moderation, billing runs, disputes, logs.
5. **Mobile app**: "coming soon" page with a waitlist. Not built.

## 2. Users and jobs to be done

| User | Job | Success looks like |
|---|---|---|
| Traveller | "Help me find and book a great guided activity I can trust." | Books in under 3 minutes; gets a clear confirmation |
| Traveller (planner) | "Plan my 3 days at the coast for my family and budget." | A believable itinerary with real tours and prices |
| Operator | "Get more bookings without more admin." | Requests arrive on WhatsApp; confirms in one tap; gets paid directly |
| Admin | "Keep quality high and billing correct." | Approvals, invoices and disputes handled from one place |
| Guidr team | "Know the system is healthy." | Alerts before customers notice problems |

## 3. Scope

### In scope (v1)
- Marketing site with destination, experience, blog and legal pages.
- Accounts (email, social login) and guest booking requests.
- Search with filters; experience pages; availability calendar.
- Booking requests; operator accept or decline; two payment methods (EFT with proof upload, operator payment link).
- WhatsApp click-to-chat everywhere; WhatsApp Business messaging as a fast follow.
- Reviews after completed bookings.
- AI trip planner (web chat).
- Operator portal with listings wizard, calendar, bookings, payments settings and invoices.
- Admin tools: approvals, moderation, billing run, disputes, audit log.
- Waitlist for the mobile app.

### Out of scope (v1)
- Collecting or holding traveller payments; payouts to operators.
- Native mobile apps.
- Multi-day itineraries bundled with accommodation or flights.
- Real-time inventory sync with operator systems.
- Loyalty programme, gift cards, group payments.

## 4. Functional requirements

### 4.1 Discovery
- Home search: what, where, when, guests.
- Filters: destination, category, price range, duration, group size, rating, family friendly, private or shared, language.
- Sort: recommended, price (low or high), rating, duration, soonest available.
- Map view with pins and a list; results count; saved searches (later).
- Typo-tolerant text search across title, destination, category, keywords.
- Empty state offers the AI planner and WhatsApp help.

### 4.2 Experience page
- Gallery (3 to 8 images), title, rating and review count, destination, duration, group size, languages, cancellation policy badge.
- Highlights, itinerary timeline, included and not included, meeting point with map, what to bring, accessibility notes, age or fitness limits.
- Guide card (photo, name, languages, short bio).
- Reviews with verified-booking badge; similar experiences.
- Sticky booking panel: date, guests, price breakdown, "Request to book", "Ask on WhatsApp".
- Structured data for search engines (see 11-QA-AND-LAUNCH).

### 4.3 Booking
Detailed in `03-BOOKING-AND-PAYMENTS.md`. Summary: traveller requests, operator confirms, traveller pays by EFT or the operator's link, operator marks paid, trip happens, booking completes, review opens, commission accrues.

### 4.4 Messaging
- Every booking has a thread. v1 uses WhatsApp deep links; in-app thread stores structured events (status changes, proof uploads).
- Notifications by email always; by WhatsApp when the Business API is enabled.

### 4.5 Reviews
- 1 to 5 stars, title, text, optional photos, travel date and party type.
- Operators may reply once. Admin can remove content that breaks rules.

### 4.6 AI planner
See `06-AI-AGENTS.md`. Only recommends catalogue experiences; shows cards; can add to a trip and start a booking request after explicit confirmation.

### 4.7 Operator portal
- Apply and onboard (business details, documents, bank details for display, payment link).
- Listing wizard: basics, description, itinerary, photos, pricing, availability, policies, preview, submit for approval.
- Calendar: block dates, set capacity per slot, seasonal pricing.
- Booking inbox: accept, decline (reason), mark paid, mark completed or no-show.
- Invoices: monthly fee and commission statements, status, pay links.
- Reviews: read and reply. Analytics: views, requests, conversion, revenue.

### 4.8 Admin
- Approve or reject operators and listings with notes.
- Monitor bookings; step in on disputes; remove content.
- Run the twice-monthly billing; send reminders; pause listings for non-payment.
- Read AI agent logs and the audit log; manage site content blocks and feature flags.

## 5. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Budgets in `11-QA-AND-LAUNCH.md`. Largest contentful paint under 2.5 s on a mid-range phone over 4G. |
| Accessibility | WCAG 2.2 AA. Reduced-motion support everywhere. |
| SEO | Server-rendered public pages, clean URLs, sitemap, structured data, fast. |
| Security | Least privilege, encrypted transport and storage, validated uploads, rate limiting, audit log. |
| Privacy | Collect the minimum; export and delete on request; clear cookie consent. Treat EU visitors under GDPR-like rules; **[VERIFY]** Namibian data-protection law status with a lawyer. |
| Reliability | Uptime monitoring, daily backups with tested restores, rollback in minutes. |
| Internationalisation | English first; strings externalised for German. Currency formatting by locale. |
| Observability | Error tracking, request logs, uptime checks, business metrics dashboard. |

## 6. Analytics events (minimum)
`view_home`, `search_submitted`, `filter_changed`, `view_experience`, `gallery_opened`, `whatsapp_clicked` (with source), `booking_started`, `booking_requested`, `booking_confirmed`, `proof_uploaded`, `booking_paid`, `booking_completed`, `review_submitted`, `planner_opened`, `planner_message`, `planner_card_clicked`, `operator_applied`, `waitlist_joined`, `signup_completed`.

## 7. Success metrics (first 90 days of real use)
- Search to experience-page rate; experience page to request rate.
- Request to confirmation rate and median confirmation time (target: under 4 hours in daytime).
- Confirmation to paid rate; completed bookings per operator.
- Share of requests starting from WhatsApp links; planner-assisted bookings.
- Operator activation (listing approved and first booking within 30 days).
- Page speed and error-rate budgets met.

## 8. Roles and permissions

| Capability | Guest | Traveller | Operator staff | Operator owner | Admin |
|---|---|---|---|---|---|
| Browse, search, planner | yes | yes | yes | yes | yes |
| Request a booking | yes | yes | no | no | yes (on behalf) |
| See own bookings | link only | yes | their operator's | their operator's | all |
| Edit listings | no | no | draft only | yes | yes |
| Accept, decline, mark paid | no | no | yes | yes | yes |
| Payment settings, invoices | no | no | no | yes | yes |
| Approve operators, moderate | no | no | no | no | yes |
| Run billing, see logs | no | no | no | no | yes |

## 9. Business rules (selected)
- Prices are per person unless the listing says per group. Show "from" prices on cards.
- A request expires if the operator has not responded within 24 hours; the traveller is told and offered alternatives.
- Operators must keep a payment method on file (bank details or payment link) to publish.
- A listing cannot go live without at least 5 photos, a meeting point, a cancellation preset and a price.
- Demo and test content is labelled "Demo" until real operators are live.
- Commission uses the price recorded at booking time, not later edits.
