import type { Metadata } from "next";
import Link from "next/link";
import { Search, MessageCircle, ClipboardCheck, CalendarCheck2, Banknote, ShieldCheck, Footprints } from "lucide-react";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How booking through Guidr works for travellers: find a guided experience, request it, the operator confirms on WhatsApp, and you pay them directly. No middleman.",
};

const TRAVELLER_STEPS = [
  { icon: Search, title: "Find it", text: "Search by place, date and pace. Filters for family-friendly, duration and price. Every listing states its cancellation policy up front." },
  { icon: MessageCircle, title: "Request it", text: "One form sends your dates, party size and any notes. No account needed; a WhatsApp number speeds everything up." },
  { icon: ClipboardCheck, title: "Get the yes", text: "The operator confirms — usually within four hours in the daytime, always within 24. If they cannot take the date, we offer alternatives." },
  { icon: CalendarCheck2, title: "Take the trip", text: "A voucher with the meeting point, the guide's contact and the plan. After the trip, a review helps the next traveller." },
];

const PAYMENT_POINTS = [
  {
    icon: Banknote,
    title: "Bank transfer (EFT)",
    text: "After confirmation you get the operator's bank details with a unique reference. Upload the proof of payment in the booking thread; the operator marks it received.",
  },
  {
    icon: ShieldCheck,
    title: "The operator's payment link",
    text: "Some operators use their own payment page. Guidr shows you exactly which domain you are going to before you leave, and you upload the receipt the same way.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-12 lg:py-16">
        <header className="max-w-2xl">
          <p className="eyebrow text-terracotta-700">How it works</p>
          <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-ink">
            A request, a confirmation, a trip.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
            Guidr is deliberately simple: you deal with the guide, the guide
            deals with you, and we keep the information honest and the
            paperwork light. Four steps for travellers:
          </p>
        </header>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {TRAVELLER_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-line bg-bone-50 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-terracotta-700">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="tabular text-[28px] font-bold text-line-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-4 text-[20px] font-semibold text-ink">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* Payment */}
        <section aria-labelledby="payment" className="mt-16 rounded-xl bg-ink p-8 sm:p-12">
          <p className="eyebrow text-mustard">Money, plainly</p>
          <h2 id="payment" className="mt-2 text-[26px] leading-[32px] sm:text-[34px] sm:leading-[40px] font-bold tracking-[-0.015em] text-white">
            You pay the operator. Not us.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-white/80">
            In version 1, Guidr never holds traveller money. After the
            operator confirms, payment goes directly to them by one of two
            routes:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PAYMENT_POINTS.map((p) => (
              <div key={p.title} className="rounded-lg bg-white/5 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-mustard">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-[14px] leading-relaxed text-white/70">
            If anything goes wrong — a late reply, a dispute, a refund question
            — the booking thread keeps every event, and the Guidr team can
            step in and read exactly what happened.
          </p>
        </section>

        {/* Cancellations */}
        <section aria-labelledby="cancellation" className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
          <div>
            <p className="eyebrow text-terracotta-700">Cancellations</p>
            <h2 id="cancellation" className="mt-2 text-[26px] leading-[32px] sm:text-[34px] sm:leading-[40px] font-bold tracking-[-0.015em] text-ink">
              Three policies, stated up front
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
              Every listing carries one of three cancellation presets, chosen
              by the operator and shown before you request. No hidden terms,
              no fine print released after booking.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { name: "Flexible", rule: "Free cancellation up to 24 hours before the trip." },
              { name: "Moderate", rule: "Free cancellation up to 48 hours before the trip." },
              { name: "Strict", rule: "Free cancellation up to 7 days before the trip." },
            ].map((c) => (
              <div key={c.name} className="flex items-start gap-4 rounded-lg border border-line bg-white p-5">
                <Footprints className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
                <div>
                  <p className="text-[17px] font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[15px] text-ink-700">{c.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 flex flex-col items-start gap-5 rounded-xl bg-bone p-8 sm:p-10">
          <div>
            <h2 className="text-[24px] font-bold text-ink">Still deciding?</h2>
            <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-700">
              Ask the planner to sketch a plan for your dates — it only uses
              real catalogue experiences and honest prices — or message a
              human on WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/planner"
              className="inline-flex h-12 items-center rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
            >
              Try the planner
            </Link>
            <WhatsAppButton message="Hi Guidr, I have a question about booking a tour." size="lg" />
          </div>
        </section>
      </div>
    </div>
  );
}
