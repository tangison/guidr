import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import type {
  Destination,
  Experience,
  Operator,
  Review,
  Booking,
} from "@prisma/client";

/**
 * Data access layer. Pages never call Prisma directly — everything goes
 * through these repository functions (per docs/05-TECH-ARCHITECTURE.md).
 */

export type ExperienceWithRelations = Prisma.ExperienceGetPayload<{
  include: { destination: true; operator: true };
}>;

export type ReviewWithExperience = Prisma.ReviewGetPayload<{
  include: { experience: true };
}>;

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function experienceLists(e: Experience) {
  return {
    categories: parseJson<string[]>(e.categories, []),
    languages: parseJson<string[]>(e.languages, ["English"]),
    highlights: parseJson<string[]>(e.highlights, []),
    itinerary: parseJson<{ time: string; title: string; text: string }[]>(
      e.itinerary,
      []
    ),
    included: parseJson<string[]>(e.included, []),
    notIncluded: parseJson<string[]>(e.notIncluded, []),
    whatToBring: parseJson<string[]>(e.whatToBring, []),
    gallery: parseJson<string[]>(e.gallery, []),
  };
}

export function destinationTips(d: Destination): string[] {
  return parseJson<string[]>(d.localTips, []);
}

export function destinationDriveTimes(
  d: Destination
): { from: string; time: string }[] {
  return parseJson<{ from: string; time: string }[]>(d.driveTimes, []);
}

/** Home page: featured experiences (8 cards, curated insertion order). */
export async function getFeaturedExperiences(): Promise<
  ExperienceWithRelations[]
> {
  return db.experience.findMany({
    where: { featured: true },
    include: { destination: true, operator: true },
    orderBy: [{ createdAt: "asc" }],
    take: 8,
  });
}

/** All experiences with relations (for indexes and the planner context). */
export async function getAllExperiences(): Promise<ExperienceWithRelations[]> {
  return db.experience.findMany({
    include: { destination: true, operator: true },
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
  });
}

export async function getExperienceBySlug(
  slug: string
): Promise<ExperienceWithRelations | null> {
  return db.experience.findUnique({
    where: { slug },
    include: { destination: true, operator: true },
  });
}

export async function getSimilarExperiences(
  experience: ExperienceWithRelations,
  take = 3
): Promise<ExperienceWithRelations[]> {
  const cats = parseJson<string[]>(experience.categories, []);
  return db.experience.findMany({
    where: {
      id: { not: experience.id },
      OR: [
        { destinationSlug: experience.destinationSlug },
        { categories: { contains: cats[0] ?? "" } },
      ],
    },
    include: { destination: true, operator: true },
    orderBy: { createdAt: "asc" },
    take,
  });
}

export async function getExperiencesByDestination(
  destinationSlug: string
): Promise<ExperienceWithRelations[]> {
  return db.experience.findMany({
    where: { destinationSlug },
    include: { destination: true, operator: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getAllDestinations(): Promise<Destination[]> {
  return db.destination.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  return db.destination.findUnique({ where: { slug } });
}

export async function getExperienceReviews(experienceId: string) {
  return db.review.findMany({
    where: { experienceId },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getOperators(): Promise<Operator[]> {
  return db.operator.findMany({ orderBy: { name: "asc" } });
}

/** Search + filter for the experiences index. */
export type ExperienceFilters = {
  q?: string;
  destination?: string;
  category?: string;
  maxPrice?: number;
  sort?: string;
};

export async function searchExperiences(
  filters: ExperienceFilters
): Promise<ExperienceWithRelations[]> {
  const where: Prisma.ExperienceWhereInput = {};

  if (filters.destination && filters.destination !== "all") {
    where.destinationSlug = filters.destination;
  }
  if (filters.category && filters.category !== "all") {
    where.categories = { contains: `"${filters.category}"` };
  }
  if (filters.maxPrice) {
    where.priceMinor = { lte: filters.maxPrice };
  }
  if (filters.q) {
    // Typo-tolerance is out of scope for SQLite v1; substring match across
    // title, summary, and destination name.
    const q = filters.q.toLowerCase();
    where.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
      { description: { contains: q } },
      { destinationSlug: { contains: q } },
    ];
  }

  const order =
    filters.sort === "price-asc"
      ? ({ priceMinor: "asc" } as Prisma.ExperienceOrderByWithRelationInput)
      : filters.sort === "price-desc"
        ? ({ priceMinor: "desc" } as Prisma.ExperienceOrderByWithRelationInput)
        : filters.sort === "duration"
          ? ({ durationMinutes: "asc" } as Prisma.ExperienceOrderByWithRelationInput)
          : ({ rating: "desc" } as Prisma.ExperienceOrderByWithRelationInput);

  return db.experience.findMany({
    where,
    include: { destination: true, operator: true },
    orderBy: [order],
  });
}

/** Bookings */
export async function createBookingRequest(input: {
  experienceId: string;
  travellerName: string;
  travellerEmail: string;
  travellerWhatsapp?: string;
  date: string;
  guests: number;
  notes?: string;
}): Promise<Booking> {
  const experience = await db.experience.findUnique({
    where: { id: input.experienceId },
  });
  if (!experience) throw new Error("Experience not found");

  // Recompute the total on the server. Never trust client prices.
  const total = experience.priceMinor * input.guests;
  const ref = `GDR-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.random()
    .toString(36)
    .toUpperCase()
    .slice(2, 5)}`;

  return db.booking.create({
    data: {
      ref,
      experienceId: experience.id,
      travellerName: input.travellerName,
      travellerEmail: input.travellerEmail,
      travellerWhatsapp: input.travellerWhatsapp,
      date: input.date,
      guests: input.guests,
      notes: input.notes,
      status: "requested",
      totalPriceMinor: total,
      currency: experience.currency,
      events: {
        create: {
          type: "created",
          text: `Booking request sent to ${experience.operatorId}. We will confirm within 24 hours.`,
        },
      },
    },
    include: { experience: { include: { operator: true } } },
  });
}

export async function getBookingByRef(
  ref: string
): Promise<Prisma.BookingGetPayload<{ include: { experience: { include: { operator: true; destination: true } }, events: true } }> | null> {
  return db.booking.findUnique({
    where: { ref },
    include: {
      experience: { include: { operator: true, destination: true } },
      events: true,
    },
  });
}

export async function addWaitlistEmail(email: string) {
  return db.waitlistEntry.upsert({
    where: { email },
    update: {},
    create: { email },
  });
}

/** Compact catalogue context for the AI planner (honest data only). */
export async function getPlannerContext(): Promise<
  {
    slug: string;
    title: string;
    destination: string;
    categories: string[];
    durationMinutes: number;
    priceMinor: number;
    currency: string;
    summary: string;
  }[]
> {
  const all = await db.experience.findMany({
    include: { destination: true },
  });
  return all.map((e) => ({
    slug: e.slug,
    title: e.title,
    destination: e.destination.name,
    categories: parseJson<string[]>(e.categories, []),
    durationMinutes: e.durationMinutes,
    priceMinor: e.priceMinor,
    currency: e.currency,
    summary: e.summary,
  }));
}
