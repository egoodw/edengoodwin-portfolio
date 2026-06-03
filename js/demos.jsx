/* Interactive demos: Langmuir, TGA, ALD cycle */

// ---------- Shared chart helpers ----------
function AxisLabel({ x, y, children, anchor = "middle", rotate = 0 }) {
  return (
    <text
      x={x} y={y}
      textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fill: "var(--ink-3)",
      }}
    >{children}</text>
  );
}

function Tick({ x, y, children, anchor = "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} style={{
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fill: "var(--ink-3)",
    }}>{children}</text>
  );
}

// =================================================================
// 1. Langmuir Adsorption Isotherm - uptake vs exposure time
// =================================================================
function LangmuirDemo() {
  const EQ_COLORS = {
    ka: "#2E8B57",
    kd: "#C74343",
    p: "#C97A1A",
    thetaMax: "#2D6FA3",
  };

  const [kA, setKA] = useState(2.5);
  const [kD, setKD] = useState(0.3);
  const [P, setP] = useState(0.5);
  const [thetaMax, setThetaMax] = useState(180);
  const [showMulti, setShowMulti] = useState(true);

  const W = 640, H = 318;
  const M = { l: 60, r: 24, t: 20, b: 44 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const tMax = 10;
  const yMax = 250;
  const x2px = t => M.l + (t / tMax) * iw;
  const y2px = q => M.t + ih - (q / yMax) * ih;

  const kNet = Math.max(0, kA * P - kD);

  const path = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * tMax;
      const q = thetaMax * (1 - Math.exp(-kNet * t));
      pts.push(`${x2px(t).toFixed(2)},${y2px(q).toFixed(2)}`);
    }
    return "M " + pts.join(" L ");
  }, [kNet, thetaMax]);

  const comparisons = showMulti ? [
    { P: P * 0.3, color: "var(--ink-4)" },
    { P: P * 3, color: "var(--c2)" },
  ] : [];

  const compPaths = comparisons.map(c => {
    const kc = Math.max(0, kA * c.P - kD);
    const pts = [];
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * tMax;
      const q = thetaMax * (1 - Math.exp(-kc * t));
      pts.push(`${x2px(t).toFixed(2)},${y2px(q).toFixed(2)}`);
    }
    return { ...c, d: "M " + pts.join(" L ") };
  });

  const t50 = kNet > 0 ? Math.log(2) / kNet : Infinity;
  const t90 = kNet > 0 ? Math.log(10) / kNet : Infinity;
  const t50Show = isFinite(t50) && t50 <= tMax;
  const t90Show = isFinite(t90) && t90 <= tMax;

  return (
    <div className="demo-card">
      <div className="demo-head">
        <div>
          <div className="label label-accent">Demo 01</div>
          <h3 className="serif" style={{ fontSize: 24, marginTop: 6 }}>
            Langmuir uptake - coverage vs. exposure time
          </h3>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 320px",
        gap: 24,
        alignItems: "start",
      }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {[0, 50, 100, 150, 200, 250].map(q => (
            <line key={q} x1={M.l} x2={W - M.r} y1={y2px(q)} y2={y2px(q)}
              stroke="var(--rule-soft)" strokeWidth="1" strokeDasharray="2 4" />
          ))}
          {[0, 2, 4, 6, 8, 10].map(t => (
            <line key={t} y1={M.t} y2={H - M.b} x1={x2px(t)} x2={x2px(t)}
              stroke="var(--rule-soft)" strokeWidth="1" strokeDasharray="2 4" />
          ))}

          <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} stroke="var(--ink)" strokeWidth="1.5" />
          <line x1={M.l} x2={M.l} y1={M.t} y2={H - M.b} stroke="var(--ink)" strokeWidth="1.5" />

          {[0, 2, 4, 6, 8, 10].map(t => (
            <g key={t}>
              <line x1={x2px(t)} x2={x2px(t)} y1={H - M.b} y2={H - M.b + 4} stroke="var(--ink)" />
              <Tick x={x2px(t)} y={H - M.b + 18}>{t}</Tick>
            </g>
          ))}

          {[0, 50, 100, 150, 200, 250].map(q => (
            <g key={q}>
              <line x1={M.l - 4} x2={M.l} y1={y2px(q)} y2={y2px(q)} stroke="var(--ink)" />
              <Tick x={M.l - 10} y={y2px(q) + 3} anchor="end">{q}</Tick>
            </g>
          ))}

          <line x1={M.l} x2={W - M.r} y1={y2px(thetaMax)} y2={y2px(thetaMax)}
            stroke="var(--ink-4)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <text x={W - M.r - 6} y={y2px(thetaMax) - 6} textAnchor="end" style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink-3)", fontWeight: 700,
            paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 3,
          }}>
            θ<tspan dy="3" fontSize="9">max</tspan><tspan dy="-3"> = {thetaMax.toFixed(0)} ng cm⁻²</tspan>
          </text>

          {compPaths.map((c, i) => (
            <path key={i} d={c.d} fill="none" stroke={c.color} strokeWidth="1.5" opacity="0.7" strokeDasharray="3 3" />
          ))}

          <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

          {t50Show && (
            <g>
              <circle cx={x2px(t50)} cy={y2px(thetaMax * 0.5)} r="4"
                fill="var(--paper)" stroke="var(--ink-2)" strokeWidth="2" />
              <line x1={x2px(t50)} x2={x2px(t50)} y1={y2px(thetaMax * 0.5)} y2={H - M.b}
                stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" opacity="0.45" />
              <text x={x2px(t50) + 10} y={y2px(thetaMax * 0.5) - 10} style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink-2)", fontWeight: 700,
                paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 3,
              }}>t<tspan dy="3" fontSize="9">50</tspan><tspan dy="-3"> = {t50.toFixed(2)} s</tspan></text>
            </g>
          )}

          {t90Show && (
            <g>
              <circle cx={x2px(t90)} cy={y2px(thetaMax * 0.9)} r="5"
                fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
              <line x1={x2px(t90)} x2={x2px(t90)} y1={y2px(thetaMax * 0.9)} y2={H - M.b}
                stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
              <text x={x2px(t90) + 10} y={y2px(thetaMax * 0.9) - 14} style={{
                fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--accent)", fontWeight: 700,
                paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 3,
              }}>t<tspan dy="3" fontSize="9">90</tspan><tspan dy="-3"> = {t90.toFixed(2)} s</tspan></text>
            </g>
          )}

          <AxisLabel x={M.l + iw / 2} y={H - 12}>Exposure time (t) — s</AxisLabel>
          <AxisLabel x={14} y={M.t + ih / 2} rotate={-90}>Areal Coverage (θ(t)) — ng cm⁻²</AxisLabel>
        </svg>

        <div className="demo-controls" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
          <div className="mono" style={{
            fontSize: 12,
            color: "var(--accent)",
            border: "1px solid color-mix(in srgb, var(--accent) 45%, var(--rule-soft))",
            background: "color-mix(in srgb, var(--accent-tint) 80%, var(--paper) 20%)",
            padding: "8px 0",
            borderRadius: 2,
            boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent)",
            width: "320px",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 14,
          }}>
            θ(t) = <span style={{ color: EQ_COLORS.thetaMax, fontWeight: 700 }}>θ<sub>max</sub></span> · (1 − e<sup>−(
              <span style={{ color: EQ_COLORS.ka, fontWeight: 700 }}>k<sub>a</sub></span>*
              <span style={{ color: EQ_COLORS.p, fontWeight: 700 }}>P</span> -
              <span style={{ color: EQ_COLORS.kd, fontWeight: 700 }}>k<sub>d</sub></span>)*t</sup>)
          </div>

          <div className="ctrl-grid" style={{ gridTemplateColumns: "1fr", gap: 14 }}>
            <div className="ctrl">
              <div className="ctrl-label">
                <span><span style={{ color: EQ_COLORS.ka, fontWeight: 700 }}>k<sub>a</sub></span> - adsorption rate</span>
                <span className="mono">{kA.toFixed(2)} torr⁻¹·s⁻¹</span>
              </div>
              <input type="range" min="0.1" max="10" step="0.1" value={kA}
                style={{ "--slider-color": EQ_COLORS.ka }}
                onChange={e => setKA(parseFloat(e.target.value))} />
            </div>
            <div className="ctrl">
              <div className="ctrl-label">
                <span><span style={{ color: EQ_COLORS.p, fontWeight: 700 }}>P</span> - partial pressure</span>
                <span className="mono">{P.toFixed(2)} torr</span>
              </div>
              <input type="range" min="0.05" max="3" step="0.05" value={P}
                style={{ "--slider-color": EQ_COLORS.p }}
                onChange={e => setP(parseFloat(e.target.value))} />
            </div>
            <div className="ctrl">
              <div className="ctrl-label">
                <span><span style={{ color: EQ_COLORS.kd, fontWeight: 700 }}>k<sub>d</sub></span> - desorption rate</span>
                <span className="mono">{kD.toFixed(2)} s⁻¹</span>
              </div>
              <input type="range" min="0" max="5" step="0.05" value={kD}
                style={{ "--slider-color": EQ_COLORS.kd }}
                onChange={e => setKD(parseFloat(e.target.value))} />
            </div>
            <div className="ctrl">
              <div className="ctrl-label">
                <span><span style={{ color: EQ_COLORS.thetaMax, fontWeight: 700 }}>θ<sub>max</sub></span> - saturation density</span>
                <span className="mono">{thetaMax} ng cm⁻²</span>
              </div>
              <input type="range" min="40" max="240" step="5" value={thetaMax}
                style={{ "--slider-color": EQ_COLORS.thetaMax }}
                onChange={e => setThetaMax(parseInt(e.target.value))} />
            </div>
            <div className="ctrl-check" style={{ paddingTop: 2 }}>
              <label>
                <input type="checkbox" checked={showMulti} onChange={e => setShowMulti(e.target.checked)} />
                Compare P = {(P * 0.3).toFixed(2)}, {(P * 3).toFixed(2)} torr
              </label>
            </div>
          </div>

          <div className="ctrl-stats" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div><span className="label">t₅₀</span><strong>{isFinite(t50) ? t50.toFixed(2) + " s" : "-"}</strong></div>
            <div><span className="label">t₉₀</span><strong>{isFinite(t90) ? t90.toFixed(2) + " s" : "-"}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// 2. TGA Trace - mass loss and vapor-pressure transform
// =================================================================
function TGADemo() {
  const rate = 10;
  const [slope, setSlope] = useState(-8189);
  const [intercept, setIntercept] = useState(20.5);
  const [molMass, setMolMass] = useState(230);
  const [panArea, setPanArea] = useState(1.0);

  const tMin = 0, tMax = 800;
  const yMassMax = 120;
  const lnPMin = -12;
  const lnPMax = 15;
  const DTG_SCALE = 6; // %/s → mg/min (10 mg sample)
  const DTG_AXIS_MAX_MGMIN = 2.0; // fixed dM/dt axis max (mg/min)

  // Both SVGs share the same inner width (W - l - r = 580 px)
  const W = 720;
  const HL = 280;
  const ML = { l: 68, r: 72, t: 28, b: 56 };
  const ilw = W - ML.l - ML.r, ilh = HL - ML.t - ML.b;

  const HR = 340;
  const MR = { l: 68, r: 72, t: 62, b: 62 };
  const irw = W - MR.l - MR.r, irh = HR - MR.t - MR.b;

  const t2px = T => ML.l + ((T - tMin) / (tMax - tMin)) * ilw;
  const w2px = w => ML.t + ilh - (w / yMassMax) * ilh;

  const invTLeft  = 1000 / (tMin + 273.15);
  const invTRight = 1000 / (tMax + 273.15);
  const invT2px = invT => MR.l + (invTLeft - invT) / (invTLeft - invTRight) * irw;
  const rt2px = T => invT2px(1000 / (T + 273.15));
  const p2y = lnP => MR.t + irh - ((lnP - lnPMin) / (lnPMax - lnPMin)) * irh;

  const invTTicks = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
  const tempTicks = [0, 200, 400, 600, 800];

  function randomize() {
    const rr = (mn, mx, st) => mn + Math.round(Math.random() * Math.round((mx - mn) / st)) * st;
    setPanArea(parseFloat(rr(0.5, 2.0, 0.05).toFixed(2)));
    setMolMass(rr(100, 400, 5));
    setSlope(rr(-11000, -3000, 100));
    setIntercept(parseFloat(rr(20, 30, 0.1).toFixed(1)));
  }

  const data = useMemo(() => {
    const sampleCount = 320;
    const defaultParams = { rateVal: 10, slopeVal: -8189, interceptVal: 20.5, molMassVal: 230, panAreaVal: 1.0 };

    function buildRawProfile({ rateVal, slopeVal, interceptVal, molMassVal, panAreaVal }) {
      const beta = Math.max(1e-6, rateVal / 60);
      const radius = Math.sqrt(panAreaVal / Math.PI);
      const toolTerm = Math.sqrt(2 * Math.PI * radius) / panAreaVal;
      const rawPts = [];
      let rawIntegral = 0;
      let prevRaw = null;
      let prevT = null;

      for (let i = 0; i <= sampleCount; i++) {
        const T = tMin + (i / sampleCount) * (tMax - tMin);
        const Tk = T + 273.15;
        const invT = 1 / Tk;
        const lnP = slopeVal * invT + interceptVal;
        const rawMPrime = Math.exp(lnP) / (Math.sqrt(Tk / molMassVal) * toolTerm);
        rawPts.push({ T, Tk, lnP, rawMPrime });

        if (prevRaw !== null) {
          const dt = (T - prevT) / beta;
          rawIntegral += ((prevRaw + rawMPrime) / 2) * dt;
        }
        prevRaw = rawMPrime;
        prevT = T;
      }

      return { rawPts, rawIntegral };
    }

    const referenceIntegral = buildRawProfile(defaultParams).rawIntegral || 1;
    const beta = Math.max(1e-6, rate / 60);
    const { rawPts } = buildRawProfile({
      rateVal: rate,
      slopeVal: slope,
      interceptVal: intercept,
      molMassVal: molMass,
      panAreaVal: panArea,
    });

    const scale = 100 / referenceIntegral;
    const pts = [];
    let mass = 100;
    let dtgMax = 1e-9;
    let onset = null;
    let t50 = null;

    for (let i = 0; i < rawPts.length; i++) {
      const current = rawPts[i];
      const prev = pts[i - 1];
      const mPrime = current.rawMPrime * scale;
      dtgMax = Math.max(dtgMax, mPrime);

      if (prev) {
        const dt = (current.T - prev.T) / beta;
        mass = Math.max(0, mass - ((prev.mPrime + mPrime) / 2) * dt);
      }

      // Film-to-droplet transition: at low mass, evaporation area shrinks as m^(2/3)
      const m_crit = 1.0; // critical mass % where droplet geometry dominates
      const areaFactor = mass > m_crit ? 1.0 : Math.pow(mass / m_crit, 2/3);
      
      pts.push({
        ...current,
        mPrime,
        mPrimeDisplay: mPrime * (mass / 100),
        mass,
        lnPActual: current.lnP + Math.log(Math.max(1e-10, mass / 100)) + Math.log(Math.max(1e-100, areaFactor)),
      });

      if (prev) {
        if (onset === null && prev.mass > 95 && mass <= 95) {
          const frac = (95 - prev.mass) / (mass - prev.mass || 1);
          onset = prev.T + frac * (current.T - prev.T);
        }
        if (t50 === null && prev.mass > 50 && mass <= 50) {
          const frac = (50 - prev.mass) / (mass - prev.mass || 1);
          t50 = prev.T + frac * (current.T - prev.T);
        }
      }
    }

    // Find temperature where mass drops below 5% (for linear fit cutoff)
    let tCutoff = tMax;
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].mass < 5.0) {
        tCutoff = pts[i].T - 20; // 20°C before mass depletion
        break;
      }
    }

    return { pts, dtgMax, onset, t50, tCutoff };
  }, [rate, slope, intercept, molMass, panArea]);

  const mainPath = useMemo(() => {
    return "M " + data.pts.map(pt => `${t2px(pt.T).toFixed(2)},${w2px(pt.mass).toFixed(2)}`).join(" L ");
  }, [data]);

  const dtgPath = useMemo(() => {
    const d2y = d => ML.t + ilh - Math.min(1, (d * DTG_SCALE) / DTG_AXIS_MAX_MGMIN) * ilh;
    return "M " + data.pts.map(pt => `${t2px(pt.T).toFixed(2)},${d2y(pt.mPrimeDisplay).toFixed(2)}`).join(" L ");
  }, [data]);

  const pressurePath = useMemo(() => {
    const yMin = MR.t, yMax = MR.t + irh;
    return "M " + data.pts.map(pt => {
      const y = Math.max(yMin, Math.min(yMax, p2y(pt.lnPActual)));
      return `${rt2px(pt.T).toFixed(2)},${y.toFixed(2)}`;
    }).join(" L ");
  }, [data]);

  const fitPath = useMemo(() => {
    // Limit fit line to linear region (up to tCutoff)
    const TRightFit = Math.min(tMax, data.tCutoff);
    const invTRightFit = 1000 / (TRightFit + 273.15);
    const lnP_left  = slope * (invTLeft  / 1000) + intercept;
    const lnP_right = slope * (invTRightFit / 1000) + intercept;
    const y1 = p2y(Math.max(lnPMin, Math.min(lnPMax, lnP_left)));
    const y2 = p2y(Math.max(lnPMin, Math.min(lnPMax, lnP_right)));
    return `M ${invT2px(invTLeft).toFixed(2)},${y1.toFixed(2)} L ${invT2px(invTRightFit).toFixed(2)},${y2.toFixed(2)}`;
  }, [slope, intercept, data.tCutoff]);

  const Tv = (-slope / intercept) - 273.15;
  const TvX = rt2px(Tv);
  const lnPZeroY = p2y(0);
  const TvInRange = Tv >= tMin && Tv <= tMax;

  return (
    <div className="demo-card">
      <div className="demo-head">
        <div>
          <div className="label label-accent">Demo 02</div>
          <h3 className="serif" style={{ fontSize: 24, marginTop: 6 }}>
            Thermogravimetric analysis (TGA)
          </h3>
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
          ln(P) = mT⁻¹ + b
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 260px", gap: 24, alignItems: "start" }}>
        {/* \u2500\u2500 Figures column \u2500\u2500 */}
        <div>
          {/* SVG 1: TGA mass-loss */}
          <svg viewBox={`0 0 ${W} ${HL}`} style={{ width: "100%", height: "auto", display: "block", marginBottom: 6 }}>
            {[0, 20, 40, 60, 80, 100, 120].map(w => (
              <line key={w} x1={ML.l} x2={W - ML.r} y1={w2px(w)} y2={w2px(w)}
                stroke="var(--rule-soft)" strokeWidth="1" strokeDasharray="2 4" />
            ))}
            <line x1={ML.l} x2={W - ML.r} y1={HL - ML.b} y2={HL - ML.b} stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={ML.l} x2={ML.l} y1={ML.t} y2={HL - ML.b} stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={W - ML.r} x2={W - ML.r} y1={ML.t} y2={HL - ML.b} stroke="var(--ink-3)" strokeWidth="1" />
            {tempTicks.map(T => (
              <g key={T}>
                <line x1={t2px(T)} x2={t2px(T)} y1={HL - ML.b} y2={HL - ML.b + 5} stroke="var(--ink)" />
                <Tick x={t2px(T)} y={HL - ML.b + 20}>{T}</Tick>
              </g>
            ))}
            {[0, 20, 40, 60, 80, 100, 120].map(w => (
              <g key={w}>
                <line x1={ML.l - 5} x2={ML.l} y1={w2px(w)} y2={w2px(w)} stroke="var(--ink)" />
                <Tick x={ML.l - 10} y={w2px(w) + 4} anchor="end">{w}</Tick>
              </g>
            ))}
            {[0, 1.0, 2.0].map(val => {
              const y = ML.t + ilh - (val / DTG_AXIS_MAX_MGMIN) * ilh;
              return (
                <g key={val}>
                  <line x1={W - ML.r} x2={W - ML.r + 5} y1={y} y2={y} stroke="var(--ink-3)" />
                  <Tick x={W - ML.r + 10} y={y + 4} anchor="start">{val.toFixed(2)}</Tick>
                </g>
              );
            })}
            {data.t50 !== null && (
              <>
                <line x1={t2px(data.t50)} x2={t2px(data.t50)} y1={ML.t} y2={HL - ML.b}
                  stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <text x={t2px(data.t50) + 6} y={ML.t + 18} style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--accent)",
                }}>T<tspan dy="3" fontSize="9">50</tspan><tspan dy="-3"> = {data.t50.toFixed(0)} °C</tspan></text>
              </>
            )}
            <line x1={ML.l} x2={W - ML.r} y1={w2px(0)} y2={w2px(0)}
              stroke="var(--ink-4)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <path d={dtgPath} fill="none" stroke="var(--ink-3)" strokeWidth="1.2" opacity="0.7" />
            <path d={mainPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            {data.onset !== null && (
              <>
                <circle cx={t2px(data.onset)} cy={w2px(95)} r="4" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
                <text x={t2px(data.onset) - 10} y={w2px(95) - 10} textAnchor="end" style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--accent)",
                }}>onset {data.onset.toFixed(0)} °C</text>
              </>
            )}
            <AxisLabel x={ML.l + ilw / 2} y={HL - 10}>Temperature (°C) — ramp {rate} °C/min</AxisLabel>
            <AxisLabel x={18} y={ML.t + ilh / 2} rotate={-90}>Mass retained (%)</AxisLabel>
            <AxisLabel x={W - 18} y={ML.t + ilh / 2} rotate={90}>dM/dt (mg/min)</AxisLabel>
          </svg>

          {/* SVG 2: Van't Hoff / Clausius-Clapeyron — linear in ln(P) */}
          <svg viewBox={`0 0 ${W} ${HR}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Grid lines at every 5 ln(P) units */}
            {Array.from({ length: 6 }, (_, i) => -10 + i * 5).map(n => (
              <line key={n} x1={MR.l} x2={W - MR.r} y1={p2y(n)} y2={p2y(n)}
                stroke="var(--rule-soft)" strokeWidth="1" strokeDasharray="2 4" />
            ))}
            <line x1={MR.l} x2={W - MR.r} y1={MR.t} y2={MR.t} stroke="var(--ink)" strokeWidth="1.2" opacity="0.8" />
            <line x1={MR.l} x2={W - MR.r} y1={HR - MR.b} y2={HR - MR.b} stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={MR.l} x2={MR.l} y1={MR.t} y2={HR - MR.b} stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={W - MR.r} x2={W - MR.r} y1={MR.t} y2={HR - MR.b} stroke="var(--ink-3)" strokeWidth="1" />

            {/* Top axis: 1000/T — evenly spaced in 1/T */}
            {invTTicks.map(invT => (
              <g key={invT}>
                <line x1={invT2px(invT)} x2={invT2px(invT)} y1={MR.t - 5} y2={MR.t} stroke="var(--ink)" />
                <Tick x={invT2px(invT)} y={MR.t - 12}>{invT.toFixed(1)}</Tick>
              </g>
            ))}

            {/* Bottom axis: T in °C at 200° intervals */}
            {tempTicks.map(T => (
              <g key={T}>
                <line x1={rt2px(T)} x2={rt2px(T)} y1={HR - MR.b} y2={HR - MR.b + 5} stroke="var(--ink)" />
                <Tick x={rt2px(T)} y={HR - MR.b + 20}>{T}</Tick>
              </g>
            ))}

            {/* Left Y axis: ln(P) with ticks every 5 units */}
            {Array.from({ length: 6 }, (_, i) => -10 + i * 5).map(n => (
              <g key={n}>
                <line x1={MR.l - 5} x2={MR.l} y1={p2y(n)} y2={p2y(n)} stroke="var(--ink)" />
                <Tick x={MR.l - 10} y={p2y(n) + 4} anchor="end">{n}</Tick>
              </g>
            ))}

            {/* Right Y axis: pressure (torr) — ticks at 10^n every factor of 100 */}
            {[-4, -2, 0, 2, 4].map(exp => {
              const y = p2y(exp * Math.LN10);
              if (y < MR.t || y > MR.t + irh) return null;
              return (
                <g key={exp}>
                  <line x1={W - MR.r} x2={W - MR.r + 5} y1={y} y2={y} stroke="var(--ink-3)" />
                  <text x={W - MR.r + 8} y={y + 4} textAnchor="start" style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--ink-3)",
                  }}>10<tspan dy="-4" fontSize="9">{exp}</tspan><tspan dy="4"></tspan></text>
                </g>
              );
            })}

            {/* Tv line: thick horizontal at ln(P) = 0 (P = 1 torr) */}
            <line x1={MR.l} x2={W - MR.r} y1={lnPZeroY} y2={lnPZeroY}
              stroke="var(--ink)" strokeWidth="2.5" opacity="0.85" />
            {TvInRange && (
              <>
                <circle cx={TvX} cy={lnPZeroY} r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
                {/* White outline for better visibility */}
                <text x={TvX + 8} y={lnPZeroY - 8} stroke="var(--paper)" strokeWidth="3" style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink)",
                }}>T<tspan dy="3" fontSize="9">v</tspan><tspan dy="-3"> = {Tv.toFixed(0)} °C</tspan></text>
                <text x={TvX + 8} y={lnPZeroY - 8} style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink)",
                }}>T<tspan dy="3" fontSize="9">v</tspan><tspan dy="-3"> = {Tv.toFixed(0)} °C</tspan></text>
              </>
            )}

            <path d={pressurePath} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
            <path d={fitPath} fill="none" stroke="var(--ink-3)" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.75" />
            <text x={MR.l + 10} y={MR.t + 22} style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink-2)",
            }}>ln(P) = {slope.toFixed(0)}T<tspan dy="-4" fontSize="9">-1</tspan><tspan dy="4"> + {intercept.toFixed(1)}</tspan></text>
            <AxisLabel x={MR.l + irw / 2} y={18}>1000 / T (K⁻¹)</AxisLabel>
            <AxisLabel x={MR.l + irw / 2} y={HR - 10}>Temperature (°C)</AxisLabel>
            <AxisLabel x={18} y={MR.t + irh / 2} rotate={-90}>ln(P)</AxisLabel>
            <AxisLabel x={W - 18} y={MR.t + irh / 2} rotate={90}>Pressure (torr)</AxisLabel>
          </svg>
        </div>

        {/* \u2500\u2500 Controls column \u2500\u2500 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={randomize} style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "7px 0", border: "1px solid var(--rule)",
            background: "transparent", color: "var(--ink-3)", cursor: "pointer", width: "100%",
          }}>⚄ Randomize</button>
          <div className="ctrl">
            <div className="ctrl-label">
              <span>Pan area</span>
              <span className="mono">{panArea.toFixed(2)} cm²</span>
            </div>
            <input type="range" min="0.5" max="2.0" step="0.05" value={panArea}
              onChange={e => setPanArea(parseFloat(e.target.value))} />
          </div>
          <div className="ctrl">
            <div className="ctrl-label">
              <span>Mol. weight</span>
              <span className="mono">{molMass.toFixed(0)} g/mol</span>
            </div>
            <input type="range" min="100" max="400" step="5" value={molMass}
              onChange={e => setMolMass(parseFloat(e.target.value))} />
          </div>
          <div className="ctrl">
            <div className="ctrl-label">
              <span>Slope (m)</span>
              <span className="mono">{slope.toFixed(0)} K</span>
            </div>
            <input type="range" min="-11000" max="-3000" step="100" value={slope}
              onChange={e => setSlope(parseFloat(e.target.value))} />
          </div>
          <div className="ctrl">
            <div className="ctrl-label">
              <span>Intercept (b)</span>
              <span className="mono">{intercept.toFixed(1)}</span>
            </div>
            <input type="range" min="20" max="30" step="0.1" value={intercept}
              onChange={e => setIntercept(parseFloat(e.target.value))} />
          </div>
          <div className="ctrl-stats" style={{ marginTop: 4 }}>
            <div><span className="label">Onset</span><strong>{data.onset !== null ? data.onset.toFixed(0) + " °C" : "—"}</strong></div>
            <div><span className="label">T₅₀</span><strong>{data.t50 !== null ? data.t50.toFixed(0) + " °C" : "—"}</strong></div>
            <div><span className="label">T<sub>v</sub></span><strong>{TvInRange ? Tv.toFixed(0) + " °C" : "—"}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
function VertSlider({ label, value, min, max, step, onChange, unit, fmt, variant }) {
  const disp = fmt ? fmt(value) : (value % 1 === 0 ? String(value) : value.toFixed(1));
  const zeroFrac = (min < 0 && max > 0) ? (0 - min) / (max - min) : null;
  const tickColor = variant === "b" ? "var(--c2)" : "var(--accent)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.05em",
        color: "var(--ink-3)", textAlign: "center",
        lineHeight: 1.3, whiteSpace: "nowrap",
      }}>
        {label}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="range"
          className={variant === "b" ? "vert vert-b" : "vert"}
          min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
        {zeroFrac !== null && (
          <div style={{
            position: "absolute",
            bottom: `${zeroFrac * 100}%`,
            left: "50%",
            transform: "translateX(-50%)",
            width: 26,
            height: 2,
            background: tickColor,
            opacity: 0.5,
            borderRadius: 1,
            pointerEvents: "none",
          }} />
        )}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)",
        fontWeight: 500, textAlign: "center", letterSpacing: "-0.01em",
      }}>
        {disp}{unit ? "\u00a0" + unit : ""}
      </div>
    </div>
  );
}

// =================================================================
// 3. Pan Geometry Effects - meniscus and droplet surface area
// =================================================================
function PanGeometryDemo() {
  const [theta, setTheta] = useState(60); // contact angle in degrees
  const [tickerVol, setTickerVol] = useState(157); // current volume position (mm³)
  const [playing, setPlaying] = useState(false);

  // Pan parameters
  const R_pan = 5; // pan radius in mm
  const h_pan = 2; // pan height in mm
  const V_full = Math.PI * R_pan * R_pan * h_pan; // full pan volume (~157 mm³)

  // Convert theta to radians
  const thetaRad = (theta * Math.PI) / 180;

  // Calculate surface areas and critical volumes for each regime
  
  // 1. Positive meniscus (θ > 90°): liquid doesn't wet walls
  const isPositive = theta > 90;
  const A_flat_pos = Math.PI * R_pan * R_pan * (1 + 0.1 * ((theta - 90) / 90));
  
  // Critical volume for positive: when curved edge touches bottom
  const V_crit_pos = V_full * 0.3; // ~30% remaining when droplet forms
  
  // 2. Negative meniscus (θ < 90°): liquid wets walls
  const A_flat_neg = Math.PI * R_pan * R_pan * (1 + 0.05 * ((90 - theta) / 90));
  
  // Critical volume for negative: when center touches bottom
  const V_crit_neg = V_full * 0.2; // ~20% remaining when ring forms
  
  // 3. Spherical cap droplet (after positive meniscus transition)
  const dropletFactor = 2 - 3 * Math.cos(thetaRad) + Math.pow(Math.cos(thetaRad), 3);
  const dropletAreaFactor = 2 * (1 - Math.cos(thetaRad));
  
  function dropletArea(V) {
    if (V <= 0) return 0;
    const r_cubed = (3 * V) / (Math.PI * dropletFactor);
    const r = Math.pow(r_cubed, 1/3);
    return Math.PI * r * r * dropletAreaFactor;
  }
  
  // 4. Ring/torus (after negative meniscus transition)
  function ringArea(V) {
    if (V <= 0) return 0;
    return 2 * Math.PI * Math.sqrt(2 * Math.PI * R_pan * V);
  }
  
  // Animation effect
  React.useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTickerVol(v => {
        const newV = v - 1;
        if (newV <= 0) {
          setPlaying(false);
          return 0;
        }
        return newV;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [playing]);
  
  // Generate unified area vs volume trace
  const points = 200;
  const vRange = Array.from({ length: points }, (_, i) => ((i / (points - 1)) ** 1.5) * V_full);
  
  // Main plot dimensions
  const W = 720, H = 400;
  const M = { l: 70, r: 30, t: 30, b: 50 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  
  const vMax = V_full;
  const aMax = Math.PI * R_pan * R_pan * 1.2;
  
  // REVERSED: high volume (left) to low volume (right)
  const v2x = v => M.l + ((vMax - v) / vMax) * iw;
  const a2y = a => M.t + ih - (a / aMax) * ih;
  
  // Determine which regime based on theta
  const V_crit = isPositive ? V_crit_pos : V_crit_neg;
  const A_flat = isPositive ? A_flat_pos : A_flat_neg;
  
  // Build unified trace
  const tracePts = vRange.map(v => {
    let area;
    if (v >= V_crit) {
      area = A_flat;
    } else {
      // Transition to droplet or ring
      if (isPositive) {
        area = dropletArea(v);
      } else {
        area = ringArea(v);
      }
    }
    return `${v2x(v).toFixed(1)},${a2y(area).toFixed(1)}`;
  });
  
  const unifiedPath = tracePts.join(' L ');
  
  // Calculate ticker position area and geometry
  const tickerArea = tickerVol >= V_crit ? A_flat : (isPositive ? dropletArea(tickerVol) : ringArea(tickerVol));
  const tickerX = v2x(tickerVol);
  const tickerY = a2y(tickerArea);
  
  // Calculate droplet/ring dimensions for diagrams
  const V = tickerVol;
  const fillHeight = (V / V_full) * h_pan; // liquid height in pan
  
  // Diagram dimensions for schematics (reduced by 40%)
  const DW = 96, DH = 84;
  const panLeft = 12, panWidth = 72, panBottom = 78, panTop = 48;
  const panCenterX = panLeft + panWidth / 2;

  return (
    <div className="demo-card">
      <div className="demo-head">
        <div>
          <div className="label label-accent">Demo 03</div>
          <h3 className="serif" style={{ fontSize: 24, marginTop: 6 }}>
            Pan Geometry & Meniscus Effects
          </h3>
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
          A(V, θ) — surface area vs. volume
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setPlaying(!playing)} style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "7px 16px", border: "1px solid var(--rule)",
            background: playing ? "var(--accent)" : "transparent", 
            color: playing ? "white" : "var(--ink-3)", 
            cursor: "pointer",
          }}>{playing ? "⏸ Pause" : "▶ Play"}</button>
          <button onClick={() => setTickerVol(V_full)} style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "7px 16px", border: "1px solid var(--rule)",
            background: "transparent", color: "var(--ink-3)", cursor: "pointer",
          }}>Reset</button>
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginLeft: 8 }}>
            <strong>Volume:</strong> {tickerVol.toFixed(1)} mm³ | <strong>Area:</strong> {tickerArea.toFixed(1)} mm²
          </div>
        </div>
        <div className="ctrl">
          <div className="ctrl-label">
            <span>Contact angle (θ)</span>
            <span className="mono">{theta.toFixed(0)}°</span>
          </div>
          <input type="range" min="10" max="170" step="1" value={theta}
            onChange={e => setTheta(parseFloat(e.target.value))} />
        </div>
        <div className="ctrl" style={{ marginTop: 8 }}>
          <div className="ctrl-label">
            <span>Ticker position (V)</span>
            <span className="mono">{tickerVol.toFixed(1)} mm³</span>
          </div>
          <input type="range" min="0" max={V_full} step="0.5" value={tickerVol}
            onChange={e => setTickerVol(parseFloat(e.target.value))} />
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
          {theta < 90 ? "Wetting (θ < 90°): negative meniscus → ring formation" : 
           theta > 90 ? "Non-wetting (θ > 90°): positive meniscus → droplet formation" :
           "Neutral (θ = 90°): flat surface"}
        </div>
      </div>

      {/* Plot and diagrams side by side */}
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        {/* Main plot: unified A(V) trace */}
        <div style={{ flex: "0 0 65%" }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--rule)" }}>
        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map(area => (
          <line key={area} x1={M.l} x2={W - M.r} y1={a2y(area)} y2={a2y(area)}
            stroke="var(--rule-soft)" strokeWidth="1" strokeDasharray="2 4" />
        ))}
        
        {/* Axes */}
        <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} stroke="var(--ink)" strokeWidth="1.5" />
        <line x1={M.l} x2={M.l} y1={M.t} y2={H - M.b} stroke="var(--ink)" strokeWidth="1.5" />
        
        {/* Critical volume line */}
        <line x1={v2x(V_crit)} x2={v2x(V_crit)} y1={M.t} y2={H - M.b} 
          stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <text x={v2x(V_crit)} y={M.t - 8} textAnchor="middle" style={{ fontSize: 11, fill: "var(--ink-3)" }}>
          V_crit
        </text>
        
        {/* Main trace */}
        {unifiedPath && <path d={`M ${unifiedPath}`} fill="none" stroke={isPositive ? "var(--c2)" : "var(--accent)"} strokeWidth="3" />}
        
        {/* Ticker marker */}
        <line x1={tickerX} x2={tickerX} y1={M.t} y2={H - M.b} stroke="var(--ink)" strokeWidth="2" opacity="0.8" />
        <circle cx={tickerX} cy={tickerY} r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        
        {/* Axis ticks - REVERSED for high→low, nice round numbers */}
        {[150, 100, 50, 0].map(vol => (
          <g key={vol}>
            <line x1={v2x(vol)} x2={v2x(vol)} y1={H - M.b} y2={H - M.b + 5} stroke="var(--ink)" />
            <Tick x={v2x(vol)} y={H - M.b + 20}>{vol}</Tick>
          </g>
        ))}
        
        {[0, 20, 40, 60, 80, 100].map(area => (
          <g key={area}>
            <line x1={M.l - 5} x2={M.l} y1={a2y(area)} y2={a2y(area)} stroke="var(--ink)" />
            <Tick x={M.l - 10} y={a2y(area) + 4} anchor="end">{area}</Tick>
          </g>
        ))}
        
        <AxisLabel x={M.l + iw / 2} y={H - 10}>Volume (mm³) — evaporation →</AxisLabel>
        <AxisLabel x={M.l - 50} y={M.t + ih / 2} rotate={-90}>Surface Area (mm²)</AxisLabel>
        
        {/* Regime labels */}
        <text x={v2x(V_crit + (vMax - V_crit) / 2)} y={M.t + 20} textAnchor="middle" 
          style={{ fontSize: 12, fill: "var(--ink-2)", fontWeight: 500 }}>
          {isPositive ? "Flat film (pos. meniscus)" : "Flat film (neg. meniscus)"}
        </text>
        <text x={v2x(V_crit / 2)} y={H - M.b - 20} textAnchor="middle" 
          style={{ fontSize: 12, fill: "var(--ink-2)", fontWeight: 500 }}>
          {isPositive ? "Droplet: A ∝ V^(2/3)" : "Ring: A ∝ V^(1/2)"}
        </text>
          </svg>
        </div>

        {/* Dynamic schematic diagrams - stacked on right side */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Side view */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, textAlign: "center", color: "var(--ink-2)" }}>
            Side View
          </div>
          <svg viewBox={`0 0 ${DW} ${DH}`} style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--rule)", background: "var(--paper)" }}>
            <rect x={panLeft} y={panTop} width={panWidth} height={(panBottom - panTop)} fill="none" stroke="var(--ink)" strokeWidth="2" />
            {V > 0 && (() => {
              const liquidTop = panBottom - (fillHeight / h_pan) * (panBottom - panTop);
              const meniscusCurve = isPositive ? -8 : 8;
              const color = isPositive ? "var(--c2)" : "var(--accent)";
              
              if (V >= V_crit) {
                // Flat film with meniscus
                return (
                  <path d={`M ${panLeft} ${liquidTop} Q ${panLeft + 15} ${liquidTop + meniscusCurve}, ${panLeft + 30} ${liquidTop} L ${panLeft + panWidth - 30} ${liquidTop} Q ${panLeft + panWidth - 15} ${liquidTop + meniscusCurve}, ${panLeft + panWidth} ${liquidTop} L ${panLeft + panWidth} ${panBottom} L ${panLeft} ${panBottom} Z`}
                    fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                );
              } else {
                // Droplet or ring
                if (isPositive) {
                  const dropletR = Math.pow((3 * V) / (Math.PI * dropletFactor), 1/3) * 8; // scale for display
                  const dropletH = dropletR * (1 - Math.cos(thetaRad)) * 2;
                  return (
                    <ellipse cx={panCenterX} cy={panBottom - dropletH/2} rx={dropletR} ry={dropletH/2}
                      fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                  );
                } else {
                  const ringH = Math.min(10, (V / V_crit) * 15);
                  return (
                    <>
                      <rect x={panLeft} y={panBottom - ringH} width="15" height={ringH}
                        fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
                      <rect x={panLeft + panWidth - 15} y={panBottom - ringH} width="15" height={ringH}
                        fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
                    </>
                  );
                }
              }
            })()}
          </svg>
        </div>

        {/* Top view */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, textAlign: "center", color: "var(--ink-2)" }}>
            Top View
          </div>
          <svg viewBox={`0 0 ${DW} ${DH}`} style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--rule)", background: "var(--paper)" }}>
            <circle cx={panCenterX} cy={DH/2} r={panWidth/2} fill="none" stroke="var(--ink)" strokeWidth="2" />
            {V > 0 && (() => {
              const color = isPositive ? "var(--c2)" : "var(--accent)";
              
              if (V >= V_crit) {
                // Full pan coverage
                return (
                  <circle cx={panCenterX} cy={DH/2} r={panWidth/2 - 2}
                    fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                );
              } else {
                // Droplet or ring
                if (isPositive) {
                  const dropletR = Math.pow((3 * V) / (Math.PI * dropletFactor), 1/3) * 8;
                  return (
                    <circle cx={panCenterX} cy={DH/2} r={Math.min(panWidth/2 - 2, dropletR)}
                      fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                  );
                } else {
                  const ringWidth = Math.min(15, (V / V_crit) * 20);
                  return (
                    <>
                      <circle cx={panCenterX} cy={DH/2} r={panWidth/2 - 2}
                        fill="none" stroke={color} strokeWidth={ringWidth} strokeOpacity="0.5" />
                    </>
                  );
                }
              }
            })()}
          </svg>
        </div>

        {/* Cross-section */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, textAlign: "center", color: "var(--ink-2)" }}>
            Cross-Section
          </div>
          <svg viewBox={`0 0 ${DW} ${DH}`} style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--rule)", background: "var(--paper)" }}>
            <rect x={panLeft} y={panTop} width={panWidth} height={(panBottom - panTop)} fill="var(--ink)" fillOpacity="0.05" stroke="var(--ink)" strokeWidth="2" />
            {V > 0 && (() => {
              const liquidTop = panBottom - (fillHeight / h_pan) * (panBottom - panTop);
              const color = isPositive ? "var(--c2)" : "var(--accent)";
              
              if (V >= V_crit) {
                const meniscusCurve = isPositive ? -8 : 8;
                return (
                  <path d={`M ${panLeft} ${liquidTop} Q ${panLeft + 15} ${liquidTop + meniscusCurve}, ${panLeft + 30} ${liquidTop} L ${panLeft + panWidth - 30} ${liquidTop} Q ${panLeft + panWidth - 15} ${liquidTop + meniscusCurve}, ${panLeft + panWidth} ${liquidTop} L ${panLeft + panWidth} ${panBottom} L ${panLeft} ${panBottom} Z`}
                    fill={color} fillOpacity="0.5" stroke={color} strokeWidth="2" />
                );
              } else {
                if (isPositive) {
                  // Spherical cap profile
                  const dropletR = Math.pow((3 * V) / (Math.PI * dropletFactor), 1/3) * 8;
                  const dropletH = dropletR * (1 - Math.cos(thetaRad)) * 2;
                  const contactR = dropletR * Math.sin(thetaRad);
                  const cx = panCenterX;
                  const cy = panBottom;
                  const arcTop = cy - dropletH;
                  
                  return (
                    <path d={`M ${cx - contactR} ${cy} Q ${cx} ${arcTop}, ${cx + contactR} ${cy} Z`}
                      fill={color} fillOpacity="0.5" stroke={color} strokeWidth="2" />
                  );
                } else {
                  // Ring with curved wetting at walls
                  const ringH = Math.min(10, (V / V_crit) * 15);
                  const ringW = 20;
                  const curveH = ringH * 0.6; // curve height
                  return (
                    <>
                      {/* Left ring segment with upward curve at wall */}
                      <path d={`M ${panLeft} ${panBottom - ringH} Q ${panLeft + 5} ${panBottom - ringH - curveH}, ${panLeft + 10} ${panBottom - ringH} L ${panLeft + ringW} ${panBottom - ringH} L ${panLeft + ringW} ${panBottom} L ${panLeft} ${panBottom} Z`}
                        fill={color} fillOpacity="0.5" stroke={color} strokeWidth="2" />
                      {/* Right ring segment with upward curve at wall */}
                      <path d={`M ${panLeft + panWidth - ringW} ${panBottom - ringH} L ${panLeft + panWidth - 10} ${panBottom - ringH} Q ${panLeft + panWidth - 5} ${panBottom - ringH - curveH}, ${panLeft + panWidth} ${panBottom - ringH} L ${panLeft + panWidth} ${panBottom} L ${panLeft + panWidth - ringW} ${panBottom} Z`}
                        fill={color} fillOpacity="0.5" stroke={color} strokeWidth="2" />
                    </>
                  );
                }
              }
            })()}
            <text x={panCenterX} y="20" textAnchor="middle" style={{ fontSize: 10, fill: "var(--ink-3)" }}>
              V = {tickerVol.toFixed(1)} mm³
            </text>
          </svg>
        </div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 16, background: "var(--paper-2)", borderRadius: 4, fontSize: 13, lineHeight: 1.6 }}>
        <strong>Physical model:</strong> As liquid evaporates, the meniscus shape determines evaporation area.
        For θ &gt; 90° (non-wetting), a droplet forms; for θ &lt; 90° (wetting), a ring forms at low volumes.
        The transition occurs at a critical volume when the meniscus edge (positive) or center (negative) touches the pan bottom.
      </div>
    </div>
  );
}

function ALDCycleDemo() {
  const [tPulse,   setTPulse]   = useState(0.5);
  const [tPurge1,  setTPurge1]  = useState(4);
  const [tCoReact, setTCoReact] = useState(0.3);
  const [tPurge2,  setTPurge2]  = useState(4);
  // Langmuir params for A (precursor) and B (co-reactant)
  const [KA, setKA] = useState(5);    // adsorption equilibrium constant A
  const [PA, setPA] = useState(1);    // partial pressure A (a.u.)
  const [KB, setKB] = useState(5);
  const [PB, setPB] = useState(1);
  const [dmA, setDmA] = useState(50);   // Δm per fully saturated precursor pulse (ng/cm², > 0)
  const [dmB, setDmB] = useState(-20);  // Δm per fully saturated co-reactant pulse (ng/cm², can be negative)
  const [tIdx, setTIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  // ── Left panel (2 pressure lanes) ──────────────────────────────
  const W = 940, H = 320;
  const M = { l: 36, r: 0, t: 36, b: 52 };
  const iw = 584, ih = H - M.t - M.b;            // ih = 232

  // ── Right panel (Δ mass, square inner area) ─────────────────────
  const RP = 636;                                 // x-offset of right panel
  const RM = { l: 48, r: 16, t: 36, b: 52 };
  const riw = ih, rih = ih;                       // 232 × 232 square

  // ── Mass model constants ────────────────────────────────────────
  // (dmA and dmB are now user-controlled via sliders)

  const cycleTime = tPulse + tPurge1 + tCoReact + tPurge2;
  const totalT = 120;

  useEffect(() => {
    if (!playing) return;
    let rafId, last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setTIdx(prev => (prev + dt * 1.5) % totalT);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [playing, totalT]);

  const t2px = t => M.l + (t / totalT) * iw;

  function phaseAt(t) {
    const t0 = t % cycleTime;
    if (t0 < tPulse)                         return "pulse";
    if (t0 < tPulse + tPurge1)               return "purge1";
    if (t0 < tPulse + tPurge1 + tCoReact)    return "coreact";
    return "purge2";
  }

  // Pressure traces
  function pressureAt(t, which) {
    let sum = 0;
    const n = Math.ceil(totalT / cycleTime) + 1;
    for (let c = 0; c < n; c++) {
      const t0 = t - c * cycleTime;
      if (t0 < 0) continue;
      if (which === "prec") {
        if (t0 < tPulse) sum += Math.min(1, t0 / (tPulse * 0.3));
        else sum += Math.exp(-(t0 - tPulse) / (tPurge1 * 0.35));
      } else {
        const s = tPulse + tPurge1;
        if (t0 < s) sum += 0;
        else if (t0 < s + tCoReact) sum += Math.min(1, (t0 - s) / (tCoReact * 0.3));
        else sum += Math.exp(-(t0 - s - tCoReact) / (tPurge2 * 0.35));
      }
    }
    return Math.min(1, sum);
  }

  // ── Markov-chain surface model ─────────────────────────────────
  //
  // Every site is either A-terminated or B-terminated (fractions sum to 1).
  // A pulse: fraction α_A of B sites convert → A  (Langmuir rate on B sites)
  // B pulse: fraction α_B of A sites convert → B  (Langmuir rate on ALL A sites)
  //
  // This stabilises: sub-saturative A means fewer A sites for B, but remaining
  // A sites persist into the next cycle and are included the next B pulse.
  // Steady-state fB = α_B / (α_A + α_B − α_A·α_B)
  //
  // QCM mass trace:
  //   During A pulse:  mass = cumNg + fA_t · dmA              (precursor ligands adsorb)
  //   During B pulse:  mass = cumNg + fA_after_A·dmA + ΔfA·dmB  (dmB < 0 → dip)
  //   Net GPC per site = dmA + dmB  (positive for net film growth)

  const thetaASat = useMemo(() => (KA * PA) / (1 + KA * PA), [KA, PA]);
  const thetaBSat = useMemo(() => (KB * PB) / (1 + KB * PB), [KB, PB]);

  const cycleThetas = useMemo(() => {
    const n = Math.ceil(totalT / cycleTime) + 2;
    const arr = [];
    const alpha_A = thetaASat * (1 - Math.exp(-KA * PA * tPulse));
    const alpha_B = thetaBSat * (1 - Math.exp(-KB * PB * tCoReact));
    let fB    = 1.0;  // all B to start (clean hydroxylated surface)
    let cumNg = 0;    // cumulative oxide mass in ng/cm²
    for (let c = 0; c < n; c++) {
      const fA_start   = 1 - fB;
      const fA_gained  = fB * alpha_A;             // B→A this pulse
      const fA_after_A = fA_start + fA_gained;    // total A after A pulse
      const fB_after_A = fB * (1 - alpha_A);      // B remaining after A pulse
      const fB_gained  = fA_after_A * alpha_B;    // A→B this pulse (net GPC)
      const fB_end     = fB_after_A + fB_gained;
      arr.push({ fB_start: fB, fA_start, fA_gained, fA_after_A, fB_gained, cumNg });
      cumNg += fB_gained * (dmA + dmB);
      fB = fB_end;
    }
    return arr;
  }, [thetaASat, thetaBSat, KA, PA, KB, PB, tPulse, tCoReact, cycleTime, totalT, dmA, dmB]);

  const massAt = useMemo(() => {
    const STEPS = 600;
    const pts = new Float32Array(STEPS + 1);
    for (let i = 0; i <= STEPS; i++) {
      const t   = (i / STEPS) * totalT;
      const cyc = Math.floor(t / cycleTime);
      const t0  = t % cycleTime;
      const ci  = Math.min(cyc, cycleThetas.length - 1);
      const { fB_start, fA_start, fA_after_A, fB_gained, cumNg } = cycleThetas[ci];
      let mass;
      if (t0 < tPulse) {
        // A pulse: precursor adsorbs, mass rises
        const fA_t = fA_start + fB_start * thetaASat * (1 - Math.exp(-KA * PA * t0));
        mass = cumNg + fA_t * dmA;
      } else if (t0 < tPulse + tPurge1) {
        // Purge 1: flat
        mass = cumNg + fA_after_A * dmA;
      } else if (t0 < tPulse + tPurge1 + tCoReact) {
        // B pulse: A sites react; dmB < 0 → mass dips, dmB > 0 → mass rises
        const tc     = t0 - tPulse - tPurge1;
        const beta_t = thetaBSat * (1 - Math.exp(-KB * PB * tc));
        mass = cumNg + fA_after_A * (dmA + beta_t * dmB);
      } else {
        // Purge 2: flat at end-of-B value
        mass = cumNg + fA_after_A * dmA + fB_gained * dmB;
      }
      pts[i] = mass;
    }
    return pts;
  }, [cycleThetas, thetaASat, thetaBSat, KA, PA, KB, PB, tPulse, tPurge1, tCoReact, tPurge2, cycleTime, totalT, dmA, dmB]);

  // Build SVG paths
  const precPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 300; i++) {
      const t = (i / 300) * totalT;
      pts.push(`${t2px(t).toFixed(2)},${(M.t + ih * 0.28 - pressureAt(t, "prec") * ih * 0.22).toFixed(2)}`);
    }
    return "M " + pts.join(" L ");
  }, [tPulse, tPurge1, tCoReact, tPurge2]);

  const coPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 300; i++) {
      const t = (i / 300) * totalT;
      pts.push(`${t2px(t).toFixed(2)},${(M.t + ih * 0.76 - pressureAt(t, "co") * ih * 0.22).toFixed(2)}`);
    }
    return "M " + pts.join(" L ");
  }, [tPulse, tPurge1, tCoReact, tPurge2]);

  const t2px_r = t => RP + RM.l + (t / totalT) * riw;

  const nIdealCycles = Math.max(1, Math.floor(totalT / cycleTime));

  // Fixed y-axis range for QCM trace
  const MASS_MIN = -100;
  const MASS_MAX = 1000;
  const MASS_RNG = 1100;

  const massPath = useMemo(() => {
    const STEPS = massAt.length - 1;
    const pts = [];
    for (let i = 0; i <= STEPS; i++) {
      const t    = (i / STEPS) * totalT;
      const norm = Math.min(1, Math.max(0, (massAt[i] - MASS_MIN) / MASS_RNG));
      const x    = t2px_r(t).toFixed(2);
      const y    = (RM.t + rih * (1 - norm)).toFixed(2);
      pts.push(`${x},${y}`);
    }
    return "M " + pts.join(" L ");
  }, [massAt]);

  // Current playhead values
  const curPhase   = phaseAt(tIdx);
  const STEPS      = massAt.length - 1;
  const curMassIdx = Math.min(STEPS, Math.round((tIdx / totalT) * STEPS));
  const nCycles    = Math.ceil(totalT / cycleTime);
  const lastTheta  = cycleThetas[Math.min(nCycles - 1, cycleThetas.length - 1)];
  // Steady-state GPC: converged value after many cycles
  const alpha_A_ss = thetaASat * (1 - Math.exp(-KA * PA * tPulse));
  const alpha_B_ss = thetaBSat * (1 - Math.exp(-KB * PB * tCoReact));
  const denom_ss   = alpha_A_ss + alpha_B_ss - alpha_A_ss * alpha_B_ss || 1e-9;
  const fB_ss      = alpha_B_ss / denom_ss;
  const fA_after_A_ss = 1 - fB_ss * (1 - alpha_A_ss);
  const gpc_ss     = fA_after_A_ss * alpha_B_ss * (dmA + dmB);

  const phaseLabels = {
    pulse:   { label: "01 · Precursor pulse",    color: "var(--accent)" },
    purge1:  { label: "02 · Purge",              color: "var(--ink-3)"  },
    coreact: { label: "03 · Co-reactant pulse",  color: "var(--c2)"    },
    purge2:  { label: "04 · Purge",              color: "var(--ink-3)"  },
  };

  const LaneLabel = ({ cy, color, children }) => {
    const x = M.l - 14;
    const y = M.t + cy * ih;
    return (
      <text
        transform={`rotate(-90, ${x}, ${y})`}
        x={x} y={y}
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: color,
                 letterSpacing: "0.1em", textTransform: "uppercase" }}
      >{children}</text>
    );
  };

  return (
    <div className="demo-card">
      <div className="demo-head">
        <div>
          <div className="label label-accent">Demo 03</div>
          <h3 className="serif" style={{ fontSize: 24, marginTop: 6 }}>
            ALD cycle — pulse / purge simulator
          </h3>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div className="pill" style={{
            borderColor: phaseLabels[curPhase].color,
            color: phaseLabels[curPhase].color,
          }}>
            {phaseLabels[curPhase].label}
          </div>
          <button className="btn-ghost btn" style={{ padding: "8px 14px", fontSize: 11 }}
            onClick={() => setPlaying(!playing)}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button className="btn-ghost btn" style={{ padding: "8px 14px", fontSize: 11 }}
            onClick={() => { setTIdx(0); setPlaying(true); }}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Live stats strip (above figures) ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        paddingBottom: 16,
        marginBottom: 16,
        borderBottom: "1px solid var(--rule-soft)",
      }}>
        {/* Precursor A */}
        <div style={{ padding: "12px 16px", background: "var(--accent-tint)", borderRadius: 4 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div>
              <div className="label">θ<sub>A</sub></div>
              <strong style={{ color: "var(--accent)", fontSize: 17 }}>{(alpha_A_ss * 100).toFixed(0)} %</strong>
            </div>
            <div>
              <div className="label">Δm<sub>A</sub></div>
              <strong style={{ color: "var(--accent)", fontSize: 17 }}>{(fB_ss * alpha_A_ss * dmA).toFixed(1)} ng·cm⁻²</strong>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "var(--accent)", paddingTop: 2 }}>Precursor A</div>
          </div>
        </div>
        {/* Co-reactant B */}
        <div style={{ padding: "12px 16px", background: "color-mix(in srgb, var(--c2) 8%, transparent)", borderRadius: 4 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div>
              <div className="label">θ<sub>B</sub></div>
              <strong style={{ color: "var(--c2)", fontSize: 17 }}>{(alpha_B_ss * 100).toFixed(0)} %</strong>
            </div>
            <div>
              <div className="label">Δm<sub>B</sub></div>
              <strong style={{ color: "var(--c2)", fontSize: 17 }}>{(fA_after_A_ss * alpha_B_ss * dmB).toFixed(1)} ng·cm⁻²</strong>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "var(--c2)", paddingTop: 2 }}>Co-reactant B</div>
          </div>
        </div>
        {/* Total */}
        <div style={{ padding: "12px 16px", background: "var(--paper-2)", borderRadius: 4 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div>
              <div className="label">Cycle</div>
              <strong style={{ fontSize: 17 }}>{cycleTime.toFixed(1)} s</strong>
            </div>
            <div>
              <div className="label">θ total</div>
              <strong style={{ fontSize: 17 }}>{(fA_after_A_ss * alpha_B_ss * 100).toFixed(0)} %</strong>
            </div>
            <div>
              <div className="label">GPC</div>
              <strong style={{ fontSize: 17 }}>{gpc_ss.toFixed(1)} ng·cm⁻²</strong>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "var(--ink-3)", paddingTop: 2 }}>Total</div>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <clipPath id="ald-clip-L">
            <rect x={M.l} y={M.t} width={iw} height={ih} />
          </clipPath>
          <clipPath id="ald-clip-R">
            <rect x={RP + RM.l} y={RM.t} width={riw} height={rih} />
          </clipPath>
        </defs>

        {/* ══ LEFT PANEL: pressure lanes ══ */}

        {/* Phase bands */}
        <g clipPath="url(#ald-clip-L)">
          {Array.from({ length: nIdealCycles + 1 }, (_, c) => {
            const base = c * cycleTime;
            if (base >= totalT) return null;
            return (
              <g key={c}>
                <rect x={t2px(base)} y={M.t}
                  width={(tPulse / totalT) * iw} height={ih}
                  fill="var(--accent-tint)" />
                <rect x={t2px(base + tPulse + tPurge1)} y={M.t}
                  width={(tCoReact / totalT) * iw} height={ih}
                  fill="color-mix(in srgb, var(--c2) 8%, transparent)" />
              </g>
            );
          })}
        </g>

        {/* Lane divider */}
        <line x1={M.l} x2={M.l + iw} y1={M.t + ih * 0.5} y2={M.t + ih * 0.5}
          stroke="var(--rule-soft)" strokeWidth="1" />

        {/* Pressure traces */}
        <g clipPath="url(#ald-clip-L)">
          <path d={precPath} fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d={coPath}   fill="none" stroke="var(--c2)"    strokeWidth="2" />
        </g>

        {/* Left axes */}
        <line x1={M.l} x2={M.l + iw} y1={M.t + ih} y2={M.t + ih} stroke="var(--ink)" strokeWidth="1.5" />
        <line x1={M.l} x2={M.l}      y1={M.t}       y2={M.t + ih} stroke="var(--ink)" strokeWidth="1.5" />

        {/* Lane labels */}
        <LaneLabel cy={0.25} color="var(--accent)">Precursor</LaneLabel>
        <LaneLabel cy={0.75} color="var(--c2)">Co-react</LaneLabel>

        {/* Left time ticks */}
        {[0, 30, 60, 90, 120].map((t, i) => (
          <g key={i}>
            <line x1={t2px(t)} x2={t2px(t)} y1={M.t + ih} y2={M.t + ih + 4} stroke="var(--ink)" />
            <Tick x={t2px(t)} y={M.t + ih + 18}>
              {t === 0 ? "0" : t === 60 ? "1 min" : t === 120 ? "2 min" : `${t}s`}
            </Tick>
          </g>
        ))}

        {/* Left playhead */}
        <line x1={t2px(tIdx)} x2={t2px(tIdx)} y1={M.t} y2={M.t + ih}
          stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.55" />
        <polygon
          points={`${t2px(tIdx)-5},${M.t-2} ${t2px(tIdx)+5},${M.t-2} ${t2px(tIdx)},${M.t+6}`}
          fill="var(--ink)" />

        {/* ══ RIGHT PANEL: Δ mass (QCM) ══ */}

        {/* Zero reference line */}
        {(() => {
          const y0 = RM.t + rih * (1 - (0 - MASS_MIN) / MASS_RNG);
          return <line x1={RP + RM.l} x2={RP + RM.l + riw} y1={y0} y2={y0}
            stroke="var(--ink-3)" strokeWidth="1.5" />;
        })()}

        {/* Mass trace */}
        <g clipPath="url(#ald-clip-R)">
          <path d={massPath} fill="none" stroke="var(--ink-2)" strokeWidth="2" />
        </g>

        {/* Right axes */}
        <line x1={RP + RM.l} x2={RP + RM.l + riw} y1={RM.t + rih} y2={RM.t + rih}
          stroke="var(--ink)" strokeWidth="1.5" />
        <line x1={RP + RM.l} x2={RP + RM.l}        y1={RM.t}        y2={RM.t + rih}
          stroke="var(--ink)" strokeWidth="1.5" />

        {/* Right y-axis ticks */}
        {[-100, 0, 250, 500, 750, 1000].map((ngVal, i) => {
          const frac = (ngVal - MASS_MIN) / MASS_RNG;
          const y    = RM.t + rih * (1 - frac);
          const label = ngVal >= 1000 ? "1k" : String(ngVal);
          const showLabel = ngVal === -100 || ngVal === 0 || ngVal === 500 || ngVal === 1000;
          const isZero    = ngVal === 0;
          return (
            <g key={i}>
              <line x1={RP + RM.l - 4} x2={RP + RM.l} y1={y} y2={y}
                stroke="var(--ink)" strokeWidth="1" />
              {showLabel && (
                <Tick x={RP + RM.l - 6} y={y + 3} anchor="end">{label}</Tick>
              )}
              {!isZero && ngVal !== -100 && ngVal !== 1000 && (
                <line x1={RP + RM.l} x2={RP + RM.l + riw} y1={y} y2={y}
                  stroke="var(--rule-soft)" strokeWidth="0.5" strokeDasharray="3 3" />
              )}
            </g>
          );
        })}

        {/* Right x-axis ticks */}
        {[0, 60, 120].map((t, i) => (
          <g key={i}>
            <line x1={t2px_r(t)} x2={t2px_r(t)} y1={RM.t + rih} y2={RM.t + rih + 4}
              stroke="var(--ink)" />
            <Tick x={t2px_r(t)} y={RM.t + rih + 18}>
              {t === 0 ? "0" : t === 60 ? "1 min" : "2 min"}
            </Tick>
          </g>
        ))}

        {/* Right y-axis label */}
        <AxisLabel x={RP + RM.l - 36} y={RM.t + rih / 2} rotate={-90}>
          ng · cm⁻²
        </AxisLabel>

        {/* Right panel title + live Δm */}
        <AxisLabel x={RP + RM.l + riw / 2} y={RM.t - 20}>QCM Δ mass</AxisLabel>
        <text x={RP + RM.l + riw / 2} y={RM.t - 6} textAnchor="middle"
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--ink-2)", fontWeight: 600 }}
        >Δm = {massAt[curMassIdx].toFixed(1)} ng·cm⁻²</text>

        {/* Right playhead */}
        <line x1={t2px_r(tIdx)} x2={t2px_r(tIdx)} y1={RM.t} y2={RM.t + rih}
          stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.55" />
      </svg>

      <div className="demo-controls">
        {/* ── Two-column half-cycle panels ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--rule-soft)", paddingBottom: 24 }}>

          {/* ── Left col: Precursor A ── */}
          <div style={{ paddingRight: 28, borderRight: "1px solid var(--rule-soft)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em",
                color: "var(--accent)", textTransform: "uppercase" }}>
                Precursor A
              </div>
              <button style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.05em",
                color: "var(--accent)", border: "1px solid var(--accent)", background: "transparent",
                padding: "2px 8px", borderRadius: 3, cursor: "pointer", opacity: 0.7 }}
                onClick={() => {
                  const r = (mn, mx, st) => Math.min(mx, Math.max(mn, Math.round((mn + Math.random() * (mx - mn)) / st) * st));
                  setTPulse(r(0.1, 5, 0.1));
                  setTPurge1(r(1, 10, 0.5));
                  setKA(r(0.5, 15, 0.5));
                  setPA(r(0.1, 3, 0.1));
                  setDmA(r(10, 150, 5));
                }}>randomize</button>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "space-around", alignItems: "flex-end" }}>
              <VertSlider label="Pulse"   value={tPulse}  min={0.1} max={5}  step={0.1} onChange={setTPulse}  unit="s" fmt={v => v.toFixed(1)} />
              <VertSlider label="Purge"   value={tPurge1} min={1}   max={10} step={0.5} onChange={setTPurge1} unit="s" fmt={v => v.toFixed(1)} />
              <VertSlider label={<>K<sub>A</sub></>} value={KA} min={0.1} max={20} step={0.1} onChange={setKA}  fmt={v => v.toFixed(1)} />
              <VertSlider label={<>P<sub>A</sub></>} value={PA} min={0.05} max={5} step={0.05} onChange={setPA} fmt={v => v.toFixed(2)} unit="a.u." />
              <VertSlider label={<>Δm<sub>A</sub> (max)</>} value={dmA} min={-100} max={200} step={5} onChange={setDmA} fmt={v => v.toFixed(0)} unit="ng·cm⁻²" />
            </div>
          </div>

          {/* ── Right col: Co-reactant B ── */}
          <div style={{ paddingLeft: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em",
                color: "var(--c2)", textTransform: "uppercase" }}>
                Co-reactant B
              </div>
              <button style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.05em",
                color: "var(--c2)", border: "1px solid var(--c2)", background: "transparent",
                padding: "2px 8px", borderRadius: 3, cursor: "pointer", opacity: 0.7 }}
                onClick={() => {
                  const r = (mn, mx, st) => Math.min(mx, Math.max(mn, Math.round((mn + Math.random() * (mx - mn)) / st) * st));
                  setTCoReact(r(0.1, 5, 0.1));
                  setTPurge2(r(1, 10, 0.5));
                  setKB(r(0.5, 15, 0.5));
                  setPB(r(0.1, 3, 0.1));
                  setDmB(r(-80, 80, 5));
                }}>randomize</button>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "space-around", alignItems: "flex-end" }}>
              <VertSlider label="Pulse"   value={tCoReact} min={0.1} max={5}  step={0.1} onChange={setTCoReact} unit="s" fmt={v => v.toFixed(1)} variant="b" />
              <VertSlider label="Purge"   value={tPurge2}  min={1}   max={10} step={0.5} onChange={setTPurge2}  unit="s" fmt={v => v.toFixed(1)} variant="b" />
              <VertSlider label={<>K<sub>B</sub></>} value={KB} min={0.1} max={20} step={0.1} onChange={setKB}  fmt={v => v.toFixed(1)} variant="b" />
              <VertSlider label={<>P<sub>B</sub></>} value={PB} min={0.05} max={5} step={0.05} onChange={setPB} fmt={v => v.toFixed(2)} unit="a.u." variant="b" />
              <VertSlider label={<>Δm<sub>B</sub> (max)</>} value={dmB} min={-100} max={100} step={5} onChange={setDmB} fmt={v => v.toFixed(0)} unit="ng·cm⁻²" variant="b" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { LangmuirDemo, TGADemo, PanGeometryDemo, ALDCycleDemo });
