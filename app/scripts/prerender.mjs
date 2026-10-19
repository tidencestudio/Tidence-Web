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

const { render, en, es } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

let template = readFileSync(resolve(dist, 'index.html'), 'utf8')

// One small stylesheet: inlining it removes the request that would otherwise
// block first paint.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(resolve(dist, href.slice(1)), 'utf8')
  return `<style>${css}</style>`
})

// Structured data: who the studio is, what it offers, how to reach it, in the
// vocabulary search engines and AI assistants read. Built from the same copy
// as the page, so it never disagrees with what a visitor sees.
const SERVICE_KEYS = Object.keys(en.services.items)
const jsonLdFor = (dict, locale) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${site}/#org`,
        name: 'Tidence',
        alternateName: 'Tidence Studio',
        url: `${site}/${locale}`,
        logo: { '@type': 'ImageObject', url: `${site}/icon-512.png`, width: 512, height: 512 },
        image: `${site}/og.jpg`,
        slogan: `${dict.contact.sloganA} ${dict.contact.sloganB}`,
        description: dict.meta.description,
        email: 'tidencestudio@gmail.com',
        telephone: '+1-829-731-4605',
        knowsLanguage: ['en', 'es'],
        founder: [
          { '@type': 'Person', name: 'Alexander Ross' },
          { '@type': 'Person', name: 'Bryan De Jesus' },
        ],
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 2 },
        sameAs: ['https://www.instagram.com/tidence.dev/'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'tidencestudio@gmail.com',
          telephone: '+1-829-731-4605',
          availableLanguage: ['English', 'Spanish'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: dict.services.eyebrow,
          itemListElement: SERVICE_KEYS.map((key) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: dict.services.items[key].kind,
              description: dict.services.items[key].text,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site}/#site`,
        url: `${site}/${locale}`,
        name: 'Tidence',
        publisher: { '@id': `${site}/#org` },
        inLanguage: ['en', 'es'],
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/${locale}#page`,
        url: `${site}/${locale}`,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locale,
        isPartOf: { '@id': `${site}/#site` },
        about: { '@id': `${site}/#org` },
        primaryImageOfPage: `${site}/og.jpg`,
      },
    ],
  })

// Every page in both languages: /en, /es, /en/privacy, /es/privacy, /en/terms,
// /es/terms. English is the default; / redirects permanently to /en (vercel.json).
const DICTS = { en, es }
const OG_LOCALE = { en: 'en_US', es: 'es_ES' }
const pathFor = (locale, doc) => `/${locale}${doc ? `/${doc}` : ''}`

const pages = Object.entries(DICTS).flatMap(([locale, dict]) => [
  { locale, doc: null, title: dict.meta.title, ld: true },
  ...['privacy', 'terms'].map((doc) => ({ locale, doc, title: dict.legal[doc].metaTitle, ld: false })),
]).map((page) => ({
  ...page,
  path: pathFor(page.locale, page.doc),
  out: `${page.locale}${page.doc ? `/${page.doc}` : ''}/index.html`,
  description: DICTS[page.locale].meta.description,
}))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const page of pages) {
  const url = `${site}${page.path}`
  const alternates = [
    ...Object.keys(DICTS).map(
      (locale) => `<link rel="alternate" hreflang="${locale}" href="${site}${pathFor(locale, page.doc)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${site}${pathFor('en', page.doc)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[page.locale]}" />`,
    ...Object.keys(DICTS)
      .filter((locale) => locale !== page.locale)
      .map((locale) => `<meta property="og:locale:alternate" content="${OG_LOCALE[locale]}" />`),
  ].join('\n    ')

  const html = template
    .replace('<html lang="en">', () => `<html lang="${page.locale}">`)
    .replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.description)}${b}`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.title)}${b}`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.description)}${b}`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.title)}${b}`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, (_, a, b) => `${a}${esc(page.description)}${b}`)
    .replace('<!--alternates-->', () => alternates)
    .replace('<!--jsonld-->', () =>
      page.ld ? `<script type="application/ld+json">${jsonLdFor(DICTS[page.locale], page.locale)}</script>` : '',
    )
    .replaceAll('"__SITE_URL__/"', `"${url}"`)
    .replaceAll('__SITE_URL__', site)

  mkdirSync(dirname(resolve(dist, page.out)), { recursive: true })
  writeFileSync(resolve(dist, page.out), html)
  console.log(`prerendered ${page.path} (${(html.length / 1024).toFixed(1)} KB)`)
}

// robots.txt: everything is open. Search engines and AI crawlers are named
// one by one, so nobody has to guess whether they are welcome.
const CRAWLERS = [
  'Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot', 'YandexBot',
  'Google-Extended', 'Applebot-Extended',
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'CCBot', 'Meta-ExternalAgent', 'Amazonbot', 'cohere-ai', 'MistralAI-User', 'YouBot',
]
writeFileSync(
  resolve(dist, 'robots.txt'),
  [
    '# Tidence welcomes search engines and AI assistants. Everything here is public.',
    `# A plain-text summary for language models: ${site}/llms.txt (full text: ${site}/llms-full.txt)`,
    '',
    ...CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n'),
)

// sitemap.xml with each page's language pair, so search engines link /en and
// /es as translations of one another.
const lastmod = new Date().toISOString().slice(0, 10)
const urls = pages
  .map((p) =>
    [
      '  <url>',
      `    <loc>${site}${p.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      ...Object.keys(DICTS).map(
        (locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${site}${pathFor(locale, p.doc)}" />`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${pathFor('en', p.doc)}" />`,
      '  </url>',
    ].join('\n'),
  )
  .join('\n')
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)

// llms.txt (llmstxt.org): a short Markdown summary for language models, with
// links. llms-full.txt: the whole site's text, both languages, in one file.
// Both are generated from the site copy, so they always match the page.
const flat = (text) => String(text).replace(/\s*\n\s*/g, ' ').trim()
const servicesMd = (dict) =>
  SERVICE_KEYS.map((key) => {
    const item = dict.services.items[key]
    const examples = item.examples ? ` Examples: ${item.examples.join(', ')}.` : ''
    return `- **${item.kind}: ${item.title}.** ${item.text}${examples}`
  }).join('\n')
const stagesMd = (dict) =>
  Object.values(dict.journey.stages)
    .map((stage, i) => {
      const out = stage.out ? ` You get: ${stage.out.join(', ')}.` : ''
      return `${i + 1}. **${stage.title}** (${stage.kicker}). ${stage.text}${out}`
    })
    .join('\n')
const contactMd = [
  '- Email: tidencestudio@gmail.com',
  '- WhatsApp: +1 (829) 731-4605 (https://wa.me/18297314605)',
  '- Instagram: @tidence.dev (https://www.instagram.com/tidence.dev/)',
  `- Enquiry form: ${site}/en#start (English), ${site}/es#start (Spanish)`,
].join('\n')

const llms = [
  '# Tidence',
  '',
  `> ${en.meta.description} A two-person studio (Alexander Ross and Bryan De Jesus): you talk directly to the people writing the code. Works in English and Spanish.`,
  '',
  'Tidence builds websites, CRMs, office automation and small custom tools for small and medium businesses. Every project goes through seven stages, from a first conversation to ongoing support, and is agreed in writing before work starts. The name comes from the tide: software that runs quietly, every day.',
  '',
  '## Pages',
  '',
  `- [Home, English](${site}/en): what we build, how we work, who we are, and how to start a project`,
  `- [Inicio, español](${site}/es): the same site in Spanish`,
  `- [Privacy policy](${site}/en/privacy) ([español](${site}/es/privacy))`,
  `- [Terms of service](${site}/en/terms) ([español](${site}/es/terms))`,
  '',
  '## Services',
  '',
  servicesMd(en),
  '',
  '## Contact',
  '',
  contactMd,
  '',
  '## Optional',
  '',
  `- [Full text of the site, English and Spanish](${site}/llms-full.txt)`,
  `- [Sitemap](${site}/sitemap.xml)`,
  '',
].join('\n')
writeFileSync(resolve(dist, 'llms.txt'), llms)

const fullFor = (dict, locale) =>
  [
    `# Tidence (${locale === 'en' ? 'English' : 'Español'}): ${site}/${locale}`,
    '',
    `${flat(dict.hero.lead)} ${flat(dict.hero.em)} ${flat(dict.hero.strong)}`,
    dict.hero.sub,
    '',
    `## ${dict.form.title}`,
    '',
    dict.start.lead,
    '',
    `## ${dict.services.eyebrow}: ${flat(dict.services.title)}`,
    '',
    dict.services.lead,
    '',
    servicesMd(dict),
    '',
    `## ${dict.journey.eyebrow}: ${flat(dict.journey.title)}`,
    '',
    dict.journey.lead,
    '',
    stagesMd(dict),
    '',
    `## ${dict.journal.eyebrow}: ${flat(dict.journal.title)}`,
    '',
    `### ${dict.journal.feature.title}`,
    '',
    dict.journal.feature.intro,
    '',
    dict.journal.feature.body.join('\n\n'),
    '',
    `> ${dict.journal.feature.quote}`,
    '',
    Object.values(dict.journal.posts)
      .map((post) => `### ${post.title}\n\n${post.text}`)
      .join('\n\n'),
    '',
    `## ${dict.nav.contact}`,
    '',
    `${dict.contact.sloganA} ${dict.contact.sloganB} ${dict.contact.lead}`,
    '',
    contactMd,
    '',
  ].join('\n')
writeFileSync(resolve(dist, 'llms-full.txt'), `${fullFor(en, 'en')}\n---\n\n${fullFor(es, 'es')}`)

console.log(`site: ${site}`)
