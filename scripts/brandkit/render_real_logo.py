#!/usr/bin/env python3
"""
Render the REAL Guidr logo from the brand identity kit's exact vector geometry
(upload/brand-kit/brand-identity-kit/scripts/helpers.py). This is the source of
truth for the site's logo components.

Letter space: y-DOWN, cap height 100, stroke 8, butt caps, round joins.
Lockup: letters x -15..395, footprint at x 476..556 (scale 0.4 of the 200x600
shoe space, letter-y -70..170). Total bounds x -19..560 (incl. stroke), y -70..170.
"""
import math, os

OUT = os.path.dirname(os.path.abspath(__file__))

INK = "#1A1517"
TERRACOTTA = "#C4552D"   # accent I on light backgrounds
LT = "#E0673A"           # accent I on dark backgrounds (print kit: BN,LT / WH,LT)
BONE = "#ECEAE6"
MUSTARD = "#F2C240"
WHITE = "#FFFFFF"


def arc(cx, cy, rx, ry, a0, a1, n=48):
    """Exactly the helpers.py arc: sampled polyline."""
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cy + ry * math.sin(math.radians(a0 + (a1 - a0) * i / n)))
            for i in range(n + 1)]


def pts_to_path(pts):
    d = f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"
    for x, y in pts[1:]:
        d += f" L {x:.2f} {y:.2f}"
    return d


# ---- Wordmark strokes (exact helpers.py lockup geometry, y-down) ----
G = [(70, 0), (35, 0)] + arc(35, 50, 50, 50, -90, -270)[1:] + [(70, 100), (70, 55), (45, 55)]
U = [(100, 0)] + arc(135, 65, 35, 35, 180, 0) + [(170, 0)]
I = [(200, 0), (200, 100)]
D = [(230, 0), (265, 0)] + arc(265, 50, 35, 50, -90, 90)[1:] + [(230, 100)]
R = [(330, 100), (330, 0), (365, 0)] + arc(365, 25, 25, 25, -90, 90)[1:] + [(330, 50)]
R_LEG = [(365, 50), (395, 100)]

# ---- Footprint (exact helpers.py shoe_units geometry, y-down 200x600) ----
SOLE = ("M 65 3 "
        "C 40 5 5 95 5 170 "
        "C 5 260 100 340 125 410 "
        "C 133 435 138 455 138 470 "
        "C 146 410 192 340 192 270 "
        "C 192 180 100 0 65 3 Z")
heel_pts = [(25, 477), (160, 477)] + arc(100, 540, 60, 60, 0, 90) + arc(85, 540, 60, 60, 90, 180)
HEEL = pts_to_path(heel_pts) + " Z"

# Full lockup viewBox (letters incl. stroke extent + footprint)
VB_LOCKUP = "-19 -70 579 240"
# Footprint alone: shoe space 0..200 x, 0..600 y with small padding
VB_FP = "-4 -4 208 608"


def lockup_svg(color, accent, fp_color=None):
    fp_color = fp_color or color
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VB_LOCKUP}" width="579" height="240">
  <g stroke="{color}" stroke-width="8" fill="none" stroke-linecap="butt" stroke-linejoin="round">
    <path d="{pts_to_path(G)}"/>
    <path d="{pts_to_path(U)}"/>
    <path d="{pts_to_path(D)}"/>
    <path d="{pts_to_path(R)}"/>
    <path d="{pts_to_path(R_LEG)}"/>
  </g>
  <path d="{pts_to_path(I)}" stroke="{accent}" stroke-width="8" stroke-linecap="butt"/>
  <g transform="translate(476,-70) scale(0.4)" fill="{fp_color}">
    <path d="{SOLE}"/>
    <path d="{HEEL}"/>
  </g>
</svg>'''


def footprint_svg(color):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VB_FP}" width="100" height="291">
  <g fill="{color}">
    <path d="{SOLE}"/>
    <path d="{HEEL}"/>
  </g>
</svg>'''


def trail_svg(color, sizes=(100, 130, 170), gap=118):
    """Footprint trail per print kit: mustard, all rotated -18 deg, ascending sizes."""
    parts = []
    x = 0
    for i, s in enumerate(sizes):
        w = s * 200 / 600
        parts.append(
            f'<g transform="translate({x:.0f} 0) rotate(-18 {w/2:.1f} {s/2:.1f}) scale({s/600:.4f})">'
            f'<path d="{SOLE}"/><path d="{HEEL}"/></g>')
        x += w + gap
    total_w = x - gap
    h = max(sizes)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w:.0f} {h:.0f}" width="{total_w/3:.0f}" height="{h/3:.0f}">
  <g fill="{color}">{''.join(parts)}</g>
</svg>'''


def save(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w") as f:
        f.write(content)
    return path


import cairosvg

# Lockup variants
save("guidr-lockup-ink.svg", lockup_svg(INK, TERRACOTTA))
save("guidr-lockup-white.svg", lockup_svg(WHITE, LT))
save("guidr-lockup-bone.svg", lockup_svg(BONE, LT))
save("guidr-footprint-ink.svg", footprint_svg(INK))
save("guidr-footprint-mustard.svg", footprint_svg(MUSTARD))
save("guidr-trail-mustard.svg", trail_svg(MUSTARD))

# Rasterize for inspection (white + bone backgrounds)
for name, bg in [("guidr-lockup-ink", "#FFFFFF"), ("guidr-lockup-white", "#1A1517"),
                 ("guidr-footprint-ink", "#FFFFFF"), ("guidr-footprint-mustard", "#1A1517"),
                 ("guidr-trail-mustard", "#FFFFFF")]:
    cairosvg.svg2png(url=os.path.join(OUT, name + ".svg"),
                     write_to=os.path.join(OUT, name + ".png"),
                     output_width=1200, background_color=bg)

# Comparison sheet: real lockup vs the current site approximation (two-ellipse
# footprint + recreated wordmark) side by side, labeled.
current_approx = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 104" width="560" height="104">
  <g stroke="#1A1517" stroke-width="7" fill="none" stroke-linecap="butt" stroke-linejoin="round">
    <path d="M 84 4 H 48 A 44 44 0 0 0 48 96 H 84 V 58 H 62"/>
    <path d="M 110 4 V 64 A 33 33 0 0 0 176 64 V 4"/>
    <path d="M 232 4 V 96 H 262 A 46 46 0 0 0 262 4 H 232"/>
    <path d="M 336 96 V 4 H 372 A 25 25 0 0 1 372 54 H 336"/>
    <path d="M 366 54 L 398 96"/>
  </g>
  <path d="M 202 4 V 96" stroke="#C4552D" stroke-width="10" stroke-linecap="butt"/>
  <g transform="translate(478, 2) scale(0.38)">
    <ellipse cx="100" cy="78" rx="52" ry="66" fill="#1A1517"/>
    <ellipse cx="100" cy="196" rx="34" ry="38" fill="#1A1517"/>
  </g>
</svg>'''
save("current-approx.svg", current_approx)
cairosvg.svg2png(url=os.path.join(OUT, "current-approx.svg"),
                 write_to=os.path.join(OUT, "current-approx.png"),
                 output_width=840, background_color="#FFFFFF")

# Tangison logo previews
from PIL import Image
for tag in ["light", "dark"]:
    im = Image.open(f"/home/z/my-project/upload/brand-kit/brand-identity-kit/assets/tg_{tag}.png")
    bgc = (26, 21, 23) if tag == "light" else (255, 255, 255)
    bg = Image.new("RGB", im.size, bgc)
    bg.paste(im, (0, 0), im)
    bg.save(os.path.join(OUT, f"tg-{tag}-preview.png"))

# Contact sheet PNG for VLM inspection
sheet = Image.new("RGB", (1240, 900), (247, 245, 241))
from PIL import ImageDraw
d = ImageDraw.Draw(sheet)

def paste(img_path, box, label):
    im = Image.open(img_path)
    im.thumbnail((box[2], box[3]))
    sheet.paste(im if im.mode == "RGB" else im.convert("RGB"), (box[0], box[1]))
    d.text((box[0], box[1] + box[3] + 6), label, fill=(26, 21, 23))

paste(os.path.join(OUT, "guidr-lockup-ink.png"), (20, 20, 1200, 420), "REAL lockup (helpers.py exact) - ink + terracotta I")
paste(os.path.join(OUT, "guidr-footprint-ink.png"), (20, 480, 180, 380), "REAL footprint")
paste(os.path.join(OUT, "guidr-trail-mustard.png"), (240, 480, 500, 380), "REAL trail -18deg")
paste(os.path.join(OUT, "current-approx.png"), (780, 480, 440, 380), "CURRENT site approximation")
sheet.save(os.path.join(OUT, "contact-sheet.png"))
print("done:", OUT)
