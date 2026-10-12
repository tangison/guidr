import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/legal" },
  title: "Legal",
  description: "Legal documents for getguidr.com.",
};

const DOCS = [
  { href: "/terms", title: "Terms of use", desc: "What Guidr is, what an account means, and where responsibilities sit." },
  { href: "/privacy-policy", title: "Privacy policy", desc: "What we collect, what we share, and how to export or delete your data." },
  { href: "/legal/cancellation", title: "Cancellation and refunds", desc: "The three cancellation presets and how refunds move." },
  { href: "/legal/operator-agreement", title: "Operator agreement", desc: "The arrangement between Guidr and the operators who list trips." },
];

export default function LegalIndex() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[720px] px-5 lg:px-8 py-12 lg:py-24">
        <p className="eyebrow text-terracotta-700">Legal</p>
        <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.02em] text-ink">
          The paperwork
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
          Written to be read. All of it is placeholder text until a lawyer
          familiar with Namibian law reviews each document before launch.
        </p>
        <ul className="mt-12 divide-y divide-line rounded-xl border border-line">
          {DOCS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-terracotta-700"
              >
                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold text-ink">{d.title}</span>
                  <span className="mt-0.5 block text-[14px] text-ink-500">{d.desc}</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
