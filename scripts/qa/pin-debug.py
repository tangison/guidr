#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=40000)
    pg.wait_for_timeout(900)
    for y in [4166, 5560, 6500]:
        pg.evaluate(f"window.scrollTo(0, {y})")
        pg.wait_for_timeout(600)
        info = pg.evaluate("""() => {
            const sec = document.querySelector('section.bg-ink');
            const grid = sec.querySelector('.grid');
            const left = grid.children[0];
            const right = grid.children[1];
            const inner = left.querySelector('[data-manifesto-inner]');
            const ls = getComputedStyle(left);
            const isr = getComputedStyle(inner);
            const lr = left.getBoundingClientRect();
            return {
                scroll: Math.round(scrollY),
                secTop: Math.round(sec.getBoundingClientRect().top + scrollY),
                leftTop: Math.round(lr.top + scrollY),
                rightH: right.offsetHeight,
                leftH: left.offsetHeight,
                leftPos: ls.position,
                leftTransform: ls.transform,
                innerTransform: isr.transform,
                pinSpacer: !!left.closest('.pin-spacer'),
            };
        }""")
        print(info)
    b.close()
