"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* slide-in on scroll */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`ap-reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </div>
  );
}

/* 3D tier rank card */
export function TierCard({ tier, index, total }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    const target = parseInt(tier.commission, 10);
    const t0 = performance.now() + index * 120;
    let raf;
    const tick = (now) => {
      const p = clamp((now - t0) / 900, 0, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x * 100 + "%");
    el.style.setProperty("--my", y * 100 + "%");
    el.style.setProperty("--rx", (0.5 - y) * 6 + "deg");
    el.style.setProperty("--ry", (x - 0.5) * 8 + "deg");
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const c = tier.color;
  return (
    <div
      ref={ref}
      className={`ap-tier ap-reveal ${shown ? "in" : ""}`}
      style={{ "--tc": c, "--tc-a": c + "22", "--tc-b": c + "88", "--i": index, transitionDelay: index * 110 + "ms" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className={`ap-tier-inner ${shown ? "in" : ""}`}>
        <span className="ap-border" />
        <span className="ap-spot" />
        <span className="ap-scan" />
        <span className="ap-rail"><i /></span>

        <div className="absolute top-3 right-4 font-mono-custom text-[9px] tracking-[0.3em] text-white/25">
          LVL {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 pl-8 md:pl-10">
          <div className="text-4xl shrink-0 ap-icon">{tier.icon}</div>
          <div className="shrink-0 md:w-32">
            <div className="font-mono-custom text-[9px] tracking-widest text-white/30 mb-1">{tier.label}</div>
            <div className="font-black text-lg tracking-wide" style={{ color: c, textShadow: `0 0 18px ${c}66` }}>{tier.name}</div>
            <div className="ap-lvl">
              {Array.from({ length: total }).map((_, k) => (
                <i key={k} className={k <= index ? "on" : ""} style={{ "--k": k }} />
              ))}
            </div>
          </div>
          <p className="font-mono-custom text-white/40 text-sm leading-relaxed flex-1">{tier.desc}</p>
          <div className="text-left md:text-right shrink-0">
            <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">COMMISSION</div>
            <div className="font-black text-3xl ap-num" style={{ color: c }}>{n}%</div>
            <div className="font-mono-custom text-[8px] text-white/20 tracking-widest">PER SALE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* celebration burst on success screen */
export function SuccessBurst() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const cx = w / 2, cy = h * 0.42;
    const cols = ["174,31,227", "70,230,255", "236,228,255", "201,162,255"];
    const ps = Array.from({ length: 180 }, () => {
      const a = Math.random() * 6.2832;
      const sp = 120 + Math.random() * 520;
      return {
        x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 120,
        life: 1, decay: 0.35 + Math.random() * 0.6,
        c: cols[Math.floor(Math.random() * 4)], s: 1 + Math.random() * 2.5,
      };
    });
    let raf, last = performance.now();
    const start = last;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 3; k++) {
        const age = t - k * 0.18;
        if (age > 0 && age < 1.4) {
          const f = age / 1.4;
          ctx.strokeStyle = `rgba(${cols[k % 2]},${(1 - f) * 0.8})`;
          ctx.lineWidth = 3 * (1 - f) + 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, f * Math.max(w, h) * 0.6, 0, 6.2832);
          ctx.stroke();
        }
      }
      let alive = false;
      for (const p of ps) {
        if (p.life <= 0) continue;
        alive = true;
        p.vy += 380 * dt;
        p.vx *= 1 - 1.2 * dt;
        p.vy *= 1 - 0.6 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        ctx.fillStyle = `rgba(${p.c},${Math.max(p.life, 0)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 6.2832);
        ctx.fill();
      }
      if (!alive && t > 1.6) {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}
    />
  );
}
