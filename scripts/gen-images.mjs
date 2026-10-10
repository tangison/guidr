/**
 * Guidr brand imagery generator.
 * Replaces ALL fetched stock photography with one consistent, art-directed
 * set: warm Namibian editorial travel photography graded to the brand
 * palette (terracotta sand, bone sky, ink shadow, mustard hour light).
 *
 * Runs with limited concurrency + retries, logs progress to a status file.
 * Usage: bun scripts/gen-images.mjs
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "/home/z/my-project/scripts/img-gen";
const STATUS = path.join(OUT_DIR, "_status.log");

const GRADE =
  "Editorial travel photograph, Namibia. Warm terracotta and ochre sand tones, bone-white sky, deep ink-brown shadows, golden mustard hour light, fine 35mm film grain, muted earthy palette, cinematic wide composition, high quality, detailed. No text, no watermark, no signage, no visible faces.";

const JOBS = [
  // hero
  { name: "hero-dunes", size: "1344x768", subject: "A vast sea of apricot-red sand dunes at sunrise in the oldest desert on earth, long morning shadows raking across the dune ridges, one sharp sinuous ridge line dominating the frame" },
  // destinations
  { name: "swakopmund", size: "1344x768", subject: "A coastal desert town where pale dunes meet the cold Atlantic ocean, palm-lined waterfront promenade, morning fog lifting off the water" },
  { name: "walvis-bay", size: "1344x768", subject: "A shallow lagoon with thousands of pink flamingos wading on one leg, pink salt pans glowing at golden hour, perfectly calm water reflections" },
  { name: "sossusvlei", size: "1344x768", subject: "A giant apricot dune towering over a white clay pan, deep shadow on one face of the dune, minimal desert composition" },
  { name: "etosha", size: "1344x768", subject: "A dusty savanna waterhole at dusk with a herd of dark elephants drinking, warm backlight through the dust" },
  { name: "damaraland", size: "1344x768", subject: "Rugged ochre rocky plains and tabletop mountains of Damaraland, a dry sandy riverbed lined with dark camelthorn trees" },
  { name: "fish-river", size: "1344x768", subject: "An immense dramatic canyon at golden hour, layered rock walls descending to a thin silver river ribbon far below" },
  { name: "spitzkoppe", size: "1344x768", subject: "A massive dark granite peak rising from flat pale desert plains at dusk, warm orange and violet sky, balancing boulders" },
  // experiences
  { name: "quad-biking", size: "1344x768", subject: "Quad bikes riding in a single file along the crest of a pale desert dune, a long dust trail backlit by low golden sun" },
  { name: "sandboarding", size: "1344x768", subject: "A sandboarder lying on a board carving down a steep pale dune slope, a spray of golden sand, low side sun" },
  { name: "catamaran", size: "1344x768", subject: "Dark sleek dolphins leaping in a line across calm blue-green Atlantic water, pale desert dunes visible on the far horizon, glassy sea, seen from a boat's bow" },
  { name: "kayaking", size: "1344x768", subject: "Ocean kayaks paddling among curious dark cape fur seals in glassy green water, seen from water level" },
  { name: "living-desert", size: "1344x768", subject: "A tiny desert-adapted gecko standing on rippled pale sand next to a shovel-snouted lizard, macro view, warm side light" },
  { name: "scenic-flight", size: "1344x768", subject: "View past a light aircraft wing over a coastline where tall pale dunes plunge directly into the dark blue ocean, morning light" },
  { name: "balloon", size: "1344x768", subject: "Hot air balloons drifting silently over a sea of red dunes at first light, extremely long shadows across the sand" },
  { name: "dune45", size: "1344x768", subject: "A classic curving dune ridge glowing at sunrise, sharp crest line, tiny distant hikers on the ridge for scale" },
  { name: "deadvlei", size: "1344x768", subject: "Ancient black dead camelthorn trees on a cracked white clay pan, a towering orange dune wall behind, minimal graphic composition" },
  { name: "sesriem", size: "1344x768", subject: "A narrow desert canyon with layered rock walls and a soft sandy floor in warm late afternoon light" },
  { name: "desert-elephant", size: "1344x768", subject: "A desert-adapted elephant walking across golden rocky plains between dark camelthorn trees, warm dust in the air" },
  { name: "fishriver-hike", size: "1344x768", subject: "A small line of hikers descending a rocky trail into a vast canyon at dawn, tiny figures against immense layered walls" },
  { name: "spitzkoppe-night", size: "1344x768", subject: "The milky way arching over a dark granite peak, a faint warm campfire glow at the base, dense star field" },
  { name: "rock-art", size: "1344x768", subject: "Ancient petroglyphs of animals engraved on a warm red sandstone rock face, raking golden light across the carvings" },
  { name: "kolmanskop", size: "1344x768", subject: "A single deep doorway in a plain weathered sandstone wall half buried by smooth rippled orange desert sand, minimal graphic composition, soft warm window light" },
  { name: "desert-walk", size: "1344x768", subject: "A small guided walking group crossing open golden desert sand in single file, very long shadows at low sun" },
];

const log = (line) => {
  const stamp = new Date().toISOString().slice(11, 19);
  fs.appendFileSync(STATUS, `[${stamp}] ${line}\n`);
  console.log(line);
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateOne(zai, job) {
  const outPath = path.join(OUT_DIR, `${job.name}.png`);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 40_000) {
    log(`SKIP ${job.name} (exists)`);
    return { ok: true, skipped: true };
  }
  const prompt = `${job.subject}. ${GRADE}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await zai.images.generations.create({ prompt, size: job.size });
      const b64 = res?.data?.[0]?.base64;
      if (!b64) throw new Error("empty response");
      const buf = Buffer.from(b64, "base64");
      if (buf.length < 40_000) throw new Error(`suspiciously small (${buf.length}B)`);
      fs.writeFileSync(outPath, buf);
      log(`OK   ${job.name} (${(buf.length / 1024).toFixed(0)} KB, attempt ${attempt})`);
      return { ok: true };
    } catch (err) {
      log(`ERR  ${job.name} attempt ${attempt}: ${err.message}`);
      if (attempt < 4) await sleep(1500 * attempt);
    }
  }
  return { ok: false, name: job.name };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(STATUS, `=== Guidr image generation run ${new Date().toISOString()} ===\n`);
  const zai = await ZAI.create();
  log(`${JOBS.length} jobs, concurrency 2`);

  const queue = [...JOBS];
  const failures = [];
  const workers = Array.from({ length: 2 }, async () => {
    while (queue.length) {
      const job = queue.shift();
      const r = await generateOne(zai, job);
      if (!r.ok) failures.push(job.name);
    }
  });
  await Promise.all(workers);

  log(`DONE. failures: ${failures.length ? failures.join(", ") : "none"}`);
  fs.appendFileSync(
    STATUS,
    failures.length ? `__RESULT__: FAIL ${failures.join(",")}\n` : "__RESULT__: SUCCESS\n"
  );
}

main().catch((e) => {
  log(`FATAL ${e.message}`);
  process.exit(1);
});
