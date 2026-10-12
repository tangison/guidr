import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The rules for using getguidr.com: bookings, payments, cancellations and responsibilities.",
  alternates: { canonical: "/terms" },
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
            "Guidr is an online marketplace that connects travellers with independent tour operators in Namibia. We list experiences, carry booking requests and confirmations between the parties, record the money that belongs to each side, and keep an audit trail of what was agreed. We are not a party to the contract for the tour itself: that contract is between you and the operator, and the operator carries responsibility for how the experience is run.",
            "Guidr is built and operated by Tangison Studio in Namibia. Prices on the site are quoted in Namibian dollars (N$) and include the operator's price for the experience. Where a card fee or other processing cost applies, it is shown before you pay.",
          ],
        },
        {
          heading: "Booking requests",
          body: [
            "A booking request is an offer to the operator, not a confirmed booking. It becomes binding only when the operator accepts it and the payment side is settled. Requests expire after 24 hours without an operator response, and you are free to request the same experience elsewhere in the meantime.",
            "Keep your contact details accurate. Confirmations, vouchers and schedule changes go to the email address and WhatsApp number you give us. If those details are wrong, the consequences of a missed message are yours.",
          ],
        },
        {
          heading: "Payments and money",
          body: [
            "Guidr is built on a marketplace payment model. When the payment system is live, you pay Guidr for a confirmed booking and we hold the operator's share until the trip has taken place. Guidr keeps a commission on completed bookings and settles the operator's share on an agreed schedule, weekly or fortnightly, subject to the trip running and any refund conditions being met.",
            "Every booking records the gross amount, our commission, any processing fees, any refunds, and the operator's balance. That ledger is the reference for what each party is owed, and it is what we use to settle disputes about money. Until card payments go live on the site, payments are arranged directly between you and the operator, and Guidr's role is limited to carrying the request and the record.",
          ],
        },
        {
          heading: "Cancellations and refunds",
          body: [
            "The cancellation windows that apply to each experience are shown on its listing. In general: if you cancel within the free window you are refunded in full; outside it, the operator may retain a part of the price as set out on the listing. If an operator cancels on their side, you are refunded in full, whatever the window. If a card payment is disputed, the card scheme's rules decide the outcome and both sides are asked for evidence.",
            "The full rules live in our cancellation and refund policy, which forms part of these terms.",
          ],
        },
        {
          heading: "Responsibilities",
          body: [
            "Operators are responsible for the safety, legality, insurance and quality of the experiences they list, for holding the permits their activities require, and for describing their trips honestly. Travellers are responsible for their own fitness for an activity, for arriving at the meeting point on time, and for reading the listing, its policies and its difficulty notes before booking.",
            "Guidr curates who we list and removes operators who misrepresent their experiences. We do not operate the tours, drive the vehicles or guide the walks, and we do not accept liability for what happens on them.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We update these terms as the service grows, especially the payment sections as card payments go live. The date at the top shows the current version. Material changes are announced on the site before they take effect.",
          ],
        },
      ]}
    />
  );
}
