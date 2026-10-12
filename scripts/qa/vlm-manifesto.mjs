import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
const DIR = "/home/z/my-project/scripts/qa/scrollcraft";
const zai = await ZAI.create();
const PROMPT = `Desktop viewport frames from the scroll-pinned editorial section of a premium Namibian travel site (ink background, bone text, terracotta accent). The intended design: the left statement column stays pinned while tall photographs scroll past on the right; the statement slowly drifts upward during the pin. Check: (1) is the left statement text visible and readable, (2) does the right side show photography, (3) any half-faded or stuck content, (4) does the composition look intentional and premium rather than broken or empty. Under 80 words. Start VERDICT: SHIP or VERDICT: FIX.`;
for (const f of ["manifesto-mid.png", "manifesto-late.png", "home-d-09.png", "home-d-10.png"]) {
  const b64 = fs.readFileSync(`${DIR}/${f}`).toString("base64");
  try {
    const res = await zai.chat.completions.createVision({
      messages: [{ role: "user", content: [
        { type: "text", text: PROMPT },
        { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
      ]}],
      thinking: { type: "disabled" },
    });
    console.log(`\n### ${f}\n${res.choices[0]?.message?.content?.trim()}`);
  } catch (e) {
    console.log(`\n### ${f}\nVLM ERROR: ${String(e).slice(0, 140)}`);
  }
}
