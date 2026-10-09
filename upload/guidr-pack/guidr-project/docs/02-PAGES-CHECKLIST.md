# 02. Pages and Screens Checklist

Every page, from the first loading screen to the privacy policy. Tick boxes as each is built and accepted.

**Legend:** Surface: **M** marketing (`getguidr.com`), **A** traveller app (`app.`), **O** operator portal (`ops.`), **X** admin, **S** system.
**Definition of done for every page:** matches `07-DESIGN-SYSTEM.md`; mobile-first at 390 px; keyboard accessible; meaningful title, description and share image; analytics event wired; loading, empty and error states designed; passes the budgets in `11-QA-AND-LAUNCH.md`.

---

## A. System screens (S)

| Done | Screen | Route | Contents and rules |
|---|---|---|---|
| [ ] | Loading splash | (first paint) | Footprint trail drawing itself on bone background; shows only if load exceeds 600 ms; never blocks content |
| [ ] | Page skeletons | all | Footprint-shaped shimmer; matches final layout to avoid shifts |
| [ ] | 404 Not found | `/404` | Friendly line, search box, popular destinations, WhatsApp help |
| [ ] | 500 Error | `/500` | Apology, retry button, status link, error id for support |
| [ ] | Offline | (service worker) | "You are offline" with saved bookings and wishlist still readable |
| [ ] | Maintenance | `/maintenance` | Planned downtime message, expected return time, social links |
| [ ] | Cookie banner | overlay | Accept, reject, manage; no dark patterns; remembers choice |
| [ ] | Cookie preferences | `/legal/cookies#preferences` | Per-category toggles |
| [ ] | Language and currency switcher | header | EN (DE later); N$ and USD |
| [ ] | Session expired | overlay | Re-authenticate without losing form data |
| [ ] | Not authorised | `/403` | Explains role needed; link to sign in or apply |
| [ ] | Rate limited | `/429` | Calm message, retry timing |
| [ ] | Robots, sitemap, manifest, favicons | `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Footprint icon set; Open Graph defaults |

## B. Marketing site (M)

| Done | Page | Route | Contents and rules |
|---|---|---|---|
| [ ] | Home | `/` | Hero with parallax dunes and search; category chips; top experiences; three-scene scroll story (Coast, Desert, Wild); destinations strip; AI planner teaser; how it works; trust row; reviews; operator call to action; app waitlist; footer |
| [ ] | How it works | `/how-it-works` | 4 steps for travellers, 4 for operators; payment explainer (EFT or operator link); FAQ snippet |
| [ ] | Destinations index | `/destinations` | Map of Namibia plus cards |
| [ ] | Destination page (x7) | `/destinations/[slug]` | Swakopmund, Walvis Bay, Sossusvlei, Etosha, Damaraland, Fish River, Spitzkoppe. Intro, best season, how to get there, distances, top experiences, nearby, local tips |
| [ ] | Experiences index | `/experiences` | Public, indexable listing with filters (server-rendered) |
| [ ] | Category page (x7) | `/categories/[slug]` | Desert, Coast, Wildlife, Adventure, Culture, Stargazing, Flights |
| [ ] | Experience page (public) | `/experiences/[slug]` | Same content as app version; "Request to book" leads to app; structured data |
| [ ] | AI planner teaser | `/planner` | Sample conversation, "Try the planner" opens app planner |
| [ ] | For operators | `/for-operators` | Benefits, how listing works, fees explained, testimonials, FAQ, apply button |
| [ ] | Operator application | `/for-operators/apply` | Multi-step form (also reachable in portal) |
| [ ] | Pricing and fees | `/for-operators/fees` | Monthly fee and commission, billing dates, examples |
| [ ] | Blog index | `/blog` | Travel guides, seasons, tips |
| [ ] | Blog article | `/blog/[slug]` | Editorial layout; related experiences |
| [ ] | About | `/about` | Story, mission, team; "Built by Tangison Studio" credit in footer |
| [ ] | Contact | `/contact` | WhatsApp first, email, form, hours, address |
| [ ] | FAQ | `/faq` | Searchable; grouped for travellers and operators |
| [ ] | Help centre | `/help` | Articles: booking, paying, cancelling, operators |
| [ ] | Trust and safety | `/safety` | Vetting, reviews, reporting, desert safety tips |
| [ ] | Responsible travel | `/responsible-travel` | Wildlife and community principles |
| [ ] | Mobile app coming soon | `/app` | Phone mockup, waitlist form, store badges "coming soon" |
| [ ] | Press and brand | `/press` | Logos, palette, downloads |
| [ ] | Gift and corporate enquiries | `/groups` | Group or corporate request form |
| [ ] | Site search | `/search` | Global search (experiences, destinations, articles) |

### Legal pages (M)

| Done | Page | Route |
|---|---|---|
| [ ] | Terms of use | `/legal/terms` |
| [ ] | Privacy policy | `/legal/privacy` |
| [ ] | Cookie policy | `/legal/cookies` |
| [ ] | Cancellation and refunds | `/legal/cancellation` |
| [ ] | Operator agreement | `/legal/operator-agreement` |
| [ ] | Acceptable use and reviews policy | `/legal/content-policy` |
| [ ] | Accessibility statement | `/legal/accessibility` |
| [ ] | Data requests (export, delete) | `/legal/data-requests` |

All legal text is a placeholder until a lawyer reviews it (see `10-CONTENT-AND-LEGAL.md`).

## C. Traveller app (A)

| Done | Screen | Route | Contents and rules |
|---|---|---|---|
| [ ] | Sign up | `/sign-up` | Email, Google, Apple (via Clerk); WhatsApp number optional |
| [ ] | Sign in | `/sign-in` | Same providers; magic link option |
| [ ] | Verify email | `/verify` | Resend, change email |
| [ ] | Reset password | `/reset` | |
| [ ] | Onboarding | `/welcome` | 3 quick questions (interests, party, budget) that seed the planner; skippable |
| [ ] | Search results | `/search` | Filters, sort, list and map, saved filters |
| [ ] | Experience page | `/experiences/[slug]` | Full page with sticky booking panel |
| [ ] | Availability picker | (component) | Calendar, guests, price update, sold-out states |
| [ ] | Booking request | `/book/[draftId]` | Traveller details, WhatsApp number, notes, add-ons, summary, policy |
| [ ] | Request sent | `/book/[id]/sent` | What happens next, response time, WhatsApp button |
| [ ] | Payment: choose method | `/bookings/[id]/pay` | Shows operator's accepted methods |
| [ ] | Payment: bank transfer | `/bookings/[id]/pay/eft` | Bank details, unique reference, amount, deadline, proof-of-payment upload |
| [ ] | Payment: operator link | `/bookings/[id]/pay/link` | Explains redirect to operator's link, "I have paid" button, receipt upload |
| [ ] | Booking confirmation | `/bookings/[id]` | Status timeline, voucher, meeting point, contact, add to calendar, cancel |
| [ ] | My bookings | `/bookings` | Upcoming, past, cancelled |
| [ ] | Booking chat and events | `/bookings/[id]/messages` | Structured events plus WhatsApp deep link |
| [ ] | Cancel booking | `/bookings/[id]/cancel` | Policy shown, reason, confirmation |
| [ ] | Review | `/bookings/[id]/review` | Stars, text, photos; opens after COMPLETED |
| [ ] | Trips | `/trips` | Saved itineraries from the planner |
| [ ] | Trip detail | `/trips/[id]` | Day-by-day plan, map, add experiences, share link |
| [ ] | AI planner | `/planner` | Chat plus itinerary pane; cards; "request to book" |
| [ ] | Wishlist | `/wishlist` | Saved experiences |
| [ ] | Account | `/account` | Profile, contact details, language and currency |
| [ ] | Notifications | `/account/notifications` | Email and WhatsApp preferences |
| [ ] | Privacy and data | `/account/privacy` | Export, delete account |
| [ ] | Help | `/help` | Search and contact |

## D. Operator portal (O)

| Done | Screen | Route | Contents and rules |
|---|---|---|---|
| [ ] | Apply | `/apply` | Business name, registration, contact, services, documents |
| [ ] | Application status | `/apply/status` | Pending, more info needed, approved, declined |
| [ ] | Onboarding checklist | `/onboarding` | Profile, payment method, first listing, calendar, WhatsApp number |
| [ ] | Dashboard | `/` | Today's requests, upcoming trips, alerts, earnings overview, invoice due |
| [ ] | Listings | `/listings` | Status chips (draft, in review, live, paused) |
| [ ] | Listing wizard | `/listings/new` | Steps: basics; description; itinerary; photos; pricing; availability; policies; preview; submit |
| [ ] | Edit listing | `/listings/[id]` | Version history; changes re-enter review if price or policy changes |
| [ ] | Calendar | `/calendar` | Capacity per slot, blocked dates, seasonal prices |
| [ ] | Booking inbox | `/bookings` | Requests, awaiting payment, paid, completed |
| [ ] | Booking detail | `/bookings/[id]` | Traveller info, notes, proof, actions: accept, decline, mark paid, complete, no-show |
| [ ] | Payment settings | `/payments` | Bank details, payment link, accepted methods, instructions text |
| [ ] | Guidr billing | `/billing` | Plan, invoices (monthly fee and commission), status, pay now, statements |
| [ ] | Reviews | `/reviews` | Read, reply once, report |
| [ ] | Analytics | `/analytics` | Views, requests, conversion, revenue, top listings |
| [ ] | Team | `/team` | Invite staff, roles |
| [ ] | Business profile | `/profile` | Public operator page content |
| [ ] | Operator help | `/help` | Guides, contact, agreement |

## E. Admin (X)

| Done | Screen | Route |
|---|---|---|
| [ ] | Dashboard (metrics, queues, alerts) | `/admin` |
| [ ] | Operator applications and approvals | `/admin/operators` |
| [ ] | Listing moderation queue | `/admin/listings` |
| [ ] | Bookings overview and search | `/admin/bookings` |
| [ ] | Billing run (preview, send, reminders, pause) | `/admin/billing` |
| [ ] | Invoices and statements | `/admin/invoices` |
| [ ] | Disputes | `/admin/disputes` |
| [ ] | Review moderation | `/admin/reviews` |
| [ ] | Users and roles | `/admin/users` |
| [ ] | Content blocks and blog | `/admin/content` |
| [ ] | AI agent logs and evaluations | `/admin/agent` |
| [ ] | Feature flags and settings (fees, FX rate, copy) | `/admin/settings` |
| [ ] | Audit log | `/admin/audit` |
| [ ] | Waitlist and enquiries | `/admin/inbox` |

## F. Transactional messages

| Done | Message | Channel | Trigger |
|---|---|---|---|
| [ ] | Email verification | Email | Sign-up |
| [ ] | Booking request received (traveller) | Email, WhatsApp link | Request submitted |
| [ ] | New booking request (operator) | Email, WhatsApp | Request submitted |
| [ ] | Request accepted | Email, WhatsApp | Operator accepts |
| [ ] | Request declined or expired | Email | Decline or 24 h timeout |
| [ ] | Payment instructions | Email | After acceptance |
| [ ] | Proof of payment received (operator) | Email, WhatsApp | Upload |
| [ ] | Payment confirmed | Email | Operator marks paid |
| [ ] | Payment reminder | Email, WhatsApp | 24 h before deadline |
| [ ] | Trip reminder | Email, WhatsApp | 48 h and 3 h before |
| [ ] | Review request | Email | 24 h after completion |
| [ ] | Cancellation notice | Email | Either side cancels |
| [ ] | Operator application result | Email | Approval or decline |
| [ ] | Listing approved or changes requested | Email | Moderation |
| [ ] | Invoice issued | Email | 1st and 16th |
| [ ] | Invoice reminder and pause notice | Email, WhatsApp | Due date passed |
| [ ] | Waitlist welcome | Email | Joined waitlist |

## G. Totals
About 25 system and marketing pages, 8 legal pages, 24 traveller screens, 17 operator screens, 14 admin screens and 17 message templates. Destination (7) and category (7) pages are generated from templates and data.
