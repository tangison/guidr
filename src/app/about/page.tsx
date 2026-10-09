import type { Metadata } from "next";
import Link from "next/link";
import { GuidrLockup, FootprintTrail, FootprintIcon } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Guidr is the friendly local alternative to global booking sites: curated Namibian operators, honest prices, WhatsApp-first. Built by Tangison Studio.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8 py-12 lg:py-24">
        <p className="eyebrow text-terracotta-700">About</p>
        <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-ink">
          The friendly local alternative.
        </h1>

        <div className="mt-8 space-y-6 text-[17px] leading-[28px] text-ink-700">
          <p>
            Global booking sites make Namibia look like a warehouse of
            activities: same filters, same stock photos, a 20 percent markup
            and a support queue in another hemisphere. Travellers deserve
            better, and so do the operators who actually run the trips.
          </p>
          <p>
            Guidr is a marketplace for guided tours and activities built the
            way a local would build it. Curated operators instead of an open
            flood. WhatsApp instead of ticket queues. The operator's own
            price, paid directly to the operator, instead of a middleman
            markup. And an AI planner that only recommends trips that exist,
            at prices that are real.
          </p>
          <p>
            We launch where we live: the coast — Swakopmund and Walvis Bay.
            From there, inland: Sossusvlei, Etosha, Damaraland, Fish River,
            Spitzkoppe. Every operator is approved by a human, every listing
            is reviewed before it goes live, and every review is tied to a
            completed booking.
          </p>
        </div>

        <FootprintTrail className="my-12 h-9" color="var(--sand)" />

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Honest data",
              text: "The interface and the AI show only prices and availability that come from real records. Demo listings are labelled as demo.",
            },
            {
              title: "WhatsApp first",
              text: "Every key moment — request, confirmation, payment, reminder — has a WhatsApp path. Because that is how Namibia actually communicates.",
            },
            {
              title: "Guidr never holds the money",
              text: "Travellers pay operators directly by bank transfer or the operator's own payment link. We are a marketplace, not a bank.",
            },
          ].map((v) => (
            <div key={v.title}>
              <h2 className="flex items-center gap-2 text-[18px] font-semibold text-ink">
                <FootprintIcon className="h-4 w-auto" color="var(--terracotta)" />
                {v.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact" className="mt-16 rounded-xl bg-bone p-8 sm:p-10">
          <h2 id="contact" className="text-[24px] font-bold text-ink">
            Talk to us
          </h2>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-700">
            WhatsApp is fastest. Email works too. We answer in the daytime,
            Windhoek time, and usually much faster.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton message="Hi Guidr, I have a question." size="lg" />
            <Link
              href="mailto:hello@getguidr.com"
              className="inline-flex h-12 items-center rounded-md border border-line-strong bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
            >
              hello@getguidr.com
            </Link>
          </div>
          <dl className="mt-8 grid gap-4 text-[15px] sm:grid-cols-2">
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">Domain</dt>
              <dd className="mt-1 text-ink">getguidr.com</dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">Based</dt>
              <dd className="mt-1 text-ink">Swakopmund, Namibia</dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">For operators</dt>
              <dd className="mt-1 text-ink">operators@getguidr.com</dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">Press and brand</dt>
              <dd className="mt-1 text-ink">press@getguidr.com</dd>
            </div>
          </dl>
        </section>

        {/* Credits */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <GuidrLockup className="h-14 w-auto" />
          <p className="text-[13px] text-ink-500">
            Built by{" "}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-700 underline underline-offset-4 hover:text-ink"
            >
              Tangison Studio
            </a>
            , a division of Tangison Technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
