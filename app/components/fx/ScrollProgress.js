"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const bar = useRef(null);
  const label = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (label.current) label.current.textContent = `SCROLL ${String(Math.round(p * 100)).padStart(3, "0")}%`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const t = setTimeout(update, 400);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60, pointerEvents: "none" }}
      >
        <div
          ref={bar}
          style={{
            height: "100%",
            transformOrigin: "left",
            transform: "scaleX(0)",
            background: "linear-gradient(90deg, #ae1fe3, #ffffff)",
            boxShadow: "0 0 10px #ae1fe3",
          }}
        />
      </div>
      <div
        ref={label}
        aria-hidden="true"
        className="font-mono-custom"
        style={{
          position: "fixed",
          right: 8,
          top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
          fontSize: 9,
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.25)",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        SCROLL 000%
      </div>
    </>
  );
}
