import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Operator agreement",
  description: "The agreement between Guidr and its tour operators — placeholder pending legal review.",
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
            "Operators list experiences on Guidr, receive booking requests, and run the trips. Operators keep their own prices, policies and payment methods. Guidr provides the marketplace, the request flow, the records and the traveller audience.",
          ],
        },
        {
          heading: "Fees",
          body: [
            "A monthly listing fee per published experience plus a commission on completed bookings. Commission accrues only when a booking reaches COMPLETED — never on requests, declines, cancellations or no-shows. Invoices are issued on the 1st and 16th of each month.",
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
            "Either side may pause or end the arrangement at the end of any month. Non-payment of invoices after reminders may pause listings. Serious safety or conduct reports remove listings immediately pending review.",
          ],
        },
      ]}
    />
  );
}
