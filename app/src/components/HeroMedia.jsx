import { useEffect, useRef, useState } from 'react';
import { Dithering, ImageDithering } from '@paper-design/shaders-react';

const POSTER = '/wave-sunset.jpg';

const MODES = ['photodither', 'dither', 'photo'];
const DEFAULT_MODE = 'photodither';

/** Read once on mount: ?effect=photodither|dither|photo */
const readMode = () => {
  const asked = new URLSearchParams(window.location.search).get('effect');
  return MODES.includes(asked) ? asked : DEFAULT_MODE;
};

/**
 * Every shader knob is readable from the query string, so the look can be
 * explored in the browser instead of through a rebuild per guess. Nothing
 * outside this file reads them, and none of them are needed in production:
 * leave them off and the defaults below are what ships.
 */
const params = () => new URLSearchParams(window.location.search);

const num = (name, fallback) => {
  const raw = Number(params().get(name));
  return Number.isFinite(raw) && params().get(name) !== null ? raw : fallback;
};

const pick = (name, allowed, fallback) => {
  const raw = params().get(name);
  return allowed.includes(raw) ? raw : fallback;
};

const flag = (name, fallback) => {
  const raw = params().get(name);
  return raw === null ? fallback : raw === '1' || raw === 'true';
};

const SHAPES = ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere'];
const GRIDS = ['random', '2x2', '4x4', '8x8'];

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const token = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

/**
 * The hero's backdrop.
 *
 * Both shaders are procedural: no file to download, no loop seam, and they
 * cost about 8KB gzipped between them against the several megabytes a video
 * of the same length would need.
 *
 * Whatever the mode, motion is never mandatory. Reduced motion, Save-Data and
 * slow connections all collapse to the graded still, which is also what shows
 * if WebGL is unavailable.
 */
export default function HeroMedia() {
  const ref = useRef(null);
  const [mode] = useState(() => {
    if (typeof window === 'undefined') return 'photo';

    // Decorative motion is the first thing that should go when someone has
    // asked for less of it, or is paying for their bytes.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'photo';
    const connection = navigator.connection;
    if (connection?.saveData) return 'photo';
    if (/2g/.test(connection?.effectiveType ?? '')) return 'photo';

    const asked = readMode();

    // A shader with no GPU behind it is a blank box. This cannot change at
    // runtime, so it belongs in the initial value rather than in an effect
    // that would render once wrong and then correct itself.
    if (asked !== 'photo' && !hasWebGL()) return 'photo';

    return asked;
  });

  // The dithered wave is already drawn in two brand colours, so the media
  // tint would apply the accent twice and muddy it.
  //
  // This was a `:has()` rule, which Firefox only supports from 121. Writing
  // the tokens straight onto the parent works everywhere and keeps the one
  // place that knows the mode in charge of it.
  useEffect(() => {
    const media = ref.current?.closest('.expand-media');
    if (!media) return;
    const dithered = mode === 'dither';
    media.style.setProperty('--media-tint', dithered ? '0' : '');
    media.style.setProperty('--media-saturate', dithered ? '1' : '');
  }, [mode]);

  if (mode === 'dither') {
    return (
      <Dithering
        ref={ref}
        className="hero-shader is-dither"
        shape={pick('shape', SHAPES, 'wave')}
        type={pick('type', GRIDS, '4x4')}
        width="100%"
        height="100%"
        colorBack={token('--scrim', '#0e1b21')}
        colorFront={token('--accent-on-media', '#5cc9be')}
        size={num('size', 2)}
        scale={num('scale', 0.75)}
        rotation={num('rotation', 0)}
        speed={num('speed', 0.3)}
      />
    );
  }

  // The photograph, rendered in the same dot language as the page texture.
  // The wave survives as a wave; it just stops being a photograph.
  if (mode === 'photodither') {
    return (
      <ImageDithering
        ref={ref}
        className="hero-shader is-dither"
        image={POSTER}
        fit="cover"
        width="100%"
        height="100%"
        colorBack={token('--scrim', '#0e1b21')}
        colorFront={token('--accent-on-media', '#5cc9be')}
        colorHighlight={token('--on-media', '#f4f8f7')}
        originalColors={flag('original', false)}
        inverted={flag('inverted', false)}
        type={pick('type', GRIDS, '8x8')}
        size={num('size', 2)}
        colorSteps={num('steps', 3)}
        scale={num('scale', 1)}
      />
    );
  }

  return (
    <img ref={ref} src={POSTER} alt="" width="1600" height="900" fetchPriority="high" decoding="async" />
  );
}
