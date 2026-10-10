"""Crop, upscale, sharpen, grain and darken a photo so soft AI/stock images print and overlay well.
Usage (import): from prep_photo import prep
prep(Image.open(p).convert('RGB'), (x0,y0,x1,y1), 2400, 'out.jpg', [('flat',.3,0,0),('top',.85,0,.6),('bottom',.85,0,.4)])
Layers: ('flat', alpha) uniform dark; ('top', a_start, a_end, span) fade from top; ('bottom', ...) fade from bottom."""
from PIL import Image, ImageFilter, ImageDraw
def prep(im, box, W, out, layers=(), dark=(26,21,23), grain=0.05):
    x0,y0,x1,y1=box; im=im.crop(box); H=round(W*(y1-y0)/(x1-x0))
    im=im.resize((W,H),Image.LANCZOS).filter(ImageFilter.UnsharpMask(4,110,2))
    im=Image.blend(im,Image.effect_noise((W,H),16).convert('RGB'),grain)
    col=Image.new('RGB',(W,H),dark)
    for kind,a0,a1,span in layers:
        m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m)
        if kind=='flat': m=Image.new('L',(W,H),int(255*a0))
        else:
            for y in range(H):
                t=min(1,(y if kind=='top' else H-1-y)/(H*span)); d.line([(0,y),(W,y)],fill=int(255*(a0+(a1-a0)*t)))
        im=Image.composite(col,im,m)
    im.save(out,quality=90); return im.size
