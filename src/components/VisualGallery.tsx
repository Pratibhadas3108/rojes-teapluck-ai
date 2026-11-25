export function VisualGallery() {
  const figures = [
    {
      src: '/images/hardware-concept.png',
      alt: 'TeaPluck AI handheld selective plucking head and ergonomic backpack harness',
      title: 'Fig 1. Handheld Selective Plucking Head & Harness (<2.2 kg)',
      caption: 'Combines an 8-aperture indexed micro-shear, polarized HDR camera, and pneumatic collection tube.',
    },
    {
      src: '/images/canopy-comparison.png',
      alt: 'Comparison of AI selective two leaves and a bud plucking versus flat motorized shear',
      title: 'Fig 2. AI Selective Plucking vs. Conventional Flat Shear',
      caption: 'Targets verified apical shoots while sparing immature buds and rejecting coarse maintenance leaves.',
    },
    {
      src: '/images/ip54-exploded.png',
      alt: 'Exploded diagram of IP54 weatherproof optical and micro-shear stack',
      title: 'Fig 3. IP54 Monsoon-Ruggedized Optical & Actuation Stack',
      caption: 'Polarized filter, ring-LED, INT8 Edge NPU (<35 ms), and sealed UN38.3 LiFePO4 battery pack.',
    },
    {
      src: '/images/pilot-benchmark-chart.png',
      alt: '3-Arm TRA-Tocklai pilot comparison chart comparing Manual, Flat Shear, and TeaPluck AI',
      title: 'Fig 4. 3-Arm TRA-Tocklai Pilot Comparison Targets',
      caption: 'Projected fine-leaf ratio (88%), bud preservation (95%), and 2x+ manual throughput.',
    },
    {
      src: '/images/operator-journey.png',
      alt: '4-Step operator field workflow and edge latency budget diagram',
      title: 'Fig 5. 4-Step Operator Field Workflow & Latency Budget',
      caption: '2-minute clone setup, <35 ms AI lock, <10 ms micro-shear trigger, and offline BLE shed sync.',
    },
    {
      src: '/images/gantt-timeline.png',
      alt: '12-Month NESFIC-I-05 development roadmap Gantt chart',
      title: 'Fig 6. 12-Month Development Roadmap & Milestones',
      caption: 'Phased TRL 4 to TRL 6 progression with formal TRA-Tocklai validation ready at End of Month 9.',
    },
    {
      src: '/images/cost-allocation.png',
      alt: 'Indicative 40 Lakhs grant resource and budget allocation donut chart',
      title: 'Fig 7. Indicative Resource & Budget Allocation (₹40 Lakhs Grant)',
      caption: '₹20L Technical Engineering Team (50%), ₹12L Hardware Prototyping (30%), ₹6L Field Trials (15%), ₹2L Testing & IP (5%).',
    },
  ];

  return (
    <section id="visual-evidence" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Visual Proof of Work</span>
          <h2 className="section-title">Hardware Concept, Selectivity &amp; Pilot Benchmarks</h2>
          <p className="section-desc">
            Engineering schematics and comparative benchmarks embedded in the NESFIC-I-05 Proof of Work PDF.
          </p>
        </div>

        <div className="grid-2">
          {figures.map((fig) => (
            <figure key={fig.src} className="card" style={{ margin: 0, padding: '1rem' }}>
              <img
                src={fig.src}
                alt={fig.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  display: 'block',
                }}
              />
              <figcaption style={{ marginTop: '0.75rem' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--forest-900)' }}>
                  {fig.title}
                </strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{fig.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
