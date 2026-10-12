import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sun, CarFront, MapPin } from "lucide-react";
import { getAllDestinations } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/destinations" },
  title: "Destinations",
  description:
    "Where Guidr operates: Swakopmund, Walvis Bay, Sossusvlei, Etosha, Damaraland, Fish River Canyon and Spitzkoppe: seasons, drive times and local tips.",
};

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-12 lg:py-16">
        <header className="max-w-2xl">
          <p className="eyebrow text-terracotta-700">Where we operate</p>
          <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-ink">
            Namibia, destination by destination
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
            We launch at the coast, Swakopmund and Walvis Bay, and expand
            inland as operators join. Each destination page carries the
            seasons, the drive times and the local tips that usually take
            three conversations to collect.
          </p>
        </header>

        <div className="mt-12 space-y-16">
          {destinations.map((d, i) => (
            <article
              key={d.slug}
              className={`grid gap-8 lg:gap-16 lg:items-center ${
                i % 2 === 1 ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
              }`}
            >
              <Link
                href={`/destinations/${d.slug}`}
                className={`group relative block aspect-[16/10] overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-700 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={d.heroImage}
                  alt={`${d.name}, ${d.region}, Namibia.`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {d.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-terracotta-700">
                    Launch region
                  </span>
                )}
              </Link>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="eyebrow text-terracotta-700">{d.region}</p>
                <h2 className="mt-2 text-[26px] leading-[32px] sm:text-[34px] sm:leading-[40px] font-bold tracking-[-0.015em] text-ink">
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-700"
                  >
                    {d.name}
                  </Link>
                </h2>
                <p className="mt-1 text-[16px] text-ink-500">{d.tagline}</p>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-ink-700 line-clamp-4">
                  {d.intro}
                </p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5">
                    <Sun className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden="true" />
                    <div>
                      <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                        Best season
                      </dt>
                      <dd className="mt-0.5 text-[14px] leading-snug text-ink-700">
                        {d.bestSeason}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CarFront className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden="true" />
                    <div>
                      <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
                        Nearest town
                      </dt>
                      <dd className="mt-0.5 text-[14px] leading-snug text-ink-700">
                        {d.nearestTown}
                      </dd>
                    </div>
                  </div>
                </dl>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-md border border-line-strong bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  Explore {d.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-xl bg-ink p-8 sm:p-12">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <MapPin className="hidden h-10 w-10 text-mustard lg:block" aria-hidden="true" />
            <div>
              <h2 className="text-[22px] font-bold text-white">
                Somewhere we do not cover yet?
              </h2>
              <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-white/80">
                We expand as operators join. If you guide trips anywhere in
                Namibia, or you are a traveller looking for somewhere in
                particular, tell us, and we will prioritise it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
