import { useState } from 'react';
import { Leaf, ExternalLink, ShieldCheck } from 'lucide-react';
import { VisionSimulator } from './components/VisionSimulator';
import { VisualGallery } from './components/VisualGallery';
import { ArchitectureAndJourney } from './components/ArchitectureAndJourney';
import { AdminConsole } from './components/AdminConsole';
import { ProposalPortal } from './components/ProposalPortal';

export function App() {
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.78);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#overview" className="brand" aria-label="TeaPluck AI Home">
            <img src="/favicon.svg" alt="Rojes Labs Logo" width={36} height={36} />
            <div>
              <span className="brand-title">TeaPluck AI</span>
              <span className="brand-sub">Rojes Labs &bull; NESFIC-I-05</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary Navigation">
            <a href="#overview">Overview</a>
            <a href="#vision-simulator">Vision Simulator</a>
            <a href="#visual-evidence">Visuals</a>
            <a href="#architecture">Architecture</a>
            <a href="#admin">Admin Console</a>
            <a href="#proposal">NESFIC-I-05 Proposal</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="overview" className="hero">
          <div className="container hero-grid">
            <div>
              <span className="pill">
                <Leaf size={14} />
                NESFIC-I-05 &bull; Partner: TRA – Tocklai (New Technology Committee)
              </span>
              <h1>Low-Cost AI-Enabled Selective Tea Plucking</h1>
              <p>
                An edge-AI computer vision and indexed micro-shear solution engineered for Assam tea estates
                and small tea growers—preserving <strong>&ldquo;two leaves and a bud&rdquo;</strong> selectivity
                without expensive autonomous robotics.
              </p>

              <div className="hero-actions">
                <a href="#vision-simulator" className="btn btn-primary">
                  Launch Vision Simulator
                </a>
                <a href="#proposal" className="btn btn-secondary">
                  View 12-Section Proposal
                </a>
                <a
                  href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-i-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  NESFIC-I-05 Brief <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <aside className="hero-card" aria-label="Target System Specifications">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a7f3d0', fontSize: '0.84rem', fontWeight: 600 }}>
                <ShieldCheck size={17} />
                Target Field Specifications (TRL 4 → 6 Roadmap)
              </div>
              <div className="kpi-grid">
                <div className="kpi-box">
                  <div className="kpi-val">&ge;85%</div>
                  <div className="kpi-label">Target Fine-Leaf Ratio</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-val">&lt;35 ms</div>
                  <div className="kpi-label">Edge INT8 Inference</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-val">&lt;2.2 kg</div>
                  <div className="kpi-label">Handheld Head Weight</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-val">&lt;₹40k</div>
                  <div className="kpi-label">Target Scale Unit Cost</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <VisionSimulator
          confidenceThreshold={confidenceThreshold}
          onConfidenceChange={setConfidenceThreshold}
        />
        <VisualGallery />
        <ArchitectureAndJourney />
        <AdminConsole
          policyThreshold={confidenceThreshold}
          onPolicyChange={setConfidenceThreshold}
        />
        <ProposalPortal />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-disclaimer">
              <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.35rem' }}>
                Disclaimer
              </strong>
              This web application is an interactive prototype and Proof of Work demonstration developed by
              Rojes Labs for the North East Seva First Innovation Challenge (NESFIC-I-05). Simulated canopy
              detections, inference timings, and projected fine-leaf metrics are engineering targets for
              demonstration purposes and remain subject to controlled field validation with Tea Research
              Association (TRA) – Tocklai, Jorhat, Assam.
            </div>

            <div style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Lead Applicant:</strong> Pratibha Das Hatibaruah
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Organization:</strong> Rojes Labs (Assam, India)
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Challenge Code:</strong> NESFIC-I-05 (AI &amp; Crop Productivity)
              </div>
              <div style={{ marginTop: '0.45rem', display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
                <a href="#overview" style={{ color: '#6ee7b7', textDecoration: 'none' }}>Overview</a>
                <a href="#vision-simulator" style={{ color: '#6ee7b7', textDecoration: 'none' }}>Simulator</a>
                <a href="#architecture" style={{ color: '#6ee7b7', textDecoration: 'none' }}>Architecture</a>
                <a href="#proposal" style={{ color: '#6ee7b7', textDecoration: 'none' }}>Proposal</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; 2026 Rojes Labs. All rights reserved.</span>
            <span>Lead Applicant: Pratibha Das Hatibaruah &bull; Jorhat, Assam (IN-AS)</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
