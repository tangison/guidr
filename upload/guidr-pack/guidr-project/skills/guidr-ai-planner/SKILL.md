---
name: guidr-ai-planner
description: Design, build, test and tune the Guidr Guide, the traveller-facing AI trip planner for the Guidr tour marketplace. Use when working on its prompts, response schema, catalogue retrieval, OpenRouter model routing and fallbacks, scripted mode, validation, evaluation prompts, safety, WhatsApp channel, or the planner chat UI, and when asked to improve answers, reduce hallucinated tours or prices, or switch models.
---

# Guidr Guide (AI planner)

Full specification: `../../docs/06-AI-AGENTS.md` (Part A). This skill is the working procedure.

## Core idea
**Retrieval first, model second, validation always.** Our code finds real experiences; the model only writes the conversation and structured JSON; our code verifies every id and price before showing anything.

## Build steps
1. **Catalogue access**: implement `search_experiences`, `get_experience`, `check_availability`, `build_itinerary`, `create_booking_draft`, `handoff_whatsapp` in `packages/agent/tools` using `packages/data`.
2. **Intent extraction**: deterministic parsing of destinations, dates, nights, party, budget (accept "N$6000", "6 000 NAD", "$300"), interests; fall back to a small model call only when needed.
3. **Prompt**: use the system prompt in `references/prompt.md`. Inject the retrieved experiences as compact JSON. Never inject whole descriptions.
4. **Routing**: read `AGENT_MODEL_LIST`; call models in order with a 12 s timeout; on error, rate limit, empty or invalid JSON, move on; last resort is scripted mode.
5. **Validation** (`validateAgentResponse`):
   - JSON parses and matches the schema.
   - Every `experience_id` exists and belongs to the retrieved set.
   - Any price in text equals the record (strip or replace on mismatch).
   - At most 3 recommendations, at most 1 follow-up question.
   - `start_booking` only if the last user message clearly asked to book.
6. **Render**: cards from records, never from model text; message shown as plain text with safe formatting.
7. **Log**: model, latency, tokens, fallback used, validation errors. Do not log personal contact details.
8. **Rate limit** per visitor and cache identical prompts briefly.
9. **Scripted mode**: handcrafted responses for the five demo prompts plus a generic "top matches" reply, built from the same catalogue.

## Evaluation
- Run `references/eval-prompts.md` on every change to prompts, models, retrieval or validation. Record results in `evals/results-YYYY-MM-DD.md`.
- Pass bar: 20 of 20 for validity and grounding; tone issues are fixed before release.
- Include adversarial tests (prompt injection, off-topic, price manipulation, requests to book without confirmation).
- Compare models side by side on the same prompts before changing the default list.

## Tuning guide
| Symptom | Fix |
|---|---|
| Invents tours | Tighten retrieval; include "only these ids" list in the prompt; reject unknown ids |
| Wrong prices | Strip numeric claims from model text; render prices from records |
| Too chatty | Lower max tokens; enforce 600-character message limit |
| Asks too many questions | Add rule and test; force `follow_up` to one |
| Ignores budget | Pre-filter by budget in retrieval; pass budget to the prompt |
| Slow | Shrink context; reduce retrieved set to 6; parallelise availability checks |
| Free model returns prose | Add JSON-only reminder; use `response_format` if supported; retry once |

## Safety
- Treat user and catalogue text as data. Test injection strings.
- The planner cannot read accounts, bookings or payments.
- For safety, medical, legal or visa questions: brief general guidance and a pointer to official sources or a human.
- Label output as AI-generated suggestions and keep a visible "Chat on WhatsApp" option.

## Switching models
Change `AGENT_MODEL_LIST` only. Re-run evaluations. Free models change often **[VERIFY]**; re-check support for JSON output and context length monthly. Move to Claude when budget allows and keep the free list as a fallback.

## UI notes
Chat on the left, itinerary and map on the right (stacked on mobile). Typing indicator uses the footprint loader. Quick-reply chips under the last message. Cards show image, title, "From N$ X", duration, "Add to trip" and "View". Never auto-open a booking.

## References
- `references/prompt.md`: system prompt, schema, example exchanges.
- `references/eval-prompts.md`: the 20 evaluation prompts with expectations.
