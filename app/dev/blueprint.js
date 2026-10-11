import { FAMILY, familyShape, childShape, teddyShape, freeHand } from "./family.js";

const MARK = ["M0 12L12 0H16V32H29L38 23V43L33 48H16V80H0Z", "M50 0H88V16H57L50 23V57L57 64H88L72 80H50L34 64V16Z"];
const SIZE = [88, 80];
const ROOT = [8, 90];
const BOUND = { x0: -16, y0: -16, x1: 104, y1: 100 };
const GROW = { step: 1.1, kill: 1.9, reach: 14, rate: 30, jitter: 0.16, cap: 9000, stall: 4, near: 2 };
const FIELD = { cell: 1, sigma: 1.6, rest: 0.45 };
const ECHO = { ms: 1400, rise: 380, fresh: 450, start: 0.85 };
const CYCLE = { hold: 7000, rest: 1400, back: 1.6 };
const TEDDY = { chance: 0.35, at: 0.3, fall: 260, notice: 900, back: 32, pick: 420, home: 48 };
const WALK = { every: 48000, leg: 3200, turn: 1200, fadeIn: 400, fadeOut: 250 };
const ABOUT = ["software engineer", "designer"];
const RULE = { gap: 4, dx: 3 };
const GLOW = { band: 0.2, ms: 2000, eyes: 0.43, touch: 2500, levels: 12, lift: 0.2, gain: 0.95, in: 300 };
const TICK = { every: 1000, load: 24, size: 2.6 };
const LOAD = [4, 16, 64, 256];
const WIDTH = [0.5, 0.75, 1.05, 1.45, 1.95];
const ALPHA = [0.5, 0.62, 0.74, 0.86, 0.95];
const MM = 25.4 / 96;
const TAU = Math.PI * 2;
const reduced = typeof window !== "undefined" ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
const fine = typeof window !== "undefined" ? matchMedia("(pointer: fine)") : { matches: true };
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const smooth = (v) => {
  const t = clamp(v, 0, 1);
  return t * t * (3 - 2 * t);
};
const fmt = (n) => Math.round(n).toLocaleString("en-US").replace(/,/g, "'");

function rgbOf(value, fallback) {
  if (typeof document === "undefined") return "216, 209, 204";
  const probe = document.createElement("canvas").getContext("2d");
  probe.fillStyle = value || fallback;
  const v = probe.fillStyle;
  if (v.startsWith("#")) return [1, 3, 5].map((k) => parseInt(v.slice(k, k + 2), 16)).join(",");
  return (v.match(/\d+/g) || [216, 209, 204]).slice(0, 3).join(",");
}

function surfaceOf(el) {
  if (typeof document === "undefined") return "#0c0b0d";
  for (let node = el; node; node = node.parentElement) {
    const color = getComputedStyle(node).backgroundColor;
    if (color && color !== "transparent" && !/,\s*0\)$/.test(color)) return color;
  }
  return (getComputedStyle(document.querySelector(".dev-root") || document.body).getPropertyValue("--bg").trim() || "#0c0b0d");
}

function rngOf(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sampleMark(points, random) {
  if (typeof document === "undefined") return { ax: new Float32Array(), ay: new Float32Array() };
  const probe = document.createElement("canvas").getContext("2d");
  const shape = new Path2D();
  for (const d of MARK) shape.addPath(new Path2D(d));
  const ax = new Float32Array(points);
  const ay = new Float32Array(points);
  for (let k = 0, tries = 0; k < points && tries < points * 20; tries++) {
    const u = random() * SIZE[0];
    const v = random() * SIZE[1];
    if (!probe.isPointInPath(shape, u, v)) continue;
    ax[k] = u;
    ay[k] = v;
    k++;
  }
  return { ax, ay };
}

export function createBlueprint(host, { points = 4282, from = "2026", to = "", owner = "git-emran", family = true, portrait = "" } = {}) {
  if (typeof document === "undefined" || !host) return { recolor() {}, destroy() {} };
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  host.append(canvas);
  const g = canvas.getContext("2d");
  if (!g) return { recolor() {}, destroy() {} };

  const random = rngOf(points || 1);
  const N = points;
  const { ax, ay } = sampleMark(N, random);
  const alive = new Uint8Array(N).fill(1);
  const near = new Int32Array(N).fill(-1);
  const nearD2 = new Float32Array(N).fill(Infinity);
  let aliveCount = N;

  const nx = new Float32Array(GROW.cap);
  const ny = new Float32Array(GROW.cap);
  const np = new Int32Array(GROW.cap);
  const nb = new Float64Array(GROW.cap);
  const nd = new Int32Array(GROW.cap);
  const seg = new Float32Array(GROW.cap);
  const load = new Int32Array(GROW.cap);
  const kids = new Int32Array(GROW.cap);
  const px = new Float32Array(GROW.cap);
  const py = new Float32Array(GROW.cap);
  const killFrom = new Int32Array(GROW.cap + 1);
  const killList = new Int32Array(Math.max(1, N));
  let count = 0, shown = 0, killed = 0, lastBorn = 0, doneAt = 0, stall = 0;
  const tree = { tips: 0, junctions: 0, length: 0, apex: 0 };

  const acols = Math.ceil((BOUND.x1 - BOUND.x0) / GROW.reach) + 1;
  const arows = Math.ceil((BOUND.y1 - BOUND.y0) / GROW.reach) + 1;
  const agrid = Array.from({ length: acols * arows }, () => []);
  const acell = (u, v) => clamp(Math.floor((u - BOUND.x0) / GROW.reach), 0, acols - 1) + clamp(Math.floor((v - BOUND.y0) / GROW.reach), 0, arows - 1) * acols;
  for (let a = 0; a < N; a++) agrid[acell(ax[a], ay[a])].push(a);

  const ncols = Math.ceil((BOUND.x1 - BOUND.x0) / GROW.near) + 1;
  const nrows = Math.ceil((BOUND.y1 - BOUND.y0) / GROW.near) + 1;
  const ngrid = new Map();

  const fcols = Math.ceil((BOUND.x1 - BOUND.x0) / FIELD.cell) + 1;
  const frows = Math.ceil((BOUND.y1 - BOUND.y0) / FIELD.cell) + 1;
  const fAll = new Float32Array(fcols * frows);
  const fLive = new Float32Array(fcols * frows);
  const reachCells = Math.ceil((FIELD.sigma * 2.5) / FIELD.cell);
  const kernel = [];
  for (let j = -reachCells; j <= reachCells; j++) for (let i = -reachCells; i <= reachCells; i++) {
    const w = Math.exp(-((i * i + j * j) * FIELD.cell * FIELD.cell) / (2 * FIELD.sigma * FIELD.sigma));
    if (w > 0.01) kernel.push(i, j, w);
  }
  const splat = (a, target, sign) => {
    const ci = Math.round((ax[a] - BOUND.x0) / FIELD.cell);
    const cj = Math.round((ay[a] - BOUND.y0) / FIELD.cell);
    for (let k = 0; k < kernel.length; k += 3) {
      const i = ci + kernel[k], j = cj + kernel[k + 1];
      if (i < 0 || j < 0 || i >= fcols || j >= frows) continue;
      target[j * fcols + i] += sign * kernel[k + 2];
    }
  };
  for (let a = 0; a < N; a++) {
    splat(a, fAll, 1);
    splat(a, fLive, 1);
  }
  const sampled = Array.from(ax, (u, a) => fAll[Math.round((ay[a] - BOUND.y0) / FIELD.cell) * fcols + Math.round((u - BOUND.x0) / FIELD.cell)]).sort((p, q) => p - q);
  const norm = (sampled[Math.floor(sampled.length * 0.5)] || 1) * 0.9;

  function height(u, v) {
    const fx = (u - BOUND.x0) / FIELD.cell;
    const fy = (v - BOUND.y0) / FIELD.cell;
    if (fx < 0 || fy < 0 || fx >= fcols - 1 || fy >= frows - 1) return 0;
    const i = fx | 0, j = fy | 0, tx = fx - i, ty = fy - j, k = j * fcols + i;
    const r = FIELD.rest, q = 1 - r;
    const a = r * fAll[k] + q * Math.max(0, fLive[k]);
    const b = r * fAll[k + 1] + q * Math.max(0, fLive[k + 1]);
    const c = r * fAll[k + fcols] + q * Math.max(0, fLive[k + fcols]);
    const d = r * fAll[k + fcols + 1] + q * Math.max(0, fLive[k + fcols + 1]);
    return smooth(((a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty) / norm);
  }

  let elapsed = 0, acc = 0, done = N === 0, settled = false, phase = "sim", end = 0, timer = 0;
  const clock = () => Math.max(0, elapsed - ECHO.ms * ECHO.start);

  function kill(a) {
    alive[a] = 0;
    aliveCount--;
    splat(a, fLive, -1);
    killList[killed++] = a;
  }

  function setShown(target) {
    while (shown < target) {
      for (let i = killFrom[shown]; i < killFrom[shown + 1]; i++) {
        const a = killList[i];
        alive[a] = 0;
        aliveCount--;
        splat(a, fLive, -1);
      }
      shown++;
    }
    while (shown > target) {
      shown--;
      for (let i = killFrom[shown]; i < killFrom[shown + 1]; i++) {
        const a = killList[i];
        alive[a] = 1;
        aliveCount++;
        splat(a, fLive, 1);
      }
    }
  }

  function syncShown() {
    const c = clock();
    let t = shown;
    while (t < count && nb[t] <= c) t++;
    while (t > 0 && nb[t - 1] > c) t--;
    setShown(t);
  }

  function measure() {
    kids.fill(0, 0, shown);
    load.fill(0, 0, shown);
    let length = 0;
    let apex = 0;
    for (let k = 1; k < shown; k++) {
      kids[np[k]]++;
      length += seg[k];
      if (nd[k] > nd[apex]) apex = k;
    }
    for (let k = shown - 1; k > 0; k--) load[np[k]] += load[k] + 1;
    let tips = 0;
    let junctions = 0;
    for (let k = 0; k < shown; k++) {
      if (!kids[k]) tips++;
      else if (kids[k] > 1) junctions++;
    }
    tree.tips = tips;
    tree.junctions = junctions;
    tree.length = length;
    tree.apex = apex;
  }

  function occupied(x, y, r) {
    const ci = Math.floor((x - BOUND.x0) / GROW.near), cj = Math.floor((y - BOUND.y0) / GROW.near);
    for (let j = cj - 1; j <= cj + 1; j++) for (let i = ci - 1; i <= ci + 1; i++) {
      const list = ngrid.get(j * ncols + i);
      if (!list) continue;
      for (const k of list) if ((nx[k] - x) ** 2 + (ny[k] - y) ** 2 < r * r) return true;
    }
    return false;
  }

  function addNode(x, y, parent) {
    const k = count++;
    nx[k] = x;
    ny[k] = y;
    np[k] = parent;
    nb[k] = clock();
    lastBorn = nb[k];
    nd[k] = parent < 0 ? 0 : nd[parent] + 1;
    seg[k] = parent < 0 ? 0 : Math.hypot(x - nx[parent], y - ny[parent]);
    killFrom[k] = killed;
    const cell = clamp(Math.floor((y - BOUND.y0) / GROW.near), 0, nrows - 1) * ncols + clamp(Math.floor((x - BOUND.x0) / GROW.near), 0, ncols - 1);
    if (!ngrid.has(cell)) ngrid.set(cell, []);
    ngrid.get(cell).push(k);
    const ci = Math.floor((x - BOUND.x0) / GROW.reach), cj = Math.floor((y - BOUND.y0) / GROW.reach);
    const r2 = GROW.reach ** 2, k2 = GROW.kill ** 2;
    for (let j = Math.max(0, cj - 1); j <= Math.min(arows - 1, cj + 1); j++) for (let i = Math.max(0, ci - 1); i <= Math.min(acols - 1, ci + 1); i++) {
      for (const a of agrid[j * acols + i]) {
        if (!alive[a]) continue;
        const d2 = (ax[a] - x) ** 2 + (ay[a] - y) ** 2;
        if (d2 < k2) kill(a);
        else if (d2 < r2 && d2 < nearD2[a]) {
          nearD2[a] = d2;
          near[a] = k;
        }
      }
    }
    killFrom[k + 1] = killed;
    shown = count;
  }

  function grow() {
    const pull = new Map();
    for (let a = 0; a < N; a++) {
      if (!alive[a] || near[a] < 0) continue;
      const k = near[a], d = Math.sqrt(nearD2[a]) || 1;
      let v = pull.get(k);
      if (!v) pull.set(k, (v = [0, 0]));
      v[0] += (ax[a] - nx[k]) / d;
      v[1] += (ay[a] - ny[k]) / d;
    }
    let added = 0;
    for (const [k, v] of pull) {
      if (count >= GROW.cap) break;
      const len = Math.hypot(v[0], v[1]);
      if (len < 1e-4) continue;
      const x = nx[k] + (v[0] / len) * GROW.step + (random() - 0.5) * GROW.jitter;
      const y = ny[k] + (v[1] / len) * GROW.step + (random() - 0.5) * GROW.jitter;
      if (occupied(x, y, GROW.step * 0.45)) continue;
      addNode(x, y, k);
      added++;
    }
    stall = added ? 0 : stall + 1;
    if (!aliveCount || stall > GROW.stall || count >= GROW.cap) {
      done = true;
      doneAt = clock();
    }
  }

  let W = 0, H = 0, dpr = 1, S = 1, ox = 0, oy = 0, liftPx = 8, narrow = false;
  let d = { x0: 0, y0: 0, x1: 0, y1: 0 }, panel = null, chart = null, twin = 0, block = 0;
  let colors = null, base = null, raf = 0, last = 0, inView = true, live = true, zapUntil = 0, walkTimer = 0;
  const walker = { x: 1, moving: false, dir: -1, arrived: false, trip: null, trips: 0, nextAt: 0, shownAt: 0, hiddenAt: 0, teddy: Math.random() < TEDDY.chance };
  let secY = 0, secTarget = 0, pointerIn = false, cover = null, tapped = false, tapTimer = 0, liveY = null, liveSince = 0;
  const trail = [];
  const face = { img: null, lum: null, w: 0, h: 0, x: 0, y: 0 };

  function recolorNow() {
    const s = getComputedStyle(host);
    colors = {
      ink: rgbOf(s.getPropertyValue("--ink").trim(), "#d8d1cc"),
      dim: rgbOf(s.getPropertyValue("--dim").trim(), "#7d8581"),
      accent: rgbOf(s.getPropertyValue("--accent").trim(), "#ff2fb3"),
      red: rgbOf(s.getPropertyValue("--color1").trim(), "#e5534b"),
      paper: surfaceOf(host),
    };
  }

  const rest = () => oy + 36 * S;

  function layout() {
    const r = host.getBoundingClientRect();
    W = r.width;
    H = r.height;
    if (!W || !H) return false;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    narrow = W < 440;
    host.dataset.panel = narrow ? "0" : "1";
    if (narrow) {
      panel = null;
      d = { x0: 14, x1: W - 14, y0: 30, y1: H - 26 };
      liftPx = clamp(Math.round((d.y1 - d.y0) * 0.05), 6, 12);
      S = Math.min((d.x1 - d.x0 - 60) / SIZE[0], (d.y1 - d.y0 - liftPx - 6) / (ROOT[1] + 2));
    } else {
      const pw = clamp(W * 0.36, 170, 252);
      panel = { x0: W - 10 - pw, x1: W - 10 };
      d = { x0: 20, x1: panel.x0 - 16, y0: 36, y1: H - 18 };
      liftPx = clamp(Math.round((d.y1 - d.y0) * 0.05), 6, 16);
      S = Math.min((d.x1 - d.x0 - 40) / SIZE[0], (d.y1 - 4 - (d.y0 + 16) - liftPx) / ROOT[1]);
      chart = { y0: 30, h: clamp(Math.round(H * 0.16), 36, 66) };
      twin = chart.y0 + chart.h + 44;
      block = H - 18 - 46;
    }
    ox = d.x0 + (d.x1 - d.x0 - SIZE[0] * S) / 2;
    oy = d.y1 - 4 - ROOT[1] * S;
    secY = secTarget = pointerIn ? secTarget : rest();
    base = cover = null;
    return true;
  }

  function text(c, s, x, y, size, color, align = "left") {
    c.font = `${size}px "Plex Mono", ui-monospace, monospace`;
    c.textAlign = align;
    c.fillStyle = color;
    c.fillText(s, x, y);
    c.textAlign = "left";
  }

  function arrow(c, x, y, dx, dy, color) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - dx * 5 - dy * 1.7, y - dy * 5 + dx * 1.7);
    c.lineTo(x - dx * 5 + dy * 1.7, y - dy * 5 - dx * 1.7);
    c.closePath();
    c.fillStyle = color;
    c.fill();
  }

  function drawFrame(c) {
    const { dim } = colors;
    c.lineWidth = 1;
    c.strokeStyle = `rgba(${dim},0.5)`;
    c.strokeRect(0.5, 0.5, W - 1, H - 1);
    if (narrow) return;
    c.fillStyle = `rgba(${dim},0.55)`;
    for (let k = 0; k <= 8; k++) {
      const x = Math.round((k * (W - 1)) / 8) + 0.5;
      c.fillRect(x - 0.5, 0, 1, 4);
      c.fillRect(x - 0.5, H - 4, 1, 4);
      if (k < 8) text(c, String(k + 1), x + (W - 1) / 16, H - 5, 8, `rgba(${dim},0.7)`, "center");
    }
  }

  function drawHeader(c) {
    const { ink, dim } = colors;
    text(c, "EH", d.x0, 18, 11, `rgba(${ink},0.95)`);
    text(c, narrow ? `${fmt(N)} points · 1 per contribution` : `grown toward ${fmt(N)} points`, d.x0 + 22, 18, 10, `rgba(${ink},0.8)`);
    if (!narrow) text(c, `1 point = 1 contribution${from ? ` · ${from.slice(0, 4)}` : ""}`, d.x0 + 22, 30, 9, `rgba(${dim},0.9)`);
  }

  function drawRules(c) {
    const { ink, paper } = colors;
    const rows = Math.floor((d.y1 - d.y0) / RULE.gap) + 1;
    const xs = [];
    for (let x = d.x0; x <= d.x1 + 0.01; x += RULE.dx) xs.push(x);
    const n = xs.length;
    const ys = new Float32Array(n), hs = new Float32Array(n);
    c.lineWidth = 0.75;
    c.lineJoin = "round";
    for (let i = 0; i < rows; i++) {
      const y = d.y0 + i * RULE.gap;
      const t = (elapsed - (i / rows) * ECHO.ms * ECHO.start) / ECHO.rise;
      if (t <= 0) continue;
      const rise = smooth(t), fade = smooth(t * 1.6);
      const v = (y - oy) / S;
      let peak = 0;
      for (let k = 0; k < n; k++) {
        const h = height((xs[k] - ox) / S, v) * rise;
        hs[k] = h;
        ys[k] = y - h * liftPx;
        if (h > peak) peak = h;
      }
      c.beginPath();
      c.moveTo(xs[0], ys[0]);
      for (let k = 1; k < n; k++) c.lineTo(xs[k], ys[k]);
      if (peak > 0.01) {
        c.lineTo(xs[n - 1], y + 0.5);
        c.lineTo(xs[0], y + 0.5);
        c.closePath();
        c.fillStyle = paper;
        c.fill();
        c.beginPath();
        c.moveTo(xs[0], ys[0]);
        for (let k = 1; k < n; k++) c.lineTo(xs[k], ys[k]);
      }
      c.strokeStyle = `rgba(${ink},${(0.11 * fade).toFixed(3)})`;
      c.stroke();
    }
  }

  function drawTree(c) {
    if (shown < 2) return;
    const { ink, accent } = colors;
    for (let k = 0; k < shown; k++) {
      px[k] = ox + nx[k] * S;
      py[k] = oy + ny[k] * S - height(nx[k], ny[k]) * liftPx;
    }
    const paths = WIDTH.map(() => new Path2D());
    for (let k = 1; k < shown; k++) {
      const p = np[k];
      const w = load[k] + 1;
      const b = w < LOAD[0] ? 0 : w < LOAD[1] ? 1 : w < LOAD[2] ? 2 : w < LOAD[3] ? 3 : 4;
      paths[b].moveTo(px[p], py[p]);
      paths[b].lineTo(px[k], py[k]);
    }
    c.lineCap = "round";
    paths.forEach((path, b) => {
      c.lineWidth = WIDTH[b];
      c.strokeStyle = `rgba(${ink},${ALPHA[b]})`;
      c.stroke(path);
    });
  }

  function callout(c, x, y, dx, dy, label, value) {
    const { ink, dim } = colors;
    const ex = x + dx, ey = y + dy, side = dx > 0 ? 1 : -1, run = side * 14;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(ex, ey);
    c.lineTo(ex + run, ey);
    c.lineWidth = 0.75;
    c.strokeStyle = `rgba(${dim},0.8)`;
    c.stroke();
    c.beginPath();
    c.arc(x, y, 1.7, 0, TAU);
    c.fillStyle = `rgba(${ink},0.95)`;
    c.fill();
    c.font = '9px "Plex Mono", ui-monospace, monospace';
    const lw = c.measureText(label).width;
    const tx = side > 0 ? ex + run + 4 : ex + run - 4 - lw;
    text(c, label, tx, ey + 3, 9, `rgba(${ink},0.9)`);
    if (value) text(c, value, tx + lw + 6, ey + 3, 9, `rgba(${dim},0.95)`);
  }

  function drawCallouts(c) {
    if (!shown) return;
    callout(c, ox + nx[0] * S, oy + ny[0] * S, 12, -8, "root", shown > 1 ? `carries ${fmt(shown - 1)}` : "");
    const apex = tree.apex;
    if (!narrow && apex) callout(c, px[apex], py[apex], px[apex] + 120 < d.x1 ? 16 : -16, -12, "apex", `${fmt(nd[apex])} steps`);
  }

  function drawDims(c) {
    if (narrow) return;
    const { dim, paper } = colors;
    const w = SIZE[0] * S, top = oy - liftPx;
    const y = top - 10;
    const color = `rgba(${dim},0.75)`;
    c.lineWidth = 0.6;
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(ox, y - 3);
    c.lineTo(ox, top + 12 * S - 3);
    c.moveTo(ox + w, y - 3);
    c.lineTo(ox + w, top - 3);
    c.moveTo(ox, y);
    c.lineTo(ox + w, y);
    c.stroke();
    arrow(c, ox, y, -1, 0, color);
    arrow(c, ox + w, y, 1, 0, color);
    const label = `${(w * MM).toFixed(1)} mm`;
    c.font = '9px "Plex Mono", ui-monospace, monospace';
    const tw = c.measureText(label).width + 6;
    c.fillStyle = paper;
    c.fillRect(ox + w / 2 - tw / 2, y - 6, tw, 12);
    text(c, label, ox + w / 2, y + 3, 9, `rgba(${dim},0.95)`, "center");
  }

  function drawTwin(c) {
    const { ink, dim } = colors;
    const grownFor = Math.min(clock(), done ? doneAt : Infinity) / 1000;
    const rows = [
      ["members", fmt(Math.max(0, shown - 1))],
      ["tips", fmt(shown ? tree.tips : 0)],
      ["junctions", fmt(tree.junctions)],
      ["length", `${fmt(tree.length * S * MM)} mm`],
      ["grown", `${grownFor.toFixed(1)} s`],
      ["reached", `${fmt(N - aliveCount)} / ${fmt(N)}`],
    ];
    if (narrow) {
      text(c, [rows[0], rows[1], rows[3]].map(([k, v]) => `${k} ${v}`).join(" · "), d.x0, H - 10, 9, `rgba(${dim},0.95)`);
      return;
    }
    const x0 = panel.x0, x1 = panel.x1;
    text(c, "numeric twin", x0, twin - 14, 10, `rgba(${ink},0.92)`);
    text(c, "as counts", x1, twin - 14, 9, `rgba(${dim},0.9)`, "right");
    rows.forEach(([label, value], k) => {
      const y = twin + k * 14;
      text(c, label, x0, y, 9, `rgba(${dim},0.95)`);
      text(c, value, x1, y, 9, `rgba(${ink},0.92)`, "right");
      c.fillStyle = `rgba(${dim},0.22)`;
      c.fillRect(x0, y + 4, x1 - x0, 1);
    });
    c.lineWidth = 1;
    c.strokeStyle = `rgba(${dim},0.6)`;
    c.strokeRect(x0 + 0.5, block + 0.5, x1 - x0 - 1, 45);
    c.fillStyle = `rgba(${dim},0.6)`;
    c.fillRect(x0, block + 17, x1 - x0, 1);
    text(c, owner || "EMRAN", x0 + 6, block + 12, 10, `rgba(${ink},0.95)`);
    text(c, "scale 1:1", x1 - 6, block + 12, 8, `rgba(${dim},0.95)`, "right");
  }

  function drawSection(c) {
    const { ink, dim, accent } = colors;
    const y = Math.round(secY) + 0.5;
    const color = `rgba(${accent},0.85)`;
    c.save();
    c.setLineDash([10, 3, 2, 3]);
    c.lineWidth = 0.8;
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(d.x0 + 8, y);
    c.lineTo(d.x1 - 8, y);
    c.stroke();
    c.restore();
    for (const [x, side] of [[d.x0, 1], [d.x1, -1]]) {
      c.lineWidth = 2;
      c.strokeStyle = color;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + side * 8, y);
      c.stroke();
      c.lineWidth = 0.9;
      c.beginPath();
      c.moveTo(x + side * 4, y);
      c.lineTo(x + side * 4, y - 8);
      c.stroke();
      arrow(c, x + side * 4, y - 8, 0, -1, color);
      text(c, "A", x + side * 4, y - 16, 9, color, "center");
    }
    if (!panel) return;
    const x0 = panel.x0, x1 = panel.x1, top = chart.y0, h = chart.h, bw = x1 - x0;
    text(c, "section A–A", x0, top - 8, 10, `rgba(${ink},0.92)`);
    text(c, pointerIn ? "echo at pointer" : "echo at rest", x1, top - 8, 9, `rgba(${dim},0.9)`, "right");
    c.lineWidth = 1;
    c.strokeStyle = `rgba(${dim},0.45)`;
    c.strokeRect(x0 + 0.5, top + 0.5, bw - 1, h - 1);
    const v = (secY - oy) / S;
    const rows = Math.floor((d.y1 - d.y0) / RULE.gap) + 1;
    const row = clamp(Math.round((secY - d.y0) / RULE.gap), 0, rows);
    const rise = smooth((elapsed - (row / rows) * ECHO.ms * ECHO.start) / ECHO.rise);
    const floor = top + h - 6, span = h - 12;
    c.beginPath();
    c.moveTo(x0 + 1, floor);
    const steps = 96;
    for (let k = 0; k <= steps; k++) {
      const X = d.x0 + ((d.x1 - d.x0) * k) / steps;
      c.lineTo(x0 + 1 + ((bw - 2) * k) / steps, floor - height((X - ox) / S, v) * rise * span);
    }
    c.lineTo(x1 - 1, floor);
    c.closePath();
    c.fillStyle = `rgba(${accent},0.14)`;
    c.fill();
    c.strokeStyle = `rgba(${accent},0.9)`;
    c.stroke();
    let cut = 0;
    for (let k = 1; k < shown; k++) {
      const p = np[k];
      if (ny[p] <= v === ny[k] <= v) continue;
      cut++;
    }
    text(c, `cuts ${fmt(cut)} members`, x0, top + h + 12, 9, `rgba(${dim},0.95)`);
  }

  function drawFamily(c) {
    if (!family || !panel || !colors) return;
    const s = 25 / FAMILY.h;
    const ox = panel.x0 + 6;
    const oy = block + 19;
    c.save();
    c.translate(ox, oy);
    c.scale(s, s);
    const shape = familyShape(0, 1);
    c.strokeStyle = `rgba(${colors.ink},0.8)`;
    c.fillStyle = `rgba(${colors.ink},0.8)`;
    c.lineWidth = 0.9;
    c.lineCap = "round";
    c.beginPath();
    for (const [x1, y1, x2, y2] of shape.lines) {
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
    }
    for (const [cx, cy, r] of shape.heads) {
      c.moveTo(cx + r, cy);
      c.arc(cx, cy, r, 0, TAU);
    }
    c.stroke();
    c.beginPath();
    for (const [cx, cy] of shape.joints) {
      c.moveTo(cx + 0.8, cy);
      c.arc(cx, cy, 0.8, 0, TAU);
    }
    c.fill();
    c.restore();
    ABOUT.forEach((line, k) => text(c, line, panel.x1 - 6, block + 30 + k * 10, 8, `rgba(${colors.dim},0.9)`, "right"));
  }

  function paint() {
    if (!colors || !W) return;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    measure();
    drawFrame(g);
    drawHeader(g);
    drawRules(g);
    if (elapsed >= ECHO.ms * ECHO.start) {
      drawTree(g);
      drawDims(g);
      drawCallouts(g);
    }
    drawTwin(g);
    drawSection(g);
    drawFamily(g);
  }

  function advance(dt) {
    if (phase === "replay") {
      elapsed = Math.min(end, elapsed + dt);
      syncShown();
      if (elapsed >= end) {
        phase = "hold";
        settled = true;
      }
      return;
    }
    elapsed += dt;
    if (done) {
      if (clock() - lastBorn >= ECHO.fresh && elapsed >= ECHO.ms + ECHO.rise) {
        end = elapsed;
        settled = true;
      }
      return;
    }
    if (elapsed < ECHO.ms * ECHO.start) return;
    if (!count) addNode(ROOT[0], ROOT[1], -1);
    acc = Math.min(3, acc + (dt / 1000) * GROW.rate);
    for (let n = 0; acc >= 1 && !done && n < 3; n++, acc--) grow();
  }

  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(50, now - last) : 16;
    last = now;
    if (!settled) advance(dt);
    secY += (secTarget - secY) * (1 - Math.exp(-dt / 70));
    if (Math.abs(secTarget - secY) < 0.2) secY = secTarget;
    paint();
    if (!settled || secY !== secTarget) request();
  }

  function request() {
    if (!raf && live && inView && !document.hidden) raf = requestAnimationFrame(frame);
  }

  function sync() {
    if (inView && !document.hidden) {
      last = 0;
      request();
    } else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function onMove(event) {
    const r = host.getBoundingClientRect();
    const x = event.clientX - r.left, y = event.clientY - r.top;
    pointerIn = !event.target?.closest?.(".lb") && x >= d.x0 && x <= d.x1 && y >= d.y0 && y <= d.y1;
    const target = pointerIn ? y : rest();
    if (Math.abs(target - secTarget) < 0.1) return;
    secTarget = target;
    request();
  }

  function onLeave() {
    if (!pointerIn) return;
    pointerIn = false;
    secTarget = rest();
    request();
  }

  recolorNow();
  layout();
  const sizeObserver = new ResizeObserver(() => {
    if (!layout()) return;
    paint();
    request();
  });
  sizeObserver.observe(host);
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  viewObserver.observe(host);
  document.addEventListener("visibilitychange", sync);
  addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  paint();
  request();

  return {
    recolor() {
      recolorNow();
      paint();
    },
    family() {
      if (!family || !panel || !inView) return null;
      const r = canvas.getBoundingClientRect();
      const s = 25 / FAMILY.h;
      const x = r.left + panel.x0 + 6;
      const y = r.top + block + 19;
      return { x0: x, y0: y, x1: x + FAMILY.width * s, y1: y + 25 };
    },
    fire(ms) {
      zapUntil = performance.now() + ms;
      last = 0;
      request();
    },
    destroy() {
      live = false;
      cancelAnimationFrame(raf);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    },
  };
}
