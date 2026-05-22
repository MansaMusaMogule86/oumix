// Catalog data + brand tokens
const BRAND = {
  phone: "+212 6 70 09 06 70",
  phoneDisplay: "+212 6 70 09 06 70",
  email: "concierge@oumix.ma",
};

const CARS = [
  { id: "c1", name: "Range Rover Autobiography", category: "Luxury SUV", year: 2024, seats: 5, transmission: "Auto", power: "523 hp", priceDay: 480, currency: "€", tag: "Signature", color: "Obsidian", short: "Commanding presence with bespoke leather and refrigerated rear console." },
  { id: "c2", name: "Mercedes-Benz S-Class", category: "Executive", year: 2024, seats: 4, transmission: "Auto", power: "496 hp", priceDay: 420, currency: "€", tag: "Executive", color: "Onyx", short: "Chauffeur-grade silence and active suspension across the High Atlas." },
  { id: "c3", name: "Porsche Cayenne Coupé", category: "Performance SUV", year: 2024, seats: 4, transmission: "Auto", power: "468 hp", priceDay: 390, currency: "€", tag: "Performance", color: "Volcano Grey", short: "Sporting silhouette, four-corner air, panoramic roof." },
  { id: "c4", name: "Mercedes-Benz E-Class", category: "Premium", year: 2024, seats: 5, transmission: "Auto", power: "295 hp", priceDay: 240, currency: "€", tag: "Premium", color: "Graphite", short: "The most-requested business saloon. Burmester audio, MBUX." },
  { id: "c5", name: "BMW X7 M-Sport", category: "Luxury SUV", year: 2024, seats: 7, transmission: "Auto", power: "375 hp", priceDay: 460, currency: "€", tag: "Family", color: "Carbon Black", short: "Three rows of executive comfort. Sky lounge panoramic roof." },
  { id: "c6", name: "Audi Q8 e-tron", category: "Electric", year: 2024, seats: 5, transmission: "Auto", power: "402 hp", priceDay: 360, currency: "€", tag: "Electric", color: "Mythos Black", short: "Silent, swift, and recharged complimentary at our Gueliz garage." },
  { id: "c7", name: "Land Cruiser 300 GR", category: "4x4", year: 2023, seats: 7, transmission: "Auto", power: "409 hp", priceDay: 320, currency: "€", tag: "4x4", color: "Pearl White", short: "Desert-ready. Roof basket, dual fridges, satellite tracker." },
  { id: "c8", name: "Volkswagen Tiguan", category: "SUV", year: 2024, seats: 5, transmission: "Auto", power: "190 hp", priceDay: 110, currency: "€", tag: "Daily", color: "Atlantic Blue", short: "Refined daily SUV with adaptive cruise and head-up display." },
  { id: "c9", name: "Mercedes V-Class VIP", category: "VIP Van", year: 2024, seats: 7, transmission: "Auto", power: "237 hp", priceDay: 380, currency: "€", tag: "Group", color: "Obsidian", short: "Captain seats, rear lounge, partition with smart glass. Chauffeur optional." },
  { id: "c10", name: "Dacia Duster", category: "Economy 4x4", year: 2024, seats: 5, transmission: "Manual", power: "150 hp", priceDay: 55, currency: "€", tag: "Value", color: "Slate", short: "The dependable workhorse for the High Atlas pistes." },
];

const VILLAS = [
  { id: "v1", name: "Villa Najma", area: "Palmeraie", guests: 12, bedrooms: 6, baths: 7, priceNight: 1900, currency: "€", tag: "Signature", style: "Berber-Modern", short: "An olive-grove estate with a 22-metre heated pool and private hammam." },
  { id: "v2", name: "Riad El-Hourra", area: "Medina", guests: 8, bedrooms: 4, baths: 4, priceNight: 980, currency: "€", tag: "Heritage", style: "Andalusian Riad", short: "A 19th-century riad behind a discreet medina door. Plunge pool, rooftop." },
  { id: "v3", name: "Villa Atlas Mirage", area: "Amelkis", guests: 10, bedrooms: 5, baths: 6, priceNight: 1450, currency: "€", tag: "Golf View", style: "Contemporary", short: "Floor-to-ceiling glass facing the Atlas. Pool, gym, cinema room." },
  { id: "v4", name: "Dar Selma", area: "Palmeraie", guests: 14, bedrooms: 7, baths: 8, priceNight: 2400, currency: "€", tag: "Family", style: "Moorish-Modern", short: "Two-acre walled estate, tennis court, two pools, full staff of 8." },
  { id: "v5", name: "Villa Noor", area: "Route de l'Ourika", guests: 6, bedrooms: 3, baths: 4, priceNight: 720, currency: "€", tag: "Intimate", style: "Minimal Pisé", short: "An architect's retreat. Earthen walls, infinity pool toward the desert." },
  { id: "v6", name: "Palais Tameslouht", area: "Tameslouht", guests: 16, bedrooms: 8, baths: 10, priceNight: 3200, currency: "€", tag: "Event", style: "Palatial", short: "A wedding-grade palace with three courtyards and ceremonial pool." },
];

const FEATURES_CAR = ["Airport Delivery", "Any Location", "Insurance Included", "24/7 Service"];
const FEATURES_LUX = ["Private Pool", "Daily Cleaning", "Unique Locations", "Concierge Service"];

window.OUMIX_DATA = { BRAND, CARS, VILLAS, FEATURES_CAR, FEATURES_LUX };
