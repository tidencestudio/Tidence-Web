import { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { whatsappHref } from '../contact';
import useScrollProgress from './useScrollProgress';
import { REDUCED_MOTION } from './useMedia';

// Where each phase sits in the pinned scroll, 0 to 1 (pin: 150svh, see .hero
// in App.css). The media expansion runs to the very end of the pin, so the
// moment it is full size the stage lets go and the next section follows it up
// the screen, as in the 21st.dev component.
const PHASES = { cubesEnd: 0.36, expandStart: 0.4, expandEnd: 0.96 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const SIZES = [960, 1280, 1920];
const waveSrcSet = SIZES.map((w) => `/wave-sunset-${w}.webp ${w}w`).join(', ');

/**
 * The opening, built from the brand banner (brand/whatsapp/banner-3d.html):
 * the wordmark set as large as the screen allows, and the anchor T rebuilt
 * from cubes standing in front of it, with three loose cubes floating around
 * the word.
 *
 * The section is a tall track with a sticky stage. Its pinned scroll runs in
 * two phases (PHASES below):
 *   1. cubes: the mark bursts apart and every cube leaves the screen, while
 *      the text around the word falls away, leaving the wordmark alone;
 *   2. media expansion, after the 21st.dev "scroll expansion hero"
 *      (ScrollExpandMedia): a photo card opens behind the word at 300 x 400
 *      and grows to 95vw x 85vh, while the word splits in two ("tide" and
 *      "nce") and each half slides off its own side, and the soft spheres
 *      fade. When the card is full size the pin ends and the next section
 *      (the enquiry form) follows it up the page.
 * Unlike the original, nothing hijacks the wheel or touch: the phases come
 * from ordinary scroll, so the nav links, keyboard and deep links still work.
 * They go to CSS as --pc and --pm, written straight onto the stage, so React
 * never re-renders while scrolling.
 *
 * Everything but the cubes is plain markup, so the prerendered page shows
 * the word, the line under it and the button before any script runs. The 3D layer
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
    // Linear, like the original: the card grows in step with the scroll.
    const pm = clamp01((p - PHASES.expandStart) / (PHASES.expandEnd - PHASES.expandStart));
    stage.style.setProperty('--pc', pc.toFixed(4));
    stage.style.setProperty('--pm', pm.toFixed(4));

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

    const measure = () => {
      const box = stage.getBoundingClientRect();
      const w = word.getBoundingClientRect();
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
        <div className="hero-orb hero-orb-a" aria-hidden="true" />

        {/* The media card that opens behind the word and grows to fill the
            screen. The brand's sunset wave, in its natural colour. */}
        <figure className="hero-media" aria-hidden="true">
          <img
            src="/wave-sunset-1280.webp"
            srcSet={waveSrcSet}
            sizes="95vw"
            alt=""
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
          />
        </figure>

        {/* The word splits in two as the card grows: "tide", where the name
            comes from, slides off left and "nce" off right. */}
        <h1 className="hero-word">
          <span ref={wordRef} aria-hidden="true" translate="no">
            <span className="hero-word-a">tide</span>
            <span className="hero-word-b">nce</span>
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
          <a className="btn btn-lg hero-cta" href="#start">
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
