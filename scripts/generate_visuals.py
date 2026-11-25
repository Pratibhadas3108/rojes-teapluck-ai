import os
os.environ["MPLCONFIGDIR"] = "/tmp/mpl-cache"

from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FOREST = "#072A1C"
EMERALD = "#10B981"
MINT = "#34D399"
AMBER = "#F59E0B"
ROSE = "#E11D48"
SLATE = "#1E293B"
MUTED = "#475569"
BG = "#F8FAF8"


def make_hardware_concept():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")
    ax.set_facecolor("#F4F8F5")
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 60)
    ax.axis("off")

    # Header bar
    ax.add_patch(patches.FancyBboxPatch((2, 52), 96, 6.2, boxstyle="round,pad=0.3,rounding_size=1.2", facecolor=FOREST, edgecolor="none"))
    ax.text(4, 55.2, "TeaPluck AI — Ergonomic Handheld Selective Plucking System (<2.2 kg Head)", color="white", fontsize=14, fontweight="bold", va="center")
    ax.text(96, 55.2, "NESFIC-I-05  |  Rojes Labs", color="#A7F3D0", fontsize=10, ha="right", va="center")

    # Backpack / Waist Harness (Left)
    ax.add_patch(patches.FancyBboxPatch((6, 14), 22, 30, boxstyle="round,pad=0.4,rounding_size=2", facecolor="#0B3B24", edgecolor=EMERALD, linewidth=2))
    ax.text(17, 40.5, "Padded Harness Pack", color="white", fontsize=11, fontweight="bold", ha="center")
    ax.add_patch(patches.Rectangle((9, 28), 16, 8, facecolor="#14532D", edgecolor="#6EE7B7", linewidth=1))
    ax.text(17, 32, "24V LiFePO4\n(6-8 hr Runtime)", color="#ECFDF5", fontsize=9, ha="center", va="center")
    ax.add_patch(patches.Rectangle((9, 17), 16, 8, facecolor="#0F172A", edgecolor="#38BDF8", linewidth=1))
    ax.text(17, 21, "Edge AI NPU\n(INT8 <15W)", color="#E0F2FE", fontsize=9, ha="center", va="center")

    # Flexible pneumatic + power tether
    t = np.linspace(28, 48, 100)
    y_hose = 25 + 3.5 * np.sin((t - 28) / 20 * np.pi)
    ax.plot(t, y_hose, color="#334155", linewidth=7, solid_capstyle="round")
    ax.plot(t, y_hose, color="#94A3B8", linewidth=2.5, linestyle="--")
    ax.text(38, 31.5, "Pneumatic Leaf Tube\n+ 24V Power / UART", color=SLATE, fontsize=8.5, fontweight="bold", ha="center")

    # Handheld Selective Plucking Head (Right)
    ax.add_patch(patches.FancyBboxPatch((48, 18), 44, 24, boxstyle="round,pad=0.4,rounding_size=2", facecolor="#FFFFFF", edgecolor=FOREST, linewidth=2.2))
    ax.text(70, 39.2, "Selective Plucking Head (IP54)", color=FOREST, fontsize=11.5, fontweight="bold", ha="center")

    # Polarized Camera + Ring LED
    ax.add_patch(patches.Circle((58, 30), 4.8, facecolor=FOREST, edgecolor=AMBER, linewidth=2.2))
    ax.add_patch(patches.Circle((58, 30), 2.3, facecolor="#38BDF8", edgecolor="white", linewidth=1))
    ax.text(58, 22.5, "Polarized HDR\n+ Ring-LED", color=SLATE, fontsize=8.5, fontweight="bold", ha="center")

    # 8-Aperture Micro-Shear Comb
    ax.add_patch(patches.Rectangle((67, 24), 21, 11, facecolor="#ECFDF5", edgecolor=EMERALD, linewidth=1.8))
    for i in range(8):
        x_slot = 68.2 + i * 2.4
        col = MINT if i in (1, 3, 6) else "#CBD5E1"
        ax.add_patch(patches.Rectangle((x_slot, 25.5), 1.6, 8, facecolor=col, edgecolor=FOREST, linewidth=0.7))
    ax.text(77.5, 20.5, "8-Aperture Indexed Micro-Shear\n(Green = Active Cut | Grey = Spared)", color=SLATE, fontsize=8.2, fontweight="bold", ha="center")

    # Callout footer
    ax.text(50, 6.5, "Key Advantage: Keeps human operator for uneven Assam slope mobility while automating 'two leaves & a bud' selection at 25-30 FPS.",
            color=MUTED, fontsize=9.5, ha="center", style="italic")

    fig.tight_layout(pad=0.5)
    fig.savefig(OUT_DIR / "hardware-concept.png", dpi=160)
    plt.close(fig)


def make_canopy_comparison():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6.2), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")

    for ax, title, bg in [
        (ax1, "TeaPluck AI: Selective '2 Leaves & a Bud'", "#0A2E1E"),
        (ax2, "Conventional Motorized Flat Shear (Non-Selective)", "#1E291F"),
    ]:
        ax.set_facecolor(bg)
        ax.set_xlim(0, 100)
        ax.set_ylim(0, 100)
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title(title, fontsize=11.5, fontweight="bold", color=FOREST, pad=10)

        # Draw maintenance bush base
        for bx in [15, 38, 62, 85]:
            ax.add_patch(patches.Ellipse((bx, 22), 26, 18, facecolor="#14532D", alpha=0.8))

        # Shoots: (x, height, type)
        shoots = [
            (18, 72, "target"),
            (36, 52, "immature"),
            (54, 76, "target"),
            (72, 64, "coarse"),
            (86, 74, "target"),
        ]
        for sx, sh, stype in shoots:
            col = "#4ADE80" if stype == "target" else ("#FBBF24" if stype == "immature" else "#166534")
            ax.plot([sx, sx], [26, sh], color="#86EFAC", linewidth=2.5)
            ax.add_patch(patches.Ellipse((sx - 5, sh - 8), 9, 4.5, angle=-25, facecolor=col))
            ax.add_patch(patches.Ellipse((sx + 5, sh - 11), 9, 4.5, angle=25, facecolor=col))
            if stype != "coarse":
                ax.add_patch(patches.Ellipse((sx, sh + 2), 3, 7, facecolor="#BEF264"))

            if ax is ax1:
                if stype == "target":
                    ax.add_patch(patches.Rectangle((sx - 10, sh - 22), 20, 30, fill=False, edgecolor=MINT, linewidth=2))
                    ax.add_patch(patches.Circle((sx, sh - 18), 2.3, facecolor=AMBER, edgecolor="white", linewidth=1))
                    ax.text(sx, sh + 10, "2L+Bud", color=MINT, fontsize=8, fontweight="bold", ha="center")
                elif stype == "immature":
                    ax.add_patch(patches.Rectangle((sx - 8, sh - 18), 16, 25, fill=False, edgecolor=AMBER, linewidth=1.3, linestyle="--"))
                    ax.text(sx, sh + 9, "Spared", color=AMBER, fontsize=7.5, ha="center")
                else:
                    ax.add_patch(patches.Rectangle((sx - 10, sh - 20), 20, 26, fill=False, edgecolor=ROSE, linewidth=1.3, linestyle="--"))
                    ax.text(sx, sh + 8, "Rejected", color="#FDA4AF", fontsize=7.5, ha="center")

    # Flat shear cut line on ax2
    ax2.axhline(55, color=ROSE, linewidth=3, linestyle="-")
    ax2.text(50, 58.5, "BLIND PLANAR CUT: Bruises immature buds & mixes coarse leaves",
             color="#FECDD3", fontsize=8.5, fontweight="bold", ha="center",
             bbox=dict(boxstyle="round,pad=0.3", facecolor="#881337", edgecolor=ROSE))

    fig.suptitle("Canopy Selectivity Comparison — Assam Tea Plucking Table", fontsize=13.5, fontweight="bold", color=FOREST, y=0.98)
    fig.tight_layout(rect=[0, 0, 1, 0.94])
    fig.savefig(OUT_DIR / "canopy-comparison.png", dpi=160)
    plt.close(fig)


def make_ip54_exploded():
    fig, ax = plt.subplots(figsize=(12, 6.2), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")
    ax.set_facecolor("#F8FAFC")
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 60)
    ax.axis("off")

    ax.text(50, 56, "IP54 Monsoon-Ruggedized Optical & Micro-Shear Stack (Exploded View)", fontsize=13.5, fontweight="bold", color=FOREST, ha="center")

    layers = [
        (8, "1. Polarized Optical Glass", "Blocks wet-leaf glare & dew speculars", "#E0F2FE", "#0284C7"),
        (23, "2. Diffused Ring-LED Array", "Uniform fill light under dense Assam shade", "#FEF3C7", AMBER),
        (38, "3. Global-Shutter RGB + Edge NPU", "25-30 FPS INT8 inference (<35 ms)", "#ECFDF5", EMERALD),
        (53, "4. 8-Aperture Micro-Shear Comb", "STM32/ESP32 UART trigger (<10 ms)", "#F1F5F9", FOREST),
        (68, "5. Sealed LiFePO4 + Pneumatic", "IP54 gasketed housing + UN38.3 pack", "#FCE7F3", ROSE),
    ]
    for x, title, sub, fc, ec in layers:
        ax.add_patch(patches.FancyBboxPatch((x, 16), 14, 28, boxstyle="round,pad=0.3,rounding_size=1.2", facecolor=fc, edgecolor=ec, linewidth=2))
        ax.text(x + 7, 36, title.split(". ")[0], color=ec, fontsize=16, fontweight="bold", ha="center")
        ax.text(x + 7, 29, title.split(". ")[1].replace(" ", "\n"), color=SLATE, fontsize=8.8, fontweight="bold", ha="center", va="center")
        ax.text(x + 7, 19.5, sub.replace(" & ", "\n& "), color=MUTED, fontsize=7.2, ha="center", va="center")

    for x in [22, 37, 52, 67]:
        ax.annotate("", xy=(x + 1, 30), xytext=(x - 0.2, 30), arrowprops=dict(arrowstyle="->", color=FOREST, lw=2))

    ax.text(50, 7, "Designed for high-humidity monsoon plucking rounds (IP54 ingress protection, <15W thermal envelope, replaceable blade cartridge).",
            color=MUTED, fontsize=9, ha="center", style="italic")

    fig.tight_layout(pad=0.5)
    fig.savefig(OUT_DIR / "ip54-exploded.png", dpi=160)
    plt.close(fig)


def make_pilot_chart():
    fig, ax = plt.subplots(figsize=(11, 5.6), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")
    ax.set_facecolor("#FFFFFF")

    metrics = ["Fine-Leaf Ratio (%)", "Bud Preservation (%)", "Throughput (kg/day)"]
    manual = [89, 97, 25]
    flat_shear = [60, 78, 62]
    teapluck = [88, 95, 53]

    x = np.arange(len(metrics))
    w = 0.25

    b1 = ax.bar(x - w, manual, w, label="Manual Plucking (Control A)", color="#64748B")
    b2 = ax.bar(x, flat_shear, w, label="Flat Motorized Shear (Control B)", color=ROSE)
    b3 = ax.bar(x + w, teapluck, w, label="TeaPluck AI Target (Arm C)", color=EMERALD)

    ax.set_xticks(x)
    ax.set_xticklabels(metrics, fontsize=10.5, fontweight="bold", color=SLATE)
    ax.set_ylim(0, 112)
    ax.set_ylabel("Score / Daily Output", fontsize=10, color=MUTED)
    ax.set_title("3-Arm TRA-Tocklai Pilot Comparison Targets (Months 10-12)", fontsize=13, fontweight="bold", color=FOREST, pad=12)
    ax.grid(axis="y", linestyle="--", alpha=0.35)
    ax.legend(frameon=True, facecolor="#F8FAFC")

    for bars in (b1, b2, b3):
        for bar in bars:
            h = bar.get_height()
            ax.text(bar.get_x() + bar.get_width() / 2, h + 1.8, f"{h}", ha="center", va="bottom", fontsize=9, fontweight="bold", color=SLATE)

    fig.tight_layout()
    fig.savefig(OUT_DIR / "pilot-benchmark-chart.png", dpi=160)
    plt.close(fig)


def make_gantt_timeline():
    fig, ax = plt.subplots(figsize=(12, 5.2), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")
    ax.set_facecolor("#F8FAFC")

    tasks = [
        ("Phase 4: TRA-Tocklai Field Trials & DFM BOM", 9, 3, AMBER),
        ("Phase 3: IP54 MVP, PWA & 50hr Burn-in", 6, 3, EMERALD),
        ("Phase 2: Micro-Shear Rig & HIL (<50ms)", 3, 3, "#0284C7"),
        ("Phase 1: Agronomic Spec, 5k Dataset & INT8 v1", 0, 3, FOREST),
    ]
    for idx, (label, start, dur, col) in enumerate(tasks):
        ax.barh(idx, dur, left=start, height=0.52, color=col, edgecolor="white", linewidth=1.5)
        ax.text(start + dur / 2, idx, f"M{start + 1}-M{start + dur}", color="white", fontweight="bold", fontsize=9.5, ha="center", va="center")

    ax.axvline(9, color=ROSE, linestyle="--", linewidth=2)
    ax.text(9.1, 3.42, "End of M9: Ready for Validation", color=ROSE, fontsize=9, fontweight="bold")

    ax.set_yticks(range(len(tasks)))
    ax.set_yticklabels([t[0] for t in tasks], fontsize=9.5, fontweight="bold", color=SLATE)
    ax.set_xticks(range(0, 13))
    ax.set_xticklabels([f"M{m}" for m in range(0, 13)], fontsize=9, color=MUTED)
    ax.set_xlim(0, 12.2)
    ax.set_ylim(-0.6, 3.8)
    ax.grid(axis="x", linestyle=":", alpha=0.5)
    ax.set_title("12-Month Development Roadmap & Validation Milestones (NESFIC-I-05)", fontsize=13, fontweight="bold", color=FOREST, pad=12)

    fig.tight_layout()
    fig.savefig(OUT_DIR / "gantt-timeline.png", dpi=160)
    plt.close(fig)


def make_cost_allocation():
    fig, ax = plt.subplots(figsize=(10.5, 5.5), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")

    labels = [
        "Technical Engineering Team\n₹20 Lakhs (50%)",
        "Hardware Prototyping & Units\n₹12 Lakhs (30%)",
        "Dataset & TRA Field Trials\n₹6 Lakhs (15%)",
        "Testing, Safety & IP Filing\n₹2 Lakhs (5%)",
    ]
    sizes = [50, 30, 15, 5]
    colors_pie = [FOREST, EMERALD, AMBER, "#0284C7"]

    wedges, texts = ax.pie(
        sizes,
        labels=labels,
        colors=colors_pie,
        startangle=140,
        wedgeprops=dict(width=0.44, edgecolor="white", linewidth=2.5),
        textprops=dict(fontsize=9.5, color=SLATE, fontweight="bold"),
        labeldistance=1.14,
    )
    ax.text(0, 0, "Total Grant\n₹40 Lakhs\n(12 Months)", ha="center", va="center", fontsize=11, fontweight="bold", color=FOREST)
    ax.set_title("Indicative Resource & Budget Allocation (₹40 Lakhs NESFIC Grant)", fontsize=13, fontweight="bold", color=FOREST, pad=14)

    fig.tight_layout()
    fig.savefig(OUT_DIR / "cost-allocation.png", dpi=160)
    plt.close(fig)


def make_operator_journey():
    fig, ax = plt.subplots(figsize=(12, 4.6), dpi=160)
    fig.patch.set_facecolor("#FFFFFF")
    ax.set_facecolor("#FFFFFF")
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 44)
    ax.axis("off")

    ax.text(50, 40, "4-Step Operator Field Workflow & Edge Latency Budget", fontsize=13.5, fontweight="bold", color=FOREST, ha="center")

    steps = [
        (4, "1. Pre-Field Setup", "2 mins", "Select Assam clone\n(TV1/TV23) & run\nlight balance", "#ECFDF5", EMERALD),
        (28, "2. AI Vision Lock", "<35 ms/frame", "INT8 NPU detects\n2L+Bud & locates\ninternode cut", "#E0F2FE", "#0284C7"),
        (52, "3. Selective Cut", "<10 ms trigger", "Aligned micro-shear\nclips target; pneumatic\ntube collects shoot", "#FEF3C7", AMBER),
        (76, "4. Shed Sync", "Offline -> BLE", "Logs Fine-Leaf %\n& kg/block to\nEstate PWA", "#F1F5F9", FOREST),
    ]
    for i, (x, title, badge, desc, fc, ec) in enumerate(steps):
        ax.add_patch(patches.FancyBboxPatch((x, 8), 20, 26, boxstyle="round,pad=0.3,rounding_size=1.5", facecolor=fc, edgecolor=ec, linewidth=2))
        ax.text(x + 10, 30.5, title, color=FOREST, fontsize=10, fontweight="bold", ha="center")
        ax.text(x + 10, 25.5, badge, color=ec, fontsize=8.5, fontweight="bold", ha="center",
                bbox=dict(boxstyle="round,pad=0.25", facecolor="white", edgecolor=ec, linewidth=1))
        ax.text(x + 10, 15.5, desc, color=SLATE, fontsize=8.3, ha="center", va="center")
        if i < len(steps) - 1:
            ax.annotate("", xy=(x + 23.6, 21), xytext=(x + 20.4, 21), arrowprops=dict(arrowstyle="->", color=FOREST, lw=2.2))

    fig.tight_layout(pad=0.4)
    fig.savefig(OUT_DIR / "operator-journey.png", dpi=160)
    plt.close(fig)


if __name__ == "__main__":
    make_hardware_concept()
    make_canopy_comparison()
    make_ip54_exploded()
    make_pilot_chart()
    make_gantt_timeline()
    make_cost_allocation()
    make_operator_journey()
    print("Generated 7 PNG visuals in", OUT_DIR)
