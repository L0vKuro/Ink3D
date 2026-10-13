"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const LOGO = "/ink3d_v4_transparent_1.png";
const DEPTH = 14;               // number of extrusion layers (more = thicker)
const STEP = 2.5;               // px between layers
const REST = { x: 9, y: -18, z: -3 };   // resting angle (degrees)
const RANGE = { x: 16, y: 26 };         // how far it tilts toward the cursor

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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;
    const clamp = (v) => Math.max(-1, Math.min(1, v));

    function render(t) {
      const nx = clamp(cur.x + (reduce ? 0 : Math.cos(t * 0.7) * 0.14));
      const ny = clamp(cur.y + (reduce ? 0 : Math.sin(t * 0.9) * 0.1));
      const lift = reduce ? 0 : Math.sin(t * 1.2) * 8;
      const rx = REST.x - ny * RANGE.x;
      const ry = REST.y + nx * RANGE.y;
      card.style.transform = `translate3d(0, ${lift}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${REST.z}deg)`;
      const gx = 50 + nx * 55;
      const gy = 50 + ny * 55;
      const band = 50 + nx * 70;
      gloss.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.22) 16%, rgba(255,255,255,0) 38%), ` +
        `linear-gradient(112deg, rgba(255,255,255,0) ${band - 16}%, rgba(255,255,255,0.38) ${band}%, rgba(255,255,255,0) ${band + 16}%)`;
      shadow.style.transform = `translateX(${-nx * 40}px) scaleX(${1 - Math.abs(nx) * 0.1})`;
    }

    if (reduce) {
      render(0);
      return;
    }

    const start = performance.now();
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      render((now - start) / 1000);
    }
    raf = requestAnimationFrame(frame);

    function onPoint(e) {
      const p = e.touches && e.touches[0] ? e.touches[0] : e;
      target.x = clamp((p.clientX / window.innerWidth) * 2 - 1);
      target.y = clamp((p.clientY / window.innerHeight) * 2 - 1);
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

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto select-none"
      style={{ width: "clamp(280px, 64vw, 780px)", aspectRatio: "5 / 2", perspective: "1200px" }}
    >
      {/* floor glow / shadow */}
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
          background: "radial-gradient(ellipse at center, rgba(174,31,227,0.5), transparent 70%)",
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
        {/* extrusion layers (give the logo thickness) */}
        {layers.map((i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              ...maskStyle,
              backgroundColor: `hsl(285, 70%, ${30 - (i / DEPTH) * 24}%)`,
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
            draggable={false}
            sizes="(max-width: 768px) 64vw, 780px"
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
