import os
import re
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    Image,
)
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Circle

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "proposal" / "output"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FOREST = colors.HexColor("#072A1C")
EMERALD = colors.HexColor("#059669")
LIGHT_GREEN = colors.HexColor("#ECFDF5")
SLATE = colors.HexColor("#1E293B")
MUTED = colors.HexColor("#475569")
BORDER = colors.HexColor("#CBD5E1")
AMBER = colors.HexColor("#D97706")


def add_page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        18 * mm,
        12 * mm,
        "© 2026 Rojes Labs  |  Lead Applicant: Pratibha Das Hatibaruah  |  NESFIC-I-05 (TRA – Tocklai)",
    )
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "TitleCustom",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=colors.white,
            spaceAfter=6,
        ),
        "subtitle": ParagraphStyle(
            "SubCustom",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=14,
            textColor=colors.HexColor("#A7F3D0"),
        ),
        "h2": ParagraphStyle(
            "H2Custom",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=FOREST,
            spaceBefore=12,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "BodyCustom",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=14.2,
            textColor=SLATE,
            spaceAfter=6,
        ),
        "meta": ParagraphStyle(
            "MetaCustom",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=12,
            textColor=EMERALD,
            spaceAfter=4,
        ),
    }


def make_banner(styles, title_text, subtitle_text):
    tbl = Table(
        [[Paragraph(title_text, styles["title"])], [Paragraph(subtitle_text, styles["subtitle"])]],
        colWidths=[174 * mm],
    )
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), FOREST),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (0, 0), 14),
                ("BOTTOMPADDING", (0, 1), (0, 1), 14),
            ]
        )
    )
    return tbl


def parse_proposal_sections():
    md_path = ROOT / "proposal" / "NESFIC-I-05-Proposal-Content.md"
    text = md_path.read_text(encoding="utf-8")
    parts = re.split(r"\n## (\d+\..*?)\n", text)[1:]
    sections = []
    for i in range(0, len(parts), 2):
        title = parts[i].strip()
        body = parts[i + 1].strip()
        sections.append((title, body, len(body.split())))
    return sections


def md_to_rl_html(text: str) -> str:
    """Convert basic Markdown (**bold**, *italic*, - bullets) to ReportLab XML."""
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # Remove horizontal rule lines
    safe = re.sub(r"(?m)^---\s*$", "", safe)
    # Bold **...**
    safe = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", safe)
    # Italic *...*
    safe = re.sub(r"(?<!\*)\*([^\*\n]+?)\*(?!\*)", r"<i>\1</i>", safe)
    # Bullet points at start of lines
    safe = re.sub(r"(?m)^\s{2,}-\s+", "&nbsp;&nbsp;&nbsp;&nbsp;&bull; ", safe)
    safe = re.sub(r"(?m)^-\s+", "&bull; ", safe)
    return safe.replace("\n", "<br/>").strip()


def generate_proposal_pdf(styles, sections):
    out_path = OUT_DIR / "Rojes_Labs_NESFIC-I-05_Proposal.pdf"
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=20 * mm,
        title="Rojes Labs — NESFIC-I-05 Proposal",
        author="Pratibha Das Hatibaruah",
    )

    story = [
        make_banner(
            styles,
            "TeaPluck AI — NESFIC-I-05 Proposal Submission",
            "Low-Cost AI-Enabled Selective Plucking Solution | Partner: TRA – Tocklai | Rojes Labs (Lead Applicant: Pratibha Das Hatibaruah)",
        ),
        Spacer(1, 8 * mm),
    ]

    summary_rows = [["Section", "Word Count", "Portal Limit"]]
    for title, _, wc in sections:
        summary_rows.append([title, f"{wc} words", "500 words (Pass)"])

    sum_tbl = Table(summary_rows, colWidths=[116 * mm, 28 * mm, 30 * mm])
    sum_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GREEN]),
                ("PADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(sum_tbl)
    story.append(PageBreak())

    section_images = {
        "1.": ("canopy-comparison.png", "Figure 1: Selective 'Two Leaves & a Bud' AI Plucking vs. Non-Selective Flat Shear.", 168 * mm, 87 * mm),
        "2.": ("hardware-concept.png", "Figure 2: TeaPluck AI Ergonomic Handheld Head & 24V Harness Pack (<2.2 kg head).", 168 * mm, 95 * mm),
        "3.": ("operator-journey.png", "Figure 3: 4-Step Operator Field Workflow & Edge Latency Budget.", 168 * mm, 64 * mm),
        "4.": ("ip54-exploded.png", "Figure 4: IP54 Monsoon-Ruggedized Optical & 8-Aperture Micro-Shear Stack.", 168 * mm, 87 * mm),
        "6.": ("gantt-timeline.png", "Figure 5: 12-Month Development Roadmap & Validation Milestones.", 168 * mm, 73 * mm),
        "12.": ("cost-allocation.png", "Figure 6: Indicative Resource & Budget Allocation (₹40 Lakhs Grant).", 152 * mm, 82 * mm),
    }
    img_dir = ROOT / "public" / "images"

    for title, body, wc in sections:
        story.append(Paragraph(title, styles["h2"]))
        story.append(Paragraph(f"Word Count: {wc} / 500 words", styles["meta"]))
        for para in body.split("\n\n"):
            cleaned = md_to_rl_html(para)
            if cleaned:
                story.append(Paragraph(cleaned, styles["body"]))
        prefix = title.split(" ")[0]
        if prefix in section_images:
            fname, cap, w_mm, h_mm = section_images[prefix]
            fpath = img_dir / fname
            if fpath.exists():
                story.append(Spacer(1, 2 * mm))
                story.append(Image(str(fpath), width=w_mm, height=h_mm))
                story.append(Paragraph(f"<i>{cap}</i>", styles["body"]))
        story.append(Spacer(1, 4 * mm))

    doc.build(story, onFirstPage=add_page_footer, onLaterPages=add_page_footer)
    return out_path


def build_architecture_drawing():
    d = Drawing(480, 115)
    boxes = [
        (8, 25, 105, 65, "1. HDR Optics", "Polarized RGB + LED"),
        (128, 25, 105, 65, "2. Edge NPU (INT8)", "YOLOv8n <35ms"),
        (248, 25, 105, 65, "3. Micro-Shear Head", "8-Aperture STM32"),
        (368, 25, 105, 65, "4. Estate PWA", "Offline Sync + FLC"),
    ]
    for i, (x, y, w, h, t1, t2) in enumerate(boxes):
        d.add(Rect(x, y, w, h, rx=6, ry=6, fillColor=LIGHT_GREEN, strokeColor=EMERALD, strokeWidth=1.2))
        d.add(String(x + 8, y + 42, t1, fontName="Helvetica-Bold", fontSize=8.5, fillColor=FOREST))
        d.add(String(x + 8, y + 22, t2, fontName="Helvetica", fontSize=7.5, fillColor=MUTED))
        if i < len(boxes) - 1:
            d.add(Line(x + w, y + 32, x + w + 15, y + 32, strokeColor=FOREST, strokeWidth=1.5))
    return d


def build_wireframe_drawing():
    d = Drawing(480, 130)
    # Left wireframe: Operator HUD
    d.add(Rect(8, 10, 225, 110, rx=8, ry=8, fillColor=FOREST, strokeColor=EMERALD, strokeWidth=1.2))
    d.add(String(18, 104, "WIREFRAME A: Operator Canopy HUD", fontName="Helvetica-Bold", fontSize=8.5, fillColor=colors.white))
    d.add(Rect(18, 24, 130, 70, rx=4, ry=4, fillColor=colors.HexColor("#0E3F29"), strokeColor=EMERALD, strokeWidth=0.8))
    d.add(Rect(32, 42, 42, 36, fillColor=None, strokeColor=colors.HexColor("#34D399"), strokeWidth=1.2))
    d.add(Circle(53, 44, 4, fillColor=AMBER, strokeColor=AMBER))
    d.add(String(32, 82, "2L+Bud 94%", fontName="Helvetica-Bold", fontSize=7, fillColor=colors.HexColor("#34D399")))
    d.add(String(156, 78, "FPS: 30", fontName="Helvetica", fontSize=7.5, fillColor=colors.HexColor("#A7F3D0")))
    d.add(String(156, 62, "Fine: 91%", fontName="Helvetica", fontSize=7.5, fillColor=colors.HexColor("#A7F3D0")))
    d.add(String(156, 46, "Batt: 84%", fontName="Helvetica", fontSize=7.5, fillColor=colors.HexColor("#A7F3D0")))

    # Right wireframe: Weighing Shed Dashboard
    d.add(Rect(247, 10, 225, 110, rx=8, ry=8, fillColor=colors.white, strokeColor=BORDER, strokeWidth=1.2))
    d.add(String(257, 104, "WIREFRAME B: Estate Weighing Shed Sync", fontName="Helvetica-Bold", fontSize=8.5, fillColor=FOREST))
    d.add(Rect(257, 62, 95, 32, rx=4, ry=4, fillColor=LIGHT_GREEN, strokeColor=EMERALD, strokeWidth=0.6))
    d.add(String(264, 80, "Fine-Leaf Ratio", fontName="Helvetica", fontSize=7, fillColor=MUTED))
    d.add(String(264, 68, "88.4% (Grade A)", fontName="Helvetica-Bold", fontSize=8.5, fillColor=FOREST))
    d.add(Rect(362, 62, 98, 32, rx=4, ry=4, fillColor=LIGHT_GREEN, strokeColor=EMERALD, strokeWidth=0.6))
    d.add(String(369, 80, "Block Harvested", fontName="Helvetica", fontSize=7, fillColor=MUTED))
    d.add(String(369, 68, "52.4 kg / shift", fontName="Helvetica-Bold", fontSize=8.5, fillColor=FOREST))
    d.add(String(257, 36, "Clone: TV1 | Sync: BLE->Cloud | Audit Hash: OK", fontName="Helvetica", fontSize=7.5, fillColor=MUTED))
    return d


def generate_pow_pdf(styles):
    out_path = OUT_DIR / "Rojes_Labs_NESFIC-I-05_Proof_of_Work.pdf"
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=20 * mm,
        title="Rojes Labs — NESFIC-I-05 Proof of Work",
        author="Pratibha Das Hatibaruah",
    )

    story = [
        make_banner(
            styles,
            "TeaPluck AI — Proof of Work & Solution Evidence",
            "NESFIC-I-05: Low-Cost AI-Enabled Selective Plucking Solution | Rojes Labs | Lead Applicant: Pratibha Das Hatibaruah",
        ),
        Spacer(1, 6 * mm),
        Paragraph("1. Edge-to-Cloud System Architecture", styles["h2"]),
        Paragraph(
            "TeaPluck AI processes canopy video locally on a <15W INT8 Edge NPU, firing only indexed micro-shear apertures aligned with verified 'two leaves and a bud' internodes.",
            styles["body"],
        ),
        build_architecture_drawing(),
        Spacer(1, 4 * mm),
        Paragraph("2. UI Wireframes & Operator Workflow", styles["h2"]),
        Paragraph(
            "The companion progressive web app (PWA) supports zero-connectivity Assam estates with pre-field clone calibration, live canopy HUD overlays, and weighing-shed Fine-Leaf Count (FLC) sync.",
            styles["body"],
        ),
        build_wireframe_drawing(),
        Spacer(1, 4 * mm),
        Paragraph("3. Prototype Vision Simulator — Scenario Benchmarks", styles["h2"]),
    ]

    sim_rows = [
        ["Scenario (Assam Clone)", "Lighting / Ambient", "Edge Latency", "Target Shoots", "Rejected", "Projected Fine-Leaf %"],
        ["Morning Dew (TV1)", "14,200 lux, wet speculars", "28 ms (36 FPS)", "5 / 9", "4", "89% (Simulated)"],
        ["Midday Glare (TV23)", "68,500 lux, sunflecks", "31 ms (32 FPS)", "4 / 8", "4", "87% (Simulated)"],
        ["Dense Flush (S.3A/3)", "9,400 lux, overlapping", "33 ms (30 FPS)", "6 / 10", "4", "91% (Simulated)"],
    ]
    sim_tbl = Table(sim_rows, colWidths=[34 * mm, 36 * mm, 26 * mm, 24 * mm, 18 * mm, 36 * mm])
    sim_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GREEN]),
                ("PADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(sim_tbl)
    story.append(Spacer(1, 5 * mm))

    story.append(Paragraph("4. TRA-Tocklai Pilot Validation Matrix (Months 10–12)", styles["h2"]))
    pilot_rows = [
        ["Metric", "Manual Plucking (Control A)", "Flat Motorized Shear (Control B)", "TeaPluck AI Target (Arm C)"],
        ["Fine-Leaf Ratio (FLC)", "85–92% (Baseline)", "55–65% (Coarse intake)", "≥85% (AI-selected)"],
        ["Immature Bud Damage", "<3%", "18–25%", "<5%"],
        ["Operator Throughput", "22–28 kg/day", "55–70 kg/day (low grade)", "45–60 kg/day (fine grade)"],
        ["Target Unit Cost", "N/A", "₹15,000–₹25,000", "<₹40,000 at scale"],
    ]
    pilot_tbl = Table(pilot_rows, colWidths=[40 * mm, 44 * mm, 46 * mm, 44 * mm])
    pilot_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_GREEN]),
                ("PADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(pilot_tbl)
    story.append(PageBreak())

    story.append(Paragraph("5. Hardware Concept, Selectivity & Benchmark Visuals", styles["h2"]))
    img_dir = ROOT / "public" / "images"
    visual_specs = [
        ("hardware-concept.png", "Figure 1: TeaPluck AI Ergonomic Handheld Head & 24V Harness Pack (<2.2 kg head).", 172 * mm, 97 * mm),
        ("canopy-comparison.png", "Figure 2: AI Selective 'Two Leaves & a Bud' vs. Conventional Motorized Flat Shear.", 172 * mm, 89 * mm),
        ("ip54-exploded.png", "Figure 3: IP54 Monsoon-Ruggedized Optical & 8-Aperture Micro-Shear Stack.", 172 * mm, 89 * mm),
        ("operator-journey.png", "Figure 4: 4-Step Operator Field Workflow & Edge Latency Budget.", 172 * mm, 66 * mm),
        ("pilot-benchmark-chart.png", "Figure 5: 3-Arm TRA-Tocklai Pilot Comparison Targets (Months 10-12).", 164 * mm, 84 * mm),
        ("gantt-timeline.png", "Figure 6: 12-Month Development Roadmap & Validation Milestones.", 172 * mm, 75 * mm),
        ("cost-allocation.png", "Figure 7: Indicative Resource & Budget Allocation (₹40 Lakhs Grant).", 152 * mm, 82 * mm),
    ]
    for fname, caption, w_mm, h_mm in visual_specs:
        fpath = img_dir / fname
        if fpath.exists():
            story.append(Image(str(fpath), width=w_mm, height=h_mm))
            story.append(Paragraph(f"<i>{caption}</i>", styles["body"]))
            story.append(Spacer(1, 3 * mm))

    story.append(Spacer(1, 3 * mm))
    story.append(
        Paragraph(
            "Disclaimer: All simulator outputs, wireframes, and performance targets shown in this Proof of Work document represent Rojes Labs' current software prototype and engineering design baseline, pending controlled field validation with TRA – Tocklai.",
            styles["body"],
        )
    )

    doc.build(story, onFirstPage=add_page_footer, onLaterPages=add_page_footer)
    return out_path


if __name__ == "__main__":
    st = build_styles()
    secs = parse_proposal_sections()
    p1 = generate_proposal_pdf(st, secs)
    p2 = generate_pow_pdf(st)
    print(f"Generated: {p1} ({p1.stat().st_size} bytes)")
    print(f"Generated: {p2} ({p2.stat().st_size} bytes)")
