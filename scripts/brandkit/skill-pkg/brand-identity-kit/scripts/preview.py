"""Render a PDF to a contact sheet PNG for a quick visual check.
Usage: python preview.py file.pdf out.png [dpi=22] [cols=6]"""
import subprocess, glob, sys, os, tempfile
from PIL import Image
pdf,out=sys.argv[1],sys.argv[2]; dpi=sys.argv[3] if len(sys.argv)>3 else '22'; cols=int(sys.argv[4]) if len(sys.argv)>4 else 6
t=tempfile.mkdtemp(); subprocess.run(['pdftoppm','-r',dpi,'-png',pdf,t+'/p'],check=True)
ims=[Image.open(f) for f in sorted(glob.glob(t+'/p-*.png'))]; w,h=max(i.width for i in ims),max(i.height for i in ims)
rows=(len(ims)+cols-1)//cols; m=Image.new('RGB',(cols*(w+10),rows*(h+10)),(120,120,120))
for i,im in enumerate(ims): m.paste(im,((i%cols)*(w+10),(i//cols)*(h+10)))
m.save(out); print(out,m.size,len(ims),'pages')
