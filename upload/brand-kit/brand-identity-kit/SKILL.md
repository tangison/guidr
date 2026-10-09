---
name: brand-identity-kit
description: Build a complete, printable brand identity package (logo usage, icon, colour, typography, photography, applications, credits) as A4 portrait or 16:9 PDFs, plus a production-ready print kit (business cards, letterhead, A5 flyer, A3 poster with 3 mm bleed) and social flyers, in Tangison Studio style. Use this whenever the user wants a brand guidelines document, brand book, company profile, presentation deck, pitch or capability deck, print collateral, or says "make it look presentable / production ready / printable", even if they never say "brand identity".
---

# Brand Identity Kit (Tangison Studio workflow)

Turns a logo, a colour palette and a handful of photos into polished, printable documents. Built and proven on the Guidr project. Output is vector PDF made with Python, plus optional HTML slide decks.

## Tech stack (what each tool is for)
- **Python + ReportLab**: draws every PDF page as vector art. Exact millimetre control, real bleed and trim boxes, embedded fonts.
- **Pillow (PIL)**: raster work only: cropping, upscaling, sharpening, grain, dark gradient overlays baked into photos, and the social flyer PNG.
- **Poppins** (Google Fonts, OFL) for headlines and text. Thin geometric wordmarks are drawn as strokes in code, not typed.
- **poppler `pdftoppm`**: renders PDF pages to PNG for visual checks and to place print pieces inside the brand book.
- **Artifact tool, Slides type**: optional live HTML deck (1920x1080 slides, inline styles, uploaded images as assets) when the user wants something clickable/shareable.
- **AI image generators** (outside this environment): photography comes from prompts (see references/photo-prompts.md).

## Workflow
1. **Collect inputs**: logo or logo idea, reference typeface/logo screenshots, palette (else propose 4 colours: dark, light, accent, highlight), photos, domain, studio credit line, date/version. Ask at most one question if the subject is missing; otherwise state assumptions in one line and build.
2. **Set up the working dir** `/home/claude/`: copy `scripts/helpers.py` there, and `assets/*.png` (Tangison logos). Put photo files, the social flyer PNG and print-kit renders in the same folder (templates reference `/home/claude/...`; adjust the constants at the top of a template if you use another folder).
3. **Logo and icon**: draw as vector. Define them in `helpers.py` (`lockup()`, `icon()`); the shipped versions are the Guidr wordmark and footprint. For a new client, replace those two functions and keep the rest.
4. **Photos**: `scripts/prep_photo.py` upscales and overlays them. Low-res AI grids work with a dark overlay and grain, but tell the user to swap in 300 dpi images before final print.
5. **Social flyer (PNG, 4:5)**: photo fills the canvas, terracotta banner with rounded top over the photo (photo extends beneath the banner so corners never show a gap), small white wordmark top-left, bold Poppins headline, domain, mustard footprint trail. Use Pillow.
6. **Print kit** (`templates/print_kit.py`) then **brand book** (`templates/brand_identity_a4_portrait.py`, or `brand_identity_16x9.py`). Print kit first: the brand book embeds renders of print kit pages (`pdftoppm -r 150`, then crop 3 mm bleed).
7. **Check**: `python scripts/preview.py out.pdf sheet.png`, view it, fix overflow or overlaps, then present the PDFs with `present_files`.

## Design rules (keep these; they are why it looks premium)
- One accent colour per logo (the orange I). Palette: charcoal, bone, terracotta, mustard. Toned whites/blacks, never pure #fff/#000 for large fills.
- Generous spacing: 12 mm margins on A4, heading at the top margin, one idea per page, about 70% fill.
- Thin geometric wordmark paired with a heavy geometric sans (Poppins Bold) for headlines.
- Photography: real travellers seen from behind, one warm accent per frame, open sky above for headlines.
- Printable: A4 portrait pages sit on white with panels inside the margin (office printers cannot print edge-to-edge). Print pieces carry 3 mm bleed with TrimBox/BleedBox set.
- Text must not overflow: use `simpleSplit` wrapping and check every page in the preview.

## Required end matter (production ready)
- Credits page: "Designed by Tangison Studio, a division of Tangison Technologies, studio.tangison.com", version, month/year, Tangison logo (`assets/tg_light.png` on dark, `assets/tg_dark.png` on light; both have transparent backgrounds).
- Copyright notice for the client and a note that AI-generated imagery is concept-only. Tell the user the wording needs legal confirmation.
- Footer on every page: "<Brand> brand identity | vX.Y | (c) year" and page number.
- Flag placeholders ([Full name], phone, email) and RGB-vs-CMYK/Pantone in the reply. Never invent statistics.

## Deliverables checklist
Brand identity A4 portrait PDF; brand identity 16:9 PDF (optional); print kit PDF (spec page, card front/back, letterhead, A5 flyer, A3 poster); social flyer PNG; optional HTML slide deck via the Artifact tool.

## Gotchas
- ReportLab draws y-up. Templates use top-based mm helpers (`Y(y)`); do not mix systems.
- A ReportLab arc with rx smaller than half the chord is silently enlarged (the G in the Guidr wordmark relies on this); sample arcs as polylines as `helpers.arc()` does.
- Never put a `#` comment at the end of a line that also contains code you need (a real bug hit while assembling multi-page scripts).
- Transparent PNG logos: use the alpha channel, not luminance, or you get a solid block.
- Keep AI photo grids for reference pages; for print pieces crop single panels.
