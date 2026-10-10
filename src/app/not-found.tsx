import Link from "next/link";
import { Search } from "lucide-react";
import { FootprintTrail } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function NotFound() {
  return (
    <div className="bg-bone-50">
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-5 py-24 text-center lg:py-32">
        <FootprintTrail className="h-9" color="var(--line-strong)" />
        <p className="eyebrow mt-8 text-terracotta-700">404</p>
        <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[44px] sm:leading-[50px] font-bold tracking-[-0.02em] text-ink">
          The trail ends here.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-700">
          This page does not exist, or it wandered off like everything else
          in the desert. The map below gets you back on track.
        </p>
        <form action="/experiences" method="get" role="search" aria-label="Search experiences" className="mt-8 flex w-full max-w-md gap-2.5">
          <label className="flex h-12 flex-1 items-center gap-2.5 rounded-md border border-line bg-white px-4 focus-within:border-terracotta-700 focus-within:ring-2 focus-within:ring-terracotta-50">
            <Search className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
            <span className="sr-only">Search experiences</span>
            <input
              type="search"
              name="q"
              placeholder="Search experiences…"
              className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="h-12 rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
          >
            Search
          </button>
        </form>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {[
            { href: "/destinations", label: "Destinations" },
            { href: "/experiences", label: "All experiences" },
            { href: "/planner", label: "AI planner" },
            { href: "/how-it-works", label: "How it works" },
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
          <WhatsAppButton message="Hi Guidr, I'm looking for a page that seems to be missing." />
        </div>
      </div>
    </div>
  );
}
