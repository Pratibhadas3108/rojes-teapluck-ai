import { useEffect, useState } from 'react';
import { Play, RotateCcw, Crosshair, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CANOPY_SCENARIOS, SimulatedShoot } from '../data/proposalData';

interface VisionSimulatorProps {
  confidenceThreshold: number;
  onConfidenceChange: (val: number) => void;
}

export function VisionSimulator({ confidenceThreshold, onConfidenceChange }: VisionSimulatorProps) {
  const [scenarioId, setScenarioId] = useState<string>(CANOPY_SCENARIOS[0].id);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showCutPoints, setShowCutPoints] = useState<boolean>(true);
  const [showRejected, setShowRejected] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanY, setScanY] = useState<number>(0);
  const [pluckedIds, setPluckedIds] = useState<string[]>([]);

  const scenario = CANOPY_SCENARIOS.find((s) => s.id === scenarioId) ?? CANOPY_SCENARIOS[0];

  const isHarvestable = (shoot: SimulatedShoot) =>
    shoot.shootClass === 'two-leaves-bud' && shoot.confidence >= confidenceThreshold;

  const harvestableTotal = scenario.shoots.filter(isHarvestable).length;
  const rejectedTotal = scenario.shoots.length - harvestableTotal;
  const fineLeafRatio =
    harvestableTotal + rejectedTotal > 0
      ? Math.round((harvestableTotal / (harvestableTotal + 0.15 * rejectedTotal)) * 100)
      : 0;

  useEffect(() => {
    setPluckedIds([]);
    setIsScanning(false);
    setScanY(0);
  }, [scenarioId, confidenceThreshold]);

  useEffect(() => {
    if (!isScanning) return;
    const interval = window.setInterval(() => {
      setScanY((prev) => {
        const next = prev + 8;
        const newlyPlucked = scenario.shoots
          .filter((s) => isHarvestable(s) && s.cutY <= next)
          .map((s) => s.id);
        setPluckedIds(newlyPlucked);

        if (next >= 330) {
          setIsScanning(false);
          return 330;
        }
        return next;
      });
    }, 45);
    return () => window.clearInterval(interval);
  }, [isScanning, scenario, confidenceThreshold]);

  const startPass = () => {
    setPluckedIds([]);
    setScanY(10);
    setIsScanning(true);
  };

  const resetPass = () => {
    setIsScanning(false);
    setScanY(0);
    setPluckedIds([]);
  };

  const getColor = (shoot: SimulatedShoot) => {
    if (isHarvestable(shoot)) return '#34d399';
    if (shoot.shootClass === 'immature-bud') return '#fbbf24';
    if (shoot.shootClass === 'banji') return '#38bdf8';
    return '#fb7185';
  };

  return (
    <section id="vision-simulator" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Interactive Proof of Work</span>
          <h2 className="section-title">Edge-AI Selective Plucking Vision Simulator</h2>
          <p className="section-desc">
            Inspect how TeaPluck AI differentiates harvestable <strong>&ldquo;Two Leaves &amp; a Bud&rdquo;</strong>{' '}
            shoots from immature buds, banji, and coarse maintenance foliage across Assam lighting regimes,
            triggering indexed micro-shears only at verified internode cut points.
          </p>
        </div>

        <div className="sim-layout">
          <div className="sim-viewport" role="region" aria-label="AI Canopy Vision Viewport">
            <div className="sim-hud-bar">
              <span>
                <Cpu size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                INT8 Edge NPU: <strong>{scenario.inferenceMs} ms/frame</strong> ({Math.round(1000 / scenario.inferenceMs)} FPS)
              </span>
              <span>
                Clone: <strong>{scenario.clone}</strong> &bull; {scenario.ambientLux}
              </span>
            </div>

            <svg
              viewBox="0 0 640 340"
              style={{ width: '100%', display: 'block', background: scenario.bgTint }}
              aria-label={`Simulated tea canopy for ${scenario.name}`}
            >
              {/* Subtle canopy foliage texture */}
              <defs>
                <pattern id="canopyGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(52,211,153,0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="640" height="340" fill="url(#canopyGrid)" />

              {/* Maintenance foliage clusters */}
              {[
                [90, 120],
                [210, 150],
                [330, 115],
                [460, 140],
                [560, 125],
                [150, 260],
                [295, 250],
                [430, 265],
                [540, 255],
              ].map(([cx, cy], idx) => (
                <ellipse
                  key={idx}
                  cx={cx}
                  cy={cy}
                  rx={54}
                  ry={28}
                  fill="#0b3b24"
                  opacity={0.75}
                />
              ))}

              {/* Shoots */}
              {scenario.shoots.map((shoot) => {
                const harvestable = isHarvestable(shoot);
                const plucked = pluckedIds.includes(shoot.id);
                const color = getColor(shoot);

                if (!harvestable && !showRejected) {
                  return null;
                }

                return (
                  <g key={shoot.id} opacity={plucked ? 0.35 : 1}>
                    {/* Stylized Tea Shoot */}
                    <line
                      x1={shoot.cutX}
                      y1={shoot.cutY + 6}
                      x2={shoot.cutX}
                      y2={shoot.y + 18}
                      stroke="#86efac"
                      strokeWidth={shoot.shootClass === 'coarse-leaf' ? 4 : 2.5}
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx={shoot.cutX - 13}
                      cy={shoot.y + 34}
                      rx={14}
                      ry={7}
                      transform={`rotate(-28 ${shoot.cutX - 13} ${shoot.y + 34})`}
                      fill={shoot.shootClass === 'coarse-leaf' ? '#166534' : '#22c55e'}
                    />
                    <ellipse
                      cx={shoot.cutX + 13}
                      cy={shoot.y + 26}
                      rx={14}
                      ry={7}
                      transform={`rotate(26 ${shoot.cutX + 13} ${shoot.y + 26})`}
                      fill={shoot.shootClass === 'coarse-leaf' ? '#15803d' : '#4ade80'}
                    />
                    {shoot.shootClass !== 'coarse-leaf' && (
                      <path
                        d={`M${shoot.cutX} ${shoot.y + 20} C${shoot.cutX} ${shoot.y + 10} ${shoot.cutX + 5} ${shoot.y + 6} ${shoot.cutX + 5} ${shoot.y + 6} C${shoot.cutX + 5} ${shoot.y + 6} ${shoot.cutX - 3} ${shoot.y + 9} ${shoot.cutX - 2} ${shoot.y + 18}`}
                        fill="#bef264"
                      />
                    )}

                    {/* Bounding Box */}
                    {showBoxes && (
                      <g>
                        <rect
                          x={shoot.x}
                          y={shoot.y}
                          width={shoot.w}
                          height={shoot.h}
                          rx={6}
                          fill="none"
                          stroke={color}
                          strokeWidth={harvestable ? 2 : 1.5}
                          strokeDasharray={harvestable ? undefined : '4 3'}
                        />
                        <rect
                          x={shoot.x}
                          y={shoot.y - 16}
                          width={shoot.w + 26}
                          height={15}
                          rx={4}
                          fill={color}
                        />
                        <text
                          x={shoot.x + 4}
                          y={shoot.y - 5}
                          fontSize="9.5"
                          fontWeight="700"
                          fill="#042014"
                        >
                          {plucked ? 'PLUCKED' : `${shoot.label} ${(shoot.confidence * 100).toFixed(0)}%`}
                        </text>
                      </g>
                    )}

                    {/* Cut Point */}
                    {showCutPoints && harvestable && !plucked && (
                      <g>
                        <circle
                          cx={shoot.cutX}
                          cy={shoot.cutY}
                          r={6}
                          fill="rgba(251,191,36,0.25)"
                          stroke="#fbbf24"
                          strokeWidth={1.8}
                        />
                        <line
                          x1={shoot.cutX - 9}
                          y1={shoot.cutY}
                          x2={shoot.cutX + 9}
                          y2={shoot.cutY}
                          stroke="#fbbf24"
                          strokeWidth={1.5}
                        />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Animated 8-Aperture Micro-Shear Scan Bar */}
              {(isScanning || scanY > 0) && (
                <g transform={`translate(0, ${scanY})`}>
                  <rect
                    x="24"
                    y="-10"
                    width="592"
                    height="20"
                    rx="6"
                    fill="rgba(16, 185, 129, 0.22)"
                    stroke="#34d399"
                    strokeWidth="1.5"
                  />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((slot) => (
                    <rect
                      key={slot}
                      x={42 + slot * 72}
                      y="-5"
                      width="48"
                      height="10"
                      rx="3"
                      fill="rgba(251, 191, 36, 0.35)"
                      stroke="#fbbf24"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>

          <div className="card sim-controls">
            <div className="control-group">
              <label>1. Field Lighting &amp; Assam Clone Scenario</label>
              <div className="scenario-pills">
                {CANOPY_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    className={`scenario-btn ${scenarioId === sc.id ? 'active' : ''}`}
                    onClick={() => setScenarioId(sc.id)}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.45rem 0 0' }}>
                {scenario.lighting}
              </p>
            </div>

            <div className="control-group">
              <label htmlFor="conf-slider">
                2. Actuation Confidence Threshold: <strong>{(confidenceThreshold * 100).toFixed(0)}%</strong>
              </label>
              <input
                id="conf-slider"
                type="range"
                min={0.65}
                max={0.93}
                step={0.01}
                value={confidenceThreshold}
                onChange={(e) => onConfidenceChange(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="control-group">
              <label>3. Vision Overlay Layers</label>
              <div className="toggle-list">
                <label className="toggle-item">
                  <input type="checkbox" checked={showBoxes} onChange={(e) => setShowBoxes(e.target.checked)} />
                  Bounding Boxes
                </label>
                <label className="toggle-item">
                  <input
                    type="checkbox"
                    checked={showCutPoints}
                    onChange={(e) => setShowCutPoints(e.target.checked)}
                  />
                  Internode Cut Points
                </label>
                <label className="toggle-item">
                  <input
                    type="checkbox"
                    checked={showRejected}
                    onChange={(e) => setShowRejected(e.target.checked)}
                  />
                  Show Rejected Classes
                </label>
              </div>
            </div>

            <div className="stat-row">
              <div className="stat-mini">
                <strong>
                  {pluckedIds.length}/{harvestableTotal}
                </strong>
                <span>Fine Shoots Plucked</span>
              </div>
              <div className="stat-mini">
                <strong>{rejectedTotal}</strong>
                <span>Coarse/Buds Spared</span>
              </div>
              <div className="stat-mini">
                <strong>{fineLeafRatio}%</strong>
                <span>Projected Fine-Leaf</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" onClick={startPass} disabled={isScanning}>
                <Play size={16} />
                {isScanning ? 'Scanning Canopy...' : 'Run Selective Plucking Pass'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetPass}>
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                paddingTop: '0.25rem',
              }}
            >
              {pluckedIds.length === harvestableTotal && harvestableTotal > 0 ? (
                <>
                  <CheckCircle2 size={15} color="#059669" />
                  <span>Pass complete: {harvestableTotal} tender shoots harvested, {rejectedTotal} non-target shoots preserved.</span>
                </>
              ) : (
                <>
                  <Crosshair size={15} color="#d97706" />
                  <span>
                    <AlertTriangle size={12} style={{ display: 'none' }} />
                    Prototype simulation: click &ldquo;Run Selective Plucking Pass&rdquo; to test indexed micro-shear actuation.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
