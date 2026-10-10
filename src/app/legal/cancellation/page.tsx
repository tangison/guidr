import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Cancellation and refunds",
  description: "Cancellation and refund policy for Guidr bookings, placeholder pending legal review.",
};

export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation and refunds"
      updated="October 2026"
      sections={[
        {
          heading: "Who you cancel with",
          body: [
            "Because the traveller's contract is with the operator, cancellation and refunds are handled by the operator under the policy shown on the listing. Guidr enforces the messaging and the timing, and keeps the record.",
          ],
        },
        {
          heading: "The three presets",
          body: [
            "Flexible: free cancellation up to 24 hours before the trip. Moderate: free cancellation up to 48 hours before. Strict: free cancellation up to 7 days before. Operators choose one preset per listing; it is always shown before you request.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Refunds are paid by the operator through the same channel you paid them: bank transfer or their payment link. If a refund is delayed or disputed, contact support with your booking reference; the booking thread is the shared source of truth.",
          ],
        },
        {
          heading: "Operator-side cancellations",
          body: [
            "If an operator cancels, you are offered the next available date with the same operator or an alternative, and any payment you made is refunded in full by the operator.",
          ],
        },
      ]}
    />
  );
}
