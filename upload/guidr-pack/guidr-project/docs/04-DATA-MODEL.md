# 04. Data Model

Provider-neutral entities first, then a Postgres variant and a Convex variant. Money is stored as integer minor units (cents) with a currency code. Timestamps are UTC. Every table has `id`, `created_at`, `updated_at`.

## 1. Entities

**User**: `clerk_id`, `email`, `name`, `phone_whatsapp`, `locale`, `currency_pref`, `role` (traveller, operator_owner, operator_staff, admin), `marketing_opt_in`, `deleted_at`.

**Operator**: `name`, `slug`, `registration_no`, `contact_name`, `email`, `phone_whatsapp`, `logo_asset`, `about`, `languages[]`, `base_destination_id`, `status` (applied, approved, suspended, rejected), `approved_at`, `payment_methods` (eft, link), `default_policy`, `commission_rate_bp`, `monthly_fee_minor`, `billing_email`.

**OperatorBankDetails** (restricted): `operator_id`, `bank`, `account_name`, `account_number` (encrypted), `branch_code`, `currency`, `instructions`.

**OperatorPaymentLink**: `operator_id`, `label`, `url`, `domain`, `approved_domain` (bool), `currency`.

**Guide**: `operator_id`, `name`, `photo_asset`, `bio`, `languages[]`, `years_experience`, `certifications[]`.

**Destination**: `slug`, `name`, `region`, `lat`, `lng`, `intro`, `best_season`, `how_to_get_there`, `hero_asset`, `seo_title`, `seo_description`.

**Category**: `slug`, `name`, `icon`.

**Experience**: `operator_id`, `guide_id`, `destination_id`, `category_ids[]`, `slug`, `title`, `summary`, `description`, `highlights[]`, `itinerary[]` (time, title, text), `included[]`, `not_included[]`, `what_to_bring[]`, `meeting_point` (text, lat, lng), `duration_minutes`, `min_guests`, `max_guests`, `languages[]`, `age_min`, `fitness_level`, `accessibility_notes`, `price_model` (per_person, per_group), `price_minor`, `currency`, `child_price_minor`, `policy` (flexible, moderate, strict), `status` (draft, in_review, live, paused, archived), `images[]` (asset ids with order and alt text), `rating_avg`, `rating_count`, `is_demo`, `published_at`.

**AvailabilityRule / Slot**: `experience_id`, `date`, `start_time`, `capacity`, `booked`, `price_override_minor`, `blocked` (bool).

**Booking**: `reference`, `experience_id`, `operator_id`, `traveller_user_id` (nullable for guest), `guest_name`, `guest_email`, `guest_whatsapp`, `date`, `start_time`, `guests_adults`, `guests_children`, `price_total_minor`, `currency`, `fx_rate_used`, `commission_rate_bp`, `commission_minor`, `policy_frozen`, `notes`, `status` (see doc 03), `payment_method` (eft, link), `payment_reference`, `pay_deadline_at`, `paid_at`, `completed_at`, `cancelled_at`, `cancel_reason`, `source` (web, whatsapp, planner), `invoice_id` (nullable).

**BookingEvent** (append only): `booking_id`, `actor_type`, `actor_id`, `from_status`, `to_status`, `note`, `meta`.

**PaymentProof**: `booking_id`, `asset_id`, `note`, `status` (submitted, accepted, rejected), `reviewed_by`, `reviewed_at`.

**Review**: `booking_id`, `experience_id`, `user_id`, `stars`, `title`, `text`, `photos[]`, `travelled_on`, `party_type`, `operator_reply`, `status` (published, hidden, flagged).

**Invoice**: `number`, `operator_id`, `period_start`, `period_end`, `issued_at`, `due_at`, `status` (draft, sent, paid, overdue, void), `subtotal_minor`, `tax_minor`, `total_minor`, `currency`, `payment_reference`, `paid_at`.

**InvoiceLine**: `invoice_id`, `type` (listing_fee, commission, adjustment), `booking_id` (nullable), `description`, `amount_minor`.

**Trip / TripItem**: planner itineraries (`user_id` or `session_id`, `title`, `days[]`, items referencing experience ids), `share_token`.

**WishlistItem**: `user_id`, `experience_id`.

**Asset**: `kind` (photo, cutout, portrait, proof, logo), `storage_key`, `width`, `height`, `mime`, `bytes`, `alt`, `blurhash`, `owner_type`, `owner_id`, `private` (bool).

**Notification**: `user_id`, `channel` (email, whatsapp), `template`, `payload`, `status`, `sent_at`.

**WaitlistEntry**: `email`, `whatsapp`, `interest` (app, operator), `source`.

**AgentSession / AgentMessage / AgentToolCall**: `session_id`, `user_or_visitor`, `role`, `content`, `model`, `latency_ms`, `tokens`, `validation_result`, `fallback_used`, `created_at`.

**AuditLog**: `actor_id`, `action`, `entity`, `entity_id`, `before`, `after`, `ip`, `created_at`.

**Setting**: key-value for fees, FX rate, copy blocks, feature flags.

## 2. Postgres variant

Conventions: `uuid` primary keys (`gen_random_uuid()`), `timestamptz`, `bigint` money, `text` with `CHECK` constraints for enums, migrations with Drizzle or Prisma, Row-Level Security if using Supabase.

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  experience_id uuid not null references experiences(id),
  operator_id uuid not null references operators(id),
  traveller_user_id uuid references users(id),
  guest_name text, guest_email text, guest_whatsapp text,
  date date not null, start_time time,
  guests_adults int not null check (guests_adults >= 1),
  guests_children int not null default 0,
  price_total_minor bigint not null check (price_total_minor >= 0),
  currency char(3) not null,
  commission_rate_bp int not null, commission_minor bigint not null,
  status text not null check (status in ('draft','requested','accepted','declined','expired',
    'proof_submitted','paid','completed','cancelled_by_traveller','cancelled_by_operator',
    'expired_unpaid','no_show','disputed','resolved')),
  payment_method text check (payment_method in ('eft','link')),
  payment_reference text unique,
  pay_deadline_at timestamptz, paid_at timestamptz, completed_at timestamptz,
  invoice_id uuid references invoices(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index on bookings (operator_id, status, date);
create index on bookings (traveller_user_id, date);
create index on bookings (status, pay_deadline_at);
```

Key indexes: experiences by `(destination_id, status)`, GIN on category ids and a full-text `tsvector` of title, summary and keywords; availability by `(experience_id, date)`; invoices by `(operator_id, status)`.

Integrity: a trigger or application service writes `booking_events` on every status change inside the same transaction. Capacity changes use `UPDATE ... SET booked = booked + n WHERE booked + n <= capacity` to avoid overbooking.

Search: start with Postgres full-text plus `pg_trgm` for typo tolerance; add a dedicated engine later only if needed.

Backups: see `05-TECH-ARCHITECTURE.md`.

## 3. Convex variant

- Tables mirror the entities above, defined in `schema.ts` with validators. Use `v.id("table")` references.
- Indexes: `bookings.by_operator_status`, `bookings.by_traveller`, `experiences.by_destination_status`, `availability.by_experience_date`, search index on `experiences` (title, summary, keywords).
- Money fields are integers; no floats. Enums as union literals.
- State transitions are **mutations** that read the booking, check the allowed transition, write the booking and append the event atomically (Convex mutations are transactional).
- Long or external work (emails, WhatsApp, AI calls, file scanning) runs in **actions** triggered by the scheduler; actions call mutations to write results.
- Real-time: queries on `bookings` and `booking_events` give live status without extra code.
- Files: store uploads in object storage with signed URLs, or use Convex file storage; keep `Asset` rows either way.
- Risks to check **[VERIFY]**: self-hosting maturity and backup/restore procedure, export tooling for the accountant, and migration path if you later move to Postgres.

## 4. Repository layer
`packages/data` exposes functions such as `createBookingRequest`, `transitionBooking`, `listExperiences(filters)`, `getAvailability`, `createInvoiceRun`. Pages and agents call these only. Implementations: `data-postgres` and `data-convex`.

## 5. Seed data
`packages/catalogue` holds JSON seeds for destinations, categories, 16 experiences, demo operators and guides, and sample reviews, all flagged `is_demo`. Prices per `09-CATALOGUE-AND-PRICING.md`.

## 6. Retention and privacy
- Proof files: delete 12 months after completion unless a dispute is open.
- Chat and agent logs: keep 90 days, strip personal identifiers.
- Deleted users: anonymise bookings (keep amounts and dates for accounting), remove profile and contact data.
