from playwright.sync_api import sync_playwright
import json
PAGES = [("home","/"),("detail","/experiences/pelican-point-seal-kayaking"),("planner","/planner"),("about","/about"),("operators","/for-operators")]
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for tag, path in PAGES:
        for tag2, vp in [("desktop",{"width":1440,"height":900}),("mobile",{"width":390,"height":844})]:
            pg = b.new_page(viewport=vp)
            pg.goto("http://localhost:3000"+path, wait_until="networkidle")
            pg.wait_for_timeout(400)
            issues = pg.evaluate("""() => {
                const out = [];
                document.querySelectorAll('main *').forEach(el => {
                    if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0) {
                        const cs = getComputedStyle(el);
                        if (cs.overflow === 'hidden' || cs.overflowY === 'hidden' || el.classList.contains('line-clamp-2') || el.classList.contains('line-clamp-3')) {
                            if (!el.closest('[aria-hidden="true"]')) {
                                out.push({tag: el.tagName, cls: (el.className.baseVal||el.className||'').toString().slice(0,70), text: (el.textContent||'').trim().slice(0,40), sh: el.scrollHeight, ch: el.clientHeight});
                            }
                        }
                    }
                });
                return out.slice(0, 12);
            }""")
            hscroll = pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
            print(f"== {tag}-{tag2} hoverflow={hscroll}px")
            for i in issues: print("   CLIP:", i)
            pg.close()
    b.close()
