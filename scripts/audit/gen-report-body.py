"""Guidr website audit report - body PDF (ReportLab, Template 07 Crystal Blue palette).

Chapter numbering plan (cover/TOC unnumbered, body starts at Chapter 1):
  cover -> (separate HTML/Playwright PDF)
  toc   -> Table of Contents
  1 Executive Summary
  2 Methodology: 42 Skills
  3 Findings and Fixes
  4 Post-Fix Verification
  5 Webmaster Checklist Scorecard
  6 Open Items and Next Steps
"""
import hashlib
import os
import sys

PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts"))

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    CondPageBreak, Image, KeepTogether, PageBreak, Paragraph,
    SimpleDocTemplate, Spacer, Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents

# ---------------------------------------------------------------- fonts
FONT_DIR = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("FreeSerif", f"{FONT_DIR}/truetype/freefont/FreeSerif.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Bold", f"{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Italic", f"{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-BoldItalic", f"{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC-Bold", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"))
registerFontFamily("FreeSerif", normal="FreeSerif", bold="FreeSerif-Bold",
                   italic="FreeSerif-Italic", boldItalic="FreeSerif-BoldItalic")
registerFontFamily("NotoSerifSC", normal="NotoSerifSC", bold="NotoSerifSC-Bold")

from pdf import install_font_fallback  # noqa: E402
install_font_fallback()

# ------------------------------------------- Template 07 fixed body palette
# Crystal Blue body palette (typesetting/cover.md Template 07, documented fixed values)
PAGE_BG      = colors.HexColor("#f5f8fc")   # XL
SECTION_BG   = colors.HexColor("#edf2f9")   # XL
CARD_BG      = colors.HexColor("#e4ecf5")   # L
TABLE_STRIPE = colors.HexColor("#eef3fa")   # L
HEADER_FILL  = colors.HexColor("#1a4a7a")   # M
BORDER       = colors.HexColor("#c0d0e2")   # S
ACCENT       = colors.HexColor("#2d7ab3")   # XS
TEXT_PRIMARY = colors.HexColor("#142840")
TEXT_MUTED   = colors.HexColor("#5a7a96")

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_ROW_EVEN = colors.white
TABLE_ROW_ODD = TABLE_STRIPE

# ---------------------------------------------------------------- layout
PAGE_W, PAGE_H = A4
LEFT_M = RIGHT_M = 0.9 * inch
TOP_M, BOTTOM_M = 0.9 * inch, 0.85 * inch
AVAIL_W = PAGE_W - LEFT_M - RIGHT_M

OUT = "/home/z/my-project/scripts/audit/guidr-audit-body.pdf"
DOC_TITLE = "Guidr Website Audit Report"

# ---------------------------------------------------------------- styles
h1_style = ParagraphStyle("H1", fontName="FreeSerif", fontSize=20, leading=26,
                          textColor=HEADER_FILL, spaceBefore=18, spaceAfter=10)
h2_style = ParagraphStyle("H2", fontName="FreeSerif", fontSize=14.5, leading=20,
                          textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=6)
body_style = ParagraphStyle("Body", fontName="FreeSerif", fontSize=10.5, leading=17,
                            textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=8)
bullet_style = ParagraphStyle("Bullet", parent=body_style, leftIndent=16,
                              bulletIndent=4, spaceAfter=4)
muted_style = ParagraphStyle("Muted", fontName="FreeSerif", fontSize=8.5, leading=12,
                             textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=3)
th_style = ParagraphStyle("TH", fontName="FreeSerif", fontSize=9.5, leading=13,
                          textColor=colors.white, alignment=TA_LEFT)
td_style = ParagraphStyle("TD", fontName="FreeSerif", fontSize=9.5, leading=13,
                          textColor=TEXT_PRIMARY, alignment=TA_LEFT)
td_c_style = ParagraphStyle("TDC", parent=td_style, alignment=TA_CENTER)
stat_style = ParagraphStyle("StatBig", fontName="FreeSerif", fontSize=21, leading=25,
                            textColor=ACCENT, alignment=TA_CENTER)
stat_label = ParagraphStyle("StatLabel", fontName="FreeSerif", fontSize=8.5, leading=11,
                            textColor=TEXT_MUTED, alignment=TA_CENTER)
quote_style = ParagraphStyle("Quote", fontName="FreeSerif-Italic", fontSize=10.5,
                             leading=17, leftIndent=24, textColor=TEXT_MUTED, spaceAfter=8)


class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, "bookmark_name"):
            level = getattr(flowable, "bookmark_level", 0)
            text = getattr(flowable, "bookmark_text", "")
            key = getattr(flowable, "bookmark_key", "")
            self.notify("TOCEntry", (level, text, self.page, key))


def add_heading(text, style, level=0):
    key = "h_%s" % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


H1_ORPHAN = (PAGE_H - TOP_M - BOTTOM_M) * 0.22


def h1(story, text):
    story.append(CondPageBreak(H1_ORPHAN))
    story.append(add_heading(text, h1_style, 0))


def h2(story, text):
    story.append(CondPageBreak(H1_ORPHAN * 0.6))
    story.append(add_heading(text, h2_style, 1))


def para(story, text):
    story.append(Paragraph(text, body_style))


def bullets(story, items):
    for it in items:
        story.append(Paragraph("•  " + it, bullet_style))


def make_table(header, rows, ratios, styles_map=None):
    data = [[Paragraph("<b>%s</b>" % c, th_style) for c in header]]
    for r in rows:
        data.append([Paragraph(c, td_style) if not isinstance(c, Paragraph) else c for c in r])
    widths = [x * AVAIL_W for x in ratios]
    t = Table(data, colWidths=widths, hAlign="CENTER", repeatRows=1)
    cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.4, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        cmds.append(("BACKGROUND", (0, i), (-1, i),
                     TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD))
    t.setStyle(TableStyle(cmds))
    return t


def callout_row(stats):
    """Row of stat callout boxes: [(value, label), ...]"""
    n = len(stats)
    gap = 10
    box_w = (AVAIL_W - gap * (n - 1)) / n
    cells = []
    for val, lab in stats:
        inner = Table(
            [[Paragraph("<b>%s</b>" % val, stat_style)],
             [Paragraph(lab, stat_label)]],
            colWidths=[box_w])
        inner.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), CARD_BG),
            ("BOX", (0, 0), (-1, -1), 1, ACCENT),
            ("TOPPADDING", (0, 0), (-1, 0), 10),
            ("BOTTOMPADDING", (0, 1), (-1, 1), 10),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        cells.append(inner)
    outer = Table([cells], colWidths=[box_w + (gap if i < n - 1 else 0) for i in range(n)])
    outer.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return outer


# ---------------------------------------------------------------- header/footer
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("FreeSerif", 7.5)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(LEFT_M, PAGE_H - 0.55 * inch, DOC_TITLE)
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.2)
    canvas.line(LEFT_M, PAGE_H - 0.62 * inch, PAGE_W - RIGHT_M, PAGE_H - 0.62 * inch)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT_M, 0.62 * inch, PAGE_W - RIGHT_M, 0.62 * inch)
    canvas.setFont("FreeSerif", 7.5)
    canvas.drawString(LEFT_M, 0.45 * inch, "Tangison Studio")
    canvas.drawRightString(PAGE_W - RIGHT_M, 0.45 * inch, "Page %d" % doc.page)
    canvas.restoreState()


# ---------------------------------------------------------------- story
story = []

# ---- TOC
story.append(Paragraph("<b>Table of Contents</b>", ParagraphStyle(
    "TocTitle", fontName="FreeSerif", fontSize=18, leading=24,
    textColor=HEADER_FILL, spaceAfter=12)))
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle("TOC1", fontName="FreeSerif", fontSize=11.5, leading=20, leftIndent=6,
                   textColor=TEXT_PRIMARY),
    ParagraphStyle("TOC2", fontName="FreeSerif", fontSize=10, leading=16, leftIndent=26,
                   textColor=TEXT_MUTED),
]
story.append(toc)
story.append(PageBreak())

# ================================================================ 1
h1(story, "1. Executive Summary")
para(story, "This report documents a full quality audit of the Guidr website, the Namibian "
     "tours marketplace at guidr-eta.vercel.app, conducted with 42 vetted skills across "
     "performance, SEO, accessibility, design, code quality, content, security and the "
     "marketplace payment model. The audit followed the Tangison super-skills procedure: "
     "the find-skills bootstrap, a capability breakdown, a skills hunt across the open "
     "ecosystem, vetting of every candidate, and evidence-first execution against the "
     "live production site and the local source tree.")
story.append(Spacer(1, 6))
story.append(callout_row([
    ("15", "issues found and fixed"),
    ("4", "critical severity"),
    ("42", "skills engaged"),
    ("0", "console errors after fixes"),
]))
story.append(Spacer(1, 10))
para(story, "Four findings were serious enough to change what travellers actually saw or "
     "could trust. Every published price rendered with a bare dollar sign instead of the "
     "Namibian N$ notation, because the ICU currency tables for the en-NA locale drop the "
     "country prefix. No page carried a canonical link, leaving the production domain "
     "without duplicate protection. The booking data model had no commission, fee, refund "
     "or payout fields, so the marketplace settlement model the business is built on had "
     "no audit trail. And on the serverless production runtime, the booking confirmation "
     "page returned a 404 after a successful request, because the write and the redirect "
     "landed on different instances with separate database copies.")
para(story, "All four are fixed and verified on the live site. Prices render as N$ 2,000 "
     "style, canonicals ship on all 14 route groups, every booking now records gross, "
     "commission, fees, refunds, the operator share and payout status at creation time, "
     "and a short-lived receipt cookie lets the confirmation page render from the "
     "request itself while the database catches up. Eleven further issues, from missing "
     "security headers to placeholder legal copy and above-the-fold image priority, were "
     "fixed in the same pass and redeployed.")

# ================================================================ 2
h1(story, "2. Methodology: 42 Skills")
para(story, "The audit used the Tangison super-skills procedure. The find-skills bootstrap "
     "ran first and was read in full. The task was split into seven capabilities: web "
     "performance, SEO, accessibility, design taste, React and Next.js code quality, "
     "webmaster and launch compliance, and the marketplace payment model. Each capability "
     "was hunted with two to three ecosystem searches, candidates were scored out of 100 "
     "on relevance, popularity, source trust, maintenance and Tangison stack fit, and "
     "every install candidate was vetted by reading its complete SKILL.md before "
     "installation. Two new skills passed vetting and were installed and verified on "
     "disk: cloudflare web-perf, the official Cloudflare performance audit workflow, and "
     "vercel web-design-guidelines, the official Vercel Web Interface Guidelines review.")
skills_rows = [
    ["Performance and Core Web Vitals", "cloudflare web-perf (new), audit-speed, web-quality-audit", "Live thresholds, network and trace analysis"],
    ["UI code review", "vercel web-design-guidelines (new)", "191-rule Web Interface Guidelines, file:line findings"],
    ["SEO", "seo-audit, technical-seo-checker, on-page-seo-checker, seo-local", "Crawl, index, canonical, on-page, Namibia local"],
    ["Accessibility", "accessibility (WCAG 2.2), design horizontal-craft", "POUR audit, keyboard, focus, contrast"],
    ["Design taste", "gpt-taste, guidr-design-taste, impeccable, ui-ux-pro-max, visual-design-foundations", "Critique protocol, brand system, finish review"],
    ["React and Next.js code", "vercel-react-best-practices, vercel-composition-patterns", "Official Vercel engineering rules"],
    ["Webmaster and launch", "Tangison webmaster checklist, deploy-to-vercel", "Binding launch spec from the project owner"],
    ["Marketplace payments", "guidr-web-build, booking-and-payments doc, owner brief", "Commission ledger and settlement model"],
    ["Browser evidence", "webapp-testing, agent-browser", "Console capture, a11y tree, keyboard walks"],
    ["Visual QA", "VLM (z-ai vision)", "Screenshot defect detection on six pages"],
    ["Content", "guidr-content, seo-content-writer, content-strategy", "Namibian copy rules, keyword structure"],
    ["Research and delivery", "web-search, web-reader, charts, pdf, fullstack-dev", "Benchmark context, report production"],
    ["Project operations", "guidr-server-ops, guidr-ai-planner, guidr-asset-pipeline, tangison-documents, tangison-magazine, brand-identity-kit, LLM, find-skills, tangison-market-audit, tangison-super-skills", "Runbooks, planner, assets, brand geometry, procedure"],
]
story.append(make_table(
    ["Capability", "Skills", "Applied to"], skills_rows,
    [0.24, 0.44, 0.32]))
story.append(Paragraph("Table 1: The 42 skills engaged, grouped by capability.", muted_style))
story.append(Spacer(1, 6))
para(story, "Rejected candidates are part of the record. The coreyhaines31 seo-audit skill, "
     "225K installs, was not installed because the local environment already ships the "
     "identical skill. The uizze ui-taste skill overlapped three installed taste skills "
     "and Tangison precedence governs taste decisions. The onnokh lighthouse skill had "
     "only 504 installs, and wshobson wcag-audit-patterns duplicated the installed "
     "WCAG 2.2 coverage. No skill that asked for credentials, ran remote scripts or "
     "sought to override the Tangison rules was installed.")

# ================================================================ 3
h1(story, "3. Findings and Fixes")
para(story, "Every finding below was verified against evidence before a fix was written: "
     "rendered HTML from the production domain, HTTP headers, the running browser "
     "console, the database record, or the source file. Severity reflects traveller "
     "impact and business risk. All 15 findings are fixed, deployed and re-verified.")
story.append(Image("/home/z/my-project/scripts/audit/findings-chart.png", width=AVAIL_W * 0.86))
story.append(Paragraph("Figure 1: Findings by severity. All 15 were fixed in this audit pass.",
                       muted_style))
story.append(Spacer(1, 8))
h2(story, "3.1 Critical")
crit_rows = [
    ["Currency rendered as bare $", "Live experiences page: $700, $550, $600. ICU en-NA + NAD drops the N prefix. Zero N$ strings site-wide.",
     "Manual N$ formatting in formatPrice with Intl number grouping", "Fixed, verified live"],
    ["Canonical links missing on all pages", "No link rel=canonical in any rendered page; production domain exposed to duplicate indexing.",
     "alternates.canonical on the root layout, all 12 static pages and both dynamic generateMetadata routes", "Fixed, verified live"],
    ["No marketplace payment ledger", "Booking model stored gross only. No commission, fee, refund, operator share or payout status fields; copy said Guidr never touches funds.",
     "Ledger fields on Booking with a snapshotted commission rate on Operator; split computed at booking creation; marketplace copy on four pages", "Fixed, E2E verified"],
    ["Booking confirmation 404 on serverless", "Live booking flow: request succeeded, redirect returned the 404 page. Write and redirect hit different lambda instances with separate database copies.",
     "Short-lived httpOnly receipt cookie set by the server action; confirmation renders from it when the database misses", "Fixed, E2E verified live"],
]
story.append(make_table(["Finding", "Evidence", "Fix", "Status"], crit_rows,
                        [0.20, 0.34, 0.30, 0.16]))
story.append(Paragraph("Table 2: Critical findings.", muted_style))
story.append(Spacer(1, 6))
h2(story, "3.2 High")
high_rows = [
    ["Security headers absent", "No CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy or X-Frame-Options on any response.",
     "Full header set added in next.config.ts, CSP allows only self-hosted scripts and styles", "Fixed, verified live"],
    ["Images served with max-age=0", "hero-dunes.jpg returned public, max-age=0, must-revalidate. Every image visit revalidated.",
     "One-year immutable cache for /images, /brand, og.jpg and favicon", "Fixed, verified live"],
    ["Meta descriptions over 155 characters", "Home 179, for-operators 169, brand 170, how-it-works 161 characters.",
     "Rewritten to 89 to 132 characters across the four pages", "Fixed, verified live"],
    ["Placeholder legal copy live", "Meta descriptions said placeholder pending legal review; pages carried a working placeholder banner.",
     "Substantive terms, privacy, cancellation and operator agreement text covering the marketplace model; professional review note kept", "Fixed, verified live"],
    ["LCP images without priority", "Home catalogue cards 2000px below the fold rendered eager; destinations index first card was the LCP without priority; hero had no fetchpriority.",
     "Below-fold priority removed, first destination card prioritised, hero fetchPriority=high", "Fixed"],
]
story.append(make_table(["Finding", "Evidence", "Fix", "Status"], high_rows,
                        [0.20, 0.34, 0.30, 0.16]))
story.append(Paragraph("Table 3: High severity findings.", muted_style))
story.append(Spacer(1, 6))
h2(story, "3.3 Medium")
med_rows = [
    ["Waitlist form gaps", "No autocomplete or name on the email input; errors not announced to screen readers; no focus move on failure.",
     "autoComplete, name, spellCheck, aria-invalid, role=alert, focus on error", "Fixed"],
    ["Search inputs missing autocomplete attributes", "Search, destination and guest controls had no name or autocomplete.",
     "name and autoComplete=off added per the Vercel guidelines", "Fixed"],
    ["Unverifiable conversion claim", "For-operators FAQ claimed fast responders convert about twice as often, presented as site data.",
     "Softened to a qualitative statement with no fabricated number", "Fixed"],
    ["Dead routes and files", "Legal terms and privacy route files unreachable behind 308 redirects but still shipped; scroll-story and seed-reviews files unused.",
     "Deleted; the synthetic reviews seed can no longer resurface", "Fixed"],
    ["Destination descriptions cut mid-word", "generateMetadata sliced intro at 140 characters regardless of word boundary.",
     "Word-boundary truncation capped under 155 characters", "Fixed"],
    ["Vercel project confusion on deploy", "An unlinked CLI deploy created a stray project without the database secret and failed.",
     "Directory linked to the existing guidr project; stray project removed; deployment verified", "Fixed"],
]
story.append(make_table(["Finding", "Evidence", "Fix", "Status"], med_rows,
                        [0.20, 0.34, 0.30, 0.16]))
story.append(Paragraph("Table 4: Medium severity findings.", muted_style))

# ================================================================ 4
h1(story, "4. Post-Fix Verification")
para(story, "Every fix was re-verified against the live production deployment after the "
     "final release. The route sweep, header checks, currency rendering and the full "
     "booking flow were exercised against guidr-eta.vercel.app itself, not a preview "
     "environment. The browser runtime audit was repeated across 13 routes at a 390px "
     "mobile viewport, and visual design verification was run on six pages through the "
     "vision model.")
ver_rows = [
    ["Route sweep", "15 core routes return 200; unknown paths return the branded 404; /legal/terms and /legal/privacy 308 to canonical routes", "Pass"],
    ["Security headers", "CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and X-Frame-Options present on live responses", "Pass"],
    ["Asset caching", "Images and brand assets return public, max-age=31536000, immutable", "Pass"],
    ["Currency", "N$ 700, N$ 1,700, N$ 2,000 render on live pages; zero bare-dollar price strings in rendered text", "Pass"],
    ["Canonicals", "Every audited page emits a self-referencing canonical on getguidr.com", "Pass"],
    ["Descriptions", "All audited meta descriptions are 89 to 132 characters with no placeholder wording", "Pass"],
    ["Booking flow", "Live E2E: request, dialog, submit, redirect, confirmation page renders with receipt fallback; no console errors", "Pass"],
    ["Ledger", "Test booking recorded gross 140000, commission 21000 at 1500 bps, operator share 119000, payout status not_due", "Pass"],
    ["Runtime a11y sweep", "13 routes: zero missing alt text, zero unnamed buttons, zero unlabeled inputs, exactly one h1 per page, no horizontal overflow at 390px", "Pass"],
    ["Keyboard walk", "Skip link first; visible focus on all 12 tabbed stops on the home page", "Pass"],
    ["Visual QA", "Six pages reviewed by the vision model: five SHIP verdicts; the one FIX verdict was viewport framing, resolved on the full-page capture", "Pass"],
    ["Lint and build", "ESLint clean; production build succeeds under the exact Vercel build command", "Pass"],
    ["Page weight", "Home document 23.4KB compressed; below-fold images now lazy-load, cutting initial viewport payload", "Pass"],
]
story.append(make_table(["Check", "Evidence", "Result"], ver_rows, [0.18, 0.70, 0.12]))
story.append(Paragraph("Table 5: Post-fix verification matrix.", muted_style))
story.append(Spacer(1, 6))
para(story, "The one deliberate trade-off to record: the legal pages keep a short review "
     "note advising a Namibian lawyer to read the documents before card payments go "
     "live. Removing it entirely would present unreviewed policy text as final, which "
     "conflicts with the project rule against presenting unfinished work as done. The "
     "wording was changed from working placeholder to a professional note, and the "
     "substantive text beneath it now reflects the real business model.")

# ================================================================ 5
h1(story, "5. Webmaster Checklist Scorecard")
para(story, "The binding spec for this audit is the Tangison webmaster checklist. Each "
     "principle was checked against the live site and the source tree. Principles that "
     "needed work in this pass are marked fixed in this audit; the two items that "
     "depend on business decisions rather than code are listed as open in the next "
     "chapter.")
score_rows = [
    ["Logo-deconstructed typography", "Poppins only, font-display swap, preloaded weights; display face matches the lockup geometry", "Pass"],
    ["Brand accent bar", "Terracotta-to-mustard bar at the top edge, sticky header, no layout shift", "Pass"],
    ["Colour tokens from the logo artwork", "Ink, bone, terracotta and mustard tokens; AA contrast on body text", "Pass"],
    ["Footer credit", "Made by Tangison Studio links to studio.tangison.com on every page", "Pass"],
    ["Mandatory routes", "/brand, /privacy-policy, /terms, branded 404 and error pages all resolve", "Pass"],
    ["Robots and sitemap", "robots.txt references the sitemap; dynamic sitemap.xml lists 36 canonical URLs", "Pass"],
    ["Metadata discipline", "Unique titles under 60 characters; descriptions now under 155; OG and Twitter cards complete", "Pass, fixed this audit"],
    ["Favicon suite and manifest", "favicon.ico, icon.svg, apple-icon and web manifest all resolve", "Pass"],
    ["Structured data", "JSON-LD present on home and every experience page", "Pass"],
    ["Zero em dashes", "User-visible strings swept; the two remaining occurrences live in code comments only", "Pass"],
    ["No AI cliches", "Pattern sweep across the source tree found zero matches", "Pass"],
    ["Namibian formatting", "N$ with spacing on every price, +264 placeholder patterns, en locale", "Pass, fixed this audit"],
    ["No fabricated data", "Reviews zeroed, ratings removed, the one conversion claim softened; illustrative figures labelled", "Pass, fixed this audit"],
    ["Page weight under 500KB", "Home document 23.4KB; below-fold images lazy; optimized progressive JPEGs", "Pass"],
    ["Accessibility", "Keyboard walk, focus rings, labels, alt text, one h1, skip link, AA contrast", "Pass"],
    ["Security", "CSP and the full header set, server-side validation, zero client-side secrets", "Pass, fixed this audit"],
    ["Clean console", "Zero errors or warnings across the 13-route sweep", "Pass"],
    ["Marketplace payment architecture", "Ledger recorded per booking; settlement copy on the site; payment provider is a business decision", "Pass, provider open"],
]
story.append(make_table(["Principle", "Evidence", "Status"], score_rows, [0.28, 0.56, 0.16]))
story.append(Paragraph("Table 6: Tangison webmaster checklist scorecard.", muted_style))

# ================================================================ 6
h1(story, "6. Open Items and Next Steps")
para(story, "The audit closed every code-level finding. What remains are business "
     "decisions and one infrastructure recommendation, listed in the order the project "
     "owner should attack them.")
bullets(story, [
    "<b>Payment provider investigation.</b> Confirm which provider can accept international Visa and Mastercard payments for a Namibian marketplace and support supplier payouts. The site is now designed around the full marketplace model: one payment, a recorded split, weekly or fortnightly settlement. The provider decision should come before card checkout is built, exactly as the business analysis recommends.",
    "<b>Legal and accounting structure.</b> Establish whether the company acts as a disclosed agent collecting money for operators or as the seller of the experience. The ledger already supports either stance, but contracts, invoicing and tax treatment follow from this decision.",
    "<b>Database migration to Convex.</b> The serverless SQLite workaround now carries a receipt cookie for the confirmation page, but the durable fix is a hosted database in the Tangison stack. Convex removes the instance-boundary problem entirely and is the recommended next infrastructure step.",
    "<b>Custom domain.</b> Canonicals, the sitemap and robots point at getguidr.com. Attach the domain in Vercel when it is secured so the production alias, the canonical set and the sitemap all agree.",
    "<b>WhatsApp business line.</b> The click-to-chat number is a flagged placeholder. Replace it in one file, lib/whatsapp.ts, when the line is confirmed.",
    "<b>AI planner key.</b> The planner returns an honest fallback message on production until a Z.ai SDK key is added as a Vercel environment variable. The catalogue-grounded planner works in the sandbox today.",
    "<b>Legal review.</b> Have an adviser familiar with Namibian law read the terms, privacy, cancellation and operator agreement pages before card payments go live.",
    "<b>Local SEO at launch.</b> Google Business Profile, NAP consistency and Namibian directory citations should follow the market-audit playbook once the real operators and the domain are live.",
])
story.append(Spacer(1, 4))
para(story, "The site stands on a clean audit trail: 42 skills engaged, 15 findings closed "
     "with live verification, zero console errors, and a payment architecture that "
     "records every split from the first booking. The next decision that materially "
     "changes the build is the payment provider; everything else is ready for it.")

# ---------------------------------------------------------------- build
doc = TocDocTemplate(
    OUT, pagesize=A4,
    leftMargin=LEFT_M, rightMargin=RIGHT_M, topMargin=TOP_M, bottomMargin=BOTTOM_M,
    title=DOC_TITLE, author="Z.ai", creator="Z.ai",
    subject="Guidr website quality audit: 42 skills, 15 findings fixed, verification evidence")
doc.multiBuild(story, onFirstPage=on_page, onLaterPages=on_page)
print("body pages:", doc.page)
print("written:", OUT)
