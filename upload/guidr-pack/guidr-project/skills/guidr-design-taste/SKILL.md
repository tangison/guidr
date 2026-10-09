---
name: guidr-design-taste
description: Apply and enforce the Guidr design taste when designing, building, reviewing or critiquing any interface, page, component, graphic, flyer, deck, email or print piece for Guidr (premium, warm, editorial Namibian travel marketplace in terracotta, bone, charcoal and mustard with Poppins and the footprint motif). Use whenever visual quality, layout, spacing, typography, imagery, motion or "does this look right" matters, including requests to polish, make it look premium, critique a design, choose colours, or review a screenshot.
---

# Guidr Design Taste

Guidr should feel like a well-edited travel magazine that takes bookings: calm, warm, confident, uncluttered. The full system is in `../../docs/07-DESIGN-SYSTEM.md`. This skill tells you how to apply it and how to critique work.

## The look in one paragraph
White pages with bone bands. Charcoal text. One terracotta accent. Mustard only for stars and footprint trails. Poppins Bold headlines with generous space. Large, honest, rounded photography of travellers seen from behind. Hairline borders instead of shadows. Thin geometric wordmark with a footprint icon. Quiet motion that explains.

## Process for designing
1. **Purpose**: write one sentence: what should the visitor do on this screen?
2. **Focal point**: pick the single thing the eye should see first (image, headline or search).
3. **Content first**: list what must be on the screen; cut anything not needed.
4. **Mobile first**: lay it out at 390 px; then enlarge.
5. **Hierarchy**: assign type styles from the scale; no more than three sizes in a component.
6. **Colour**: start monochrome (ink on white); add terracotta to the one primary action; add bone bands for rhythm.
7. **Imagery**: choose images that tell the story; crop to the standard ratios; add a scrim before placing text on photos.
8. **Spacing**: use the scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Double the space you think you need, then judge.
9. **States**: hover, focus, pressed, disabled, loading, empty, error.
10. **Motion**: add only if it explains something; set reduced-motion behaviour.
11. **Critique** using the checklist below before presenting.

## Critique protocol (when asked to review)
Produce, in this order:
1. **First impression** (one sentence: what the eye does).
2. **What works** (2 or 3 specifics).
3. **Issues**, each tagged **Must fix / Should fix / Nice to have**, with the principle broken and a concrete fix (values, not adjectives).
4. **Checklist result** (use `references/taste-checklist.md`).
5. **Revised direction** (a short description or a code/CSS diff).
Be specific: "H2 is 28 px but the body is 17 px, so the jump is small; use 38/44 and 16/26" beats "make the headline bigger".

## Non-negotiables
- One loud accent per view. No rainbow palettes, no gradient blobs, no glassmorphism.
- Text over photos always has a scrim and meets contrast.
- Rounded images (16 or 24 px), consistent radii.
- Icons from one family, 1.5 px stroke.
- Copy is plain, warm and specific; no exclamation marks; buttons are verbs.
- Accessibility: contrast, focus, target size, reduced motion.
- The footprint motif is used with meaning (dividers, loaders, routes), never as wallpaper.
- Print pieces use pure white paper, pure white backgrounds, 3 mm bleed.

## Photography direction
Real-feeling travellers from behind or in profile; guides at work; scale in the landscape; one warm accent in clothing; negative space above for a headline; no visible logos, no staged thumbs-up, no crowds. When prompting an image generator, include style, light, composition, a negative prompt (frames, text, watermarks, distorted faces), and specify exact layout (for example "six panels in two rows of three, no borders").

## Brand assets and rules
- Logo: thin geometric GUIDR wordmark, orange I (turns mustard on terracotta), footprint icon to the right. Clear space equals the height of the I. Minimum width 30 mm in print, 120 px on screen.
- Palette and type: see the tokens in the design system. Terracotta on white is for large text and UI, not small body text (use terracotta-700).
- Credit lines: brand documents say "Designed by Tangison Studio"; the site footer says "Built by Tangison Studio".

## Common mistakes to catch
Default-looking selects and checkboxes; five font sizes in one card; shadows on everything; centred paragraphs; too many chips; carousels that auto-advance; fake urgency; low-contrast grey captions; images cropped through faces or horizons; icon sets mixed; spacing that is almost-but-not-quite consistent; hero text on a busy photo without a scrim.

## References
- `references/taste-checklist.md` for the pre-ship checklist.
- `references/critique-template.md` for the review format.
