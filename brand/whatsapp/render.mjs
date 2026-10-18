import { chromium } from 'file:///C:/Users/alexr/AppData/Roaming/npm/node_modules/playwright/index.mjs';
const base = 'file:///C:/Users/alexr/Documents/tidence-design/tidence-design/brand/whatsapp/' + (process.argv[4] || 'poster.html') + '';
const out = process.argv[3] || 'C:/Users/alexr/Documents/tidence-design/tidence-design/brand/whatsapp/';
const jobs = JSON.parse(process.argv[2]);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
for (const j of jobs) {
  await page.goto(base + '?' + j.q);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  // report overflowing headline lines
  const over = await page.evaluate(() => [...document.querySelectorAll('.l')].map(e => [e.textContent, Math.round(e.getBoundingClientRect().width)]));
  await page.locator('.banner, #poster').screenshot({ path: out + j.file, type: 'png' });
  console.log('wrote', j.file, JSON.stringify(over));
}
await browser.close();
