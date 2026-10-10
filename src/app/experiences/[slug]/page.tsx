import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  Languages,
  MapPin,
  Check,
  X,
  Star,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { db } from "@/lib/db";
import {
  getExperienceBySlug,
  getSimilarExperiences,
  getExperienceReviews,
  experienceLists,
} from "@/lib/data";
import { formatFromPrice, formatDuration, CATEGORY_LABELS } from "@/lib/format";
import { BookingPanel } from "@/components/site/booking-panel";
import { ReviewStars, RatingBadge } from "@/components/site/review-stars";
import { ExperienceCard } from "@/components/site/experience-card";
import { FootprintIcon } from "@/components/site/logo";
import { waExperienceMessage } from "@/lib/whatsapp";

const POLICY_LABELS: Record<string, string> = {
  flexible: "Free cancellation 24 h before",
  moderate: "Free cancellation 48 h before",
  strict: "Cancellation 7 days before",
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const experiences = await db.experience.findMany({ select: { slug: true } });
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);
  if (!exp) return { title: "Experience not found" };
  return {
    title: exp.title,
    description: exp.summary,
    openGraph: {
      title: `${exp.title} · Guidr`,
      description: exp.summary,
      images: [{ url: exp.heroImage }],
    },
  };
}

export default async function ExperiencePage({ params }: { params: Params }) {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);
  if (!exp) notFound();

  const [reviews, similar] = await Promise.all([
    getExperienceReviews(exp.id),
    getSimilarExperiences(exp),
  ]);
  const lists = experienceLists(exp);
  const gallery = [exp.heroImage, ...lists.gallery].slice(0, 4);

  const structured = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: exp.title,
    description: exp.summary,
    image: exp.heroImage,
    touristType: lists.categories.map((c) => CATEGORY_LABELS[c] ?? c),
    itinerary: {
      "@type": "ItemList",
      itemListElement: lists.itinerary.map((step, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: step.title,
      })),
    },
    offers: {
      "@type": "Offer",
      price: (exp.priceMinor / 100).toFixed(0),
      priceCurrency: exp.currency,
      availability: "https://schema.org/InStock",
    },
    ...(exp.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: exp.rating.toFixed(1),
        reviewCount: exp.reviewCount,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-6 pb-12 lg:pt-8 lg:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-ink underline-offset-2 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/experiences" className="hover:text-ink underline-offset-2 hover:underline">
                  Experiences
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-ink">
                {exp.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/destinations/${exp.destinationSlug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-50 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-terracotta-700 hover:bg-terracotta-50/70"
              >
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {exp.destination.name}
              </Link>
              {exp.isDemo && (
                <span className="rounded-full bg-bone px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">
                  Demo listing
                </span>
              )}
            </div>
            <h1 className="mt-3 text-[32px] leading-[38px] sm:text-[44px] sm:leading-[50px] font-bold tracking-[-0.02em] text-ink">
              {exp.title}
            </h1>
            <div className="mt-3">
              <RatingBadge rating={exp.rating} count={exp.reviewCount} />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-700">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-ink-500" aria-hidden="true" />
                {formatDuration(exp.durationMinutes)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-ink-500" aria-hidden="true" />
                Max {exp.groupMax} per group
              </span>
              <span className="inline-flex items-center gap-2">
                <Languages className="h-4 w-4 text-ink-500" aria-hidden="true" />
                {lists.languages.join(", ")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-ink-500" aria-hidden="true" />
                {POLICY_LABELS[exp.policy] ?? "Moderate cancellation"}
              </span>
            </div>
          </header>

          {/* Gallery */}
          <div className="mt-8 grid gap-3 sm:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={gallery[0]}
                alt={exp.summary}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
              {gallery.slice(1).map((img, i) => (
                <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-auto sm:min-h-0">
                  <Image
                    src={img}
                    alt={`${exp.title}, view ${i + 2}`}
                    fill
                    sizes="(max-width: 640px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Body + booking panel */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="min-w-0">
              <p className="text-[18px] leading-[28px] text-ink-700">
                {exp.summary}
              </p>

              <section aria-labelledby="highlights" className="mt-12">
                <h2 id="highlights" className="text-[26px] font-bold text-ink">
                  Highlights
                </h2>
                <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  {lists.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-700">
                      <FootprintIcon className="mt-1 h-4 w-auto shrink-0" color="var(--terracotta)" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="itinerary" className="mt-12">
                <h2 id="itinerary" className="text-[26px] font-bold text-ink">
                  The plan, step by step
                </h2>
                <ol className="mt-6 space-y-0">
                  {lists.itinerary.map((step, i) => (
                    <li key={step.time} className="relative flex gap-5 pb-8 last:pb-0">
                      {/* Timeline spine */}
                      {i < lists.itinerary.length - 1 && (
                        <span
                          className="absolute left-[15px] top-9 bottom-0 w-px bg-line"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white">
                        <FootprintIcon className="h-4 w-auto" color="var(--terracotta)" />
                      </span>
                      <div className="min-w-0">
                        <p className="tabular text-[13px] font-semibold text-terracotta-700">
                          {step.time}
                        </p>
                        <h3 className="mt-0.5 text-[17px] font-semibold text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-[16px] leading-relaxed text-ink-700">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="description" className="mt-12">
                <h2 id="description" className="text-[26px] font-bold text-ink">
                  What this trip is
                </h2>
                <p className="mt-5 whitespace-pre-line text-[16px] leading-[26px] text-ink-700">
                  {exp.description}
                </p>
              </section>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <section aria-labelledby="included" className="rounded-lg border border-line bg-bone-50 p-6">
                  <h2 id="included" className="text-[20px] font-semibold text-ink">
                    Included
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {lists.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="not-included" className="rounded-lg border border-line bg-white p-6">
                  <h2 id="not-included" className="text-[20px] font-semibold text-ink">
                    Not included
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {lists.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section aria-labelledby="bring" className="mt-6 rounded-lg border border-line bg-white p-6">
                <h2 id="bring" className="text-[20px] font-semibold text-ink">
                  What to bring
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {lists.whatToBring.map((item) => (
                    <li
                      key={item}
                      className="inline-flex h-8 items-center rounded-full bg-bone-50 px-4 text-[13px] text-ink-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="meeting" className="mt-6 rounded-lg border border-line bg-white p-6">
                <h2 id="meeting" className="text-[20px] font-semibold text-ink">
                  Meeting point
                </h2>
                <p className="mt-3 flex items-start gap-2.5 text-[16px] leading-relaxed text-ink-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                  {exp.meetingPoint}
                </p>
              </section>

              {/* Operator card */}
              <section aria-labelledby="operator" className="mt-12">
                <h2 id="operator" className="text-[26px] font-bold text-ink">
                  Your operator
                </h2>
                <div className="mt-5 flex flex-col gap-5 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-[22px] font-semibold text-white">
                    {exp.operator.name
                      .replace(" (demo)", "")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[20px] font-semibold text-ink">
                        {exp.operator.name.replace(" (demo)", "")}
                      </p>
                      {exp.operator.isDemo && (
                        <span className="rounded-full bg-bone px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-500">
                          Demo
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[14px] text-ink-500">
                      {exp.operator.tagline}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-700">
                      {exp.operator.about}
                    </p>
                    <p className="mt-3 text-[13px] text-ink-500 tabular">
                      {exp.operator.yearsRunning} years running · based in{" "}
                      {exp.operator.baseCity}
                    </p>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              {reviews.length > 0 && (
                <section aria-labelledby="reviews" className="mt-12">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 id="reviews" className="text-[26px] font-bold text-ink">
                      Reviews
                    </h2>
                    <RatingBadge rating={exp.rating} count={exp.reviewCount} />
                  </div>
                  <div className="mt-6 space-y-5">
                    {reviews.map((r) => (
                      <figure key={r.id} className="rounded-lg border border-line bg-white p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-50 text-[14px] font-semibold text-terracotta-700">
                              {r.authorName.slice(0, 1)}
                            </span>
                            <div>
                              <figcaption className="text-[15px] font-semibold text-ink">
                                {r.authorName}
                              </figcaption>
                              <p className="text-[13px] text-ink-500">
                                {r.authorCountry} · {r.partyType}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ReviewStars rating={r.rating} />
                            {r.isDemo ? (
                              <span className="text-[12px] text-ink-500">demo review</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-success">
                                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                                verified booking
                              </span>
                            )}
                          </div>
                        </div>
                        <blockquote className="mt-4">
                          <p className="text-[15px] font-semibold text-ink">{r.title}</p>
                          <p className="mt-1.5 text-[16px] leading-relaxed text-ink-700">
                            {r.text}
                          </p>
                        </blockquote>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Booking panel */}
            <aside aria-label="Book this experience">
              <BookingPanel
                experienceId={exp.id}
                experienceSlug={exp.slug}
                title={exp.title}
                currency={exp.currency}
                priceMinor={exp.priceMinor}
                childPriceMinor={exp.childPriceMinor}
                responseTime={exp.responseTime}
                policyLabel={
                  exp.policy === "flexible"
                    ? "24 h"
                    : exp.policy === "strict"
                      ? "7-day"
                      : "48 h"
                }
                waMessage={waExperienceMessage(exp.title, exp.slug)}
              />
            </aside>
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <section aria-labelledby="similar" className="mt-16 lg:mt-24">
              <h2 id="similar" className="text-[26px] font-bold text-ink">
                Similar experiences
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((s) => (
                  <ExperienceCard key={s.id} experience={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
