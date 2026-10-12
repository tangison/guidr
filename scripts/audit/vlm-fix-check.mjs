/* VLM visual QA on the audit-fix screenshots (base64, per VLM skill). */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const SHOTS = [
  "audit-for-operators",
  "audit-how-it-works",
  "audit-terms",
  "audit-home",
  "audit-for-operators-mobile",
  "audit-legal-cancellation",
];

const PROMPT = `You are a strict design reviewer for Guidr, a premium Namibian travel marketplace. The brand: ink (near-black), bone (warm off-white), terracotta accent, mustard secondary, Poppins type, footprint motif, editorial layout, one-accent discipline.
Review this screenshot for: (1) visual defects (broken layout, overlap, misalignment, clipped text, wrong currency symbols), (2) brand consistency, (3) whether money/payment sections read as trustworthy and clear.
Money must render as "N$ 2,000" style (N with dollar sign and a space), never a bare "$".
Answer in under 120 words. Start with VERDICT: SHIP or VERDICT: FIX, then bullet the issues if any.`;

async function main() {
  const zai = await ZAI.create();
  for (const name of SHOTS) {
    const b64 = fs.readFileSync(`/home/z/my-project/scripts/qa/${name}.png`).toString("base64");
    try {
      const res = await zai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
            ],
          },
        ],
      });
      console.log(`\n### ${name}\n${res.choices[0]?.message?.content?.trim()}`);
    } catch (e) {
      console.log(`\n### ${name}\nVLM ERROR: ${String(e).slice(0, 200)}`);
    }
  }
}

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
