import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { PROPOSAL_SECTIONS } from '../data/proposalData';

export function ProposalPortal() {
  const [activeId, setActiveId] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const activeSection = PROPOSAL_SECTIONS.find((s) => s.id === activeId) ?? PROPOSAL_SECTIONS[0];
  const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleCopy = async (id: number, body: string) => {
    try {
      await navigator.clipboard.writeText(body);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <section id="proposal" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">NESFIC 2026 Submission Suite</span>
          <h2 className="section-title">NESFIC-I-05 Proposal Content (0–500 Words / Section)</h2>
          <p className="section-desc">
            Ready-to-paste proposal sections tailored for the Assam Startup NESFIC 2026 portal, each verified strictly under the 500-word limit.
          </p>
        </div>

        <div className="proposal-grid">
          <nav className="proposal-nav" aria-label="Proposal Sections">
            {PROPOSAL_SECTIONS.map((sec) => {
              const wc = countWords(sec.body);
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={sec.id === activeId ? 'active' : ''}
                  onClick={() => setActiveId(sec.id)}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sec.title}
                  </span>
                  <span className="word-badge">{wc}w</span>
                </button>
              );
            })}
          </nav>

          <article className="card">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                paddingBottom: '0.9rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={19} color="#059669" />
                  {activeSection.title}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Word Count: <strong>{countWords(activeSection.body)} / 500 words</strong> (Portal Compliant)
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleCopy(activeSection.id, activeSection.body)}
              >
                {copiedId === activeSection.id ? <Check size={16} /> : <Copy size={16} />}
                {copiedId === activeSection.id ? 'Copied!' : 'Copy Section'}
              </button>
            </div>

            <div className="proposal-body">{activeSection.body}</div>
          </article>
        </div>
      </div>
    </section>
  );
}
