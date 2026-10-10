"use client";

import Link from "next/link";
import { FootprintTrail } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-bone-50">
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-5 py-24 text-center lg:py-32">
        <FootprintTrail className="h-9" color="var(--line-strong)" />
        <p className="eyebrow mt-8 text-terracotta-700">500</p>
        <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[44px] sm:leading-[50px] font-bold tracking-[-0.02em] text-ink">
          Something broke on our side.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-700">
          The page hit an error we did not expect. Your booking requests and
          data are safe. Try again below, or reach us on WhatsApp and a human
          will sort it out.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-12 items-center rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-md border border-line-strong bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
          >
            Back to the home page
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {[
            { href: "/destinations", label: "Destinations" },
            { href: "/experiences", label: "All experiences" },
            { href: "/planner", label: "AI planner" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex h-11 items-center rounded-full border border-line bg-white px-5 text-[15px] font-medium text-ink-700 transition-colors hover:bg-bone hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <WhatsAppButton message="Hi Guidr, I hit an error on the site and need help." />
        </div>
        {error.digest && (
          <p className="mt-10 text-[13px] text-ink-500">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
