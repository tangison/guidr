import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Wallet,
  ShieldCheck,
  MapPinned,
  ClipboardCheck,
  CalendarCheck2,
  Banknote,
  Search,
  Star,
  ArrowRight,
} from "lucide-react";
import { SearchBar } from "@/components/site/search-bar";
import { CategoryChips } from "@/components/site/category-chips";
import { ExperienceCard } from "@/components/site/experience-card";
import { ScrollStory } from "@/components/site/scroll-story";
import { ReviewStars } from "@/components/site/review-stars";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { FootprintTrail, FootprintIcon } from "@/components/site/logo";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import {
  getFeaturedExperiences,
  getAllDestinations,
  getRecentReviews,
} from "@/lib/data";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
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
};

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Find it",
    text: "Search by place, date and pace. Every listing is a real operator with a real price — no teaser rates.",
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
    text: "Meet your guide, take the walk, ride or flight. Pay the operator directly — Guidr never holds your money.",
  },
];

const TRUST = [
  {
    icon: MapPinned,
    title: "Guided by locals",
    text: "Operators who live here and know the land. Vetted, licensed and reviewed by travellers like you.",
  },
  {
    icon: Banknote,
    title: "Honest prices",
    text: "The price you see is the operator's own. Demo listings are labelled until real operators go live.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp first",
    text: "Every key moment has a WhatsApp path. Ask a question, send proof of payment, change a date.",
  },
  {
    icon: ShieldCheck,
    title: "No middleman money",
    text: "You pay the operator directly by bank transfer or their own payment link. Guidr does not hold funds.",
  },
];

export default async function HomePage() {
  const [experiences, destinations, reviews] = await Promise.all([
    getFeaturedExperiences(),
    getAllDestinations(),
    getRecentReviews(4),
  ]);

  const scenes = [
    {
      eyebrow: "The coast",
      title: "Swakopmund and Walvis Bay",
      text: "Dolphins on the bow wave, seals at the paddle, dunes behind the town. The coast is Namibia's playground — and it is where Guidr launches first.",
      image: "/images/experiences/catamaran.jpg",
      alt: "Dolphins swimming alongside a catamaran in the Walvis Bay lagoon.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ============ Hero ============ */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-dunes.jpg"
            alt="Warm sunrise light over the big red sand dunes of the Namib desert."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/25 to-ink/55" />
        </div>
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-mustard">Namibia · Launching at the coast</p>
            <h1 className="mt-4 text-[40px] leading-[44px] sm:text-[52px] sm:leading-[58px] lg:text-[72px] lg:leading-[76px] font-bold tracking-[-0.02em] text-white">
              Guided by people who know the land.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[18px] leading-[28px] text-white/85">
              Discover and request guided tours and activities across Namibia —
              curated local operators, honest prices, and a WhatsApp message
              between you and your guide.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 max-w-4xl">
            <SearchBar />
            <p className="mt-3 pl-2 text-[13px] text-white/70">
              Popular right now:{" "}
              <Link href="/experiences?category=coast" className="underline underline-offset-2 hover:text-white">
                dolphin cruises
              </Link>
              ,{" "}
              <Link href="/experiences?category=flights" className="underline underline-offset-2 hover:text-white">
                balloon flights
              </Link>
              ,{" "}
              <Link href="/experiences?category=stargazing" className="underline underline-offset-2 hover:text-white">
                stargazing
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Top experiences ============ */}
      <section aria-labelledby="top-experiences" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow text-terracotta-700">The launch catalogue</p>
              <h2
                id="top-experiences"
                className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink"
              >
                Trips travellers actually take
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-700">
                Sixteen guided experiences across seven destinations, from seal
                kayaking at dawn to balloons over the dune sea. Demo listings
                until our first operators go live.
              </p>
            </div>
            <Link
              href="/experiences"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
            >
              Browse all experiences
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CategoryChips />
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ Scroll story ============ */}
      <section aria-label="Namibia in three scenes" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pb-8 lg:pb-12">
          <div className="flex items-center justify-between pt-16 lg:pt-24 pb-8">
            <div>
              <p className="eyebrow text-terracotta-700">Namibia in three scenes</p>
              <h2 className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink">
                Coast. Desert. Wild.
              </h2>
            </div>
            <FootprintTrail className="hidden h-4 sm:flex" color="var(--sand)" />
          </div>
          <ScrollStory scenes={scenes} />
        </div>
      </section>

      {/* ============ Destinations ============ */}
      <section aria-labelledby="destinations" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-700">Where we operate</p>
            <h2
              id="destinations"
              className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink"
            >
              Seven destinations, one country
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-700">
              Launching at the coast and expanding inland — each destination
              with its own guides, seasons and local tips.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={`group relative overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className={`relative ${i === 0 ? "aspect-[4/3] sm:aspect-[16/13]" : "aspect-[4/3]"}`}>
                  <Image
                    src={d.heroImage}
                    alt={`${d.name}, ${d.region}, Namibia.`}
                    fill
                    sizes={i === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 scrim" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-[20px] font-semibold text-white">{d.name}</h3>
                  <p className="mt-0.5 text-[13px] text-white/80 line-clamp-1">{d.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AI planner teaser ============ */}
      <section aria-labelledby="planner-teaser" className="bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="eyebrow text-mustard">The Guidr planner</p>
              <h2
                id="planner-teaser"
                className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-white"
              >
                Tell it your days, your people, your budget.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/80">
                The planner builds a believable itinerary from real catalogue
                experiences and honest prices — never invented ones. Ask it to
                plan three days at the coast for a family of four, then send
                the whole plan to booking in one go.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/planner"
                  className="inline-flex h-12 items-center gap-2 rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
            </div>
            {/* Sample conversation */}
            <div className="rounded-xl bg-white p-5 sm:p-7 shadow-e3" aria-hidden="true">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-lg rounded-br-sm bg-terracotta-50 px-4 py-3 text-[14px] leading-relaxed text-ink">
                    We have 3 days at the coast in July, two adults and two kids (8 and 11). We like wildlife and easy walks, and our budget is around N$ 4,000 per person for activities.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
                    <FootprintIcon className="h-4 w-auto" color="var(--mustard)" />
                  </span>
                  <div className="max-w-[85%] space-y-3">
                    <p className="rounded-lg rounded-bl-sm bg-bone-50 px-4 py-3 text-[14px] leading-relaxed text-ink">
                      Here is a plan that fits your budget:
                    </p>
                    <div className="rounded-lg border border-line bg-white p-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 1 · Walvis Bay</p>
                      <p className="mt-1 text-[14px] font-semibold text-ink">Dolphin and seal catamaran cruise</p>
                      <p className="mt-1 text-[13px] text-ink-500">3 h · from N$ 600 pp · ages 6+</p>
                    </div>
                    <div className="rounded-lg border border-line bg-white p-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 2 · Swakopmund</p>
                      <p className="mt-1 text-[14px] font-semibold text-ink">Living Desert guided walk</p>
                      <p className="mt-1 text-[13px] text-ink-500">4 h · from N$ 850 pp · easy pace</p>
                    </div>
                    <div className="rounded-lg border border-line bg-white p-3.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-terracotta-700">Day 3 · Swakopmund</p>
                      <p className="mt-1 text-[14px] font-semibold text-ink">Dune quad biking + sandboarding combo</p>
                      <p className="mt-1 text-[13px] text-ink-500">2–3 h · from N$ 700 pp · passenger seats for kids</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ How it works ============ */}
      <section aria-labelledby="how-it-works" className="bg-bone-50">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-700">How it works</p>
            <h2
              id="how-it-works"
              className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink"
            >
              Four steps, no lock-in
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="rounded-lg border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-terracotta-50 text-terracotta-700">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="tabular text-[28px] font-bold text-line-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-[20px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-[14px] text-ink-500">
            <Wallet className="h-4 w-4" aria-hidden="true" />
            Payment is by bank transfer or the operator's own payment link — always direct to the operator.
          </p>
        </div>
      </section>

      {/* ============ Reviews ============ */}
      {reviews.length > 0 && (
        <section aria-labelledby="reviews" className="bg-white">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="eyebrow text-terracotta-700">From recent trips</p>
                <h2
                  id="reviews"
                  className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink"
                >
                  What travellers say
                </h2>
              </div>
              <p className="flex items-center gap-1.5 text-[14px] text-ink-500">
                <Star className="h-4 w-4 fill-mustard text-mustard" aria-hidden="true" />
                Demo reviews — replaced by verified bookings at launch.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map((r) => (
                <figure key={r.id} className="flex flex-col rounded-lg border border-line bg-white p-6">
                  <ReviewStars rating={r.rating} />
                  <blockquote className="mt-4 flex-1">
                    <p className="text-[15px] font-semibold text-ink">{r.title}</p>
                    <p className="mt-2 line-clamp-5 text-[14px] leading-relaxed text-ink-700">
                      {r.text}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-[13px] text-ink-500">
                    <span className="font-medium text-ink-700">{r.authorName}</span>
                    {" · "}
                    {r.partyType}
                    <br />
                    {r.experience.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ Operator CTA ============ */}
      <section aria-labelledby="operators-cta" className="bg-bone">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/images/experiences/desert-walk.jpg"
                alt="A small guided tour group walking across golden desert sand in Namibia."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
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
            <div>
              <p className="eyebrow text-terracotta-700">For operators</p>
              <h2
                id="operators-cta"
                className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-ink"
              >
                More bookings, less admin
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
                List your guided experiences, keep your own prices, and take
                requests straight to WhatsApp. A listing fee and a commission
                on completed bookings — nothing else, and Guidr never touches
                your travellers' money.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Your listing, your price, your cancellation policy",
                  "Requests and confirmations by WhatsApp and email",
                  "A calendar that blocks dates and manages capacity",
                  "Monthly invoices with commission on completed trips only",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-700">
                    <FootprintIcon className="mt-0.5 h-3.5 w-auto shrink-0" color="var(--terracotta)" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/for-operators"
                  className="inline-flex h-12 items-center gap-2 rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  List your experiences
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/for-operators#fees"
                  className="inline-flex h-12 items-center rounded-md border border-line-strong bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-bone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  See the fees
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ App waitlist ============ */}
      <section aria-labelledby="waitlist" className="bg-ink">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow text-mustard">The Guidr app</p>
              <h2
                id="waitlist"
                className="mt-2 text-[26px] leading-[32px] sm:text-[38px] sm:leading-[44px] font-bold tracking-[-0.015em] text-white"
              >
                In your pocket, offline-ready
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/80">
                Saved bookings, vouchers and WhatsApp threads that work on a
                bad connection in the middle of the desert. Join the waitlist
                and we will message you the day it ships.
              </p>
            </div>
            <div className="relative">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
