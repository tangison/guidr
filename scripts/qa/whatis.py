from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:3000/", wait_until="networkidle")
    pg.wait_for_timeout(500)
    out = pg.eval_on_selector_all("main section", """els => els.map((el,i) => ({
        i, label: el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || '(none)',
        text: el.textContent.trim().slice(0, 60),
        html: el.innerHTML.trim().slice(0, 120)
    }))""")
    for s in out: print(s['i'], '|', s['label'], '|', repr(s['text'][:40]), '|', s['html'][:100])
    b.close()
