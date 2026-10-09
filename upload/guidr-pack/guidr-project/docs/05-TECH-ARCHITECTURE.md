# 05. Technical Architecture

## 1. Principles
Simple first, boring where it matters (money, auth, backups), fast on poor networks, observable, and easy for a small team to run.

## 2. Components

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) with TypeScript | One codebase style for marketing and app |
| Styling | Tailwind CSS with design tokens | `07-DESIGN-SYSTEM.md` |
| UI primitives | Radix UI or shadcn/ui, restyled to the brand | Accessible by default |
| Motion | GSAP (ScrollTrigger, MotionPath) or Motion One | Reduced-motion aware |
| Auth | Clerk | Roles in public metadata; webhook syncs users |
| Data | Postgres or Convex (D1) | Behind `packages/data` |
| Files | S3-compatible storage (R2, Hetzner object storage or similar) | Private bucket for proofs, public for images |
| Images | Pre-generated AVIF/WebP at 3 sizes plus on-the-fly resizing at the CDN | |
| CDN and DNS | Cloudflare (proxy, cache, WAF) **[VERIFY]** terms and cost | Reduces latency to Namibia |
| Email | Resend or Postmark | Transactional only at first |
| WhatsApp | Click-to-chat links; Cloud API later | Templates need Meta approval |
| AI | OpenRouter (free models) with fallback; Claude later | Server routes only |
| Jobs | Queue and cron (BullMQ on Redis, pg-boss, or Convex scheduler) | Reminders, billing runs, cleanups |
| Search | Postgres full-text or Convex search | Dedicated engine later if needed |
| Analytics | Privacy-friendly (Plausible or Vercel Analytics) plus first-party events | |
| Errors | Sentry or GlitchTip (self-hosted option) | |
| Uptime | Uptime Kuma plus an external pinger | Alerts to phone |
| CI/CD | GitHub Actions | Lint, type-check, test, build, deploy |

## 3. Topology

```
Visitors ──> Cloudflare (DNS, cache, WAF)
                │
                ├─ getguidr.com ────────> Vercel (marketing site, ISR/static)
                │
                └─ app. / ops. / api. ──> Hetzner server(s)
                                            ├─ Coolify or Dokploy (deploy, SSL, env)
                                            ├─ Reverse proxy (Traefik/Caddy)
                                            ├─ App container(s) (Next.js)
                                            ├─ Worker container (jobs, WhatsApp, email)
                                            ├─ Database (Postgres container or Convex)
                                            ├─ Redis (queues, rate limits)
                                            ├─ Uptime Kuma, error tracker
                                            └─ Ops agent (allowlisted)
Object storage (images, proofs) ──> signed URLs, served via CDN
Offsite backups ──> second provider
```

Marketing on Vercel keeps the public site up even if the Hetzner server has a bad day. Marketing and app share design packages through a monorepo.

## 4. Monorepo layout

```
guidr/
  apps/
    web/        marketing site (Vercel)
    app/        traveller app + operator portal + admin (Hetzner)
  packages/
    ui/         components, tokens, motion helpers
    data/       repository interface + implementations
    catalogue/  seeds (destinations, experiences, copy)
    agent/      planner logic, prompts, evaluations
    config/     eslint, tsconfig, tailwind preset
  infra/
    coolify/    app definitions, env templates
    runbooks/   incident playbooks (see skills/guidr-server-ops)
    scripts/    backup, restore, smoke tests
  docs/         this pack
```

## 5. Environments
- **Local:** Docker Compose for database and Redis; `.env.local` from a template.
- **Staging:** same Hetzner server (separate containers and database) or a small second server; auto-deploys from `main`; protected by basic auth.
- **Production:** deploys from tagged releases; manual approval; database migrations run as a separate step with a pre-deploy backup.

## 6. Server plan
- **Start:** one Hetzner Cloud instance (for example 4 vCPU, 8 GB RAM) with a volume for the database **[VERIFY]** sizing and price; add a second small instance for staging and the ops agent when budget allows.
- **Region:** choose after latency tests from Windhoek and Swakopmund (**D4**). Use the CDN for images and static files.
- **Hardening:** SSH keys only, no root login, firewall allowing 80, 443 and a restricted SSH source, automatic security updates, fail2ban, separate Unix users, Docker with non-root containers, secrets in Coolify/Dokploy env or a secret manager, never in Git.
- **Coolify vs Dokploy:** trial both for a day with the real app; compare backups, rollback, multi-environment support, logs and community support. Either is acceptable.
- **Single point of failure:** accepted for v1; mitigate with backups, monitoring and a documented rebuild procedure.

## 7. Backups and recovery
- Database: nightly full backup plus frequent WAL archiving or snapshots **[VERIFY]** tooling; keep 14 daily and 8 weekly copies.
- Copy backups offsite to a different provider; encrypt them.
- Object storage: versioning on the proofs bucket; replicate images.
- **Restore test monthly**, documented and timed. Target RPO 24 h (aim lower), RTO 4 h.
- Configuration is in Git (`infra/`); a new server can be rebuilt from scratch with the runbook.

## 8. Security
- Authentication via Clerk; MFA for admin and operator owners.
- Authorisation checks on every server function; never trust the client.
- Validate all input with schemas (Zod). Escape output. Parameterised queries only.
- Uploads: allow-list types, size limits, antivirus scan, random file names, private bucket, signed URLs with short expiry.
- Rate limiting by IP and user on sign-in, requests, uploads, planner and contact forms.
- Content Security Policy, HSTS, secure cookies, CSRF protection for non-API form posts.
- Secrets rotation; least-privilege database users; encrypted columns for bank account numbers.
- Dependency updates weekly; audit in CI.
- Prompt-injection defence for AI features (`06-AI-AGENTS.md`).
- Audit log for admin and billing actions.
- Privacy: minimise personal data; consent for marketing; data-request flow.

## 9. Observability
- Structured logs with request ids; error tracking with release tags.
- Uptime checks on home, search, an experience page, sign-in, and the booking API; alerts to phone.
- Business dashboards: requests per day, confirmation time, payment completion, invoice status.
- Alerts: error spike, slow responses, queue backlog, disk above 80 percent, backup failure, SSL expiry under 14 days.

## 10. Performance strategy
- Marketing pages statically generated or ISR; experience pages cached with revalidation on edit.
- Images: AVIF/WebP, responsive `srcset`, blur placeholders, lazy loading below the fold, explicit dimensions.
- Fonts: self-host Poppins, subset, `font-display: swap`, preload the two used weights.
- JavaScript: server components by default; load GSAP only on pages that animate, and defer it.
- Animation uses transform and opacity only.
- Mobile-first budgets in `11-QA-AND-LAUNCH.md`.

## 11. SEO
- Server-rendered public pages; canonical URLs; hreflang when German arrives.
- Structured data (JSON-LD): `Organization`, `WebSite` with `SearchAction`, `BreadcrumbList`, `Product` or `TouristTrip` with `Offer` and `AggregateRating` for experiences, `FAQPage` where valid **[VERIFY]** current Google guidelines.
- Programmatic destination and category pages from data; unique copy for each.
- Open Graph and Twitter images generated from the brand kit.

## 12. Internationalisation
Strings in message files; formatting by locale; currency via a single settings-controlled rate (`FX_RATE_NAD_USD`); content fields support per-language values from the start.

## 13. Environment variables (template)
`DATABASE_URL` or `CONVEX_URL`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `OPENROUTER_API_KEY`, `AGENT_MODEL_LIST`, `AGENT_FALLBACK_MODE`, `EMAIL_API_KEY`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`, `STORAGE_ENDPOINT`, `STORAGE_BUCKET_PUBLIC`, `STORAGE_BUCKET_PRIVATE`, `STORAGE_KEY`, `STORAGE_SECRET`, `FX_RATE_NAD_USD`, `SENTRY_DSN`, `SITE_URL`, `APP_URL`.

## 14. Third-party risk register
| Service | Risk | Mitigation |
|---|---|---|
| OpenRouter free models | Rate limits, retirement | Fallback chain, scripted mode, config-driven |
| Clerk | Vendor dependency | Keep user table; export path |
| Cloudflare | Policy or outage | Low TTL DNS; direct origin documented |
| Hetzner | Server failure | Backups, rebuild runbook, second server |
| WhatsApp Cloud API | Template approval delay | Click-to-chat fallback |
