import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy for getguidr.com — placeholder pending legal review.",
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
            "The minimum we need to run a marketplace: your name and contact details when you request a booking, the content of booking threads, and anonymous usage analytics after consent where consent is required.",
            "We do not sell personal data, and we do not run advertising trackers.",
          ],
        },
        {
          heading: "What we share",
          body: [
            "When you request a booking, your name, contact details, party size and notes go to the operator you chose. Bank details shown after confirmation belong to the operator and are visible only to the booking's traveller.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request an export of your data or the deletion of your account at any time via privacy@getguidr.com. Visitors from the EU are treated under GDPR-like rules regardless of where they connect from.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Booking records are kept for accounting and dispute resolution. Personal data attached to cancelled or expired requests is deleted on a rolling schedule.",
          ],
        },
      ]}
    />
  );
}
