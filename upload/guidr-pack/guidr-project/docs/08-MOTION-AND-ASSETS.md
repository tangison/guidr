# 08. Motion and Assets

## 1. Asset inventory (as of October 2026)

### Photo sheets (6 panels each, about 460 px per panel)
| Sheet | Panels | Notes |
|---|---|---|
| A. Swakopmund and Walvis Bay | A1 quad bikes on dune, A2 sandboarding, A3 catamaran with dolphins, A4 kayak with seals, A5 Living Desert walk, A6 scenic flight | Good coverage of coastal activities |
| B. Sossusvlei and the Namib | B1 balloons, B2 Dune 45, B3 Deadvlei, B4 Sesriem Canyon, B5 4x4 desert road, B6 sunset picnic | Strong, on-brand |
| C. Wildlife | C1 elephants at waterhole, C2 desert elephants, C3 giraffe at sunset, C4 lions, C5 rhino, C6 guide with guests in safari vehicle | Check for readable text on vehicle |
| D. Inland (two versions; use version 2) | D1 Fish River Canyon, D2 Spitzkoppe arch, D3 stargazing camp, D4 Twyfelfontein, D5 Kolmanskop, D6 Windhoek craft market | Re-roll D3 (costume-like clothing) |
| Older grids | Desert, coast (shipwreck, flamingos, seals), inland, people | Lower resolution; use as extras |

### Cut-out sheets (6 objects each, white background)
- **Vehicles and sky:** Land Cruiser (dark green, side view), quad bike with rider (blue), hot air balloon, sailing catamaran, light aircraft, 4x4 wheel.
- **Animals:** leaping dolphin, Cape fur seal, flamingo, giraffe, elephant, gemsbok.
- **Props and scenery:** dead camelthorn tree, walking hiker (mustard jacket), safari hat, binoculars, vintage camera, backpack.

### Brand assets
Logo SVG (lockup), footprint icon, social flyer, print kit pieces, brand books, favicon source.

### Still missing
1. Guide portraits (sheet E, 6 portraits, 2400 x 2000 px sheet).
2. Two or three hero images without people, at least 2400 px wide: red dunes at sunrise; Atlantic coast with fog and dunes; savanna at golden hour.
3. Optional: Sandwich Harbour, Cape Cross seals, Mondesa township tour, Windhoek skyline, lodge interior.

### Quality flags
- Panels and cut-outs are about 450 px wide: fine for cards and a demo, soft for full-bleed use. Regenerate individually at 2400 px for heroes.
- The catamaran has hair-thin rigging and the aircraft is white on white; expect rough cut-outs.
- Faces are AI-generated: label guide portraits as demo content and never imply they are real people.

## 2. Folder structure and naming
```
assets/
  source/         originals as received (never edited)
  photos/         cropped masters: dest-activity-nn.jpg (for example swakopmund-quad-01.jpg)
  cutouts/        object-name.png (transparent) and .webp
  portraits/      guide-first-name.jpg
  heroes/         hero-dunes-sunrise.jpg
  brand/          logo.svg, footprint.svg, social cards
  export/         generated AVIF/WebP at 3 sizes
```
Names are lowercase, hyphenated, no spaces. Every asset has an entry in `assets.json` with `alt`, `credit` ("AI-generated, demo"), `focal_point` (x,y for cropping) and `colour` (dominant, for placeholders).

## 3. Processing pipeline
1. **Receive** sheets; keep untouched copies in `source/`.
2. **Split** sheets into single images. For photo grids: crop each panel and trim white gutters. For cut-outs: detect each object by thresholding the near-white background and finding separate connected shapes (`skills/guidr-asset-pipeline/scripts/split_cutouts.py`).
3. **Cut out**: convert near-white to transparency with soft edges (feathering of 1 to 2 px), remove leftover white fringes (decontaminate edge colour), crop to the object's bounding box plus 4 px padding.
4. **Review** every cut-out on a dark and a bright background; redo bad ones.
5. **Crop** photos to the needed ratios (4:3, 16:10, 4:5, 1:1) around the focal point.
6. **Export**: AVIF and WebP at widths 480, 960, 1600 (and 2400 for heroes); cut-outs as WebP with alpha under 150 KB each; also keep PNG masters.
7. **Placeholders**: BlurHash or a 24 px base64 preview for each image.
8. **Register** in `assets.json`; run a script that fails the build if an image lacks alt text.

## 4. Budgets
| Item | Budget |
|---|---|
| Home page total images | under 900 KB on first load (mobile) |
| Hero image | under 180 KB (AVIF/WebP) |
| Card image | under 60 KB at 480 px |
| Cut-out sprite | under 150 KB each; maximum 5 on screen on mobile |
| Animation library (GSAP core plus plugins used) | loaded only on pages that need it; under 70 KB gzipped |

## 5. Motion catalogue

| ID | Element | Page and scene | Trigger | Behaviour | Mobile | Reduced motion |
|---|---|---|---|---|---|---|
| M1 | Dune layers (3 vector ridges) | Home hero | Scroll | Parallax at 0.2x, 0.4x, 0.7x | Two layers | Static |
| M2 | Land Cruiser | Home hero to story | Load, then scroll | Slides in from left on load; then travels along an SVG footprint path as the page scrolls (MotionPath); 2 px bounce at 6 Hz; dust puffs from small circles | Shorter path | Parked, no travel |
| M3 | Footprint trail | Home, destination pages | Scroll | Prints appear in sequence along the path (stroke-dashoffset or staggered opacity) | Same | All visible |
| M4 | Quad bike | Home, Desert scene | Scroll into view | Climbs a dune line, rotating to follow the slope | Hidden if page is heavy | Static |
| M5 | Hot air balloons | Home, Desert scene | Scroll | Rise at different speeds; slight sway | One balloon | Static |
| M6 | Light aircraft | Home, Coast scene | Scroll into view | Crosses the viewport with a faint contrail line | Hidden | Static |
| M7 | Catamaran | Home, Coast scene | Always | Gentle bobbing (2 px, 4 s) and drifting | Same | Static |
| M8 | Dolphins | Home, Coast scene | Scroll into view | Leap along arcs, staggered, one at a time | One dolphin | Static |
| M9 | Elephant, giraffe, gemsbok | Home, Wild scene | Scroll into view | Walk in from edges at different speeds | Two animals | Static |
| M10 | Hiker | Footer band or Desert scene | Scroll | Crosses at the bottom as the user scrolls | Hidden | Static |
| M11 | Camelthorn tree | Hero foreground | Scroll | Slight parallax in front of the dunes | Same | Static |
| M12 | Cards and buttons | Everywhere | Hover, tap | 1 px lift, soft shadow, image zoom 1.03 | Tap feedback only | None |
| M13 | Page transitions | App | Navigation | 220 ms fade and 8 px rise | Same | Instant |
| M14 | Search bar | Home | Focus | Expands slightly; suggestions slide down | Sheet | Instant |
| M15 | Booking status | App | State change | Timeline marker fills with a footprint stamp | Same | Instant |
| M16 | Loading | Everywhere | Wait | Footprint trail draws itself | Same | Static dots |

### Implementation notes
- Use GSAP ScrollTrigger with `scrub` for scroll-linked motion; MotionPath to move the vehicle along an SVG path; `will-change: transform` only during animation.
- Build parallax ridges, sun, clouds, waves and stars as inline SVG, not images.
- Dust puffs are 6 to 10 absolutely positioned circles with fading opacity; recycle elements.
- Pause all animation when the tab is hidden; kill ScrollTriggers on route change.
- Test at 30 and 60 fps on a mid-range Android phone; if frames drop, disable M4, M6, M10 first.
- Each sprite has a CSS fallback: a static image with the same position.

## 6. Photo and sprite use rules
- Cut-outs appear only in marketing scenes (home, destinations, app waitlist), not in cards or checkout.
- Never place more than three sprites in view at once.
- Do not animate faces or people close up.
- Keep the Land Cruiser as the recurring "guide" character: it appears small in the header progress bar, and as the loader in the planner.
