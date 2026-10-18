# Tidence — design workspace

`app/` is the live Vite + React source. `reference/` holds the earlier
static HTML explorations, kept for history — not part of the build.

## Structure

```
app/                 Vite + React app (current source of truth)
  src/
    components/
      TidenceMark.jsx anchor-T brand mark, gradient stops from CSS tokens
      Nav.jsx         logo left, plain nav elements from center to right
      Hero.jsx        photo-background hero, English copy, left-aligned
      Services.jsx    3-column services strip
      Footer.jsx
    App.jsx           assembles Hero + Services + Footer
    index.css         CSS variables for the ocean palette
  public/
    favicon*.png      brand favicon (from the guideline deck)
    wave-sunset-*.avif/webp  hero photo at 640/960/1600 px; og.jpg is the share image

reference/            historical reference only, not built
  logo/
    tidence_logo_v5_oneline.html   original wave mark, orange accent
    tidence_logo_v6_ocean.html     same mark, ocean color palette
  landing/
    tidence_landing_v1_home.html
    tidence_landing_v2_hero_inspired.html
    tidence_landing_v3_hero_photo.html
    assets/wave-sunset.jpg
```

## Running the app

```
cd app
npm install
npm run dev
```

Note: if `npm install` skips `vite` itself, it's because `NODE_ENV=production`
is set in this shell, which makes npm omit devDependencies by default.
`app/.npmrc` sets `include=dev` to override this.

## Brand

- Guideline: `Tidence-Brand` (2026), "Transformative Teal". Folded-anchor mark, lowercase `tidence` wordmark.
- Palette: Foam `#F2FFFA`, Spray `#7FF5D8`, Lagoon `#13C2B0`, Current `#0E8C86`, Reef `#00737A`, Deep `#00434A`, Trench `#00191C`, Abyss `#070F12`
- Fonts: Bricolage Grotesque (wordmark, headlines, body) / DM Mono (data, labels) / Newsreader (journal only)
- Mark: `app/src/components/TidenceMark.jsx`; exports in `brand/`

## Enquiry form

The hero form posts to [Web3Forms](https://web3forms.com), which relays each
submission to the studio inbox. Set `VITE_WEB3FORMS_KEY` (see
`app/.env.example`) in the Vercel project's environment variables and
redeploy. Without a key, or if the request fails, the form falls back to
opening the visitor's email app with the message already written. Contact
handles (email, WhatsApp, Instagram) live in `app/src/contact.js`.

## Open threads

- Info page (portfolio/case studies + team) not yet built
- Services strip copy still placeholder

## Build and SEO

`npm run build` (in `app/`) runs three steps: the client build, an SSR build of
`src/entry-server.jsx`, and `scripts/prerender.mjs`, which renders `/`,
`/privacy` and `/terms` to static HTML (stylesheet inlined), then writes
`robots.txt` and `sitemap.xml`. The client hydrates that HTML; a Spanish reader
gets a normal client render instead. The canonical origin comes from `SITE_URL`,
else Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, else `https://tidence.vercel.app`.
Fonts are self-hosted in `src/fonts`; Newsreader loads only when the journal
section nears the viewport.
