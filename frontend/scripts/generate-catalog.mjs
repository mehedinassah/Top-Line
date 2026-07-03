// Generates a 30-product catalogue (10 men / 10 women / 10 accessories)
// and writes it to backend/src/main/resources/seed/products.json.
// Run:  node scripts/generate-catalog.mjs
import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";

const HEX = {
  Black: "#000000", White: "#FFFFFF", Navy: "#001F3F", Charcoal: "#36454F",
  Gray: "#808080", Beige: "#F5F5DC", Cream: "#FFFDD0", Olive: "#556B2F",
  Burgundy: "#800020", Tan: "#D2B48C", Brown: "#5C4033", Blush: "#DE5D83",
  Sage: "#9CAF88", SkyBlue: "#87CEEB", Rust: "#B7410E", Mustard: "#E1AD01",
  Pink: "#FFC0CB", Maroon: "#800000", Gold: "#D4AF37", Silver: "#C0C0C0",
};
const col = (name) => ({ name, code: HEX[name] || "#333333" });

const CARE_FABRIC = [
  "Machine wash cold (30°C)", "Wash with similar colours", "Do not bleach",
  "Tumble dry low", "Warm iron if needed",
];
const CARE_LEATHER = [
  "Wipe with a soft, dry cloth", "Keep away from moisture", "Store in the dust bag",
  "Avoid prolonged direct sunlight",
];
const CARE_METAL = [
  "Wipe with a soft cloth", "Avoid contact with water and perfume",
  "Store separately to prevent scratches",
];
const TRUST = ["Free delivery over ৳2000", "7-day easy returns", "Cash on delivery available"];

function img(seed, i) {
  return `https://picsum.photos/seed/${seed}-${i}/600/750`;
}

function build(collection, prefix, list) {
  return list.map((p, idx) => {
    const n = idx + 1;
    const colors = p.colors.map(col);
    const sizes = p.sizes;
    const seed = `tl-${collection}-${n}`;
    const variants = [];
    for (const c of colors) {
      for (const s of sizes) {
        variants.push({
          size: s,
          color: c,
          sku: `TL-${prefix}${String(n).padStart(2, "0")}-${c.name.slice(0, 3).toUpperCase()}-${s.replace(/\s+/g, "")}`,
          inStock: true,
          quantity: 6 + ((n * 3 + s.length + c.name.length) % 18),
        });
      }
    }
    return {
      name: p.name,
      price: p.price,
      discountPrice: p.discount ?? null,
      rating: p.rating,
      category: p.category,
      collection,
      images: [1, 2, 3, 4].map((i) => img(seed, i)),
      sizes,
      colors,
      variants,
      description: {
        story: p.story,
        highlights: p.highlights,
        trustSignals: TRUST,
        fabricBuild: { description: p.fabricDesc, composition: p.composition },
        fitAndSizing: {
          fit: p.fit,
          model: p.model || "Model wears size M",
          sizing: "True to size, take your usual size",
        },
        whyYouLoveIt: p.love,
        careInstructions: p.care || CARE_FABRIC,
      },
    };
  });
}

const CLO = ["XS", "S", "M", "L", "XL", "XXL"];
const MLXL = ["S", "M", "L", "XL"];
const ONE = ["One Size"];

const men = build("men", "M", [
  { name: "Oxford Button-Down Shirt", category: "shirts", price: 1890, discount: 1512, rating: 4.7, colors: ["White", "SkyBlue", "Navy"], sizes: CLO,
    story: "A wardrobe cornerstone. Crisp Oxford weave that moves easily from desk to dinner.", highlights: ["Breathable Oxford cotton", "Button-down collar", "Tailored regular fit", "Reinforced stitching"],
    composition: ["100% Combed Cotton", "Pre-shrunk", "Colourfast dye"], fabricDesc: "140 GSM Oxford cotton with a soft handfeel and lasting structure.", fit: "Regular fit",
    love: ["Pairs with everything", "Holds shape wash after wash", "Smart yet comfortable"] },
  { name: "Classic Cotton Crew Tee", category: "tees", price: 690, rating: 4.6, colors: ["Black", "White", "Navy", "Olive"], sizes: CLO,
    story: "The everyday tee, perfected — soft, durable and endlessly versatile.", highlights: ["180 GSM combed cotton", "Ribbed crew neck", "Shoulder-to-shoulder tape"],
    composition: ["100% Cotton", "Pre-shrunk"], fabricDesc: "180 GSM single-jersey knit with a smooth surface.", fit: "Regular fit",
    love: ["Layers beautifully", "Keeps its shape", "Everyday value"] },
  { name: "Slim Fit Stretch Chinos", category: "pants", price: 1690, discount: 1352, rating: 4.5, colors: ["Beige", "Navy", "Olive", "Charcoal"], sizes: MLXL,
    story: "Tailored comfort with a hint of stretch for all-day ease.", highlights: ["Cotton-elastane blend", "Slim tapered leg", "Wrinkle-resistant"],
    composition: ["98% Cotton", "2% Elastane"], fabricDesc: "Mid-weight twill with comfort stretch.", fit: "Slim fit", love: ["Smart casual staple", "Moves with you", "Clean silhouette"] },
  { name: "Merino Wool Sweater", category: "knitwear", price: 2790, rating: 4.8, colors: ["Charcoal", "Burgundy", "Navy"], sizes: MLXL,
    story: "Featherweight warmth in pure merino — refined and cosy.", highlights: ["100% merino wool", "Temperature regulating", "Ribbed trims"],
    composition: ["100% Merino Wool"], fabricDesc: "Fine-gauge merino knit, naturally breathable.", fit: "Regular fit", care: ["Hand wash cold", "Dry flat", "Do not wring"],
    love: ["Warm without bulk", "Soft on skin", "Elevates any outfit"] },
  { name: "Denim Trucker Jacket", category: "outerwear", price: 3290, discount: 2632, rating: 4.7, colors: ["Navy", "Black"], sizes: MLXL,
    story: "A timeless layer that only gets better with wear.", highlights: ["Rigid-to-soft denim", "Classic trucker cut", "Chest & side pockets"],
    composition: ["100% Cotton Denim"], fabricDesc: "12oz cotton denim built to last.", fit: "Regular fit", love: ["Ages beautifully", "Year-round layer", "Effortlessly cool"] },
  { name: "Linen Resort Shirt", category: "shirts", price: 1590, rating: 4.5, colors: ["Cream", "Sage", "SkyBlue"], sizes: CLO,
    story: "Breezy linen for warm days and easy evenings.", highlights: ["Pure linen", "Camp collar", "Relaxed drape"],
    composition: ["100% Linen"], fabricDesc: "Lightweight 120 GSM linen with natural texture.", fit: "Relaxed fit", love: ["Keeps you cool", "Vacation-ready", "Gets softer over time"] },
  { name: "Graphic Print Tee", category: "tees", price: 790, discount: 632, rating: 4.4, colors: ["Black", "White", "Rust"], sizes: CLO,
    story: "Statement graphics on a premium cotton base.", highlights: ["Soft-hand print", "180 GSM cotton", "Crew neck"],
    composition: ["100% Cotton"], fabricDesc: "180 GSM jersey with durable water-based print.", fit: "Regular fit", love: ["Stands out", "Comfortable all day", "Print that lasts"] },
  { name: "Quilted Bomber Jacket", category: "outerwear", price: 3490, rating: 4.6, colors: ["Black", "Olive"], sizes: MLXL,
    story: "Sporty silhouette with insulating quilted lining.", highlights: ["Water-repellent shell", "Ribbed cuffs & hem", "Zip pockets"],
    composition: ["Shell: 100% Polyester", "Lining: Polyester fill"], fabricDesc: "Lightweight quilted shell with cosy fill.", fit: "Regular fit", care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    love: ["Warm and light", "Street-ready", "Versatile layer"] },
  { name: "Straight Fit Jeans", category: "jeans", price: 1990, discount: 1592, rating: 4.6, colors: ["Navy", "Black", "Gray"], sizes: MLXL,
    story: "Honest denim with a clean straight leg.", highlights: ["Stretch denim", "Five-pocket styling", "Fade-resistant"],
    composition: ["98% Cotton", "2% Elastane"], fabricDesc: "12oz stretch denim, comfortable and durable.", fit: "Straight fit", love: ["Everyday denim", "Comfort stretch", "Classic look"] },
  { name: "Pique Polo Shirt", category: "polos", price: 1290, rating: 4.5, colors: ["White", "Navy", "Burgundy", "Sage"], sizes: CLO,
    story: "A sharp polo in breathable pique cotton.", highlights: ["Pique-knit cotton", "Two-button placket", "Ribbed collar"],
    composition: ["100% Cotton Pique"], fabricDesc: "220 GSM pique knit with structure.", fit: "Regular fit", love: ["Smart and breezy", "Holds its collar", "Easy to dress up"] },
]);

const women = build("women", "W", [
  { name: "Floral Wrap Dress", category: "dresses", price: 2490, discount: 1992, rating: 4.8, colors: ["Blush", "Navy", "Sage"], sizes: CLO,
    story: "An effortless wrap silhouette in a soft floral print.", highlights: ["Flattering wrap tie", "Flowy midi length", "Breathable viscose"],
    composition: ["100% Viscose"], fabricDesc: "Fluid 110 GSM viscose with beautiful drape.", fit: "Regular fit", model: "Model wears size S",
    love: ["Flatters every shape", "Day-to-night", "Feather-light feel"] },
  { name: "Silk-Touch Blouse", category: "tops", price: 1690, rating: 4.6, colors: ["Cream", "Black", "Blush"], sizes: CLO,
    story: "A luxe-feel blouse that dresses up any look.", highlights: ["Silky satin weave", "Relaxed cut", "Mother-of-pearl buttons"],
    composition: ["100% Polyester Satin"], fabricDesc: "Smooth satin with a subtle sheen.", fit: "Relaxed fit", care: ["Hand wash cold", "Hang dry", "Cool iron"],
    love: ["Elegant drape", "Office to evening", "Feels premium"] },
  { name: "High-Waist Skinny Jeans", category: "jeans", price: 2090, discount: 1672, rating: 4.7, colors: ["Black", "Navy", "SkyBlue"], sizes: MLXL,
    story: "Sculpting high-rise denim with all-day stretch.", highlights: ["High-rise fit", "Sculpting stretch", "Ankle length"],
    composition: ["92% Cotton", "6% Polyester", "2% Elastane"], fabricDesc: "Power-stretch denim that holds and recovers.", fit: "Skinny fit", model: "Model wears size S",
    love: ["Snatched silhouette", "Never sags", "Goes with everything"] },
  { name: "Chunky Knit Cardigan", category: "knitwear", price: 2390, rating: 4.6, colors: ["Cream", "Sage", "Charcoal"], sizes: MLXL,
    story: "Wrap up in a soft, oversized chunky knit.", highlights: ["Cosy chunky knit", "Drop shoulder", "Front pockets"],
    composition: ["60% Cotton", "40% Acrylic"], fabricDesc: "Plush chunky knit with a soft handfeel.", fit: "Oversized fit", care: ["Hand wash cold", "Dry flat"],
    love: ["Snuggly warm", "Easy layering", "Relaxed style"] },
  { name: "Pleated Midi Skirt", category: "skirts", price: 1790, discount: 1432, rating: 4.5, colors: ["Black", "Burgundy", "Beige"], sizes: MLXL,
    story: "Graceful pleats with elegant movement.", highlights: ["Accordion pleats", "Elastic waist", "Midi length"],
    composition: ["100% Polyester"], fabricDesc: "Lightweight pleated crepe with lovely swing.", fit: "Regular fit", model: "Model wears size S",
    love: ["Twirl-worthy", "Comfy waistband", "Timelessly chic"] },
  { name: "Oversized Boyfriend Tee", category: "tees", price: 790, rating: 4.5, colors: ["White", "Black", "Sage", "Pink"], sizes: CLO,
    story: "A relaxed, drop-shoulder tee for easy days.", highlights: ["Heavy cotton", "Drop shoulder", "Ribbed neck"],
    composition: ["100% Cotton"], fabricDesc: "190 GSM cotton with a substantial feel.", fit: "Oversized fit", love: ["So comfy", "Effortless style", "Great to layer"] },
  { name: "Tailored Blazer", category: "outerwear", price: 3290, discount: 2632, rating: 4.7, colors: ["Black", "Beige", "Navy"], sizes: MLXL,
    story: "A structured blazer that means business.", highlights: ["Structured shoulders", "Single-button close", "Fully lined"],
    composition: ["68% Polyester", "30% Viscose", "2% Elastane"], fabricDesc: "Smooth suiting fabric with a hint of stretch.", fit: "Tailored fit", care: ["Dry clean only"],
    love: ["Instantly polished", "Flattering cut", "Work-ready"] },
  { name: "Maxi Summer Dress", category: "dresses", price: 2590, rating: 4.8, colors: ["SkyBlue", "Blush", "Cream"], sizes: CLO,
    story: "A flowing maxi made for sunny escapes.", highlights: ["Airy viscose", "Adjustable straps", "Tiered skirt"],
    composition: ["100% Viscose"], fabricDesc: "Breezy viscose with a soft, floaty drape.", fit: "Regular fit", model: "Model wears size S",
    love: ["Vacation staple", "Keeps you cool", "Elegant movement"] },
  { name: "Ribbed Tank Top", category: "tops", price: 590, discount: 472, rating: 4.4, colors: ["White", "Black", "Sage", "Rust"], sizes: CLO,
    story: "A fitted ribbed tank — the perfect base layer.", highlights: ["Stretch rib knit", "Scoop neck", "Second-skin fit"],
    composition: ["95% Cotton", "5% Elastane"], fabricDesc: "Soft ribbed knit with recovery stretch.", fit: "Fitted", love: ["Layer or solo", "Hugs the body", "Everyday essential"] },
  { name: "Classic Denim Jacket", category: "outerwear", price: 2890, rating: 4.6, colors: ["SkyBlue", "Black"], sizes: MLXL,
    story: "The denim jacket you'll reach for all year.", highlights: ["Washed denim", "Cropped cut", "Button front"],
    composition: ["100% Cotton Denim"], fabricDesc: "Soft washed denim with a lived-in feel.", fit: "Regular fit", love: ["Throw-on ease", "Timeless piece", "Pairs with dresses"] },
]);

const accessories = build("accessories", "A", [
  { name: "Full-Grain Leather Belt", category: "belts", price: 1290, discount: 1032, rating: 4.7, colors: ["Brown", "Black", "Tan"], sizes: ["S", "M", "L"],
    story: "A refined belt in genuine full-grain leather.", highlights: ["Full-grain leather", "Brushed metal buckle", "Hand-finished edges"],
    composition: ["100% Genuine Leather"], fabricDesc: "Full-grain leather that patinas with age.", fit: "Standard width 3.5cm", care: CARE_LEATHER,
    love: ["Ages gracefully", "Everyday elegance", "Built to last"] },
  { name: "Minimalist Analog Watch", category: "watches", price: 4290, discount: 3432, rating: 4.8, colors: ["Silver", "Gold", "Black"], sizes: ONE,
    story: "Understated timekeeping with a clean dial.", highlights: ["Stainless steel case", "Quartz movement", "Water-resistant 3ATM"],
    composition: ["Stainless Steel", "Mineral Glass"], fabricDesc: "Slim 40mm case with a leather strap.", fit: "Adjustable strap", care: CARE_METAL,
    love: ["Goes with anything", "Precise & reliable", "Timeless design"] },
  { name: "Aviator Sunglasses", category: "sunglasses", price: 1490, rating: 4.5, colors: ["Gold", "Silver", "Black"], sizes: ONE,
    story: "Iconic aviators with full UV protection.", highlights: ["UV400 lenses", "Metal frame", "Spring hinges"],
    composition: ["Metal Frame", "Polycarbonate Lens"], fabricDesc: "Lightweight metal frame with tinted lenses.", fit: "Unisex", care: ["Wipe with lens cloth", "Store in case"],
    love: ["Classic look", "Protects your eyes", "Suits most faces"] },
  { name: "Structured Leather Handbag", category: "bags", price: 3990, discount: 3192, rating: 4.8, colors: ["Tan", "Black", "Burgundy"], sizes: ONE,
    story: "A structured tote that carries it all in style.", highlights: ["Pebbled leather", "Roomy interior", "Detachable strap"],
    composition: ["Genuine Leather", "Fabric Lining"], fabricDesc: "Durable pebbled leather with gold hardware.", fit: "Medium tote", care: CARE_LEATHER,
    love: ["Elegant & practical", "Fits daily essentials", "Statement piece"] },
  { name: "Ribbed Wool Beanie", category: "hats", price: 690, rating: 4.4, colors: ["Charcoal", "Burgundy", "Cream", "Olive"], sizes: ONE,
    story: "A cosy ribbed beanie for cold days.", highlights: ["Soft wool blend", "Ribbed knit", "Fold-over cuff"],
    composition: ["70% Acrylic", "30% Wool"], fabricDesc: "Stretchy ribbed knit that keeps its shape.", fit: "One size fits most", care: ["Hand wash cold", "Dry flat"],
    love: ["Warm and soft", "Everyday winter staple", "Flattering fit"] },
  { name: "Printed Silk Scarf", category: "scarves", price: 990, discount: 792, rating: 4.5, colors: ["Blush", "Navy", "Mustard"], sizes: ONE,
    story: "A versatile scarf with a hand-drawn print.", highlights: ["Silky handfeel", "Vibrant print", "Lightweight"],
    composition: ["100% Polyester Silk-touch"], fabricDesc: "Smooth silk-touch fabric with rolled edges.", fit: "90 x 90 cm", care: ["Hand wash", "Cool iron"],
    love: ["Elevates any look", "Wear many ways", "Soft & light"] },
  { name: "Bifold Leather Wallet", category: "wallets", price: 1190, rating: 4.6, colors: ["Brown", "Black"], sizes: ONE,
    story: "A slim bifold with room for the essentials.", highlights: ["Full-grain leather", "6 card slots", "Slim profile"],
    composition: ["100% Genuine Leather"], fabricDesc: "Compact full-grain leather wallet.", fit: "Bifold", care: CARE_LEATHER,
    love: ["Slim yet roomy", "Ages beautifully", "Great gift"] },
  { name: "Canvas Backpack", category: "bags", price: 2290, discount: 1832, rating: 4.6, colors: ["Olive", "Charcoal", "Tan"], sizes: ONE,
    story: "A rugged everyday backpack in waxed canvas.", highlights: ["Water-resistant canvas", "Padded laptop sleeve", "Leather trims"],
    composition: ["Waxed Canvas", "Leather Trim"], fabricDesc: "Durable waxed canvas with roomy compartments.", fit: "20L capacity", care: ["Spot clean", "Air dry"],
    love: ["Tough & practical", "Fits a 15-inch laptop", "Looks better with age"] },
  { name: "Cotton Baseball Cap", category: "hats", price: 590, rating: 4.3, colors: ["Black", "Navy", "Beige", "Olive"], sizes: ONE,
    story: "A classic six-panel cap in soft cotton.", highlights: ["Brushed cotton", "Adjustable strap", "Curved brim"],
    composition: ["100% Cotton"], fabricDesc: "Soft brushed cotton with structured crown.", fit: "Adjustable", care: ["Spot clean", "Air dry"],
    love: ["Everyday casual", "Adjustable fit", "Goes with anything"] },
  { name: "Beaded Bracelet Set", category: "jewelry", price: 790, discount: 632, rating: 4.4, colors: ["Brown", "Black", "Gold"], sizes: ONE,
    story: "A stackable set of hand-strung beaded bracelets.", highlights: ["Natural beads", "Elastic fit", "Set of three"],
    composition: ["Natural Stone", "Elastic Cord"], fabricDesc: "Hand-strung beads on durable elastic.", fit: "Stretch, one size", care: CARE_METAL,
    love: ["Stack or solo", "Easy on/off", "Adds character"] },
]);

const catalogue = [...men, ...women, ...accessories];

const out = resolve(process.cwd(), "../backend/src/main/resources/seed/products.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(catalogue, null, 2));
console.log(`Wrote ${catalogue.length} products (men ${men.length}, women ${women.length}, accessories ${accessories.length}) to ${out}`);
