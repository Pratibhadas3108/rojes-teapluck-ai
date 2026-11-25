import { BookOpen, Eye, Layers, Sliders, FileText, Image, ArrowRight, CheckCircle2 } from 'lucide-react';

export function TutorialSection() {
  const workflowSteps = [
    {
      icon: Eye,
      step: '01',
      title: 'Test the AI Vision Simulator',
      href: '#vision-simulator',
      cta: 'Open Vision Simulator',
      summary:
        'Switch between three Assam canopy scenarios (Dense Flush, Monsoon Wet, Mixed/Sparse) and drag the AI confidence threshold slider to see how TeaPluck AI separates harvestable "two leaves and a bud" shoots from immature buds and coarse banji.',
    },
    {
      icon: Image,
      step: '02',
      title: 'Explore Visual Evidence & Blueprints',
      href: '#visual-evidence',
      cta: 'View 7 Technical Figures',
      summary:
        'Inspect the hardware concept, canopy selectivity comparison, IP54+ sealed exploded assembly, pilot benchmark targets, operator workflow, 12-month Gantt timeline, and the ₹40 Lakh NESFIC-I-05 budget allocation.',
    },
    {
      icon: Layers,
      step: '03',
      title: 'Review Edge-to-Cloud Architecture',
      href: '#architecture',
      cta: 'Inspect Architecture',
      summary:
        'Follow the 4-layer hardware/software stack—HDR optics, INT8 edge NPU (<35 ms), indexed 8-aperture micro-shear head, and offline-first weighing-shed PWA—alongside the 4-step field operator journey.',
    },
    {
      icon: Sliders,
      step: '04',
      title: 'Operate the Estate Admin Console',
      href: '#admin',
      cta: 'Launch Admin Console',
      summary:
        'Use the 5-tab management console to tune block selectivity thresholds (synced live with the Vision Simulator), audit weighing-shed logs with CSV export, track A/B/C pilot plots, check fleet health/OTA, and export proposal JSON.',
    },
    {
      icon: FileText,
      step: '05',
      title: 'Copy & Submit the 12-Section Proposal',
      href: '#proposal',
      cta: 'Open Proposal Portal',
      summary:
        'Review all 12 NESFIC-I-05 sections (each verified under 500 words) and click "Copy Section" on any card to paste directly into the Assam Startup NESFIC 2026 submission portal.',
    },
  ];

  const capabilities = [
    'Real-time shoot classification ("two leaves & a bud" vs. immature/coarse)',
    'Cut-point stem localization & indexed micro-shear actuation simulation',
    'Live selectivity policy sync between Estate Admin Console & Vision Simulator',
    'Offline-first weighing-shed audit logs, CSV export, and A/B/C pilot tracking',
    'Complete 12-section NESFIC-I-05 proposal portal with one-click copy',
  ];

  return (
    <section id="tutorial" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <BookOpen size={14} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
            Application Guide &amp; Tutorial
          </span>
          <h2 className="section-title">What TeaPluck AI Does &amp; How to Use This App</h2>
          <p className="section-desc">
            A quick interactive walkthrough for TRA – Tocklai evaluators, tea estate managers, and NESFIC-I-05
            reviewers exploring Rojes Labs&apos; edge-AI selective plucking prototype.
          </p>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.12rem', color: '#064e3b' }}>
            What This Application Does
          </h3>
          <p style={{ margin: '0 0 1rem', color: '#1e293b', fontSize: '0.95rem' }}>
            <strong>TeaPluck AI</strong> is an interactive Proof-of-Work web application for{' '}
            <strong>NESFIC-I-05 (Low-Cost AI-Enabled Selective Tea Plucking)</strong>. It demonstrates how an
            affordable, handheld edge-AI vision system guides an indexed micro-shear cutter to harvest only mature{' '}
            <em>two leaves and a bud</em> shoots while sparing immature buds and rejecting coarse growth—connecting
            field devices directly to estate weighing-shed quality tracking.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem 1.25rem' }}>
            {capabilities.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#0f172a' }}>
                <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '0.2rem' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {workflowSteps.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.step}
                className="card"
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.85rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#065f46',
                        background: '#d1fae5',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '999px',
                      }}
                    >
                      <Icon size={14} />
                      Step {item.step}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.02rem', color: '#0f172a' }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>{item.summary}</p>
                </div>

                <div>
                  <a
                    href={item.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#059669',
                      textDecoration: 'none',
                    }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
