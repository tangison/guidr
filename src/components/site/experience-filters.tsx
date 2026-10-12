"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/format";

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration", label: "Shortest first" },
];

export function ExperienceFilters({
  destinations,
}: {
  destinations: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = React.useState(params.get("q") ?? "");

  const current = {
    destination: params.get("destination") ?? "all",
    category: params.get("category") ?? "all",
    sort: params.get("sort") ?? "recommended",
  };

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === "all" || v === "") sp.delete(k);
      else sp.set(k, v);
    }
    router.push(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    update({ q: q.trim() || null });
  }

  const hasFilters =
    current.destination !== "all" ||
    current.category !== "all" ||
    current.sort !== "recommended" ||
    params.get("q");

  return (
    <div className="space-y-5">
      <form
        onSubmit={submitSearch}
        role="search"
        aria-label="Search experiences"
        className="flex gap-2.5"
      >
        <label className="flex h-12 flex-1 items-center gap-2.5 rounded-full border border-line bg-white px-5 focus-within:border-terracotta-700 focus-within:ring-2 focus-within:ring-terracotta-50">
          <Search className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Search experiences</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Dolphins, dunes, rock art…"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary btn-lg"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Filters
        </span>

        <label>
          <span className="sr-only">Destination</span>
          <select
            value={current.destination}
            onChange={(e) => update({ destination: e.target.value })}
            className="h-10 cursor-pointer rounded-full border border-line bg-white px-4 pr-9 text-[14px] text-ink focus:outline-none focus:border-terracotta-700 focus:ring-2 focus:ring-terracotta-50"
          >
            <option value="all">All destinations</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Sort by</span>
          <select
            value={current.sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="h-10 cursor-pointer rounded-full border border-line bg-white px-4 pr-9 text-[14px] text-ink focus:outline-none focus:border-terracotta-700 focus:ring-2 focus:ring-terracotta-50"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        {hasFilters && (
          <button
            onClick={() => {
              setQ("");
              router.push(pathname, { scroll: false });
            }}
            className="btn btn-ghost h-10 !px-4 !text-[14px] !font-medium !text-terracotta-700 hover:!bg-terracotta-50 hover:!text-terracotta-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Categories">
        <button
          onClick={() => update({ category: "all" })}
          aria-pressed={current.category === "all"}
          className={`inline-flex h-11 sm:h-9 items-center rounded-full px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 ${
            current.category === "all"
              ? "bg-ink text-white"
              : "bg-white text-ink-700 hover:bg-bone"
          }`}
        >
          All categories
        </button>
        {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
          <button
            key={slug}
            onClick={() => update({ category: slug })}
            aria-pressed={current.category === slug}
            className={`inline-flex h-11 sm:h-9 items-center rounded-full px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 ${
              current.category === slug
                ? "bg-ink text-white"
                : "bg-white text-ink-700 hover:bg-bone"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
