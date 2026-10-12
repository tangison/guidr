import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  MapPinned,
  ClipboardCheck,
  CalendarCheck2,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { SearchBar } from "@/components/site/search-bar";
import { CategoryChips } from "@/components/site/category-chips";
import { ExperienceCard } from "@/components/site/experience-card";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { FootprintTrail, FootprintIcon } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { SceneAccordions } from "@/components/site/motion/scene-accordions";
import {
  PinnedManifesto,
  InlineImage,
} from "@/components/site/motion/pinned-manifesto";
import { HeroParallax, ScrollScaleMedia, Reveal, Stagger } from "@/components/site/motion/reveal";
import {
  getFeaturedExperiences,
  getAllDestinations,
} from "@/lib/data";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Guidr",
      url: "https://getguidr.com",
      description:
        "Marketplace for guided tours and activities in Namibia. Curated local operators, honest prices, WhatsApp-first booking.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://getguidr.com/experiences?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "Guidr",
      url: "https://getguidr.com",
      logo: "https://getguidr.com/logo.svg",
      sameAs: [
        "https://instagram.com/getguidr",
        "https://facebook.com/getguidr",
      ],
    },
  ],
};

const HOW_IT_WORKS = [
  {
    icon: MapPinned,
    title: "Find it",
    text: "Search by place, date and pace. Every listing is a real operator with a real price: no teaser rates.",
  },
  {
    icon: MessageCircle,
    title: "Request it",
    text: "One tap sends your request. The operator replies on WhatsApp, usually within four hours in the daytime.",
  },
  {
    icon: ClipboardCheck,
    title: "Confirm it",
    text: "Your guide confirms the date, the meeting point and the price. You get a clear voucher and a contact.",
  },
  {
    icon: CalendarCheck2,
    title: "Take the trip",
    text: "Meet your guide, take the walk, ride or flight. At launch you pay through Guidr and we settle the operator after the trip; while we launch, you pay the operator directly.",
  },
];

const SCENES = [
  {
    eyebrow: "The coast",
    title: "Swakopmund and Walvis Bay",
    text: "Dolphins on the bow wave, seals at the paddle, dunes behind the town. The coast is Namibia's playground, and it is where Guidr launches first.",
    image: "/images/experiences/catamaran.jpg",
    alt: "A catamaran cruising the Walvis Bay lagoon with dolphins alongside.",
    link: { href: "/destinations/swakopmund", label: "Explore the coast" },
  },
  {
    eyebrow: "The desert",
    title: "Sossusvlei and the big red dunes",
    text: "Climb Dune 45 at sunrise, drift over the dune sea by balloon, walk the white pan of Deadvlei among 900-year-old trees.",
    image: "/images/experiences/deadvlei.jpg",
    alt: "Dead camelthorn trees on the white clay pan of Deadvlei.",
    link: { href: "/destinations/sossusvlei", label: "Explore the desert" },
  },
  {
    eyebrow: "The wild",
    title: "Etosha and Damaraland",
    text: "Sit still at a waterhole as elephant herds drink. Track desert-adapted elephants through riverbeds with trackers who know them by name.",
    image: "/images/experiences/etosha.jpg",
    alt: "Elephants drinking at a waterhole in Etosha National Park.",
    link: { href: "/destinations/etosha", label: "Explore the wild" },
  },
];

const MANIFESTO_GALLERY = [
  {
    image: "/images/experiences/balloon.jpg",
    alt: "Hot air balloons drifting over the dune sea at first light.",
    caption: "Ballooning over the dune sea",
  },
  {
    image: "/images/experiences/desert-elephant.jpg",
    alt: "A desert-adapted elephant crossing a dry riverbed in Damaraland.",
    caption: "Desert elephants of Damaraland",
  },
  {
    image: "/images/experiences/kolmanskop.jpg",
    alt: "A sand-filled abandoned room in the Kolmanskop ghost town.",
    caption: "Kolmanskop, the sand ghost town",
  },
];

export default async function HomePage() {
  const [experiences, destinations] = await Promise.all([
    getFeaturedExperiences(),
    getAllDestinations(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ============ Hero: artistic asymmetry ============ */}
      <section className="hero-field relative overflow-x-clip">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-24 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-0">
            {/* Statement block */}
            <div className="relative z-10 lg:col-span-7 lg:pt-8 lg:pr-20">
              <p className="eyebrow text-terracotta-700">
                Namibia · Launching at the coast
              </p>
              <h1 className="mt-5 max-w-[12ch] text-[clamp(2.9rem,6.5vw,5.25rem)] leading-[1.02] font-bold tracking-[-0.02em] text-ink">
                Namibia, guided properly.
              </h1>
              <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-ink-700">
                Tours and activities run by people who live here. Honest
                prices, real operators, and one WhatsApp message between you
                and your guide.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/planner"
                  className="btn btn-primary btn-lg"
                >
                  Plan my trip
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/experiences"
                  className="btn btn-outline btn-lg"
                >
                  Browse experiences
                </Link>
              </div>
              <FootprintTrail
                className="mt-10 hidden h-9 lg:block"
                color="var(--terracotta)"
              />
            </div>

            {/* Floating image panel, overlapping from the bottom right */}
            <div className="relative z-[1] mt-10 lg:col-span-5 lg:mt-16 lg:-ml-16">
              <HeroParallax>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-e3 ring-1 ring-ink/10 lg:aspect-[4/5]">
                  <Image
                    src="/images/hero-dunes.jpg"
                    alt="Warm sunrise light over the big red sand dunes of the Namib desert."
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                </div>
              </HeroParallax>
            </div>
          </div>

          {/* Search, straddling the seam */}
          <div className="relative z-20 mt-8 max-w-3xl lg:-mt-14 lg:ml-24">
            <SearchBar />
            <p className="mt-4 pl-3 text-[13px] text-ink-500">
              Popular right now:{" "}
              <Link href="/experiences?category=coast" className="underline underline-offset-2 hover:text-ink">
                dolphin cruises
              </Link>
              ,{" "}
              <Link href="/experiences?category=flights" className="underline underline-offset-2 hover:text-ink">
                balloon flights
              </Link>
              ,{" "}
              <Link href="/experiences?category=stargazing" className="underline underline-offset-2 hover:text-ink">
                stargazing
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Top experiences: interlocked bento ============ */}
      <section aria-labelledby="top-experiences" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal className="max-w-xl">
              <p className="eyebrow text-terracotta-700">The launch catalogue</p>
              <h2
                id="top-experiences"
                className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-ink"
              >
                Trips travellers actually take
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
                Sixteen guided experiences across seven destinations, from seal
                kayaking at dawn to balloons over the dune sea. Demo listings
                until our first operators go live.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/experiences"
                className="btn btn-outline btn-md"
              >
                Browse all experiences
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-8">
            <CategoryChips />
          </div>
          {/* Interlock math (lg, 3 cols): card 1 spans 2x2 (4 cells),
              card 5 spans 2x1 (2 cells), six singles (6 cells) = 12 cells
              in 4 rows. Zero empty cells, grid-flow-dense applied. */}
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 [grid-auto-flow:dense]" step={60}>
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`h-full ${
                  i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
                } ${i === 4 ? "sm:col-span-2" : ""}`}
              >
                <ExperienceCard
                  experience={exp}
                  feature={i === 0}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ Namibia in three scenes: horizontal accordions ============ */}
      <section aria-label="Namibia in three scenes" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 pb-10">
            <div className="max-w-xl">
              <p className="eyebrow text-terracotta-700">Namibia in three scenes</p>
              <h2 className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-ink">
                Coast. Desert. Wild.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
                One country holds all three. Hover a scene to open it, or tap
                through to the destination.
              </p>
            </div>
            <FootprintTrail className="hidden h-9 sm:flex" color="var(--sand)" />
          </Reveal>
          <SceneAccordions scenes={SCENES} />
        </div>
      </section>

      {/* ============ Manifesto: pinned statement with scrolling gallery ============ */}
      <PinnedManifesto gallery={MANIFESTO_GALLERY}>
        <p className="eyebrow text-mustard">The long, quiet road</p>
        <h2 className="mt-5 text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.12] font-bold tracking-[-0.015em] text-white">
          From the{" "}
          <InlineImage
            src="/images/destinations/walvis-bay.jpg"
            alt="flamingos of the Walvis Bay lagoon"
          />{" "}
          cold Atlantic to the{" "}
          <InlineImage
            src="/images/experiences/dune45.jpg"
            alt="sunrise ridge of Dune 45"
          />{" "}
          oldest desert on earth.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-white/75">
          Namibia packs a cold-ocean coast, the oldest desert on the planet and
          big game country into one long, quiet road. The Guidr catalogue walks
          that road in sixteen guided experiences, every one of them run by an
          operator who lives along it.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/destinations"
            className="btn btn-white btn-lg"
          >
            Explore the destinations
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PinnedManifesto>

      {/* ============ Destinations: interlocked bento ============ */}
      <section aria-labelledby="destinations" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-terracotta-700">Where we operate</p>
            <h2
              id="destinations"
              className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-ink"
            >
              Seven destinations, one country
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
              Launching at the coast and expanding inland: each destination
              with its own guides, seasons and local tips.
            </p>
          </Reveal>
          {/* Interlock math (lg, 4 cols): tile 1 spans 2x2 (4 cells), tiles
              2 and 3 span 2x1 (4 cells), four singles (4 cells) = 12 cells
              in 3 rows. Zero empty cells, grid-flow-dense applied. */}
          <div className="mt-10 grid grid-cols-2 gap-4 [grid-auto-flow:dense] sm:auto-rows-[220px] md:grid-cols-4 lg:auto-rows-[250px]">
            {destinations.map((d, i) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={`group relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 ${
                  i === 0
                    ? "col-span-2 row-span-2"
                    : i === 1 || i === 2
                      ? "col-span-2"
                      : ""
                }`}
              >
                <Image
                  src={d.heroImage}
                  alt={`${d.name}, ${d.region}, Namibia.`}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 scrim" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <h3 className="text-[19px] font-semibold text-white">
                      {d.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-white/80 line-clamp-1">
                      {d.tagline}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-terracotta">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AI planner teaser ============ */}
      <section aria-labelledby="planner-teaser" className="grain relative bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <Reveal>
              <p className="eyebrow text-mustard">The Guidr planner</p>
              <h2
                id="planner-teaser"
                className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-white"
              >
                Tell it your days, your people, your budget.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/80">
                The planner builds a believable itinerary from real catalogue
                experiences and honest prices, never invented ones. Ask it to
                plan three days at the coast for a family of four, then send
                the whole plan to booking in one go.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/planner"
                  className="btn btn-primary btn-lg btn-on-dark"
                >
                  Try the planner
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton
                  message="Hi Guidr, can you help me plan my trip at the coast?"
                  size="lg"
                  className="!bg-white/10 hover:!bg-white/20"
                />
              </div>
            </Reveal>
            {/* Sample conversation */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl bg-white p-5 shadow-e3 sm:p-7" aria-hidden="true">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <p className="max-w-[80%] rounded-lg rounded-br-sm bg-terracotta-50 px-4 py-3 text-[14px] leading-relaxed text-ink">
                      We have 3 days at the coast in July, two adults and two kids (8 and 11). We like wildlife and easy walks, and our budget is around N$ 4,000 per person for activities.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
                      <FootprintIcon className="h-5 w-auto" color="var(--mustard)" />
                    </span>
                    <div className="max-w-[85%] space-y-3">
                      <p className="rounded-lg rounded-bl-sm bg-bone-50 px-4 py-3 text-[14px] leading-relaxed text-ink">
                        Here is a plan that fits your budget:
                      </p>
                      <div className="rounded-lg border border-line bg-white p-3.5">
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 1 · Walvis Bay</p>
                        <p className="mt-1 text-[14px] font-semibold text-ink">Dolphin and seal catamaran cruise</p>
                        <p className="mt-1 text-[13px] text-ink-500">3 h · from N$ 600 pp · ages 6+</p>
                      </div>
                      <div className="rounded-lg border border-line bg-white p-3.5">
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 2 · Swakopmund</p>
                        <p className="mt-1 text-[14px] font-semibold text-ink">Living Desert guided walk</p>
                        <p className="mt-1 text-[13px] text-ink-500">4 h · from N$ 850 pp · easy pace</p>
                      </div>
                      <div className="rounded-lg border border-line bg-white p-3.5">
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 3 · Swakopmund</p>
                        <p className="mt-1 text-[14px] font-semibold text-ink">Dune quad biking + sandboarding combo</p>
                        <p className="mt-1 text-[13px] text-ink-500">2 to 3 h · from N$ 700 pp · passenger seats for kids</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ How it works ============ */}
      <section aria-labelledby="how-it-works" className="bg-bone-50">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-terracotta-700">How it works</p>
            <h2
              id="how-it-works"
              className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-ink"
            >
              Four steps, no lock-in
            </h2>
          </Reveal>
          <Stagger as="ol" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" step={70}>
            {HOW_IT_WORKS.map((step, i) => (
              <li
                key={step.title}
                className="h-full rounded-2xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-e2"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-700">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex items-end gap-1" aria-hidden="true">
                    {Array.from({ length: i + 1 }).map((_, j) => (
                      <FootprintIcon
                        key={j}
                        className="h-5 w-auto"
                        color={j === i ? "var(--terracotta)" : "var(--sand)"}
                      />
                    ))}
                  </span>
                </div>
                <h3 className="mt-5 text-[20px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">{step.text}</p>
              </li>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mt-8 flex items-center gap-2 text-[14px] text-ink-500">
              <Banknote className="h-4 w-4" aria-hidden="true" />
              Payment is by bank transfer or the operator's own payment link, always direct to the operator.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ For operators ============ */}
      <section aria-labelledby="operators-cta" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <ScrollScaleMedia className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/images/experiences/desert-walk.jpg"
                  alt="A small guided tour group walking across golden desert sand in Namibia."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-scale-target
                  className="object-cover"
                />
                <div className="absolute inset-0 scrim" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[18px] font-semibold text-white">
                    Requests arrive on WhatsApp.
                  </p>
                  <p className="mt-1 text-[14px] text-white/85">
                    Confirm in one tap. Get paid directly.
                  </p>
                </div>
              </div>
            </ScrollScaleMedia>
            <Reveal>
              <p className="eyebrow text-terracotta-700">For operators</p>
              <h2
                id="operators-cta"
                className="mt-3 text-[28px] leading-[34px] sm:text-[40px] sm:leading-[46px] font-bold tracking-[-0.015em] text-ink"
              >
                More bookings, less admin
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
                List your guided experiences, keep your own prices, and take
                requests straight to WhatsApp. A listing fee and a commission
                on completed bookings, nothing else, with your share settled
                on an agreed schedule after the trip runs.
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "Your listing, your price, your cancellation policy",
                  "Requests and confirmations by WhatsApp and email",
                  "A calendar that blocks dates and manages capacity",
                  "Monthly invoices with commission on completed trips only",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-700">
                    <FootprintIcon className="mt-0.5 h-4 w-auto shrink-0" color="var(--terracotta)" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/for-operators"
                  className="btn btn-primary btn-lg"
                >
                  List your experiences
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/for-operators#fees"
                  className="btn btn-outline btn-lg"
                >
                  See the fees
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ App waitlist: the action ============ */}
      <section aria-labelledby="waitlist" className="grain relative bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow text-mustard">The Guidr app</p>
              <h2
                id="waitlist"
                className="mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.015em] text-white"
              >
                In your pocket, offline-ready
              </h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/80">
                Saved bookings, vouchers and WhatsApp threads that work on a
                bad connection in the middle of the desert. Join the waitlist
                and we will message you the day it ships.
              </p>
              <p className="mt-6 flex items-center gap-2 text-[14px] text-white/55">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                One message when the app ships. Nothing else, ever.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <WaitlistForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
