"""Merge cover + body into the final audit report PDF (normalize to A4)."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

COVER = "/home/z/my-project/scripts/audit/guidr-audit-cover.pdf"
BODY = "/home/z/my-project/scripts/audit/guidr-audit-body.pdf"
OUT = "/home/z/my-project/download/Guidr-Website-Audit-Report.pdf"


def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 0.05 or abs(h - A4_H) > 0.05:
        page.scale_to(A4_W, A4_H)
    return page


writer = PdfWriter()
cover_page = PdfReader(COVER).pages[0]
writer.add_page(normalize_page_to_a4(cover_page))
for page in PdfReader(BODY).pages:
    writer.add_page(normalize_page_to_a4(page))
writer.add_metadata({
    "/Title": "Guidr Website Audit Report",
    "/Author": "Z.ai",
    "/Creator": "Z.ai",
    "/Subject": "Guidr website quality audit: 42 skills, 15 findings fixed, verification evidence",
})
with open(OUT, "wb") as f:
    writer.write(f)
print("merged:", OUT, "pages:", len(writer.pages))
