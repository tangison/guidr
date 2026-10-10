import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for getguidr.com, placeholder pending legal review.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="October 2026"
      sections={[
        {
          heading: "What Guidr is",
          body: [
            "Guidr is a marketplace that connects travellers with independent tour operators in Namibia. We list experiences, carry booking requests between the parties, and keep a record of what happened. We are not a party to the contract between you and the operator.",
            "In version 1, Guidr does not collect, hold or process traveller payments. Money moves directly between traveller and operator.",
          ],
        },
        {
          heading: "Accounts",
          body: [
            "You may request a booking as a guest with your name and contact details, or create an account. You are responsible for the accuracy of the contact details you give us; confirmations and vouchers go where you point them.",
          ],
        },
        {
          heading: "Booking requests",
          body: [
            "A booking request is an offer to the operator, not a confirmed booking. It becomes binding only when the operator accepts and the traveller completes payment directly with the operator. Requests expire after 24 hours without an operator response.",
          ],
        },
        {
          heading: "Responsibilities",
          body: [
            "Operators are responsible for the safety, legality and quality of the experiences they list. Travellers are responsible for their own fitness for an activity, for arriving at the meeting point on time, and for reading the listing's policies.",
          ],
        },
      ]}
    />
  );
}
