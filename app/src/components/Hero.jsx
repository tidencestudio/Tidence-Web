import { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { whatsappHref } from '../contact';
import useScrollProgress from './useScrollProgress';
import { REDUCED_MOTION } from './useMedia';

// Where each phase sits in the pinned scroll, 0 to 1. The services section is
// placed so its top reaches the top of the screen at 0.67 (the 0.67 in
// `.hero.is-staged + .services`, App.css). The panel and the word's fade both
// finish just before that, so the swap from panel to section happens on a
// screen that already looks like the section.
const PHASES = { cubesEnd: 0.34, expandStart: 0.42, expandEnd: 0.62, fadeStart: 0.54, fadeEnd: 0.63 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const CHIPS = [
  ['website', '#build'],
  ['crm', '#build'],
  ['automation', '#build'],
  ['custom', '#build'],
  ['contact', '#contact'],
];

/**
 * The opening, built from the brand banner (brand/whatsapp/banner-3d.html):
 * the wordmark set as large as the screen allows, and the anchor T rebuilt
 * from cubes standing in front of it, with three loose cubes floating around
 * the word.
 *
 * The section is a tall track with a sticky stage. Its pinned scroll runs in
 * three phases (PHASES below):
 *   1. cubes: the mark bursts apart and every cube leaves the screen, while
 *      the links and text around the word fall away;
 *   2. hold: the wordmark alone, fully revealed;
 *   3. expand: the next section's panel grows out from behind the word until
 *      it fills the screen, and the word fades on it. The services section
 *      is placed (App.css) so that its top sits at the top of the screen at
 *      that moment; it stays hidden until then and then simply appears, its
 *      heading rising in place. The section never slides up from below.
 * The phases go to CSS as --pc, --pe and --pw, written straight onto the
 * stage, so React never re-renders while scrolling.
 *
 * Everything but the cubes is plain markup, so the prerendered page shows
 * the word, the links and the button before any script runs. The 3D layer
 * is a separate chunk loaded after mount.
 */
export default function Hero() {
  const t = useT();
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const wordRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(0);
  const lastCubes = useRef(-1);

  // Called every frame while the hero is on screen.
  const onProgress = useCallback((p) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia(REDUCED_MOTION).matches) return;

    const pc = clamp01(p / PHASES.cubesEnd);
    const pe = easeInOut(clamp01((p - PHASES.expandStart) / (PHASES.expandEnd - PHASES.expandStart)));
    const pw = clamp01((p - PHASES.fadeStart) / (PHASES.fadeEnd - PHASES.fadeStart));
    stage.style.setProperty('--pc', pc.toFixed(4));
    stage.style.setProperty('--pe', pe.toFixed(4));
    stage.style.setProperty('--pw', pw.toFixed(4));

    // The section takes over once its top has reached the nav. Measured, not
    // derived from p, so a jump straight to #build lands with it visible.
    const services = stage.parentElement?.nextElementSibling;
    if (services) services.classList.toggle('is-arrived', services.getBoundingClientRect().top <= 110);

    progressRef.current = pc;
    // Once every cube has left, there is nothing more to draw.
    if (pc < 1 || lastCubes.current < 1) sceneRef.current?.render(pc);
    lastCubes.current = pc;
  }, []);
  useScrollProgress(trackRef, { mode: 'pin', onProgress });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const word = wordRef.current;
    if (!canvas || !stage || !word) return;

    let alive = true;
    let observer;
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    // Only a scripted, full-motion page stages the hand-off to the next
    // section; without it the sections simply follow one another.
    const track = trackRef.current;
    if (!reduced) track?.classList.add('is-staged');

    const measure = () => {
      const box = stage.getBoundingClientRect();
      const w = word.getBoundingClientRect();
      // The panel starts at the word's centre, which sits a little off the
      // stage's centre; it drifts to the true centre as it grows.
      stage.style.setProperty('--word-dy', `${(w.top + w.height / 2 - (box.top + box.height / 2)).toFixed(1)}px`);
      sceneRef.current?.resize(box.width, box.height, {
        left: w.left - box.left,
        top: w.top - box.top,
        width: w.width,
        height: w.height,
      });
      sceneRef.current?.render(progressRef.current);
    };

    (async () => {
      try {
        // Face labels are drawn into canvases; the mono face has to be ready.
        await document.fonts?.load('500 54px "DM Mono"');
        const { createHeroScene } = await import('./heroScene');
        if (!alive) return;
        sceneRef.current = createHeroScene(canvas, { reduced });
        measure();
        stage.classList.add('has-scene');
        observer = new ResizeObserver(measure);
        observer.observe(stage);
      } catch {
        // No WebGL: the word and the links stand on their own.
      }
    })();

    return () => {
      alive = false;
      track?.classList.remove('is-staged');
      observer?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <section className="hero" id="top" ref={trackRef}>
      {/* Nav watches this to decide when the bar needs its backdrop. */}
      <div id="nav-sentinel" aria-hidden="true" />

      <div className="hero-stage" ref={stageRef}>
        <nav className="hero-chips" aria-label={t('hero.chipsLabel')}>
          {CHIPS.map(([key, href]) => (
            <a key={key} className="hero-chip" href={href}>
              {t(`hero.chips.${key}`)}
            </a>
          ))}
        </nav>

        <div className="hero-orb hero-orb-a" aria-hidden="true" />

        {/* The next section's panel, growing from behind the word. */}
        <div className="hero-panel" aria-hidden="true" />

        <h1 className="hero-word">
          <span ref={wordRef} aria-hidden="true" translate="no">
            tidence
          </span>
          <span className="sr-only">
            Tidence. {t('hero.lead')} {t('hero.em')} {t('hero.strong')}
          </span>
        </h1>

        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />

        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <div className="hero-orb hero-orb-c" aria-hidden="true" />

        <div className="hero-foot">
          <p className="hero-sub">{t('hero.sub')}</p>
          <a className="btn btn-lg hero-cta" href="#contact">
            {t('nav.cta')}
          </a>
        </div>

        <a className="hero-news" href={whatsappHref(t)} target="_blank" rel="noreferrer noopener">
          <i aria-hidden="true" />
          <b>{t('hero.newsTag')}</b>
          <span>{t('hero.news')}</span>
          <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          <span className="sr-only">{t('meta.openOutside')}</span>
        </a>
      </div>
    </section>
  );
}
