import math, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
U='/mnt/user-data/uploads/'
src=Image.open(U+'2dc3e987fcccbec9883b2b78e653f3660fd37617.jpeg').convert('RGB')
W,H=1080,1350; PH=1092
crop=src.crop((0,0,338,340)).resize((W,PH),Image.LANCZOS)
crop=crop.filter(ImageFilter.UnsharpMask(3,120,2))
crop=ImageEnhance.Color(crop).enhance(1.08)
img=crop.copy()
# top gradient for logo legibility
g=Image.new('L',(W,PH),0); gd=ImageDraw.Draw(g)
for y in range(320): gd.line([(0,y),(W,y)],fill=int(110*(1-y/320)))
img.paste(Image.new('RGB',(W,PH),(40,20,10)),(0,0),g)
# grain
random.seed(1)
n=Image.effect_noise((W,PH),14).convert('RGB'); img=Image.blend(img,n,0.04)
canvas=Image.new('RGB',(W,H),(236,234,230)); canvas.paste(img,(0,0))
# banner
SS=3
ban=Image.new('RGBA',(W*SS,400*SS),(0,0,0,0)); bd=ImageDraw.Draw(ban)
bd.rounded_rectangle((0,0,W*SS,700*SS),radius=60*SS,fill=(196,85,45,255))
ban=ban.resize((W,400),Image.LANCZOS)
canvas.paste(ban,(0,H-320),ban)
d=ImageDraw.Draw(canvas)
def bez(p0,p1,p2,p3,n=40):
    return [((1-t)**3*p0[0]+3*(1-t)**2*t*p1[0]+3*(1-t)*t*t*p2[0]+t**3*p3[0],
             (1-t)**3*p0[1]+3*(1-t)**2*t*p1[1]+3*(1-t)*t*t*p2[1]+t**3*p3[1]) for t in [i/n for i in range(n+1)]]
def arc(c,rx,ry,a0,a1,n=40):
    return [(c[0]+rx*math.cos(math.radians(a0+(a1-a0)*i/n)),c[1]+ry*math.sin(math.radians(a0+(a1-a0)*i/n))) for i in range(n+1)]
def shoe_layer(h,color):
    s=h/600; S=4
    L=Image.new('RGBA',(int(200*s*S),int(604*s*S)),(0,0,0,0)); ld=ImageDraw.Draw(L)
    pts=[]
    segs=[((65,3),(40,5),(5,95),(5,170)),((5,170),(5,260),(100,340),(125,410)),((125,410),(133,435),(138,455),(138,470)),((138,470),(146,410),(192,340),(192,270)),((192,270),(192,180),(100,0),(65,3))]
    for sg in segs: pts+=bez(*sg)
    ld.polygon([(x*s*S,y*s*S) for x,y in pts],fill=color)
    heel=[(25,477),(160,477)]+arc((100,540),60,60,0,90)+arc((85,540),60,60,90,180)
    ld.polygon([(x*s*S,y*s*S) for x,y in heel],fill=color)
    return L.resize((L.width//S,L.height//S),Image.LANCZOS)
def wordmark(ox,oy,s,col,icol,sw):
    S=4; w=int(420*s*S); hh=int(130*s*S)
    L=Image.new('RGBA',(w,hh),(0,0,0,0)); ld=ImageDraw.Draw(L)
    def P(pts,c): ld.line([((x+20)*s*S,(y+15)*s*S) for x,y in pts],fill=c,width=int(sw*s*S),joint='curve')
    P([(70,0),(35,0)]+arc((35,50),50,50,-90,-270)[1:]+[(70,100),(70,55),(45,55)],col)
    P([(100,0)]+arc((135,65),35,35,180,0)+[(170,0)],col)
    P([(200,0),(200,100)],icol)
    P([(230,0),(265,0)]+arc((265,50),35,50,-90,90)[1:]+[(230,100)],col)
    P([(330,100),(330,0),(365,0)]+arc((365,25),25,25,-90,90)[1:]+[(330,50)],col)
    P([(365,50),(395,100)],col)
    L=L.resize((L.width//S,L.height//S),Image.LANCZOS)
    canvas.paste(L,(int(ox-20*s),int(oy-15*s)),L)
# logo lockup top-left: wordmark small + shoe
cap=40; s=cap/100
wordmark(64,70,s,(255,255,255),(240,120,70),12)
sh=shoe_layer(int(cap*2.4),(255,255,255,255))
canvas.paste(sh,(64+int(395*s)+34,70-int(cap*0.7)),sh)
# footprint trail (mustard)
for i,(h,x,y,a) in enumerate([(60,955,1150,-18),(80,975,1030,-18),(100,990,890,-18)]):
    f=shoe_layer(h,(242,194,64,255)).rotate(a,expand=True,resample=Image.BICUBIC)
    canvas.paste(f,(x,y),f)
d=ImageDraw.Draw(canvas)
hf=ImageFont.truetype('/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf',68)
d.text((64,H-320+62),"Discover",font=hf,fill=(255,255,255))
d.text((64,H-320+62+80),"unforgettable Namibia",font=hf,fill=(255,255,255))
import os
mf='/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'
sf=ImageFont.truetype(mf if os.path.exists(mf) else '/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf',30)
d.text((64,H-320+62+80+96),"getguidr.com",font=sf,fill=(255,236,220))
canvas.save('/mnt/user-data/outputs/guidr-social-flyer.png')
