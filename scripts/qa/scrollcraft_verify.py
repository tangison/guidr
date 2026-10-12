#!/usr/bin/env python3
"""scroll-craft verification harness for the Guidr button + scroll pass.

Walks the home page (and key CTA surfaces) at discrete scroll positions on
desktop + mobile + reduced-motion, captures hover states of the new pill
buttons, checks horizontal overflow, and detects dead scroll (consecutive
identical frames) during the pinned manifesto walk.
"""
import os
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

OUT = "/home/z/my-project/scripts/qa/scrollcraft"
os.makedirs(OUT, exist_ok=True)
BASE = "http://localhost:3000"

def diff_ratio(a: Image.Image, b: Image.Image) -> float:
    """Fraction of pixels that changed between two same-size frames."""
    if a.size != b.size:
        return 1.0
    diff = ImageChops.difference(a.convert("RGB"), b.convert("RGB"))
    bbox = diff.getbbox()
    if bbox is None:
        return 0.0
    hist = diff.convert("L").histogram()
    changed = sum(hist[8:])  # ignore <=8/255 noise
    total = a.size[0] * a.size[1]
    return changed / total

def contact_sheet(paths, out, cols=4, w=420):
    imgs = [Image.open(p) for p in paths]
    rows = (len(imgs) + cols - 1) // cols
    scale = w / imgs[0].size[0]
    h = int(imgs[0].size[1] * scale)
    sheet = Image.new("RGB", (cols * w, rows * h), (24, 21, 23))
    for i, im in enumerate(imgs):
        sheet.paste(im.resize((w, h)), ((i % cols) * w, (i // cols) * h))
    sheet.save(out, quality=88)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # ---------- 1. Desktop scroll walk of the home page ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=40000)
    page.wait_for_timeout(800)
    doc_h = page.evaluate("document.body.scrollHeight")
    step = 620
    shots = []
    n = 0
    y = 0
    while y <= doc_h:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(420)
        path = f"{OUT}/home-d-{n:02d}.png"
        page.screenshot(path=path)
        shots.append(path)
        n += 1
        y += step
    contact_sheet(shots, f"{OUT}/sheet-home-desktop.jpg")
    print(f"desktop walk: {n} frames, doc height {doc_h}")

    # Dead-scroll detection on the walk
    dead = []
    for i in range(1, len(shots)):
        r = diff_ratio(Image.open(shots[i - 1]), Image.open(shots[i]))
        if r < 0.002:
            dead.append((i, r))
    print("dead-scroll frames:", dead if dead else "none")

    # ---------- 2. Hover states of the pill buttons ----------
    hover_cases = [
        ("hero-primary", "a.btn-primary >> nth=0"),
        ("hero-outline", "a.btn-outline >> nth=0"),
        ("manifesto-white", "a.btn-white >> nth=0"),
        ("ink-wa", "a.btn-ink >> nth=0"),
    ]
    for name, sel in hover_cases:
        try:
            el = page.locator(sel)
            el.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            el.hover()
            page.wait_for_timeout(450)
            box = el.bounding_box()
            if box:
                page.screenshot(
                    path=f"{OUT}/hover-{name}.png",
                    clip={"x": max(0, box["x"] - 40), "y": max(0, box["y"] - 30),
                          "width": box["width"] + 80, "height": box["height"] + 60},
                )
                print(f"hover OK {name}")
        except Exception as e:
            print(f"hover ERR {name}: {e}")
    # Press feedback
    try:
        el = page.locator("a.btn-primary >> nth=0")
        el.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        el.hover()
        page.mouse.down()
        page.wait_for_timeout(160)
        box = el.bounding_box()
        page.screenshot(
            path=f"{OUT}/press-primary.png",
            clip={"x": max(0, box["x"] - 40), "y": max(0, box["y"] - 30),
                  "width": box["width"] + 80, "height": box["height"] + 60},
        )
        page.mouse.up()
        print("press OK primary")
    except Exception as e:
        print(f"press ERR: {e}")
    ctx.close()

    # ---------- 3. Mobile walk (390x844) ----------
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=40000)
    page.wait_for_timeout(800)
    doc_h = page.evaluate("document.body.scrollHeight")
    shots = []
    n = 0
    y = 0
    step = 700
    while y <= doc_h:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(420)
        path = f"{OUT}/home-m-{n:02d}.png"
        page.screenshot(path=path)
        shots.append(path)
        n += 1
        y += step
    contact_sheet(shots, f"{OUT}/sheet-home-mobile.jpg")
    print(f"mobile walk: {n} frames, doc height {doc_h}")
    dead = []
    for i in range(1, len(shots)):
        r = diff_ratio(Image.open(shots[i - 1]), Image.open(shots[i]))
        if r < 0.002:
            dead.append((i, r))
    print("mobile dead-scroll frames:", dead if dead else "none")
    ctx.close()

    # ---------- 4. Reduced motion: content reachable + full page ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=40000)
    page.wait_for_timeout(700)
    page.screenshot(path=f"{OUT}/home-reduced-full.png", full_page=True)
    vis = page.evaluate("""() => {
        const bad = [];
        for (const el of document.querySelectorAll('a.btn, .btn')) {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            if (s.visibility === 'hidden' || Number(s.opacity) < 0.9) bad.push(el.textContent.trim());
        }
        return bad;
    }""")
    print("reduced-motion hidden buttons:", vis if vis else "none")
    ctx.close()

    # ---------- 5. Overflow check on key pages ----------
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    page = ctx.new_page()
    for path in ["/", "/experiences", "/experiences/sossusvlei-dune-45-sunrise-climb",
                 "/destinations", "/planner", "/for-operators", "/how-it-works", "/about"]:
        page.goto(BASE + path, wait_until="networkidle", timeout=40000)
        page.wait_for_timeout(400)
        ov = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        print(f"overflow {path}: {ov}px")
    # Mobile booking panel + search closeups
    page.goto(BASE + "/experiences/sossusvlei-dune-45-sunrise-climb", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/detail-mobile-top.png")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    page.screenshot(path=f"{OUT}/detail-mobile-bottom.png")
    ctx.close()
    browser.close()

print("done")
