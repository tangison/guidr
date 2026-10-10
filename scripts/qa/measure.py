from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:3000/", wait_until="networkidle")
    pg.wait_for_timeout(500)
    secs = pg.eval_on_selector_all("main section", """els => els.map((el,i) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const img = el.querySelector('img');
        const ir = img ? img.getBoundingClientRect() : null;
        const firstChild = el.querySelector('h2,h3,p.eyebrow');
        return {i, cls: el.className.slice(0,60), h: Math.round(r.height),
                padTop: cs.paddingTop, padBottom: cs.paddingBottom,
                firstTop: firstChild ? Math.round(firstChild.getBoundingClientRect().top - r.top) : null,
                imgRadius: img ? getComputedStyle(img).borderRadius : null};
    })""")
    for s in secs: print(s)
    b.close()
