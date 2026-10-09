/**
 * Guidr brand marks — EXACT geometry from the brand identity kit
 * (upload/brand-kit/brand-identity-kit/scripts/helpers.py and
 * templates/social_flyer.py, the source of truth for the printed brand book,
 * print kit and social flyer).
 *
 * Wordmark: stroke-drawn geometric capitals in a y-down space with cap height
 * 100, stroke width 8, butt caps, round joins. Even 30-unit letter gaps.
 * The "I" is the single accent (terracotta on light, #E0673A on dark).
 * The footprint is the real shoe-print silhouette (sole + heel), drawn as a
 * filled shape at 2.4x cap height, rising above and sinking below the
 * wordmark — exactly as in the printed lockup.
 *
 * Footprint trails follow the print kit: every print rotated -18deg,
 * ascending sizes, walking up to the right.
 */

const SOLE_PATH =
  "M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z";
const HEEL_PATH =
  "M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z";

const LETTER_PATHS = [
  // G — top bar, left bowl, bottom bar, lower right stem, crossbar
  "M70 0L35 0A50 50 0 0 0 35 100L70 100L70 55L45 55",
  // U — stems joined by a round bottom
  "M100 0L100 65A35 35 0 0 0 170 65L170 0",
  // D — top bar, right bowl, bottom bar (open stem, as drawn in the brand kit)
  "M230 0L265 0A35 50 0 0 1 265 100L230 100",
  // R — stem, top bar, bowl, mid bar
  "M330 100L330 0L365 0A25 25 0 0 1 365 50L330 50",
  // R — leg
  "M365 50L395 100",
];
const I_PATH = "M200 0L200 100";

/** The real shoe print (sole above, heel below). */
export function FootprintIcon({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="-6 -6 212 612"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g fill={color}>
        <path d={SOLE_PATH} />
        <path d={HEEL_PATH} />
      </g>
    </svg>
  );
}

/**
 * The brand footprint trail: prints rotated -18deg, ascending sizes,
 * walking up to the right (print kit / social flyer arrangement).
 */
export function FootprintTrail({
  className = "",
  color = "currentColor",
  count = 3,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  const prints: { cx: number; cy: number; h: number }[] = [];
  let x = 8;
  for (let i = 0; i < count; i++) {
    const h = 100 + 35 * i;
    const w = h / 3;
    const bottom = 212 - 20 * i;
    prints.push({ cx: x + w / 2, cy: bottom - h / 2, h });
    x += w + 30;
  }
  return (
    <svg
      viewBox="-8 -8 235 228"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g fill={color}>
        {prints.map((p, i) => {
          const s = p.h / 600;
          return (
            <g
              key={i}
              transform={`translate(${p.cx} ${p.cy}) rotate(-18) scale(${s}) translate(-100 -300)`}
            >
              <path d={SOLE_PATH} />
              <path d={HEEL_PATH} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/**
 * The Guidr wordmark. Stroke-drawn geometric capitals; the I is the accent.
 * Letters-only viewBox (cap height 100, stroke included).
 */
export function GuidrWordmark({
  className = "",
  accent = "#C4552D",
  color = "currentColor",
  showFootprint = false,
}: {
  className?: string;
  accent?: string;
  color?: string;
  showFootprint?: boolean;
}) {
  return (
    <svg
      viewBox={showFootprint ? "-19 -70 579 240" : "-19 -4 418 108"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Guidr"
    >
      <g
        stroke={color}
        strokeWidth={8}
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        {LETTER_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path
        d={I_PATH}
        stroke={accent}
        strokeWidth={8}
        strokeLinecap="butt"
      />
      {showFootprint && (
        <g transform="translate(476,-70) scale(0.4)" fill={color}>
          <path d={SOLE_PATH} />
          <path d={HEEL_PATH} />
        </g>
      )}
    </svg>
  );
}

/**
 * The full Guidr lockup: wordmark with the real shoe print at 2.4x cap
 * height beside it — the exact printed brand lockup. Use wherever there is
 * room (footer, about, statement moments); minimum on-screen width 120px.
 */
export function GuidrLockup({
  className = "",
  accent = "#C4552D",
  color = "currentColor",
}: {
  className?: string;
  accent?: string;
  color?: string;
}) {
  return (
    <GuidrWordmark
      className={className}
      accent={accent}
      color={color}
      showFootprint
    />
  );
}

/** Compact lockup for tight spaces (nav, footer). */
export function GuidrMark({
  className = "",
  accent = "#C4552D",
  color = "currentColor",
}: {
  className?: string;
  accent?: string;
  color?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <GuidrWordmark
        className="h-6 w-auto sm:h-7"
        color={color}
        accent={accent}
        showFootprint={false}
      />
      <FootprintIcon className="h-6 w-auto sm:h-7" />
    </span>
  );
}
