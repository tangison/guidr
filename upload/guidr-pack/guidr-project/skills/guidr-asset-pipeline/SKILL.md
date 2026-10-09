---
name: guidr-asset-pipeline
description: Prepare images for the Guidr tour marketplace: split AI-generated contact sheets into single photos, cut objects (vehicles, animals, props) out of white backgrounds into transparent WebP, crop to standard ratios, export AVIF/WebP at several widths, write alt text, and register assets. Also writes image-generation prompts (grids, cut-out sheets, portraits, heroes) with positive and negative prompts. Use whenever new images arrive, when an image looks soft, halo-edged or off-brand, or when asked for prompts or animation sprites.
---

# Guidr Asset Pipeline

Reference: `../../docs/08-MOTION-AND-ASSETS.md` (inventory, budgets, motion catalogue). Visual rules: `../guidr-design-taste/SKILL.md`.

## Scripts (Python 3 with Pillow, NumPy, SciPy; AVIF needs a recent Pillow)
| Script | Purpose |
|---|---|
| `scripts/split_grid.py` | Split a 3x2 photo contact sheet into six JPEGs (finds white gutters, falls back to equal tiles) |
| `scripts/split_cutouts.py` | Find each object on a white-background sheet, make soft alpha, remove white fringe, save PNG master and WebP |
| `scripts/make_variants.py` | AVIF and WebP at 480, 960, 1600 px, blur preview, dominant colour, `manifest.json`; cut-outs as WebP with a 150 KB check |

Typical run:
```
python scripts/split_grid.py sheet-a.jpg photos/ --names swakopmund-quad-01,swakopmund-sandboard-01,walvis-catamaran-01,walvis-kayak-01,swakopmund-livingdesert-01,swakopmund-flight-01
python scripts/split_cutouts.py vehicles.jpg cutouts/ --names land-cruiser,quad-bike,hot-air-balloon,catamaran,aircraft,wheel
python scripts/make_variants.py photos/ export/
```
In testing, the scripts separated all 18 objects from the three cut-out sheets with clean edges, including the catamaran rigging and the white aircraft, and produced WebP files of 14 to 72 KB each. Always re-check results visually.

## Procedure
1. **Receive** sheets; copy originals to `assets/source/` untouched.
2. **Identify** each sheet (photo grid or cut-out sheet) and its panel or object order; record names from the plan in `08-MOTION-AND-ASSETS.md`.
3. **Split**, then **review** every output at 100 percent. Cut-outs: view on a dark background and on terracotta (`#C4552D`) to spot halos and missing thin parts.
4. **Fix**: lower `--white` (for example 225) if edges are eaten; raise it if white remains; increase `--close` to keep thin parts attached; regenerate the image if the object is white on white.
5. **Crop** photos to ratios 4:3, 16:10, 4:5, 1:1 around the focal point; record `focal_point`.
6. **Export** variants; check budgets (hero under 180 KB, card under 60 KB at 480 px, cut-out under 150 KB).
7. **Alt text**: one plain sentence naming the scene and activity. **Credit**: "AI-generated, demo" until real photography replaces it.
8. **Register** in `assets.json` (`id`, `file`, `alt`, `credit`, `focal_point`, `kind`, `is_demo`). Fail the build if alt text is missing.

## Quality gates
- Resolution: full-width hero needs at least 2400 px; panels from grids (about 460 px) are for cards only.
- No visible text, logos, brand badges or watermarks.
- Faces are AI-generated: mark portraits as demo; never imply real people.
- Faces and horizons not cropped through.
- Colour grade consistent with the brand (warm, terracotta and sand).
- Cut-outs have no ground shadow baked in; add shadows in code.

## Prompting rules for image generators
Always give: exact layout, subject list per panel, camera and light, palette, a negative prompt, and size.
- **Photo grid:** "One single flat image: a seamless contact sheet of six full-frame photographs in exactly two rows of three, equal panels edge to edge, thin pure white gutters, no outer border, no frames, no wooden background, no captions."
- **Cut-out sheet:** "Six separate isolated objects on a perfectly flat pure white (#FFFFFF) background, in three columns and two rows, 12 percent empty margin around each, nothing touching or cropped, no ground, no shadows, no reflections. Light-coloured objects get grey shading and darker trim so edges stay visible."
- **Portraits:** "Six portrait photographs in a 2x3 sheet, chest-up, Namibian tour guides of mixed ages and genders, khaki or earth-tone shirts, natural smiles, blurred outdoor backgrounds, 85 mm f/2, visible skin texture."
- **Heroes:** one image per prompt, 2400 px wide, no people or very small figures, open sky for headline.

Negative prompt base (extend per type): `frames, picture frames, borders, wooden table, drop shadows, captions, text, letters, numbers, watermark, logo, signature, uneven or merged panels, duplicate panels, blurry, low resolution, jpeg artifacts, oversaturated, HDR halo, plastic skin, cartoon, illustration, 3D render, distorted faces, extra fingers, deformed hands, modern buildings, power lines, litter, people looking at the camera`.

## Still needed (as of this pack)
Guide portraits (sheet E); two to three hero images; optional Sandwich Harbour, Cape Cross, Mondesa and Windhoek images. Re-roll the inland campfire panel (costume-like clothing).

## Animation sprites
Use cut-outs only in marketing scenes (see motion catalogue M1 to M16). Export at 2x the displayed size; keep each under 150 KB; provide a static fallback; maximum three sprites in view at once.
