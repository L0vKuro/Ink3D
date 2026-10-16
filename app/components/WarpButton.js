"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const COLORS = ["174,31,227", "70,230,255", "236,228,255"];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function WarpOverlay({ origin, onDone }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    // suck the page itself into the portal
    const main = document.querySelector("main");
    if (main) {
      main.style.transition =
        "transform 1.1s cubic-bezier(.55,0,1,.45), opacity .9s ease-in, filter 1s ease-in";
      main.style.transformOrigin = `${origin.x}px ${origin.y + window.scrollY}px`;
      requestAnimationFrame(() => {
        main.style.transform = "perspective(1000px) translateZ(420px) rotateX(6deg)";
        main.style.opacity = "0";
        main.style.filter = "blur(8px)";
      });
    }

    const stars = Array.from({ length: 260 }, () => ({
      a: Math.random() * 6.2832,
      r: 0.05 + Math.random() * 1.4,
      z: Math.random() * 0.98 + 0.02,
      c: Math.floor(Math.random() * 3),
    }));
    const GATES = 12;

    let raf = 0, done = false, zOff = 0;
    const start = performance.now();
    let last = start;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const t = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = clamp(t / 1.45, 0, 1);
      const spd = 0.25 + 3.2 * Math.pow(p, 2.2);

      wrap.style.background = `rgba(5,5,5,${sstep(0, 0.45, t)})`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const S = Math.min(w, h) * 0.12;
      const maxD = Math.hypot(w, h);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(t * 2.2) * 0.06 * p);
      ctx.translate(-cx, -cy);
      ctx.globalCompositeOperation = "lighter";

      // center glow
      const gr = Math.min(w, h) * 0.45;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
      grd.addColorStop(0, `rgba(236,228,255,${0.15 + 0.7 * p * p})`);
      grd.addColorStop(0.25, `rgba(174,31,227,${0.2 + 0.4 * p})`);
      grd.addColorStop(1, "rgba(174,31,227,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // hex gates rushing at the camera
      zOff += spd * dt * 0.3;
      for (let i = 0; i < GATES; i++) {
        const z = (((i / GATES - zOff) % 1) + 1) % 1;
        if (z < 0.04) continue;
        const rad = (S * 1.1) / z;
        const ang = i * 0.35 + t * 0.8 * (i % 2 ? 1 : -1);
        const al = clamp((1 - z) * 1.4, 0, 1) * 0.9;
        const col = i % 3 === 0 ? COLORS[1] : COLORS[0];
        ctx.strokeStyle = `rgba(${col},${al})`;
        ctx.lineWidth = 1 + (1 - z) * 3.5;
        ctx.shadowColor = `rgba(${col},0.9)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let k = 0; k <= 6; k++) {
          const a = ang + (k / 6) * 6.2832;
          const x = cx + Math.cos(a) * rad;
          const y = cy + Math.sin(a) * rad;
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // star streaks
      for (const s of stars) {
        s.z -= spd * dt * 0.5;
        const px = cx + (Math.cos(s.a) * s.r / s.z) * S;
        const py = cy + (Math.sin(s.a) * s.r / s.z) * S;
        if (s.z <= 0.02 || px < -w * 0.3 || px > w * 1.3 || py < -h * 0.3 || py > h * 1.3) {
          s.z = 1;
          s.a = Math.random() * 6.2832;
          s.r = 0.05 + Math.random() * 1.4;
          continue;
        }
        const zp = Math.min(1, s.z + spd * 0.045);
        const qx = cx + (Math.cos(s.a) * s.r / zp) * S;
        const qy = cy + (Math.sin(s.a) * s.r / zp) * S;
        ctx.strokeStyle = `rgba(${COLORS[s.c]},${clamp((1 - s.z) * 1.2, 0, 1)})`;
        ctx.lineWidth = 0.6 + (1 - s.z) * 1.8;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalCompositeOperation = "lighter";

      // shockwaves from the button
      for (let k = 0; k < 2; k++) {
        const age = t - k * 0.15;
        if (age > 0 && age < 0.9) {
          const f = age / 0.9;
          ctx.strokeStyle = `rgba(${k ? COLORS[0] : COLORS[1]},${(1 - f) * 0.9})`;
          ctx.lineWidth = 3 * (1 - f) + 0.5;
          ctx.beginPath();
          ctx.arc(origin.x, origin.y, f * maxD * 0.9, 0, 6.2832);
          ctx.stroke();
        }
      }

      // glitch bars
      if (t > 0.85 && t < 1.5) {
        for (let k = 0; k < 4; k++) {
          ctx.fillStyle = `rgba(${COLORS[Math.floor(Math.random() * 3)]},${0.1 + Math.random() * 0.2})`;
          ctx.fillRect(Math.random() * w * 0.3, Math.random() * h, w * (0.3 + Math.random() * 0.7), 2 + Math.random() * 14);
        }
      }

      // flash then dark
      ctx.globalCompositeOperation = "source-over";
      const fl = sstep(1.25, 1.45, t) * (1 - sstep(1.5, 1.78, t));
      if (fl > 0) {
        ctx.fillStyle = `rgba(236,228,255,${fl})`;
        ctx.fillRect(0, 0, w, h);
      }

      // readout text
      if (textRef.current) {
        textRef.current.style.opacity = String(sstep(0.35, 0.6, t) * (1 - sstep(1.2, 1.4, t)));
        barRef.current.style.width = p * 100 + "%";
        pctRef.current.textContent = Math.floor(p * 100) + "%";
      }

      if (!done && t >= 1.78) {
        done = true;
        doneRef.current();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (main) {
        main.style.transition = "";
        main.style.transform = "";
        main.style.opacity = "";
        main.style.filter = "";
        main.style.transformOrigin = "";
      }
    };
  }, []);

  const corner = (pos) => ({
    position: "absolute",
    width: 28,
    height: 28,
    border: "0 solid #ae1fe3",
    ...pos,
  });

  return createPortal(
    <div
      ref={wrapRef}
      style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(5,5,5,0)", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div style={corner({ top: 20, left: 20, borderTopWidth: 2, borderLeftWidth: 2 })} />
      <div style={corner({ top: 20, right: 20, borderTopWidth: 2, borderRightWidth: 2 })} />
      <div style={corner({ bottom: 20, left: 20, borderBottomWidth: 2, borderLeftWidth: 2 })} />
      <div style={corner({ bottom: 20, right: 20, borderBottomWidth: 2, borderRightWidth: 2 })} />
      <div
        ref={textRef}
        style={{
          position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)",
          textAlign: "center", opacity: 0, fontFamily: "'Space Mono', monospace", color: "#fff",
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#ae1fe3", marginBottom: 12 }}>
          ◆ SYS://OPENING_PORTAL
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.3em", textShadow: "0 0 24px #ae1fe3" }}>
          ENTERING APPLY
        </div>
        <div style={{ width: 220, height: 2, background: "rgba(255,255,255,.15)", margin: "18px auto 8px" }}>
          <div ref={barRef} style={{ height: "100%", width: "0%", background: "#ae1fe3", boxShadow: "0 0 10px #ae1fe3" }} />
        </div>
        <div ref={pctRef} style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,.5)" }}>0%</div>
      </div>
    </div>,
    document.body
  );
}

export default function WarpButton({ href, children, ...rest }) {
  const router = useRouter();
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <>
      <button
        {...rest}
        onClick={(e) => {
          if (origin) return;
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }}
      >
        {children}
      </button>
      {origin && <WarpOverlay origin={origin} onDone={() => router.push(href)} />}
    </>
  );
}
