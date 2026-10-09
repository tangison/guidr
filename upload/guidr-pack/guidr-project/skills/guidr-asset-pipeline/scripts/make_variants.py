#!/usr/bin/env python3
"""Create web-ready variants of images: AVIF and WebP at several widths, plus a tiny blur preview.

Usage:
  python make_variants.py SRC_DIR OUT_DIR [--widths 480,960,1600] [--q-webp 82] [--q-avif 55]
Photos (.jpg/.jpeg/.png without alpha) -> name-{w}.webp, name-{w}.avif. Never upscales beyond source width.
Cut-outs (PNG/WebP with alpha) -> name.webp (alpha preserved, max 1200 px), flagged if over 150 KB.
Writes manifest.json with sizes, aspect ratio, dominant colour and a 24px base64 blur preview.
"""
import argparse, base64, io, json, os
from PIL import Image

def dominant(im):
    s = im.convert('RGB').resize((1, 1), Image.BOX).getpixel((0, 0))
    return '#%02x%02x%02x' % s

def blur_preview(im):
    t = im.convert('RGB'); t.thumbnail((24, 24))
    b = io.BytesIO(); t.save(b, 'JPEG', quality=40)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()

def main():
    p = argparse.ArgumentParser()
    p.add_argument('src'); p.add_argument('out')
    p.add_argument('--widths', default='480,960,1600')
    p.add_argument('--q-webp', type=int, default=82); p.add_argument('--q-avif', type=int, default=55)
    a = p.parse_args(); os.makedirs(a.out, exist_ok=True)
    widths = [int(w) for w in a.widths.split(',')]
    manifest = {}
    for f in sorted(os.listdir(a.src)):
        base, ext = os.path.splitext(f)
        if ext.lower() not in ('.jpg', '.jpeg', '.png', '.webp'): continue
        im = Image.open(os.path.join(a.src, f))
        has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        entry = {'width': im.width, 'height': im.height, 'ratio': round(im.width / im.height, 4), 'files': []}
        if has_alpha:
            im = im.convert('RGBA')
            if im.width > 1200: im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
            path = os.path.join(a.out, base + '.webp'); im.save(path, quality=88, method=6)
            kb = os.path.getsize(path) / 1024
            entry['files'].append({'file': base + '.webp', 'kb': round(kb)}); entry['kind'] = 'cutout'
            if kb > 150: entry['warning'] = 'over 150 KB budget'
        else:
            im = im.convert('RGB'); entry['kind'] = 'photo'; entry['dominant'] = dominant(im); entry['blur'] = blur_preview(im)
            for w in widths:
                if w > im.width and w != widths[0]: continue
                t = im if w >= im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
                for fmt, q in (('webp', a.q_webp), ('avif', a.q_avif)):
                    name = f'{base}-{t.width}.{fmt}'; path = os.path.join(a.out, name)
                    t.save(path, quality=q); entry['files'].append({'file': name, 'kb': round(os.path.getsize(path) / 1024)})
        manifest[base] = entry
    json.dump(manifest, open(os.path.join(a.out, 'manifest.json'), 'w'), indent=2)
    print(f'{len(manifest)} images processed; manifest.json written')

if __name__ == '__main__':
    main()
