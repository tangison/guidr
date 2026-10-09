# 09. Catalogue and Pricing

All launch content is **demo content** until real operators are live. Operators are fictional and flagged `is_demo`. Prices are **market references** gathered from comparison sites and operator listings in 2026 and must be refreshed before launch **[VERIFY]**. Currency is shown as listed; convert with one editable rate (`FX_RATE_NAD_USD`).

## 1. Launch experiences (16)

| # | Experience | Destination | Category | Hero image | Price reference | Duration (draft) |
|---|---|---|---|---|---|---|
| 1 | Dune quad biking | Swakopmund | Adventure | A1 | From US$34 (1 h) to US$63 (3 h with sandboard) on a booking site; a travel guide quotes US$80 to 150 | 1 to 3 h |
| 2 | Sandboarding | Swakopmund | Adventure | A2 | To research (often bundled with quad biking) | 2 to 3 h |
| 3 | Dolphin and seal catamaran | Walvis Bay | Coast | A3 | N$600 direct from one operator (snacks and light lunch); about US$90 on booking sites | 3 h |
| 4 | Seal kayaking, Pelican Point | Walvis Bay | Coast | A4 | About US$81 to 89 on booking sites; guides quote US$100 to 180 | 3 h |
| 5 | Living Desert guided walk | Swakopmund | Wildlife | A5 | To research | 3 to 4 h |
| 6 | Coastal scenic flight | Swakopmund | Flights | A6 | To research | 1 to 2 h |
| 7 | Sunrise balloon flight | Sossusvlei | Flights | B1 | About N$9,920 per person; N$10,720 for July 2026 to June 2027; other sources US$350 to 450 | 3 to 4 h |
| 8 | Dune 45 sunrise climb | Sossusvlei | Desert | B2 | To research; multi-day Sossusvlei tours from Swakopmund US$400 to 700 for 3 days | 3 h |
| 9 | Deadvlei and Big Daddy walk | Sossusvlei | Desert | B3 | To research | 3 h |
| 10 | Sesriem Canyon walk | Sossusvlei | Desert | B4 | To research | 1 to 2 h |
| 11 | Etosha waterhole safari | Etosha | Wildlife | C1 | Multi-day: 3 days US$450 to 750, 5 days US$700 to 1,200 (guide ranges) | Day or multi-day |
| 12 | Desert elephant tracking | Damaraland | Wildlife | C2 | To research | Half day |
| 13 | Fish River Canyon sunrise | Fish River | Desert | D1 | To research | Half day |
| 14 | Spitzkoppe and stargazing camp | Erongo | Stargazing | D2, D3 | To research | Evening or overnight |
| 15 | Twyfelfontein rock art tour | Damaraland | Culture | D4 | To research | 2 h |
| 16 | Kolmanskop ghost town visit | Luderitz | Culture | D5 | To research | 2 h |

Bonus content: sunset picnic on a dune (B6), 4x4 desert road drive (B5), Windhoek craft market walk (D6), lion and rhino and giraffe imagery (C3 to C5), shipwreck and flamingo imagery from older grids.

Other references found: lagoon cruises US$70 to 130; a private 3-day Sossusvlei trip from Windhoek about EUR 1,546 per adult. Use these for context, not as listings.

## 2. How to treat the price data
- Booking sites (OTAs) usually price higher than direct operators (the dolphin cruise: N$600 direct vs about US$90 on OTAs). Store `price_min`, `price_max`, `source_type` (direct, ota, guide_range), `source_note` and `checked_on`.
- On the site show "From N$ X" using the lowest credible direct price, and a "Demo price" tag until confirmed by the operator.
- Never show a price range to travellers as a promise; the listing price is what the operator sets.
- Re-check all prices within 30 days of launch and on each quarter.

## 3. Listing template (fields operators fill)
- Title (max 70 characters), one-line summary (max 140), description (150 to 400 words).
- Destination, category, duration, group size, languages, age and fitness limits, accessibility notes.
- Highlights (3 to 6), itinerary (steps with times), included, not included, what to bring.
- Meeting point (text, map pin, instructions), pickup options.
- Price model, adult price, child price, private-group price, add-ons, seasonal pricing.
- Cancellation preset, payment methods, response promise.
- Photos: at least 5, one cover; descriptive alt text.
- Safety note and licences (tourism licence number, insurance) where applicable **[VERIFY]** local requirements.

## 4. Sample records (JSON, abbreviated)

```json
{
  "id": "exp_dolphin_cat_01",
  "slug": "walvis-bay-dolphin-and-seal-catamaran",
  "title": "Dolphin and seal catamaran cruise",
  "destination": "walvis-bay",
  "categories": ["coast","wildlife"],
  "summary": "Cruise the Walvis Bay lagoon with dolphins, seals and flamingos.",
  "duration_minutes": 180,
  "price_model": "per_person",
  "price_minor": 60000, "currency": "NAD",
  "price_note": { "source_type": "direct", "checked_on": "2026-10-03" },
  "policy": "moderate",
  "images": ["walvis-catamaran-01","walvis-seals-01"],
  "is_demo": true
}
```

```json
{
  "id": "exp_quad_01",
  "slug": "swakopmund-dune-quad-biking",
  "title": "Dune quad biking",
  "destination": "swakopmund",
  "categories": ["adventure","desert"],
  "summary": "Ride the Namib dunes on a guided quad bike tour.",
  "duration_minutes": 120,
  "price_model": "per_person",
  "price_minor": 120000, "currency": "NAD",
  "price_note": { "source_type": "guide_range", "checked_on": "2026-10-03" },
  "policy": "flexible",
  "images": ["swakopmund-quad-01"],
  "is_demo": true
}
```
(The two N$ amounts above are placeholders to be replaced after price research; the dolphin cruise N$600 is from an operator listing.)

## 5. Demo operators and guides (fictional)
Create 5 operators with typographic logos and 6 guides (portraits from sheet E):
- Coastal adventure operator (quad, sandboarding, flights)
- Lagoon and wildlife cruise operator
- Namib desert guides (Sossusvlei)
- Safari and wildlife guides (Etosha, Damaraland)
- Cultural and heritage guides (Twyfelfontein, Kolmanskop, Windhoek)
Name them clearly as examples (for example "Coastal Dunes Co. (demo)") so nobody mistakes them for real businesses.

## 6. Demo reviews
Twenty short, believable reviews flagged `is_demo`, varied in length and tone, never mentioning real people or businesses. Remove all demo reviews before real launch.

## 7. Destination data
For each of the 7 destinations: 120-word intro, best season, how to get there with realistic driving times **[VERIFY]**, nearest town, 3 top experiences, 5 local tips, hero image.

## 8. Research to complete (price gaps)
Sandboarding; Living Desert tour; scenic flight (coast and Sossusvlei); Dune 45 and Deadvlei day tours; Sesriem canyon (park entry fees apply); Etosha day trips and park fees; Damaraland elephant tracking; Fish River Canyon tours; Spitzkoppe camping and guided tours; Twyfelfontein entry and guide fees; Kolmanskop entry and tour fees. Record entry fees separately from tour prices.
