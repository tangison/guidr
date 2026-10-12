/* Second blind-critic round: element-exact button shots (rest vs hover pairs)
   and full-resolution scroll frames. No thumbnail-scale noise this time. */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import { execSync } from "child_process";

const DIR = "/home/z/my-project/scripts/qa/scrollcraft";

// Full-res key frames from the walk (already on disk)
const FRAMES = ["home-d-01.png", "home-d-05.png", "home-d-09.png", "home-d-13.png",
                "home-m-02.png", "home-m-08.png", "home-m-14.png"];

const BTN_PROMPT = `Two renders of the same primary CTA button from a premium Namibian travel site (brand: terracotta accent on warm off-white, ink near-black). Image 1 is the resting state; image 2 is the hover state after the background effect settles.
The intended behaviour: the button is a fully rounded pill; on hover a solid ink fill sweeps in from the left behind the label, the button lifts 1px with a soft offset shadow.
Answer strictly: (1) Is the resting button a true pill (stadium) shape? (2) Does the hover state show a clearly different background fill colour than the resting state? (3) Is the label readable and comfortably padded in both? (4) Any visual defect (halo, seam, clipped glyph)?
Under 90 words. Start VERDICT: SHIP or VERDICT: FIX.`;

const FRAME_PROMPT = `A full-resolution viewport frame from a premium Namibian travel marketplace homepage scroll walk (brand: ink/bone/terracotta/mustard, Poppins, footprint motif).
Check ONLY: (1) any half-faded or ghost content stuck at partial opacity, (2) any text overlap or clipped label, (3) any button that is not a fully rounded pill, (4) any broken layout or empty dead stretch that looks unintentional, (5) does the composition read premium and intentional.
Under 90 words. Start VERDICT: SHIP or VERDICT: FIX, then bullets if issues.`;

async function ask(zai, prompt, files) {
  const content = [{ type: "text", text: prompt }];
  for (const f of files) {
    const b64 = fs.readFileSync(`${DIR}/${f}`).toString("base64");
    const mime = f.endsWith(".jpg") ? "image/jpeg" : "image/png";
    content.push({ type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } });
  }
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await zai.chat.completions.createVision({
        messages: [{ role: "user", content }],
        thinking: { type: "disabled" },
      });
      return res.choices[0]?.message?.content?.trim();
    } catch (e) {
      const msg = String(e);
      if (attempt < 4 && (msg.includes("429") || msg.includes("Too many"))) {
        await new Promise(r => setTimeout(r, 9000 * attempt));
      } else return `VLM ERROR: ${msg.slice(0, 160)}`;
    }
  }
}

async function main() {
  const zai = await ZAI.create();

  console.log("\n### primary rest vs hover");
  console.log(await ask(zai, BTN_PROMPT, ["el-primary-rest.png", "el-primary-hover.png"]));

  for (const v of ["outline", "white", "ink"]) {
    console.log(`\n### ${v} hover state`);
    console.log(await ask(zai,
      `One render of a ${v === "white" ? "white-on-dark" : v} CTA pill button in its hover state from the same site. The design: fully rounded pill, a solid fill has swept in behind the label, label readable, soft shadow. Check: true pill shape, readable label, comfortable padding, no halo/seam/clipping. Under 60 words. Start VERDICT: SHIP or VERDICT: FIX.`,
      [`el-${v}-hover.png`]));
  }

  for (const f of FRAMES) {
    console.log(`\n### frame ${f}`);
    console.log(await ask(zai, FRAME_PROMPT, [f]));
  }
}
main();
