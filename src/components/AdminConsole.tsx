import { useState } from 'react';
import {
  MapPin,
  Sliders,
  ClipboardList,
  FlaskConical,
  Cpu,
  FileEdit,
  Download,
  Plus,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { PROPOSAL_SECTIONS, ProposalSection } from '../data/proposalData';

type AdminTab = 'blocks' | 'ledger' | 'pilot' | 'fleet' | 'editor';

interface EstateBlock {
  id: string;
  name: string;
  clone: string;
  roundDays: number;
  cutOffsetMm: number;
  active: boolean;
}

interface BatchLog {
  batchId: string;
  date: string;
  block: string;
  operator: string;
  kgPlucked: number;
  fineLeafPct: number;
  coarseRejectedPct: number;
}

interface PilotTrial {
  id: string;
  date: string;
  plot: string;
  arm: 'Manual (A)' | 'Flat Shear (B)' | 'TeaPluck AI (C)';
  fineLeafPct: number;
  kgPerHour: number;
  recovery14d: string;
}

interface FleetUnit {
  unitId: string;
  block: string;
  firmware: string;
  modelVersion: string;
  batterySoH: number;
  bladeWearPct: number;
  jamCount: number;
  status: 'Online (Sync)' | 'Field Active' | 'Maintenance Due';
}

interface AdminConsoleProps {
  policyThreshold: number;
  onPolicyChange: (val: number) => void;
}

export function AdminConsole({ policyThreshold, onPolicyChange }: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('blocks');

  // 1. Estate Block & Clone Profile Manager
  const [blocks, setBlocks] = useState<EstateBlock[]>([
    { id: 'BLK-01', name: 'Jorhat Sec-4 (Tocklai Adj.)', clone: 'TV1', roundDays: 7, cutOffsetMm: 14, active: true },
    { id: 'BLK-02', name: 'Titabor Block B', clone: 'TV23', roundDays: 8, cutOffsetMm: 16, active: true },
    { id: 'BLK-03', name: 'Dibrugarh East Sec-2', clone: 'S.3A/3', roundDays: 9, cutOffsetMm: 15, active: true },
  ]);
  const [newBlockName, setNewBlockName] = useState('');
  const [newClone, setNewClone] = useState('TV25');

  // 2. Weighing Shed Batch Audit Ledger
  const [batches] = useState<BatchLog[]>([
    { batchId: 'B-2026-101', date: '2026-11-24', block: 'Jorhat Sec-4', operator: 'OP-14 (M. Gogoi)', kgPlucked: 48.6, fineLeafPct: 89.2, coarseRejectedPct: 94.1 },
    { batchId: 'B-2026-102', date: '2026-11-24', block: 'Titabor Block B', operator: 'OP-09 (P. Bora)', kgPlucked: 52.1, fineLeafPct: 87.5, coarseRejectedPct: 91.8 },
    { batchId: 'B-2026-103', date: '2026-11-25', block: 'Dibrugarh East', operator: 'OP-21 (R. Saikia)', kgPlucked: 45.9, fineLeafPct: 90.4, coarseRejectedPct: 95.0 },
  ]);
  const [batchFilter, setBatchFilter] = useState('');

  // 3. TRA-Tocklai A/B/C Pilot Trial Tracker
  const [trials, setTrials] = useState<PilotTrial[]>([
    { id: 'TR-01', date: '2026-11-20', plot: 'TRA Plot-A1 (TV1)', arm: 'Manual (A)', fineLeafPct: 91.0, kgPerHour: 3.4, recovery14d: 'Healthy flush' },
    { id: 'TR-02', date: '2026-11-20', plot: 'TRA Plot-A2 (TV1)', arm: 'Flat Shear (B)', fineLeafPct: 58.5, kgPerHour: 8.2, recovery14d: 'Moderate bruising' },
    { id: 'TR-03', date: '2026-11-20', plot: 'TRA Plot-A3 (TV1)', arm: 'TeaPluck AI (C)', fineLeafPct: 88.4, kgPerHour: 6.9, recovery14d: 'Clean internode' },
  ]);
  const [trialPlot, setTrialPlot] = useState('');
  const [trialArm, setTrialArm] = useState<PilotTrial['arm']>('TeaPluck AI (C)');
  const [trialFinePct, setTrialFinePct] = useState('89.0');

  // 4. Fleet Health & OTA Model Versioning
  const [fleet, setFleet] = useState<FleetUnit[]>([
    { unitId: 'TP-EDGE-01', block: 'Jorhat Sec-4', firmware: 'v1.4.2', modelVersion: 'yolov8n-tea-int8-v1.0', batterySoH: 98, bladeWearPct: 12, jamCount: 1, status: 'Online (Sync)' },
    { unitId: 'TP-EDGE-02', block: 'Titabor Block B', firmware: 'v1.4.2', modelVersion: 'yolov8n-tea-int8-v1.0', batterySoH: 95, bladeWearPct: 24, jamCount: 2, status: 'Field Active' },
    { unitId: 'TP-EDGE-03', block: 'Dibrugarh East', firmware: 'v1.4.1', modelVersion: 'yolov8n-tea-int8-v0.9', batterySoH: 91, bladeWearPct: 68, jamCount: 5, status: 'Maintenance Due' },
  ]);
  const [otaDone, setOtaDone] = useState(false);

  // 5. Proposal Editor & Export Center
  const [editableSections, setEditableSections] = useState<ProposalSection[]>(PROPOSAL_SECTIONS);
  const [editId, setEditId] = useState<number>(1);

  const addBlock = () => {
    if (!newBlockName.trim()) return;
    setBlocks((prev) => [
      ...prev,
      {
        id: `BLK-0${prev.length + 1}`,
        name: newBlockName.trim(),
        clone: newClone,
        roundDays: 8,
        cutOffsetMm: 15,
        active: true,
      },
    ]);
    setNewBlockName('');
  };

  const toggleBlock = (id: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  };

  const addTrial = () => {
    if (!trialPlot.trim()) return;
    setTrials((prev) => [
      ...prev,
      {
        id: `TR-0${prev.length + 1}`,
        date: '2026-11-25',
        plot: trialPlot.trim(),
        arm: trialArm,
        fineLeafPct: parseFloat(trialFinePct) || 85,
        kgPerHour: trialArm === 'Manual (A)' ? 3.5 : trialArm === 'Flat Shear (B)' ? 8.0 : 6.8,
        recovery14d: 'Pending 14d check',
      },
    ]);
    setTrialPlot('');
  };

  const pushOtaUpdate = () => {
    setFleet((prev) =>
      prev.map((u) => ({
        ...u,
        firmware: 'v1.5.0',
        modelVersion: 'yolov8n-tea-int8-v1.1',
      })),
    );
    setOtaDone(true);
    window.setTimeout(() => setOtaDone(false), 2500);
  };

  const exportCsv = () => {
    const header = 'BatchID,Date,Block,Operator,KgPlucked,FineLeafPct,CoarseRejectedPct\n';
    const rows = batches
      .map((b) => `${b.batchId},${b.date},"${b.block}","${b.operator}",${b.kgPlucked},${b.fineLeafPct},${b.coarseRejectedPct}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teapluck_weighing_shed_ledger.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportProposalJson = () => {
    const blob = new Blob([JSON.stringify(editableSections, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nesfic-i-05-proposal-sections.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentEdit = editableSections.find((s) => s.id === editId) ?? editableSections[0];
  const editWordCount = currentEdit.body.trim().split(/\s+/).filter(Boolean).length;

  const filteredBatches = batches.filter(
    (b) =>
      b.block.toLowerCase().includes(batchFilter.toLowerCase()) ||
      b.operator.toLowerCase().includes(batchFilter.toLowerCase()) ||
      b.batchId.toLowerCase().includes(batchFilter.toLowerCase()),
  );

  return (
    <section id="admin" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Operations &amp; Governance</span>
          <h2 className="section-title">Estate &amp; TRA-Tocklai Pilot Admin Console</h2>
          <p className="section-desc">
            Manage Assam estate blocks, selectivity grade policies, weighing-shed Fine-Leaf Count (FLC) audits,
            A/B/C pilot trial logs, edge fleet OTA models, and proposal exports.
          </p>
        </div>

        <div className="admin-tabs" role="tablist" aria-label="Admin Console Modules">
          <button type="button" role="tab" aria-selected={activeTab === 'blocks'} className={`scenario-btn ${activeTab === 'blocks' ? 'active' : ''}`} onClick={() => setActiveTab('blocks')}>
            <MapPin size={14} /> Blocks &amp; Selectivity Policy
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'ledger'} className={`scenario-btn ${activeTab === 'ledger' ? 'active' : ''}`} onClick={() => setActiveTab('ledger')}>
            <ClipboardList size={14} /> Weighing Shed Audit
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'pilot'} className={`scenario-btn ${activeTab === 'pilot' ? 'active' : ''}`} onClick={() => setActiveTab('pilot')}>
            <FlaskConical size={14} /> A/B/C Pilot Tracker
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'fleet'} className={`scenario-btn ${activeTab === 'fleet' ? 'active' : ''}`} onClick={() => setActiveTab('fleet')}>
            <Cpu size={14} /> Fleet Health &amp; OTA
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'editor'} className={`scenario-btn ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => setActiveTab('editor')}>
            <FileEdit size={14} /> Proposal Editor &amp; Export
          </button>
        </div>

        {activeTab === 'blocks' && (
          <div className="grid-2">
            <div className="card">
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '1.05rem' }}>
                <Sliders size={17} color="#059669" /> Selectivity Grade Policy (Synced to Simulator)
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Push confidence thresholds to field units during weighing-shed sync. Current threshold:{' '}
                <strong>{(policyThreshold * 100).toFixed(0)}%</strong>.
              </p>
              <div className="scenario-pills">
                {[
                  { label: 'Strict Orthodox Fine (85%)', val: 0.85 },
                  { label: 'Balanced Dual-Grade (78%)', val: 0.78 },
                  { label: 'Standard CTC Flush (75%)', val: 0.75 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className={`scenario-btn ${Math.abs(policyThreshold - preset.val) < 0.01 ? 'active' : ''}`}
                    onClick={() => onPolicyChange(preset.val)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0, fontSize: '1.05rem' }}>Estate Block &amp; Clone Profiles</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="New block name (e.g. Golaghat Sec-1)"
                  value={newBlockName}
                  onChange={(e) => setNewBlockName(e.target.value)}
                  className="admin-input"
                />
                <select value={newClone} onChange={(e) => setNewClone(e.target.value)} className="admin-input" style={{ maxWidth: 110 }}>
                  <option value="TV1">TV1</option>
                  <option value="TV23">TV23</option>
                  <option value="TV25">TV25</option>
                  <option value="S.3A/3">S.3A/3</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={addBlock}>
                  <Plus size={15} /> Add
                </button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Block</th>
                      <th>Clone</th>
                      <th>Cycle</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.map((b) => (
                      <tr key={b.id}>
                        <td>{b.name}</td>
                        <td>{b.clone}</td>
                        <td>{b.roundDays}d / {b.cutOffsetMm}mm</td>
                        <td>
                          <button type="button" className="scenario-btn" onClick={() => toggleBlock(b.id)}>
                            {b.active ? 'Active' : 'Paused'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Filter by block, operator, or batch ID..."
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="admin-input"
                style={{ maxWidth: 320 }}
              />
              <button type="button" className="btn btn-primary" onClick={exportCsv}>
                <Download size={16} /> Export CSV Ledger
              </button>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Date</th>
                    <th>Block</th>
                    <th>Operator</th>
                    <th>Green Leaf (kg)</th>
                    <th>Fine-Leaf % (FLC)</th>
                    <th>Coarse Rejected %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((b) => (
                    <tr key={b.batchId}>
                      <td><strong>{b.batchId}</strong></td>
                      <td>{b.date}</td>
                      <td>{b.block}</td>
                      <td>{b.operator}</td>
                      <td>{b.kgPlucked.toFixed(1)} kg</td>
                      <td><strong style={{ color: '#059669' }}>{b.fineLeafPct}%</strong></td>
                      <td>{b.coarseRejectedPct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pilot' && (
          <div className="card">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Plot ID (e.g. TRA Plot-B1)"
                value={trialPlot}
                onChange={(e) => setTrialPlot(e.target.value)}
                className="admin-input"
                style={{ maxWidth: 220 }}
              />
              <select value={trialArm} onChange={(e) => setTrialArm(e.target.value as PilotTrial['arm'])} className="admin-input" style={{ maxWidth: 180 }}>
                <option value="Manual (A)">Manual (A)</option>
                <option value="Flat Shear (B)">Flat Shear (B)</option>
                <option value="TeaPluck AI (C)">TeaPluck AI (C)</option>
              </select>
              <input
                type="number"
                step="0.1"
                value={trialFinePct}
                onChange={(e) => setTrialFinePct(e.target.value)}
                className="admin-input"
                style={{ maxWidth: 110 }}
                aria-label="Fine Leaf Percentage"
              />
              <button type="button" className="btn btn-primary" onClick={addTrial}>
                <Plus size={15} /> Log Trial Arm
              </button>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Trial ID</th>
                    <th>Date</th>
                    <th>Plot</th>
                    <th>Trial Arm</th>
                    <th>Fine-Leaf %</th>
                    <th>Throughput</th>
                    <th>14-Day Bush Recovery</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((t) => (
                    <tr key={t.id}>
                      <td><strong>{t.id}</strong></td>
                      <td>{t.date}</td>
                      <td>{t.plot}</td>
                      <td>{t.arm}</td>
                      <td><strong>{t.fineLeafPct}%</strong></td>
                      <td>{t.kgPerHour} kg/hr</td>
                      <td>{t.recovery14d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Edge Unit Fleet &amp; OTA Model Registry</h3>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Latest quantized release: <code>yolov8n-tea-int8-v1.1</code> (31 ms @ Hailo-8L / Orin Nano)
                </span>
              </div>
              <button type="button" className="btn btn-primary" onClick={pushOtaUpdate}>
                {otaDone ? <CheckCircle2 size={16} /> : <RefreshCw size={16} />}
                {otaDone ? 'OTA Pushed to Fleet!' : 'Push OTA Model v1.1'}
              </button>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Unit ID</th>
                    <th>Assigned Block</th>
                    <th>Firmware / Model</th>
                    <th>Battery SoH</th>
                    <th>Blade Wear</th>
                    <th>Anti-Jam Triggers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fleet.map((u) => (
                    <tr key={u.unitId}>
                      <td><strong>{u.unitId}</strong></td>
                      <td>{u.block}</td>
                      <td>{u.firmware} &bull; <code>{u.modelVersion}</code></td>
                      <td>{u.batterySoH}%</td>
                      <td>{u.bladeWearPct}%</td>
                      <td>{u.jamCount}</td>
                      <td>{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem' }}>
              <select
                value={editId}
                onChange={(e) => setEditId(Number(e.target.value))}
                className="admin-input"
                style={{ maxWidth: 380 }}
                aria-label="Select proposal section to edit"
              >
                {editableSections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: editWordCount > 500 ? '#e11d48' : '#059669' }}>
                  {editWordCount} / 500 words
                </span>
                <button type="button" className="btn btn-primary" onClick={exportProposalJson}>
                  <Download size={15} /> Export JSON
                </button>
              </div>
            </div>
            <textarea
              rows={11}
              value={currentEdit.body}
              onChange={(e) => {
                const val = e.target.value;
                setEditableSections((prev) => prev.map((s) => (s.id === editId ? { ...s, body: val } : s)));
              }}
              className="admin-input"
              style={{ width: '100%', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
