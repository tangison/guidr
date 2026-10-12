/* VLM blind-critic pass on the scroll-craft button + scroll verification shots. */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const DIR = "/home/z/my-project/scripts/qa/scrollcraft";
const SHOTS = [
  "hover-hero-primary.png",
  "hover-hero-outline.png",
  "hover-manifesto-white.png",
  "hover-ink-wa.png",
  "press-primary.png",
  "sheet-home-desktop.jpg",
  "sheet-home-mobile.jpg",
  "detail-mobile-top.png",
  "detail-mobile-bottom.png",
];

const PROMPT = `You are a harsh blind design critic reviewing a premium Namibian travel marketplace (brand: ink near-black, bone off-white, terracotta accent, mustard secondary, Poppins type).
This pass is about the BUTTON SYSTEM and SCROLL MOTION only. The intended design: every button is fully rounded (a pill / stadium shape, never a small-radius rectangle), carries a background effect on hover (a solid fill sweeping in from the left, e.g. terracotta filling to ink, or white filling to terracotta), generous horizontal padding so pill labels never look cramped, a soft lift with offset shadow, and a slightly scaled press state. Forms use pill inputs. Cards keep a large radius. The scroll frames should show varied compositions, readable text, no ghost or half-faded content, no dead empty stretches.
Judge ONLY what you can see. Call out: any button that is not fully rounded, hover fills that look like flat color swaps with no effect, cramped pill padding, inconsistent radius language between buttons and cards, text overflow, clipped labels, half-faded content in the scroll contact sheet, or any layout defect.
Answer in under 140 words. Start with VERDICT: SHIP or VERDICT: FIX, then bullets.`;

async function main() {
  const zai = await ZAI.create();
  for (const name of SHOTS) {
    const path = `${DIR}/${name}`;
    if (!fs.existsSync(path)) { console.log(`\n### ${name}\nSKIP (missing)`); continue; }
    const b64 = fs.readFileSync(path).toString("base64");
    const mime = name.endsWith(".jpg") ? "image/jpeg" : "image/png";
    let done = false;
    for (let attempt = 1; attempt <= 4 && !done; attempt++) {
      try {
        const res = await zai.chat.completions.createVision({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: PROMPT },
                { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
              ],
            },
          ],
          thinking: { type: "disabled" },
        });
        console.log(`\n### ${name}\n${res.choices[0]?.message?.content?.trim()}`);
        done = true;
      } catch (e) {
        const msg = String(e);
        if (attempt < 4 && (msg.includes("429") || msg.includes("Too many"))) {
          await new Promise(r => setTimeout(r, 8000 * attempt));
        } else {
          console.log(`\n### ${name}\nVLM ERROR: ${msg.slice(0, 200)}`);
          done = true;
        }
      }
    }
  }
}
main();
