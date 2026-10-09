import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star } from "lucide-react";
import { formatFromPrice, formatDuration } from "@/lib/format";
import type { ExperienceWithRelations } from "@/lib/data";

export function ExperienceCard({
  experience,
  priority = false,
}: {
  experience: ExperienceWithRelations;
  priority?: boolean;
}) {
  const perGroup = experience.priceModel === "per_group";
  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group block rounded-lg border border-line bg-white overflow-hidden transition-all duration-200 hover:border-line-strong hover:shadow-e2 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.heroImage}
          alt={experience.summary}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
        />
        {experience.isDemo && (
          <span className="absolute left-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink-700 uppercase">
            Demo listing
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded-full bg-white/95 px-3 py-1 text-[13px] font-semibold text-ink tabular">
          {formatFromPrice(experience.priceMinor, experience.currency, perGroup)}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <p className="eyebrow text-terracotta-700">{experience.destination.name}</p>
        <h3 className="mt-1.5 line-clamp-2 text-[20px] leading-snug font-semibold text-ink">
          {experience.title}
        </h3>
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
