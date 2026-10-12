import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Operator agreement",
  description:
    "The working agreement between Guidr and its tour operators: listings, commission, settlement and conduct.",
  alternates: { canonical: "/legal/operator-agreement" },
};

export default function OperatorAgreementPage() {
  return (
    <LegalPage
      title="Operator agreement"
      updated="October 2026"
      sections={[
        {
          heading: "The relationship",
          body: [
            "Operators list experiences on Guidr, receive booking requests, and run the trips. Operators keep their own prices, their own cancellation presets and their own conduct standards; Guidr provides the marketplace, the request flow, the money records and the traveller audience. The contract for each tour remains between the operator and the traveller: Guidr is the marketplace that carries it, not a party to it.",
          ],
        },
        {
          heading: "Fees",
          body: [
            "A monthly listing fee per published experience plus a commission on completed bookings. The commission rate is agreed with each operator before launch and recorded on every booking at the moment it is made, so a rate change never rewrites history. Commission accrues only when a booking reaches COMPLETED, never on requests, declines, cancellations or no-shows. Listing fee invoices are issued on the 1st and 16th of each month.",
            "The working rate used for planning is 15%, and it is treated as illustrative until your own agreement is signed: exact figures are set per operator, in writing, before any listing goes live.",
          ],
        },
        {
          heading: "Settlement",
          body: [
            "Once card payments run through Guidr, travellers pay us and we hold your share until the trip has taken place. Your share is settled on an agreed schedule, weekly or fortnightly, subject to the trip running and any refund conditions being met. Every booking records the gross amount, the commission, the processing fee, any refund, and your resulting balance, and you can see that ledger per booking. Until card payments go live, money moves directly between traveller and operator, Guidr takes no commission on those trips, and the listing fee is the only charge.",
            "Operator-side cancellations and lost chargebacks are deducted from your next settlement, together with any non-refundable processing fee the cancellation caused, as set out in the cancellation policy. A disputed amount is held back, not assumed against you, until the card scheme decides.",
          ],
        },
        {
          heading: "Quality obligations",
          body: [
            "At least five photos, a meeting point, a cancellation preset and a price are required before a listing goes live. Operators must respond to requests within 24 hours; expired requests are withdrawn from the traveller. Listings re-enter review when price or policy changes.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "Either side may pause or end the arrangement at the end of any month. Non-payment of invoices after reminders may pause listings. Serious safety or conduct reports remove listings immediately pending review. Ending the arrangement does not unwind completed trips, open settlements, or the ledger entries attached to them.",
          ],
        },
      ]}
    />
  );
}
