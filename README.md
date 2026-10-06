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
    favicon.svg       wave mark favicon
    wave-sunset.jpg   hero background photo

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

## Open threads

- Info page (portfolio/case studies + team) not yet built
- Services strip copy still placeholder
