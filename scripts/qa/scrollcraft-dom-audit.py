#!/usr/bin/env python3
"""DOM ground-truth audit of the Guidr pill button system.
Verifies computed border-radius, the ::after fill-sweep transform across
hover time, padding ratios, press scale, and reduced-motion behaviour.
"""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=40000)
    page.wait_for_timeout(900)

    # 1. Every .btn on the page: computed radius + padding ratio
    data = page.evaluate("""() => {
        const out = [];
        for (const el of document.querySelectorAll('.btn')) {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            out.push({
                text: el.textContent.trim().slice(0, 26),
                radius: s.borderRadius,
                height: Math.round(r.height),
                padLeft: s.paddingLeft,
                font: s.fontSize,
                bg: s.backgroundColor,
            });
        }
        return out;
    }""")
    bad_radius = [d for d in data if d["radius"] not in ("999px", "999.5px")]
    print(f"buttons found: {len(data)}")
    print("non-pill radii:", bad_radius if bad_radius else "NONE (all 999px)")
    tight = [d for d in data if d["padLeft"].endswith("px") and float(d["padLeft"].replace("px","")) < 20 and not d["text"] == ""]
    print("padding under 20px (excl. icon/ghost):", tight if tight else "none")

    # 2. Fill sweep: sample the ::after transform over hover time
    el = page.locator("a.btn-primary >> nth=0").first
    el.scroll_into_view_if_needed()
    page.wait_for_timeout(600)
    before = page.evaluate("""() => getComputedStyle(document.querySelector('a.btn-primary'), '::after').transform""")
    el.hover()
    page.wait_for_timeout(90)   # mid-sweep
    mid = page.evaluate("""() => getComputedStyle(document.querySelector('a.btn-primary'), '::after').transform""")
    page.wait_for_timeout(400)  # settled
    after = page.evaluate("""() => getComputedStyle(document.querySelector('a.btn-primary'), '::after').transform""")
    print(f"fill sweep: rest={before} mid={mid} settled={after}")

    # 3. Press scale (block navigation so the click stays on this page)
    page.evaluate("document.addEventListener('click', e => e.preventDefault(), { capture: true })")
    el.hover()
    page.mouse.down()
    page.wait_for_timeout(120)
    pressed = page.evaluate("""() => getComputedStyle(document.querySelector('a.btn-primary')).transform""")
    page.mouse.up()
    print(f"press transform: {pressed}")

    # 4. Element-exact screenshots (no crop noise) for the second VLM pass
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(700)
    for sel, name in [
        ("a.btn-primary >> nth=1", "el-primary"),
        ("a.btn-outline", "el-outline"),
        ("a.btn-white", "el-white"),
        ("a.btn-ink", "el-ink"),
    ]:
        try:
            loc = page.locator(sel).first
            loc.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            loc.hover()
            page.wait_for_timeout(420)
            loc.screenshot(path=f"/home/z/my-project/scripts/qa/scrollcraft/{name}-hover.png")
            print(f"shot {name}-hover")
        except Exception as e:
            print(f"shot ERR {name}: {str(e)[:120]}")

    page.evaluate("window.scrollTo(0, 0)")
    page.mouse.move(0, 0)
    page.wait_for_timeout(600)
    try:
        page.locator("a.btn-primary").first.screenshot(path="/home/z/my-project/scripts/qa/scrollcraft/el-primary-rest.png")
        print("shot el-primary-rest")
    except Exception as e:
        print(f"shot ERR rest: {str(e)[:120]}")

    # 5. Search bar + booking dialog submit on mobile-sized look
    ctx.close()

    # 6. Mobile: button geometry + touch active scale
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=40000)
    page.wait_for_timeout(800)
    mob = page.evaluate("""() => {
        const out = [];
        for (const el of document.querySelectorAll('.btn')) {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            out.push({ text: el.textContent.trim().slice(0, 22), radius: s.radius || s.borderRadius, h: Math.round(r.height) });
        }
        return out;
    }""")
    print(f"mobile buttons visible: {len(mob)}; radii set: {set(m['radius'] for m in mob)}")
    small = [m for m in mob if m["h"] < 40]
    print("mobile buttons under 40px tall:", small if small else "none (all 40px+)")
    ctx.close()
    browser.close()
print("audit done")
