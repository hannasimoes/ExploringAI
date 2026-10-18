// Acceptance test A04: unit-price comparison maths.
// Run with: node tests/unit-price.test.mjs
// The functions are read straight from index.html, so the test checks the code the app really runs.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const start = html.indexOf("// ---------- Unit-price maths");
const end = html.indexOf("const money", start);
const { perUnit, compareTwo } = new Function(html.slice(start, end) + "\nreturn { perUnit, compareTwo };")();

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≈ ${b}`);

// Same unit family: semi-skimmed milk 2.272 L for £1.65 vs 1.136 L for £1.20
let r = compareTwo({ price: 1.65, quantity: 2.272, unit: "l" }, { price: 1.20, quantity: 1.136, unit: "l" });
assert.equal(r.ok, true);
near(r.pa.value, 1.65 / 2.272);
near(r.pb.value, 1.20 / 1.136);
assert.equal(r.cheaper, "A");

// Grams vs kilograms convert correctly: 500 g for £1.35 vs 1 kg for £2.30
r = compareTwo({ price: 1.35, quantity: 500, unit: "g" }, { price: 2.30, quantity: 1, unit: "kg" });
near(r.pa.value, 2.70);
near(r.pb.value, 2.30);
assert.equal(r.cheaper, "B");

// Millilitres vs litres
r = compareTwo({ price: 0.80, quantity: 500, unit: "ml" }, { price: 1.50, quantity: 1, unit: "l" });
near(r.pa.value, 1.60);
assert.equal(r.cheaper, "B");

// Items: 5 bananas £0.95 vs 5 bananas £0.78
r = compareTwo({ price: 0.95, quantity: 5, unit: "each" }, { price: 0.78, quantity: 5, unit: "each" });
assert.equal(r.cheaper, "B");
near(r.saving, (0.95 - 0.78) / 5);

// Same price per unit
r = compareTwo({ price: 1, quantity: 1, unit: "kg" }, { price: 0.5, quantity: 500, unit: "g" });
assert.equal(r.cheaper, "same");

// Incompatible units are never mixed
r = compareTwo({ price: 1.80, quantity: 1, unit: "l" }, { price: 1.10, quantity: 400, unit: "g" });
assert.deepEqual(r, { ok: false, reason: "units" });

// Missing data means no comparison
assert.deepEqual(compareTwo({ price: null, quantity: 1, unit: "kg" }, { price: 1, quantity: 1, unit: "kg" }), { ok: false, reason: "missing" });
assert.deepEqual(compareTwo({ price: 1, quantity: 0, unit: "kg" }, { price: 1, quantity: 1, unit: "kg" }), { ok: false, reason: "missing" });
assert.deepEqual(compareTwo({ price: 1, quantity: 1, unit: "" }, { price: 1, quantity: 1, unit: "kg" }), { ok: false, reason: "missing" });

console.log("All unit-price tests passed (A04).");
