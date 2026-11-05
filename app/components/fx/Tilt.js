"use client";
import { useRef } from "react";

export default function Tilt({ children, max = 10, glare = true, className = "", style = {} }) {
  const ref = useRef(null);
  const g = useRef(null);

  function move(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
    if (g.current) {
      g.current.style.opacity = 1;
      g.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 55%)`;
    }
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (g.current) g.current.style.opacity = 0;
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={className}
      style={{ position: "relative", transformStyle: "preserve-3d", transition: "transform .25s ease-out", ...style }}
    >
      {children}
      {glare && (
        <div
          ref={g}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0, transition: "opacity .25s" }}
        />
      )}
    </div>
  );
}
