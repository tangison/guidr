/** Money and duration formatting. Money is integer minor units. */

export function formatPrice(
  minor: number,
  currency: string = "NAD",
  locale: string = "en-NA"
): string {
  const amount = minor / 100;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/** "From N$ 600" style used on cards. */
export function formatFromPrice(
  minor: number,
  currency: string = "NAD",
  perGroup = false
): string {
  return `From ${formatPrice(minor, currency)} ${perGroup ? "per group" : "per person"}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h >= 8) {
    const days = Math.round(h / 24);
    return h % 24 === 0 ? `${days} day${days > 1 ? "s" : ""}` : `${days} days`;
  }
  return m === 0
    ? `${h} hour${h > 1 ? "s" : ""}`
    : `${h}h ${m}m`;
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ratingLabel(rating: number, count: number): string {
  if (count === 0) return "New listing";
  return `${rating.toFixed(1)} (${count} review${count > 1 ? "s" : ""})`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  desert: "Desert",
  coast: "Coast",
  wildlife: "Wildlife",
  adventure: "Adventure",
  culture: "Culture",
  stargazing: "Stargazing",
  flights: "Flights",
};
