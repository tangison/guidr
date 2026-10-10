#!/usr/bin/env python3
"""Diagnose the home page: real gaps between sections and image load state."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

JS = """
async () => {
  // scroll through slowly so lazy images and reveals fire
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 300) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 400));

  const chips = document.querySelector('[data-qa="chips"], .category-chips, [aria-label*="categor" i]');
  const firstCard = document.querySelector('a[href^="/experiences/"]');
  const chipsRect = chips ? chips.getBoundingClientRect() : null;
  const cardRect = firstCard ? firstCard.getBoundingClientRect() : null;

  const imgs = [...document.querySelectorAll('img')].map(i => ({
    src: i.currentSrc.split('/').pop().slice(0, 40),
    loaded: i.complete && i.naturalWidth > 0,
    w: i.naturalWidth,
  }));

  // gaps between major sections
  const sections = [...document.querySelectorAll('main section')].map(s => {
    const r = s.getBoundingClientRect();
    return { cls: (s.className || '').toString().slice(0, 40), top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY) };
  });

  return {
    scrollY: window.scrollY,
    docHeight: h,
    chipsGap: chipsRect && cardRect ? Math.round(cardRect.top - chipsRect.bottom) : 'n/a',
    imgsNotLoaded: imgs.filter(i => !i.loaded).length,
    imgsTotal: imgs.length,
    notLoadedList: imgs.filter(i => !i.loaded).slice(0, 8).map(i => i.src),
    sections,
  };
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=30000)
    res = page.evaluate(JS)
    print("doc height:", res["docHeight"])
    print("images not loaded:", res["imgsNotLoaded"], "/", res["imgsTotal"])
    for s in res["notLoadedList"]:
        print("   NOT LOADED:", s)
    print("\nsection layout (top..bottom):")
    for s in res["sections"]:
        print(f"   {s['top']:>7}..{s['bottom']:>7}  {s['cls']}")
    ctx.close()
    browser.close()
