# Tidence brand guide

The one document to read before making anything with the Tidence name on it:
ads, videos, presentations, Instagram posts, documents. Self-contained; no
other file is required. Source of truth for the visual identity is the deck
`/Users/it/Downloads/Tidence-Brand.pptx` ("Brand Identity · 2026"); this guide
restates it in full and adds the rules learned while building the website.

Last updated: 2026-10-06.

---

## 1. Who Tidence is

- A two-person digital studio. Alexander Ross (front end, data, security) and
  Bryan De Jesus (backend systems, APIs).
- Builds **websites, CRMs and business automation**: the everyday tools a
  business runs on. Also dashboards, bots, internal tools, integrations.
- The differentiator, and the line every piece of content should carry in
  some form: **you talk to the people writing the code.** No project manager,
  no handoff, no junior inheriting the build halfway through.
- The name comes from the tide: steady, recurring work that keeps moving
  whether or not anyone is watching. Software should run quietly, every day,
  and keep running.
- Based in Bolivia; works in Spanish and English. Clients are small and
  medium businesses that would rather spend their hours on the work only they
  can do.

### Lines already in use (reuse these before writing new ones)

| Use | English | Spanish |
|---|---|---|
| Headline | We build the tools your business runs on. | Construimos las herramientas con las que funciona tu negocio. |
| Subhead | Websites, CRMs and the automations that quietly run your office. Designed, built and looked after by one team, start to finish. | Sitios web, CRMs y las automatizaciones que mueven tu oficina en silencio. Diseñado, construido y cuidado por un solo equipo, de principio a fin. |
| Manifesto | Most businesses buy software off the shelf and then spend years working around it. **We build around you.** | La mayoría compra software genérico y pasa años adaptándose a él. **Nosotros construimos alrededor de ti.** |
| Closing slogan | Imagine it. We build it. | Imagínalo. Lo construimos. |
| Quote | Built to be used, not shown. | Hecho para usarse, no para mostrarse. |
| Primary CTA | Start a project | Empezar un proyecto |
| Secondary CTA | Take the journey / See the work | Hacer el recorrido |
| Services | Websites that do work · Your clients, in one place · The work that does itself · Small tools, big hours back | |
| Process (7 stages) | Listen · Map · Design · Build · Connect · Launch · Support | Escuchar · Mapear · Diseñar · Construir · Conectar · Lanzar · Soporte |
| What we will not do | Sell you a template as a custom build. Lock you out of your own code. Ship anything we have not tested on a real phone and checked for security first. | |

### Voice

- Plain, specific, confident. Short sentences. Active voice.
- Sentence case everywhere, including headlines. Never Title Case.
- Spanish addresses the reader as **tú**, never usted: the whole pitch is that
  you talk to the two of them directly.
- **No em-dashes or en-dashes** anywhere. Use a full stop, a colon or a comma.
- No exclamation marks. No "Oops". No AI clichés: never "elevate", "seamless",
  "unleash", "next-gen", "game-changer", "empower", "delve", "in the world of".
- Talk about what the software does for the client's Monday morning, not
  about technology. Name the task that disappears.
- Numbers in copy should be real and specific (47 minutes, 3 spreadsheets),
  never round marketing numbers (100%, 10x).

---

## 2. Colour: "Transformative Teal"

Eight named colours. The ground is always Abyss; type is always Foam.

| Name | Hex | Role |
|---|---|---|
| **Foam** | `#F2FFFA` | All body and headline type on dark. Mark bar start. |
| **Spray** | `#7FF5D8` | Labels, hover states, highlights. Mark bar end. |
| **Lagoon** | `#13C2B0` | The accent: buttons, links, the progress line. Mark stem start. |
| **Current** | `#0E8C86` | Gradients only. Too dark for small text on Abyss (4.7:1). |
| **Reef** | `#00737A` | Mark stem end. Gradient mid-tones. |
| **Deep** | `#00434A` | Icon gradient end. Accent on light grounds (10.8:1 on Foam). |
| **Trench** | `#00191C` | Card surfaces. The mark's shadow fold. The mark on gradient icons. |
| **Abyss** | `#070F12` | Background. Never pure black. |

Neutrals: muted text `#B8D4CE`, dim text `#9FBDB6`, hairline `#1C2B2E`,
stronger hairline `#2B4145`.

### Sunlit, the counter-accent (added for the website, approved)

`#EDC27A`, a sand-gold: sunlight on the water. Exists because an all-teal page
read as blue end to end. Rules:

- **Use it for:** icons, numerals, bullets, one emphasised phrase, drop caps,
  quote marks, small decorative marks.
- **Never for:** buttons, links, anything clickable. It is decoration, not
  affordance. Teal always owns the interactive layer.
- Keep it under roughly 5% of any composition. If a layout starts to look
  gold, it has too much.

### Contrast (verified)

Foam on Abyss 18.8:1 · Spray on Abyss 14.7:1 · Lagoon on Abyss 8.6:1 · Sunlit
on Abyss 11.6:1 · Deep on Foam 10.8:1 · Reef on Foam 5.5:1. Every text pair
on the site clears 7:1.

### Gradients

| Name | Stops | Where |
|---|---|---|
| Bar | Foam → Spray | The mark's top bar |
| Stem | Lagoon → Reef | The mark's stem and anchor |
| Icon | Spray → Current → Deep, at 135° | App icons, lockup panels, ad backgrounds |

Gradients carry a fine film grain (ink speckle, light). Never a smooth
untextured gradient on a large surface.

---

## 3. The mark: "the folded anchor"

A T made from hard-edged planes with an anchor at its base. A single shadow
fold (Trench) sits where the bar meets the stem. Film grain gives the flat
gradients the texture of the sea.

- Bar: Foam → Spray gradient. Stem and anchor: Lagoon → Reef. Fold: Trench.
- On the gradient icon and gradient lockups, the mark is solid Trench.
- On Foam (light) grounds, the bar starts a step into mint so it does not
  vanish.
- Clear space: the height of the bar on all sides. Minimum size: 24px on
  screen, 8mm in print.
- **Use the files as supplied. Never redraw, recolour outside the palette,
  rotate, outline, or add effects.** (A redrawn favicon was rejected once.)

### Wordmark

`tidence`, lowercase, **Bricolage Grotesque 800**, tracked tight
(`-0.05em`). In the lockup the mark sits left of the word, optically level
with the top of the bar, with a gap of about a third of the word's height.

The website's opening title card sets it as `Tidence`, capital T, weight 500,
wide tracking (`+0.12em`). That is a title-card treatment for that one
moment, not the logo.

### Asset files (`/Users/it/tidence-design/brand/`)

| File | What |
|---|---|
| `mark.svg` | The mark alone, gradient, with grain |
| `icon-gradient.png` | **Primary app icon** and the site favicon: Trench mark on the icon gradient, 1024px |
| `icon-abyss.svg` | Gradient mark on an Abyss tile |
| `icon-foam-mark.svg` | Foam mark on the icon gradient |
| `favicon.png` | 512px copy of the primary icon |
| `lockup-on-gradient.svg` | Mark + wordmark on the icon gradient |
| `lockup-on-foam.svg` | Mark + wordmark on Foam |
| `wordmark-on-gradient.svg` | Wordmark alone on the icon gradient |
| `../app/public/wave-sunset-1600.webp` (also `.avif`, and 640/960 widths) | The hero photograph (sunset wave) |
| `../app/src/fonts/` | Bricolage Grotesque and DM Mono as woff2, for tools that need font files |

The lockup SVGs set the wordmark as live text in Bricolage Grotesque 800:
outline it in a vector editor before sending it anywhere the font is not
installed. The deck's own PNG exports (in the .pptx under `ppt/media/`) are
the safest files for video and print.

---

## 4. Typography

| Role | Face | Weight | Tracking | Notes |
|---|---|---|---|---|
| Display | Bricolage Grotesque | 800 | `-0.045em` | 144px in the deck; line-height 0.92 |
| H1 | Bricolage Grotesque | 800 | `-0.04em` | 80px; line-height 1.0 |
| H2 | Bricolage Grotesque | 700 | `-0.03em` | 52px; line-height 1.06 |
| Body | Bricolage Grotesque | 400 | 0 | 30px in the deck, 17px on the web; line-height 1.6 |
| Label / data | DM Mono | 400 | `+0.1em` | **Uppercase**, in Spray, often preceded by a 2rem hairline rule |
| Editorial (web journal only) | Newsreader | 300–400, italic | | The one serif. Not for ads, decks or posts. |

Both main faces are free on Google Fonts: "Bricolage Grotesque" (variable,
opsz 12–96, wght 200–800) and "DM Mono" (300/400/500). The woff2 files are
also in the repo at `app/src/fonts/`. Bricolage has no
italic; do not fake one. Hierarchy comes from weight and size, never colour
alone.

Type scale for the web: 14 · 17 · 19 · 22 · 28 · 52 · 80 · 144.

---

## 5. Layout and surfaces

- **Radius 0 everywhere.** Buttons, cards, tags, images, inputs: hard right
  angles. The only curves are the ones drawn in the mark.
- Hairlines, not boxes. Separate things with 1px rules and space; cards are
  rare and sit on Trench.
- Dark ground always. A light (Foam) composition is allowed for a single
  piece, never mixed into a dark set.
- Asymmetry is the house style: offset columns, one element hung right,
  oversized outlined numerals (`01`–`07`) in Sunlit or a hairline.
- Texture: a faint dot lattice (26px pitch) and film grain over the whole
  surface. Never a flat, untextured Abyss.
- Buttons: Lagoon fill, Abyss text, DM Mono, no radius. Hover: Spray.
- Labels: DM Mono uppercase in Spray with the short rule before them, e.g.
  `—— WHAT WE BUILD`.

### Motion

- Easing `cubic-bezier(0.16, 1, 0.3, 1)`. Enter 600ms, exit 380ms, hover
  200ms. Long scroll glides 0.9–1.8s.
- Motion is the tide: things arrive, settle and keep moving slowly; nothing
  bounces, spins or flashes. Reveals come from the side the element sits on.
- No dither, pixelation or glitch effects. (The site had a dithered hero; it
  was removed as an effect for its own sake.)

### Imagery

- Photographs in their **natural colour** with a light shared grade
  (`saturate 0.85, contrast 1.04`). **No teal tint, no duotone, no
  black-and-white.** The sunset wave is the one hero image; its warm sun is
  what Sunlit picks up.
- Subjects: real work, not stock-office clichés. A laptop with a real site on
  it, two people at one screen, a spreadsheet being worked, hands on a phone
  paying, a plan in a notebook. No handshakes, no "diverse team" posed shots,
  no 3D abstract blobs.
- Images are edge-to-edge or sit in a hairline frame; never rounded, never
  drop-shadowed.

---

## 6. Ready-made specs

### Instagram (`@tidence.dev`)

- Profile picture: `icon-gradient.png`.
- Name field: `tidence | web, CRMs & automation`. Category: Software company.
- Link: https://tidence.vercel.app
- Bio (132 chars):
  ```
  We build the tools your business runs on.
  Websites · CRMs · Automation
  A two-person studio. You talk to the people writing the code.
  ```
  Spanish alternative:
  ```
  Sitios web, CRMs y la automatización que mueve tu oficina.
  Diseñado, construido y cuidado por un equipo de dos.
  Empieza un proyecto ↓
  ```
- Posts: 1080×1350 (4:5) on Abyss. 80px safe margin. Headline Bricolage 800
  Foam, 72–96px, tracked tight, sentence case. Label line above in DM Mono
  uppercase Spray with the short rule. Small lockup bottom-left or a solid
  Foam mark bottom-right, 56px. Grain over everything. One Sunlit numeral or
  icon at most.
- Stories / Reels: 1080×1920. Keep text inside the middle 1080×1420 (Instagram
  covers the top 250px and bottom 250px with UI).
- Carousels: first slide is the claim, last slide is the lockup plus
  `tidence.vercel.app` and `@tidence.dev`.

### Video

- 1920×1080 or 1080×1920, Abyss ground. Lower-third labels in DM Mono
  uppercase Spray; titles Bricolage 800 Foam. Watermark: Foam mark, 48px,
  bottom-right, 60% opacity.
- Opening: the wordmark title card (capital-T treatment allowed here, as on
  the site) over the sunset wave or over the icon gradient with grain.
- End card: lockup on the icon gradient (`lockup-on-gradient.svg`), then
  `tidence.vercel.app` and `@tidence.dev` in DM Mono.
- Music and pacing: slow, steady, like a tide. Cuts on the easing above; no
  whip pans, no glitch transitions.

### Presentations

- Abyss slides, Foam type, one Lagoon accent, Sunlit numerals for section
  numbers. Section labels as `01 — THE MARK` style in DM Mono, Spray. The
  deck `Tidence-Brand.pptx` is the reference layout.
- Light slides (Foam ground, Abyss type, Deep accent) are allowed for a
  whole deck, not mixed.

---

## 7. Contact

- Email: tidencestudio@gmail.com
- Instagram: https://www.instagram.com/tidence.dev/
- Website: https://tidence.vercel.app (English and Spanish; `/privacy`,
  `/terms`)
- WhatsApp: not yet published.

---

## 8. Bans, in one list

Pure black or white · a second blue/teal hue · gold on anything clickable ·
rounded corners · drop shadows on images · em-dashes · Title Case ·
exclamation marks · AI-cliché verbs · stock handshakes · teal-tinted or
duotone photos · dither or glitch effects · redrawn logos · fake italics ·
usted in Spanish copy.
