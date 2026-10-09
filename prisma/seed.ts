import { PrismaClient } from "@prisma/client";
import { SEED_DESTINATIONS, SEED_OPERATORS } from "./seed-data";
import { SEED_EXPERIENCES } from "./seed-experiences";
import { SEED_EXPERIENCES_2 } from "./seed-experiences-2";
import { SEED_REVIEWS } from "./seed-reviews";

const db = new PrismaClient();

async function main() {
  console.log("Seeding Guidr demo catalogue…");

  await db.bookingEvent.deleteMany();
  await db.booking.deleteMany();
  await db.review.deleteMany();
  await db.experience.deleteMany();
  await db.operator.deleteMany();
  await db.destination.deleteMany();

  // Destinations
  for (const d of SEED_DESTINATIONS) {
    await db.destination.create({
      data: {
        slug: d.slug,
        name: d.name,
        region: d.region,
        tagline: d.tagline,
        intro: d.intro,
        bestSeason: d.bestSeason,
        howToGetThere: d.howToGetThere,
        nearestTown: d.nearestTown,
        driveTimes: JSON.stringify(d.driveTimes),
        localTips: JSON.stringify(d.localTips),
        heroImage: d.heroImage,
        latitude: d.latitude,
        longitude: d.longitude,
        featured: d.featured,
      },
    });
  }
  console.log(`  ${SEED_DESTINATIONS.length} destinations`);

  // Operators
  for (const o of SEED_OPERATORS) {
    await db.operator.create({
      data: {
        slug: o.slug,
        name: o.name,
        tagline: o.tagline,
        about: o.about,
        baseCity: o.baseCity,
        whatsapp: o.whatsapp,
        yearsRunning: o.yearsRunning,
        isDemo: true,
      },
    });
  }
  console.log(`  ${SEED_OPERATORS.length} demo operators`);

  // Experiences
  const all = [...SEED_EXPERIENCES, ...SEED_EXPERIENCES_2];
  for (const e of all) {
    const operator = await db.operator.findUnique({ where: { slug: e.operatorSlug } });
    if (!operator) throw new Error(`Operator ${e.operatorSlug} not found`);
    await db.experience.create({
      data: {
        slug: e.slug,
        title: e.title,
        summary: e.summary,
        description: e.description,
        destinationSlug: e.destinationSlug,
        operatorId: operator.id,
        categories: JSON.stringify(e.categories),
        durationMinutes: e.durationMinutes,
        groupMax: e.groupMax,
        languages: JSON.stringify(e.languages),
        difficulty: e.difficulty,
        familyFriendly: e.familyFriendly,
        priceModel: e.priceModel,
        priceMinor: e.priceMinor,
        childPriceMinor: e.childPriceMinor ?? null,
        currency: "NAD",
        highlights: JSON.stringify(e.highlights),
        itinerary: JSON.stringify(e.itinerary),
        included: JSON.stringify(e.included),
        notIncluded: JSON.stringify(e.notIncluded),
        whatToBring: JSON.stringify(e.whatToBring),
        meetingPoint: e.meetingPoint,
        policy: e.policy,
        rating: e.rating,
        reviewCount: e.reviewCount,
        heroImage: e.heroImage,
        gallery: JSON.stringify(e.gallery),
        isDemo: true,
        featured: e.featured,
      },
    });
  }
  console.log(`  ${all.length} experiences`);

  // Reviews
  for (const r of SEED_REVIEWS) {
    const exp = await db.experience.findUnique({ where: { slug: r.experienceSlug } });
    if (!exp) throw new Error(`Experience ${r.experienceSlug} not found`);
    await db.review.create({
      data: {
        experienceId: exp.id,
        authorName: r.authorName,
        authorCountry: r.authorCountry,
        partyType: r.partyType,
        rating: r.rating,
        title: r.title,
        text: r.text,
        travelDate: r.travelDate,
        isDemo: true,
      },
    });
  }
  console.log(`  ${SEED_REVIEWS.length} demo reviews`);
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
