"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const TABS = [
  ["/", "HOME"],
  ["/teams", "TEAMS"],
  ["/creators", "CREATORS"],
  ["/program", "PROGRAM"],
  ["/merch", "MERCH"],
  ["/originals", "ORIGINALS"],
  ["/about", "ABOUT"],
  ["/photos", "PHOTOS"],
];

const FULL = 150; // orb size at rest
const DOCK = 44; // orb size next to the logo

export default function InkTheme() {
  const path = usePathname() || "/";
  const orb = useRef(null);
  const wrap = useRef(null);

  const idx = TABS.findIndex(([p]) => (p === "/" ? path === "/" : path.startsWith(p)));
  const tab = idx >= 0 ? TABS[idx] : null;

  // condensed display font (loaded once)
  useEffect(() => {
    if (document.getElementById("ink-font")) return;
    const l = document.createElement("link");
    l.id = "ink-font";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
    document.head.appendChild(l);
  }, []);

  // mouse + scroll reactive 3D orb
  useEffect(() => {
    const el = orb.current;
    if (!el) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, spin = 0, raf = 0;
    let last = performance.now();
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 5);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      spin += dt * 14;
      const sc = window.scrollY * 0.08;
      el.style.transform = `rotateX(${10 - cy * 25}deg) rotateY(${cx * 35 + spin + sc}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [!!tab]);

  // fly between bottom-right (top of page) and next to the nav logo (scrolled)
  useEffect(() => {
    const w = wrap.current;
    if (!w) return;
    let first = true;

    const place = () => {
      const docked = window.scrollY > 24;
      let x, y, s;
      if (docked) {
        s = DOCK / FULL;
        const a = document.querySelector('nav a[href="/"]');
        const r = a ? a.getBoundingClientRect() : null;
        if (r && r.width > 20) {
          x = r.right + 12;
          y = r.top + r.height / 2 - DOCK / 2;
        } else {
          x = window.innerWidth >= 768 ? 154 : 128;
          y = 8;
        }
      } else {
        s = 1;
        x = window.innerWidth - 28 - FULL;
        y = window.innerHeight - 44 - FULL;
      }
      w.classList.toggle("docked", docked);
      w.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      if (first) {
        first = false;
        requestAnimationFrame(() => {
          w.style.transition = "";
          w.classList.add("ready");
        });
      }
    };

    w.style.transition = "none";
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [!!tab]);

  if (!tab) return null;
  const num = String(idx + 1).padStart(2, "0");
  const total = String(TABS.length).padStart(2, "0");

  return (
    <>
      <div className="ink-aurora" aria-hidden="true" />

      <div className="ink-hud" aria-hidden="true">
        <div className="ink-crumb">INK3D / <b>{tab[1]}</b></div>
        <div className="ink-chips">
          <div className="ink-chip"><b>TAB {num}</b><span>OF {total} · 3D PRINTING THE GAME</span></div>
          <div className="ink-chip ink-chip-live"><i />ONLINE</div>
        </div>
      </div>

      <div className="ink-orb-wrap" ref={wrap} aria-hidden="true">
        <div className="ink-orb-bob">
          <div className="ink-orb-core" />
          <div className="ink-orb" ref={orb}>
            <div className="ink-ring r1" />
            <div className="ink-ring r2" />
            <div className="ink-ring r3" />
          </div>
          <div className="ink-orb-label">INK3D · {tab[1]}</div>
        </div>
      </div>
    </>
  );
}
