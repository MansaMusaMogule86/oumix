// Shared components: monogram, navbar, concierge footer, icons, image slots
const { useState, useEffect, useRef, useMemo } = React;

function useBreakpoint() {
  const get = () => ({ isMobile: window.innerWidth < 768, isTablet: window.innerWidth >= 768 && window.innerWidth < 1100 });
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return bp;
}
function useIsMobile(bp = 768) {
  const [v, setV] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < bp);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return v;
}

// ——— Brand mark — clean SVG 8-fold mandala rosette (vector, scales sharply)
function RosetteSVG({ size = 36, stroke = 1.4, glow = false }) {
  const id = "rg_" + Math.random().toString(36).slice(2, 7);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
      style={{ filter: glow ? "drop-shadow(0 0 8px rgba(230,198,135,0.35))" : undefined }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3d4" />
          <stop offset="0.45" stopColor="#E6C687" />
          <stop offset="1" stopColor="#8A6F3F" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth={stroke} fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* 8 outer petals — elongated almond shapes radiating from center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(rot => (
          <path key={rot} d="M50 14 Q60 28 50 42 Q40 28 50 14 Z"
            transform={`rotate(${rot} 50 50)`} />
        ))}
        {/* 8-petal inner lotus, rotated 22.5° from outer for the mandala interlock */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(rot => (
          <path key={rot} d="M50 26 Q56 36 50 46 Q44 36 50 26 Z"
            transform={`rotate(${rot} 50 50)`} opacity="0.85" />
        ))}
        {/* Mid ring */}
        <circle cx="50" cy="50" r="10" />
        {/* Center dot */}
        <circle cx="50" cy="50" r="3" fill={`url(#${id})`} />
      </g>
    </svg>
  );
}

// ——— Small circular logo mark used in chrome (navbar etc.)
function LogoMark({ size = 36, glow = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle at 50% 35%, #1a1815 0%, #0a0a0b 80%)",
      border: "1px solid rgba(230,198,135,0.45)",
      boxShadow: glow ? "0 0 20px rgba(230,198,135,0.15), inset 0 0 0 1px rgba(0,0,0,0.4)" : "inset 0 0 0 1px rgba(0,0,0,0.4)",
      display: "grid", placeItems: "center", flexShrink: 0,
    }}>
      <RosetteSVG size={size * 0.7} stroke={1.5} />
    </div>
  );
}

// ——— Full official logo (rosette + OUMIX wordmark + LUX) — image asset
function OumixFullLogo({ width = 280, style = {} }) {
  return (
    <img
      src="assets/oumix-lux-logo.png"
      alt="Oumix Lux"
      style={{ width, height: "auto", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))", ...style }}
    />
  );
}

// ——— OUMIX wordmark — used for each vertical (CAR / VILLAS)
function OumixMonogram({ size = 28, sub, tone = "gold" }) {
  const color = tone === "gold" ? "var(--gold)" : "currentColor";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <div style={{ marginBottom: 16 }}>
        <RosetteSVG size={size * 1.6} stroke={1.2} glow />
      </div>
      <div className="display gold-shimmer" style={{ fontSize: size * 1.7, letterSpacing: "0.22em", paddingLeft: "0.22em", lineHeight: 1 }}>
        OUMIX
      </div>
      {sub && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <span style={{ height: 1, width: 26, background: color, opacity: 0.7 }} />
          <span className="mono" style={{ fontSize: size * 0.46, letterSpacing: "0.42em", color, opacity: 0.95, paddingLeft: "0.42em" }}>{sub}</span>
          <span style={{ height: 1, width: 26, background: color, opacity: 0.7 }} />
        </div>
      )}
    </div>
  );
}

// ——— Center divider badge — circular dark token with SVG monogram
function CenterBadge({ size = 168 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle at 50% 30%, #1b1a17 0%, #0a0a0b 75%)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(230,198,135,0.5), 0 0 0 6px rgba(11,11,12,0.92), 0 0 0 7px rgba(230,198,135,0.3), 0 0 80px rgba(230,198,135,0.08)",
      display: "grid", placeItems: "center", position: "relative", overflow: "hidden",
    }}>
      <OumixMonogram size={Math.round(size * 0.14)} sub="LUX" />
      <div style={{
        position: "absolute", inset: -2, borderRadius: "50%",
        border: "1px solid rgba(230,198,135,0.18)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ——— Icons (line, gold)
const Icon = {
  Phone: (p) => (<svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>),
  Plane: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 16l20-7-9 12-3-5-8 0z"/></svg>),
  Pin: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  Shield: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>),
  Clock: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>),
  Pool: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 17c2 0 2 1.5 5 1.5S9 17 12 17s2 1.5 5 1.5S19 17 22 17"/><path d="M2 21c2 0 2 1.5 5 1.5S9 21 12 21"/><path d="M7 16V6a2 2 0 014 0M17 16V6"/></svg>),
  Sparkle: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3l1.5 5 5 1.5-5 1.5L12 16l-1.5-5-5-1.5 5-1.5L12 3zM19 14l.7 2.3 2.3.7-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z"/></svg>),
  Bell: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M6 16V11a6 6 0 1112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0"/></svg>),
  Sun: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2"/></svg>),
  Arrow: (p) => (<svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  Car: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 16l1-5 2-3h12l2 3 1 5v3h-3v-2H6v2H3v-3z"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>),
  Bed: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 18V8M21 18v-6H3M7 12V9a1 1 0 011-1h3a1 1 0 011 1v3"/></svg>),
  Guest: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="8" r="3.5"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>),
  Close: (p) => (<svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 6l12 12M18 6L6 18"/></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12l5 5 9-11"/></svg>),
  Star: (p) => (<svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="currentColor"><path d="M12 2l3 7 7 .6-5.3 4.7L18 21l-6-3.6L6 21l1.3-6.7L2 9.6 9 9z"/></svg>),
  Compass: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="9"/><polygon points="16,8 13.5,13.5 8,16 10.5,10.5" fill="none" stroke="currentColor" strokeLinejoin="round"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>),
};

// ——— Navbar
function Navbar({ page, go }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "cars", label: "Fleet" },
    { id: "villas", label: "Villas" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  const isActive = (l) =>
    (l.id === "cars" && (page === "cars" || page === "detail-car")) ||
    (l.id === "villas" && (page === "villas" || page === "detail-villa")) ||
    l.id === page;
  const nav = (id) => {
    go({ page: id });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: isMobile ? 64 : 76, zIndex: 50,
      background: "rgba(11,11,12,0.86)", backdropFilter: "blur(14px) saturate(140%)",
      WebkitBackdropFilter: "blur(14px) saturate(140%)",
      borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 20px" : "0 36px",
    }}>
      <button onClick={() => nav("landing")} style={{ background: "none", border: 0, color: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <LogoMark size={isMobile ? 30 : 36} glow />
        <span className="display gold-shimmer" style={{ fontSize: isMobile ? 15 : 19, letterSpacing: "0.3em", paddingLeft: "0.3em", fontWeight: 500 }}>OUMIX</span>
        {!isMobile && <span className="mono" style={{ fontSize: 9, letterSpacing: "0.42em", color: "var(--muted)", marginLeft: 4 }}>MARRAKECH</span>}
      </button>

      {!isMobile && (
        <>
          <div style={{ display: "flex", gap: 36 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => nav(l.id)} style={{
                background: "none", border: 0, color: isActive(l) ? "var(--gold)" : "var(--muted)",
                textTransform: "uppercase", letterSpacing: "0.22em", fontSize: 11,
                padding: "8px 4px", cursor: "pointer",
                borderBottom: isActive(l) ? "1px solid var(--gold)" : "1px solid transparent",
                transition: "color .25s, border-color .25s",
              }}>{l.label}</button>
            ))}
          </div>
          <button onClick={() => nav("contact")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "transparent", border: "1px solid rgba(230,198,135,0.35)",
            color: "var(--gold)", padding: "10px 16px", borderRadius: 999,
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer",
            transition: "all .25s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,198,135,0.08)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(230,198,135,0.35)"; }}>
            <Icon.Phone /> Concierge
          </button>
        </>
      )}

      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: 0, cursor: "pointer", padding: 8,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1.5, borderRadius: 1,
              background: menuOpen ? "var(--gold)" : "var(--text)",
              transition: "all .28s cubic-bezier(.2,.7,.2,1)",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(4.7px, 4.7px)"
                : i === 2 ? "rotate(-45deg) translate(4.7px, -4.7px)" : "none"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          background: "rgba(11,11,12,0.98)", backdropFilter: "blur(20px)",
          zIndex: 49, display: "flex", flexDirection: "column",
          padding: "28px 28px 100px", overflowY: "auto",
        }}>
          {links.map((l, i) => (
            <button key={l.id} onClick={() => nav(l.id)} className="fade-up" style={{
              background: "none", border: 0, borderBottom: "1px solid var(--line)",
              color: isActive(l) ? "var(--gold)" : "var(--text)",
              padding: "20px 0", cursor: "pointer", textAlign: "left",
              fontSize: 30, letterSpacing: "0.06em",
              fontFamily: "'Italiana', 'Cormorant Garamond', serif",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              animationDelay: `${i * 55}ms`,
            }}>
              {l.label}
              <span style={{ color: "var(--gold)", opacity: 0.7 }}><Icon.Arrow size={20} /></span>
            </button>
          ))}
          <div style={{ marginTop: 36, padding: "24px", border: "1px solid rgba(230,198,135,0.28)", background: "rgba(230,198,135,0.03)" }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.36em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 12 }}>Concierge · 24 / 7</div>
            <a href={`tel:${window.OUMIX_DATA.BRAND.phone.replace(/\s/g,"")}`} className="display gold" style={{ fontSize: 22, letterSpacing: "0.14em", display: "block" }}>
              {window.OUMIX_DATA.BRAND.phoneDisplay}
            </a>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginTop: 10 }}>FR · EN · AR · WhatsApp</div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ——— Concierge sticky footer
function ConciergeFooter() {
  const isMobile = useIsMobile();
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
      background: "linear-gradient(90deg, #0B0B0C 0%, #141416 50%, #0B0B0C 100%)",
      borderTop: "1px solid rgba(230,198,135,0.22)",
      padding: isMobile ? "11px 20px" : "14px 24px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 10 : 18,
    }}>
      {!isMobile && <>
        <span className="mono" style={{ color: "var(--muted)", fontSize: 10, letterSpacing: "0.32em" }}>ONE NUMBER FOR ALL SERVICES</span>
        <span style={{ width: 1, height: 14, background: "var(--gold-3)", opacity: 0.5 }} />
      </>}
      <a href={`tel:${window.OUMIX_DATA.BRAND.phone.replace(/\s/g, "")}`} style={{
        display: "inline-flex", alignItems: "center", gap: isMobile ? 8 : 10,
        color: "var(--gold)", letterSpacing: "0.22em", fontSize: isMobile ? 13 : 14, fontWeight: 500,
      }}>
        <span style={{
          width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, borderRadius: "50%",
          border: "1px solid var(--gold)", display: "grid", placeItems: "center",
        }}><Icon.Phone size={isMobile ? 9 : 11} /></span>
        <span className="display" style={{ fontSize: isMobile ? 16 : 18, letterSpacing: "0.2em" }}>{window.OUMIX_DATA.BRAND.phoneDisplay}</span>
      </a>
    </div>
  );
}

// ——— Hairline title block (e.g. "01 — Fleet")
function SectionEyebrow({ index, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--gold)" }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.36em", opacity: 0.7 }}>{index}</span>
      <span style={{ width: 28, height: 1, background: "var(--gold)" }} />
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.36em" }}>{label}</span>
    </div>
  );
}

// ——— Generic image placeholder slot
function ImgSlot({ label, tone, height = 200, style = {} }) {
  return <div className="img-slot" data-tone={tone} data-label={label} style={{ height, ...style }} />;
}

Object.assign(window, { useIsMobile, useBreakpoint, OumixMonogram, OumixFullLogo, LogoMark, CenterBadge, RosetteSVG, Icon, Navbar, ConciergeFooter, SectionEyebrow, ImgSlot });
