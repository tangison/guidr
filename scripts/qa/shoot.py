#!/usr/bin/env python3
"""Screenshot all key Guidr pages at desktop + mobile for the taste pass."""
import os
from playwright.sync_api import sync_playwright

OUT = "/home/z/my-project/scripts/qa"
os.makedirs(OUT, exist_ok=True)

PAGES = [
    ("home", "/"),
    ("experiences", "/experiences"),
    ("experience-detail", "/experiences/sossusvlei-dune-45-sunrise-climb"),
    ("destinations", "/destinations"),
    ("destination-detail", "/destinations/sossusvlei"),
    ("planner", "/planner"),
    ("how-it-works", "/how-it-works"),
    ("for-operators", "/for-operators"),
    ("about", "/about"),
    ("legal", "/legal/terms"),
    ("not-found", "/definitely-not-a-page"),
]

BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for tag, vp in [("desktop", {"width": 1440, "height": 900}),
                    ("mobile", {"width": 390, "height": 844})]:
        ctx = browser.new_context(viewport=vp, device_scale_factor=2)
        page = ctx.new_page()
        for name, path in PAGES:
            try:
                page.goto(BASE + path, wait_until="networkidle", timeout=30000)
                page.wait_for_timeout(600)
                page.screenshot(path=f"{OUT}/{name}-{tag}.png", full_page=True)
                print(f"OK  {name}-{tag}")
            except Exception as e:
                print(f"ERR {name}-{tag}: {e}")
        ctx.close()
    browser.close()
print("done")
