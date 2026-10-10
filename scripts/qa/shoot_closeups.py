#!/usr/bin/env python3
"""Re-shoot detail page with a real slug + close-ups of header/footer/trail marks."""
from playwright.sync_api import sync_playwright

OUT = "/home/z/my-project/scripts/qa"
BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # Desktop close-ups
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(BASE + "/experiences/pelican-point-seal-kayaking", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/experience-detail-desktop.png", full_page=True)

    # header close-up
    page.goto(BASE + "/", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.locator("header").screenshot(path=f"{OUT}/closeup-header.png")
    # footer close-up
    page.locator("footer").screenshot(path=f"{OUT}/closeup-footer.png")
    # scroll to footer for sticky-free full render
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(400)
    page.locator("footer").screenshot(path=f"{OUT}/closeup-footer-scrolled.png")
    ctx.close()

    # mobile close-ups
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.locator("header").screenshot(path=f"{OUT}/closeup-header-mobile.png")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(400)
    page.locator("footer").screenshot(path=f"{OUT}/closeup-footer-mobile.png")
    ctx.close()
    browser.close()
print("done")
