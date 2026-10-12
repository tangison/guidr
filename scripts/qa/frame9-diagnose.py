#!/usr/bin/env python3
"""Diagnose the frame-9 flag: what is on screen at scroll y=5580 on desktop."""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=40000)
    pg.wait_for_timeout(900)
    pg.evaluate("window.scrollTo(0, 5580)")
    pg.wait_for_timeout(600)
    info = pg.evaluate("""() => {
        const vp = { top: scrollY, bottom: scrollY + innerHeight };
        const out = [];
        for (const sec of document.querySelectorAll('section, header, footer')) {
            const r = sec.getBoundingClientRect();
            const abs = { top: r.top + scrollY, bottom: r.bottom + scrollY };
            if (abs.bottom > vp.top && abs.top < vp.bottom) {
                out.push({
                    tag: sec.tagName,
                    label: sec.getAttribute('aria-label') || sec.getAttribute('aria-labelledby') || '',
                    text: sec.textContent.trim().replace(/\\s+/g, ' ').slice(0, 110),
                    visTop: Math.round(r.top), visBottom: Math.round(r.bottom),
                    bg: getComputedStyle(sec).backgroundColor,
                });
            }
        }
        return out;
    }""")
    for s in info:
        print(f"[{s['tag']} {s['label']}] y {s['visTop']}..{s['visBottom']} bg {s['bg']}\n   {s['text'][:110]}\n")
    pg.screenshot(path="/home/z/my-project/scripts/qa/scrollcraft/frame9.png")
    b.close()
print("done")
