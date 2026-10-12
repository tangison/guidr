import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Check, Banknote, CalendarDays, LineChart, ShieldCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { FootprintIcon } from "@/components/site/logo";

export const metadata: Metadata = {
  alternates: { canonical: "/for-operators" },
  title: "For operators",
  description:
    "List your tours on Guidr: your prices, requests to WhatsApp, commission on completed bookings only, weekly settlement.",
};

const BENEFITS = [
  {
    icon: MessageCircle,
    title: "Requests arrive on WhatsApp",
    text: "A traveller requests, you get the message you already check. Accept or decline in one tap. No dashboard to babysit.",
  },
  {
    icon: Banknote,
    title: "Your money, on a schedule",
    text: "Travellers pay Guidr once card payments are live; we settle your share weekly or fortnightly, after the trip runs. Every booking records the split: gross, commission, fees, refunds, your balance.",
  },
  {
    icon: CalendarDays,
    title: "A calendar that respects your season",
    text: "Block dates, set capacity per slot, price the high season differently. Your listing, your rules, your cancellation policy.",
  },
  {
    icon: LineChart,
    title: "Numbers without noise",
    text: "Views, requests, conversion and revenue per listing. The dashboard tells you what to fix; nothing else.",
  },
];

const STEPS = [
  { step: "01", title: "Apply", text: "Business details, your guides, the trips you run. Takes ten minutes; we reply within two working days." },
  { step: "02", title: "List", text: "A guided wizard builds your listing: photos, itinerary, pricing, policies. We review before it goes live." },
  { step: "03", title: "Confirm", text: "Requests arrive on WhatsApp and email. Accept, decline or reschedule; the traveller is informed either way." },
  { step: "04", title: "Get paid", text: "Once payments run through Guidr, the traveller pays us and your share is settled on the agreed schedule after the trip. Until then, payment is arranged directly with the traveller. Either way, commission accrues on completed trips only." },
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "A small monthly listing fee per published experience plus a commission on completed bookings. Nothing is charged on requests, cancellations or no-shows. Exact figures are set with each operator before launch; see the fees section below.",
  },
  {
    q: "Who handles cancellations?",
    a: "Your cancellation policy, enforced by Guidr. You choose one of three presets: flexible (24 h), moderate (48 h) or strict (7 days), and the platform handles the messaging and the timing.",
  },
  {
    q: "Do I need to be online all day?",
    a: "No. Requests expire automatically if you cannot respond within 24 hours. Operators who confirm quickly in the daytime win noticeably more bookings than slow responders, so WhatsApp notifications are worth having on.",
  },
  {
    q: "What about payments?",
    a: "Guidr is built on the marketplace model: the traveller pays once, we record the split, and your share is settled weekly or fortnightly after the trip runs, subject to any refund conditions. Until card payments go live on the site, you arrange payment directly with the traveller, we charge no commission on those trips, and only the listing fee applies.",
  },
];

export default function ForOperatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/experiences/desert-walk.jpg"
            alt="A guided tour group walking across golden desert sand in Namibia."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/60" />
        </div>
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-24 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-mustard">For operators</p>
            <h1 className="mt-4 text-[40px] leading-[44px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-white">
              More bookings, without more admin.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[18px] leading-[28px] text-white/85">
              Guidr sends you ready travellers, dated, sized and informed,
              straight to the WhatsApp you already answer. You keep your
              prices, your policies and your money.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/for-operators#apply"
                className="btn btn-primary btn-lg btn-on-dark"
              >
                Apply to list
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <WhatsAppButton
                message="Hi Guidr, I run tours and I'd like to list them."
                size="lg"
                className="!bg-white/10 hover:!bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-700">Why operators stay</p>
            <h2 id="benefits" className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink">
              Built around how you already work
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-lg border border-line bg-bone-50 p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-terracotta-700">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[20px] font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How listing works */}
      <section aria-labelledby="process" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-700">How listing works</p>
            <h2 id="process" className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink">
              From application to first booking
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.step} className="rounded-lg border border-line bg-white p-6">
                <span className="tabular text-[28px] font-bold text-line-strong">{s.step}</span>
                <h3 className="mt-3 text-[20px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" aria-labelledby="fees" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <p className="eyebrow text-terracotta-700">Fees, plainly</p>
              <h2 className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink">
                You pay for results, not for listing
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
                Guidr charges a small monthly fee per published listing and a
                commission on completed bookings. Requests, declines,
                cancellations and no-shows cost you nothing. Invoices arrive
                twice a month, payable by EFT or payment link, the same
                methods you offer your travellers.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Commission accrues only when a booking reaches COMPLETED",
                  "Weekly or fortnightly settlement, after the trip runs",
                  "No lock-in: pause or unpublish any month",
                  "First 90 days of listing fees waived for launch operators",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-700">
                    <FootprintIcon className="mt-1 h-4 w-auto shrink-0" color="var(--terracotta)" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-md bg-bone-50 p-4 text-[14px] leading-relaxed text-ink-500">
                Exact fee and commission figures are finalised with each
                operator before launch. Nothing on this page is a contract;
                the operator agreement is.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bone-50 p-6 sm:p-8">
              <h3 className="text-[18px] font-semibold text-ink">How one booking splits</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                A traveller pays Guidr for a confirmed trip; we record the
                split the moment the booking is made and settle your share
                on the agreed schedule.
              </p>
              <dl className="mt-5 space-y-4 text-[15px]">
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-ink-700">Traveller pays</dt>
                  <dd className="tabular font-semibold text-ink">N$ 2,000</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-ink-700">Guidr commission, 15% working rate</dt>
                  <dd className="tabular text-ink-700">N$ 300</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-ink-700">Your share, settled after the trip</dt>
                  <dd className="tabular font-semibold text-ink">N$ 1,700</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-700">Card processing fee</dt>
                  <dd className="tabular text-ink-700">provider rate, once live</dd>
                </div>
              </dl>
              <p className="mt-6 text-[13px] leading-relaxed text-ink-500">
                Illustrative figures only: the 15% rate is the working
                default, finalised per operator in writing. Payment fees,
                taxes, refunds and agreed adjustments can change the final
                amounts. The ledger on each booking is the record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="bg-bone-50">
        <div className="mx-auto max-w-[900px] px-5 lg:px-8 py-16 lg:py-24">
          <p className="eyebrow text-terracotta-700">Questions operators ask</p>
          <h2 id="faq" className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink">
            Straight answers
          </h2>
          <div className="mt-8 space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-lg border border-line bg-white p-5 sm:p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[17px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 rounded-sm">
                  {f.q}
                  <span className="shrink-0 text-ink-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" aria-labelledby="apply-cta" className="bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-mustard">Applications open</p>
              <h2 id="apply-cta" className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-white">
                Bring your trips to the launch catalogue
              </h2>
              <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-white/80">
                We are onboarding the first cohort of coast operators now.
                Launch partners get three months of listing fees waived and
                founding-operator placement on the home page.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Tourism registration details", "At least five photos per experience", "A WhatsApp number you actually answer", "Bank details or your own payment link"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px] text-white/80">
                    <Check className="h-4 w-4 shrink-0 text-mustard" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-6 sm:p-8">
              <h3 className="text-[18px] font-semibold text-ink">Start the conversation</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                The fastest path is WhatsApp. Tell us what you run and where.
                We reply within a working day.
              </p>
              <div className="mt-5 space-y-3">
                <WhatsAppButton
                  message="Hi Guidr, I'd like to list my tours. Here is what we run: "
                  className="w-full"
                  size="lg"
                />
                <Link
                  href="mailto:operators@getguidr.com"
                  className="btn btn-outline btn-md btn-block"
                >
                  operators@getguidr.com
                </Link>
              </div>
              <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-ink-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Every operator and first listing is reviewed by a human before
                going live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
