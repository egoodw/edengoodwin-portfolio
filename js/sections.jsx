/* Page sections: Demos section, Publications, CV, Teaching, Equity
   Text content lives in js/content.js */

// ---------- Demos section ----------
function DemosSection() {
  const C = window.CONTENT;
  return (
    <section id="demos" style={{ padding: "96px 0", background: "var(--paper-2)", borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div className="label label-accent">{C.sections.demos}</div>
            <h2 className="serif" style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 12 }}>
              {C.sections.demosH}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 560, alignSelf: "end" }}>
            {C.sections.demosLede}
          </p>
        </div>
        <LangmuirDemo />
        <TGADemo />
        <ALDCycleDemo />
      </div>
    </section>
  );
}

// ---------- Publications & Patents ----------
function PubsSection() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const all = window.CONTENT.writing;

  const matchesQuery = (p) => !query ||
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.authors.toLowerCase().includes(query.toLowerCase());

  const filtered = all.filter(p => {
    if (filter === "articles" && p.type !== "Article") return false;
    if (filter === "chapters" && p.type !== "Chapter") return false;
    if (filter === "patents"  && p.type !== "Patent")  return false;
    return matchesQuery(p);
  });

  const pubCount    = all.filter(p => p.type !== "Patent").length;
  const patentCount = all.filter(p => p.type === "Patent").length;

  return (
    <section id="pubs" style={{ padding: "96px 0", borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div className="label label-accent">{window.CONTENT.sections.pubs}</div>
            <h2 className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 12 }}>
              {window.CONTENT.sections.pubsH}
            </h2>
            <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 12, letterSpacing: "0.02em" }}>
              {pubCount} peer-reviewed · 2 journal covers · 1 invited · 1 Editor's Pick · {patentCount} patents
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "right" }}>
            <a href={window.CONTENT.orcidUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-3)" }}>ORCID {window.CONTENT.orcid}</a><br/>
            <a href={window.CONTENT.scholarUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-3)" }}>Google Scholar ↗</a><br/>
            updated 2026-04
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 32, alignItems: "center" }}>
          <div className="seg-control" style={{ flex: "0 0 auto" }}>
            {[
              { id: "all",      label: "All" },
              { id: "articles", label: "Articles" },
              { id: "chapters", label: "Chapters" },
              { id: "patents",  label: "Patents" },
            ].map(f => (
              <button key={f.id} className={filter === f.id ? "active" : ""}
                onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search titles, authors…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, padding: "10px 14px",
              background: "var(--paper-2)",
              border: "1px solid var(--rule)",
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--ink)", outline: "none",
            }}
          />
        </div>

        <div style={{ borderTop: "2px solid var(--ink)" }}>
          {filtered.map((p) => {
            const isPatent = p.type === "Patent";
            const num = isPatent ? `P${p.n}` : String(p.n).padStart(2, "0");
            const key = `${p.type}-${p.n}-${p.year}`;
            return (
              <div key={key} className="pub-row">
                <div className="pub-num">
                  {num} · {p.year}
                  {p.status && <div style={{ marginTop: 4, fontWeight: 600 }}>{p.status}</div>}
                </div>
                <div>
                  <div className="pub-title">{p.title}</div>
                  <div className="pub-meta">{p.authors}</div>
                  <div className="pub-venue" style={{ marginTop: 6 }}>{p.venue}</div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", gap: 8 }}>
                  {p.preprint && (
                    <a href={p.preprint} target="_blank" rel="noopener noreferrer" className="pill">Preprint</a>
                  )}
                  {p.doi && (
                    <a href={p.doi} target="_blank" rel="noopener noreferrer" className="pill">DOI</a>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: 48, textAlign: "center", color: "var(--ink-3)" }}>
              No {filter === "patents" ? "patents" : "publications"} match.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- CV (full, real data) ----------
function CVSection() {
  const groups = window.CONTENT.cvTabs;
  const cvItems = window.CONTENT.cvItems;

  function sumAmounts(items) {
    return items.reduce((acc, item) => {
      if (!item.amount) return acc;
      const n = parseInt(item.amount.replace(/[$,]/g, ""), 10);
      return acc + (isNaN(n) ? 0 : n);
    }, 0);
  }
  function toKString(n) {
    return "$" + Math.round(n / 1000) + "k";
  }

  const stats = [
    ...window.CONTENT.cvStats,
    [toKString(sumAmounts(cvItems.awards)), "Fellowships & awards"],
    [toKString(sumAmounts(cvItems.grants)), "Research grants"],
  ];

  return (
    <section id="cv" style={{ padding: "96px 0", borderTop: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
          <div>
            <div className="label label-accent">{window.CONTENT.sections.cv}</div>
            <h2 className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 12 }}>
              {window.CONTENT.name} <span style={{ color: "var(--ink-3)", fontSize: 22 }}>({window.CONTENT.pronouns})</span>
            </h2>
            <p style={{ marginTop: 12, fontSize: 16, color: "var(--ink-2)", maxWidth: 720, lineHeight: 1.6 }}>
              {window.CONTENT.cvBlurb}
            </p>
          </div>
          <a className="btn btn-accent" href="assets/Curriculum Vitae.docx">⤓ Full CV — DOCX</a>
        </div>

        {/* Quick stats strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
          border: "1px solid var(--rule)", marginTop: 32, marginBottom: 64,
          background: "var(--paper)",
        }}>
          {stats.map(([big, lbl], i) => (
            <div key={i} style={{
              padding: "24px 28px",
              borderRight: i < 5 ? "1px solid var(--rule)" : "none",
            }}>
              <div className="mono" style={{ fontSize: 32, letterSpacing: "-0.02em", color: "var(--accent)", lineHeight: 1 }}>
                {big}
              </div>
              <div className="label" style={{ marginTop: 8 }}
                dangerouslySetInnerHTML={{ __html: lbl }} />
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, rowGap: 80 }}>
          {groups.map(g => (
            <div key={g.key}>
              <h3 className="serif" style={{ fontSize: 24, marginBottom: 16, borderBottom: "2px solid var(--ink)", paddingBottom: 12, letterSpacing: "-0.01em" }}
                dangerouslySetInnerHTML={{ __html: g.label }} />
              {cvItems[g.key].map((item, i) => (
                <div key={i} className="cv-row">
                  <div className="cv-date">
                    {item.date}
                    {item.amount && <div style={{ fontWeight: 700, marginTop: 4 }}>{item.amount}</div>}
                  </div>
                  <div>
                    <div className="cv-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <div className="cv-sub" dangerouslySetInnerHTML={{ __html: item.sub }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* References omitted — available on request */}
      </div>
    </section>
  );
}

// ---------- Teaching ----------
function TeachingSection() {
  return (
    <section id="teaching" style={{ padding: "96px 0", borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div className="label label-accent">{window.CONTENT.sections.teaching}</div>
            <h2 className="serif" style={{ fontSize: 56, letterSpacing: "-0.02em", marginTop: 16, lineHeight: 1.05, fontWeight: 400 }}>
              Pedagogy and research are <em style={{ color: "var(--accent)" }}>intractable</em> from each other.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", marginTop: 24, maxWidth: 480 }}>
              {window.CONTENT.sections.teachingLede}
            </p>
          </div>

          <div>
            <div className="card" style={{ padding: 32, marginBottom: 24 }}>
              <div className="label" style={{ marginBottom: 16 }}>Recent course instructor record</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {window.CONTENT.courses.map(([code, name], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--rule-soft)", paddingBottom: 12, gap: 16 }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", flexShrink: 0 }}>{code}</span>
                    <span style={{ textAlign: "right", fontSize: 13 }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-inset" style={{ padding: 32 }}>
              <div className="label label-accent" style={{ marginBottom: 16 }}>Equity in practice</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)" }}>
                {window.CONTENT.equityText}
              </p>
              <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {window.CONTENT.equityPills.map(p => (
                  <span className="pill" key={p}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DemosSection, PubsSection, CVSection, TeachingSection });
