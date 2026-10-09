from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    # 1. Planner header: CTA hidden?
    pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:3000/planner", wait_until="networkidle")
    pg.wait_for_timeout(400)
    has_cta = pg.locator("header a:has-text('Plan my trip')").count()
    print("planner header CTA count (expect 0):", has_cta)
    # 2. Home header: CTA present
    pg.goto("http://localhost:3000/", wait_until="networkidle")
    pg.wait_for_timeout(400)
    print("home header CTA count (expect >=1):", pg.locator("header a:has-text('Plan my trip')").count())
    # 3. Mobile sheet opens and shows lockup
    m = b.new_page(viewport={"width":390,"height":844})
    m.goto("http://localhost:3000/", wait_until="networkidle")
    m.wait_for_timeout(400)
    m.click("button[aria-label='Open menu']")
    m.wait_for_timeout(600)
    print("mobile sheet logo visible:", m.locator("[data-state='open'] svg[aria-label='Guidr']").count() > 0)
    print("mobile sheet nav links:", m.locator("[data-state='open'] nav a").count())
    m.keyboard.press("Escape")
    # 4. Review teaser links
    pg.wait_for_timeout(300)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight*0.8)")
    pg.wait_for_timeout(400)
    print("review teaser links:", pg.locator("a[href*='#reviews']").count())
    # 5. Favicon + og served
    for path in ["/icon.svg", "/apple-icon.png", "/og.jpg", "/brand/tangison-light-64.png", "/logo.svg"]:
        r = pg.request.get("http://localhost:3000"+path)
        print(path, r.status, len(r.body()) if r.ok else "")
    b.close()
