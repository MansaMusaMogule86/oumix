// Catalog pages — cars + villas
const { useState: useStateC, useMemo: useMemoC } = React;
const useBreakpointC = () => useBreakpoint();

function CatalogHeader({ kind, count }) {
  const isCar = kind === "car";
  const { isMobile } = useBreakpointC();
  return (
    <header style={{
      paddingTop: isMobile ? 88 : 140, paddingBottom: isMobile ? 32 : 56,
      position: "relative", overflow: "hidden",
      background: isCar
        ? "linear-gradient(180deg, #07090c 0%, #0B0B0C 100%)"
        : "linear-gradient(180deg, #14100a 0%, #0B0B0C 100%)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 20px" : "0 6vw", position: "relative" }}>
        <SectionEyebrow index={isCar ? "01" : "02"} label={isCar ? "OUMIX · CAR" : "OUMIX · VILLAS"} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20, flexWrap: "wrap", gap: 16 }}>
          <h1 className="display" style={{ fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(48px, 6vw, 88px)", margin: 0, lineHeight: 1.12, fontWeight: 400, maxWidth: 800, paddingBottom: 8 }}>
            {isCar ? <>The Fleet,<br /><span className="script gold-shimmer" style={{ display: "inline-block", paddingBottom: "0.08em" }}>curated.</span></> : <>Villas of <span className="script gold-shimmer" style={{ display: "inline-block", paddingBottom: "0.08em" }}>Marrakech.</span></>}
          </h1>
          {!isMobile && <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase" }}>Showing</div>
            <div className="display" style={{ fontSize: 48, color: "var(--gold)", lineHeight: 1, marginTop: 6 }}>{String(count).padStart(2, "0")}</div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>
              {isCar ? "Vehicles available" : "Estates available"}
            </div>
          </div>}
        </div>
        <p style={{ color: "var(--muted)", fontSize: isMobile ? 14 : 15, lineHeight: 1.75, marginTop: isMobile ? 16 : 28, maxWidth: 640 }}>
          {isCar
            ? "Every vehicle is owned, serviced, and insured by the house. Tariffs include 200 km/day, full insurance, sanitised cabin, and unlimited concierge support. Delivery to RAK airport, riad, or villa gate is complimentary."
            : "Each estate is exclusive — never shared with another guest. Tariffs include daily housekeeping, breakfast on request, pool service, and a 24/7 villa manager. Chef, hammam, in-villa spa, and excursions arranged on demand."}
        </p>
      </div>
    </header>
  );
}

function BookingBar({ kind, state, setState }) {
  const isCar = kind === "car";
  const { isMobile } = useBreakpointC();
  const fields = isCar
    ? [
        { label: "Pick-up", value: state.pickup, key: "pickup", options: ["RAK Airport", "Gueliz Office", "Hivernage Hotel", "Palmeraie Villa", "Custom Location"] },
        { label: "Drop-off", value: state.dropoff, key: "dropoff", options: ["Same as Pick-up", "RAK Airport", "Casablanca Airport", "Tangier", "Essaouira"] },
        { label: "Pick-up Date", value: state.startDate, key: "startDate", input: "date" },
        { label: "Return Date", value: state.endDate, key: "endDate", input: "date" },
      ]
    : [
        { label: "Destination", value: state.dest, key: "dest", options: ["Palmeraie", "Medina", "Amelkis", "Route de l'Ourika", "Atlas Foothills"] },
        { label: "Check-in", value: state.startDate, key: "startDate", input: "date" },
        { label: "Check-out", value: state.endDate, key: "endDate", input: "date" },
        { label: "Guests", value: state.guests, key: "guests", options: ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] },
      ];
  const fieldEl = (f, i, arr, borderRight, borderBottom) => (
    <div key={f.key} style={{ padding: isMobile ? "10px 12px" : "4px 18px", borderRight: borderRight ? "1px solid var(--line)" : 0, borderBottom: borderBottom ? "1px solid var(--line)" : 0 }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 6 }}>{f.label}</div>
      {f.input === "date" ? (
        <input type="date" value={f.value} onChange={e => setState({ ...state, [f.key]: e.target.value })} style={{ background: "transparent", border: 0, color: "var(--text)", fontFamily: "inherit", fontSize: isMobile ? 13 : 14, padding: 0, width: "100%", colorScheme: "dark" }} />
      ) : (
        <select value={f.value} onChange={e => setState({ ...state, [f.key]: e.target.value })} style={{ background: "transparent", border: 0, color: "var(--text)", fontFamily: "inherit", fontSize: isMobile ? 13 : 14, padding: 0, width: "100%", appearance: "none", cursor: "pointer" }}>
          {f.options.map(o => <option key={o} value={o} style={{ background: "#141416" }}>{o}</option>)}
        </select>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ padding: "12px 20px 0", position: "relative", zIndex: 5 }}>
        <div style={{ background: "rgba(20,20,22,0.95)", border: "1px solid rgba(230,198,135,0.22)", backdropFilter: "blur(20px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid transparent" }}>
            {fields.map((f, i) => fieldEl(f, i, fields, i % 2 === 0, i < fields.length - 2))}
          </div>
          <button style={{ background: "var(--gold)", color: "#0B0B0C", border: 0, width: "100%", padding: "13px 0", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            Search <Icon.Arrow />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: "-32px auto 0", padding: "0 6vw", position: "relative", zIndex: 5 }}>
      <div style={{
        background: "rgba(20,20,22,0.85)", border: "1px solid rgba(230,198,135,0.22)",
        backdropFilter: "blur(20px)", padding: "22px 28px",
        display: "grid",
        gridTemplateColumns: isCar ? "1.4fr 1.4fr 1.2fr 1.2fr auto" : "1.4fr 1.4fr 1.2fr 1.4fr auto",
        gap: 0, alignItems: "stretch",
      }}>
        {fields.map((f, i, arr) => fieldEl(f, i, arr, i < arr.length - 1, false))}
        <button style={{ background: "var(--gold)", color: "#0B0B0C", border: 0, padding: "0 36px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: 12 }}>
          Search <Icon.Arrow />
        </button>
      </div>
    </div>
  );
}

function FilterBar({ kind, filters, setFilters, sortBy, setSortBy }) {
  const isCar = kind === "car";
  const { isMobile } = useBreakpointC();
  const cats = isCar
    ? ["All", "Economy", "Premium", "Luxury", "Performance", "SUV", "4x4", "Electric", "VIP Van"]
    : ["All", "Palmeraie", "Medina", "Amelkis", "Atlas", "Ourika"];
  return (
    <div style={{
      maxWidth: 1400, margin: isMobile ? "16px auto 12px" : "48px auto 32px",
      padding: isMobile ? "0 20px" : "0 6vw",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 16, flexWrap: isMobile ? "nowrap" : "wrap",
      }}>
        <div style={{
          display: "flex", gap: 8, flexWrap: "nowrap",
          overflowX: "auto", WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", paddingBottom: 2, flex: 1,
        }}>
          {cats.map(c => {
            const active = filters.cat === c;
            return (
              <button key={c} onClick={() => setFilters({ ...filters, cat: c })} style={{
                flexShrink: 0,
                background: active ? "rgba(230,198,135,0.12)" : "transparent",
                border: active ? "1px solid var(--gold)" : "1px solid var(--line-2)",
                color: active ? "var(--gold)" : "var(--muted)",
                padding: isMobile ? "8px 14px" : "10px 18px",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                transition: "all .2s", cursor: "pointer",
              }}>{c}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {!isMobile && <span className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase" }}>Sort</span>}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            background: "transparent", color: "var(--text)", border: "1px solid var(--line-2)",
            padding: isMobile ? "8px 10px" : "10px 14px", fontFamily: "inherit",
            fontSize: isMobile ? 11 : 12, letterSpacing: "0.18em",
            textTransform: "uppercase", appearance: "none", cursor: "pointer",
          }}>
            <option value="featured" style={{ background: "#141416" }}>Featured</option>
            <option value="priceAsc" style={{ background: "#141416" }}>Price ↑</option>
            <option value="priceDesc" style={{ background: "#141416" }}>Price ↓</option>
            <option value="newest" style={{ background: "#141416" }}>Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ——— CAR CARD ———
function CarCard({ car, go }) {
  const [hover, setHover] = useStateC(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => go({ page: "detail-car", id: car.id })}
      style={{
        position: "relative", cursor: "pointer",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: hover ? "1px solid rgba(230,198,135,0.4)" : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        transition: "all .3s",
        display: "flex", flexDirection: "column",
      }}>
      {/* Tag */}
      <div style={{
        position: "absolute", top: 18, left: 18, zIndex: 2,
        padding: "6px 12px",
        background: "rgba(0,0,0,0.5)", border: "1px solid rgba(230,198,135,0.3)",
        color: "var(--gold)", fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase",
      }} className="mono">{car.tag}</div>
      {/* Save */}
      <button onClick={(e) => e.stopPropagation()} style={{
        position: "absolute", top: 14, right: 14, zIndex: 2,
        width: 36, height: 36, border: "1px solid var(--line-2)", background: "rgba(0,0,0,0.5)",
        color: "var(--muted)", display: "grid", placeItems: "center",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>
      </button>
      <ImgSlot tone="car" label={`${car.name.toLowerCase()} — 3/4 front`} height={220} style={{
        transition: "transform .5s",
        transform: hover ? "scale(1.03)" : "scale(1)",
      }} />
      <div style={{ padding: "24px 24px 22px" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{car.category}</div>
        <h3 className="display" style={{ fontSize: 22, margin: "8px 0 0", lineHeight: 1.2 }}>{car.name}</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: "10px 0 18px", minHeight: 40 }}>{car.short}</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <Spec icon={<Icon.Guest size={14}/>} label={`${car.seats} seats`} />
          <Spec icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3v18M5 8h14M5 16h14"/></svg>} label={car.transmission} />
          <Spec icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>} label={car.power} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 22 }}>
          <div>
            <div className="display" style={{ fontSize: 26, lineHeight: 1 }}>
              <span style={{ color: "var(--gold)" }}>{car.currency}{car.priceDay}</span>
            </div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginTop: 2 }}>per day · all-in</div>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: hover ? "var(--gold)" : "var(--text)", transition: "color .2s",
          }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase" }}>Reserve</span>
            <Icon.Arrow size={14} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ——— VILLA CARD ———
function VillaCard({ villa, go }) {
  const [hover, setHover] = useStateC(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => go({ page: "detail-villa", id: villa.id })}
      style={{
        position: "relative", cursor: "pointer",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: hover ? "1px solid rgba(230,198,135,0.4)" : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        transition: "all .3s",
      }}>
      <div style={{ position: "relative" }}>
        <ImgSlot label={`${villa.name.toLowerCase()} — pool, twilight`} height={260} style={{
          transition: "transform .5s", transform: hover ? "scale(1.03)" : "scale(1)",
        }} />
        <div style={{
          position: "absolute", top: 18, left: 18,
          padding: "6px 12px",
          background: "rgba(0,0,0,0.5)", border: "1px solid rgba(230,198,135,0.3)",
          color: "var(--gold)", fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase",
        }} className="mono">{villa.tag}</div>
        <div style={{
          position: "absolute", bottom: 18, left: 18,
          padding: "6px 12px",
          background: "rgba(11,11,12,0.78)", border: "1px solid rgba(230,198,135,0.18)",
        }} className="mono">
          <span style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--gold)", textTransform: "uppercase" }}>{villa.style}</span>
        </div>
      </div>
      <div style={{ padding: "24px 24px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{villa.area}</div>
          <div style={{ display: "flex", gap: 2, color: "var(--gold)" }}>
            {[0,1,2,3,4].map(i => <Icon.Star key={i} size={11} />)}
          </div>
        </div>
        <h3 className="display" style={{ fontSize: 26, margin: "8px 0 0", lineHeight: 1.15 }}>{villa.name}</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, margin: "10px 0 18px", minHeight: 42 }}>{villa.short}</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <Spec icon={<Icon.Guest size={14}/>} label={`${villa.guests} guests`} />
          <Spec icon={<Icon.Bed size={14}/>} label={`${villa.bedrooms} bedrooms`} />
          <Spec icon={<Icon.Pool size={14}/>} label="Private pool" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 22 }}>
          <div>
            <div className="display" style={{ fontSize: 26, lineHeight: 1 }}>
              <span style={{ color: "var(--gold)" }}>{villa.currency}{villa.priceNight.toLocaleString()}</span>
            </div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginTop: 2 }}>per night · all-in</div>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: hover ? "var(--gold)" : "var(--text)", transition: "color .2s",
          }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase" }}>Inquire</span>
            <Icon.Arrow size={14} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 11 }}>
      <span style={{ color: "var(--gold)" }}>{icon}</span>
      <span style={{ letterSpacing: "0.06em" }}>{label}</span>
    </div>
  );
}

function CarCatalog({ go }) {
  const { CARS } = window.OUMIX_DATA;
  const { isMobile, isTablet } = useBreakpointC();
  const [state, setState] = useStateC({
    pickup: "RAK Airport", dropoff: "Same as Pick-up",
    startDate: "2026-06-12", endDate: "2026-06-18",
  });
  const [filters, setFilters] = useStateC({ cat: "All" });
  const [sortBy, setSortBy] = useStateC("featured");
  const list = useMemoC(() => {
    let l = [...CARS];
    if (filters.cat !== "All") {
      l = l.filter(c => c.category.toLowerCase().includes(filters.cat.toLowerCase()) || c.tag === filters.cat);
    }
    if (sortBy === "priceAsc") l.sort((a,b) => a.priceDay - b.priceDay);
    if (sortBy === "priceDesc") l.sort((a,b) => b.priceDay - a.priceDay);
    if (sortBy === "newest") l.sort((a,b) => b.year - a.year);
    return l;
  }, [filters, sortBy, CARS]);
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  return (
    <div style={{ paddingBottom: 100 }}>
      <CatalogHeader kind="car" count={list.length} />
      <BookingBar kind="car" state={state} setState={setState} />
      <FilterBar kind="car" filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 20px" : "0 6vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 16 : 24 }}>
          {list.map((c, i) => <div key={c.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}><CarCard car={c} go={go} /></div>)}
        </div>
      </div>
    </div>
  );
}

function VillaCatalog({ go }) {
  const { VILLAS } = window.OUMIX_DATA;
  const { isMobile, isTablet } = useBreakpointC();
  const [state, setState] = useStateC({
    dest: "Palmeraie", startDate: "2026-06-12", endDate: "2026-06-18", guests: "6 Guests",
  });
  const [filters, setFilters] = useStateC({ cat: "All" });
  const [sortBy, setSortBy] = useStateC("featured");
  const list = useMemoC(() => {
    let l = [...VILLAS];
    if (filters.cat !== "All") {
      l = l.filter(v => v.area.toLowerCase().includes(filters.cat.toLowerCase()));
    }
    if (sortBy === "priceAsc") l.sort((a,b) => a.priceNight - b.priceNight);
    if (sortBy === "priceDesc") l.sort((a,b) => b.priceNight - a.priceNight);
    return l;
  }, [filters, sortBy, VILLAS]);
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  return (
    <div style={{ paddingBottom: 100 }}>
      <CatalogHeader kind="villa" count={list.length} />
      <BookingBar kind="villa" state={state} setState={setState} />
      <FilterBar kind="villa" filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 20px" : "0 6vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 16 : 24 }}>
          {list.map((v, i) => <div key={v.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}><VillaCard villa={v} go={go} /></div>)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CarCatalog, VillaCatalog });
