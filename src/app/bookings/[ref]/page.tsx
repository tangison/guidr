import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  MapPin,
  CalendarDays,
  Users,
  ChevronRight,
} from "lucide-react";
import { getBookingByRef } from "@/lib/data";
import { formatPrice, formatDate, formatDuration } from "@/lib/format";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { FootprintIcon } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Your booking",
  robots: { index: false },
};

type Params = Promise<{ ref: string }>;
type Search = Promise<{ sent?: string }>;

/**
 * The normalized view the confirmation renders from. It comes from the
 * database normally, or from the short-lived receipt cookie set by the
 * server action when the write and the redirect land on different
 * serverless instances.
 */
type BookingView = {
  ref: string;
  status: string;
  travellerEmail: string;
  date: string;
  guests: number;
  notes: string | null;
  totalPriceMinor: number;
  currency: string;
  experience: {
    slug: string;
    title: string;
    durationMinutes: number;
    meetingPoint: string;
    operator: { name: string; whatsapp: string };
  };
};

const STEPS = [
  { key: "requested", label: "Request sent", hint: "The operator has your request." },
  { key: "accepted", label: "Confirmed", hint: "Your guide confirms the date and price." },
  { key: "awaiting_payment", label: "Payment", hint: "At launch you pay through Guidr; while we launch, pay the operator directly by EFT or their payment link." },
  { key: "paid", label: "Paid", hint: "The operator marks your payment received." },
  { key: "completed", label: "Trip done", hint: "Walked, ridden, flown. A review would help the next traveller." },
];

function stepIndex(status: string): number {
  switch (status) {
    case "requested":
      return 0;
    case "accepted":
      return 1;
    case "awaiting_payment":
      return 2;
    case "paid":
      return 3;
    case "completed":
      return 4;
    default:
      return 0;
  }
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { ref } = await params;
  const { sent } = await searchParams;
  let booking: BookingView | null = await getBookingByRef(ref);
  let fromReceipt = false;
  if (!booking && sent) {
    try {
      const jar = await cookies();
      const receipt = JSON.parse(jar.get("gdr_receipt")?.value ?? "null");
      if (receipt && receipt.ref === ref) {
        booking = receipt as BookingView;
        fromReceipt = true;
      }
    } catch {
      // malformed cookie: fall through to the 404
    }
  }
  if (!booking) notFound();

  const exp = booking.experience;
  const current = stepIndex(booking.status);
  const declined = ["declined", "expired", "cancelled"].includes(booking.status);

  return (
    <div className="bg-bone-50">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/experiences" className="hover:text-ink">
                Experiences
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-ink">
              Booking {booking.ref}
            </li>
          </ol>
        </nav>

        {sent && !declined && (
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-line bg-white p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
              <CheckCircle2 className="h-6 w-6 text-terracotta" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-[22px] font-bold text-ink">
                Your request is with the operator.
              </h1>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
                {exp.operator.name} usually confirms within four hours in the
                daytime, and always within 24 hours. We have emailed the
                details to {booking.travellerEmail}. Keep this page for the
                live status.
              </p>
              {fromReceipt && (
                <p className="mt-2 text-[13px] text-ink-500">
                  This confirmation comes straight from your request; the
                  live status catches up here shortly.
                </p>
              )}
            </div>
          </div>
        )}

        {declined && (
          <div className="mt-6 rounded-xl border border-line bg-white p-6">
            <h1 className="text-[22px] font-bold text-ink">
              This request did not go ahead.
            </h1>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
              {booking.status === "expired"
                ? "The operator did not respond within 24 hours, so the request expired. Nothing was ever owed."
                : booking.status === "cancelled"
                  ? "The booking was cancelled. Nothing further is owed."
                  : "The operator declined this request."}{" "}
              Here are similar experiences, or ask on WhatsApp and we will
              find you an alternative.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0 space-y-8">
            <section aria-labelledby="status" className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 id="status" className="text-[20px] font-bold text-ink">
                Status
              </h2>
              {!declined && (
                <p className="mt-1 text-[14px] text-ink-500">
                  Reference {booking.ref}
                </p>
              )}
              <ol className="mt-6">
                {STEPS.map((step, i) => {
                  const done = i < current;
                  const active = i === current;
                  return (
                    <li key={step.key} className="relative flex gap-5 pb-8 last:pb-0">
                      {i < STEPS.length - 1 && (
                        <span
                          className={`absolute left-[15px] top-9 bottom-0 w-px ${done ? "bg-success" : "bg-line"}`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                          done
                            ? "border-success bg-success/10"
                            : active
                              ? "border-terracotta bg-terracotta-50"
                              : "border-line bg-white"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                        ) : (
                          <FootprintIcon
                            className="h-4 w-auto"
                            color={active ? "var(--terracotta)" : "var(--line-strong)"}
                          />
                        )}
                      </span>
                      <div>
                        <p
                          className={`text-[16px] font-semibold ${
                            active ? "text-terracotta-700" : done ? "text-success" : "text-ink-500"
                          }`}
                        >
                          {step.label}
                          {active && (
                            <span className="ml-2 rounded-full bg-terracotta-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide">
                              current
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[14px] leading-relaxed text-ink-700">
                          {step.hint}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-6 rounded-md bg-bone-50 p-4 text-[14px] leading-relaxed text-ink-700">
                Every step also arrives by email. If anything is unclear,{" "}
                <span className="font-medium text-ink">reply to that email</span>{" "}
                or use the WhatsApp button here.
              </div>
            </section>

            <section aria-labelledby="voucher" className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 id="voucher" className="text-[20px] font-bold text-ink">
                The trip
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Experience
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-ink">
                    <Link href={`/experiences/${exp.slug}`} className="underline-offset-4 hover:underline">
                      {exp.title}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Operator
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink">{exp.operator.name}</dd>
                </div>
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Date
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-[15px] text-ink">
                    <CalendarDays className="h-4 w-4 text-ink-500" aria-hidden="true" />
                    {formatDate(booking.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Guests
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-[15px] text-ink">
                    <Users className="h-4 w-4 text-ink-500" aria-hidden="true" />
                    {booking.guests}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Duration
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-[15px] text-ink">
                    <Clock3 className="h-4 w-4 text-ink-500" aria-hidden="true" />
                    {formatDuration(exp.durationMinutes)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Meeting point
                  </dt>
                  <dd className="mt-1 flex items-start gap-2 text-[15px] text-ink">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                    {exp.meetingPoint}
                  </dd>
                </div>
                <div className="sm:col-span-2 border-t border-line pt-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Total (set at confirmation)
                  </dt>
                  <dd className="mt-1 text-[20px] font-bold text-ink tabular">
                    {formatPrice(booking.totalPriceMinor, booking.currency)}
                    <span className="ml-2 text-[13px] font-normal text-ink-500">
                      estimate for {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                    </span>
                  </dd>
                </div>
              </dl>
              {booking.notes && (
                <div className="mt-5 rounded-md bg-bone-50 p-4">
                  <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                    Your notes
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-700">
                    {booking.notes}
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-line bg-white p-6">
              <h2 className="text-[18px] font-bold text-ink">Talk to a human</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                The operator and the Guidr team are one WhatsApp message away.
                Quote reference {booking.ref}.
              </p>
              <div className="mt-4 space-y-3">
                <WhatsAppButton
                  message={`Hi Guidr, about booking ${booking.ref} (${exp.title}): I have a question.`}
                  className="w-full"
                />
                <a
                  href={`https://wa.me/${exp.operator.whatsapp}?text=${encodeURIComponent(
                    `Hi, I have a booking request for ${exp.title} on ${formatDate(booking.date)} (${booking.ref}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-line-strong bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message the operator
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-bone-50 p-6">
              <h2 className="text-[18px] font-bold text-ink">
                How payment works
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                While we launch, you pay the operator directly after they
                confirm: by bank transfer with a proof-of-payment upload, or
                through their own payment link. At launch, payment runs
                through Guidr and the operator's share is settled after the
                trip.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
