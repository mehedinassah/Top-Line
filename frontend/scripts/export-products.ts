// Exports the hardcoded storefront catalogue to JSON for the backend seeder.
// Run from the frontend folder:  npx tsx scripts/export-products.ts
import { featuredProducts } from "../lib/productData";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";

const out = resolve(
  process.cwd(),
  "../backend/src/main/resources/seed/products.json"
);
mkdirSync(dirname(out), { recursive: true });

// Strip the client-only numeric id — the DB assigns its own ids on insert.
const catalogue = featuredProducts.map(({ id, ...rest }) => rest);

writeFileSync(out, JSON.stringify(catalogue, null, 2));
console.log(`Wrote ${catalogue.length} products to ${out}`);
