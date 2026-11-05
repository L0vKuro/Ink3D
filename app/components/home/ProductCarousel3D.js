"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHead from "./SectionHead";

const ITEMS = [
  { name: "KEYCHAIN", price: "$12.99", image: "/reignabove-keychain.png" },
  { name: "CUBAN HYPE CHAIN", price: "$34.99", image: "/ninefly-cubanhypechain.png" },
  { name: "LIGHTBOX", price: "$49.99", image: "/eym-lightbox.png" },
  { name: "COASTER", price: "$9.99", image: "/vaultix-coaster.png" },
  { name: "CUBAN NECKLACE", price: "$59.99", image: "/outkastz-cuban necklace.png" },
  { name: "WALL ART", price: "$39.99", image: "/vaultix-wallart.pmg.png" },
];
const N = ITEMS.length;
const STEP = 360 / N;
const R = 300;

export default function ProductCarousel3D() {
  const ring = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let angle = 0;
    let vel = 0.12;
    let drag = false;
    let lastX = 0;
    let visible = false;
    let hover = false;
    let raf = 0;

    const render = () => {
      if (ring.current) ring.current.style.transform = `translateZ(-${R}px) rotateY(${angle}deg)`;
    };
    const tick = () => {
      raf = 0;
      if (!visible) return;
      if (!drag) {
        angle += vel;
        vel += ((hover ? 0 : 0.12) - vel) * 0.05;
      }
      render();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        start();
      },
      { threshold: 0.05 }
    );
    io.observe(el);

    const down = (e) => {
      drag = true;
      lastX = e.clientX;
    };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      angle += dx * 0.35;
      vel = dx * 0.35;
    };
    const up = () => {
      drag = false;
    };
    const enter = () => {
      hover = true;
    };
    const leave = () => {
      hover = false;
      drag = false;
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    render();

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-24 overflow-hidden relative">
      <SectionHead label="SYS://3D_SHOWROOM" line1="SPIN THE" line2="DROP" />
      <div
        ref={wrap}
        style={{ perspective: 1100, height: 440, cursor: "grab", touchAction: "pan-y", userSelect: "none" }}
      >
        <div
          ref={ring}
          style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {ITEMS.map((it, i) => (
            <div
              key={it.name}
              className="fx-border"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 220,
                height: 290,
                marginLeft: -110,
                marginTop: -145,
                transform: `rotateY(${i * STEP}deg) translateZ(${R}px)`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "linear-gradient(180deg,#0f0a14,#050505)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1, position: "relative", padding: 16 }}>
                <img
                  src={encodeURI(it.image)}
                  alt={it.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
                />
              </div>
              <div
                className="font-mono-custom"
                style={{
                  padding: "10px 14px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{it.name}</span>
                <span style={{ color: "#ae1fe3" }}>{it.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-6">
        <Link
          href="/teams"
          className="font-mono-custom text-[10px] tracking-[0.3em] text-white/40 hover:text-white transition-colors"
        >
          DRAG TO SPIN — SHOP ALL TEAMS →
        </Link>
      </div>
    </section>
  );
}
