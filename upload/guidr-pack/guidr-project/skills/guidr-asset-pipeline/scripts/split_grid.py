#!/usr/bin/env python3
"""Split a photo contact sheet (2 rows x 3 columns, thin white gutters) into separate JPEGs.

Usage: python split_grid.py SHEET.jpg OUT_DIR [--cols 3] [--rows 2] [--names a,b,c,d,e,f] [--trim 4]
Finds gutters by looking for near-white rows/columns; falls back to equal division.
"""
import argparse, os
import numpy as np
from PIL import Image

def runs(is_gutter):
    """Return (start, end) ranges of non-gutter segments."""
    segs, start = [], None
    for i, g in enumerate(is_gutter):
        if not g and start is None: start = i
        if g and start is not None:
            if i - start > 20: segs.append((start, i))
            start = None
    if start is not None and len(is_gutter) - start > 20: segs.append((start, len(is_gutter)))
    return segs

def main():
    p = argparse.ArgumentParser()
    p.add_argument('sheet'); p.add_argument('out')
    p.add_argument('--cols', type=int, default=3); p.add_argument('--rows', type=int, default=2)
    p.add_argument('--names', default=''); p.add_argument('--trim', type=int, default=4)
    p.add_argument('--quality', type=int, default=92)
    a = p.parse_args()
    os.makedirs(a.out, exist_ok=True)
    im = Image.open(a.sheet).convert('RGB'); arr = np.asarray(im).astype(np.int16)
    W, H = im.size
    white = arr.min(axis=2) > 235
    col_g = white.mean(axis=0) > 0.97; row_g = white.mean(axis=1) > 0.97
    xs, ys = runs(col_g), runs(row_g)
    if len(xs) != a.cols: xs = [(round(i * W / a.cols), round((i + 1) * W / a.cols)) for i in range(a.cols)]
    if len(ys) != a.rows: ys = [(round(i * H / a.rows), round((i + 1) * H / a.rows)) for i in range(a.rows)]
    names = [n for n in a.names.split(',') if n]
    k = 0
    for (y0, y1) in ys:
        for (x0, x1) in xs:
            t = a.trim
            tile = im.crop((x0 + t, y0 + t, x1 - t, y1 - t))
            name = names[k] if k < len(names) else f'panel-{k+1:02d}'
            tile.save(os.path.join(a.out, f'{name}.jpg'), quality=a.quality, optimize=True)
            print(name, tile.size); k += 1

if __name__ == '__main__':
    main()
