"""Runtime audit: console errors, a11y tree basics, page weight, keyboard focus.

Runs against the local dev server (same source as production build).
Per: web-quality-audit, vercel web-design-guidelines, cloudflare web-perf,
tangison-webmaster-checklist.
"""
import json
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"
PAGES = [
    "/", "/experiences", "/destinations", "/planner",
    "/for-operators", "/how-it-works", "/about", "/brand",
    "/terms", "/privacy-policy", "/legal/cancellation",
    "/legal/operator-agreement", "/no-such-page",
]

JS_AUDIT = """
() => {
  const out = { imgsNoAlt: [], btnsNoName: [], inputsNoLabel: [], h1: 0, hCount: {}, title: document.title };
  document.querySelectorAll('img').forEach(i => {
    if (!i.hasAttribute('alt')) out.imgsNoAlt.push(i.getAttribute('src')?.slice(0, 80));
  });
  document.querySelectorAll('button, [role="button"], a.btn').forEach(b => {
    if (!b.getAttribute('aria-label') && !(b.textContent || '').trim() && !b.querySelector('img[alt], svg[aria-label]'))
      out.btnsNoName.push(b.outerHTML.slice(0, 80));
  });
  document.querySelectorAll('input:not([type="hidden"]), textarea, select').forEach(i => {
    const id = i.id;
    const labelled = i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')
      || (id && document.querySelector(`label[for="${id}"]`))
      || i.closest('label');
    if (!labelled) out.inputsNoLabel.push((i.name || i.placeholder || 'unnamed').slice(0, 60));
  });
  out.h1 = document.querySelectorAll('h1').length;
  ['h1','h2','h3','h4','h5','h6'].forEach(h => out.hCount[h] = document.querySelectorAll(h).length);
  out.docWidth = document.documentElement.scrollWidth;
  out.winWidth = window.innerWidth;
  out.lang = document.documentElement.lang;
  out.bodyText = (document.body.innerText || '').slice(0, 200);
  return out;
}
"""

async def main():
    findings = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 390, "height": 844})
        page = await ctx.new_page()
        console_msgs = []
        page.on("console", lambda m: console_msgs.append(f"{m.type}: {m.text[:200]}") if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: console_msgs.append(f"pageerror: {str(e)[:200]}"))

        for path in PAGES:
            url = BASE + path
            try:
                resp = await page.goto(url, wait_until="networkidle", timeout=30000)
                await page.wait_for_timeout(400)
                audit = await page.evaluate(JS_AUDIT)
                findings[path] = {
                    "status": resp.status if resp else None,
                    "audit": audit,
                    "h_overflow": audit["docWidth"] > audit["winWidth"] + 1,
                }
            except Exception as e:
                findings[path] = {"error": str(e)[:200]}

        # transfer weight on home (mobile UA, cached resources off)
        ctx2 = await browser.new_context(viewport={"width": 390, "height": 844})
        page2 = await ctx2.new_page()
        total = {"bytes": 0, "requests": 0}
        async def on_resp(r):
            try:
                body = await r.body()
                total["bytes"] += len(body)
                total["requests"] += 1
            except Exception:
                pass
        page2.on("response", on_resp)
        await page2.goto(BASE + "/", wait_until="networkidle", timeout=45000)
        await page2.wait_for_timeout(2500)
        findings["_home_weight_mobile"] = {
            "requests": total["requests"],
            "kb_uncompressed_wire": round(total["bytes"] / 1024),
        }

        # keyboard: tab through home, verify focus ring visibility on first 12 stops
        kb = await page.evaluate("""
        async () => {
          const visible = [];
          for (let i = 0; i < 14; i++) {
            const el = document.activeElement;
            if (el && el !== document.body) {
              const st = getComputedStyle(el);
              const fw = st.outlineStyle !== 'none' && parseFloat(st.outlineWidth) > 0;
              const ring = (st.boxShadow || '').includes('0') && el.className && String(el.className).includes('focus');
              visible.push({ tag: el.tagName, txt: (el.textContent || '').trim().slice(0, 30), outline: fw });
            }
            const ev = new KeyboardEvent('keydown', { key: 'Tab' });
            document.dispatchEvent(ev);
            await new Promise(r => setTimeout(r, 30));
            const focusables = document.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const idx = Array.prototype.indexOf.call(focusables, document.activeElement);
            if (idx >= 0 && idx + 1 < focusables.length) focusables[idx + 1].focus();
            else break;
          }
          return visible;
        }
        """)
        findings["_keyboard_home"] = kb
        findings["_console"] = [c for c in console_msgs if "Download the React DevTools" not in c][:15]

        await browser.close()

    print(json.dumps(findings, indent=1, ensure_ascii=False))

asyncio.run(main())
