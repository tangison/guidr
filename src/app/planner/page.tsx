import type { Metadata } from "next";
import { PlannerChat } from "@/components/site/planner-chat";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { FootprintTrail } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "AI trip planner",
  description:
    "Plan your Namibia trip with the Guidr planner. Itineraries built from real catalogue experiences and honest prices — never invented ones.",
};

export default function PlannerPage() {
  return (
    <div className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-terracotta-700">The Guidr planner</p>
            <h1 className="mt-2 text-[32px] leading-[38px] sm:text-[52px] sm:leading-[58px] font-bold tracking-[-0.02em] text-ink">
              A believable plan, not a brochure.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-700">
              Tell the planner your days, your people and your budget. It
              answers with an itinerary made only of real catalogue
              experiences at their listed prices — so a plan you like is a
              plan you can actually book.
            </p>
            <FootprintTrail className="my-8 h-9" color="var(--sand)" />
            <ul className="space-y-4">
              {[
                {
                  title: "Honest data only",
                  text: "The planner sees the same catalogue you do. If it names a price, it is the operator's listed price.",
                },
                {
                  title: "Cards, not promises",
                  text: "Every recommendation arrives as a card you can open, inspect and request — with the guide's name on it.",
                },
                {
                  title: "WhatsApp when you want a human",
                  text: "Any plan can be handed to us on WhatsApp. A person who knows the coast will read it with you.",
                },
              ].map((f) => (
                <li key={f.title}>
                  <p className="text-[16px] font-semibold text-ink">{f.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-700">
                    {f.text}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                message="Hi Guidr, I'd like help planning my trip in Namibia."
                size="lg"
              />
            </div>
          </div>
          <div>
            <PlannerChat />
          </div>
        </div>
      </div>
    </div>
  );
}
