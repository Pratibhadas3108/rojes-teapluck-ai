import { Camera, Cpu, Scissors, Wifi, CheckSquare, ArrowRight } from 'lucide-react';

export function ArchitectureAndJourney() {
  const archLayers = [
    {
      icon: Camera,
      step: '01',
      title: 'HDR Optics & Ring-LED',
      detail: 'Global-shutter RGB camera with linear polarizer + diffused ring-LED to defeat Assam dew speculars and midday sunflecks.',
    },
    {
      icon: Cpu,
      step: '02',
      title: 'On-Device Edge NPU',
      detail: 'Quantized INT8 YOLOv8n/11n + 2-keypoint stem-cut detector running at 25–30 FPS (<35 ms) inside a <15W thermal envelope.',
    },
    {
      icon: Scissors,
      step: '03',
      title: 'Indexed Micro-Shear Head',
      detail: '8-aperture comb array with STM32/ESP32 UART trigger (<10 ms) that actuates only over verified Two Leaves & a Bud targets.',
    },
    {
      icon: Wifi,
      step: '04',
      title: 'Offline-First Estate PWA',
      detail: 'IndexedDB batch storage synced via BLE/Wi-Fi at the weighing shed to log fine-leaf %, kg plucked, and block productivity.',
    },
  ];

  const journeySteps = [
    {
      phase: 'Step 1 • Pre-Field Calibration (2 min)',
      desc: 'Operator powers on the 24V LiFePO4 backpack, picks the Assam clone profile (TV1, TV23, S.3A/3), and runs an ambient-light check.',
    },
    {
      phase: 'Step 2 • Guided Selective Plucking',
      desc: 'Operator glides the <2.2 kg head across the plucking table. Green LED + haptic cues confirm target lock while immature buds are spared.',
    },
    {
      phase: 'Step 3 • Pneumatic Shoot Collection',
      desc: 'Cut shoots are gently drawn through a low-pressure airflow channel into the collection basket without bruising the tender bud.',
    },
    {
      phase: 'Step 4 • Weighing Shed Sync',
      desc: 'Batch telemetry syncs to the TeaPluck AI dashboard, giving factory leaf-reception managers immediate Fine-Leaf % visibility.',
    },
  ];

  return (
    <>
      <section id="architecture" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">System Design</span>
            <h2 className="section-title">Edge-to-Cloud Technology Architecture</h2>
            <p className="section-desc">
              Engineered for zero-connectivity tea estates in Assam, balancing sub-₹40,000 target BOM cost at scale with IP54+ monsoon ruggedness.
            </p>
          </div>

          <div className="grid-4">
            {archLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article key={layer.step} className="card">
                  <div className="step-badge">{layer.step}</div>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Icon size={18} color="#059669" />
                    {layer.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{layer.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="user-journey" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Field Workflow &amp; Wireframes</span>
            <h2 className="section-title">Operator User Journey &amp; Estate Integration</h2>
            <p className="section-desc">
              Designed in alignment with Assam estate plucking-table ergonomics and TRA-Tocklai Fine-Leaf Count (FLC) grading standards.
            </p>
          </div>

          <div className="grid-2">
            {journeySteps.map((item) => (
              <div key={item.phase} className="card">
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--forest-900)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckSquare size={17} color="#059669" />
                  {item.phase}
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1.25rem', background: 'var(--surface-alt)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <strong style={{ fontSize: '0.98rem', color: 'var(--forest-900)' }}>
                  Pilot Validation Roadmap (TRA – Tocklai, Jorhat)
                </strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Months 10–12 controlled A/B/C trial: Manual Plucking vs. Flat Motorized Shear vs. TeaPluck AI across matched Assam plots.
                </p>
              </div>
              <a href="#proposal" className="btn btn-primary">
                Read Full 12-Section Proposal <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
