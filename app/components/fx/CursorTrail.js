"use client";
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w = 0;
    let h = 0;
    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    resize();
    const pts = [];
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].life -= 0.045;
        if (pts[i].life <= 0) pts.splice(i, 1);
      }
      ctx.lineCap = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const l = Math.min(a.life, b.life);
        ctx.strokeStyle = `rgba(${174 + Math.round(81 * (1 - l))},${31 + Math.round(190 * (1 - l))},227,${l * 0.55})`;
        ctx.lineWidth = 1 + l * 4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      raf = pts.length > 1 ? requestAnimationFrame(draw) : 0;
      if (!raf) ctx.clearRect(0, 0, w, h);
    };

    const move = (e) => {
      pts.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (pts.length > 40) pts.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 45 }}
    />
  );
}
