#!/usr/bin/env python3
"""Golden-path interaction test: search, booking, planner, waitlist, accordion."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
results = []
errors = []

def check(name, ok, detail=""):
    results.append((name, ok, detail))
    print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail else ""))

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))

    # 1. Hero search navigates to experiences with query
    page.goto(BASE + "/", wait_until="networkidle", timeout=30000)
    page.fill("input[type='search']", "dolphins")
    page.click("button[type='submit']")
    page.wait_for_url("**/experiences?q=dolphins**", timeout=10000)
    check("hero search navigation", "experiences?q=dolphins" in page.url)

    # 2. Experience detail -> booking dialog -> submit -> booking ref page
    page.goto(BASE + "/experiences/walvis-bay-dolphin-and-seal-catamaran", wait_until="networkidle")
    # pick a date in the sticky booking panel first (button is disabled until then)
    tomorrow = __import__("datetime").date.today() + __import__("datetime").timedelta(days=7)
    page.fill("input[type='date']", tomorrow.strftime("%Y-%m-%d"))
    page.wait_for_timeout(300)
    page.click("text=Request to book")
    page.wait_for_selector("[role='dialog']", timeout=5000)
    page.fill("[role='dialog'] input[name='travellerName']", "Test Traveller")
    page.fill("[role='dialog'] input[name='travellerEmail']", "test@example.com")
    # submit the booking form inside the dialog
    page.click("[role='dialog'] button[type='submit']")
    page.wait_for_url("**/bookings/**", timeout=15000)
    check("booking flow", "/bookings/" in page.url, page.url)

    # 3. Planner: send a message, expect reply with catalogue cards
    page.goto(BASE + "/planner", wait_until="networkidle")
    page.fill("textarea", "One day at the coast for two adults, easy pace")
    page.keyboard.press("Enter")
    try:
        page.wait_for_selector("text=/day|coast|plan/i", timeout=30000)
        cards = page.locator("a[href^='/experiences/']").count()
        check("planner reply", True, f"{cards} cards visible")
    except Exception as e:
        check("planner reply", False, str(e)[:80])

    # 4. Waitlist form on home
    page.goto(BASE + "/", wait_until="networkidle")
    email_input = page.locator("input[type='email']")
    email_input.scroll_into_view_if_needed()
    page.wait_for_timeout(1200)  # let the reveal settle
    email_input.fill("waitlist-test@example.com")
    page.get_by_role("button", name="Join the waitlist").click()
    try:
        page.wait_for_selector("text=/joined|welcome|check your inbox/i", timeout=10000)
        check("waitlist submit", True)
    except Exception:
        check("waitlist submit", False, "no success state")

    # 5. Scenes accordion hover expands (desktop)
    page.goto(BASE + "/", wait_until="networkidle")
    page.hover("text=The wild")
    page.wait_for_timeout(900)
    expanded = page.evaluate("""
        () => {
            const arts = [...document.querySelectorAll('article')];
            return arts.map(a => parseFloat(getComputedStyle(a).flexGrow));
        }
    """)
    check("accordion hover", any(g and g > 2 for g in expanded), f"flex values {expanded}")

    ctx.close()
    browser.close()

print()
fails = [r for r in results if not r[1]]
print(f"{len(results) - len(fails)}/{len(results)} golden paths passed")
if errors:
    print("console errors:")
    for e in errors[:6]:
        print("  -", e[:160])
else:
    print("console errors: none")
