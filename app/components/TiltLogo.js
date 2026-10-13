"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const LOGO = "/ink3d_v4_transparent_1.png";

// ---- tuning ----
const DEPTH = 22;                        // extrusion layers (more = smoother sides)
const STEP = 1.5;                        // px between layers (thickness = DEPTH * STEP)
const REST = { x: 6, y: -8, z: -2 };     // resting angle (degrees)
const RANGE = { x: 20, y: 30 };          // how far it tilts toward the cursor
const FOLLOW = 7;                        // higher = snappier follow
const SMOOTH = 12;                       // higher = less glide (second smoothing stage)
const IDLE_AFTER_MS = 2500;              // start gentle drifting after the mouse is still this long
const GLOW_TIGHT = 0.95;                 // inner glow strength (0-1)
const GLOW_WIDE = 0.55;                  // outer glow strength (0-1)
const GLOW_SPEED = 45;                   // color cycle speed (degrees per second)

const maskStyle = {
  WebkitMaskImage: `url("${LOGO}")`,
  maskImage: `url("${LOGO}")`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

const spinStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "170%",
  aspectRatio: "1 / 1",
  transform: "translate(-50%, -50%)",
  background:
    "conic-gradient(from 0deg, #ff0040, #ff8a00, #ffe600, #00ff6a, #00c8ff, #7a3cff, #ff00c8, #ff0040)",
};

export default function TiltLogo() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const gloss = glossRef.current;
    const shadow = shadowRef.current;
    if (!wrap || !card || !gloss || !shadow) return;
    const spinners = Array.from(card.querySelectorAll("[data-spin]"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const target = { x: 0, y: 0 }; // raw cursor, -1..1
    const cur = { x: 0, y: 0 };    // stage 1 smoothing
    const disp = { x: 0, y: 0 };   // stage 2 smoothing (what we draw)
    let idle = 0;                  // 0 = following cursor, 1 = drifting
    let lastMove = -1e9;
    let raf = 0;
    let visible = true;

    function render(t, idleW) {
      const wobX = reduce ? 0 : Math.cos(t * 0.7) * 0.32 * idleW;
      const wobY = reduce ? 0 : Math.sin(t * 0.9) * 0.22 * idleW;
      const nx = clamp(disp.x + wobX);
      const ny = clamp(disp.y + wobY);
      const lift = reduce ? 0 : Math.sin(t * 1.2) * 7;
      const rx = REST.x - ny * RANGE.x;
      const ry = REST.y + nx * RANGE.y;
      card.style.transform = `translate3d(0, ${lift}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${REST.z}deg)`;

      // glossy highlight + sheen follow the light
      const gx = 50 + nx * 55;
      const gy = 50 + ny * 55;
      const band = 50 + nx * 70;
      gloss.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.22) 16%, rgba(255,255,255,0) 38%), ` +
        `linear-gradient(112deg, rgba(255,255,255,0) ${band - 16}%, rgba(255,255,255,0.38) ${band}%, rgba(255,255,255,0) ${band + 16}%)`;

      // rgb color cycle
      const deg = reduce ? 0 : (t * GLOW_SPEED) % 360;
      for (const el of spinners) {
        el.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;
      }
      shadow.style.background = `radial-gradient(ellipse at center, hsla(${(deg + 280) % 360}, 100%, 60%, 0.5), transparent 70%)`;
      shadow.style.transform = `translateX(${-nx * 40}px) scaleX(${1 - Math.abs(nx) * 0.1})`;
    }

    if (reduce) {
      render(0, 0);
      return;
    }

    const start = performance.now();
    let last = start;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!visible) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const kFollow = 1 - Math.exp(-dt * FOLLOW);
      const kSmooth = 1 - Math.exp(-dt * SMOOTH);
      idle += ((now - lastMove > IDLE_AFTER_MS ? 1 : 0) - idle) * (1 - Math.exp(-dt * 1.5));
      cur.x += (target.x - cur.x) * kFollow;
      cur.y += (target.y - cur.y) * kFollow;
      disp.x += (cur.x - disp.x) * kSmooth;
      disp.y += (cur.y - disp.y) * kSmooth;
      render((now - start) / 1000, idle);
    }
    raf = requestAnimationFrame(frame);

    function onPoint(e) {
      const p = e.touches && e.touches[0] ? e.touches[0] : e;
      target.x = clamp(((p.clientX / window.innerWidth) * 2 - 1) * 1.15);
      target.y = clamp(((p.clientY / window.innerHeight) * 2 - 1) * 1.15);
      lastMove = performance.now();
    }
    function onLeave() {
      target.x = 0;
      target.y = 0;
    }
    window.addEventListener("pointermove", onPoint, { passive: true });
    window.addEventListener("touchmove", onPoint, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPoint);
      window.removeEventListener("touchmove", onPoint);
      document.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, []);

  const layers = Array.from({ length: DEPTH }, (_, i) => i + 1);
  const backZ = -(DEPTH * STEP);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto select-none"
      style={{ width: "clamp(280px, 64vw, 780px)", aspectRatio: "5 / 2", perspective: "1400px" }}
    >
      {/* floor glow */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: "10%",
          width: "80%",
          bottom: "-34px",
          height: "34px",
          borderRadius: "9999px",
          filter: "blur(18px)",
        }}
      />
      <div
        ref={cardRef}
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: `rotateX(${REST.x}deg) rotateY(${REST.y}deg) rotateZ(${REST.z}deg)`,
        }}
      >
        {/* RGB glow, wide + soft (blur wraps the masked layer so it spills outside the logo) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateZ(${backZ - 6}px) scale(1.05)`,
            filter: "blur(30px)",
            opacity: GLOW_WIDE,
          }}
        >
          <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
            <div data-spin style={spinStyle} />
          </div>
        </div>
        {/* RGB glow, tight + bright */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateZ(${backZ - 3}px) scale(1.015)`,
            filter: "blur(9px)",
            opacity: GLOW_TIGHT,
          }}
        >
          <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
            <div data-spin style={spinStyle} />
          </div>
        </div>

        {/* extrusion layers (thickness) */}
        {layers.map((i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              ...maskStyle,
              backgroundColor: `hsl(285, 70%, ${34 - (i / DEPTH) * 28}%)`,
              transform: `translateZ(${-i * STEP}px)`,
            }}
          />
        ))}

        {/* front face */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0.5px)" }}>
          <Image
            src={LOGO}
            alt="INK3D"
            fill
            priority
            quality={100}
            draggable={false}
            sizes="(max-width: 768px) 130vw, 1600px"
            className="object-contain"
          />
        </div>

        {/* glossy highlight + sheen, clipped to the logo shape */}
        <div
          ref={glossRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ ...maskStyle, transform: "translateZ(1.5px)" }}
        />
      </div>
    </div>
  );
}
