/** Guidr seed data — demo content, flagged is_demo. Prices are market references [VERIFY]. */

export type SeedDestination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  intro: string;
  bestSeason: string;
  howToGetThere: string;
  nearestTown: string;
  driveTimes: { from: string; time: string }[];
  localTips: string[];
  heroImage: string;
  latitude: number;
  longitude: number;
  featured: boolean;
};

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    slug: "swakopmund",
    name: "Swakopmund",
    region: "Erongo, the coast",
    tagline: "Where the desert meets the Atlantic",
    intro:
      "Swakopmund is Namibia's seaside town, wrapped between cold Atlantic water and the world's oldest desert. German colonial architecture stands along palm-lined streets; adventure operators line the edge of the dunes. Mornings bring fog rolling off the ocean, afternoons bring warm sun, and evenings bring crayfish and cold beer on the mole. It is the country's activity capital — quad biking, sandboarding, catamaran cruises and scenic flights all leave from here, which is why Guidr launches in Swakopmund first.",
    bestSeason: "October to April for warm days; May to September for dolphins and cooler air",
    howToGetThere:
      "Fly into Walvis Bay (30 min drive) or Hosea Kutako International Airport in Windhoek (4 hour drive on sealed roads). Most travellers rent a car or book a transfer.",
    nearestTown: "Walvis Bay, 36 km south",
    driveTimes: [
      { from: "Windhoek", time: "about 4 hours" },
      { from: "Walvis Bay", time: "about 35 minutes" },
      { from: "Sossusvlei (Sesriem gate)", time: "about 4.5 hours" },
      { from: "Spitzkoppe", time: "about 1.5 hours" },
    ],
    localTips: [
      "Book morning slots for quad biking and sandboarding — the dunes get hot by 11:00.",
      "The Benguela current is cold: pack a windbreaker even in summer.",
      "Try the kiosks at the mole for fresh crayfish rolls.",
      "Fuel is cheapest in town before heading inland — fill up at the edge of the desert.",
      "Sandwich Harbour tours need a 4x4 and a guide; do not drive it yourself.",
    ],
    heroImage: "/images/destinations/swakopmund.jpg",
    latitude: -22.6785,
    longitude: 14.5294,
    featured: true,
  },
  {
    slug: "walvis-bay",
    name: "Walvis Bay",
    region: "Erongo, the coast",
    tagline: "Lagoon, seals and flamingos",
    intro:
      "Walvis Bay guards a huge natural lagoon that tens of thousands of flamingos, cape fur seals and visiting dolphins call home. It is the working port of Namibia and the launch point for the coast's best boat trips: catamaran cruises with dolphins riding the bow wave, and kayaking among the seals at Pelican Point. The lagoon promenade is one of the easiest places in Africa to watch flamingos at arm's length, and the salt pans turn pink at sunset.",
    bestSeason: "Year-round; July to November for whales and dolphins at their best",
    howToGetThere:
      "Walvis Bay has the coast's airport (RVX/WVB), 15 minutes from town centre. It is 4 hours from Windhoek by road and 35 minutes from Swakopmund.",
    nearestTown: "Swakopmund, 36 km north",
    driveTimes: [
      { from: "Windhoek", time: "about 4 hours" },
      { from: "Swakopmund", time: "about 35 minutes" },
      { from: "Sossusvlei (Sesriem gate)", time: "about 5 hours" },
    ],
    localTips: [
      "Kayaking at Pelican Point launches at first light — book the earliest slot.",
      "The lagoon promenade is free and flat; go at high tide for the closest flamingos.",
      "Sea-sickness tablets help on the catamaran if the swell is running.",
      "Seals are curious and will swim to the kayaks; keep hands inside the boat near the colony.",
      "The salt works road south of town has the best sunset photo angle.",
    ],
    heroImage: "/images/destinations/walvis-bay.jpg",
    latitude: -22.9575,
    longitude: 14.5053,
    featured: true,
  },
  {
    slug: "sossusvlei",
    name: "Sossusvlei",
    region: "Hardap, the south",
    tagline: "The big red dunes",
    intro:
      "Sossusvlei is the postcard of Namibia: a clay pan ringed by apricot-red dunes that climb more than 300 metres, including Big Daddy and the photographed-to-death Dune 45. Dead camelthorn trees stand black against the white pan of Deadvlei, a scene that looks painted. Sunrise balloon flights drift silently over the whole sea of sand. The park gate at Sesriem opens before dawn so travellers can catch first light on the dune ridges — the reason every lodge in the area sets alarms for 04:30.",
    bestSeason: "May to October for cooler hiking; November to April for dramatic skies",
    howToGetThere:
      "Drive from Windhoek (about 5 hours via Spreetshoogte or Solitaire) or from Swakopmund (about 4.5 hours on gravel). Fly-in transfers land at a private strip near Sesriem.",
    nearestTown: "Sesriem, inside the park gate; Solitaire 45 min before the gate",
    driveTimes: [
      { from: "Windhoek", time: "about 5 hours" },
      { from: "Swakopmund", time: "about 4.5 hours" },
      { from: "Luderitz", time: "about 6 hours" },
    ],
    localTips: [
      "The gate opens at sunrise; be in the queue 30 minutes early in season.",
      "Climb Dune 45 at dawn — the ridge line is a 90 minute round trip with a view.",
      "Big Daddy takes 60 to 90 minutes up; carry double the water you think you need.",
      "Deadvlei's pan is a 4x4 shuttle or 5 km walk from the 2x2 parking.",
      "Sesriem Canyon is best in late afternoon light and takes 40 minutes to walk.",
    ],
    heroImage: "/images/destinations/sossusvlei.jpg",
    latitude: -24.7275,
    longitude: 15.3444,
    featured: true,
  },
  {
    slug: "etosha",
    name: "Etosha National Park",
    region: "Kunene / Oshikoto, the north",
    tagline: "Waterholes and big game",
    intro:
      "Etosha is Namibia's great game park, a sun-baked pan the size of a small country fringed by grassland and bush. In the dry season animals converge on the waterholes, and the etiquette of the park — sit still, engine off, watch — produces some of the best wildlife viewing in Africa: elephant herds, black rhino under the stars, lions at midnight. Guided day safaris from the gates or multi-day trips from the coast and Windhoek are the easy way in, since the park's own camps book out months ahead in season.",
    bestSeason: "May to October (dry season) for concentrated game at waterholes",
    howToGetThere:
      "Fly to Ondangwa or drive from Windhoek (about 4.5 hours to Anderson Gate). From the coast it is a long day — most travellers book a 3-day guided trip.",
    nearestTown: "Outjo and Tsumeb at the gates; Okaukuejo inside the park",
    driveTimes: [
      { from: "Windhoek", time: "about 4.5 hours to the south gate" },
      { from: "Swakopmund", time: "about 8 hours — usually done as a 3-day tour" },
      { from: "Damaraland", time: "about 5 hours on gravel" },
    ],
    localTips: [
      "Book park camps a year ahead for July to September; lodges outside the gates are easier.",
      "Sit at a waterhole at dusk and stay after dark — rhino arrive late.",
      "Gates open at sunrise and close at sunset; the fines for lateness are real.",
      "A guide knows where yesterday's sightings were; self-drive covers less ground.",
      "Night driving is banned inside the park; plan around it.",
    ],
    heroImage: "/images/destinations/etosha.jpg",
    latitude: -19.0,
    longitude: 15.9,
    featured: true,
  },
  {
    slug: "damaraland",
    name: "Damaraland",
    region: "Kunene, the northwest",
    tagline: "Desert elephants and rock art",
    intro:
      "Damaraland is rugged country: red table mountains, dry riverbeds and gravel plains where desert-adapted elephants walk farther between water than anywhere else on earth. Twyfelfontein holds one of Africa's richest galleries of ancient rock engravings, a UNESCO site guided by local trackers who read the stones like a library. The region demands a 4x4 or a guide, and rewards you with silence, starfields and the strange feeling that the land has been doing this for a very long time.",
    bestSeason: "May to October; November to March for landscapes after rain",
    howToGetThere:
      "Gravel roads from Swakopmund (about 5 hours) or Windhoek (about 5.5 hours via Khorixas). Most travellers arrive on a guided northbound loop.",
    nearestTown: "Khorixas; Twyfelfontein lodges 60 km beyond on gravel",
    driveTimes: [
      { from: "Swakopmund", time: "about 5 hours on gravel" },
      { from: "Etosha (Anderson Gate)", time: "about 5 hours" },
      { from: "Windhoek", time: "about 5.5 hours" },
    ],
    localTips: [
      "Hire a guide for elephant tracking — sightings drop fast without local knowledge.",
      "Twyfelfontein engravings are best photographed mid-morning or late afternoon.",
      "Fuel up in Khorixas; the next reliable station is far.",
      "Desert elephants are wild and quick-tempered at close range: stay in the vehicle.",
      "The Organ Pipes and Burnt Mountain stops are 15 minutes apart — worth the detour.",
    ],
    heroImage: "/images/destinations/damaraland.jpg",
    latitude: -20.6167,
    longitude: 14.4167,
    featured: false,
  },
  {
    slug: "fish-river",
    name: "Fish River Canyon",
    region: "Karas, the far south",
    tagline: "The second-largest canyon on earth",
    intro:
      "Fish River Canyon cuts 160 kilometres through the arid south of Namibia, plunging 550 metres at its deepest viewpoint at Hobas. Sunrise and sunset set the layered walls alight, and the multi-day canyon hike (done in the cooler months, with a permit and a doctor's certificate) is one of the great walks of Africa. Most visitors take the easier option — a sunrise or sunset at the main viewpoint with a guide who explains the geology and the hardy plants and animals that live on the rim.",
    bestSeason: "May to September for hiking; viewpoint visits are good year-round",
    howToGetThere:
      "About 6.5 hours drive from Windhoek via Keetmanshoop on mostly sealed roads; many travellers combine it with Luderitz and Sossusvlei on a southern loop.",
    nearestTown: "Keetmanshoop, 2 hours east; Ai-Ais resort at the canyon floor",
    driveTimes: [
      { from: "Windhoek", time: "about 6.5 hours" },
      { from: "Luderitz", time: "about 5 hours" },
      { from: "Sossusvlei (Sesriem gate)", time: "about 6 hours" },
    ],
    localTips: [
      "The main viewpoint is 10 km from the Hobas gate — arrive 45 minutes before sunrise.",
      "The 5-day canyon hike needs a permit, medical certificate and booking via the park.",
      "Carry water even for rim walks; there is none on the trail.",
      "Ai-Ais hot springs make a good end (or start) to the canyon leg.",
      "Zebra and klipspringer appear on the rim at dusk — bring binoculars.",
    ],
    heroImage: "/images/destinations/fish-river.jpg",
    latitude: -27.5,
    longitude: 17.6,
    featured: false,
  },
  {
    slug: "spitzkoppe",
    name: "Spitzkoppe",
    region: "Erongo, the interior",
    tagline: "Granite islands under the Milky Way",
    intro:
      "The Spitzkoppe massif rises almost 700 metres out of the flat Erongo plains — bald granite domes the locals call the Matterhorn of Namibia. By day, guided walks thread through boulder fields to Bushman rock paintings and natural arches; by night the sky does things that make city people go quiet. Community-run campsites at the base keep the crowds small, and stargazing trips here, far from any light pollution, are among the best on the planet.",
    bestSeason: "April to November for stargazing; December to March can bring storms",
    howToGetThere:
      "About 1.5 hours on gravel from Swakopmund and 3.5 hours from Windhoek via Usakos. A 2x4 with care or a 4x4 in the rainy season.",
    nearestTown: "Usakos, 50 km south",
    driveTimes: [
      { from: "Swakopmund", time: "about 1.5 hours on gravel" },
      { from: "Windhoek", time: "about 3.5 hours" },
      { from: "Henties Bay", time: "about 1.5 hours" },
    ],
    localTips: [
      "Stay overnight — the stars after midnight are the whole point.",
      "The rock arch is a 20 minute walk from the main camp; go for golden hour.",
      "Book the community campsites ahead; there are only a few with shade roofs.",
      "Guided rock-art walks support the local community — ask at the office.",
      "There is no fuel or shop at the massif; stock up in Usakos.",
    ],
    heroImage: "/images/destinations/spitzkoppe.jpg",
    latitude: -21.8333,
    longitude: 15.1667,
    featured: false,
  },
];

export type SeedOperator = {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  baseCity: string;
  whatsapp: string;
  yearsRunning: number;
};

export const SEED_OPERATORS: SeedOperator[] = [
  {
    slug: "coastal-dunes-co",
    name: "Coastal Dunes Co. (demo)",
    tagline: "Dune sports and scenic flights from Swakopmund",
    about:
      "A demo operator standing in for the coast's adventure outfitters: quad bikes, sandboards and light aircraft, run by a small crew of desert guides.",
    baseCity: "Swakopmund",
    whatsapp: "264811234501",
    yearsRunning: 9,
  },
  {
    slug: "lagoon-cruises-namibia",
    name: "Lagoon Cruises Namibia (demo)",
    tagline: "Catamaran and kayak trips on the Walvis Bay lagoon",
    about:
      "A demo operator for the lagoon fleet: dolphin catamarans with fresh oysters on board, and dawn kayak paddles among the seals of Pelican Point.",
    baseCity: "Walvis Bay",
    whatsapp: "264811234502",
    yearsRunning: 12,
  },
  {
    slug: "namib-desert-guides",
    name: "Namib Desert Guides (demo)",
    tagline: "Sossusvlei dunes, Deadvlei and balloon safaris",
    about:
      "A demo operator for the Sesriem guides: dune walks at first light, Deadvlei shuttles, and sunrise balloon flights over the oldest desert on earth.",
    baseCity: "Sesriem",
    whatsapp: "264811234503",
    yearsRunning: 7,
  },
  {
    slug: "savanna-and-salt-guides",
    name: "Savanna & Salt Guides (demo)",
    tagline: "Etosha safaris and Damaraland tracking",
    about:
      "A demo operator for the north: waterhole safaris in Etosha and desert-elephant tracking in Damaraland with guides who grew up in these regions.",
    baseCity: "Outjo",
    whatsapp: "264811234504",
    yearsRunning: 11,
  },
  {
    slug: "heritage-trails-namibia",
    name: "Heritage Trails Namibia (demo)",
    tagline: "Rock art, ghost towns and starfields",
    about:
      "A demo operator for culture and sky: Twyfelfontein rock-art walks with local trackers, Kolmanskop photography tours and stargazing camps at Spitzkoppe.",
    baseCity: "Windhoek",
    whatsapp: "264811234505",
    yearsRunning: 6,
  },
];
