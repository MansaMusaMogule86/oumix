// Listing detail page — works for both cars and villas
const { useState: useStateD, useMemo: useMemoD } = React;
const useIsMobileD = () => useIsMobile();

function ListingDetail({ kind, id, go }) {
  const data = kind === "car"
    ? window.OUMIX_DATA.CARS.find(c => c.id === id)
    : window.OUMIX_DATA.VILLAS.find(v => v.id === id);
  const isCar = kind === "car";
  const isMobile = useIsMobileD();
  const [activeImg, setActiveImg] = useStateD(0);
  const [tab, setTab] = useStateD("overview");
  const [booking, setBooking] = useStateD({
    startDate: "2026-06-12", endDate: "2026-06-18",
    pickup: "RAK Airport", dropoff: "Same as Pick-up",
    guests: 4, extras: { chauffeur: false, childSeat: false, gpsRoaming: true, fullInsurance: true, chef: false, hammam: false, airportTransfer: true },
  });

  if (!data) return null;

  const nights = useMemoD(() => {
    const a = new Date(booking.startDate), b = new Date(booking.endDate);
    return Math.max(1, Math.round((b - a) / (1000*60*60*24)));
  }, [booking.startDate, booking.endDate]);
  const basePrice = isCar ? data.priceDay : data.priceNight;
  const extraPrice = isCar
    ? (booking.extras.chauffeur ? 120*nights : 0) + (booking.extras.childSeat ? 8*nights : 0) + (booking.extras.gpsRoaming ? 0 : 0) + (booking.extras.fullInsurance ? 30*nights : 0)
    : (booking.extras.chef ? 240*nights : 0) + (booking.extras.hammam ? 180 : 0) + (booking.extras.airportTransfer ? 90 : 0);
  const subtotal = basePrice * nights;
  const total = subtotal + extraPrice;

  const galleryLabels = isCar
    ? ["3/4 front, exterior", "interior — driver's seat", "rear 3/4", "dashboard detail", "wheel detail"]
    : ["pool by twilight", "primary suite", "courtyard", "kitchen & dining", "rooftop terrace"];

  const amenitiesCar = [
    "Burmester / Bowers audio", "Adaptive cruise", "Heated & ventilated seats", "Apple CarPlay & Android Auto",
    "Panoramic roof", "4-zone climate", "Heads-up display", "Soft-close doors",
    "Garmin GPS roaming", "Full insurance (CDW + theft + tyres)", "200 km/day included", "Sanitised cabin",
  ];
  const amenitiesVilla = [
    "Private heated pool", "Daily housekeeping", "Breakfast on request", "Full kitchen",
    "Air conditioning · all rooms", "Wi-Fi 1 Gbps", "Smart TVs / Apple TV", "Marshall sound system",
    "Hammam · in select estates", "Outdoor cinema · seasonal", "Yoga / fitness on request", "Babysitting on request",
  ];

  return (
    <div style={{ paddingTop: isMobile ? 64 : 76, paddingBottom: 100 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "20px 20px 0" : "32px 6vw 0" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", display: "flex", gap: 14, alignItems: "center" }}>
          <button onClick={() => go({ page: "landing" })} style={{ background: "none", border: 0, color: "var(--muted)", padding: 0, cursor: "pointer", textTransform: "uppercase", letterSpacing: "inherit", fontSize: "inherit", fontFamily: "inherit" }}>Oumix</button>
          <span>/</span>
          <button onClick={() => go({ page: isCar ? "cars" : "villas" })} style={{ background: "none", border: 0, color: "var(--muted)", padding: 0, cursor: "pointer", textTransform: "uppercase", letterSpacing: "inherit", fontSize: "inherit", fontFamily: "inherit" }}>{isCar ? "Fleet" : "Villas"}</button>
          <span>/</span>
          <span style={{ color: "var(--gold)" }}>{data.name}</span>
        </div>
      </div>

      {/* Hero gallery */}
      <div style={{ maxWidth: 1400, margin: isMobile ? "16px auto 0" : "32px auto 0", padding: isMobile ? "0 20px" : "0 6vw" }}>
        {isMobile ? (
          <div style={{ position: "relative" }}>
            <ImgSlot tone={isCar ? "car" : ""} label={galleryLabels[0]} height={260} />
            <button style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(11,11,12,0.85)", border: "1px solid var(--gold)", color: "var(--gold)", padding: "9px 14px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }} className="mono">+ 24 Photos</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gridTemplateRows: "1fr 1fr", gap: 12, height: 540 }}>
            <ImgSlot tone={isCar ? "car" : ""} label={galleryLabels[0]} height="100%" style={{ gridRow: "1 / 3" }} />
            <ImgSlot tone={isCar ? "car" : ""} label={galleryLabels[1]} height="100%" />
            <div style={{ position: "relative" }}>
              <ImgSlot tone={isCar ? "car" : ""} label={galleryLabels[2]} height="100%" />
              <button style={{ position: "absolute", bottom: 18, right: 18, background: "rgba(11,11,12,0.85)", border: "1px solid var(--gold)", color: "var(--gold)", padding: "12px 18px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }} className="mono">+ 24 Photos</button>
            </div>
          </div>
        )}
      </div>

      {/* Title block */}
      <div style={{ maxWidth: 1400, margin: isMobile ? "20px auto 0" : "40px auto 0", padding: isMobile ? "0 20px" : "0 6vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
              <span className="mono" style={{ padding: "5px 10px", border: "1px solid rgba(230,198,135,0.3)", color: "var(--gold)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase" }}>{data.tag}</span>
              <span className="mono" style={{ padding: "5px 10px", border: "1px solid var(--line-2)", color: "var(--muted)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase" }}>{isCar ? data.category : data.style}</span>
              {!isCar && <span className="mono" style={{ padding: "5px 10px", border: "1px solid var(--line-2)", color: "var(--muted)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase" }}>{data.area}</span>}
            </div>
            <h1 className="display" style={{ fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(40px, 5vw, 72px)", margin: 0, lineHeight: 1.05, maxWidth: 720 }}>
              {data.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 18, color: "var(--muted)", fontSize: 13 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex", gap: 1, color: "var(--gold)" }}>{[0,1,2,3,4].map(i => <Icon.Star key={i} size={12} />)}</span>
                <span style={{ color: "var(--text)" }}>4.97</span>
                <span>· 128 reviews</span>
              </span>
              <span>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon.Pin size={14} /> Marrakech, Morocco</span>
              <span>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7BC57B" }} />
                Available {booking.startDate} → {booking.endDate}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={iconButtonStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 4h16v16H4z M4 9h16 M9 4v16"/></svg>
            </button>
            <button style={iconButtonStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/></svg>
            </button>
            <button style={iconButtonStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v13M7 8l5-5 5 5"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div style={{ maxWidth: 1400, margin: isMobile ? "28px auto 0" : "56px auto 0", padding: isMobile ? "0 20px" : "0 6vw", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr", gap: isMobile ? 36 : 64, alignItems: "start" }}>
        {/* LEFT */}
        <div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--line-2)", marginBottom: 36, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {[
              ["overview", "Overview"],
              [isCar ? "specs" : "rooms", isCar ? "Specifications" : "Rooms & Spaces"],
              ["amenities", isCar ? "Equipment" : "Amenities"],
              ["policy", "Policy"],
              ["reviews", "Reviews"],
            ].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: "none", border: 0, padding: "16px 22px 16px 0",
                marginRight: 30,
                color: tab === k ? "var(--gold)" : "var(--muted)",
                fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 500,
                borderBottom: tab === k ? "1px solid var(--gold)" : "1px solid transparent",
                marginBottom: -1,
                transition: "all .2s",
              }} className="mono">{l}</button>
            ))}
          </div>

          {tab === "overview" && <Overview data={data} isCar={isCar} />}
          {tab === "specs" && isCar && <CarSpecs car={data} />}
          {tab === "rooms" && !isCar && <VillaRooms villa={data} />}
          {tab === "amenities" && <Amenities items={isCar ? amenitiesCar : amenitiesVilla} />}
          {tab === "policy" && <Policy isCar={isCar} />}
          {tab === "reviews" && <Reviews />}
        </div>

        {/* RIGHT — Booking card */}
        <aside style={{ position: isMobile ? "static" : "sticky", top: 100 }}>
          <div style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(230,198,135,0.28)",
            backdropFilter: "blur(20px)",
            padding: 28,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <div>
                <span className="display gold" style={{ fontSize: 36 }}>{data.currency}{basePrice}</span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--muted)", textTransform: "uppercase", marginLeft: 6 }}>/ {isCar ? "day" : "night"}</span>
              </div>
              <div style={{ display: "flex", gap: 4, color: "var(--gold)" }}>
                {[0,1,2,3,4].map(i => <Icon.Star key={i} size={11}/>)}
                <span style={{ color: "var(--text)", fontSize: 11, marginLeft: 6 }}>4.97</span>
              </div>
            </div>
            <div className="hairline" style={{ margin: "20px 0" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--line-2)" }}>
              <DateInput label={isCar ? "Pick-up" : "Check-in"} value={booking.startDate} onChange={v => setBooking({...booking, startDate: v})} border />
              <DateInput label={isCar ? "Return" : "Check-out"} value={booking.endDate} onChange={v => setBooking({...booking, endDate: v})} />
              {isCar ? (
                <>
                  <SelectInput label="Pick-up Location" value={booking.pickup} onChange={v => setBooking({...booking, pickup: v})} options={["RAK Airport","Gueliz Office","Hivernage","Palmeraie","Custom"]} border top />
                  <SelectInput label="Drop-off Location" value={booking.dropoff} onChange={v => setBooking({...booking, dropoff: v})} options={["Same as Pick-up","RAK Airport","Casablanca","Tangier","Essaouira"]} top />
                </>
              ) : (
                <SelectInput label="Guests" value={booking.guests + " Guests"} onChange={v => setBooking({...booking, guests: parseInt(v)})} options={[2,4,6,8,10,12,14,16].map(n => n + " Guests")} top span={2} />
              )}
            </div>

            {/* Extras */}
            <div style={{ marginTop: 24 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 14 }}>Add Extras</div>
              {(isCar
                ? [["chauffeur", "Private chauffeur", "+€120/day"], ["childSeat", "Child seat", "+€8/day"], ["fullInsurance", "Premium insurance", "+€30/day"], ["gpsRoaming", "GPS roaming", "Included"]]
                : [["chef", "Private chef", "+€240/day"], ["hammam", "Hammam ritual (2pers)", "+€180"], ["airportTransfer", "Airport transfer", "+€90"]]
              ).map(([key, label, price]) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", cursor: "pointer", borderBottom: "1px solid var(--line)" }}>
                  <input type="checkbox" checked={booking.extras[key]} onChange={e => setBooking({...booking, extras: {...booking.extras, [key]: e.target.checked}})}
                    style={{ accentColor: "var(--gold)", width: 16, height: 16 }} />
                  <span style={{ fontSize: 13, flex: 1 }}>{label}</span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase" }}>{price}</span>
                </label>
              ))}
            </div>

            {/* Totals */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <Row k={`${data.currency}${basePrice} × ${nights} ${isCar ? "days" : "nights"}`} v={`${data.currency}${subtotal.toLocaleString()}`} muted />
              {extraPrice > 0 && <Row k="Extras" v={`${data.currency}${extraPrice.toLocaleString()}`} muted />}
              <Row k="Service & taxes" v="Included" muted />
              <div className="hairline" style={{ margin: "8px 0" }} />
              <Row k="Total" v={`${data.currency}${total.toLocaleString()}`} bold />
            </div>

            <button style={{
              width: "100%", marginTop: 24,
              background: "var(--gold)", color: "#0B0B0C",
              border: 0, padding: "18px",
              fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              {isCar ? "Reserve Vehicle" : "Request Stay"} <Icon.Arrow />
            </button>
            <button style={{
              width: "100%", marginTop: 12,
              background: "transparent", color: "var(--text)",
              border: "1px solid var(--line-2)", padding: "16px",
              fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              <Icon.Phone /> Speak to a concierge
            </button>
            <div className="mono" style={{ fontSize: 9, letterSpacing: "0.24em", color: "var(--muted-2)", textTransform: "uppercase", textAlign: "center", marginTop: 14 }}>
              No charge until confirmation · Free cancellation 48h
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 20, border: "1px solid var(--line-2)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #E6C687, #8A6F3F)", color: "#0B0B0C", display: "grid", placeItems: "center", fontFamily: "Italiana, serif", fontSize: 18 }}>K</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>Karim · Your concierge</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>Replies within 10 min · FR · EN · AR</div>
            </div>
            <button style={{ background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)", padding: "8px 12px", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase" }} className="mono">Chat</button>
          </div>
        </aside>
      </div>

      {/* Related */}
      <RelatedSection kind={kind} excludeId={data.id} go={go} />
    </div>
  );
}

function Row({ k, v, muted, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: bold ? 16 : 13, color: muted ? "var(--muted)" : "var(--text)", fontWeight: bold ? 500 : 300 }}>
      <span>{k}</span>
      <span style={{ color: bold ? "var(--gold)" : undefined }}>{v}</span>
    </div>
  );
}

function DateInput({ label, value, onChange, border, top }) {
  return (
    <label style={{ padding: 16, borderRight: border ? "1px solid var(--line-2)" : 0, borderTop: top ? "1px solid var(--line-2)" : 0 }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <input type="date" value={value} onChange={e => onChange(e.target.value)} style={{
        background: "transparent", color: "var(--text)", border: 0, padding: 0,
        fontFamily: "inherit", fontSize: 13, width: "100%", colorScheme: "dark",
      }}/>
    </label>
  );
}

function SelectInput({ label, value, onChange, options, border, top, span }) {
  return (
    <label style={{ padding: 16, borderRight: border ? "1px solid var(--line-2)" : 0, borderTop: top ? "1px solid var(--line-2)" : 0, gridColumn: span === 2 ? "span 2" : undefined }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        background: "transparent", color: "var(--text)", border: 0, padding: 0,
        fontFamily: "inherit", fontSize: 13, width: "100%", appearance: "none", cursor: "pointer",
      }}>
        {options.map(o => <option key={o} value={o} style={{ background: "#141416" }}>{o}</option>)}
      </select>
    </label>
  );
}

const iconButtonStyle = {
  width: 44, height: 44, border: "1px solid var(--line-2)", background: "transparent",
  color: "var(--muted)", display: "grid", placeItems: "center", cursor: "pointer",
};

function Overview({ data, isCar }) {
  return (
    <div className="fade">
      <h2 className="display" style={{ fontSize: 28, margin: "0 0 16px" }}>About this {isCar ? "vehicle" : "estate"}</h2>
      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.85, margin: 0 }}>
        {data.short} {isCar
          ? "Every Oumix vehicle is owned by the house, serviced on a 30-day cycle by the manufacturer's local representative, and inspected before every hand-over. Insurance is complimentary and comprehensive; a complete dossier of route suggestions and emergency contacts travels with the keys."
          : "The estate is presented with a full staff already in place — including a villa manager who lives a few minutes away. Breakfast is provided on request. Daily housekeeping is at a time of your choosing. Beyond the pool, your concierge can arrange a chef, a hammam, a yoga teacher, and excursions into the Atlas at short notice."}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 36, border: "1px solid var(--line-2)" }}>
        {(isCar
          ? [
              ["Year", data.year], ["Transmission", data.transmission], ["Power", data.power],
              ["Seats", data.seats], ["Colour", data.color], ["Fuel", "Premium 95"],
            ]
          : [
              ["Bedrooms", data.bedrooms], ["Bathrooms", data.baths], ["Sleeps", data.guests],
              ["Area", data.area], ["Style", data.style], ["Min stay", "3 nights"],
            ]
        ).map(([k, v], i) => (
          <div key={k} style={{
            padding: "18px 20px",
            borderRight: (i + 1) % 3 ? "1px solid var(--line-2)" : 0,
            borderBottom: i < 3 ? "1px solid var(--line-2)" : 0,
          }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{k}</div>
            <div style={{ fontSize: 16, marginTop: 6, color: "var(--text)" }}>{v}</div>
          </div>
        ))}
      </div>

      <h3 className="display" style={{ fontSize: 24, margin: "44px 0 18px" }}>What's included</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {(isCar ? window.OUMIX_DATA.FEATURES_CAR : window.OUMIX_DATA.FEATURES_LUX).map(f => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text)", fontSize: 14 }}>
            <span style={{ color: "var(--gold)" }}><Icon.Check size={14}/></span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarSpecs({ car }) {
  const specs = [
    ["Engine", car.power.replace(" hp", " hp · Twin Turbo")],
    ["0–100 km/h", "5.4 s"],
    ["Top Speed", "250 km/h"],
    ["Drivetrain", "AWD"],
    ["Transmission", car.transmission + " · 9-speed"],
    ["Fuel", "Premium 95 / Diesel"],
    ["Tank", "85 L"],
    ["Range", "780 km"],
    ["Length", "5.04 m"],
    ["Wheelbase", "3.06 m"],
    ["Boot", "725 L"],
    ["Tyres", "Pirelli P-Zero · all-season"],
  ];
  return (
    <div className="fade" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--line-2)" }}>
      {specs.map(([k, v], i) => (
        <div key={k} style={{
          padding: "18px 22px",
          borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : 0,
          borderBottom: i < specs.length - 2 ? "1px solid var(--line-2)" : 0,
          display: "flex", justifyContent: "space-between",
        }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase" }}>{k}</span>
          <span style={{ fontSize: 14, color: "var(--text)" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function VillaRooms({ villa }) {
  const rooms = [
    { name: "Primary Suite", area: "48 m²", details: "King bed · ensuite · private terrace" },
    { name: "Junior Suite (×2)", area: "32 m²", details: "Queen bed · ensuite · garden view" },
    { name: "Twin Room", area: "26 m²", details: "Two singles · shared bath" },
    { name: "Salon Marocain", area: "62 m²", details: "Banquettes · fireplace · live-edge table" },
    { name: "Kitchen", area: "38 m²", details: "Pro range · pastry station · pantry" },
    { name: "Pool & Garden", area: "1,200 m²", details: "Heated 22m pool · pavilion · loungers" },
    { name: "Rooftop Terrace", area: "180 m²", details: "Sunset bar · firepit · outdoor cinema" },
    { name: "Hammam", area: "18 m²", details: "Tadelakt · steam · cold plunge" },
  ];
  return (
    <div className="fade">
      {rooms.slice(0, villa.bedrooms + 3).map((r, i) => (
        <div key={r.name} style={{
          display: "grid", gridTemplateColumns: "1fr auto 1.4fr",
          gap: 24, padding: "18px 0",
          borderBottom: i < rooms.length - 1 ? "1px solid var(--line)" : 0,
          alignItems: "center",
        }}>
          <div style={{ fontSize: 16 }}>{r.name}</div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)" }}>{r.area}</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{r.details}</div>
        </div>
      ))}
    </div>
  );
}

function Amenities({ items }) {
  return (
    <div className="fade" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
      {items.map(it => (
        <div key={it} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
          <span style={{ color: "var(--gold)" }}><Icon.Check size={14}/></span>
          <span style={{ fontSize: 14, color: "var(--text)" }}>{it}</span>
        </div>
      ))}
    </div>
  );
}

function Policy({ isCar }) {
  const items = isCar
    ? [
        ["Booking", "No charge until confirmation. Card pre-authorisation 24h before pick-up."],
        ["Cancellation", "Free cancellation up to 48h before pick-up. After: 1-day rental held."],
        ["Insurance", "Comprehensive (CDW + theft + glass + tyres) included. Excess €1,000."],
        ["Drivers", "Minimum age 23 · 2 years' licence. Additional drivers free."],
        ["Mileage", "200 km/day included. €0.30 / km beyond."],
        ["Fuel", "Full to full. Refuel before drop-off or €25 service fee."],
        ["Borders", "Morocco only by default. Cross-border on request, with paperwork."],
    ]
    : [
        ["Booking", "30% deposit at confirmation. Balance 30 days before check-in."],
        ["Cancellation", "Full refund up to 60 days · 50% up to 30 days · non-refundable after."],
        ["Check-in", "Anytime from 16:00. Late arrivals accommodated — concierge meets you."],
        ["Check-out", "By 11:00. Late check-out available depending on bookings."],
        ["Events", "Permitted with prior agreement. Damage deposit applies."],
        ["Children", "Welcome. Cribs and pool fences on request."],
        ["Pets", "On request. Most estates accommodate well-behaved dogs."],
      ];
  return (
    <div className="fade">
      {items.map(([k, v], i) => (
        <div key={k} style={{
          display: "grid", gridTemplateColumns: "200px 1fr",
          gap: 24, padding: "18px 0",
          borderBottom: i < items.length - 1 ? "1px solid var(--line)" : 0,
          alignItems: "start",
        }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.26em", color: "var(--gold)", textTransform: "uppercase" }}>{k}</div>
          <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function Reviews() {
  const reviews = [
    { initials: "AM", name: "Alessandra M.", country: "Milan, IT", date: "Apr 2026", text: "Karim met us at the airport with two glasses of mint tea and the keys to the Range. By the time we reached the villa, our luggage was already in the rooms. Faultless." },
    { initials: "JD", name: "James D.", country: "London, UK", date: "Mar 2026", text: "We rented an S-Class for a Casa→Marrakech→Essaouira loop. The car was perfect; the line answered every question instantly; the price was honest." },
    { initials: "RC", name: "Rachel C.", country: "Paris, FR", date: "Feb 2026", text: "Villa Najma is the real thing — an estate, not a rental. The staff are exceptional; the chef cooked the best tagine we'd had in a decade. Will return." },
  ];
  return (
    <div className="fade">
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 4, color: "var(--gold)" }}>{[0,1,2,3,4].map(i => <Icon.Star key={i} size={18}/>)}</div>
        <div className="display" style={{ fontSize: 32 }}>4.97 <span style={{ color: "var(--muted)", fontSize: 14 }} className="mono">/ 128 verified reviews</span></div>
      </div>
      {reviews.map((r, i) => (
        <div key={i} style={{ padding: "24px 0", borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #2a2722, #1a1815)", color: "var(--gold)", display: "grid", placeItems: "center", fontFamily: "Italiana, serif", fontSize: 16, border: "1px solid var(--line-2)" }}>{r.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15 }}>{r.name}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>{r.country} · {r.date}</div>
            </div>
            <div style={{ display: "flex", gap: 2, color: "var(--gold)" }}>{[0,1,2,3,4].map(i => <Icon.Star key={i} size={11} />)}</div>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, margin: "14px 0 0" }}>"{r.text}"</p>
        </div>
      ))}
    </div>
  );
}

function RelatedSection({ kind, excludeId, go }) {
  const isCar = kind === "car";
  const isMobile = useIsMobileD();
  const list = (isCar ? window.OUMIX_DATA.CARS : window.OUMIX_DATA.VILLAS).filter(x => x.id !== excludeId).slice(0, isMobile ? 2 : 3);
  return (
    <section style={{ maxWidth: 1400, margin: isMobile ? "60px auto 0" : "100px auto 0", padding: isMobile ? "0 20px" : "0 6vw" }}>
      <SectionEyebrow index="05" label={isCar ? "Other Vehicles" : "Other Estates"} />
      <h2 className="display" style={{ fontSize: isMobile ? 28 : 40, margin: "20px 0 28px", lineHeight: 1.1 }}>
        You may also <span className="script gold">consider.</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 24 }}>
        {list.map(item => isCar
          ? <CarCard key={item.id} car={item} go={go} />
          : <VillaCard key={item.id} villa={item} go={go} />
        )}
      </div>
    </section>
  );
}

Object.assign(window, { ListingDetail });
