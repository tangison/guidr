"""Insert canonical alternates + fix over-length/placeholder descriptions."""
import re
from pathlib import Path

ROOT = Path("/home/z/my-project/src/app")

CANONICALS = {
    "experiences/page.tsx": "/experiences",
    "destinations/page.tsx": "/destinations",
    "planner/page.tsx": "/planner",
    "for-operators/page.tsx": "/for-operators",
    "how-it-works/page.tsx": "/how-it-works",
    "about/page.tsx": "/about",
    "brand/page.tsx": "/brand",
    "legal/page.tsx": "/legal",
    "legal/cancellation/page.tsx": "/legal/cancellation",
    "legal/operator-agreement/page.tsx": "/legal/operator-agreement",
    "privacy-policy/page.tsx": "/privacy-policy",
    "terms/page.tsx": "/terms",
}

NEW_DESCRIPTIONS = {
    "for-operators/page.tsx":
        "List your tours on Guidr: your prices, requests to WhatsApp, commission on completed bookings only, weekly settlement.",
    "how-it-works/page.tsx":
        "Find a guided experience, request it, the operator confirms on WhatsApp, then pay and travel. Every step, plainly.",
    "brand/page.tsx":
        "The Guidr brand system: lockup and footprint mark, ink, bone, terracotta and mustard palette, Poppins type, the rules.",
    "legal/cancellation/page.tsx":
        "Cancellation and refund rules for Guidr bookings: traveller cancellations, operator cancellations, and how refunds move.",
    "legal/operator-agreement/page.tsx":
        "The working agreement between Guidr and its tour operators: listings, commission, settlement and conduct.",
    "privacy-policy/page.tsx":
        "How Guidr collects, uses and protects traveller and operator information on getguidr.com.",
    "terms/page.tsx":
        "The rules for using getguidr.com: bookings, payments, cancellations and responsibilities.",
}

for rel, canon in CANONICALS.items():
    p = ROOT / rel
    src = p.read_text()
    if "alternates" in src:
        print(f"SKIP (has alternates): {rel}")
        continue
    # insert alternates right after the metadata opening
    marker = "export const metadata: Metadata = {"
    if marker not in src:
        print(f"WARN no metadata marker: {rel}")
        continue
    src = src.replace(
        marker,
        marker + f'\n  alternates: {{ canonical: "{canon}" }},',
        1,
    )
    # description replacement
    if rel in NEW_DESCRIPTIONS:
        src = re.sub(
            r'(description:\s*\n?\s*")[^"]*(")',
            lambda m: m.group(1) + NEW_DESCRIPTIONS[rel] + m.group(2),
            src,
            count=1,
        )
    p.write_text(src)
    print(f"OK: {rel} canonical={canon}" + (" +desc" if rel in NEW_DESCRIPTIONS else ""))
