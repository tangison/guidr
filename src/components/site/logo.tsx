/**
 * Guidr brand marks.
 * The wordmark is a thin geometric logotype (never typed as text) with the
 * terracotta "I" as the single accent, followed by the footprint glyph.
 * Built from the brand identity kit geometry (stroke-based letterforms).
 */

export function FootprintIcon({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* sole */}
      <ellipse cx="100" cy="78" rx="52" ry="66" fill={color} />
      {/* heel */}
      <ellipse cx="100" cy="196" rx="34" ry="38" fill={color} />
    </svg>
  );
}

export function FootprintTrail({
  className = "",
  color = "currentColor",
  count = 3,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  const marks = Array.from({ length: count });
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: "10px" }}
      aria-hidden="true"
    >
      {marks.map((_, i) => (
        <FootprintIcon
          key={i}
          className={i % 2 === 0 ? "" : "rotate-[18deg]"}
          color={color}
        />
      ))}
    </div>
  );
}

/**
 * The Guidr wordmark. Stroke-drawn geometric capitals; the I is the accent.
 * Width/height ratio follows the print kit lockup (~5.6 : 1).
 */
export function GuidrWordmark({
  className = "",
  accent = "#C4552D",
  color = "currentColor",
  showFootprint = true,
}: {
  className?: string;
  accent?: string;
  color?: string;
  showFootprint?: boolean;
}) {
  const sw = 7;
  return (
    <svg
      viewBox="0 0 560 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Guidr"
    >
      <g
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        {/* G — single stroke: top bar, left bowl, bottom bar, partial stem, crossbar */}
        <path d="M 84 4 H 48 A 44 44 0 0 0 48 96 H 84 V 58 H 62" />
        {/* U — two stems joined by a round bottom */}
        <path d="M 110 4 V 64 A 33 33 0 0 0 176 64 V 4" />
        {/* D — stem, top bar, round right bowl, bottom bar */}
        <path d="M 232 4 V 96 H 262 A 46 46 0 0 0 262 4 H 232" />
        {/* R — stem, bowl, leg */}
        <path d="M 336 96 V 4 H 372 A 25 25 0 0 1 372 54 H 336" />
        <path d="M 366 54 L 398 96" />
      </g>
      {/* I — the orange accent */}
      <path
        d="M 202 4 V 96"
        stroke={accent}
        strokeWidth={sw + 3}
        strokeLinecap="butt"
      />
      {showFootprint && (
        <g transform="translate(478, 2) scale(0.38)">
          <ellipse cx="100" cy="78" rx="52" ry="66" fill={color} />
          <ellipse cx="100" cy="196" rx="34" ry="38" fill={color} />
        </g>
      )}
    </svg>
  );
}

/** Compact lockup for tight spaces (nav, footer). */
export function GuidrMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <GuidrWordmark
        className="h-6 w-auto sm:h-7"
        color={color}
        showFootprint={false}
      />
      <FootprintIcon className="h-5 w-auto sm:h-6" />
    </span>
  );
}
