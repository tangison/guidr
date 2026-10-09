---
name: guidr-web-build
description: Build pages, components, API routes, database code and tests for the Guidr tour marketplace (marketing site getguidr.com, traveller web app, operator portal, admin). Use whenever the task is to implement, modify, scaffold, review or debug any Guidr screen, booking flow, payment flow (EFT and operator payment links), operator billing, listing wizard, search, auth, or data access, even if the request does not say "Guidr" but refers to the tours marketplace, bookings, operators, invoices or the planner UI.
---

# Guidr Web Build

You are building Guidr, a Namibia-focused marketplace for guided tours and activities. The full planning pack is in `../../docs/`. Read the relevant documents before writing code, and keep them current when decisions change.

## Read first (by task)

| Task | Read |
|---|---|
| Any screen | `docs/02-PAGES-CHECKLIST.md`, `docs/07-DESIGN-SYSTEM.md` |
| Booking or payments | `docs/03-BOOKING-AND-PAYMENTS.md` |
| Data or API | `docs/04-DATA-MODEL.md` |
| Infrastructure or env | `docs/05-TECH-ARCHITECTURE.md` |
| Motion or images | `docs/08-MOTION-AND-ASSETS.md` |
| Planner UI or route | `docs/06-AI-AGENTS.md` |
| Copy | `docs/10-CONTENT-AND-LEGAL.md` |
| Done criteria | `docs/11-QA-AND-LAUNCH.md` |

## Decisions that are fixed
- Domain `getguidr.com`; subdomains `app.`, `ops.`, `status.`. Brand name is **Guidr**.
- Next.js (App Router), TypeScript strict, Tailwind with the tokens in the design system, Poppins self-hosted.
- Auth: Clerk. Roles: traveller, operator_owner, operator_staff, admin.
- Payments v1: EFT with proof upload, or the operator's own payment link. **Guidr never collects or holds traveller money.** Do not add card processing for travellers.
- WhatsApp first: every important screen has an "Ask on WhatsApp" path using click-to-chat.
- Backend is undecided (Convex or Postgres). Never call a database directly from pages. Use `packages/data` functions only.
- Money is integer minor units plus a currency code. Never floats.

## Workflow
1. **Plan**: restate the task, name the pages and states involved, list data and permissions needed.
2. **Check the pack**: find the page in `02-PAGES-CHECKLIST.md`, note its contents and acceptance rules.
3. **Design**: apply `guidr-design-taste` for any visual work; mobile layout first at 390 px.
4. **Implement** following the conventions in `references/conventions.md`.
5. **States**: build loading, empty, error, offline (where relevant), disabled and success states, not just the happy path.
6. **Authorise**: every server function checks the caller's role and ownership.
7. **Test**: unit tests for rules (state transitions, price math, invoice totals), integration tests for flows, accessibility checks.
8. **Measure**: confirm bundle size and image budgets (`11-QA-AND-LAUNCH.md`).
9. **Update docs**: tick the checklist, record decisions.

## Hard rules
- Server components by default; client components only for interaction. Load animation libraries only on pages that use them.
- All input validated with Zod at the boundary. Never trust client prices, roles or ids: recompute totals on the server.
- Booking status changes go through one function (`transitionBooking`) that enforces the state machine and writes a `BookingEvent` in the same transaction.
- Commission is calculated from values stored on the booking, never from current listing data.
- Uploads: allow-list types, size limits, scan, private storage, signed URLs.
- Bank account numbers are encrypted and visible only to the booking's traveller after acceptance, and to the operator and admin.
- Payment links: https only, domain allow-list, show the destination domain to the user before redirecting.
- Every image has alt text. Every interactive element has a visible focus state.
- No tracking before consent where consent is required.
- Demo content is flagged `is_demo` and visibly labelled.
- The AI planner can only reference experiences that exist and prices that match the record; validate its output.
- Never put secrets in the repo; use environment variables.
- Footer includes "Built by Tangison Studio".

## Output expectations
- Small, reviewable changes with tests.
- A short note listing files changed, states covered, and any checklist items ticked.
- If a requirement conflicts with the docs, stop and ask, or propose a documented change; do not silently diverge.
