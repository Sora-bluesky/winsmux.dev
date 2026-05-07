import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const svg = readFileSync(join(publicDir, 'brand-mark.svg'), 'utf8');
const sizes = [16, 32, 48, 180];

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 1 });

for (const size of sizes) {
  const page = await context.newPage();
  const html = `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;background:transparent}
    body{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center}
    svg{width:${size}px;height:${size}px;display:block}
  </style></head><body>${svg}</body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.setViewportSize({ width: size, height: size });
  const buf = await page.locator('svg').screenshot({ omitBackground: true });
  writeFileSync(join(publicDir, `_favicon-${size}.png`), buf);
  console.log(`wrote _favicon-${size}.png (${buf.length} bytes)`);
  await page.close();
}

await browser.close();
console.log('done');
