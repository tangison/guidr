import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/format";

const ICONS: Record<string, React.ReactNode> = {
  desert: null,
  coast: null,
  wildlife: null,
  adventure: null,
  culture: null,
  stargazing: null,
  flights: null,
};

export function CategoryChips({
  active,
}: {
  active?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Experience categories">
      {Object.entries(CATEGORY_LABELS).map(([slug, label]) => {
        const isActive = active === slug;
        return (
          <Link
            key={slug}
            role="listitem"
            href={`/experiences?category=${slug}`}
            aria-current={isActive ? "true" : undefined}
            className={`inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 ${
              isActive
                ? "bg-ink text-white"
                : "bg-bone-50 text-ink-700 hover:bg-bone hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default CategoryChips;
export { ICONS };
