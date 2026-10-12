#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=40000)
    pg.wait_for_timeout(900)
    for y in [4600, 5000, 5500, 6000, 6300]:
        pg.evaluate(f"window.scrollTo(0, {y})")
        pg.wait_for_timeout(500)
        info = pg.evaluate("""() => {
            const sec = document.querySelector('section.bg-ink');
            const left = sec.querySelector('[data-manifesto-inner]').parentElement;
            const lr = left.getBoundingClientRect();
            return {
                scroll: Math.round(scrollY),
                pos: getComputedStyle(left).position,
                viewportTop: Math.round(lr.top),
                innerY: getComputedStyle(left.querySelector('[data-manifesto-inner]')).transform,
            };
        }""")
        print(info)
    # Shots of the manifesto mid-pin and exit
    pg.evaluate("window.scrollTo(0, 5100)"); pg.wait_for_timeout(700)
    pg.screenshot(path="/home/z/my-project/scripts/qa/scrollcraft/manifesto-mid.png")
    pg.evaluate("window.scrollTo(0, 6200)"); pg.wait_for_timeout(700)
    pg.screenshot(path="/home/z/my-project/scripts/qa/scrollcraft/manifesto-late.png")
    b.close()
print("done")
