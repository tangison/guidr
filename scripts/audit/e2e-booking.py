"""E2E booking flow test: set date -> open dialog -> form -> server action -> booking page."""
import asyncio
import json
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"


async def main():
    out = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)[:150]))

        await page.goto(f"{BASE}/experiences/swakopmund-dune-quad-biking", wait_until="networkidle")

        # set a date in the booking panel (validates the Request button)
        await page.fill('input[type="date"]', "2026-11-15")
        await page.wait_for_timeout(400)

        await page.get_by_role("button", name="Request to book").click()
        await page.wait_for_timeout(700)

        await page.fill('input[name="travellerName"]', "Audit Test")
        await page.fill('input[name="travellerEmail"]', "audit@example.com")

        await page.get_by_role("button", name="Send request").click()
        await page.wait_for_url("**/bookings/**", timeout=25000)
        await page.wait_for_timeout(1500)
        out["booking_url"] = page.url
        out["booking_page_text"] = (await page.inner_text("main"))[:500]
        out["page_errors"] = errors
        await browser.close()
    print(json.dumps(out, indent=1))

asyncio.run(main())
