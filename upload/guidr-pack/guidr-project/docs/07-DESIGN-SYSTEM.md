# 07. Design System and Design Taste

Taste is the most important part of this product. Guidr should feel like a well-edited travel magazine that happens to take bookings: calm, warm, confident, uncluttered. Use this document to build and to judge.

## 1. Brand personality
**Warm. Local. Assured. Editorial. Quietly premium.** A knowledgeable friend, not a salesman.

Not: loud, discount-driven, cartoonish, corporate-bland, "safari kitsch" (zebra stripes, hunting-lodge brown, clip-art Africa).

## 2. Ten principles of taste
1. **Photography leads.** Big, honest, well-cropped images do the selling. Interface chrome stays quiet.
2. **One accent per view.** Terracotta is the accent; mustard is a rare highlight. Never use both loudly in the same component.
3. **Space is a feature.** Generous margins and breathing room between sections. If it feels crowded, remove something before shrinking it.
4. **Hierarchy by size and weight, not colour.** One strong headline, one supporting line, one action.
5. **Rounded, not bubbly.** Images and cards use 16 to 24 px radii; controls use 12 px or full pills. Never mix many radii.
6. **Hairlines over shadows.** Separate with 1 px lines and tint changes. Shadows only for floating layers, and soft.
7. **Real over stock.** Candid travellers seen from behind, real textures, human guides. No handshake stock, no floating gradient orbs.
8. **Motion explains, never decorates.** Movement shows cause and place (the Land Cruiser follows the trail as you scroll). Nothing loops for its own sake.
9. **Plain words.** Short sentences, concrete nouns, no exclamation marks, no hype adjectives.
10. **Consistency is luxury.** Same spacing steps, same type scale, same icon weight everywhere.

## 3. Colour

### Core palette
| Token | Hex | Use |
|---|---|---|
| `ink` | `#1A1517` | Primary text, dark surfaces, logo |
| `bone` | `#ECEAE6` | Page tint, soft panels |
| `bone-50` | `#F7F5F1` | Card fill on white, input fill |
| `white` | `#FFFFFF` | Main page background, cards |
| `terracotta` | `#C4552D` | Accent, primary buttons, the orange I |
| `terracotta-700` | `#A8431F` | Accent text on light backgrounds, hover |
| `terracotta-50` | `#FBEDE7` | Accent tint backgrounds |
| `mustard` | `#F2C240` | Highlights, footprint trails, rating stars |
| `sand` | `#D9A066` | Illustration and chart secondary |

### Neutrals
| Token | Hex | Use |
|---|---|---|
| `ink-700` | `#3B3436` | Secondary text on light |
| `ink-500` | `#6A6560` | Tertiary text, captions (large only if under 4.5:1) |
| `line` | `#DDD8D0` | Hairlines and borders |
| `line-strong` | `#C9C2B8` | Focus-adjacent borders, dividers |

### Feedback
| Token | Hex | Use |
|---|---|---|
| `success` | `#2F6F60` | Confirmed, paid |
| `warning` | `#B7791F` | Needs attention |
| `danger` | `#B3261E` | Errors, destructive |
| `info` | `#2F5D7C` | Neutral notices |

### Contrast rules
- `ink` on `white` or `bone`: far above 7:1.
- `terracotta` (`#C4552D`) on white is about 4.5:1: fine for large text and UI components, **not** for small body text. Use `terracotta-700` for small accent text (about 6:1).
- White text on `terracotta`: use for buttons 16 px and larger or 14 px bold; check each case.
- Mustard is never used for text on white. Use it as a fill, or as text on `ink`.
- Never put text over photos without a gradient scrim (see section 7).

### Backgrounds
White is default. Alternate with `bone-50` or `bone` bands to create rhythm. Use `ink` bands once or twice per page for drama (stats, footer). Printed material uses pure white paper.

## 4. Typography
**Typeface:** Poppins (Google Fonts, self-hosted, subset). Weights used: 400, 500, 600, 700.
**Wordmark:** the thin geometric GUIDR logotype is an image/SVG, never typed.

### Scale (mobile / desktop)
| Style | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 40/44 → 72/76 | 700 | -0.02em | Hero |
| H1 | 32/38 → 52/58 | 700 | -0.02em | Page titles |
| H2 | 26/32 → 38/44 | 700 | -0.015em | Section titles |
| H3 | 20/26 → 24/32 | 600 | -0.01em | Card titles, subsections |
| Body L | 18/28 | 400 | 0 | Intro paragraphs |
| Body | 16/26 | 400 | 0 | Default text |
| Small | 14/22 | 400 | 0 | Meta, captions |
| Label | 12/16 | 500 | +0.08em, uppercase | Eyebrows, chips |
| Button | 15/20 | 600 | 0 | Actions |

Rules: line length 60 to 75 characters; headlines maximum two lines on mobile; never centre long paragraphs; use real italics sparingly; numerals in prices are tabular (`font-variant-numeric: tabular-nums`).

## 5. Layout and spacing
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Use only these.
- **Grid:** 4 columns on mobile (16 px gutters, 20 px margins), 8 on tablet, 12 on desktop; max content width 1200 px; text blocks max 720 px.
- **Section rhythm:** 64 px vertical padding on mobile, 96 to 128 px on desktop.
- **Cards:** 16 to 24 px padding, hairline border, no shadow at rest; 1 px lift and soft shadow on hover.
- **Breakpoints:** 390 (design baseline), 768, 1024, 1280.
- **Thumb zone:** primary actions reachable in the lower half on mobile; sticky bottom bar for the booking action.

## 6. Shape, depth and icons
- **Radii:** `sm` 8 (tags), `md` 12 (inputs, buttons), `lg` 16 (cards), `xl` 24 (hero images, large panels), `full` (pills, avatars).
- **Elevation:** `e0` none; `e1` `0 1px 2px rgba(26,21,23,.06)`; `e2` `0 8px 24px rgba(26,21,23,.10)` (menus, sticky panels); `e3` `0 20px 48px rgba(26,21,23,.16)` (modals). Use sparingly.
- **Borders:** 1 px `line`. Focus ring: 2 px `terracotta-700` with 2 px white offset.
- **Icons:** line icons, 1.5 px stroke, rounded caps and joins, 24 px grid, `ink` or `terracotta`. Use one family (for example Lucide) and a few custom ones: footprint, dune, sun, compass. Never mix filled and outline styles.
- **The footprint motif:** the brand's signature. Use it as dividers (three small prints), loaders, list bullets for itineraries, route lines on maps, scroll progress, and the empty-state illustration. Do not scatter it as decoration.

## 7. Imagery
- **Subjects:** real-feeling travellers seen from behind or in profile; guides at work; landscapes with scale; details (hands, textures, tracks in sand).
- **Treatment:** warm colour grade, natural contrast, subtle grain on hero images only. Do not oversaturate.
- **Aspect ratios:** cards 4:3; gallery hero 16:10; mobile hero 4:5; avatars 1:1; open-graph 1.91:1.
- **Rounding:** every image has the radius of its container (16 or 24).
- **Text on images:** use a bottom-to-top scrim `linear-gradient(to top, rgba(26,21,23,.65), rgba(26,21,23,0) 60%)`; keep contrast at least 4.5:1 for small text, 3:1 for large.
- **Alt text:** describe the scene and the activity in one plain sentence.
- **Avoid:** watermarks, visible logos on vehicles or clothing, crowds, posed thumbs-up shots, clichés (sunset silhouettes with a giraffe in every section).
- **Cut-outs** (vehicles, animals, props) float on clean backgrounds with no ground shadow in the asset; add soft shadows in code where needed. Use them to add life in scroll scenes, not in cards.

## 8. Components

### Buttons
- **Primary:** `terracotta` fill, white text, 12 px radius, 48 px height (44 min), hover `terracotta-700`.
- **Secondary:** white fill, `ink` text, 1 px `line-strong` border.
- **Ghost:** text only with underline on hover.
- **WhatsApp:** `ink` fill with a small white WhatsApp glyph; used for "Ask on WhatsApp". Do not use WhatsApp green as a brand colour.
- Disabled: 40 percent opacity, no hover. Loading: footprint spinner, label retained.

### Inputs
48 px height, `bone-50` fill, 1 px `line` border, 12 px radius, label above (never placeholder-only), helper text below, error text in `danger` with an icon.

### Search bar
Pill on desktop (what, where, when, guests, search button), stacked sheet on mobile. Large, prominent, always the first interactive element on the home page.

### Experience card
Image 4:3 with 16 px radius, wishlist heart top-right, title (H3, two lines max), meta row (duration, group), rating with mustard star, price "From N$ X" bold, demo tag if applicable. Entire card is a link with a clear focus state.

### Chips and tags
Pill, 32 px high, `bone-50` fill; selected: `ink` fill with white text.

### Gallery
One large image with up to four thumbnails on desktop; swipeable carousel on mobile; full-screen viewer with captions.

### Booking panel
Sticky on desktop; bottom sheet on mobile. Date, guests, line items, total, primary action, secondary WhatsApp action, small print on payment and cancellation.

### Calendar
Month grid with clear selected, available, sold-out and blocked states; availability never indicated by colour alone.

### Status timeline
Vertical steps with footprint markers; current step highlighted in terracotta; completed in `success`.

### Toasts, modals, banners
Toasts bottom-centre, auto-dismiss in 5 s (never for errors); modals trap focus, close with Escape; banners inline and dismissible.

### Empty states
A footprint trail illustration, one sentence, one action. Example: "No tours match yet. Try another date, or ask the planner."

### Skeletons
Neutral `bone` blocks with a gentle shimmer; shapes match final content.

### Navigation
Header: wordmark left, destinations, experiences, for operators, planner; right side: currency, sign in, primary "Plan my trip". Mobile: compact header with menu sheet. Footer: four columns, legal links, social icons, "Built by Tangison Studio".

## 9. Motion
- **Durations:** 120 ms (hover, press), 220 ms (small reveals), 400 ms (panels, cards), 700 to 1200 ms (hero and scene transitions).
- **Easing:** standard `cubic-bezier(0.2, 0.0, 0.0, 1.0)`; exit `cubic-bezier(0.4, 0.0, 1, 1)`; soft spring for the vehicle bounce.
- **Rules:** animate transform and opacity only; stagger siblings by 60 to 80 ms; max one hero animation at a time; no autoplay sound; respect `prefers-reduced-motion` by replacing motion with fades or nothing.
- Full motion catalogue in `08-MOTION-AND-ASSETS.md`.

## 10. Voice and microcopy
- Plain, warm, specific. "Your guide will meet you at the Swakopmund jetty at 08:00."
- No exclamation marks except in rare celebratory moments. No "Oops!".
- Prices: "From N$ 600 per person". Dates: "Sat 14 Nov". Times: 24-hour.
- Buttons are verbs: "Request to book", "Ask on WhatsApp", "Save for later".
- Errors say what happened and what to do: "That date is fully booked. Try 15 or 16 Nov, or ask the planner."
- Operator-facing copy is businesslike and brief.
- See `10-CONTENT-AND-LEGAL.md` for templates.

## 11. Accessibility
- WCAG 2.2 AA. Visible focus on every control. Targets at least 44 x 44 px.
- Never convey information by colour alone. Provide text alternatives for images and charts.
- Support 200 percent zoom and text resizing; no horizontal scrolling at 320 px.
- Forms: labels, instructions, errors announced, logical tab order.
- Motion: reduced-motion variants; no flashing.
- Test with keyboard, a screen reader, and on a low-end Android phone.

## 12. Tokens (copy into code)

```css
:root {
  --ink:#1A1517; --ink-700:#3B3436; --ink-500:#6A6560;
  --bone:#ECEAE6; --bone-50:#F7F5F1; --white:#FFFFFF;
  --line:#DDD8D0; --line-strong:#C9C2B8;
  --terracotta:#C4552D; --terracotta-700:#A8431F; --terracotta-50:#FBEDE7;
  --mustard:#F2C240; --sand:#D9A066;
  --success:#2F6F60; --warning:#B7791F; --danger:#B3261E; --info:#2F5D7C;
  --r-sm:8px; --r-md:12px; --r-lg:16px; --r-xl:24px;
  --e1:0 1px 2px rgba(26,21,23,.06); --e2:0 8px 24px rgba(26,21,23,.10); --e3:0 20px 48px rgba(26,21,23,.16);
  --ease:cubic-bezier(.2,0,0,1);
}
```

```js
// tailwind.config (excerpt)
theme: { extend: {
  colors: { ink:'#1A1517', bone:'#ECEAE6', terracotta:{DEFAULT:'#C4552D',700:'#A8431F',50:'#FBEDE7'}, mustard:'#F2C240', sand:'#D9A066' },
  fontFamily: { sans:['Poppins','system-ui','sans-serif'] },
  borderRadius: { sm:'8px', md:'12px', lg:'16px', xl:'24px' },
  boxShadow: { e1:'0 1px 2px rgba(26,21,23,.06)', e2:'0 8px 24px rgba(26,21,23,.10)', e3:'0 20px 48px rgba(26,21,23,.16)' }
}}
```

## 13. Taste checklist (use before shipping any screen)
- [ ] One clear focal point; the eye knows where to start.
- [ ] Only one accent colour is loud.
- [ ] Spacing uses the scale; sections have room to breathe.
- [ ] Type uses the scale; no more than three sizes in a card.
- [ ] Images are rounded, correctly cropped, with scrims where text sits on them.
- [ ] No default-looking components (unstyled select, raw checkboxes).
- [ ] Icons are one family and one stroke weight.
- [ ] No more than two shadows visible on the screen.
- [ ] Copy is plain and specific; no exclamation marks.
- [ ] Mobile layout was designed first, not squeezed.
- [ ] Hover, focus, pressed, disabled, loading, empty and error states exist.
- [ ] Contrast checked; text over images checked.
- [ ] Motion is purposeful, short and reduced-motion safe.
- [ ] The footprint motif appears where it adds meaning, not everywhere.
- [ ] If you removed one element, would it get better? If yes, remove it.

## 14. Anti-patterns (reject on sight)
Gradient blobs and glassmorphism cards; neon or rainbow gradients; five competing colours; centred walls of text; stock handshake photos; emoji as icons; heavy drop shadows; pill buttons in six different sizes; carousels that auto-advance; "Oops!"; countdown timers and fake scarcity; cookie banners that hide the reject button; dark patterns of any kind.
