#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=40000)
    pg.wait_for_timeout(900)
    for y in [5400, 5580, 6000, 6500, 7000, 7500]:
        pg.evaluate(f"window.scrollTo(0, {y})")
        pg.wait_for_timeout(500)
        info = pg.evaluate("""() => {
            const sec = document.querySelector('section.bg-ink');
            const left = sec.querySelector('[data-manifesto-inner]');
            const inner = left ? left : sec;
            const kids = [];
            for (const k of (left ? left.children : [])) {
                const r = k.getBoundingClientRect();
                kids.push({ text: k.textContent.trim().slice(0, 28), top: Math.round(r.top), bottom: Math.round(r.bottom) });
            }
            const lr = (sec.querySelectorAll('div')[1] || {}).getBoundingClientRect ? sec.querySelectorAll('div')[1].getBoundingClientRect() : null;
            return { scroll: scrollY, kids, leftColTop: lr ? Math.round(lr.top) : null };
        }""")
        print(f"--- scroll {info['scroll']} leftColTop {info['leftColTop']}")
        for k in info["kids"]:
            print(f"    {k['top']:>5}..{k['bottom']:>5}  {k['text'][:40]}")
    b.close()
