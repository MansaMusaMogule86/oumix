// Main app + router + simple About/Contact pages
const { useState: useStateA, useEffect: useEffectA } = React;
const useIsMobileA = () => useIsMobile();

function About() {
  const isMobile = useIsMobileA();
  return (
    <div style={{ paddingTop: isMobile ? 88 : 140, paddingBottom: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 6vw" }}>
        <SectionEyebrow index="00" label="The House" />
        <h1 className="display" style={{ fontSize: isMobile ? "clamp(32px, 9vw, 56px)" : "clamp(48px, 6vw, 88px)", margin: "28px 0 0", lineHeight: 1.05, maxWidth: 900 }}>
          A single signature for <span className="script gold-shimmer">two of Marrakech's</span> most exacting verticals.
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: isMobile ? 36 : 80, marginTop: isMobile ? 40 : 80 }}>
          <div>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85, marginTop: 0 }}>
              Oumix Marrakech began as a quiet idea among friends who knew the city well — that the best parts of a stay should never feel logistical. A car when you land. A villa with the keys already in the door. A number you can call at 2am when the world has decided to misbehave.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85 }}>
              Today the house has two visible faces under one signature, <span style={{ color: "var(--gold)" }}>OUMIX LUX</span>. <span style={{ color: "var(--gold)" }}>OUMIX CAR</span> answers the question of mobility — from a discreet airport pick-up to a four-vehicle desert convoy. <span style={{ color: "var(--gold)" }}>OUMIX VILLAS</span> answers the question of refuge — a riad behind a medina door; an estate in the Palmeraie with staff already in place.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85 }}>
              Behind both, the same telephone, answered by the same small team, in French, English, and Arabic, year-round.
            </p>
          </div>
          <div>
            <ImgSlot label="founders portrait — gueliz garage" height={isMobile ? 240 : 420} />
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginTop: 14, textAlign: "center" }}>
              The team · Gueliz HQ · est. 2018
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "20px 16px" : 24, marginTop: isMobile ? 52 : 100, paddingTop: isMobile ? 36 : 60, borderTop: "1px solid var(--line)" }}>
          {[
            ["Owned", "Every vehicle and every contract is held by the house. Nothing sub-let."],
            ["Insured", "Comprehensive cover is part of the tariff, not a line-item."],
            ["Discreet", "Privacy is the rule. We are difficult to find, and proud of it."],
            ["Permanent", "A single concierge line, in three languages, around the clock."],
          ].map(([t, b]) => (
            <div key={t}>
              <div className="display gold" style={{ fontSize: isMobile ? 22 : 28 }}>{t}</div>
              <div className="hairline" style={{ width: 40, margin: "14px 0" }} />
              <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { BRAND } = window.OUMIX_DATA;
  const isMobile = useIsMobileA();
  const [form, setForm] = useStateA({ name: "", email: "", service: "Both", dates: "", message: "" });
  const [sent, setSent] = useStateA(false);
  return (
    <div style={{ paddingTop: isMobile ? 88 : 140, paddingBottom: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 6vw" }}>
        <SectionEyebrow index="00" label="Get in Touch" />
        <h1 className="display" style={{ fontSize: isMobile ? "clamp(32px, 9vw, 56px)" : "clamp(48px, 6vw, 88px)", margin: "28px 0 24px", lineHeight: 1.05 }}>
          One concierge.<br /><span className="script gold-shimmer">One single line.</span>
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85, maxWidth: 640, margin: 0 }}>
          Whether you need a car at 2am, a villa for sixteen this weekend, or both at once — speak to a human, in three languages, year-round.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: isMobile ? 36 : 64, marginTop: isMobile ? 40 : 80 }}>
          {/* Left — channels */}
          <div>
            <div style={{ padding: 32, border: "1px solid rgba(230,198,135,0.28)", background: "linear-gradient(180deg, rgba(255,255,255,0.04), transparent)" }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 14 }}>Telephone · 24/7</div>
              <a href={`tel:${BRAND.phone.replace(/\s/g,"")}`} className="display gold" style={{ fontSize: isMobile ? 22 : 32, letterSpacing: "0.18em", display: "block" }}>{BRAND.phoneDisplay}</a>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginTop: 14 }}>FR · EN · AR</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <ChannelCard label="WhatsApp" value="+212 6 70 09 06 70" />
              <ChannelCard label="Email" value={BRAND.email} />
              <ChannelCard label="Office" value="Gueliz, Marrakech" />
              <ChannelCard label="Hours" value="24/7 · 365" />
            </div>

            <div style={{ marginTop: 32, padding: 24, border: "1px solid var(--line-2)" }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 14 }}>Visit us</div>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                Oumix Marrakech<br/>
                Avenue Mohammed V<br/>
                Gueliz, 40000 Marrakech<br/>
                Kingdom of Morocco
              </div>
              <ImgSlot label="map — gueliz, marrakech" height={160} style={{ marginTop: 18 }} />
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ padding: 36, border: "1px solid rgba(230,198,135,0.22)", background: "rgba(20,20,22,0.5)", backdropFilter: "blur(20px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ width: 60, height: 60, margin: "0 auto 24px", border: "1px solid var(--gold)", borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--gold)" }}>
                  <Icon.Check size={24}/>
                </div>
                <h3 className="display" style={{ fontSize: 32, margin: "0 0 12px" }}>Message received.</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: "0 auto" }}>
                  Karim, your concierge, will reply within 10 minutes. For anything urgent, call the line above.
                </p>
                <button type="button" onClick={() => { setSent(false); setForm({ name: "", email: "", service: "Both", dates: "", message: "" }); }} style={{
                  marginTop: 28, background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)",
                  padding: "12px 22px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                }} className="mono">Send another</button>
              </div>
            ) : (
              <>
                <Field label="Your Name" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="As it appears on your passport" />
                <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="you@example.com" type="email" />
                <div style={{ marginTop: 22 }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>Service</div>
                  <div style={{ display: "flex", gap: 0, border: "1px solid var(--line-2)" }}>
                    {["Car","Villa","Both","Other"].map((s, i, arr) => (
                      <button type="button" key={s} onClick={() => setForm({...form, service: s})} style={{
                        flex: 1, background: form.service === s ? "rgba(230,198,135,0.12)" : "transparent",
                        color: form.service === s ? "var(--gold)" : "var(--muted)",
                        border: 0, borderRight: i < arr.length-1 ? "1px solid var(--line-2)" : 0,
                        padding: "14px 0", fontFamily: "inherit",
                        fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <Field label="Dates (approx.)" value={form.dates} onChange={v => setForm({...form, dates: v})} placeholder="12 → 19 June 2026" />
                <div style={{ marginTop: 22 }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>Tell us about your stay</div>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Group size, preferences, anything we should know…" rows={5} style={{
                    background: "transparent", border: "1px solid var(--line-2)",
                    color: "var(--text)", padding: 14, width: "100%", fontFamily: "inherit",
                    fontSize: 14, resize: "vertical",
                  }} />
                </div>
                <button type="submit" style={{
                  width: "100%", marginTop: 24,
                  background: "var(--gold)", color: "#0B0B0C",
                  border: 0, padding: 18,
                  fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
                }}>Send to Concierge <Icon.Arrow /></button>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.24em", color: "var(--muted-2)", textTransform: "uppercase", textAlign: "center", marginTop: 14 }}>
                  Replies within 10 minutes · FR · EN · AR
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ label, value }) {
  return (
    <div style={{ padding: 20, border: "1px solid var(--line-2)" }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 14, marginTop: 8, color: "var(--text)" }}>{value}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        background: "transparent", border: 0, borderBottom: "1px solid var(--line-2)",
        color: "var(--text)", padding: "10px 0", width: "100%", fontFamily: "inherit", fontSize: 15,
        outline: "none",
      }} onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
         onBlur={e => e.target.style.borderBottomColor = "var(--line-2)"} />
    </div>
  );
}

// ——— Tweaks panel
function TweaksApp({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent" />
      <TweakColor label="Gold" value={tweaks.gold}
        options={["#E6C687", "#D4AF6A", "#B8956A", "#F2D998", "#C9A86A"]}
        onChange={(v) => setTweak("gold", v)} />
      <TweakSection label="Background" />
      <TweakRadio label="Tone" value={tweaks.bg}
        options={["obsidian", "deep warm"]}
        onChange={(v) => setTweak("bg", v)} />
      <TweakSection label="Typography" />
      <TweakRadio label="Display" value={tweaks.font}
        options={["italiana", "cormorant"]}
        onChange={(v) => setTweak("font", v)} />
      <TweakSection label="Hero" />
      <TweakRadio label="Layout" value={tweaks.hero}
        options={["split", "stacked"]}
        onChange={(v) => setTweak("hero", v)} />
      <TweakSection label="Cards" />
      <TweakRadio label="Style" value={tweaks.cards}
        options={["glass", "outline"]}
        onChange={(v) => setTweak("cards", v)} />
    </TweaksPanel>
  );
}

// ——— App router
function App() {
  const [route, setRoute] = useStateA({ page: "landing", id: null });
  const tweaksDefaults = /*EDITMODE-BEGIN*/{
    "gold": "#E6C687",
    "bg": "obsidian",
    "font": "italiana",
    "hero": "split",
    "cards": "glass"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(tweaksDefaults);

  // apply tweaks to CSS vars
  useEffectA(() => {
    document.documentElement.style.setProperty("--gold", tweaks.gold);
    if (tweaks.bg === "deep warm") {
      document.documentElement.style.setProperty("--bg", "#0c0907");
      document.documentElement.style.setProperty("--bg-2", "#100b08");
      document.body.style.background = "#0c0907";
    } else {
      document.documentElement.style.setProperty("--bg", "#0B0B0C");
      document.documentElement.style.setProperty("--bg-2", "#0F0F11");
      document.body.style.background = "#0B0B0C";
    }
    const displayFont = tweaks.font === "cormorant"
      ? "'Cormorant Garamond', serif"
      : "'Italiana', 'Cormorant Garamond', serif";
    document.querySelectorAll(".display").forEach(el => {
      el.style.fontFamily = displayFont;
    });
  }, [tweaks.gold, tweaks.bg, tweaks.font]);

  const go = (next) => {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div data-screen-label={
      route.page === "landing" ? "Landing — Dual Gate"
      : route.page === "cars" ? "Catalog — Fleet"
      : route.page === "villas" ? "Catalog — Villas"
      : route.page === "detail-car" ? "Detail — Vehicle"
      : route.page === "detail-villa" ? "Detail — Villa"
      : route.page === "about" ? "About"
      : route.page === "contact" ? "Contact"
      : "Page"
    }>
      <Navbar page={route.page} go={go} />
      <main key={route.page + (route.id || "")}>
        {route.page === "landing" && <Landing go={go} tweaks={tweaks} />}
        {route.page === "cars" && <CarCatalog go={go} />}
        {route.page === "villas" && <VillaCatalog go={go} />}
        {route.page === "detail-car" && <ListingDetail kind="car" id={route.id} go={go} />}
        {route.page === "detail-villa" && <ListingDetail kind="villa" id={route.id} go={go} />}
        {route.page === "about" && <About />}
        {route.page === "contact" && <Contact />}
      </main>
      <ConciergeFooter />
      <TweaksApp tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
