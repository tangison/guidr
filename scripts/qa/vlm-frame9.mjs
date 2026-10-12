import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
const b64 = fs.readFileSync("/home/z/my-project/scripts/qa/scrollcraft/frame9.png").toString("base64");
const zai = await ZAI.create();
const res = await zai.chat.completions.createVision({
  messages: [{ role: "user", content: [
    { type: "text", text: "Describe this desktop web frame factually: what occupies the left half, what occupies the right half, where is text, where is empty space. Is any half effectively empty? Under 80 words." },
    { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
  ]}],
  thinking: { type: "disabled" },
});
console.log(res.choices[0]?.message?.content?.trim());
