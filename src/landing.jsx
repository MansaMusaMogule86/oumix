// Landing page — split-screen dual gate
const { useState: useStateL, useEffect: useEffectL } = React;

function FeatureChip({ icon, label, tone = "gold" }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      color: "var(--text)", minWidth: 84,
    }}>
      <span style={{
        width: 38, height: 38, borderRadius: "50%",
        border: "1px solid rgba(230,198,135,0.35)",
        display: "grid", placeItems: "center",
        color: "var(--gold)",
        background: "rgba(0,0,0,0.25)",
      }}>{icon}</span>
      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: "var(--muted)", textAlign: "center", lineHeight: 1.4, textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function HalfPanel({ side, monogramSub, eyebrow, headline, headlineAccent, body, features, cta, onCTA, slotId, slotPlaceholder, slotSrc, bgGradient, accentGlow }) {
  const isLeft = side === "left";
  const isMobile = useIsMobile();
  const [hover, setHover] = useStateL(false);

  return (
    <div
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      style={{
        position: "relative",
        flex: isMobile ? "none" : (hover ? "1.04 1 0" : "1 1 0"),
        width: isMobile ? "100%" : undefined,
        height: isMobile ? "60vh" : "100%",
        minHeight: isMobile ? 360 : undefined,
        transition: isMobile ? "none" : "flex 0.6s cubic-bezier(.2,.7,.2,1)",
        overflow: "hidden",
        cursor: "default",
        background: bgGradient,
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: accentGlow, zIndex: 1 }} />

      {/* Cinematic image bed */}
      <image-slot
        id={slotId}
        placeholder={slotPlaceholder}
        src={slotSrc || ""}
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: "72%", width: "100%", zIndex: 2,
          maskImage: "linear-gradient(to top, black 30%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 92%)",
        }}
      />

      {/* Dark cinematic wash */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: isLeft
          ? "linear-gradient(180deg, rgba(7,8,10,0.78) 0%, rgba(7,8,10,0.18) 30%, rgba(7,8,10,0.04) 54%, rgba(7,8,10,0.70) 100%)"
          : "linear-gradient(180deg, rgba(15,11,8,0.75) 0%, rgba(15,11,8,0.14) 30%, rgba(15,11,8,0.03) 54%, rgba(15,11,8,0.70) 100%)",
      }} />

      {/* Content — flows top-down: eyebrow → monogram → headline → copy → categories → CTA */}
      <div style={{
        position: "relative", zIndex: 4, height: "100%",
        display: "flex", flexDirection: "column",
        padding: isMobile ? "32px 24px 28px" : "86px 6vw 110px",
        alignItems: "flex-start", textAlign: "left",
        boxSizing: "border-box",
      }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--gold)", marginBottom: isMobile ? 14 : 18 }}>
          <span style={{ width: 30, height: 1, background: "var(--gold)" }} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.4em" }}>{eyebrow}</span>
        </div>

        {/* Monogram */}
        <div style={{ marginBottom: isMobile ? 14 : 18 }}>
          <OumixMonogram size={isMobile ? 26 : 40} sub={monogramSub} />
        </div>

        {/* Headline */}
        <h1 className="display" style={{
          fontSize: isMobile ? "clamp(21px, 5.8vw, 30px)" : "clamp(28px, 2.8vw, 44px)",
          margin: 0, lineHeight: isMobile ? 1.08 : 1.07,
          maxWidth: 460, color: "#fff", fontWeight: 400,
          textShadow: "0 4px 28px rgba(0,0,0,0.6)",
        }}>
          {headline}
          {headlineAccent && <><br /><span className="script gold-shimmer" style={{ fontSize: "0.8em" }}>{headlineAccent}</span></>}
        </h1>

        {/* Body copy — desktop only */}
        {!isMobile && (
          <p style={{
            marginTop: 14, marginBottom: 0,
            color: "rgba(244,242,238,0.68)", maxWidth: 400,
            fontSize: 13, lineHeight: 1.75, letterSpacing: "0.025em",
            textShadow: "0 2px 14px rgba(0,0,0,0.55)",
          }}>{body}</p>
        )}

        {/* Category tags — desktop only */}
        {!isMobile && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 0, alignItems: "center" }}>
            {features.categories.map((c, i) => (
              <React.Fragment key={c}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>{c}</span>
                {i < features.categories.length - 1 && <span style={{ color: "var(--gold)", margin: "0 10px", opacity: 0.45 }}>·</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* CTA — part of the content flow, not pushed to bottom */}
        <div style={{ marginTop: isMobile ? 22 : 22 }}>
          <button onClick={onCTA} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: isMobile ? 8 : 11,
            background: (isMobile || hover) ? "var(--gold)" : "rgba(9,9,10,0.48)",
            backdropFilter: "blur(10px)",
            color: (isMobile || hover) ? "#0B0B0C" : "var(--gold)",
            border: "1px solid rgba(230,198,135,0.85)",
            ...(isMobile ? {
              width: "auto", minWidth: 180, height: 48,
              padding: "0 24px", fontSize: 11, letterSpacing: "0.22em",
            } : {
              padding: "13px 26px", fontSize: 11, letterSpacing: "0.26em",
            }),
            textTransform: "uppercase", fontWeight: 500, transition: "all .35s",
          }}>
            {cta} <Icon.Arrow size={13} />
          </button>
        </div>

        {/* Mobile: inline feature chips */}
        {isMobile && (
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 18 }}>
            {features.chips.slice(0, 3).map(f => <FeatureChip key={f.label} icon={f.icon} label={f.label} />)}
          </div>
        )}
      </div>

      {/* Desktop: dark glass feature strip — always visible, anchored to bottom */}
      {!isMobile && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          background: isLeft
            ? "linear-gradient(0deg, rgba(5,6,8,0.72) 0%, rgba(5,6,8,0.46) 100%)"
            : "linear-gradient(0deg, rgba(14,8,5,0.72) 0%, rgba(14,8,5,0.46) 100%)",
          backdropFilter: "blur(20px) saturate(120%)",
          WebkitBackdropFilter: "blur(20px) saturate(120%)",
          borderTop: "1px solid rgba(230,198,135,0.26)",
          padding: "16px 6vw 20px",
          display: "flex", gap: 28,
        }}>
          {features.chips.map(f => <FeatureChip key={f.label} icon={f.icon} label={f.label} />)}
        </div>
      )}
    </div>
  );
}

function Landing({ go, tweaks }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: 0 }}>
      {/* Hero split */}
      <div style={{
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "auto" : 760,
        display: "flex", position: "relative",
        flexDirection: isMobile ? "column" : "row",
      }}>
        <HalfPanel
          side="left"
          eyebrow="01 — Mobility"
          monogramSub="CAR"
          headline={<>Rent any car,<br /><span className="gold-shimmer">anywhere in Morocco.</span></>}
          body="A meticulously curated fleet — from the most-requested executive saloons to desert-grade 4x4s — delivered to your terminal, riad, or villa gate. Insurance included. Driven by a single concierge line."
          features={{
            categories: ["Economy", "SUV", "Luxury", "Premium", "4x4"],
            chips: [
              { icon: <Icon.Plane />, label: "Airport\nDelivery" },
              { icon: <Icon.Pin />, label: "Any\nLocation" },
              { icon: <Icon.Shield />, label: "Insurance\nIncluded" },
              { icon: <Icon.Clock />, label: "24/7\nService" },
            ],
          }}
          cta="Explore Fleet"
          onCTA={() => go({ page: "cars" })}
          slotId="hero-car-bg"
          slotPlaceholder="Drop a luxury fleet image — palms, cars, twilight"
          slotSrc="assets/Oumixcars.png"
          bgGradient="linear-gradient(180deg, #050608 0%, #0a1118 35%, #0b0d11 70%, #060708 100%)"
          accentGlow="radial-gradient(ellipse 80% 50% at 50% 110%, rgba(120,150,200,0.22) 0%, rgba(120,150,200,0.04) 40%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 120%, rgba(230,198,135,0.10) 0%, transparent 60%)"
        />

        <HalfPanel
          side="right"
          eyebrow="02 — Stays"
          monogramSub="VILLAS"
          headline={<>Luxury Villas</>}
          headlineAccent={<>in Marrakech</>}
          body="Behind discreet doors across the Palmeraie, the medina, and the foothills — an exacting portfolio of villas and riads, each with a private pool, a permanent staff, and a concierge on call."
          features={{
            categories: ["Palmeraie", "Medina", "Amelkis", "Atlas"],
            chips: [
              { icon: <Icon.Pool />, label: "Private\nPool" },
              { icon: <Icon.Sparkle />, label: "Daily\nCleaning" },
              { icon: <Icon.Compass />, label: "Unique\nLocations" },
              { icon: <Icon.Bell />, label: "Concierge\nService" },
            ],
          }}
          cta="Discover Stays"
          onCTA={() => go({ page: "villas" })}
          slotId="hero-villa-bg"
          slotPlaceholder="Drop a villa image — pool, terrace, lanterns"
          slotSrc="assets/Oumixvillaspng.png"
          bgGradient="linear-gradient(180deg, #1a0f06 0%, #2a1810 35%, #1d130b 70%, #0e0805 100%)"
          accentGlow="radial-gradient(ellipse 80% 60% at 60% 105%, rgba(255,170,80,0.28) 0%, rgba(255,140,60,0.08) 40%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(230,198,135,0.18) 0%, transparent 60%)"
        />

        {/* Center divider + badge — desktop only */}
        {!isMobile && <>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            width: 1, transform: "translateX(-0.5px)",
            background: "linear-gradient(180deg, transparent, rgba(230,198,135,0.45), rgba(230,198,135,0.45), transparent)",
            zIndex: 3,
          }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 4 }}>
            <CenterBadge size={168} />
          </div>
        </>}
      </div>

      {/* Below the fold: signature block */}
      <SignatureSection go={go} />

      {/* Marquee strip */}
      <Marquee />

      {/* Verticals overview */}
      <VerticalsRow go={go} />

      {/* Concierge band */}
      <ConciergeBand />
    </div>
  );
}

function SignatureSection({ go }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "64px 24px 56px" : "140px 6vw 100px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 36 : 80, alignItems: "start" }}>
        <div>
          <SectionEyebrow index="03" label="The House" />
          <h2 className="display" style={{ fontSize: isMobile ? "clamp(30px, 8vw, 48px)" : 56, lineHeight: 1.1, margin: "24px 0 0", maxWidth: 460 }}>
            A single signature <span className="script gold">across two of Marrakech's </span>most exacting verticals.
          </h2>
        </div>
        <div>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85, marginTop: isMobile ? 0 : 12, maxWidth: 580 }}>
            Oumix Marrakech began as a quiet idea among friends who knew the city well — that the best parts of a stay should never feel logistical. Today, that idea is two complementary houses under one signature, <span style={{ color: "var(--gold)" }}>OUMIX LUX</span>. <span style={{ color: "var(--gold)" }}>OUMIX CAR</span> answers the question of mobility, from a discreet airport pick-up to a desert convoy. <span style={{ color: "var(--gold)" }}>OUMIX VILLAS</span> answers the question of refuge — Riad, Palmeraie, or High Atlas — with a staff, a chef, and a concierge already in place.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)", gap: isMobile ? "24px 16px" : 32, marginTop: 36 }}>
            <Stat n="08" label="Years quietly serving Marrakech" />
            <Stat n="42+" label="Premium vehicles in fleet" />
            <Stat n="26" label="Curated villas & riads" />
            <Stat n="24/7" label="Concierge on a single line" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="display gold" style={{ fontSize: 38 }}>{n}</div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginTop: 6, maxWidth: 120, lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

function Marquee() {
  const items = ["Airport Delivery", "Bilingual Drivers", "Insurance Included", "Late-Night Arrivals", "Private Hammam", "Chef on Request", "Atlas Excursions", "Yacht & Helicopter on Request", "Wedding Logistics", "VIP Pick-Up"];
  return (
    <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "#0a0a0b" }}>
      <div style={{ display: "flex", animation: "scroll 50s linear infinite", whiteSpace: "nowrap", padding: "22px 0" }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 18, paddingRight: 36 }}>
            <span style={{ width: 4, height: 4, background: "var(--gold)", transform: "rotate(45deg)" }} />
            <span className="mono" style={{ fontSize: 12, letterSpacing: "0.28em", color: i % 4 === 0 ? "var(--gold)" : "var(--muted)", textTransform: "uppercase" }}>{it}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function VerticalsRow({ go }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "56px 24px" : "120px 6vw", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40 }}>
        <VerticalCard
          eyebrow="OUMIX · CAR"
          title="A fleet, not a list."
          body="Forty-two vehicles maintained on a monthly cycle. Every key handed over with full tanks, sanitised cabins, and a dossier of the routes you'll likely take. Chauffeur optional."
          stats={[["10+", "Brands"], ["€55", "From / day"], ["24h", "Door delivery"]]}
          cta="Browse the Fleet"
          onClick={() => go({ page: "cars" })}
          label="lineup — three vehicles, three trims"
          tone="car"
        />
        <VerticalCard
          eyebrow="OUMIX · VILLAS"
          title="A roster of refuges."
          body="Twenty-six private estates — never resorts. The pool you swim in is yours. The chef cooking for you is on staff. The car parked outside is the one you arrived in."
          stats={[["26", "Estates"], ["€720", "From / night"], ["8", "Average staff"]]}
          cta="Discover the Villas"
          onClick={() => go({ page: "villas" })}
          label="villa — pool by twilight"
          tone="lux"
        />
      </div>
    </section>
  );
}

function VerticalCard({ eyebrow, title, body, stats, cta, onClick, label, tone }) {
  const [hover, setHover] = useStateL(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        position: "relative", padding: 36, cursor: "pointer",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
        border: hover ? "1px solid rgba(230,198,135,0.4)" : "1px solid var(--line-2)",
        borderRadius: 0,
        transition: "all .35s",
        backdropFilter: "blur(20px)",
      }}>
      <ImgSlot label={label} tone={tone === "car" ? "car" : ""} height={260} style={{ marginBottom: 32 }} />
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.42em", color: "var(--gold)" }}>{eyebrow}</div>
      <h3 className="display" style={{ fontSize: 38, margin: "14px 0 18px", lineHeight: 1.1 }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, margin: 0, maxWidth: 480 }}>{body}</p>
      <div style={{ display: "flex", gap: 36, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
        {stats.map(([n, l]) => (
          <div key={l}>
            <div className="display gold" style={{ fontSize: 24 }}>{n}</div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 32, display: "inline-flex", alignItems: "center", gap: 14,
        color: hover ? "var(--gold)" : "var(--text)",
        transition: "all .25s",
      }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>{cta}</span>
        <span style={{ transform: hover ? "translateX(8px)" : "none", transition: "transform .25s" }}><Icon.Arrow /></span>
      </div>
    </div>
  );
}

function ConciergeBand() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "64px 24px 90px" : "100px 6vw 120px", background: "linear-gradient(180deg, #0B0B0C 0%, #14110b 100%)", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <SectionEyebrow index="04" label="One Line" />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <span style={{ width: 1, height: 0 }} />
        </div>
        <h2 className="display" style={{ fontSize: isMobile ? "clamp(32px, 8vw, 52px)" : "clamp(40px, 5vw, 72px)", margin: "28px 0 24px", lineHeight: 1.05 }}>
          A single concierge.<br />
          <span className="script gold-shimmer">A single number.</span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 580, margin: "0 auto", fontSize: 15, lineHeight: 1.8 }}>
          Whether you need a car at 2am, a villa for sixteen on Friday, or both at once — the line below is answered by a human, in three languages, year-round.
        </p>
        <a href={`tel:${window.OUMIX_DATA.BRAND.phone.replace(/\s/g, "")}`} style={{
          display: "inline-flex", alignItems: "center", gap: 18,
          marginTop: 48,
          padding: "22px 40px",
          border: "1px solid var(--gold)",
          color: "var(--gold)",
        }}>
          <Icon.Phone size={20} />
          <span className="display" style={{ fontSize: 32, letterSpacing: "0.18em" }}>
            {window.OUMIX_DATA.BRAND.phoneDisplay}
          </span>
        </a>
        <div className="mono" style={{ marginTop: 18, fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)" }}>
          WHATSAPP · TELEPHONE · {window.OUMIX_DATA.BRAND.email.toUpperCase()}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Landing });
