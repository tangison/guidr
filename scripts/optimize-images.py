#!/usr/bin/env python3
"""
Guidr image pipeline: optimize generated art-directed PNGs into lean
progressive JPGs at the exact public/images paths the site references,
then remove every fetched stock photo (including the people/ folder).

Keeps the mobile transfer budget under control: each card image lands
well under 250 KB at 1344px wide.
"""
import os
import shutil
from PIL import Image

SRC = "/home/z/my-project/scripts/img-gen"
IMG = "/home/z/my-project/public/images"

# generated name -> final destination path (same paths the seeds use)
TARGETS = {
    "hero-dunes": f"{IMG}/hero-dunes.jpg",
    # destinations
    "swakopmund": f"{IMG}/destinations/swakopmund.jpg",
    "walvis-bay": f"{IMG}/destinations/walvis-bay.jpg",
    "sossusvlei": f"{IMG}/destinations/sossusvlei.jpg",
    "etosha": f"{IMG}/destinations/etosha.jpg",
    "damaraland": f"{IMG}/destinations/damaraland.jpg",
    "fish-river": f"{IMG}/destinations/fish-river.jpg",
    "spitzkoppe": f"{IMG}/destinations/spitzkoppe.jpg",
    # experiences
    "quad-biking": f"{IMG}/experiences/quad-biking.jpg",
    "sandboarding": f"{IMG}/experiences/sandboarding.jpg",
    "catamaran": f"{IMG}/experiences/catamaran.jpg",
    "kayaking": f"{IMG}/experiences/kayaking.jpg",
    "living-desert": f"{IMG}/experiences/living-desert.jpg",
    "scenic-flight": f"{IMG}/experiences/scenic-flight.jpg",
    "balloon": f"{IMG}/experiences/balloon.jpg",
    "dune45": f"{IMG}/experiences/dune45.jpg",
    "deadvlei": f"{IMG}/experiences/deadvlei.jpg",
    "sesriem": f"{IMG}/experiences/sesriem.jpg",
    "desert-elephant": f"{IMG}/experiences/desert-elephant.jpg",
    "fishriver-hike": f"{IMG}/experiences/fishriver.jpg",
    "spitzkoppe-night": f"{IMG}/experiences/spitzkoppe-night.jpg",
    "rock-art": f"{IMG}/experiences/rock-art.jpg",
    "kolmanskop": f"{IMG}/experiences/kolmanskop.jpg",
    "desert-walk": f"{IMG}/experiences/desert-walk.jpg",
}


def optimize(name: str, dest: str, max_w: int = 1344, quality: int = 80) -> None:
    src = os.path.join(SRC, f"{name}.png")
    im = Image.open(src)
    if im.mode != "RGB":
        im = im.convert("RGB")
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, round(im.height * ratio)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    kb = os.path.getsize(dest) // 1024
    print(f"  {name:20s} -> {os.path.relpath(dest, IMG):32s} {im.width}x{im.height}  {kb} KB")


def purge_stock() -> None:
    """Remove every fetched stock photo and the people/ folder."""
    removed = 0
    for root, _dirs, files in os.walk(IMG):
        for f in files:
            p = os.path.join(root, f)
            rel = os.path.relpath(p, IMG)
            # keep only the files we just wrote
            if rel.replace("\\", "/") not in {
                os.path.relpath(v, IMG).replace("\\", "/") for v in TARGETS.values()
            }:
                os.remove(p)
                removed += 1
    people = os.path.join(IMG, "people")
    if os.path.isdir(people):
        shutil.rmtree(people)
        removed += 2
    print(f"  purged {removed} stock files")


if __name__ == "__main__":
    print("Optimizing generated art:")
    for name, dest in TARGETS.items():
        optimize(name, dest)
    print("Purging stock photography:")
    purge_stock()
    total = sum(
        os.path.getsize(os.path.join(r, f))
        for r, _d, fs in os.walk(IMG)
        for f in fs
    )
    print(f"Total public/images: {total // 1024} KB across {sum(len(fs) for _, _, fs in os.walk(IMG))} files")
