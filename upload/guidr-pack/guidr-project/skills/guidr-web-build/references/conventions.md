# Conventions

## Repo
Monorepo (pnpm + Turborepo): `apps/web`, `apps/app`, `packages/ui`, `packages/data`, `packages/catalogue`, `packages/agent`, `packages/config`, `infra/`.

## Code style
- TypeScript strict; no `any` without a comment. ESLint and Prettier from `packages/config`.
- File names kebab-case; components PascalCase; one component per file.
- Functions return typed results; use discriminated unions for state (`{ ok: true, data } | { ok: false, error }`).
- Domain logic lives in `packages/data` and `packages/agent`, not in components.

## Routing
- Marketing: `app/(marketing)/...` in `apps/web`.
- Traveller: `app/(traveller)/...`; Operator: `app/(operator)/ops/...` (served on `ops.`); Admin: `app/(admin)/admin/...` guarded by role.
- Use route groups, parallel loading UI (`loading.tsx`), `error.tsx` and `not-found.tsx` per segment.

## Data access
```ts
// packages/data/index.ts
export interface Data {
  listExperiences(f: ExperienceFilters): Promise<Page<ExperienceCard>>;
  getExperience(slug: string): Promise<Experience | null>;
  getAvailability(id: string, range: DateRange): Promise<Slot[]>;
  createBookingRequest(input: BookingRequestInput): Promise<Result<Booking>>;
  transitionBooking(id: string, to: BookingStatus, actor: Actor, note?: string): Promise<Result<Booking>>;
  createInvoiceRun(period: Period, opts: RunOptions): Promise<InvoiceRunPreview>;
}
```
Two implementations (`data-postgres`, `data-convex`) selected by an env flag. Tests run against an in-memory fake.

## Booking transition rule (reference)
```ts
const allowed: Record<Status, Status[]> = {
  draft: ['requested'],
  requested: ['accepted','declined','expired','cancelled_by_traveller'],
  accepted: ['proof_submitted','cancelled_by_traveller','cancelled_by_operator','expired_unpaid'],
  proof_submitted: ['paid','accepted'],
  paid: ['completed','cancelled_by_traveller','cancelled_by_operator','no_show','disputed'],
  completed: [], disputed: ['resolved'],
  // terminal: declined, expired, expired_unpaid, cancelled_*, no_show, resolved
};
```

## Forms
React Hook Form + Zod; label above field; inline errors; preserve input on error; disable submit while pending; show progress for uploads.

## Styling
Tailwind utilities with tokens; no arbitrary colour values; spacing from the scale; use the `cn()` helper; component variants via `cva`.

## Images
Use the shared `<Photo>` component: AVIF/WebP, srcset, blur placeholder, explicit width and height, alt required (build fails without it).

## Motion
Wrap animations in a `useMotion()` hook that returns `false` under reduced motion; register ScrollTrigger once; clean up on unmount.

## Testing
- Vitest for units; Playwright for flows (search to request; EFT payment; payment link; operator accept; billing run).
- Axe accessibility checks in Playwright on key pages.
- Visual regression on home, experience, booking, dashboard.

## Commits and reviews
Conventional commits; every PR lists the checklist items it satisfies and screenshots at 390 px and 1280 px.

## Environment
Never read `process.env` outside `packages/config/env.ts`, which validates variables with Zod at start-up.

## Error handling
Expected errors return typed results; unexpected errors are logged with a request id and shown as a friendly page with the id.
