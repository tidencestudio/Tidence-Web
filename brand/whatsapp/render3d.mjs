// Renders banner-3d.html to PNG. Usage: node render3d.mjs '[{"q":"","file":"x.png"}]' [outDir]
import { chromium } from 'file:///C:/Users/alexr/AppData/Roaming/npm/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const base = pathToFileURL(join(here, 'banner-3d.html')).href;
const out = process.argv[3] || here + '/';
const jobs = JSON.parse(process.argv[2]);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGE ERROR', e.message));
for (const j of jobs) {
  await page.goto(base + '?' + j.q);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  await page.waitForTimeout(200);
  await page.locator('#banner').screenshot({ path: join(out, j.file), type: 'png' });
  console.log('wrote', j.file);
}
await browser.close();
