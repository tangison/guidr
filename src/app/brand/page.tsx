import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  GuidrLockup,
  GuidrWordmark,
  FootprintIcon,
  FootprintTrail,
} from "@/components/site/logo";

export const metadata: Metadata = {
  alternates: { canonical: "/brand" },
  title: "Brand",
  description:
    "The Guidr brand system: lockup and footprint mark, ink, bone, terracotta and mustard palette, Poppins type, the rules.",
};

const CORE_COLORS = [
  {
    name: "Ink",
    token: "--ink",
    hex: "#1A1517",
    use: "Primary text, dark sections, the wordmark on light surfaces.",
  },
  {
    name: "Bone",
    token: "--bone",
    hex: "#ECEAE6",
    use: "Warm paper background, quiet section breaks, light surfaces.",
  },
  {
    name: "Terracotta",
    token: "--terracotta",
    hex: "#C4552D",
    use: "The single accent. CTAs, links, the footprint in context.",
  },
  {
    name: "Mustard",
    token: "--mustard",
    hex: "#F2C240",
    use: "Eyebrows and trails on ink only. Never body text.",
  },
  {
    name: "Sand",
    token: "--sand",
    hex: "#D9A066",
    use: "Supporting warmth, the middle of the brand bar gradient.",
  },
  {
    name: "Terracotta deep",
    token: "--terracotta-700",
    hex: "#A8431F",
    use: "Hover and pressed states, focus rings, small text accents.",
  },
];

const TYPE_SCALE = [
  { label: "Display", cls: "text-[clamp(2.25rem,4vw,3.5rem)] font-bold", sample: "Namibia, guided" },
  { label: "Heading 2", cls: "text-[28px] sm:text-[40px] font-bold", sample: "Coast. Desert. Wild." },
  { label: "Heading 3", cls: "text-[20px] font-semibold", sample: "Dolphin and seal catamaran cruise" },
  { label: "Body", cls: "text-[16px] font-normal", sample: "Tours and activities run by people who live here, priced honestly and booked over WhatsApp." },
  { label: "Eyebrow", cls: "eyebrow text-terracotta-700", sample: "The launch catalogue" },
];

const RULES = [
  {
    title: "One accent at a time",
    text: "Terracotta is the working accent. Mustard appears only on ink backgrounds, as eyebrows and trails. A page never carries both as competing fills.",
  },
  {
    title: "The wordmark is stroke-drawn",
    text: "The GUIDR capitals are 8-unit strokes with butt caps and round joins, drawn from the printed brand book. Never replace them with a set typeface, never bold them further, never add effects.",
  },
  {
    title: "The I carries the colour",
    text: "In the lockup the I is terracotta on light surfaces and #E0673A on ink. It is the only letter that takes colour. Everything else stays ink or white.",
  },
  {
    title: "Clear space",
    text: "Keep the width of the U clear on all sides of the lockup. Minimum on-screen width is 120px for the full lockup, 88px for the wordmark alone.",
  },
  {
    title: "The trail walks uphill",
    text: "Footprint trails rotate -18 degrees and ascend in size to the upper right, exactly as printed. Trails are decorative and always aria-hidden.",
  },
  {
    title: "Photography keeps one grade",
    text: "All imagery shares one Namibian editorial grade: terracotta sand, bone sky, ink shadow, mustard hour light, fine film grain. No cold filters, no stock-library look.",
  },
];

const ASSETS = [
  { href: "/brand/guidr-lockup-ink.svg", label: "Lockup, ink on transparent" },
  { href: "/brand/guidr-lockup-white.svg", label: "Lockup, white on transparent" },
  { href: "/brand/guidr-lockup-bone.svg", label: "Lockup, bone on transparent" },
  { href: "/brand/guidr-footprint-ink.svg", label: "Footprint, ink" },
  { href: "/brand/guidr-footprint-mustard.svg", label: "Footprint, mustard" },
  { href: "/brand/guidr-trail-mustard.svg", label: "Trail, mustard" },
];

export default function BrandPage() {
  return (
    <>
      {/* ============ Intro ============ */}
      <section className="hero-field">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <p className="eyebrow text-terracotta-700">The Guidr brand</p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] font-bold tracking-[-0.02em] text-ink">
            One mark, one trail.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-700">
            Everything Guidr publishes draws from the same small kit: a
            stroke-drawn wordmark, a real shoe print, four desert colours and
            Poppins, the typeface the logo was built with. This page is the
            reference.
          </p>
        </div>
      </section>

      {/* ============ The marks ============ */}
      <section aria-labelledby="marks" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <h2 id="marks" className="text-[26px] sm:text-[34px] font-bold text-ink">
            The marks
          </h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
            The full lockup pairs the wordmark with the real shoe print at 2.4
            times cap height, rising above and sinking below the letters, as
            printed in the brand book.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="flex min-h-[240px] flex-col justify-between gap-8 rounded-2xl border border-line bg-bone p-8">
              <GuidrLockup className="h-16 w-auto" />
              <p className="text-[14px] text-ink-500">Full lockup on bone</p>
            </div>
            <div className="flex min-h-[240px] flex-col justify-between gap-8 rounded-2xl bg-ink p-8">
              <GuidrLockup className="h-16 w-auto" color="#FFFFFF" accent="#E0673A" />
              <p className="text-[14px] text-white/60">Full lockup on ink</p>
            </div>
            <div className="flex min-h-[240px] flex-col justify-between gap-8 rounded-2xl border border-line bg-white p-8">
              <div className="flex flex-wrap items-center gap-10">
                <GuidrWordmark className="h-12 w-auto" />
                <FootprintIcon className="h-16 w-auto" color="var(--ink)" />
                <FootprintTrail className="h-12 w-auto" color="var(--terracotta)" />
              </div>
              <p className="text-[14px] text-ink-500">Wordmark, footprint, trail</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Colour ============ */}
      <section aria-labelledby="colour" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <h2 id="colour" className="text-[26px] sm:text-[34px] font-bold text-ink">
            Colour
          </h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
            Sampled from the brand artwork and the land it walks: ink for
            text, bone for paper, terracotta for the working accent, mustard
            for dark surfaces, sand for warmth between them.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_COLORS.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-2xl border border-line bg-white">
                <div
                  className="h-28"
                  style={{ backgroundColor: c.hex }}
                  role="img"
                  aria-label={`${c.name} swatch, ${c.hex}`}
                />
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[18px] font-semibold text-ink">{c.name}</h3>
                    <code className="tabular text-[13px] text-ink-500">{c.hex}</code>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-700">{c.use}</p>
                  <code className="mt-3 block text-[12px] text-terracotta-700">{c.token}</code>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-line bg-white p-5">
            <p className="text-[14px] text-ink-700">
              The brand bar: a 4px terracotta into mustard gradient pinned to
              the top edge of every page.
            </p>
            <div className="brand-bar mt-4 w-full" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ============ Typography ============ */}
      <section aria-labelledby="type" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <h2 id="type" className="text-[26px] sm:text-[34px] font-bold text-ink">
            Typography
          </h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
            Poppins, the geometric sans the wordmark geometry echoes, at four
            weights: 400 for body, 500 for labels, 600 for subheadings and
            buttons, 700 for headlines. One family, loaded with swap and
            preconnect.
          </p>
          <div className="mt-10 divide-y divide-line rounded-2xl border border-line">
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="grid gap-3 p-6 sm:grid-cols-[160px_1fr] sm:items-baseline">
                <span className="eyebrow text-terracotta-700">{t.label}</span>
                <p className={`text-ink ${t.cls}`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Art direction ============ */}
      <section aria-labelledby="art" className="grain relative bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <p className="eyebrow text-mustard">Art direction</p>
          <h2 id="art" className="mt-3 text-[26px] sm:text-[34px] font-bold text-white">
            One grade across every photograph
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/hero-dunes.jpg", alt: "Sunrise over the dune sea.", cap: "Terracotta sand" },
              { src: "/images/destinations/walvis-bay.jpg", alt: "Flamingos on the Walvis Bay lagoon.", cap: "Bone sky" },
              { src: "/images/experiences/spitzkoppe-night.jpg", alt: "The Milky Way over Spitzkoppe.", cap: "Ink shadow" },
            ].map((im) => (
              <figure key={im.src} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image src={im.src} alt={im.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[14px] font-medium uppercase tracking-[0.08em] text-white/60">
                  {im.cap}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-white/75">
            Warm terracotta and ochre sand, bone-white sky, deep ink-brown
            shadow, golden mustard hour light, fine 35mm film grain. Every
            image on the site is graded to this palette so pages read as one
            continuous landscape.
          </p>
        </div>
      </section>

      {/* ============ Rules ============ */}
      <section aria-labelledby="rules" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <h2 id="rules" className="text-[26px] sm:text-[34px] font-bold text-ink">
            The rules
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RULES.map((r) => (
              <div key={r.title} className="rounded-2xl border border-line bg-bone-50 p-6">
                <h3 className="flex items-center gap-3 text-[18px] font-semibold text-ink">
                  <FootprintIcon className="h-4 w-auto shrink-0" color="var(--terracotta)" />
                  {r.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Assets ============ */}
      <section aria-labelledby="assets" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <h2 id="assets" className="text-[26px] sm:text-[34px] font-bold text-ink">
            Assets
          </h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
            Vector originals, exactly as derived from the printed brand kit.
            Use them as shipped.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ASSETS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  download
                  className="flex h-14 items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 text-[15px] font-medium text-ink-700 transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  {a.label}
                  <Download className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] text-ink-500">
            The site favicon suite and the OG card draw from the same marks.
            For anything not covered here, ask before inventing:{" "}
            <Link href="/about#contact" className="underline underline-offset-2 hover:text-ink">
              contact Guidr
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
