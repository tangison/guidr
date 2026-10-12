import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Cancellation and refunds",
  description:
    "Cancellation and refund rules for Guidr bookings: traveller cancellations, operator cancellations, and how refunds move.",
  alternates: { canonical: "/legal/cancellation" },
};

export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation and refunds"
      updated="October 2026"
      sections={[
        {
          heading: "The policy on every listing",
          body: [
            "Every experience carries one of three cancellation presets, chosen by the operator and shown on the listing before you request it. Flexible: free cancellation up to 24 hours before the trip. Moderate: free cancellation up to 48 hours before. Strict: free cancellation up to 7 days before. Whatever the preset says is the contract between you and the operator; Guidr enforces the messaging and the timing, and keeps the record.",
            "Until card payments go live on the site, refunds move through the same channel you paid the operator with, and the operator pays them. Once card payments run through Guidr, refunds are paid by Guidr back to your card, and the operator's settlement for that trip is adjusted at the same time. Either way, the rules below decide who bears what.",
          ],
        },
        {
          heading: "When you cancel",
          body: [
            "Cancel inside the free window and you are refunded in full: the operator's share is simply not paid out for that trip, and Guidr's commission on it is cancelled too. Nobody earns a commission on a trip that did not run.",
            "Cancel outside the free window and the operator may retain the part of the price their preset allows, because they held the date, the guide and the vehicle for you. Any card processing fee already paid on the transaction is not refundable, and that cost sits with the refund, not on top of it: it is deducted from the refunded amount as the card schemes require.",
          ],
        },
        {
          heading: "When the operator cancels",
          body: [
            "If an operator cancels on their side, you are offered the next available date with the same operator or a comparable alternative. If neither works for you, you are refunded in full, whatever the cancellation window said. The cost of an operator-side cancellation sits with the operator: Guidr's commission is cancelled with the booking, and the operator compensates Guidr for any non-refundable processing fee that the cancellation caused, as set out in the operator agreement.",
          ],
        },
        {
          heading: "When a payment is disputed",
          body: [
            "If you dispute a card payment with your bank, the card scheme's rules decide the outcome. Guidr provides the booking thread, the confirmation and the refund record as evidence, and the operator's next settlement is held back by the disputed amount until the case closes. If the dispute resolves in your favour, the money is returned to you and the operator's share for that trip is not paid out; if it resolves against you, the held settlement is released.",
          ],
        },
        {
          heading: "Timing",
          body: [
            "Refunds are issued within 5 working days of being approved. Card refunds then take whatever time your bank takes to show them, typically another 2 to 10 working days. If a refund is late or disputed, contact support with your booking reference: the booking thread and the ledger entry are the shared source of truth, and both sides can see them.",
          ],
        },
      ]}
    />
  );
}
