src=open('/home/claude/helpers.py').read().replace('/mnt/user-data/outputs/Guidr_Print_Kit.pdf','/mnt/user-data/outputs/Guidr_Brand_Identity_A4.pdf').replace("Guidr Print Kit","Guidr Brand Identity")
exec(src)
from reportlab.lib.utils import simpleSplit
from PIL import Image as _I
AW,AH=210*mm,297*mm; M=12; U='/mnt/user-data/uploads/'; H='/home/claude/'
Y=lambda y:AH-y*mm
def pg(col=WH): c.setPageSize((AW,AH)); c.setFillColor(col); c.rect(0,0,AW,AH,stroke=0,fill=1)
def T(x,y,s,f,size,col,al='l'): text(x*mm,Y(y),s,f,size,col,al)
def P(x,y,s,f,size,col,w,lead=1.35):
    for i,l in enumerate(simpleSplit(s,'P-'+f,size,w*mm)): T(x,y+i*size*lead*0.3528,l,f,size,col)
    return y+len(simpleSplit(s,'P-'+f,size,w*mm))*size*lead*0.3528
def RR(x,y,w,h,col,r=4,stroke=None):
    c.setFillColor(col)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(.6)
    c.roundRect(x*mm,Y(y+h),w*mm,h*mm,r*mm,stroke=1 if stroke else 0,fill=1)
def RI(path,x,y,w,h,r=3):
    c.saveState(); p=c.beginPath(); p.roundRect(x*mm,Y(y+h),w*mm,h*mm,r*mm); c.clipPath(p,stroke=0,fill=0); c.drawImage(path,x*mm,Y(y+h),w*mm,h*mm); c.restoreState()
def LK(cx,cy,w,col,ic):
    cap=w/5.56; s=cap/100; lockup((cx-w/2)*mm,Y(cy)+50*s*mm,cap*mm,col,ic)
def IC(cx,cy,h,col): icon(cx*mm,Y(cy),h*mm,col)
def head(t): T(M,M+12,t,'Bold',28,DK)
def foot(n): T(M,290,'Guidr brand identity  |  v1.0  |  © 2026','Regular',7.5,GR); T(M+186,290,str(n),'Regular',7.5,GR,'r')
LG=HexColor('#CFCBC5'); FT=HexColor('#FFF4EA'); SG=HexColor('#B9B3AC')
# 1 cover
pg(); RR(M,M,186,273,DK,6)
T(M+16,M+18,'Brand identity','Regular',10,SG); LK(M+16+60,M+58,120,BN,LT)
P(M+16,M+148,'Guided travel experiences across Namibia.','Regular',16,BN,62,1.3); T(M+16,M+186,'getguidr.com','Regular',16,LT)
T(M+16,M+250,'Version 1.0  |  September 2026','Regular',8,SG); T(M+16,M+256,'Designed by Tangison Studio  |  studio.tangison.com','Regular',8,SG)
RI(O:='/mnt/user-data/outputs/guidr-social-flyer.png',M+186-14-90,M+273-14-112.5,90,112.5,4); c.showPage()
# 2 logo
pg(); head('The logo'); RR(M,36,186,92,WH,5,LG); LK(M+93,82,140,DK,TC)
y=146
for t in ['Thin geometric wordmark, drawn from a single stroke weight.','The I is the only accent colour, a marker standing on the trail.','Keep clear space equal to the height of the I on every side.','Minimum width: 30 mm in print, 120 px on screen.']:
    RR(M,y-4.2,2,2,TC,1); T(M+6,y,t,'Regular',12,DK); y+=13
foot(2); c.showPage()
# 3 icon
pg(); head('The footprint'); RR(M,36,186,150,TC,5); IC(M+40,36+75,116,FT)
P(M+82,80,'A footstep, a trail marker and an exclamation mark in one shape.','Bold',17,FT,96,1.3)
P(M+82,125,'Sole and heel stay separate so it reads as a step being taken.','Regular',12,FT,96,1.4)
y=206
for t in ['App icons and favicons','Stamps, stickers and luggage tags','Social avatars and profile images']:
    RR(M,y-4.2,2,2,TC,1); T(M+6,y,t,'Regular',12,DK); y+=12
foot(3); c.showPage()
# 4 colour
pg(); head('Colour')
for i,(n,hx,rgb,role,col) in enumerate([('Charcoal','#1A1517','26 21 23','Type and dark backgrounds',DK),('Bone','#ECEAE6','236 234 230','Main light background',BN),('Terracotta','#C4552D','196 85 45','Banners and the accent I',TC),('Mustard','#F2C240','242 194 64','Footprint trails and highlights',MU)]):
    y=36+i*58; RR(M,y,72,50,col,4,LG if n=='Bone' else None)
    T(M+82,y+14,n,'Bold',18,DK); T(M+82,y+24,hx+'   |   RGB '+rgb,'Regular',11,GR); T(M+82,y+34,role,'Regular',11,DK)
foot(4); c.showPage()
# 5 usage
pg(); head('Logo on colour')
for i,(b,col,ic,st) in enumerate([(WH,DK,TC,LG),(DK,BN,LT,None),(TC,FT,MU,None)]):
    y=36+i*64; RR(M,y,186,58,b,5,st); LK(M+93,y+29,90,col,ic)
P(M,236,'On terracotta the I turns mustard. Never stretch, outline, rotate or add shadows to the mark.','Regular',12,DK,186,1.4)
foot(5); c.showPage()
# 6 typography
pg(); head('Typography')
T(M,100,'Aa','Bold',110,DK); T(M+92,66,'Poppins','Bold',30,DK); T(M+92,76,'Bold for headlines, Regular for text.','Regular',11,GR)
T(M+92,88,'ABCDEFGHIJKLM','Regular',13,DK); T(M+92,96,'NOPQRSTUVWXYZ','Regular',13,DK); T(M+92,104,'abcdefghijklm 0123456789','Regular',13,DK)
c.setStrokeColor(LG); c.setLineWidth(.6); c.line(M*mm,Y(122),(M+186)*mm,Y(122))
T(M,140,'Headline','Regular',9,GR); P(M,158,'Discover unforgettable Namibia','Bold',32,DK,186,1.15)
T(M,196,'Subheading','Regular',9,GR); T(M,208,'Desert dunes, wild coast and big skies.','Bold',16,DK)
T(M,226,'Body','Regular',9,GR); P(M,236,'Guided by people who know the land. Sunrise dune walks, coastal boat trips and nights under the stars.','Regular',12,DK,150,1.45)
foot(6); c.showPage()
# 7 photography: people
pg(); head('Photography'); RI(U+'2dc3e987fcccbec9883b2b78e653f3660fd37617.jpeg',M,36,186,124.8,3)
y=176
for t in ['Real travellers, seen from behind, never posed.','One warm accent per frame: mustard, rust or orange.','Open sky above for a bold headline.']:
    RR(M,y-4.2,2,2,TC,1); T(M+6,y,t,'Regular',12.5,DK); y+=13
foot(7); c.showPage()
# 8 landscapes
pg(); head('Landscapes'); RI(U+'16c3e6834ac3864213ad00d1cd143a29c7334933.jpeg',M,36,186,101.5,3); T(M,145,'Desert and dunes','Medium',11,DK)
RI(U+'a7c19238a0a879a312d3bb30c50fa384a5287819.jpeg',M,155,186,101.5,3); T(M,264,'Coast and wildlife','Medium',11,DK); foot(8); c.showPage()
# 9 in use + inland
pg(); head('In use'); RI(O,M,36,80,100,4)
for i,(a,b) in enumerate([('Headline','Poppins Bold, white on a terracotta banner.'),('Wordmark','Small, top-left, white with the orange I.'),('Trail','Mustard footprints lead the eye from banner into photo.'),('Domain','getguidr.com')]):
    y=48+i*26; T(M+92,y,a,'Bold',12,DK); P(M+92,y+6,b,'Regular',10.5,GR,94,1.3)
RI(U+'521c3a88cde7e974071688dbb860e064e5e0aa05.jpeg',M,150,186,101.5,3); T(M,259,'Inland and night sky','Medium',11,DK); foot(9); c.showPage()
# 10 print kit
pg(); head('Print kit')
RI(H+'ht-2.jpg',M,36,90,55,2); RI(H+'ht-3.jpg',M+96,36,90,55,2)
T(M,98,'Business card, front','Medium',10,DK); T(M+96,98,'Business card, back','Medium',10,DK)
RI(H+'ht-4.jpg',M,110,77.8,110,2); RI(H+'ht-5.jpg',M+96,110,77.8,110,2)
T(M,228,'Letterhead, A4','Medium',10,DK); T(M+96,228,'Flyer, A5','Medium',10,DK); foot(10); c.showPage()
# 11 poster + specs
pg(); head('Poster and specifications'); RI(H+'ht-6.jpg',M,36,100,141.4,2); T(M,185,'Poster, A3','Medium',10,DK)
T(M+112,42,'Specifications','Bold',14,DK)
y=54
for a,b in [('Business card','90 x 55 mm, 400 gsm matt'),('Letterhead','A4, 100 gsm uncoated'),('Flyer','A5, 170 gsm silk'),('Poster','A3, 170 gsm silk'),('Bleed','3 mm on every piece')]:
    T(M+112,y,a,'Bold',10,DK); T(M+112,y+5.5,b,'Regular',10,GR); y+=16
P(M+112,y+4,'Colours are RGB. Ask your printer to match CMYK or Pantone and proof first.','Regular',10,DK,74,1.4)
foot(11); c.showPage()
# 12 credits
pg(); head('Credits'); tw,th=_I.open(H+'tg_dark.png').size; gw=100; c.drawImage(H+'tg_dark.png',M*mm,Y(50+gw*th/tw),gw*mm,gw*th/tw*mm,mask='auto')
P(M,105,'Brand identity designed by Tangison Studio','Bold',22,DK,186,1.2); T(M,132,'A division of Tangison Technologies','Regular',14,DK); T(M,141,'studio.tangison.com','Regular',14,TC); T(M,151,'Version 1.0  |  September 2026','Regular',10,GR)
c.line(M*mm,Y(215),(M+186)*mm,Y(215))
P(M,224,'© 2026 Guidr. All rights reserved. The Guidr name, wordmark, footprint icon and identity system may not be reproduced, modified or distributed without written permission.','Regular',8.5,GR,186,1.45)
P(M,244,'Photography shown is AI-generated concept imagery, for illustration only. Replace with licensed or commissioned photography before publication.','Regular',8.5,GR,186,1.45)
foot(12); c.showPage(); c.save()
