import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Sun, CarFront, MapPin, ChevronRight, Footprints } from "lucide-react";
import { db } from "@/lib/db";
import {
  getDestinationBySlug,
  getExperiencesByDestination,
  destinationTips,
  destinationDriveTimes,
} from "@/lib/data";
import { ExperienceCard } from "@/components/site/experience-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const destinations = await db.destination.findMany({ select: { slug: true } });
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: `${d.name}, Namibia`,
    description: `${d.tagline}. ${d.intro.slice(0, 140)}…`,
    openGraph: { images: [{ url: d.heroImage }] },
  };
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const [experiences, siblings] = await Promise.all([
    getExperiencesByDestination(slug),
    db.destination.findMany({
      where: { slug: { not: slug } },
      select: { slug: true, name: true },
      take: 6,
    }),
  ]);
  const tips = destinationTips(destination);
  const drives = destinationDriveTimes(destination);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.region}, Namibia.`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/60" />
        </div>
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-24 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
          <p className="eyebrow text-mustard">{destination.region}</p>
          <h1 className="mt-3 text-[40px] leading-[44px] sm:text-[56px] sm:leading-[62px] font-bold tracking-[-0.02em] text-white">
            {destination.name}
          </h1>
          <p className="mt-3 text-[18px] text-white/85">{destination.tagline}</p>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-12 lg:py-16">
          {/* Intro + facts */}
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="text-[18px] leading-[28px] text-ink">
                {destination.intro}
              </p>
              <h2 className="mt-10 text-[24px] font-bold text-ink">
                Local tips
              </h2>
              <ul className="mt-5 space-y-3.5">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                    <Footprints className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="space-y-5">
              <div className="rounded-xl border border-line bg-bone-50 p-6">
                <h2 className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
                  <Sun className="h-4 w-4 text-sand" aria-hidden="true" />
                  Best season
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                  {destination.bestSeason}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
                  <CarFront className="h-4 w-4 text-sand" aria-hidden="true" />
                  Getting there
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                  {destination.howToGetThere}
                </p>
                <dl className="mt-4 space-y-2 border-t border-line pt-4">
                  {drives.map((d) => (
                    <div key={d.from} className="flex justify-between gap-4 text-[14px]">
                      <dt className="text-ink-700">{d.from}</dt>
                      <dd className="tabular font-medium text-ink">{d.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 text-[13px] text-ink-500">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {destination.nearestTown}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="text-[16px] font-semibold text-ink">
                  Have a question?
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
                  Ask about guides, seasons or the drive — we answer on
                  WhatsApp.
                </p>
                <div className="mt-4">
                  <WhatsAppButton
                    message={`Hi Guidr, I'm planning a trip to ${destination.name}. Can you help?`}
                    className="w-full"
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* Experiences */}
          <section aria-labelledby="d-experiences" className="mt-16">
            <h2 id="d-experiences" className="text-[24px] font-bold text-ink">
              Guided experiences in {destination.name}
            </h2>
            {experiences.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {experiences.map((exp, i) => (
                  <ExperienceCard key={exp.id} experience={exp} priority={i < 3} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-line bg-bone-50 px-6 py-12 text-center">
                <p className="text-[16px] font-semibold text-ink">
                  No listings here yet.
                </p>
                <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-700">
                  We are onboarding operators in {destination.name} now. Ask on
                  WhatsApp and we will tell you what is coming.
                </p>
                <div className="mt-6 flex justify-center">
                  <WhatsAppButton
                    message={`Hi Guidr, what tours are coming to ${destination.name}?`}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Nearby */}
          <section aria-labelledby="nearby" className="mt-16">
            <h2 id="nearby" className="text-[24px] font-bold text-ink">
              Nearby destinations
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/destinations/${s.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[15px] font-medium text-ink-700 transition-colors hover:bg-bone-50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  {s.name}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
