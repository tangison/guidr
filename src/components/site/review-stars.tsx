import { Star } from "lucide-react";

export function ReviewStars({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < full || (i === full && half)
              ? "fill-mustard text-mustard"
              : "fill-line text-line"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function RatingBadge({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  if (count === 0) {
    return (
      <span className="text-[14px] text-ink-500">New listing, no reviews yet</span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-[14px]">
      <ReviewStars rating={rating} />
      <span className="font-semibold text-ink tabular">{rating.toFixed(1)}</span>
      <span className="text-ink-500 tabular">
        · {count} review{count > 1 ? "s" : ""}
      </span>
    </span>
  );
}
