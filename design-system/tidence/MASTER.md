# Tidence — Design System (Master)

Global source of truth. Page overrides live in `pages/<page>.md` and win over this file.

## Design Read

Creative studio portfolio for prospective clients and technical recruiters, with a dark
editorial / tidal language, leaning toward native CSS + scroll-driven animation +
a variable grotesque display face.

**Mode:** Redesign — overhaul. Content and IA preserved, visual language rebuilt.

## Dials

| Dial | Value | Reasoning |
|---|---|---|
| `DESIGN_VARIANCE` | 7 | Studio portfolio, overhaul (+2 over the existing site's ~5). Asymmetric grids, offset type. Not Awwwards-chaotic — the work has to stay readable. |
| `MOTION_INTENSITY` | 7 | The brand is a tide. Motion is the brand. Scroll-driven, never decorative. |
| `VISUAL_DENSITY` | 4 | Matches the existing site. Marketing page, not a dashboard. |

## Theme

**Light and dark, both supported.** An earlier revision locked the page to dark
only; that was overridden on request, and light was then designed as its own
palette rather than produced by inverting the dark one.

Default follows `prefers-color-scheme`. A manual choice persists in
`localStorage` under `tidence-theme` and, once made, stops following the system.
A synchronous boot script in `index.html` writes `data-theme` before first paint,
so the page never renders in the wrong theme and flips. There is no
`prefers-color-scheme` CSS fallback because this is a React app that renders
nothing without JS.

**Media surfaces do not follow the theme.** The hero is a photograph of a dark
wave in both modes, so its stage, scrim, copy and CTA use a separate token group
(`--on-media`, `--on-media-muted`, `--accent-on-media`, `--on-accent-media`,
`--scrim`) that is fixed across themes. Inverting it in light mode would put
white headline type onto a pale page, and a scrim heavy enough to rescue dark
type would wash the photograph out. The nav takes those same media colours while
it floats over the hero and returns to the theme once it lifts past it.

## Revision: Clean imagery and a warm counter-accent. Supersedes below.

**Hero is a clean photograph.** The dither (veil, photodither and dither
modes), the WebGL shader and the teal colour-blend tint are all gone, and
`@paper-design/shaders-react` is uninstalled. The image runs in its own colour
with a light grade (contrast 1.04, brightness 0.96). The scrim stays, for
legibility only.

**Photographs keep their colour.** The greyscale-plus-teal duotone is removed.
Every photo shares one light grade (`saturate(0.85) contrast(1.04)`) and goes
to full saturation on hover.

**Sunlit, the counter-accent.** `--sun: #EDC27A`, a sand-gold, sunlight on the
water: 11.6:1 on Abyss, 9.7:1 on the raised surface. Teal kept the page
reading blue end to end, so the work is now split:
- **Teal (Lagoon/Spray):** brand and every interactive state. Buttons, links,
  nav underline, language switch, progress line, labels, the manifesto
  resolve, the slogan.
- **Sunlit:** small marks only. Icons (services, contact channels), numerals
  (notes, legal sections, journey stages and their outline fill), bullets,
  marquee dots, the hero emphasis (it picks up the sun in the photograph), and
  the journal's drop cap, masthead italic, quote mark, caption key and end
  mark.
- **Never Sunlit:** buttons, links, focus rings. It is decoration, not
  affordance.

**Sonar dots are neutral.** The background field draws in `--fg-dim` instead
of teal; it was the largest single source of blue on the page.

This is an addition to the guideline's palette, at the client's request; the
guideline itself is all teal.

## Revision: Brand guideline applied (Tidence-Brand, 2026). Supersedes below.

Source: `Tidence-Brand.pptx`. Where this section disagrees with any older
section, this one wins.

**Palette, named.** Exposed as tokens (`--foam` … `--abyss`); components use
the role tokens, not these.

| Name | Hex | Role on the site |
|---|---|---|
| Foam | `#F2FFFA` | `--fg`, mark bar start |
| Spray | `#7FF5D8` | `--accent-hover`, labels, mark bar end |
| Lagoon | `#13C2B0` | `--accent`, mark stem start |
| Current | `#0E8C86` | gradients only (4.7:1 on Abyss, never small text) |
| Reef | `#00737A` | mark stem end |
| Deep | `#00434A` | icon gradient end |
| Trench | `#00191C` | `--surface`, mark fold, mark on gradient icons |
| Abyss | `#070F12` | `--bg` |

Neutrals from the deck: muted text `#B8D4CE` (12.3:1 on Abyss), hairline
`#1C2B2E`. Text floor is dim on surface-2 at 8.05:1.

**Gradients.** Bar Foam → Spray. Stem Lagoon → Reef. Icon Spray → Current →
Deep (`--gradient-icon`). Film grain on brand exports is ink speckle merged
over the fill, kept light (blended grey noise desaturated the teal).

**Type.** Bricolage Grotesque for the wordmark, headlines and body; DM Mono
for data and labels. Geist and IBM Plex Mono are retired. Scale and tracking
from the deck, scaled for the web:

| Role | Weight | Deck size | Web | Tracking |
|---|---|---|---|---|
| Display | 800 | 144 | `--step-display`, slogan | `-0.045em` |
| H1 | 800 | 80 | `--step-6` | `-0.04em` |
| H2 | 700 | 52 | `--step-5`, statements | `-0.03em` |
| Body | 400 | 30 | `--step-0` | default |
| Wordmark | 800 | | | `-0.05em` |
| Label | DM Mono 400 | | uppercase, Spray | `+0.1em` |

The journal keeps Newsreader as its one sanctioned exception. Bricolage ships
no italic, so the few italic UI strings outside the journal are synthesised.

**Exports in `brand/`.** `mark.svg`, `icon-gradient.svg` (primary),
`icon-abyss.svg`, `icon-foam-mark.svg`, `favicon.svg` (flat Spray mark on
Abyss, also `app/public/favicon.svg`), `lockup-on-gradient.svg`,
`lockup-on-foam.svg`, `wordmark-on-gradient.svg`. Lockup text is live
Bricolage 800; outline it before using it anywhere the font is not installed.

## Revision: Journal voice, legal pages, contact channels

**The journal speaks in a serif.** The rest of the page pitches in Geist; the
journal tells a story, so it changes voice to **Newsreader** (`--font-editorial`),
an editorial face with optical sizes, used only inside `.journal`. The spread
is set like a magazine:
- a masthead title in light display weight, its second line in italic mint
- a mono running head ruled above and below, with slashes between its parts
- an italic dek
- the body in the text cut, with old-style figures, hyphenation and indented
  paragraphs instead of gaps
- a small-caps opening line into a three-line drop cap (`initial-letter`
  where supported, a float elsewhere)
- a hung, ruled italic pull quote
- a square end mark, the shape of the mark's bar
- an "Fig. 1" mono key on the caption
- a contents-style notes index with large italic numerals

Metadata stays in IBM Plex Mono.

**Legal pages.** `/privacy` and `/terms`, bilingual, from `prefs/legal.{en,es}.js`.
Routing is a path lookup in `App.jsx` (two pages do not justify a router);
`vercel.json` rewrites both paths to `index.html`. The privacy policy describes
what the site actually does: no forms, analytics or tracking cookies; one
localStorage key (`tidence-lang`); Vercel, Google Fonts and Picsum loaded as
third parties. **If the site ever adds a form, analytics or a newsletter, the
policy must change with it.** The copy is a sensible draft, not legal advice;
it names no governing law and should be reviewed before relying on it.

**Contact.** Email `tidencestudio@gmail.com`, Instagram `@tidence.dev`.
WhatsApp still renders as "coming soon". The footer's "Elsewhere" column was
removed; the footer is now brand, sections and legal.

## Revision: Transformative Teal rebrand (supersedes palette, type and mark)

Source: the 7a "Transformative Teal" brand sheet. Every colour, the mark and the
type below replace the earlier values. Layout, motion, IA and the single dark
theme are unchanged.

**Palette.** foam `#F2FFFA`, mint `#7FF5D8`, teal `#13C2B0`, deep `#00434A`,
ink `#070F12`. The page is set on ink, as the sheet is.

| Role | Value | On bg | On surface | On surface raised |
|---|---|---|---|---|
| Background | `#070F12` (ink) | | | |
| Surface | `#0C1A1E` | | | |
| Surface raised | `#12272C` | | | |
| Foreground | `#F2FFFA` (foam) | 18.84 | 17.31 | 15.13 |
| Muted foreground | `#BCD6CF` | 12.58 | 11.55 | 10.10 |
| Dim foreground | `#9FBDB6` | 9.60 | 8.82 | 7.71 |
| Accent | `#13C2B0` (teal) | 8.63 | 7.93 | 6.93 |
| Accent hover / highlight | `#7FF5D8` (mint) | 14.69 | 13.50 | 11.80 |
| On accent | `#070F12` | 8.63 on teal, 14.69 on mint | | |
| Media scrim | `#070F12` | | | |

Floor is teal on surface raised at 6.93:1, up from 6.25. Surfaces step toward
deep rather than toward grey. Mint is the hover state and the hero emphasis;
it is the same hue family as teal, so the one-accent rule still holds. Deep is
used inside the mark and the wordmark ramp; it is too dark to carry text on ink.

**Mark.** An anchor drawn as a T: a foam-to-mint bar over a sea-green stem
(`#52B1A5` to `#2F6F76`), with a dark fold (`#03171A`) where they meet.
`TidenceMark.jsx` holds the geometry, traced from the sheet and symmetrised;
stop colours are CSS tokens (`--mark-*`). It replaces the wave mark in the
nav, footer, favicon and `brand/`. The closed hero plate carries the lowercase
wordmark alone, with no mark, by request.

**Wordmark.** Lowercase `tidence`, Geist 700, tracked `-0.055em`. The footer
outline uses `-0.012em` instead, since tighter outlines cross.

**Type.** Goudy Bookletter / Fanwood / JetBrains Mono are replaced by **Geist**
(display 600 with `--track-display: -0.035em` and 1.04 leading; body 400) and
**IBM Plex Mono** (labels, buttons), matching the sheet. Geist ships real
weights, so `font-synthesis-weight: none` and the size-only hierarchy rule are
retired. Marquee italics are synthesised oblique; Geist has no italic.

**Brand files.** `brand/` previously held three 6-byte files that were not
valid SVG. They are now the dark icon, light icon and horizontal lockup. The
lockup's wordmark is live text: outline it before sending it anywhere Geist is
not installed.

## Revision: Deep water (single dark theme), sonar background

**One theme only: dark ground, light text, high contrast.** The light theme and
the toggle were removed. Rather than offering a second palette for legibility,
the dark one was retuned so every text pair clears 6.25:1 and most clear AAA:
the ground went a step deeper and the text tokens a step brighter. The
previous dark floor was 4.61:1. The native scrollbar is hidden; a 3px accent
progress line on the right edge stands in for it.

| Role | Value | On bg | On surface | On surface raised |
|---|---|---|---|---|
| Background | `#0F1E24` | | | |
| Surface | `#172B33` | | | |
| Surface raised | `#203A44` | | | |
| Foreground | `#F3F8F7` | 15.90 | 13.70 | 11.19 |
| Muted foreground | `#C0D1D4` | 10.81 | 9.31 | 7.61 |
| Dim foreground | `#A9BFC4` | 8.88 | 7.65 | 6.25 |
| Accent | `#6FD8CD` | 10.05 | 8.66 | 7.07 |
| Accent hover | `#95E6DD` | 11.89 | 10.24 | 8.37 |
| On accent | `#06171B` | 10.8 on accent | | |
| Media scrim | `#0C191E` | | | |

The colour tables further down describe earlier revisions and are superseded
by this one.

**Page background: SonarGrid** (ported from 21st.dev to plain JSX). A fixed
canvas dot field behind all content, drawn in `--accent`, sending rings out on
a timer and wherever the reader clicks. It replaced the static CSS dot lattice.
Text on the open page carries a halo in `--bg` so a passing ring never sits
inside the glyphs; transparent-fill type (slogan, outlined numerals, marquee)
opts out. Reduced motion renders the still grid only.

## Color

One accent per theme. Teal is inherited brand equity, retuned per mode so it
clears AA on its own ground.

| Role | Dark | Light |
|---|---|---|
| Background | `#122229` | `#F2F6F5` |
| Surface | `#1B3038` | `#FFFFFF` |
| Surface raised | `#24404A` | `#E7EFEE` |
| Foreground | `#EAF1F0` | `#0E1C21` |
| Muted foreground | `#A2B8BD` | `#4A6068` |
| Dim foreground | `#93ACB3` | `#5A7078` |
| Accent | `#5CC9BE` | `#12727A` |
| Accent hover | `#7AD7CE` | `#0E5F66` |
| On accent | `#07191C` | `#FFFFFF` |
| Media scrim | `#0E1B21` | `#0E1B21` |

**The dark theme was lifted about 2.3x in luminance** from an original near-black
(`#0B1417`), which read as heavy rather than deep. Surfaces were separated
further so cards sit off the page instead of dissolving into it, and the muted
text and hairlines were raised to keep their weight against the lighter ground.

Lifting the background costs contrast, so the text tokens were raised further
than the ground was: the dark floor **improved** from 4.63:1 to 5.76:1 while the
page got lighter. The media scrim lifted with it, only by a step, because left at
the old near-black it opened a visible seam between the hero and the page below.

The original brand teal `#2E8B93` reaches only 3.69:1 on a light ground and fails
AA, which is why light deepens to `#12727A` (5.19:1). The generator's `#EC4899`
pink and `#0891B2` cyan were rejected outright: no relationship to the wave mark
or the name.

**Verified in-page, not on paper.** A canvas-based audit resolves every computed
colour (including the `oklab()` values `color-mix` produces, which no regex
parses) and composites the real background stack. 25 text selectors, both themes,
zero failures. Floors: **5.76:1 dark, 4.79:1 light**.

**Locked:** one accent per theme, no second hue anywhere, including states.

## Typography

An old-style literary stack. Serif is used here because the client named the
faces directly; neither is one of the banned LLM-default display serifs.

| Role | Face | Notes |
|---|---|---|
| Display | **Goudy Bookletter 1911** | Wide set width, long extenders. Single weight (400). |
| Body | **Fanwood Text** | Roman + true italic. Single weight (400). |
| Mono | **JetBrains Mono** | Labels, tags, buttons, tabular figures. 400/500. |

**Neither serif ships a bold.** Hierarchy therefore comes from size, colour,
spacing and italic, never from `font-weight`. `font-synthesis-weight: none` is
set globally so the browser cannot smear on a fake bold and so any stray weight
shows up immediately in review. Buttons and labels use JetBrains Mono, which is
the one face in the stack that actually has a 500.

**Fraunces is removed** (named default-serif ban, and it was the old site's face).
Emphasis inside a headline is carried by the accent colour, never by swapping in a
second family and never by a weight the face does not have.

Scale: `14 · 17 · 19 · 23 · 30 · 46 · 62`, lifted one step over a sans-equivalent
because old-style faces run small. Display uses near-zero tracking (`-0.005em`) and
`line-height: 1.12`: Goudy's extenders need the leading, and negative tracking that
suits a grotesque closes it up badly.

Body measure capped at `65ch`. Headlines use `text-wrap: balance`, body `pretty`.

## Hero backdrop

The wave photograph rendered as a two-colour dither, via `ImageDithering` from
`@paper-design/shaders-react` (Apache-2.0, pinned to exactly `0.0.81` because it
is pre-1.0 and the API can move).

Chosen over ocean footage on measurement: **+8 KB gzipped against 3-15 MB** for an
equivalent video, with a perfect loop, no file to source or licence, and the
existing brand asset reused rather than replaced. The wave still reads as a wave;
it simply stops being a photograph.

**Revised: the dither is now a veil, not a replacement.** Full dither read as an
effect for its own sake. The default (`?effect=veil`) shows the graded photograph
with the dithered copy screen-blended over it: about 0.7 opacity on the closed
plate, thinning to 0.16 once the window is open. Phones skip the shader and the
scroll sequence entirely and get a static, full-height opening with the graded
photo. A "Scroll to explore" cue sits at the foot of the stage and fades as soon
as the sequence starts.

Falls back to the graded still for reduced motion, Save-Data, 2G, and any browser
without a WebGL context. `navigator.connection` does not exist in Firefox, so the
data checks are inert there and Firefox always gets the full effect; the optional
chaining means nothing breaks.

Dev-only knobs read from the query string and are not needed in production:
`?effect=photodither|dither|photo`, plus `shape`, `type`, `size`, `steps`,
`scale`, `speed`, `rotation`, `inverted`, `original`.

## Texture

A fixed dot lattice (26px pitch) plus a grain layer, both fixed and
`pointer-events: none`, never on a scrolling container.

The dot language now runs through the whole page rather than sitting only in the
background: the hero is a true luminance dither, project shots are duotoned and
screened through a 4px dot grid, and the person monograms are filled with the
same dot field via `background-clip: text`.

**Project shots are a duotone, not a halftone.** The hero's shader varies its dots
by luminance; a CSS grid cannot, so pushed hard it darkens the picture evenly and
flattens it to a solid block, which is exactly what the first attempt did. Kept
light, the dots tie the cards to the page and the duotone carries the coherence.
They lift to full colour on hover and on focus, because these are screenshots of
real work and a client has to be able to see them.

## Shape

**Radius 0 everywhere. No exceptions.** Buttons, tag pills, the language switch,
the theme control, inputs, cards, media plates and the focus ring are all hard
right angles.

An earlier revision allowed full-pill buttons and tags as a single documented
exception; that was removed on request, which leaves one rule with nothing to
remember. The right angle is already what the hairline rules, the flush grid and
the old-style serif are doing, so the pills were the only element arguing with
the rest of the page.

The only curves left on the site are drawn, not styled: the wave mark's round
stroke caps (brand IP, unchanged) and the loading spinner.

## Spacing

4px base. Section rhythm `--space-section: clamp(6rem, 12vw, 10rem)`. Gutters
`clamp(1.25rem, 5vw, 3rem)`. Container `1280px`.

## Motion

Scroll progress is driven by `useScrollScrub`, which writes `currentTime` on
paused CSS animations. The keyframes stay the single description of the motion;
JS only decides how far through them the page is.

**Why not CSS scroll-driven animations.** `animation-timeline` and `view()` are
Chromium only. Firefox keeps them behind a flag, so the hero silently did not
animate there at all and rendered its static fallback; Safari support cannot be
assumed either. The earlier build was verified only in a Chromium pane, which is
how that went unnoticed. Shipping one hero to Chrome and a different one to
everybody else is not acceptable for a studio's own site, so there is now one
path for every browser.

The loop runs only while the hero track is on screen, gated by
`IntersectionObserver`, and does one layout read per frame with no writes before
it, so nothing thrashes. Interpolation stays with the compositor rather than
being recomputed in JS.

Reveals elsewhere on the page use `IntersectionObserver` plus CSS transitions,
including the Approach word stagger, which was also on a view timeline and had
the same Chromium-only problem. There is no `window.addEventListener('scroll')`
anywhere.

Easing token: `cubic-bezier(.16,1,.3,1)`. Enter 600ms, exit ~380ms, hover/press 200ms.

Every animation must answer "what does this communicate?" in one sentence:
- Hero expand (window opens, wordmark gives way to the proposition, bar and copy arrive) -> storytelling, one cinematic beat.
- Scroll reveals -> pacing down the page.
- Card hover lift, nav underline, wordmark reveal -> feedback.

With no JS, or under `prefers-reduced-motion: reduce`, the `scrub` class is never
added and the whole composition renders finished and ungated.

### Ported components

Both were supplied as Next.js + Tailwind + framer-motion + lucide. This project is
React 19 + Vite + vanilla CSS + Phosphor, so both were rewritten rather than dropped
in. No animation library was added: `motion` would have cost more than the two
effects are worth, right after three.js was removed.

**Scroll-expand hero: a title card you pass through.** The closed window carries
the wordmark alone; the proposition replaces it as the window opens. Sequenced on
one shared timeline: the wordmark recedes and fades by 48%, the headline arrives
by 64%, the lines part from 46% to 78%, and the nav bar, subheading and CTA settle
in between 58% and 88%.

The wordmark layer is `aria-hidden`. The `<h1>` carrying the proposition is in the
accessibility tree the whole time, so a screen reader gets the sentence rather
than the brand name it is standing in front of.

The scrim is on the same timeline, held at 0.35 while the window is closed. It
exists to protect the subheading, and the subheading is not there yet; at full
strength it turned the closed window into a grey rectangle instead of a lit
photograph. Do not reach for `object-position` to solve that: shifting the crop
fixes landscape and breaks portrait, where a 16:9 photo cover-crops to a narrow
centre strip of dark water.

**The gate is deliberate.** The nav bar, the subheading and
the primary CTA all stay hidden until the plate has opened, so the opening reads as moving through
a window into the page rather than as a headline with an image behind it. This is
a requested, reaffirmed design decision and it knowingly trades against the usual
rule that a hero CTA is visible without scrolling: a visitor who never scrolls
never sees the value proposition or the button.

The nav is not a descendant of the track, so `timeline-scope: --expand` on the
root publishes the timeline to it; the bar then reads the same progress as the
plate and arrives with it. It animates opacity only, never transform, because it
is `position: sticky` and that is not worth risking.

Three things keep the gate from becoming an accessibility problem. Everything
stays in the DOM and the accessibility tree, so screen readers reach it whatever
the scroll position. `.expand-copy:focus-within` and `.nav:focus-within` each
cancel the gate outright, so a keyboard user never lands a focus ring on an
invisible control. And the skip link sits outside the nav, so it is reachable on
the very first Tab regardless.

Under reduced motion, or in a browser without scroll-driven animation, the whole
composition renders finished and ungated.

**Scroll-expand hero.** The source hijacked scroll: `preventDefault()` on wheel and
touchmove plus `window.scrollTo(0, 0)` on every scroll event. That disables Page Down,
space, arrow keys, scrollbar dragging and find-on-page, and cannot be opted out of. It
also held scroll progress in `useState`, re-rendering the tree every wheel tick.

Reimplemented as a 280vh track carrying a named `view-timeline`, with a sticky stage.
Native scroll is untouched; the timeline runs in CSS with no listener and no state. The
plate opens by `clip-path`, not by width and height, so the stage never relayouts.
Browsers without scroll-driven animation get the finished full-bleed composition.

**Word reveal (Approach).** Idea taken from the registry's text-reveal family.
The common build fades words up from near-zero opacity, which leaves the sentence
unreadable for most of its time on screen. Here it ramps between two colours that both
clear AA (`--fg-dim` 5.07:1 to `--fg` 15.99:1), so the motion does emphasis instead of
gatekeeping the content. Pure CSS view timeline, no dependency; the stagger is
`animation-range` arithmetic on a per-word `--i`, not a delay per element.

**Footer wordmark.** The source kept cursor position in `useState` (a re-render per
mousemove) and used a five-colour rainbow gradient, which would have been the only
second accent on the site. The gradient centre is now written straight to the SVG node
inside one `requestAnimationFrame`, and the ramp is a single teal-to-foam hue. Stop
colours live in CSS because `stopColor="var(--accent)"` as a presentation attribute
never resolves. Stroke-only glyphs have no hit area, so a transparent rect provides one.

## Narrative

The page argues rather than lists. The order is claim, objection answered,
capability, proof, method, people, ask.

The differentiator (nobody stands between the client and the person writing the
code) used to sit as a hero subhead and a row in Approach. It now has its own
section, because it is the single strongest thing this studio can say and a
brochure order buried it.

## Connective motion

**The story thread.** A rail down the left of the content column, one segment per
narrative section, each drawing as its section arrives with a node marking the
beat. It is the tide line: the device that carries the eye from one beat to the
next instead of leaving every section to announce itself independently.

Segment-by-segment rather than scrubbed against page scroll. It reads almost
identically, costs one `IntersectionObserver` per section instead of a permanent
rAF loop over the whole document, and needs no scroll-driven animation support.
Decorative and `aria-hidden`; it carries nothing the headings do not. Withdrawn
below 1100px, where the gutter stops being wide enough to hold it.

**Directional entrances.** `reveal-from-left` and `reveal-from-right` let a block
arrive from the side its composition sits on: the Manifesto's rebuttal and the
second founder card both enter from the right. Uniform upward motion on an
asymmetric page reads as a template running over the layout.

## Provider files export exactly one component

`prefs/context.js` holds the contexts and `prefs/hooks.js` the hooks, so
`theme.jsx` and `locale.jsx` each export only their provider.

This is not tidiness. A module that exports both a component and something else
cannot be handled by React Fast Refresh, so Vite invalidates the whole module on
edit, hands out a second Context identity while the mounted provider still holds
the first, and every consumer throws `useLocale must be used inside
LocaleProvider` until a hard reload. It presented as a total white-screen crash
mid-session. The `react(only-export-components)` warning that had been dismissed
as cosmetic was pointing straight at it.

## Section Layout Families

No family repeats. Nine sections, nine shapes.

1. Nav - three-track grid, links optically centred, 76px
2. Hero - dithered window, sticky-pinned, centred
3. Manifesto - claim left, rebuttal hung right, support set against the rebuttal
4. Capabilities - staggered two-column pair, hairlines instead of cards
5. Work - asymmetric portfolio grid (1 feature + 5, exact cell count)
6. Approach - full-width stacked statements, word reveal
7. Studio - equal cards, asymmetric placement on a 12-column track
8. Contact - full-width centred form
9. Footer - four-column minimal, oversized outlined wordmark

**Studio: same size, asymmetric placement.** Both founder cards span five of
twelve columns, so they measure identically and neither person is given more
visual weight than the other. The asymmetry is positional: the first sits flush
to the left gutter under the heading, the second starts a column later than a
symmetric split would place it and stops a column short of the right edge,
leaving a deliberate band of air there, with a vertical drop on top. At 1440 that
is 470px each, a 142px gap, 102px of trailing air and an 86px drop.

An earlier revision made them unequal (7fr / 5fr). Equal measure is the better
answer here: this is a two-person studio whose argument is that you get both of
them, and sizing one founder larger than the other quietly contradicts the copy.

**Offsets use margin, never transform.** Several of these elements are `Reveal`
wrappers, and `.reveal.is-in { transform: none }` sits later in the file at equal
specificity, so a `transform` offset is silently cancelled and the layout looks
flat for no visible reason. Both the Capabilities stagger and the Studio drop hit
this before it was caught.

Every offset collapses to zero on a single column; a stagger without columns is
just uneven gaps.

## Eyebrow Budget

8 sections → `ceil(8/3) = 2` maximum. **Actual: 0.** Headlines carry their own sections.

## CTA Intents

One label per intent, page-wide.
- Portfolio intent → **"See the work"** (hero only)
- Contact intent → **"Start a project"** (nav + contact section, identical label)

## Language

English and Spanish. Spanish is the studio's own language and its clients'; the
copy addresses the reader as "tú" rather than "usted", because the whole pitch is
that you talk to the two of them directly and "usted" reinstates the distance the
copy argues against.

Strings live in `src/prefs/en.js` and `src/prefs/es.js` with an identical shape.
A missing Spanish string falls back to English before it falls back to printing
the key; a visible key is a bug signal, not a UI state. Proper nouns (project
names, tech tags, URLs) stay untranslated.

Default follows `navigator.language`; a manual choice persists under
`tidence-lang` and sets `<html lang>`. Adding a third language is one dictionary
file plus one entry in `LOCALES`.

No i18n library: two languages and roughly 90 strings do not justify the weight,
particularly right after three.js was removed from the bundle.

## Icons

`@phosphor-icons/react`, `weight="regular"` everywhere, one family, no exceptions.
The wave mark is existing brand IP and stays hand-authored SVG (redesign rule 11.F).

## Bans In Force

Zero em-dashes and en-dashes anywhere visible. No scroll cues. No locale/time/weather
strips. No section-number eyebrows. No decorative status dots. No version labels. No
div-based fake screenshots. No three-equal-card feature row. No `100vh` (use `100dvh`).
No pure `#000`/`#fff`. No AI-purple. No hand-rolled decorative SVG.
