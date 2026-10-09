#!/usr/bin/env python3
"""Split a cut-out sheet (objects on a near-white background) into transparent PNG/WebP files.

Usage:
  python split_cutouts.py SHEET.jpg OUT_DIR [--names a,b,c,d,e,f] [--white 238] [--feather 1.2]
                          [--min-area 0.004] [--pad 6] [--max-width 1200]

How it works
  1. Build an "object mask" from pixels that are not near white (min channel below --white).
  2. Close small gaps (so thin parts such as rigging stay connected) and find separate objects.
  3. Order objects top-to-bottom, left-to-right, so --names match the sheet layout.
  4. For each object: soft alpha from distance to white (anti-aliased edge), remove white fringe by
     un-premultiplying against white, crop with padding, save PNG (master) and WebP (web).
Always review results on a dark and a light background. White-on-white parts (for example a white
aircraft) may need manual touch-up or a regenerated image with darker trim.
"""
import argparse, os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

def object_mask(rgb, white):
    a = np.asarray(rgb).astype(np.int16)
    not_white = a.min(axis=2) < white
    return not_white

def soft_alpha(rgb, white):
    a = np.asarray(rgb).astype(np.float32)
    # distance from white: 0 at pure white, 1 when clearly coloured/dark
    d = (255.0 - a.min(axis=2))
    lo, hi = 255 - white, 255 - white + 40
    return np.clip((d - lo) / (hi - lo), 0, 1)

def decontaminate(rgb, alpha):
    # remove white fringe: c = (observed - (1-alpha)*white) / alpha
    a = np.asarray(rgb).astype(np.float32)
    al = np.clip(alpha, 1e-3, 1)[..., None]
    c = (a - (1 - al) * 255.0) / al
    return np.clip(c, 0, 255).astype(np.uint8)

def main():
    p = argparse.ArgumentParser()
    p.add_argument('sheet'); p.add_argument('out')
    p.add_argument('--names', default='')
    p.add_argument('--white', type=int, default=238)
    p.add_argument('--feather', type=float, default=1.2)
    p.add_argument('--min-area', type=float, default=0.004)
    p.add_argument('--pad', type=int, default=6)
    p.add_argument('--max-width', type=int, default=1200)
    p.add_argument('--close', type=int, default=9)
    a = p.parse_args()

    os.makedirs(a.out, exist_ok=True)
    im = Image.open(a.sheet).convert('RGB')
    W, H = im.size
    mask = object_mask(im, a.white)
    closed = ndi.binary_closing(mask, structure=np.ones((a.close, a.close)))
    closed = ndi.binary_opening(closed, structure=np.ones((3, 3)))
    lab, n = ndi.label(closed)
    objs = []
    for i, sl in enumerate(ndi.find_objects(lab), start=1):
        if sl is None: continue
        area = (lab[sl] == i).sum()
        if area < a.min_area * W * H: continue
        y0, y1 = sl[0].start, sl[0].stop; x0, x1 = sl[1].start, sl[1].stop
        objs.append((i, x0, y0, x1, y1, area))
    if not objs:
        sys.exit('No objects found. Try a lower --white value (for example 225).')
    # order: rows by vertical centre bands, then left to right
    rows = sorted(objs, key=lambda o: (o[2] + o[4]) / 2)
    band = H / 3.0
    def rowkey(o): return int(((o[2] + o[4]) / 2) // (H / 2))
    rows = sorted(objs, key=lambda o: (rowkey(o), o[1]))
    names = [n for n in a.names.split(',') if n]
    report = []
    for k, (i, x0, y0, x1, y1, area) in enumerate(rows):
        x0 = max(0, x0 - a.pad); y0 = max(0, y0 - a.pad); x1 = min(W, x1 + a.pad); y1 = min(H, y1 + a.pad)
        crop = im.crop((x0, y0, x1, y1))
        alpha = soft_alpha(crop, a.white)
        # keep only this object's region (avoid neighbours bleeding in)
        region = ndi.binary_dilation(lab[y0:y1, x0:x1] == i, iterations=a.close)
        alpha = alpha * region
        al_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(a.feather / 2))
        alpha = np.asarray(al_img).astype(np.float32) / 255
        rgb = decontaminate(crop, alpha)
        out = Image.fromarray(np.dstack([rgb, (alpha * 255).astype(np.uint8)]), 'RGBA')
        bb = out.getbbox()
        if bb: out = out.crop(bb)
        if out.width > a.max_width:
            out = out.resize((a.max_width, round(out.height * a.max_width / out.width)), Image.LANCZOS)
        name = names[k] if k < len(names) else f'object-{k+1:02d}'
        out.save(os.path.join(a.out, f'{name}.png'), optimize=True)
        out.save(os.path.join(a.out, f'{name}.webp'), quality=88, method=6)
        kb = os.path.getsize(os.path.join(a.out, f'{name}.webp')) / 1024
        report.append((name, out.size, round(kb)))
    for r in report: print(f'{r[0]:28s} {r[1][0]}x{r[1][1]}  webp {r[2]} KB')
    print(f'{len(report)} objects written to {a.out}')

if __name__ == '__main__':
    main()
