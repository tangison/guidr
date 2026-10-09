# 03. Booking and Payments

Guidr never holds traveller funds in v1. This document defines the booking life cycle, the two payment methods and operator billing.

## 1. Booking states

```
DRAFT
  -> REQUESTED            traveller submits
REQUESTED
  -> ACCEPTED             operator accepts
  -> DECLINED             operator declines (reason required)
  -> EXPIRED              no response in 24 h
  -> CANCELLED_BY_TRAVELLER
ACCEPTED (= awaiting payment)
  -> PROOF_SUBMITTED      traveller uploaded proof or pressed "I have paid"
  -> CANCELLED_BY_TRAVELLER
  -> CANCELLED_BY_OPERATOR
  -> EXPIRED_UNPAID       payment deadline passed
PROOF_SUBMITTED
  -> PAID                 operator confirms
  -> ACCEPTED             operator rejects the proof (reason)
PAID
  -> COMPLETED            trip date passed and operator (or traveller) confirms; auto after 48 h unless disputed
  -> CANCELLED_BY_TRAVELLER / CANCELLED_BY_OPERATOR   (refund handled between the parties, recorded here)
  -> NO_SHOW
  -> DISPUTED
COMPLETED
  -> (review opens; commission accrues)
DISPUTED
  -> RESOLVED (admin decision recorded)
```

Every transition writes an immutable event (who, when, from, to, note) used for the timeline, support and audit.

## 2. Timings and reminders

| Event | Rule |
|---|---|
| Operator response | 24 h; reminders at 2 h, 8 h and 20 h |
| Payment deadline | Default 24 h after acceptance, or 48 h before the trip if sooner; configurable per listing |
| Proof review | Reminder to operator after 6 h |
| Trip reminders | 48 h and 3 h before |
| Auto-complete | 48 h after the trip date unless disputed |
| Review window | 14 days after completion |

## 3. Payment method A: bank transfer (EFT)

1. Operator stores bank details and optional instructions in the portal.
2. After acceptance the traveller sees: bank name, account name, account number, branch code, **unique reference** (for example `GD-7K3F92`), exact amount and deadline.
3. Traveller pays, then uploads a proof-of-payment (PDF, JPG or PNG, up to 10 MB) or enters the bank reference.
4. Operator checks their bank account and presses **Mark paid** (or **Reject proof** with a reason).
5. Traveller receives confirmation and the voucher.

Rules:
- Bank details are visible only to the traveller of that booking, after acceptance.
- Uploaded files are scanned, renamed, stored privately and served with short-lived signed links.
- The reference code is checked for uniqueness. It is never reused.
- Show the amount in the operator's currency. If the traveller sees USD, show the N$ amount that will actually be due.

## 4. Payment method B: operator payment link

1. Operator stores one or more payment links (for example a bank or card provider's hosted link) and an optional instruction line.
2. After acceptance the traveller sees a button **Pay the operator**. A notice explains they leave Guidr and pay the operator directly.
3. Guidr appends the booking reference where the provider supports it (query parameter or note). **[VERIFY]** per provider.
4. Traveller returns and presses **I have paid** with an optional receipt upload.
5. Operator confirms in the portal.

Rules:
- Links must be https and are checked against a domain allow-list the admin maintains; unknown domains need admin approval.
- Display the destination domain to the traveller before redirecting.
- Guidr is not a party to the payment and states this plainly. Refunds are the operator's responsibility under the cancellation policy shown at booking.

## 5. Cancellation and refunds
- Policy presets: **Flexible** (free until 24 h before), **Moderate** (free until 48 h), **Strict** (free until 7 days; 50 percent until 48 h).
- The policy in force is frozen on the booking at request time.
- Guidr shows what the traveller should expect and records the outcome; refunds are paid by the operator outside Guidr. The operator marks the refund as sent, and the traveller can confirm receipt.
- Operator cancellations: traveller is offered alternatives and a full refund; repeated cancellations lower the operator's ranking and trigger review.

## 6. Preventing leakage (off-platform bookings)
Reasonable measures, not punishment:
- Reviews, vouchers, trip reminders and itinerary tools live on Guidr.
- Repeat-traveller perks (for example early access, trip history).
- Operator agreement requires bookings started on Guidr to be completed through Guidr. Enforcement is by agreement and relationship, not by blocking contact.
- Do not hide operator WhatsApp numbers after acceptance; hiding them before acceptance is allowed.

## 7. Operator billing

**Charges**
- **Listing fee:** a fixed monthly amount per operator (**D3**).
- **Commission:** a percentage of each COMPLETED booking's price at booking time (**D3**).

**Billing runs**
- Twice a month: on the **1st** (covers the 16th to month end) and the **16th** (covers the 1st to the 15th). The monthly fee is added to the first run of each month.
- Admin previews the run, edits if needed, then sends. Each invoice has a unique number (`GD-INV-2026-000123`), a statement of bookings, totals, due date (default 7 days), and both payment methods: EFT with reference, or a payment link.
- Operators see invoices in the portal. Marking an invoice paid is an admin action after the bank deposit is seen (or automatic if a reconcilable payment link is later adopted).

**Late payment**
- Reminder 2 days before due, on the due date, and 3 days after.
- After 7 days overdue: new requests are paused; after 14 days: listings hidden. Existing confirmed bookings are never cancelled by Guidr.
- Admin can grant extensions and waivers; every change is logged.

**Tax and invoices**
- Guidr issues commission and fee invoices to operators. Whether Guidr must charge VAT and how invoices must be formatted needs an accountant's confirmation **[VERIFY]**.
- Guidr does not issue tax invoices for the tour itself; the operator does. Guidr provides a booking confirmation and voucher.

## 8. Data recorded per booking (for accounting)
Price per person, guests, total, currency, FX rate used, commission rate at booking, commission amount, payment method, paid timestamp, completed timestamp, cancellation policy, refund notes, invoice id once billed.

## 9. Edge cases to design for
- Operator accepts then asks to change the date: creates a change request the traveller must accept.
- Traveller pays the wrong amount: operator records a short payment; booking stays PROOF_SUBMITTED with a note.
- Duplicate proof uploads; proof for a different booking (reject with reason).
- Capacity race: two requests for the last seat. Operator accepts one; the other is offered alternatives.
- Currency mismatch between listing and operator bank.
- Traveller cancels after paying; operator disputes the refund.
- Operator account suspended with open bookings: admin takes over communication.

## 10. Future payment upgrades (not v1)
- Reconcilable hosted payment links with webhooks (for example through a local gateway or bank merchant facility).
- Collecting deposits through Guidr with split payouts, which requires legal and licensing review **[VERIFY]**.
- Card payments for operator subscription fees through a merchant-of-record or Stripe, depending on the legal entity and country eligibility **[VERIFY]**.
