"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import InView from "../fx/InView";
import Magnetic from "../fx/Magnetic";
import Tilt from "../fx/Tilt";

// EDIT THESE when you plan a real drop. Once the date passes, the whole section hides itself.
const DROP = {
  label: "NEXT_DROP",
  title: "NEW TEAM DROP",
  date: "2026-12-01T12:00:00-05:00",
  blurb: "// new designs, limited batches. be early.",
  href: "/teams",
};

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["DAYS", Math.floor(s / 86400)],
    ["HRS", Math.floor((s % 86400) / 3600)],
    ["MIN", Math.floor((s % 3600) / 60)],
    ["SEC", s % 60],
  ];
}

export default function DropCountdown() {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const target = new Date(DROP.date).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null || left <= 0) return null;

  return (
    <section className="px-6 md:px-12 py-20">
      <InView>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="font-mono-custom inline-flex items-center gap-3 mb-6 px-4 py-2 text-[10px] tracking-[0.3em]"
            style={{ border: "1px solid rgba(174,31,227,0.35)", color: "rgba(255,255,255,0.6)" }}
          >
            <span className="fx-dot" /> STUDIO STATUS: PRINTING — ORDERS OPEN
          </div>
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{ color: "#ae1fe366" }}>
            SYS://{DROP.label}
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-3 leading-none">{DROP.title}</h2>
          <p className="font-mono-custom text-white/30 text-sm mb-10">{DROP.blurb}</p>
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto mb-10">
            {parts(left).map(([k, v]) => (
              <Tilt key={k} max={14} className="fx-border" style={{ background: "#08080a", borderRadius: 4 }}>
                <div className="py-5 md:py-7">
                  <div className="font-black text-3xl md:text-5xl" style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                    {String(v).padStart(2, "0")}
                  </div>
                  <div className="font-mono-custom text-[9px] tracking-[0.25em] text-white/30 mt-1">{k}</div>
                </div>
              </Tilt>
            ))}
          </div>
          <Magnetic>
            <Link
              href={DROP.href}
              className="font-black px-12 py-4 text-xs tracking-[0.25em] inline-block"
              style={{ background: "#ae1fe3", color: "#fff" }}
            >
              GET NOTIFIED — BROWSE TEAMS
            </Link>
          </Magnetic>
        </div>
      </InView>
    </section>
  );
}
