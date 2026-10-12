// Verifies every text/background pair in src/theme/palette.ts meets WCAG 2.2 AA.
// Run with: npm run check:contrast
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/theme/palette.ts', import.meta.url), 'utf8');
const palettes = {};
for (const m of source.matchAll(/export const (\w+): Palette = \{([^}]*)\}/g)) {
  palettes[m[1]] = Object.fromEntries(
    [...m[2].matchAll(/(\w+): '(#[0-9A-Fa-f]{6})'/g)].map((x) => [x[1], x[2]]),
  );
}

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [foreground, background, minimum ratio]
const checks = [
  ['text', 'background', 4.5],
  ['text', 'surface', 4.5],
  ['text', 'surfaceAlt', 4.5],
  ['textMuted', 'background', 4.5],
  ['textMuted', 'surface', 4.5],
  ['onPrimary', 'primary', 4.5],
  ['onAccent', 'accent', 4.5],
  ['primary', 'background', 4.5],
  ['accent', 'background', 4.5],
  ['success', 'surface', 4.5],
  ['warning', 'surface', 4.5],
  ['danger', 'surface', 4.5],
  ['border', 'background', 3],
  ['focus', 'background', 3],
];

let failed = 0;
for (const [name, p] of Object.entries(palettes)) {
  for (const [fg, bg, min] of checks) {
    const r = ratio(p[fg], p[bg]);
    if (r < min) {
      failed++;
      console.log(`FAIL ${name}: ${fg} on ${bg} = ${r.toFixed(2)} (needs ${min})`);
    }
  }
}
console.log(failed ? `${failed} contrast failures` : `All ${Object.keys(palettes).length} palettes pass WCAG AA`);
process.exit(failed ? 1 : 0);
