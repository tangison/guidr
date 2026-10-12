"""Screenshot the pages changed in the audit-fix pass for VLM review."""
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"
SHOTS = [
    ("audit-for-operators", "/for-operators", 1280, 3000),
    ("audit-how-it-works", "/how-it-works", 1280, 2200),
    ("audit-terms", "/terms", 1280, 2600),
    ("audit-home", "/", 1280, 2400),
    ("audit-for-operators-mobile", "/for-operators", 390, 3400),
    ("audit-legal-cancellation", "/legal/cancellation", 1280, 2600),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, path, w, h in SHOTS:
            ctx = await browser.new_context(viewport={"width": w, "height": 900}, device_scale_factor=1)
            page = await ctx.new_page()
            await page.goto(BASE + path, wait_until="networkidle", timeout=45000)
            await page.wait_for_timeout(800)
            await page.screenshot(path=f"/home/z/my-project/scripts/qa/{name}.png", full_page=False)
            # full page via stitched scroll for long pages
            await page.set_viewport_size({"width": w, "height": min(h, 4200)})
            await page.wait_for_timeout(500)
            try:
                await page.screenshot(path=f"/home/z/my-project/scripts/qa/{name}-full.png", full_page=True)
            except Exception as e:
                print(name, "full-page failed:", str(e)[:80])
            await ctx.close()
            print("shot:", name)
        await browser.close()

asyncio.run(main())
