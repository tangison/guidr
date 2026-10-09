import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[720px] px-5 lg:px-8 py-12 lg:py-20">
        <nav aria-label="Legal" className="text-[13px] text-ink-500">
          <Link href="/" className="hover:text-ink underline-offset-2 hover:underline">
            Home
          </Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <span className="font-medium text-ink">Legal</span>
        </nav>
        <h1 className="mt-6 text-[32px] leading-[38px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.02em] text-ink">
          {title}
        </h1>
        <p className="mt-2 text-[14px] text-ink-500">Last updated: {updated}</p>

        <div className="mt-8 rounded-md border border-line bg-terracotta-50 p-4">
          <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
            This text is a working placeholder. It must be reviewed by a
            lawyer familiar with Namibian law before launch — see the
            content-and-legal notes in the project pack.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[20px] font-semibold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[26px] text-ink-700">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-6 text-[13px] text-ink-500">
          Questions about this document? Email{" "}
          <a href="mailto:legal@getguidr.com" className="text-ink-700 underline underline-offset-4 hover:text-ink">
            legal@getguidr.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
