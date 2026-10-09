src=open('/home/claude/helpers.py').read().replace('/mnt/user-data/outputs/Guidr_Print_Kit.pdf','/mnt/user-data/outputs/Guidr_Brand_Identity.pdf').replace("Guidr Print Kit","Guidr Brand Identity")
exec(src)
from reportlab.lib.utils import simpleSplit
PW,PH=1920,1080; Y=lambda y:PH-y
O='/mnt/user-data/outputs/'
def bg(col): c.setPageSize((PW,PH)); c.setFillColor(col); c.rect(0,0,PW,PH,stroke=0,fill=1)
def para(x,top,s,f,size,col,w,lead=1.35):
    for i,l in enumerate(simpleSplit(s,'P-'+f,size,w)): text(x,Y(top+size+i*size*lead),l,f,size,col)
def foot(n,col): text(128,Y(1016),'Guidr brand identity  |  v1.0  |  (c) 2026','Regular',24,col); text(PW-128,Y(1016),f'0{n}','Regular',24,col,'r')
def rimg(path,x,ytop,w,h,r=24):
    c.saveState(); p=c.beginPath(); p.roundRect(x,Y(ytop+h),w,h,r); c.clipPath(p,stroke=0,fill=0); c.drawImage(path,x,Y(ytop+h),w,h); c.restoreState()
def rr(x,ytop,w,h,col,r=24,stroke=None):
    c.setFillColor(col)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(2)
    c.roundRect(x,Y(ytop+h),w,h,r,stroke=1 if stroke else 0,fill=1)
def lk(cx,cy,w,col,ic):  # centre lockup at (cx, cy top-based)
    cap=w/5.56; s=cap/100; lockup(cx-w/2,Y(cy)+50*s,cap,col,ic)
def h2(t,col=DK): text(128,Y(128+62),t,'Bold',72,col)
FL=O+'guidr-social-flyer.png'
# 1 cover
bg(DK); text(128,Y(160),'Brand identity','Regular',28,HexColor('#B9B3AC'))
cap=155; s=cap/100; lockup(128,Y(540)+50*s,cap,BN,LT)
para(128,780,'Guided travel experiences across Namibia.','Regular',36,BN,860); text(128,Y(880),'getguidr.com','Regular',36,LT)
text(128,Y(1016),'Designed by Tangison Studio  |  studio.tangison.com','Regular',24,HexColor('#B9B3AC'))
rimg(FL,PW-128-659,128,659,824); c.showPage()
# 2 logo
bg(BN); h2('The logo'); rr(128,250,1664,470,WH); lk(960,485,780,DK,TC)
for i,t in enumerate(['Thin geometric wordmark, drawn from a single stroke weight.','The I is the only accent colour, a marker standing on the trail.','Keep clear space equal to the height of the I on every side.']):
    para(128+i*592,790,t,'Regular',28,DK,512)
foot(2,GR); c.showPage()
# 3 icon
bg(TC); icon(128+129,540,780,HexColor('#FFF4EA')); x=128+258+128
text(x,Y(370),'The footprint','Bold',72,HexColor('#FFF4EA'))
para(x,410,'A footstep, a trail marker and an exclamation mark in one shape.','Regular',36,HexColor('#FFF4EA'),900,1.3)
para(x,570,'Sole and heel stay separate so it reads as a step being taken. Use it alone for app icons, stamps and social avatars.','Regular',30,HexColor('#FFF4EA'),900,1.4); c.showPage()
# 4 colour
bg(BN); h2('Colour')
for i,(n,hx,role,col) in enumerate([('Charcoal','#1A1517','Type and dark backgrounds',DK),('Bone','#ECEAE6','Main light background',BN),('Terracotta','#C4552D','Banners, the accent I',TC),('Mustard','#F2C240','Footprint trails, highlights',MU)]):
    x=128+i*(392+32); rr(x,260,392,320,col,24,HexColor('#CFCBC5') if n=='Bone' else None)
    text(x,Y(640),n,'Bold',32,DK); text(x,Y(690),hx,'Regular',26,GR); para(x,705,role,'Regular',26,GR,392)
foot(4,GR); c.showPage()
# 5 usage
bg(BN); h2('Logo on colour')
for i,(b,col,ic,st) in enumerate([(WH,DK,TC,HexColor('#CFCBC5')),(DK,BN,LT,None),(TC,HexColor('#FFF4EA'),MU,None)]):
    x=128+i*(533+32); rr(x,260,533,420,b,24,st); lk(x+266,470,420,col,ic)
para(128,730,'On terracotta the I turns mustard. Never stretch, outline or add shadows to the mark.','Regular',30,DK,1300,1.4)
foot(5,GR); c.showPage()
# 6 photography
bg(DK); h2('Photography',BN); rimg(O+'guidr-photo-grid.jpg',128,260,1000,671,16)
for i,t in enumerate(['Real travellers, seen from behind, never posed.','One warm accent per frame: mustard, rust or orange.','Open sky above for a bold headline.']):
    para(1192,290+i*150,t,'Regular',30,BN,540,1.35)
foot(6,HexColor('#B9B3AC')); c.showPage()
# 7 print kit
bg(BN); h2('Print kit')
T='/home/claude/trim-'
items=[(T+'2.png','Business card',520,330),(T+'5.png','A5 flyer',399,560),(T+'6.png','A3 poster',398,560)]
x=128
for p,l,w,h in items:
    rimg(p,x,260,w,h,8); text(x,Y(260+h+50),l,'Medium',28,DK); x+=w+64
text(128,Y(960),'Also in the kit: letterhead, card back and a specification page.','Regular',26,GR)
foot(7,GR); c.showPage()
# 8 in use
bg(BN); h2('In use'); rimg(FL,128,260,512,640,24)
for i,(a,b) in enumerate([('Headline','Poppins Bold, white on a terracotta banner.'),('Wordmark','Small, top-left, white with the orange I.'),('Trail','Mustard footprints lead the eye from banner into photo.'),('Domain','getguidr.com')]):
    y=300+i*130; text(736,Y(y+32),a,'Bold',32,DK); text(736,Y(y+72),b,'Regular',28,GR)
foot(8,GR); c.showPage()
# 9 credits
bg(DK); text(128,Y(160),'Credits','Regular',28,HexColor('#B9B3AC'))
from PIL import Image as _I
tw,th=_I.open('/home/claude/tg_light.png').size
gw=560; gh=gw*th/tw; c.drawImage('/home/claude/tg_light.png',128,Y(300+gh),gw,gh,mask='auto')
text(128,Y(560),'Brand identity designed by Tangison Studio','Bold',56,BN)
text(128,Y(635),'A division of Tangison Technologies','Regular',36,BN)
text(128,Y(700),'studio.tangison.com','Regular',36,LT)
text(128,Y(775),'Version 1.0  |  September 2026','Regular',26,HexColor('#B9B3AC'))
c.setStrokeColor(HexColor('#4A4446')); c.setLineWidth(1); c.line(128,Y(840),PW-128,Y(840))
para(128,870,'(c) 2026 Guidr. All rights reserved. The Guidr name, wordmark, footprint icon and identity system may not be reproduced, modified or distributed without written permission.','Regular',22,HexColor('#B9B3AC'),1500,1.4)
para(128,950,'Photography shown is AI-generated concept imagery, for illustration only. Replace with licensed or commissioned photography before publication.','Regular',22,HexColor('#B9B3AC'),1500,1.4)
c.showPage(); c.save()
