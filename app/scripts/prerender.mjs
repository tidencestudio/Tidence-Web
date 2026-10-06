// Runs after `vite build` and `vite build --ssr`. Renders each page to HTML so
// the first paint and every crawler get real content without executing JS, then
// writes robots.txt and sitemap.xml. The client hydrates what this produces.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

// Vercel provides the production domain at build time; SITE_URL overrides it.
const site = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://tidence.vercel.app'
).replace(/\/+$/, '')

const { render, en } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

let template = readFileSync(resolve(dist, 'index.html'), 'utf8')

// One small stylesheet: inlining it removes the request that would otherwise
// block first paint.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(resolve(dist, href.slice(1)), 'utf8')
  return `<style>${css}</style>`
})

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site}/#org`,
      name: 'Tidence',
      url: `${site}/`,
      logo: `${site}/favicon.png`,
      email: 'tidencestudio@gmail.com',
      description: en.meta.description,
    },
    {
      '@type': 'WebSite',
      '@id': `${site}/#site`,
      url: `${site}/`,
      name: 'Tidence',
      publisher: { '@id': `${site}/#org` },
      inLanguage: ['en', 'es'],
    },
  ],
})

const pages = [
  { path: '/', out: 'index.html', title: en.meta.title, ld: true },
  ...['privacy', 'terms'].map((doc) => ({
    path: `/${doc}`,
    out: `${doc}/index.html`,
    title: en.legal[doc].metaTitle,
    ld: false,
  })),
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const page of pages) {
  const url = page.path === '/' ? `${site}/` : `${site}${page.path}`
  const html = template
    .replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(page.title)}</title>`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.title)}${b}`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.title)}${b}`)
    .replace('<!--jsonld-->', () => (page.ld ? `<script type="application/ld+json">${jsonLd}</script>` : ''))
    .replaceAll('"__SITE_URL__/"', `"${url}"`)
    .replaceAll('__SITE_URL__', site)

  mkdirSync(dirname(resolve(dist, page.out)), { recursive: true })
  writeFileSync(resolve(dist, page.out), html)
  console.log(`prerendered ${page.path} (${(html.length / 1024).toFixed(1)} KB)`)
}

writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)

const lastmod = new Date().toISOString().slice(0, 10)
const urls = pages
  .map((p) => `  <url><loc>${site}${p.path === '/' ? '/' : p.path}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(`site: ${site}`)
