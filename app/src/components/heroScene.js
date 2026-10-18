import {
  BackSide,
  BoxGeometry,
  CanvasTexture,
  ColorManagement,
  DirectionalLight,
  EdgesGeometry,
  Group,
  HemisphereLight,
  LinearSRGBColorSpace,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from 'three';

/*
 * The hero's 3D layer: the anchor T rebuilt from outlined cubes, sitting over
 * the giant wordmark, with three loose cubes floating around the word. Ported
 * from brand/whatsapp/banner-3d.html so the site and the banner match.
 *
 * Loaded with a dynamic import from Hero.jsx, so three.js is its own chunk
 * and never blocks the first paint. Nothing here runs a loop of its own: the
 * hero's scroll hook calls render() once per frame while the hero is on
 * screen, and not at all once it has scrolled away.
 *
 * Scroll motion, p from 0 to 1 over the cube phase of the pinned hero:
 *   - the mark turns and its cubes burst apart and leave the screen,
 *   - the floating cubes fly outward and tumble off the edges,
 * so that at p = 1 nothing is left in front of the wordmark.
 * On load the cubes settle into place from above, one after another. Readers
 * who asked for reduced motion get the assembled mark, still.
 */

// Colours as plain numbers. Colour management is off so they land on screen
// exactly as the brand hex values, the way the banner renders them.
ColorManagement.enabled = false;

const ABYSS = 0x070f12;
const PALETTE = { bar: 0xb4fbea, stem: 0x5fd9c4, sunlit: 0xedc27a, fold: 0x00737a };

// The banner is laid out on a 1720px-wide word; everything scales from that.
const DESIGN_WORD = 1720;
const CUBE = 70;
const GAP = 2;

// three.js r155 moved to physical light units; π restores the old balance.
const PI = Math.PI;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

/* --- Face glyphs ---------------------------------------------------------- */

const glyph = {
  ring: (x) => {
    x.beginPath();
    x.arc(128, 128, 34, 0, Math.PI * 2);
    x.stroke();
  },
  square: (x) => x.fillRect(100, 100, 56, 56),
  arrow: (x) => {
    x.beginPath();
    x.moveTo(84, 172);
    x.lineTo(172, 84);
    x.stroke();
    x.beginPath();
    x.moveTo(110, 84);
    x.lineTo(172, 84);
    x.lineTo(172, 146);
    x.stroke();
  },
  bars: (x) => {
    x.fillRect(78, 140, 22, 46);
    x.fillRect(117, 108, 22, 78);
    x.fillRect(156, 76, 22, 110);
  },
  chat: (x) => {
    x.beginPath();
    x.moveTo(70, 80);
    x.lineTo(186, 80);
    x.lineTo(186, 160);
    x.lineTo(118, 160);
    x.lineTo(86, 190);
    x.lineTo(90, 160);
    x.lineTo(70, 160);
    x.closePath();
    x.stroke();
  },
  label: (text) => (x) => {
    x.font = '500 54px "DM Mono", ui-monospace, monospace';
    x.textBaseline = 'alphabetic';
    x.fillText(text, 34, 214);
    x.lineWidth = 5;
    x.beginPath();
    x.moveTo(34, 64);
    x.lineTo(110, 64);
    x.stroke();
  },
};

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;

function faceTexture(color, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = hex(color);
  x.fillRect(0, 0, 256, 256);
  x.strokeStyle = hex(ABYSS);
  x.fillStyle = hex(ABYSS);
  x.lineWidth = 9;
  draw(x);
  const texture = new CanvasTexture(c);
  texture.anisotropy = 4;
  return texture;
}

/* One outlined cube: Lambert faces, crisp edge lines, and a slightly larger
   back-faced shell in Abyss that draws the heavy silhouette outline. */
function cube(size, color, faces, disposables) {
  const order = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
  const materials = order.map((k) =>
    faces[k] ? new MeshLambertMaterial({ map: faceTexture(color, faces[k]) }) : new MeshLambertMaterial({ color }),
  );
  const geometry = new BoxGeometry(size, size, size);
  const mesh = new Mesh(geometry, materials);

  const edges = new LineSegments(
    new EdgesGeometry(geometry),
    new LineBasicMaterial({ color: ABYSS, transparent: true, opacity: 0.85 }),
  );
  const hull = new Mesh(
    new BoxGeometry(size + 4, size + 4, size + 4),
    new MeshBasicMaterial({ color: ABYSS, side: BackSide }),
  );
  mesh.add(edges, hull);
  disposables.push(geometry, edges.geometry, edges.material, hull.geometry, hull.material, ...materials);
  materials.forEach((m) => m.map && disposables.push(m.map));
  return mesh;
}

/* --- The mark, on a 7 x 7 grid, two cubes deep ---------------------------- */

function markCells() {
  const cells = [];
  for (let x = 0; x < 7; x++) cells.push([x, 0, x === 0 || x === 6 ? 'sunlit' : 'bar']);
  for (let y = 1; y <= 5; y++) cells.push([3, y, y === 1 ? 'fold' : 'stem']);
  cells.push([0, 3, 'sunlit'], [6, 3, 'sunlit'], [0, 4, 'stem'], [6, 4, 'stem'], [1, 5, 'stem'], [5, 5, 'stem']);
  for (let x = 2; x <= 4; x++) cells.push([x, 6, 'stem']);
  return cells;
}

const DECO = {
  '2,0,0': { pz: glyph.ring },
  '5,0,1': { py: glyph.square },
  '3,3,0': { pz: glyph.arrow },
  '1,0,1': { py: glyph.ring },
  '0,3,0': { pz: glyph.bars },
  '1,5,0': { pz: glyph.chat },
  '3,6,0': { pz: glyph.square },
  '6,3,1': { px: glyph.ring },
};

// Where things sit relative to the word's box: u across, v down, 0 to 1.
const MARK_AT = { u: 0.48, v: 0.6 };
const FLOATERS = [
  { u: 0.12, v: 0.95, s: 120, c: PALETTE.sunlit, rot: [0.5, 0.7, -0.25], spin: [1.2, 2.1, 0.6], f: { pz: glyph.label('CRM'), py: glyph.ring, px: glyph.bars } },
  { u: 0.82, v: 0.1, s: 104, c: PALETTE.bar, rot: [0.6, -0.5, 0.3], spin: [-1.6, 1.4, 0.8], f: { pz: glyph.label('WEB'), py: glyph.arrow, px: glyph.square } },
  { u: 0.8, v: 1.0, s: 112, c: PALETTE.stem, rot: [-0.35, 0.65, 0.2], spin: [1.8, -1.2, -0.7], f: { pz: glyph.label('BOTS'), px: glyph.chat, py: glyph.ring } },
];

// On a portrait phone the word is a thin band, so the loose cubes move above
// and below it instead of sitting on its ends.
const FLOATERS_PORTRAIT = [
  { u: 0.12, v: 2.1 },
  { u: 0.86, v: -1.05 },
  { u: 0.84, v: 2.25 },
];

// Deterministic pseudo-random, so the exploded view is the same every visit.
function seeded(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function createHeroScene(canvas, { reduced = false } = {}) {
  const disposables = [];
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  camera.position.set(0, 0, 1000);

  scene.add(new HemisphereLight(0xffffff, 0xb9d6d0, 0.92 * PI));
  const key = new DirectionalLight(0xffffff, 0.42 * PI);
  key.position.set(-0.5, 1, 0.55);
  const rim = new DirectionalLight(0xffffff, 0.1 * PI);
  rim.position.set(1, -0.3, 0.3);
  scene.add(key, rim);

  /* The mark. Each cube remembers its home position and an outward
     direction for the exploded view. */
  const mark = new Group();
  const pieces = [];
  let index = 0;
  for (const [x, y, kind] of markCells()) {
    for (let z = 0; z < 2; z++) {
      const m = cube(CUBE, PALETTE[kind], DECO[`${x},${y},${z}`] || {}, disposables);
      const home = { x: (x - 3) * (CUBE + GAP), y: (3 - y) * (CUBE + GAP), z: (z - 0.5) * (CUBE + GAP) };
      const rest = { x: 0, y: 0, z: 0 };
      // Two cubes knocked loose, as in the banner.
      if (x === 6 && y === 0 && z === 1) {
        Object.assign(home, { x: home.x + 34, y: home.y + 40 });
        Object.assign(rest, { x: 0.25, y: 0.35, z: 0.1 });
      }
      if (x === 0 && y === 4 && z === 0) {
        Object.assign(home, { x: home.x - 30, y: home.y - 26 });
        Object.assign(rest, { x: -0.2, y: -0.15, z: 0.22 });
      }

      const r = seeded(index);
      // Outward on screen, never only in depth: a cube at the centre of the
      // mark gets a direction of its own so it still clears the wordmark.
      let dx = home.x;
      let dy = home.y;
      if (Math.hypot(dx, dy) < CUBE) {
        const angle = r * Math.PI * 2;
        dx = Math.cos(angle);
        dy = Math.sin(angle);
      }
      const len = Math.hypot(dx, dy) || 1;
      pieces.push({
        mesh: m,
        home,
        rest,
        dir: { x: dx / len, y: dy / len, z: (r - 0.5) * 0.6 },
        reach: 120 + r * 220,
        spin: { x: (seeded(index + 50) - 0.5) * 3, y: (seeded(index + 90) - 0.5) * 3, z: (r - 0.5) * 2 },
        delay: index * 22,
      });
      mark.add(m);
      index++;
    }
  }
  scene.add(mark);

  const floaters = FLOATERS.map((spec, i) => {
    const m = cube(spec.s, spec.c, spec.f, disposables);
    scene.add(m);
    return { mesh: m, spec, phase: i * 2.1 };
  });

  // Layout, recomputed on resize from the word's box in canvas pixels.
  let layout = { w: 1, h: 1, s: 1, mark: { x: 0, y: 0 }, floaters: [] };

  function resize(width, height, word) {
    renderer.setSize(width, height, false);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    // Canvas pixels to scene units: origin at the centre, y up.
    const at = (u, v) => ({
      x: word.left + word.width * u - width / 2,
      y: height / 2 - (word.top + word.height * v),
    });
    // On a portrait phone the word is short and wide, so the cubes are sized
    // from the screen instead, or they would shrink to crumbs.
    const s = height > width ? Math.max(width / 1050, word.width / DESIGN_WORD) : Math.max(word.width / DESIGN_WORD, 0.26);
    layout = { w: width, h: height, s, mark: at(MARK_AT.u, MARK_AT.v), floaters: (height > width ? FLOATERS_PORTRAIT : FLOATERS).map((f) => at(f.u, f.v)) };
  }

  const started = performance.now();

  function render(progress = 0, now = performance.now()) {
    const { s, w } = layout;
    const p = reduced ? 0 : easeInOut(clamp01(progress));
    const t = reduced ? 1e6 : now - started; // ms since mount
    const idle = reduced ? 0 : now / 1000;

    // The mark: turns, lifts and comes apart as the hero scrolls away.
    // Far enough, in the mark's own units, to carry any cube past the edge.
    const far = (0.75 * Math.hypot(layout.w, layout.h)) / (s * 1.25);
    const exit = Math.pow(p, 1.35);
    mark.visible = p < 1;
    mark.scale.setScalar(s * (1 + p * 0.25));
    mark.position.set(layout.mark.x, layout.mark.y + p * layout.h * 0.08, 0);
    mark.rotation.set(0.42 + p * 0.35, -0.62 + p * 1.1 + Math.sin(idle * 0.4) * 0.04, 0.16 - p * 0.1);

    for (const piece of pieces) {
      // Arrival: each cube drops into place, 22ms after the one before.
      const arrive = easeOut(clamp01((t - 150 - piece.delay) / 700));
      const drop = (1 - arrive) * 420;
      const spread = p * piece.reach + exit * far * (0.85 + 0.3 * seeded(piece.delay + 7));
      piece.mesh.position.set(
        piece.home.x + piece.dir.x * spread,
        piece.home.y + piece.dir.y * spread + drop,
        piece.home.z + piece.dir.z * spread,
      );
      piece.mesh.rotation.set(
        piece.rest.x + piece.spin.x * p + (1 - arrive) * 0.6,
        piece.rest.y + piece.spin.y * p,
        piece.rest.z + piece.spin.z * p,
      );
      piece.mesh.visible = arrive > 0;
    }

    // Floaters: bob gently, then fly outward and tumble on scroll.
    floaters.forEach(({ mesh, spec, phase }, i) => {
      const base = layout.floaters[i];
      const arrive = easeOut(clamp01((t - 700 - i * 120) / 800));
      const away = { x: Math.sign(base.x - layout.mark.x) || 1, y: Math.sign(base.y - layout.mark.y) || 1 };
      const bob = Math.sin(idle * 0.9 + phase) * 8 * s;
      mesh.scale.setScalar(s * (0.6 + 0.4 * arrive) * (1 + p * 0.4));
      mesh.position.set(
        base.x + away.x * exit * w * 0.75,
        base.y + bob + away.y * exit * layout.h * 0.7 + (1 - arrive) * 120 * s,
        200,
      );
      mesh.rotation.set(
        spec.rot[0] + spec.spin[0] * p + Math.sin(idle * 0.5 + phase) * 0.05,
        spec.rot[1] + spec.spin[1] * p,
        spec.rot[2] + spec.spin[2] * p,
      );
      mesh.visible = arrive > 0 && p < 1;
    });

    renderer.render(scene, camera);
  }

  function dispose() {
    disposables.forEach((d) => d.dispose?.());
    renderer.dispose();
  }

  return { resize, render, dispose };
}
