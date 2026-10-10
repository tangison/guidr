import math
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
G='/usr/share/fonts/truetype/google-fonts/'
for n in ['Regular','Medium','Bold']: pdfmetrics.registerFont(TTFont('P-'+n,G+f'Poppins-{n}.ttf'))
DK,BN,TC,MU,WH,TD=[HexColor(x) for x in ('#1A1517','#ECEAE6','#C4552D','#F2C240','#FFFFFF','#B04A26')]
LT=HexColor('#E0673A'); GR=HexColor('#6A6560'); B=3*mm
c=canvas.Canvas('/mnt/user-data/outputs/Client_Print_Kit.pdf'); c.setTitle('Guidr Print Kit'); c.setAuthor('Guidr')

def arc(cx,cy,rx,ry,a0,a1,n=48):
    return [(cx+rx*math.cos(math.radians(a0+(a1-a0)*i/n)),cy+ry*math.sin(math.radians(a0+(a1-a0)*i/n))) for i in range(n+1)]
def poly(pts,col,sw):
    c.setStrokeColor(col); c.setLineWidth(sw); c.setLineCap(0); c.setLineJoin(1)
    p=c.beginPath(); p.moveTo(*pts[0]); [p.lineTo(*q) for q in pts[1:]]; c.drawPath(p,stroke=1,fill=0)
def shoe_units(col):
    c.setFillColor(col)
    p=c.beginPath(); p.moveTo(65,3)
    for a in [(40,5,5,95,5,170),(5,260,100,340,125,410),(133,435,138,455,138,470),(146,410,192,340,192,270),(192,180,100,0,65,3)]: p.curveTo(*a)
    p.close(); c.drawPath(p,stroke=0,fill=1)
    h=[(25,477),(160,477)]+arc(100,540,60,60,0,90)+arc(85,540,60,60,90,180)
    p=c.beginPath(); p.moveTo(*h[0]); [p.lineTo(*q) for q in h[1:]]; p.close(); c.drawPath(p,stroke=0,fill=1)
def icon(cx,cy,h,col,ang=0):
    s=h/600; c.saveState(); c.translate(cx,cy); c.rotate(ang); c.scale(s,-s); c.translate(-100,-300); shoe_units(col); c.restoreState()
def lockup(x,ytop,cap,col,icol):
    s=cap/100; c.saveState(); c.translate(x,ytop); c.scale(s,-s)
    poly([(70,0),(35,0)]+arc(35,50,50,50,-90,-270)[1:]+[(70,100),(70,55),(45,55)],col,8)
    poly([(100,0)]+arc(135,65,35,35,180,0)+[(170,0)],col,8)
    poly([(200,0),(200,100)],icol,8)
    poly([(230,0),(265,0)]+arc(265,50,35,50,-90,90)[1:]+[(230,100)],col,8)
    poly([(330,100),(330,0),(365,0)]+arc(365,25,25,25,-90,90)[1:]+[(330,50)],col,8)
    poly([(365,50),(395,100)],col,8)
    c.translate(476,-70); c.scale(0.4,0.4); shoe_units(col); c.restoreState()
def lw(cap): return 556*cap/100   # lockup width
def page(w,h,bg):
    W,H=w+2*B,h+2*B; c.setPageSize((W,H)); c.setFillColor(bg); c.rect(0,0,W,H,stroke=0,fill=1)
    try: c.setTrimBox((B,B,W-B,H-B)); c.setBleedBox((0,0,W,H))
    except Exception: pass
    return W,H
def text(x,y,s,f,size,col,align='l'):
    c.setFont('P-'+f,size); c.setFillColor(col)
    {'l':c.drawString,'r':c.drawRightString,'c':c.drawCentredString}[align](x,y,s)

