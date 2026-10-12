import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Guidr collects, uses and protects traveller and operator information on getguidr.com.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="October 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "The minimum we need to run a marketplace: your name, email address and WhatsApp number when you request a booking, the content of booking threads, and the emails of people who join the waitlist. The AI trip planner processes the questions you type into it and answers from the published catalogue only; planner conversations are not used to build profiles of you.",
            "We do not sell personal data, and we do not run advertising trackers. Anonymous usage analytics are collected only after consent where consent is required, and they contain no names, contact details or booking content.",
          ],
        },
        {
          heading: "What we share",
          body: [
            "When you request a booking, your name, contact details, party size and notes go to the operator you chose, and to nobody else. Once card payments are live, payment details are handled by the payment provider under their own privacy terms: Guidr stores the amount, the fee and the payout record, never your card number. Bank details shown after confirmation belong to the operator and are visible only to that booking's traveller.",
            "Messages you send on WhatsApp are subject to WhatsApp's own terms and privacy policy. We use WhatsApp because that is where Namibian operators already work, and we keep what you send us there to the thread it belongs to.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request an export of your data, the correction of anything wrong, or the deletion of your account at any time via privacy@getguidr.com. Visitors from the EU are treated under GDPR-like rules regardless of where they connect from, and Namibian visitors are treated with the same standard of care.",
          ],
        },
        {
          heading: "Security",
          body: [
            "Booking and ledger records are stored in a managed database with access limited to the people who operate Guidr. Connections to the site are encrypted in transit, secrets used to run the service are kept on the server side, and card data never touches our servers at all. If a breach ever affects your data, we will tell you directly and promptly.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Booking records are kept for accounting and dispute resolution, because the ledger is the reference for what each party was owed. Personal data attached to cancelled or expired requests is deleted on a rolling schedule. Waitlist emails are kept until you ask us to drop them.",
          ],
        },
      ]}
    />
  );
}
