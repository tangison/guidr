"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";

const DESTINATIONS = [
  { value: "", label: "Anywhere" },
  { value: "swakopmund", label: "Swakopmund" },
  { value: "walvis-bay", label: "Walvis Bay" },
  { value: "sossusvlei", label: "Sossusvlei" },
  { value: "etosha", label: "Etosha" },
  { value: "damaraland", label: "Damaraland" },
  { value: "fish-river", label: "Fish River" },
  { value: "spitzkoppe", label: "Spitzkoppe" },
];

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "inline" }) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState("");
  const [guests, setGuests] = React.useState("2");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (guests && guests !== "1") params.set("guests", guests);
    router.push(`/experiences${params.size ? `?${params}` : ""}`);
  }

  const fieldClass =
    "flex h-12 w-full items-center gap-2.5 rounded-md bg-white border border-line px-4 focus-within:border-terracotta-700 focus-within:ring-2 focus-within:ring-terracotta-50 transition-colors";

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Search experiences"
      className={
        variant === "hero"
          ? "w-full rounded-xl bg-white/95 backdrop-blur p-3 shadow-e3 sm:rounded-full sm:p-2"
          : "w-full rounded-xl border border-line bg-white p-3"
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] sm:gap-2 sm:items-center">
        <label className={`${fieldClass} sm:border-0 sm:bg-bone-50 sm:rounded-full sm:px-5`}>
          <Search className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">What are you looking for?</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Dolphins, dunes, rock art…"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-500 focus:outline-none"
          />
        </label>

        <label className={`${fieldClass} sm:border-0 sm:bg-bone-50 sm:rounded-full sm:px-5`}>
          <MapPin className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Destination</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent text-[15px] text-ink focus:outline-none"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label className={`${fieldClass} sm:border-0 sm:bg-bone-50 sm:rounded-full sm:px-5`}>
          <CalendarDays className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Date</span>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-[15px] text-ink focus:outline-none"
          />
        </label>

        <label className={`${fieldClass} sm:border-0 sm:bg-bone-50 sm:rounded-full sm:px-5`}>
          <Users className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent text-[15px] text-ink focus:outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="h-12 rounded-md bg-terracotta px-7 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 sm:rounded-full"
        >
          Search
        </button>
      </div>
    </form>
  );
}
