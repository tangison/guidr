import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceCard } from "@/components/site/experience-card";
import { ExperienceFilters } from "@/components/site/experience-filters";
import { FootprintTrail } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { searchExperiences, getAllDestinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Browse guided tours and activities across Namibia: the coast, the desert, the wild. Honest prices from local operators.",
};

type SearchParams = Promise<{
  q?: string;
  destination?: string;
  category?: string;
  sort?: string;
}>;

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const [results, destinations] = await Promise.all([
    searchExperiences({
      q: sp.q,
      destination: sp.destination,
      category: sp.category,
      sort: sp.sort,
    }),
    getAllDestinations(),
  ]);

  return (
    <div className="bg-bone-50">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-12 lg:py-16">
        <header className="max-w-2xl">
          <p className="eyebrow text-terracotta-700">The catalogue</p>
          <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-ink">
            Every guided experience we list
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
            Sixteen experiences across seven destinations, each run by a local
            operator. Prices shown are the operator's own; demo listings are
            labelled until real operators go live.
          </p>
        </header>

        <div className="mt-12">
          <ExperienceFilters
            destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
          />
        </div>

        <p className="mt-8 text-[14px] text-ink-500 tabular" role="status">
          {results.length} {results.length === 1 ? "experience" : "experiences"}
          {sp.q ? ` matching “${sp.q}”` : ""}
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-line bg-white px-6 py-16 text-center">
            <FootprintTrail className="mx-auto h-9" color="var(--line-strong)" />
            <h2 className="mt-5 text-[20px] font-semibold text-ink">
              No tours match yet.
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-700">
              Try another date or category, or ask the planner: it will
              suggest the closest experiences in the catalogue.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/planner"
                className="inline-flex h-11 items-center rounded-md bg-terracotta px-5 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
              >
                Ask the planner
              </Link>
              <WhatsAppButton message="Hi Guidr, I'm looking for a tour and could use some help." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
