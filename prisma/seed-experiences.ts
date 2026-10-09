import type { Prisma } from "@prisma/client";

export type SeedExperience = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  destinationSlug: string;
  operatorSlug: string;
  categories: string[];
  durationMinutes: number;
  groupMax: number;
  languages: string[];
  difficulty: string;
  familyFriendly: boolean;
  priceModel: string;
  priceMinor: number;
  childPriceMinor?: number;
  highlights: string[];
  itinerary: { time: string; title: string; text: string }[];
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  meetingPoint: string;
  policy: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  gallery: string[];
  featured: boolean;
};

const EN_DE = ["English", "German"];

export const SEED_EXPERIENCES: SeedExperience[] = [
  {
    slug: "swakopmund-dune-quad-biking",
    title: "Dune quad biking on the Namib's edge",
    summary:
      "Ride a guided quad bike trail through rolling dunes just outside Swakopmund — no experience needed.",
    description:
      "This is the classic Swakopmund ride: an automatic quad bike, a guide who reads the sand like a book, and 30 kilometres of dune field on the edge of town. The first twenty minutes are slow — everyone learns the bike on flat tracks — then the guide opens the route into the long climbs and sweeping descents of the lower dunes. The sand here is part of the Namib dune belt that runs 400 kilometres down the coast, and the views from the crests take in the Atlantic on clear days. You stop twice to learn how the desert works: the beetles, the tracks, the few plants that hold the sand in place. One rider per bike; a passenger option (2-up) suits younger families. Helmets, goggles and overalls are provided, and the outfit runs morning and afternoon sessions year-round.",
    destinationSlug: "swakopmund",
    operatorSlug: "coastal-dunes-co",
    categories: ["adventure", "desert"],
    durationMinutes: 120,
    groupMax: 10,
    languages: EN_DE,
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 70000,
    childPriceMinor: 45000,
    highlights: [
      "Automatic bikes — no licence or experience needed",
      "Riding through a dune field older than any road",
      "A guide who explains the small desert life under your wheels",
      "Morning sessions catch the cool air and the best light",
    ],
    itinerary: [
      { time: "08:00", title: "Kit up and bike briefing", text: "Helmets, goggles and overalls on; a 15 minute lesson on the bikes at the base." },
      { time: "08:20", title: "Practice loops", text: "Easy flat tracks until the whole group is comfortable with throttle and balance." },
      { time: "08:40", title: "Into the dunes", text: "The guided trail climbs and drops through the dune belt, with photo stops on the crests." },
      { time: "09:30", title: "Desert stop", text: "The guide shows you tracks, beetles and the plants that anchor the sand." },
      { time: "10:00", title: "Back to base", text: "A last fast section home, then cold water and a debrief." },
    ],
    included: [
      "Quad bike and fuel",
      "Helmet, goggles and overalls",
      "Guided trail with desert interpretation stops",
      "Water at the base",
    ],
    notIncluded: [
      "Hotel pickup (available on request)",
      "Photos taken by the crew",
      "Park conservation fee where applicable",
    ],
    whatToBring: [
      "Closed shoes",
      "Sunglasses",
      "A jacket in winter months",
      "Sunscreen",
    ],
    meetingPoint: "Dune base on the Swakopmund side of the Swakop river bed, 10 minutes from the town centre.",
    policy: "flexible",
    rating: 4.7,
    reviewCount: 8,
    heroImage: "/images/experiences/quad-biking.jpg",
    gallery: [
      "/images/experiences/quad-biking-2.jpg",
      "/images/experiences/hero-dunes.jpg",
      "/images/experiences/desert-walk.jpg",
    ],
    featured: true,
  },
  {
    slug: "swakopmund-sandboarding",
    title: "Sandboarding the big dune",
    summary:
      "Lie-down or stand-up sandboarding on a 60 metre dune — the morning adrenaline classic.",
    description:
      "Sandboarding is Namibia's homemade sport: waxed boards, a huge dune, and a cable tow that drags you back to the top so you can do it again. Beginners start lying down — belly first, head up, 60 kilometres an hour down the slip face — and graduate to stand-up boards if the legs allow. The crew times each run with a speed gun, so the session turns quietly competitive. Between runs you sit on the crest with a view over the dune belt toward the ocean. The sand is soft and forgiving, which makes this a good first extreme sport for teenagers and brave parents alike. Sessions run in the morning before the sand heats up; overalls and helmets are included, and yes, you will find sand in your shoes for two days.",
    destinationSlug: "swakopmund",
    operatorSlug: "coastal-dunes-co",
    categories: ["adventure", "desert"],
    durationMinutes: 150,
    groupMax: 12,
    languages: EN_DE,
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 55000,
    childPriceMinor: 40000,
    highlights: [
      "Lie-down runs reach 60 km/h on the first try",
      "Cable tow carries you back up — more runs, less climbing",
      "Speed-gun timing for the competitive",
      "Views over the dune belt from the crest",
    ],
    itinerary: [
      { time: "09:00", title: "Meet at the dune", text: "A 25 minute drive from town to the boarding dune; boards and wax handed out." },
      { time: "09:30", title: "Lie-down runs", text: "Technique briefing, then your first descents — most people get six to ten runs." },
      { time: "10:20", title: "Stand-up option", text: "Switch to snowboard-style boards if you want the harder line." },
      { time: "11:00", title: "Last runs and photos", text: "The crew photographs your fastest line; speeds get read out." },
      { time: "11:30", title: "Head back", text: "Return transfer, water and a stretch of the legs." },
    ],
    included: [
      "All boards, wax and safety gear",
      "Cable tow on the dune",
      "Experienced crew and instruction",
      "Transfer from the meeting point",
    ],
    notIncluded: [
      "Hotel pickup",
      "Photo package",
      "Snacks",
    ],
    whatToBring: ["Closed shoes", "Sunglasses or goggles", "Sunscreen", "A change of socks"],
    meetingPoint: "Corner of the dune belt access road, Swakopmund — detailed directions on booking.",
    policy: "flexible",
    rating: 4.6,
    reviewCount: 6,
    heroImage: "/images/experiences/sandboarding.jpg",
    gallery: [
      "/images/experiences/sandboarding-2.jpg",
      "/images/experiences/hero-dunes.jpg",
    ],
    featured: false,
  },
  {
    slug: "walvis-bay-dolphin-and-seal-catamaran",
    title: "Dolphin and seal catamaran cruise",
    summary:
      "Three hours on the lagoon with dolphins, seals, pelicans and fresh oysters on the way home.",
    description:
      "The catamaran cruise is Walvis Bay's signature trip, and it earns it. Within twenty minutes of leaving the harbour you are usually among Heaviside's dolphins — small, fast residents of the Benguela that love a bow wave — and the boat slows while they play across the front. At Pelican Point the cape fur seals swim out to inspect the hull, pelicans hover for handouts, and the skipper narrates the lagoon's workings: the salt pans, the guano platform, the cold current that feeds it all. On the way home the crew serves fresh Namibian oysters with sparkling wine and light snacks. The boats are stable catamarans with a covered deck, so the trip suits all ages and the sea state is usually gentle inside the bay. Morning departures have the calmest water and the most wildlife.",
    destinationSlug: "walvis-bay",
    operatorSlug: "lagoon-cruises-namibia",
    categories: ["coast", "wildlife"],
    durationMinutes: 180,
    groupMax: 20,
    languages: EN_DE,
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 60000,
    childPriceMinor: 35000,
    highlights: [
      "Heaviside's dolphins riding the bow wave",
      "Seals and pelicans alongside at Pelican Point",
      "Fresh oysters and sparkling wine served on board",
      "Stable covered catamaran — all ages welcome",
    ],
    itinerary: [
      { time: "08:00", title: "Board at the yacht harbour", text: "Coffee on the jetty, safety briefing, then out past the port." },
      { time: "08:30", title: "Dolphin time", text: "The skipper finds the resident dolphins; engines ease while they play on the bow." },
      { time: "09:15", title: "Pelican Point seals", text: "Anchored off the colony: seals around the hull, pelicans overhead." },
      { time: "10:00", title: "Oysters on board", text: "Fresh oysters, sparkling wine, juice and snacks served on the way back." },
      { time: "11:00", title: "Back in harbour", text: "Disembark with time for the lagoon flamingos before lunch." },
    ],
    included: [
      "Catamaran cruise with skipper and guide",
      "Oysters, sparkling wine, snacks and drinks",
      "Life jackets and windproof jackets",
      "Harbour fees",
    ],
    notIncluded: [
      "Hotel transfers",
      "Photos from the crew",
      "Kayak add-on",
    ],
    whatToBring: ["Warm jacket", "Sun hat", "Camera", "Sea-sickness tablets if prone"],
    meetingPoint: "Walvis Bay yacht harbour, jetty A — look for the catamaran flags.",
    policy: "moderate",
    rating: 4.8,
    reviewCount: 12,
    heroImage: "/images/experiences/catamaran.jpg",
    gallery: [
      "/images/experiences/catamaran-2.jpg",
      "/images/experiences/kayaking.jpg",
      "/images/destinations/walvis-bay.jpg",
    ],
    featured: true,
  },
  {
    slug: "pelican-point-seal-kayaking",
    title: "Seal kayaking at Pelican Point",
    summary:
      "Paddle among playful cape fur seals at first light — the closest wildlife encounter on the coast.",
    description:
      "This is the coast's most intimate trip: a dawn launch from the beach beside the Pelican Point lighthouse, in stable double kayaks, straight into the home waters of a seal colony thousands strong. The young seals treat the boats as toys — they blow bubbles, nudge the hulls and swim underneath you in packs, close enough to touch (you won't; the guide will insist, rightly). Heaviside's dolphins often join the paddle on the way along the spit, and flamingos work the shallows in the distance. No kayaking experience is needed: the boats are wide and forgiving, the water inside the point is usually flat, and a support boat shadows the group. You are on the water at sunrise, which is when the light on the dunes across the lagoon is unreal. Wetsuits and splash jackets are provided; the water is cold and worth it.",
    destinationSlug: "walvis-bay",
    operatorSlug: "lagoon-cruises-namibia",
    categories: ["coast", "adventure", "wildlife"],
    durationMinutes: 180,
    groupMax: 10,
    languages: ["English"],
    difficulty: "moderate",
    familyFriendly: false,
    priceModel: "per_person",
    priceMinor: 180000,
    childPriceMinor: 120000,
    highlights: [
      "Seals swimming under and around the kayaks",
      "Dawn light across the lagoon and dunes",
      "Stable double kayaks — no experience needed",
      "Dolphins frequently join the paddle",
    ],
    itinerary: [
      { time: "07:00", title: "Meet and gear up", text: "Wetsuits and splash jackets at the harbour; a short boat transfer to the point." },
      { time: "07:30", title: "Kayak briefing", text: "Paddle lesson on the beach: steering, stopping and what to expect from the seals." },
      { time: "07:45", title: "On the water", text: "Paddle into the colony's waters; the young seals come out to play." },
      { time: "08:45", title: "Along the spit", text: "A slow paddle with the lagoon on one side and the ocean on the other." },
      { time: "09:30", title: "Beach breakfast", text: "Coffee and rolls on the sand before the transfer back." },
    ],
    included: [
      "Double kayak, paddle and safety gear",
      "Wetsuit and splash jacket",
      "Support boat and qualified guide",
      "Light beach breakfast",
    ],
    notIncluded: [
      "Hotel transfers",
      "Waterproof camera housing",
      "Towels",
    ],
    whatToBring: ["Swimwear worn under clothes", "Towel", "Warm layer", "Sunscreen"],
    meetingPoint: "Walvis Bay yacht harbour, jetty A, at first light.",
    policy: "moderate",
    rating: 4.9,
    reviewCount: 9,
    heroImage: "/images/experiences/kayaking.jpg",
    gallery: [
      "/images/experiences/kayaking-2.jpg",
      "/images/experiences/catamaran.jpg",
    ],
    featured: true,
  },
  {
    slug: "swakopmund-living-desert-walk",
    title: "Living Desert guided walk",
    summary:
      "A half-day walk that reveals the small life of the Namib — geckos, chameleons, beetles and tracks.",
    description:
      "Everyone comes for the dunes; the people who take this walk remember the palmato gecko. A specialist guide drives you a short way into the gravel plains and dune belt outside Swakopmund and then walks slowly, reading the sand: beetle tracks that point to a nest, a chameleon's changing colours, the chemistry of a fog-basking beetle's shell, sidewinder patterns in a slip face. This is the Namib as a living system — 55 million years old, and mostly the size of your fingernail. The pace suits all ages, the distances are short, and the guide carries sand-tracks guides and a spotting scope. It is the best answer to the question every traveller asks after two days of big landscapes: what actually lives out there?",
    destinationSlug: "swakopmund",
    operatorSlug: "coastal-dunes-co",
    categories: ["wildlife", "desert"],
    durationMinutes: 240,
    groupMax: 8,
    languages: ["English", "German"],
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 85000,
    childPriceMinor: 50000,
    highlights: [
      "Palmato geckos and Namaqua chameleons up close",
      "Track reading with a specialist desert guide",
      "Short walks, huge subject matter",
      "A scope for birds and distant ostrich",
    ],
    itinerary: [
      { time: "08:00", title: "Pickup and drive out", text: "A 20 minute drive to the gravel plains between the dunes and the coast road." },
      { time: "08:30", title: "First tracks", text: "The guide stops where the sand tells stories: beetles, snakes, lizards." },
      { time: "09:15", title: "The small five", text: "Searching out gecko, chameleon, lizard, snake and spider — gently, and all released." },
      { time: "10:30", title: "Dune slack walk", text: "A slow loop through the plants that hold the dunes together." },
      { time: "11:30", title: "Back to town", text: "Return with a completely different idea of what a desert is." },
    ],
    included: [
      "Specialist desert guide",
      "Transport from the meeting point",
      "Spotting scope and field guides",
      "Water and light refreshments",
    ],
    notIncluded: ["Hotel pickup", "Lunch", "Gratuities"],
    whatToBring: ["Closed walking shoes", "Sun hat", "Water bottle", "Camera with a macro or zoom"],
    meetingPoint: "Swakopmund town centre, at the activity centre on the main road.",
    policy: "moderate",
    rating: 4.8,
    reviewCount: 7,
    heroImage: "/images/experiences/living-desert.jpg",
    gallery: [
      "/images/experiences/living-desert-2.jpg",
      "/images/experiences/desert-walk.jpg",
    ],
    featured: false,
  },
  {
    slug: "swakopmund-coastal-scenic-flight",
    title: "Coastal scenic flight: dunes and shipwrecks",
    summary:
      "A light-aircraft flight over the dune belt, Sandwich Harbour and the Skeleton Coast wreck line.",
    description:
      "From the air the coast stops being a postcard and becomes a diagram: where the dunes pour into the Atlantic at Sandwich Harbour, the salt pans pink against the water, the wreck line of the Skeleton Coast running north. This 75 minute flight in a high-wing Cessna leaves from Swakopmund's airfield, banks south over the dune belt and the lagoon, follows the coast past Sandwich to the Kuiseb river canyon, then turns north along the beach to the Eduard Bohlen wreck. Every seat is a window seat and the wings sit above you, so the views are unobstructed. Headsets carry the pilot's commentary on the geology and the wrecks. Smooth morning air makes the photography sharp; book the first departure of the day.",
    destinationSlug: "swakopmund",
    operatorSlug: "coastal-dunes-co",
    categories: ["flights", "coast", "desert"],
    durationMinutes: 75,
    groupMax: 5,
    languages: EN_DE,
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 240000,
    highlights: [
      "Sandwich Harbour: dunes running straight into the sea",
      "The Kuiseb canyon and the wreck line of the Skeleton Coast",
      "High-wing aircraft — every seat is a window seat",
      "Pilot commentary over headsets",
    ],
    itinerary: [
      { time: "08:00", title: "Airfield check-in", text: "Safety briefing and boarding at the Swakopmund airfield." },
      { time: "08:15", title: "South over the dune belt", text: "The dunes and dry rivers inland, then the lagoon from above." },
      { time: "08:40", title: "Sandwich Harbour", text: "The classic pass along where the dunes meet the water." },
      { time: "09:00", title: "North along the coast", text: "Beach run past the wrecks toward the Kuiseb canyon crossing." },
      { time: "09:15", title: "Landing", text: "Back on the ground with the best photos of your trip." },
    ],
    included: [
      "75 minute scenic flight",
      "Window seat and headsets",
      "Pilot commentary",
      "Airfield fees",
    ],
    notIncluded: ["Hotel transfers", "Photo packages", "Weight excess fees"],
    whatToBring: ["Camera", "Sunglasses", "Light jacket"],
    meetingPoint: "Swakopmund airfield, 10 minutes from the town centre.",
    policy: "moderate",
    rating: 4.7,
    reviewCount: 5,
    heroImage: "/images/experiences/scenic-flight.jpg",
    gallery: [
      "/images/experiences/scenic-flight-2.jpg",
      "/images/destinations/swakopmund.jpg",
    ],
    featured: true,
  },
  {
    slug: "sossusvlei-sunrise-balloon-flight",
    title: "Sunrise balloon flight over Sossusvlei",
    summary:
      "Drift silently over the world's oldest desert at first light, then breakfast under a camelthorn tree.",
    description:
      "There is no quieter way to meet Sossusvlei. The balloon launches in the half-dark, the burner the only sound, and then you are up with the sun as it lights the dune sea from crest to crest — apricot, red, violet in the space of ten minutes. The pilot works the layers of air so the balloon floats along the dune ridges and over Deadvlei itself, high enough for the geometry, low enough to see the shadows walk. Flight time is about an hour, and where you land depends on the morning's wind — the crew follows on the ground. On landing there is champagne (the old tradition) and a proper breakfast laid out in the shade of a camelthorn, in the middle of a private reserve. It is the single most expensive hour in this catalogue and the one travellers describe first when they get home.",
    destinationSlug: "sossusvlei",
    operatorSlug: "namib-desert-guides",
    categories: ["flights", "desert"],
    durationMinutes: 240,
    groupMax: 16,
    languages: EN_DE,
    difficulty: "easy",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 992000,
    highlights: [
      "An hour of silent flight over the dune sea at sunrise",
      "Deadvlei and the big dunes from directly above",
      "Champagne and breakfast in the shade of a camelthorn",
      "Crew and retrieve vehicle follow the balloon down",
    ],
    itinerary: [
      { time: "04:30", title: "Before-dawn pickup", text: "Collected from your lodge; a drive to the launch site while the stars are still out." },
      { time: "05:30", title: "Inflation and launch", text: "Watch the balloon rise, then board as the sky begins to turn." },
      { time: "06:00", title: "Sunrise over the dune sea", text: "The flight: dune ridges, Deadvlei, and the long shadows of the morning." },
      { time: "07:15", title: "Landing and breakfast", text: "Champagne on landing, then a full breakfast served in the reserve." },
      { time: "08:30", title: "Return transfer", text: "Back to your lodge before the day trips even reach the gate." },
    ],
    included: [
      "One hour balloon flight",
      "Champagne and full breakfast after landing",
      "Return transfers from lodges near Sesriem",
      "Flight certificate",
    ],
    notIncluded: [
      "Transfers from further than 40 km of Sesriem",
      "Park entry fees",
      "Personal cameras insurance",
    ],
    whatToBring: ["Warm layer for before sunrise", "Camera", "Closed shoes for landing", "Hat (it is warm near the burner)"],
    meetingPoint: "Pickup from lodges in the Sesriem / Sossusvlei area.",
    policy: "strict",
    rating: 4.9,
    reviewCount: 11,
    heroImage: "/images/experiences/balloon.jpg",
    gallery: [
      "/images/experiences/balloon-2.jpg",
      "/images/destinations/sossusvlei.jpg",
      "/images/experiences/deadvlei.jpg",
    ],
    featured: true,
  },
  {
    slug: "sossusvlei-dune-45-sunrise-climb",
    title: "Dune 45 sunrise climb",
    summary:
      "Climb the world's most photographed dune for first light, with a guide who sets the pace.",
    description:
      "Dune 45 is 170 metres of apricot sand beside the park road, close enough to the gate that you can be on its spine as the sun clears the horizon. The climb is 40 to 60 minutes up a ridge that narrows toward the crest — your guide sets a slow desert pace and finds the firm sand under your feet. From the top, the dune sea runs south toward Sossusvlei and the shadows rake east across the pans. On the way down you take the slip face at a run, which is the part everyone secretly comes for. Afterward there is coffee at the shuttle parking and a slow drive deeper into the park toward Deadvlei if you add the extension. The early gate opening is timed exactly for this climb; being in the queue before it opens is the difference between a crowd and a cathedral.",
    destinationSlug: "sossusvlei",
    operatorSlug: "namib-desert-guides",
    categories: ["desert"],
    durationMinutes: 180,
    groupMax: 12,
    languages: EN_DE,
    difficulty: "moderate",
    familyFriendly: true,
    priceModel: "per_person",
    priceMinor: 95000,
    childPriceMinor: 70000,
    highlights: [
      "Sunrise from the spine of Dune 45",
      "A guide who finds the firm sand and the pace",
      "Running down the slip face",
      "Coffee at the parking before the crowds arrive",
    ],
    itinerary: [
      { time: "05:00", title: "Gate queue and entry", text: "Meet at the Sesriem gate before it opens and drive 45 km into the park." },
      { time: "06:00", title: "The climb", text: "A guided 40 to 60 minute ascent along the ridge in the pre-dawn cool." },
      { time: "07:00", title: "Sunrise on the crest", text: "First light over the dune sea; photos while the shadows are long." },
      { time: "07:30", title: "Down the slip face", text: "The fast way down — three minutes of controlled falling." },
      { time: "08:00", title: "Coffee and onward", text: "Coffee at the parking; optional extension to Deadvlei." },
    ],
    included: [
      "Guided climb with a desert guide",
      "Park transport from the gate",
      "Coffee and muffins after the climb",
      "Small group (max 12)",
    ],
    notIncluded: ["Park entry fee", "Deadvlei 4x4 shuttle", "Lodge pickup outside the gate area"],
    whatToBring: ["Two litres of water", "Layers for the cold start", "Sun hat and sunscreen", "Sturdy sandals or shoes"],
    meetingPoint: "Sesriem park gate, 45 minutes before sunrise.",
    policy: "moderate",
    rating: 4.6,
    reviewCount: 6,
    heroImage: "/images/experiences/dune45.jpg",
    gallery: [
      "/images/experiences/dune45-2.jpg",
      "/images/experiences/hero-dunes.jpg",
    ],
    featured: false,
  },
];
