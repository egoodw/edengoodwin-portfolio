/* Three homepage variations — text content lives in js/content.js */

// =================================================================
// Variation A — Editorial / Journal
// =================================================================
function VariationA() {
  const C = window.CONTENT;
  return (
    <div>
      <section id="home" className="varA-hero container">
        <div className="eyebrow">
          <span className="pill pill-accent">{C.hero.tag}</span>
          <span className="label">{C.sections.heroLabelA}</span>
          <span className="label" style={{ color: "var(--ink-4)" }}>— {C.department}</span>
        </div>
        <h1>
          Designing <em>small molecules</em> that teach surfaces where
          to grow, atom by atom.
        </h1>
        <p className="lede">{C.hero.ledeA}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          <a className="btn btn-accent" href="#demos">{C.hero.ctaExplore}</a>
          <a className="btn btn-ghost" href="#cv">{C.hero.ctaCV}</a>
        </div>
      </section>

      <div id="research" className="container varA-grid">
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Featured research — 2024 / 2026</div>

          {C.projects.map((p, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-num">PROJECT {p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                {p.pills.map(pill => <span className="pill" key={pill}>{pill}</span>)}
              </div>
            </div>
          ))}
        </div>

        <aside>
          <Placeholder label="HEADSHOT · 4:5" style={{ aspectRatio: "4/5", width: "100%" }} />
          <div className="card" style={{ marginTop: 24, padding: 24 }}>
            <div className="label" style={{ marginBottom: 16 }}>At a glance</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
              {[
                ["Institution", C.glance.institution],
                ["Group",       C.glance.group],
                ["Focus",       C.glance.focus],
                ["Teaching",    C.glance.teaching],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-3)" }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--ink-3)" }}>Available</span>
                <span style={{ color: "var(--accent)" }}>{C.glance.available}</span>
              </div>
            </div>
          </div>
          <div className="card card-inset" style={{ marginTop: 24, padding: 24 }}>
            <div className="label label-accent" style={{ marginBottom: 12 }}>Current reading</div>
            <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
              "{C.pullQuote.text}"
            </p>
            <div style={{ marginTop: 12, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
              {C.pullQuote.source}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =================================================================
// Variation B — Dashboard / Data-forward
// =================================================================
function VariationB() {
  const C = window.CONTENT;
  const id = C.identityB;
  return (
    <div>
      <section id="home" className="varB-hero">
        <div className="varB-portrait">
          <Placeholder label="HEADSHOT" style={{ aspectRatio: "1/1", width: "100%" }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", lineHeight: 1.7 }}>
            {id.name}<br/>
            {id.role}<br/>
            {id.inst}<br/>
            <br/>
            {id.orcid}<br/>
            {id.h}<br/>
            {id.cites}
          </div>
          <a className="btn btn-accent" href="#cv" style={{ justifyContent: "center" }}>{id.cvBtn}</a>
        </div>
        <div className="varB-main">
          <div className="label label-accent" style={{ marginBottom: 24 }}>{C.hero.tagB}</div>
          <h1>
            Atomic layer chemistry<br/>
            for the ångström era.
          </h1>
          <p style={{ maxWidth: 600, marginTop: 24, fontSize: 18, color: "var(--ink-2)", lineHeight: 1.55 }}>
            {C.hero.ledeB}
          </p>

          <div className="varB-stats" style={{ marginTop: 48 }}>
            <div className="varB-stat">
              <div className="big"><em>{C.stats.papers}</em></div>
              <div className="label">{C.statLabels.papers}</div>
            </div>
            <div className="varB-stat">
              <div className="big"><em>{C.stats.models}</em></div>
              <div className="label">{C.statLabels.models}</div>
            </div>
            <div className="varB-stat">
              <div className="big"><em>{C.stats.talks}</em></div>
              <div className="label">{C.statLabels.talks}</div>
            </div>
            <div className="varB-stat">
              <div className="big"><em>{C.stats.citations}</em></div>
              <div className="label">{C.statLabels.citations}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" style={{ padding: "80px 0", borderBottom: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="label label-accent">{C.sections.research}</div>
              <h2 className="serif" style={{ fontSize: 40, marginTop: 8, letterSpacing: "-0.01em" }}>
                {C.sections.researchH}
              </h2>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", textAlign: "right" }}>
              last updated<br/>
              <span style={{ color: "var(--ink)" }}>{C.lastUpdated}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--rule)" }}>
            {C.projects.map((p, i) => (
              <div key={i} style={{
                padding: 32,
                borderRight: i < 2 ? "1px solid var(--rule)" : "none",
                display: "flex", flexDirection: "column", gap: 16,
                minHeight: 340, background: "var(--paper)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 24 }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                    PROJECT {p.num}
                  </span>
                  <span className="pill pill-accent">{p.tag}</span>
                </div>
                <div style={{ aspectRatio: "3/4", width: "100%", position: "relative", background: "#ffffff", border: "2px solid var(--ink-3)" }}>
                  {p.img
                    ? <img src={p.img} alt={p.titleB} style={{ position: "absolute", inset: "5px", width: "calc(100% - 10px)", height: "calc(100% - 10px)", objectFit: "contain" }} />
                    : <Placeholder label="scheme / molecular render" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />}
                </div>
                <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.25 }}>{p.titleB}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{p.bodyB}</p>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>
                  ▸ Read more
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// =================================================================
// Variation C — Typographic / Minimal
// =================================================================
function VariationC() {
  const C = window.CONTENT;
  const marqueeText = "ATOMIC LAYER DEPOSITION · AREA SELECTIVE · RESTRUCTURING · PRECURSOR DESIGN · ";
  return (
    <div>
      <section id="home" className="varC-hero container">
        <div className="subhead">{C.hero.subheadC}</div>
        <h1>
          Angstrom<br/>
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>chemistry.</em>
        </h1>
        <p className="summary">{C.hero.ledeC}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 40 }}>
          <a className="btn btn-accent" href="#demos">{C.hero.ctaDemos}</a>
          <a className="btn btn-ghost" href="#cv">{C.hero.ctaFullCV}</a>
        </div>
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center", gap: 56, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <div><div style={{ color: "var(--ink)", fontSize: 28, fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: "-0.02em" }}>{C.stats.papers}</div>papers</div>
          <div><div style={{ color: "var(--ink)", fontSize: 28, fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: "-0.02em" }}>{C.stats.models}</div>models</div>
          <div><div style={{ color: "var(--ink)", fontSize: 28, fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: "-0.02em" }}>{C.stats.talks}</div>talks</div>
          <div><div style={{ color: "var(--ink)", fontSize: 28, fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: "-0.02em" }}>{C.stats.available}</div>available</div>
        </div>
      </section>

      <section className="varC-marquee">
        <div className="varC-marquee-inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              {i % 2 === 0 ? marqueeText : <em>{marqueeText}</em>}
            </span>
          ))}
        </div>
      </section>

      <section id="research" className="container" style={{ padding: "120px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 80, marginBottom: 96 }}>
          <div className="label">{C.sections.varCThesis}</div>
          <div>
            <p className="serif" style={{ fontSize: 36, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              I develop <span style={{ color: "var(--accent)" }}>small molecules</span> for advanced
              atomic layer processes — the ligand chemistry that pushes Moore's law into
              the ångström era — and I build <span style={{ color: "var(--accent)" }}>new tools</span> that
              compartmentalize the coupled problems of selectivity, volatility, and
              reactivity in the gas phase.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 80 }}>
          <div className="label">{C.sections.varCResearch}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, rowGap: 64 }}>
            {C.researchThreadsC.map((r, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--ink)", paddingTop: 16 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)", marginBottom: 12 }}>
                  {r.n}
                </div>
                <h3 className="serif" style={{ fontSize: 28, marginBottom: 8, letterSpacing: "-0.01em" }}>
                  {r.t}
                </h3>
                <p style={{ color: "var(--ink-3)" }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { VariationA, VariationB, VariationC });
