import { useEffect, useRef } from 'react';

/**
 * Iridescence: a full-bleed WebGL shader of slow, folding light. From React
 * Bits, adapted for this site:
 *
 * - `ogl` is imported inside the effect, so it is split into its own chunk,
 *   never runs during prerender, and never delays the first paint.
 * - The loop only runs while the canvas is on screen and the tab is visible.
 * - Reduced motion draws one still frame and stops.
 * - Device pixel ratio is capped at 1.5, and `scale` renders below the
 *   element's size (the browser stretches it back up). The pattern is soft,
 *   so half resolution is invisible and quarters the GPU cost.
 * - If WebGL is unavailable the container stays empty and the CSS gradient
 *   behind it is what shows.
 */

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

const MAX_DPR = 1.5;

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  scale = 1,
  className = '',
  ...rest
}) {
  const ctnDom = useRef(null);
  const [r, g, b] = color;

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let ogl;
      try {
        ogl = await import('ogl');
      } catch {
        return;
      }
      if (disposed) return;

      const { Renderer, Program, Mesh, Color, Triangle } = ogl;
      let renderer;
      try {
        renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR) });
      } catch {
        return; // No WebGL: the CSS gradient behind the container shows instead.
      }
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 1);

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(r, g, b) },
          uResolution: { value: new Color(1, 1, 1) },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
          uAmplitude: { value: amplitude },
          uSpeed: { value: speed },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        renderer.setSize(Math.ceil(ctn.offsetWidth * scale), Math.ceil(ctn.offsetHeight * scale));
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      };
      resize();
      ctn.appendChild(gl.canvas);
      requestAnimationFrame(() => gl.canvas.classList.add('is-ready'));

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let frame = 0;
      let onScreen = true;
      // Time is accumulated rather than read from the clock, so a paused
      // loop resumes where it stopped instead of jumping ahead.
      let elapsed = 0;
      let last = 0;

      const draw = () => renderer.render({ scene: mesh });

      const tick = (now) => {
        frame = requestAnimationFrame(tick);
        if (last) elapsed += Math.min(now - last, 100);
        last = now;
        program.uniforms.uTime.value = elapsed * 0.001;
        draw();
      };

      const start = () => {
        if (still || frame || !onScreen || document.hidden) return;
        last = 0;
        frame = requestAnimationFrame(tick);
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const visibility = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      });
      visibility.observe(ctn);

      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener('visibilitychange', onVisibility);

      const sizes = new ResizeObserver(() => {
        resize();
        if (!frame) draw();
      });
      sizes.observe(ctn);

      const onMouse = (e) => {
        const rect = ctn.getBoundingClientRect();
        program.uniforms.uMouse.value[0] = (e.clientX - rect.left) / rect.width;
        program.uniforms.uMouse.value[1] = 1 - (e.clientY - rect.top) / rect.height;
      };
      if (mouseReact) ctn.addEventListener('mousemove', onMouse);

      if (still) {
        program.uniforms.uTime.value = 12;
        draw();
      } else {
        start();
      }

      cleanup = () => {
        stop();
        visibility.disconnect();
        sizes.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        if (mouseReact) ctn.removeEventListener('mousemove', onMouse);
        gl.canvas.remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [r, g, b, speed, amplitude, mouseReact, scale]);

  return <div ref={ctnDom} className={`iridescence ${className}`} aria-hidden="true" {...rest} />;
}
