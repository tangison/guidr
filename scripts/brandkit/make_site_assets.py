#!/usr/bin/env python3
"""Produce right-sized brand assets for the site:
- public/brand/tangison-light-64.png (footer credit, retina-ready)
- src/app/apple-icon.png (180x180, terracotta + cream footprint)
- public/og.png (1200x630 Open Graph card with the REAL lockup)
All logo geometry is the exact brand identity kit geometry."""
import os
import cairosvg
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

ROOT = "/home/z/my-project"
BK = os.path.join(ROOT, "scripts/brandkit")

# ---- 1. Tangison footer logo, right-sized ----
tg = Image.open(os.path.join(ROOT, "upload/brand-kit/brand-identity-kit/assets/tg_light.png"))
h = 64
w = round(tg.width * h / tg.height)
tg.resize((w, h), Image.LANCZOS).save(os.path.join(ROOT, "public/brand/tangison-light-64.png"), optimize=True)
print("tangison-light-64:", w, "x", h)

# ---- 2. apple-icon.png (180x180) ----
ICON_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#C4552D"/>
  <g transform="translate(256 256) scale(0.58) translate(-100 -300)" fill="#FFF4EA">
    <path d="M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z"/>
    <path d="M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z"/>
  </g>
</svg>'''
cairosvg.svg2png(bytestring=ICON_SVG.encode(), write_to=os.path.join(ROOT, "src/app/apple-icon.png"),
                 output_width=180, output_height=180)
print("apple-icon.png done")

# ---- 3. OG image 1200x630: hero dunes + scrim + real lockup ----
W, H = 1200, 630
src = Image.open(os.path.join(ROOT, "public/images/hero-dunes.jpg")).convert("RGB")
# crop to 1.91:1 around the upper-middle (sky for the headline)
sw, sh = src.size
target = W / H
if sw / sh > target:
    nw = int(sh * target)
    x0 = (sw - nw) // 2
    src = src.crop((x0, 0, x0 + nw, sh))
else:
    nh = int(sw / target)
    src = src.crop((0, 0, sw, nh))
img = src.resize((W, H), Image.LANCZOS)
img = ImageEnhance.Color(img).enhance(1.04)
img = ImageEnhance.Contrast(img).enhance(1.02)
# bottom-to-top ink scrim (strong, brand-standard) + soft top scrim for the sky
scrim = Image.new("L", (1, H))
for y in range(H):
    t = y / H
    bottom = 0.92 * max(0.0, (t - 0.05) / 0.95) ** 1.15
    top = 0.45 * max(0.0, (0.35 - t) / 0.35) ** 1.4
    scrim.putpixel((0, y), int(255 * min(1.0, bottom + top)))
scrim = scrim.resize((W, H))
img = Image.composite(Image.new("RGB", (W, H), (26, 21, 23)), img, scrim)
# grain on hero (brand treatment, kills gradient banding)
import random
random.seed(7)
noise = Image.effect_noise((W, H), 16).convert("RGB")
img = Image.blend(img, noise, 0.055)
d = ImageDraw.Draw(img)

# real lockup, white with LT accent (rendered from exact geometry, big)
LOCKUP = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-19 -70 579 240">
  <g stroke="#FFFFFF" stroke-width="8" fill="none" stroke-linecap="butt" stroke-linejoin="round">
    <path d="M70 0L35 0A50 50 0 0 0 35 100L70 100L70 55L45 55"/>
    <path d="M100 0L100 65A35 35 0 0 0 170 65L170 0"/>
    <path d="M230 0L265 0A35 50 0 0 1 265 100L230 100"/>
    <path d="M330 100L330 0L365 0A25 25 0 0 1 365 50L330 50"/>
    <path d="M365 50L395 100"/>
  </g>
  <path d="M200 0L200 100" stroke="#E0673A" stroke-width="8" stroke-linecap="butt"/>
  <g transform="translate(476,-70) scale(0.4)" fill="#FFFFFF">
    <path d="M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z"/>
    <path d="M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z"/>
  </g>
</svg>'''
LW = 440
cairosvg.svg2png(bytestring=LOCKUP.encode(), write_to=os.path.join(BK, "og-lockup.png"),
                 output_width=LW, background_color=None)
lockup = Image.open(os.path.join(BK, "og-lockup.png"))
lx, ly = 72, H - 84 - lockup.height
img.paste(lockup, (lx, ly), lockup)

# mustard footprint trail walking up to the right of the lockup
TRAIL = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -16 241 232">
  <g fill="#F2C240">
    <g transform="translate(16.67 160) rotate(-18) scale(0.16667) translate(-100 -300)">
      <path d="M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z"/>
      <path d="M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z"/>
    </g>
    <g transform="translate(96.17 120) rotate(-18) scale(0.20833) translate(-100 -300)">
      <path d="M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z"/>
      <path d="M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z"/>
    </g>
    <g transform="translate(184 80) rotate(-18) scale(0.25) translate(-100 -300)">
      <path d="M65 3C40 5 5 95 5 170C5 260 100 340 125 410C133 435 138 455 138 470C146 410 192 340 192 270C192 180 100 0 65 3Z"/>
      <path d="M25 477L160 477L160 540A60 60 0 0 1 100 600L85 600A60 60 0 0 1 25 540Z"/>
    </g>
  </g>
</svg>'''
TW = 300
cairosvg.svg2png(bytestring=TRAIL.encode(), write_to=os.path.join(BK, "og-trail.png"),
                 output_width=TW, background_color=None)
trail = Image.open(os.path.join(BK, "og-trail.png"))
tx, ty = lx + lockup.width + 44, ly + lockup.height - trail.height - 14
img.paste(trail, (tx, ty), trail)

# headline + domain (Poppins, per brand type)
FDIR = os.path.join(BK, "fonts")

def font(weight, size):
    return ImageFont.truetype(os.path.join(FDIR, f"Poppins-{weight}.ttf"), size)

d.text((72, 76), "Namibia, guided properly.", font=font("Bold", 60), fill=(255, 255, 255))
d.text((74, 158), "Curated local operators. Honest prices.", font=font("Regular", 29), fill=(255, 255, 255))
d.text((74, 200), "WhatsApp-first booking.", font=font("Regular", 29), fill=(255, 255, 255))
domain = "getguidr.com"
dw = d.textlength(domain, font=font("Medium", 26))
d.text((W - 72 - dw, H - 68), domain, font=font("Medium", 26), fill=(242, 194, 64))

img.save(os.path.join(ROOT, "public/og.jpg"), quality=90, optimize=True)
print("og.jpg done:", img.size)
