"use client";
import { useRef } from "react";

export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  function move(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  }
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={className}
      style={{ display: "inline-block", transition: "transform .2s ease-out" }}
    >
      {children}
    </div>
  );
}
