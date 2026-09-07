# Tidence — design workspace

`app/` is the live Vite + React source. `logo/` and `landing/` are the
earlier static HTML explorations, kept as design history/reference.

## Structure

```
app/                 Vite + React app (current source of truth)
  src/
    components/
      WaveLogo.jsx    the tilted wave mark, color as a prop
      Nav.jsx         logo left, plain nav elements from center to right
      Hero.jsx        photo-background hero, English copy, left-aligned
      Services.jsx    3-column services strip
      Footer.jsx
    App.jsx           assembles Hero + Services + Footer
    index.css         CSS variables for the ocean palette
  public/
    wave-sunset.jpg   hero background photo

logo/                 reference only
  tidence_logo_v5_oneline.html   original wave mark, orange accent
  tidence_logo_v6_ocean.html     same mark, ocean color palette

landing/              reference only
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
`app/.npmrc` sets `omit=` to override this, but if you ever see
"'vite' is not recognized", run `npm install --include=dev` once.

## Brand

- Fonts: Fraunces (serif, headlines) / Space Grotesk (sans, body + nav)
- Ocean palette: foam `#F5F8F7`, teal `#2E8B93`, navy `#123240`, slate `#7C99A0`
- Wave mark: single tilted stroke path, kept intentionally asymmetric

## Open threads

- Info page (portfolio/case studies + team) not yet built
- Services strip copy still placeholder
