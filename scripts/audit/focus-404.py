"""Find 404 resources + real keyboard focus test + LCP element context."""
import json
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"

async def main():
    out = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 390, "height": 844})
        page = await ctx.new_page()
        bad = []
        page.on("response", lambda r: bad.append(f"{r.status} {r.url}") if r.status >= 400 else None)
        await page.goto(BASE + "/", wait_until="networkidle", timeout=45000)
        await page.wait_for_timeout(1500)
        out["bad_resources"] = bad

        # LCP image context: find which component renders etosha.jpg above fold
        lcp = await page.evaluate("""
        () => {
          const els = Array.from(document.querySelectorAll('img'));
          return els.slice(0, 6).map(i => ({
            src: (i.getAttribute('src') || '').slice(0, 90),
            alt: (i.getAttribute('alt') || '').slice(0, 50),
            priority: i.hasAttribute('fetchpriority') ? i.getAttribute('fetchpriority') : null,
            loading: i.getAttribute('loading'),
            rect: (() => { const r = i.getBoundingClientRect(); return { t: Math.round(r.top), l: Math.round(r.left) }; })(),
          }));
        }
        """)
        out["first_images"] = lcp

        # real keyboard tabbing
        kb = []
        await page.goto(BASE + "/", wait_until="networkidle")
        await page.keyboard.press("Tab")
        for i in range(12):
            info = await page.evaluate("""
            () => {
              const el = document.activeElement;
              if (!el || el === document.body) return null;
              const st = getComputedStyle(el);
              return {
                tag: el.tagName,
                txt: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 28),
                outlineVisible: st.outlineStyle !== 'none' && parseFloat(st.outlineWidth) > 0,
                ring: String(el.className).includes('focus'),
              };
            }
            """)
            if info is None:
                break
            kb.append(info)
            await page.keyboard.press("Tab")
        out["keyboard"] = kb

        await browser.close()
    print(json.dumps(out, indent=1))

asyncio.run(main())
