exec(open('/home/claude/helpers.py').read())
IM='/home/claude/'
from PIL import Image as _I
_w,_h=_I.open(IM+'tg_dark.png').size; TGH=_h/_w
def img(n,x,y,w,h): c.drawImage(IM+n,x,y,w,h)
# 1 spec page
c.setPageSize((210*mm,297*mm)); c.setFillColor(BN); c.rect(0,0,210*mm,297*mm,stroke=0,fill=1)
lockup(20*mm,270*mm,9*mm,DK,TC)
text(20*mm,235*mm,'Print kit','Bold',34,DK)
text(20*mm,224*mm,'Production files for the Guidr brand identity','Regular',12,GR)
rows=[('Business card, front','90 x 55 mm','400 gsm matt, 3 mm bleed'),('Business card, back','90 x 55 mm','400 gsm matt, 3 mm bleed'),
('Letterhead','A4, 210 x 297 mm','100 gsm uncoated, 3 mm bleed'),('Flyer','A5, 148 x 210 mm','170 gsm silk, 3 mm bleed'),('Poster','A3, 297 x 420 mm','170 gsm silk, 3 mm bleed')]
y=200*mm
for a,b,d in rows:
    text(20*mm,y,a,'Bold',11,DK); text(80*mm,y,b,'Regular',11,DK); text(130*mm,y,d,'Regular',11,GR)
    c.setStrokeColor(HexColor('#CFCBC5')); c.setLineWidth(.5); c.line(20*mm,y-4*mm,190*mm,y-4*mm); y-=12*mm
y-=6*mm; text(20*mm,y,'Colours','Bold',11,DK); y-=12*mm
for i,(n,hx,col) in enumerate([('Charcoal','#1A1517',DK),('Bone','#ECEAE6',BN),('Terracotta','#C4552D',TC),('Mustard','#F2C240',MU)]):
    x=20*mm+i*43*mm; c.setFillColor(col); c.setStrokeColor(HexColor('#CFCBC5')); c.roundRect(x,y-22*mm,38*mm,22*mm,3*mm,stroke=1,fill=1)
    text(x,y-28*mm,n,'Medium',9,DK); text(x,y-33*mm,hx,'Regular',9,GR)
y-=52*mm
text(20*mm,y,'Typeface: Poppins Bold for headlines, Regular for text. Every page has a 3 mm bleed.','Regular',9,GR)
text(20*mm,y-5*mm,'Colours are RGB. Ask your printer to match CMYK or Pantone and proof first.','Regular',9,GR)
text(20*mm,y-10*mm,'Photos are concept-resolution placeholders: replace with 300 dpi images','Regular',9,GR)
text(20*mm,y-15*mm,'at print size before the final run.','Regular',9,GR)
c.drawImage(IM+'tg_dark.png',20*mm,26*mm,44*mm,44*mm*TGH,mask='auto')
text(70*mm,44*mm,'Designed by Tangison Studio','Bold',10,DK); text(70*mm,39.5*mm,'A division of Tangison Technologies  |  studio.tangison.com','Regular',9,GR)
text(70*mm,35*mm,'Version 1.0  |  September 2026','Regular',9,GR)
text(20*mm,18*mm,'(c) 2026 Guidr. All rights reserved. The Guidr name, wordmark and footprint icon','Regular',7.5,GR)
text(20*mm,14.5*mm,'may not be reproduced or altered without written permission.','Regular',7.5,GR)
text(20*mm,11*mm,'Photography shown is AI-generated concept imagery, for illustration only.','Regular',7.5,GR)
c.showPage()
# 2 card front, photo
W,H=page(90*mm,55*mm,DK); img('card.jpg',0,0,W,H)
cap=7*mm; s=cap/100; lockup((W-lw(cap))/2,H/2+50*s,cap,BN,LT); c.showPage()
# 3 card back
W,H=page(90*mm,55*mm,BN); m=B+8*mm
text(m,B+38*mm,'[Full name]','Bold',11,DK); text(m,B+33*mm,'[Job title]','Regular',7.5,TC)
for i,t in enumerate(['+264 [00 000 0000]','[name]@getguidr.com','getguidr.com']): text(m,B+16*mm-i*4.5*mm,t,'Regular',7,DK)
icon(W-B-13*mm,H-B-15*mm,18*mm,TC)
c.setFillColor(MU); c.rect(B,B,90*mm,2*mm,stroke=0,fill=1); c.showPage()
# 4 letterhead with dune strip
W,H=page(210*mm,297*mm,WH)
lockup(B+20*mm,H-B-22*mm,7*mm,DK,TC)
for i,t in enumerate(['[Date]','[Recipient name]','[Address line]']): text(B+20*mm,H-B-75*mm-i*6*mm,t,'Regular',10,HexColor('#A8A29B'))
text(B+20*mm,H-B-100*mm,'[Dear name,]','Regular',10,HexColor('#A8A29B'))
img('strip.jpg',0,14*mm,W,W*288/2000)
c.setFillColor(TC); c.rect(0,0,W,14*mm,stroke=0,fill=1)
text(B+20*mm,5.5*mm,'getguidr.com   |   hello@getguidr.com   |   +264 [00 000 0000]   |   Namibia','Regular',8,WH)
c.showPage()
# 5 A5 flyer: photo top, terracotta panel with rounded top
W,H=page(148*mm,210*mm,TC)
ph=W*1392/1600; img('flyer.jpg',0,H-ph,W,ph)
top=80*mm; c.setFillColor(TC); c.roundRect(0,-20*mm,W,top+20*mm,9*mm,stroke=0,fill=1)
lockup(B+12*mm,H-B-14*mm,4.5*mm,WH,LT)
for ln,yy in [('Discover',65),('unforgettable Namibia',54)]: text(B+12*mm,yy*mm,ln,'Bold',23,WH)
text(B+12*mm,42*mm,'Desert dunes, wild coast and big skies.','Regular',11,HexColor('#FFF4EA')); text(B+12*mm,37*mm,'Guided by people who know the land.','Regular',11,HexColor('#FFF4EA'))
c.setFillColor(MU); c.roundRect(B+12*mm,B+9*mm,42*mm,11*mm,5.5*mm,stroke=0,fill=1); text(B+33*mm,B+12.5*mm,'getguidr.com','Bold',12,DK,'c')
for x,y,h in [(126,30,13),(133,50,17),(139,72,22)]: icon(x*mm,y*mm,h*mm,MU,-18)
c.showPage()
# 6 A3 poster full-bleed photo
W,H=page(297*mm,420*mm,DK); img('poster.jpg',0,0,W,H)
for ln,yy in [("Walk the",373),("world's",343),("oldest",313),("desert.",283)]: text(B+22*mm,yy*mm,ln,'Bold',88,BN)
text(B+22*mm,262*mm,'Guided experiences across Namibia','Regular',22,HexColor('#E4DFD8'))
for x,y,h in [(240,50,26),(254,78,34),(268,112,43)]: icon(x*mm,y*mm,h*mm,MU,-18)
lockup(B+22*mm,B+38*mm,10*mm,BN,LT); text(B+22*mm,B+13*mm,'getguidr.com','Medium',20,BN)
c.showPage(); c.save()
