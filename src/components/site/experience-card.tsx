import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star } from "lucide-react";
import { formatFromPrice, formatDuration } from "@/lib/format";
import type { ExperienceWithRelations } from "@/lib/data";

export function ExperienceCard({
  experience,
  priority = false,
  feature = false,
}: {
  experience: ExperienceWithRelations;
  priority?: boolean;
  /** Feature cards fill a 2x2 bento cell: the photograph flexes taller. */
  feature?: boolean;
}) {
  const perGroup = experience.priceModel === "per_group";
  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:border-line-strong hover:shadow-e2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
    >
      <div
        className={`relative overflow-hidden ${
          feature ? "min-h-[280px] flex-1" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={experience.heroImage}
          alt={experience.summary}
          fill
          priority={priority}
          sizes={
            feature
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {experience.isDemo && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium tracking-wide text-ink-700 uppercase">
            Demo listing
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded-full bg-white/95 px-3 py-1 text-[14px] font-semibold text-ink tabular">
          {formatFromPrice(experience.priceMinor, experience.currency, perGroup)}
        </span>
      </div>
      <div className={`p-5 ${feature ? "sm:p-6" : ""}`}>
        <p className="eyebrow text-terracotta-700">{experience.destination.name}</p>
        <h3
          className={`mt-1.5 line-clamp-2 font-semibold leading-snug text-ink ${
            feature ? "text-[24px]" : "text-[20px]"
          }`}
        >
          {experience.title}
        </h3>
        {feature && (
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-700">
            {experience.summary}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {formatDuration(experience.durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            Max {experience.groupMax}
          </span>
          {experience.reviewCount > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-mustard text-mustard" aria-hidden="true" />
              <span className="font-medium text-ink-700 tabular">
                {experience.rating.toFixed(1)}
              </span>
              <span className="tabular">({experience.reviewCount})</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
