/* Shared components: Nav, Footer, Placeholder, Tweaks */

const { useState, useEffect, useRef, useMemo } = React;

// -----------------------------------------------------------------
// Placeholder image — subtly striped with caption
// -----------------------------------------------------------------
function Placeholder({ label = "image", style = {}, className = "" }) {
  return (
    <div className={`placeholder ${className}`} style={style}>
      <span className="phtext">{label}</span>
    </div>
  );
}

// -----------------------------------------------------------------
// Top nav — shared across variations
// -----------------------------------------------------------------
function TopNav({ variant = "A", onVariant, active = "home" }) {
  const links = [
    { id: "home",     href: "#home",     label: "01 / Home" },
    { id: "research", href: "#research", label: "02 / Research" },
    { id: "pubs",     href: "#pubs",     label: "03 / Publications" },
    { id: "cv",       href: "#cv",       label: "04 / CV" },
    { id: "teaching", href: "#teaching", label: "05 / Teaching" },
  ];
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <div className="topnav-brand">
          <span className="dot"></span>
          {window.CONTENT.name}
          <span style={{ color: "var(--ink-3)", fontWeight: 400, marginLeft: 8, fontSize: 14 }}>
            / {window.CONTENT.institution}
          </span>
        </div>
        <div className="topnav-links">
          {links.map(l => (
            <a key={l.id} href={l.href} className={active === l.id ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// -----------------------------------------------------------------
// Footer
// -----------------------------------------------------------------
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--rule)",
      background: "var(--paper-2)",
      padding: "64px 0 32px",
      marginTop: 80,
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}>
          <div>
            <div className="serif" style={{ fontSize: 24, marginBottom: 12 }}>
              {window.CONTENT.name}
            </div>
            <div style={{ color: "var(--ink-3)", maxWidth: 340, lineHeight: 1.6 }}>
              {window.CONTENT.footer.bio}
            </div>
          </div>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Elsewhere</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href={window.CONTENT.scholarUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-2)" }}>Google Scholar</a>
              <a href={window.CONTENT.orcidUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-2)" }}>ORCID</a>
              <a href="#" style={{ color: "var(--ink-2)" }}>GitHub</a>
              <a href="#" style={{ color: "var(--ink-2)" }}>LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href={`mailto:${window.CONTENT.email}`} style={{ color: "var(--ink-2)" }}>{window.CONTENT.email}</a>
              <div style={{ color: "var(--ink-3)", marginTop: 4 }}>
                {window.CONTENT.address.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
              </div>
            </div>
          </div>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Site</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.8 }}>
              {window.CONTENT.siteVersion}<br/>
              Last updated {window.CONTENT.lastUpdated}<br/>
              Built with care<br/>
              &amp; quiet type
            </div>
          </div>
        </div>
        <div className="rule-soft" style={{ marginBottom: 24 }}></div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          <div>{window.CONTENT.footer.copyright}</div>
          <div>{window.CONTENT.footer.geo}</div>
          <div>{window.CONTENT.footer.coords}</div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------
// Variation switcher
// -----------------------------------------------------------------
function VarSwitcher({ variant, onChange }) {
  const vars = [
    { id: "A", label: "A · Editorial" },
    { id: "B", label: "B · Dashboard" },
    { id: "C", label: "C · Typographic" },
  ];
  return (
    <div className="var-switcher">
      {vars.map(v => (
        <button
          key={v.id}
          className={variant === v.id ? "active" : ""}
          onClick={() => onChange(v.id)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------
// Tweaks panel — accent, font, light/dark
// -----------------------------------------------------------------
function TweaksPanel({ open, onClose, tweaks, setTweaks }) {
  const accents = [
    { id: "rust", color: "#B8523A" },
    { id: "navy", color: "#1F4257" },
    { id: "ink", color: "#1A1613" },
    { id: "moss", color: "#4E5D3A" },
  ];
  const fonts = [
    { id: "plex", label: "Plex" },
    { id: "editorial", label: "Newsreader" },
    { id: "modern", label: "Fraunces" },
  ];
  if (!open) return null;
  return (
    <div className="tweaks-panel open">
      <div className="tweaks-header">
        <h4>Tweaks</h4>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "var(--paper)",
          cursor: "pointer", fontSize: 14,
        }}>×</button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <div className="tweak-row-label">Accent</div>
          <div className="tweak-opts">
            {accents.map(a => (
              <button
                key={a.id}
                className={`swatch-btn ${tweaks.accent === a.id ? "active" : ""}`}
                style={{ background: a.color }}
                onClick={() => setTweaks({ ...tweaks, accent: a.id })}
                title={a.id}
              ></button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <div className="tweak-row-label">Type pairing</div>
          <div className="tweak-opts">
            {fonts.map(f => (
              <button
                key={f.id}
                className={tweaks.font === f.id ? "active" : ""}
                onClick={() => setTweaks({ ...tweaks, font: f.id })}
              >{f.label}</button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <div className="tweak-row-label">Theme</div>
          <div className="tweak-opts">
            <button
              className={tweaks.theme === "light" ? "active" : ""}
              onClick={() => setTweaks({ ...tweaks, theme: "light" })}
            >Light</button>
            <button
              className={tweaks.theme === "dark" ? "active" : ""}
              onClick={() => setTweaks({ ...tweaks, theme: "dark" })}
            >Dark</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Placeholder, TopNav, Footer, VarSwitcher, TweaksPanel });
