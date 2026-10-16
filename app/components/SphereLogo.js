"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PURPLE = [174, 31, 227];
const CYAN = [70, 230, 255];
const WHITE = [235, 215, 255];
const COLORS = [PURPLE, CYAN, WHITE];
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const F = 5; // perspective strength
const SEG = 72; // segments per line
const LATS = 10;
const MERIDIANS = 12;
const NODE_COUNT = 64;

const RINGS = [
  { r: 1.28, tx: 1.2, tz: 0.3, sp: 0.9, ci: 1 },
  { r: 1.5, tx: -0.6, tz: 0.9, sp: -0.6, ci: 0 },
  { r: 1.7, tx: 0.2, tz: -1.1, sp: 0.4, ci: 0 },
];

// ---- line batching (one stroke per colour/alpha bucket = fast) ----
function addSeg(batch, ci, wi, a, x1, y1, x2, y2) {
  const q = Math.max(1, Math.round(clamp(a, 0, 1) * 14));
  const k = ci * 1000 + wi * 100 + q;
  let arr = batch.get(k);
  if (!arr) { arr = []; batch.set(k, arr); }
  arr.push(x1, y1, x2, y2);
}
function flush(ctx, batch) {
  for (const [k, arr] of batch) {
    const ci = Math.floor(k / 1000);
    const wi = Math.floor((k % 1000) / 100);
    const q = k % 100;
    ctx.strokeStyle = rgba(COLORS[ci], q / 14);
    ctx.lineWidth = wi ? 1.8 : 0.9;
    ctx.beginPath();
    for (let i = 0; i < arr.length; i += 4) {
      ctx.moveTo(arr[i], arr[i + 1]);
      ctx.lineTo(arr[i + 2], arr[i + 3]);
    }
    ctx.stroke();
  }
}
function dot(ctx, x, y, rad, ci, a) {
  ctx.fillStyle = rgba(COLORS[ci], a * 0.18);
  ctx.beginPath(); ctx.arc(x, y, rad * 3, 0, 6.2832); ctx.fill();
  ctx.fillStyle = rgba(COLORS[ci], a);
  ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.fill();
}

export default function SphereLogo({ logo = "/ink3d_v4_transparent_1.png", className = "" }) {
  const wrapRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const sharedRef = useRef({ pulse: null });

  useEffect(() => {
    const wrap = wrapRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!wrap || !back || !front) return;
    const bctx = back.getContext("2d");
    const fctx = front.getContext("2d");

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const baseSpin = reduced ? 0.06 : 0.28;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width; h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      for (const c of [back, front]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---- mouse / touch (window level so it reacts anywhere on screen) ----
    const m = { cx: null, cy: null, speed: 0, lx: null, ly: null };
    const onMove = (e) => {
      const p = e.touches && e.touches[0] ? e.touches[0] : e;
      if (p.clientX == null) return;
      if (m.lx != null) m.speed += Math.hypot(p.clientX - m.lx, p.clientY - m.ly);
      m.lx = p.clientX; m.ly = p.clientY;
      m.cx = p.clientX; m.cy = p.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true, capture: true });
    window.addEventListener("mousemove", onMove, { passive: true, capture: true });
    window.addEventListener("touchmove", onMove, { passive: true, capture: true });
    window.addEventListener("touchstart", onMove, { passive: true, capture: true });

    // ---- geometry ----
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const rr = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      nodes.push([Math.cos(th) * rr, y, Math.sin(th) * rr]);
    }
    const pairs = [];
    for (let i = 0; i < NODE_COUNT; i++)
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1], nodes[i][2] - nodes[j][2]);
        if (d < 0.62) pairs.push([i, j]);
      }
    const dust = Array.from({ length: 36 }, () => ({
      x: Math.random(), y: Math.random(), z: 0.2 + Math.random() * 0.8, v: 0.01 + Math.random() * 0.03,
    }));

    // ---- state ----
    const cur = { x: 0, y: 0 };
    let spin = 0, spinVel = baseSpin, kick = 0, T = 0, hudRot = 0;
    const pulses = [];
    sharedRef.current.pulse = () => { pulses.push(T); kick += 2.6; };

    const draw = (t, dt) => {
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      fctx.clearRect(0, 0, w, h);

      const rect = wrap.getBoundingClientRect();
      let tx = 0, ty = 0, mpx = null, mpy = null;
      if (m.cx != null) {
        tx = clamp((m.cx - (rect.left + rect.width / 2)) / (window.innerWidth / 2), -1, 1);
        ty = clamp((m.cy - (rect.top + rect.height / 2)) / (window.innerHeight / 2), -1, 1);
        mpx = m.cx - rect.left; mpy = m.cy - rect.top;
      }
      const k = 1 - Math.exp(-dt * 5);
      cur.x += (tx - cur.x) * k;
      cur.y += (ty - cur.y) * k;

      const vel = m.speed;
      m.speed *= Math.exp(-dt * 2.5);
      const targetSpin = baseSpin + Math.min(vel * 0.012, 2.4) + kick;
      spinVel += (targetSpin - spinVel) * (1 - Math.exp(-dt * 3));
      kick *= Math.exp(-dt * 2);
      spin += spinVel * dt;
      hudRot += dt * (0.12 + spinVel * 0.15);

      const cx = w / 2 + cur.x * w * 0.03;
      const cy = h / 2 + cur.y * h * 0.03;
      const R = Math.min(w, h) * 0.25;
      const yaw = spin + cur.x * 0.8;
      const pitch = 0.35 + cur.y * 0.6 + Math.sin(t * 0.4) * 0.08;
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const cpt = Math.cos(pitch), spt = Math.sin(pitch);
      const proj = (x, y, z) => {
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * cpt - z1 * spt;
        const z2 = y * spt + z1 * cpt;
        const s = F / (F - z2);
        return [cx + x1 * s * R, cy + y2 * s * R, z2, s];
      };

      const bB = new Map(); // back batch
      const fB = new Map(); // front batch
      const dotsB = [], dotsF = [];

      const poly = (pts, ci, wi, base) => {
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          const z = (a[2] + b[2]) / 2;
          const depth = clamp((z + 1.8) / 3.6, 0, 1);
          let al = base * (0.12 + 0.88 * depth * depth);
          if (z >= 0) addSeg(fB, ci, wi, al * 0.6, a[0], a[1], b[0], b[1]);
          else addSeg(bB, ci, wi, al, a[0], a[1], b[0], b[1]);
        }
      };

      // background glow
      const gx = cx + cur.x * R * 0.4, gy = cy + cur.y * R * 0.4;
      const gr = R * 2.6;
      const grd = bctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      grd.addColorStop(0, rgba(PURPLE, 0.22 + 0.06 * Math.sin(t * 1.3) + Math.min(vel * 0.0006, 0.12)));
      grd.addColorStop(0.5, rgba(PURPLE, 0.07));
      grd.addColorStop(1, rgba(PURPLE, 0));
      bctx.fillStyle = grd;
      bctx.fillRect(0, 0, w, h);

      // HUD outer ring (2D)
      const hr = Math.min(w, h) * 0.47;
      const hcx = w / 2, hcy = h / 2;
      for (let i = 0; i < 90; i++) {
        const a = (i / 90) * 6.2832 + hudRot;
        const long = i % 6 === 0;
        const r2 = hr - (long ? 10 : 5);
        addSeg(bB, 0, 0, long ? 0.5 : 0.25, hcx + Math.cos(a) * hr, hcy + Math.sin(a) * hr, hcx + Math.cos(a) * r2, hcy + Math.sin(a) * r2);
      }
      bctx.strokeStyle = rgba(CYAN, 0.55);
      bctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const s0 = -hudRot * 1.6 + i * 2.1;
        bctx.beginPath(); bctx.arc(hcx, hcy, hr * 0.92, s0, s0 + 0.7); bctx.stroke();
      }
      bctx.save();
      bctx.setLineDash([4, 10]);
      bctx.lineDashOffset = -t * 12;
      bctx.strokeStyle = rgba(PURPLE, 0.25);
      bctx.lineWidth = 1;
      bctx.beginPath(); bctx.arc(hcx, hcy, hr * 0.85, 0, 6.2832); bctx.stroke();
      bctx.restore();

      // dust
      for (const d of dust) {
        d.y -= d.v * dt; if (d.y < 0) { d.y = 1; d.x = Math.random(); }
        const px = d.x * w - cur.x * 24 * d.z, py = d.y * h - cur.y * 24 * d.z;
        bctx.fillStyle = rgba(d.z > 0.6 ? WHITE : PURPLE, 0.35 * d.z);
        bctx.beginPath(); bctx.arc(px, py, d.z * 1.2, 0, 6.2832); bctx.fill();
      }

      // sphere latitude lines
      for (let kk = 1; kk < LATS; kk++) {
        const phi = -Math.PI / 2 + (kk * Math.PI) / LATS;
        const y = Math.sin(phi), r = Math.cos(phi);
        const pts = [];
        for (let i = 0; i <= SEG; i++) {
          const a = (i / SEG) * 6.2832;
          pts.push(proj(r * Math.cos(a), y, r * Math.sin(a)));
        }
        const eq = kk === LATS / 2;
        poly(pts, eq ? 1 : 0, 0, eq ? 0.85 : 0.55);
      }
      // meridians
      for (let j = 0; j < MERIDIANS; j++) {
        const th = (j / MERIDIANS) * 6.2832;
        const pts = [];
        for (let i = 0; i <= SEG; i++) {
          const phi = -Math.PI / 2 + (i / SEG) * Math.PI;
          pts.push(proj(Math.cos(phi) * Math.cos(th), Math.sin(phi), Math.cos(phi) * Math.sin(th)));
        }
        poly(pts, 0, 0, 0.5);
      }

      // scanning sweep
      {
        const ys = Math.sin(t * 0.9) * 0.95;
        const r = Math.sqrt(1 - ys * ys);
        const pts = [];
        for (let i = 0; i <= SEG; i++) {
          const a = (i / SEG) * 6.2832;
          pts.push(proj(r * Math.cos(a), ys, r * Math.sin(a)));
        }
        poly(pts, 1, 1, 0.95);
      }

      // nodes + connections + mouse lock-on
      const np = nodes.map((n) => proj(n[0], n[1], n[2]));
      for (const [i, j] of pairs) {
        const a = np[i], b = np[j];
        const z = (a[2] + b[2]) / 2;
        const al = 0.1 + 0.3 * clamp((z + 1) / 2, 0, 1);
        if (z >= 0) addSeg(fB, 2, 0, al * 0.7, a[0], a[1], b[0], b[1]);
        else addSeg(bB, 0, 0, al, a[0], a[1], b[0], b[1]);
      }
      for (let i = 0; i < np.length; i++) {
        const p = np[i];
        let boost = 0;
        if (mpx != null) {
          const d = Math.hypot(mpx - p[0], mpy - p[1]);
          if (d < 130) {
            boost = 1 - d / 130;
            if (p[2] >= -0.2) addSeg(fB, 1, 1, boost * 0.9, mpx, mpy, p[0], p[1]);
          }
        }
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
        const rad = (1 + pulse * 1.1) * p[3] + boost * 3;
        const al = clamp(0.35 + 0.65 * ((p[2] + 1) / 2), 0.2, 1) + boost * 0.3;
        const item = [p[0], p[1], rad, boost > 0.2 ? 1 : 2, al];
        (p[2] >= 0 ? dotsF : dotsB).push(item);
      }

      // orbit rings + comets
      RINGS.forEach((rg, idx) => {
        const tx2 = rg.tx + Math.sin(t * 0.5 + idx) * 0.15;
        const ctx2 = Math.cos(tx2), stx = Math.sin(tx2);
        const ctz = Math.cos(rg.tz), stz = Math.sin(rg.tz);
        const ringPt = (a) => {
          let x = rg.r * Math.cos(a), y = 0, z = rg.r * Math.sin(a);
          const y1 = y * ctx2 - z * stx, z1 = y * stx + z * ctx2;
          const x2 = x * ctz - y1 * stz, y2 = x * stz + y1 * ctz;
          return proj(x2, y2, z1);
        };
        const pts = [];
        for (let i = 0; i <= 96; i++) pts.push(ringPt((i / 96) * 6.2832));
        poly(pts, rg.ci, 0, 0.28);

        const head = t * rg.sp * 1.6 + idx * 2;
        const dir = rg.sp >= 0 ? 1 : -1;
        const TR = 28;
        let prev = ringPt(head);
        for (let q = 1; q <= TR; q++) {
          const nxt = ringPt(head - dir * q * 0.05);
          const al = (1 - q / TR) * 0.95;
          const z = (prev[2] + nxt[2]) / 2;
          if (z >= 0) addSeg(fB, rg.ci, 1, al * 0.8, prev[0], prev[1], nxt[0], nxt[1]);
          else addSeg(bB, rg.ci, 1, al, prev[0], prev[1], nxt[0], nxt[1]);
          prev = nxt;
        }
        const hp = ringPt(head);
        (hp[2] >= 0 ? dotsF : dotsB).push([hp[0], hp[1], 3.2 * hp[3], rg.ci === 1 ? 1 : 2, 1]);
      });

      // draw back
      flush(bctx, bB);
      for (const d of dotsB) dot(bctx, d[0], d[1], d[2], d[3], d[4] * 0.8);
      // draw front
      flush(fctx, fB);
      for (const d of dotsF) dot(fctx, d[0], d[1], d[2], d[3], d[4] * 0.85);

      // click shockwaves
      for (let i = pulses.length - 1; i >= 0; i--) {
        const age = t - pulses[i];
        if (age > 1.4) { pulses.splice(i, 1); continue; }
        fctx.strokeStyle = rgba(CYAN, (1 - age / 1.4) * 0.7);
        fctx.lineWidth = 2;
        fctx.beginPath(); fctx.arc(cx, cy, R * (0.9 + age * 2.2), 0, 6.2832); fctx.stroke();
      }
    };

    // ---- loop with offscreen pause ----
    let visible = true, raf = 0, last = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);
    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      if (!visible) { last = 0; return; }
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      T += dt;
      draw(T, dt);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove, { capture: true });
      window.removeEventListener("mousemove", onMove, { capture: true });
      window.removeEventListener("touchmove", onMove, { capture: true });
      window.removeEventListener("touchstart", onMove, { capture: true });
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      onPointerDown={() => sharedRef.current.pulse && sharedRef.current.pulse()}
    >
      <canvas ref={backRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <Image
        src={logo}
        alt="INK3D"
        width={280}
        height={280}
        className="object-contain relative z-10"
        style={{ width: "62%", height: "auto", filter: "drop-shadow(0 0 24px rgba(174,31,227,0.55))" }}
        priority
      />
      <canvas ref={frontRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" aria-hidden="true" />
    </div>
  );
}
