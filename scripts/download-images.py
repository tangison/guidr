#!/usr/bin/env python3
"""Download searched images into public/images with the paths the seed expects."""
import json
import os
import urllib.request

SRC = "/home/z/my-project/scripts/img-json"
DEST = "/home/z/my-project/public/images"

# key -> list of target relative paths (in order; extra results fill extras)
MAPPING = {
    "hero-dunes": ["hero-dunes.jpg"],
    "quad-biking": ["experiences/quad-biking.jpg", "experiences/quad-biking-2.jpg"],
    "sandboarding": ["experiences/sandboarding.jpg", "experiences/sandboarding-2.jpg"],
    "catamaran": ["experiences/catamaran.jpg", "experiences/catamaran-2.jpg"],
    "kayaking": ["experiences/kayaking.jpg", "experiences/kayaking-2.jpg"],
    "flamingos": ["destinations/walvis-bay.jpg"],
    "balloon": ["experiences/balloon.jpg", "experiences/balloon-2.jpg"],
    "deadvlei": ["experiences/deadvlei.jpg", "experiences/deadvlei-2.jpg", "destinations/sossusvlei.jpg"],
    "dune45": ["experiences/dune45.jpg", "experiences/dune45-2.jpg"],
    "etosha": ["experiences/etosha.jpg", "experiences/etosha-2.jpg", "destinations/etosha.jpg"],
    "desert-elephant": ["experiences/desert-elephant.jpg", "experiences/desert-elephant-2.jpg", "destinations/damaraland.jpg"],
    "fishriver": ["experiences/fishriver.jpg", "experiences/fishriver-2.jpg", "destinations/fish-river.jpg"],
    "spitzkoppe-night": ["experiences/spitzkoppe-night.jpg", "experiences/spitzkoppe-night-2.jpg", "destinations/spitzkoppe.jpg"],
    "rock-art": ["experiences/rock-art.jpg", "experiences/rock-art-2.jpg"],
    "kolmanskop": ["experiences/kolmanskop.jpg", "experiences/kolmanskop-2.jpg"],
    "swakopmund": ["destinations/swakopmund.jpg"],
    "sesriem": ["experiences/sesriem.jpg", "experiences/sesriem-2.jpg"],
    "desert-walk": ["experiences/desert-walk.jpg"],
    "guide-portrait": ["people/guide-1.jpg", "people/guide-2.jpg"],
    "living-desert": ["experiences/living-desert.jpg", "experiences/living-desert-2.jpg"],
    "scenic-flight": ["experiences/scenic-flight.jpg", "experiences/scenic-flight-2.jpg"],
}


def main():
    for d in ("", "experiences", "destinations", "people"):
        os.makedirs(os.path.join(DEST, d), exist_ok=True)

    ok, miss = 0, []
    for key, targets in MAPPING.items():
        src = os.path.join(SRC, f"{key}.json")
        if not os.path.exists(src):
            miss.append(key)
            continue
        try:
            data = json.load(open(src))
        except Exception:
            miss.append(key)
            continue
        results = data.get("results", [])
        if not results:
            miss.append(key)
            continue
        for i, target in enumerate(targets):
            if i >= len(results):
                break
            url = results[i]["original_url"]
            out = os.path.join(DEST, target)
            if os.path.exists(out) and os.path.getsize(out) > 20000:
                continue
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=60) as r, open(out, "wb") as f:
                    f.write(r.read())
                ok += 1
                print(f"OK  {target}  <- {results[i].get('source', '?')}")
            except Exception as e:
                print(f"FAIL {target}: {e}")
                miss.append(key)

    print(f"\nDownloaded: {ok}")
    if miss:
        print("Missing keys:", ", ".join(miss))


if __name__ == "__main__":
    main()
