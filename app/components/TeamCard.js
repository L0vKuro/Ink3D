"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";
const pad = (n) => String(n).padStart(2, "0");

export default function TeamCard({ team, index, total, onOpen }) {
  const ref = useRef(null);
  const timer = useRef(null);
  const [label, setLabel] = useState(team.name);

  useEffect(() => () => clearInterval(timer.current), []);

  const scramble = () => {
    clearInterval(timer.current);
    const target = team.name;
    const frames = 14;
    let f = 0;
    timer.current = setInterval(() => {
      f++;
      const reveal = Math.floor((f / frames) * target.length);
      setLabel(
        target
          .split("")
          .map((ch, i) =>
            ch === " " || i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (f >= frames) {
        clearInterval(timer.current);
        setLabel(target);
      }
    }, 30);
  };

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x * 100 + "%");
    el.style.setProperty("--my", y * 100 + "%");
    el.style.setProperty("--rx", (0.5 - y) * 12 + "deg");
    el.style.setProperty("--ry", (x - 0.5) * 14 + "deg");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const c = team.color;
  const bars = Math.min(team.items.length, 8);

  return (
    <div
      ref={ref}
      className="tc"
      style={{ "--tc": c, "--tc-a": c + "22", "--tc-b": c + "88", "--i": index }}
      onClick={onOpen}
      onPointerEnter={scramble}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="tc-inner">
        <span className="tc-border" />
        <span className="tc-grid grid-bg" />
        <span className="tc-spot" />
        <span className="tc-corner tl" />
        <span className="tc-corner tr" />
        <span className="tc-corner bl" />
        <span className="tc-corner br" />

        <div className="tc-hud font-mono-custom">
          <span>UNIT {pad(index + 1)}/{pad(total)}</span>
          <span className="tc-live"><i />ACTIVE</span>
        </div>

        <div className="tc-stage">
          <div className="tc-orbit o1" />
          <div className="tc-orbit o2" />
          <div className="tc-logo">
            <Image src={team.logo} alt={team.name} fill className="object-contain" />
          </div>
          <span className="tc-scan" />
        </div>

        <div className="tc-info">
          <div className="tc-meta font-mono-custom">
            <div className="tc-bars">
              {Array.from({ length: bars }).map((_, k) => (
                <i key={k} style={{ "--k": k }} />
              ))}
            </div>
            <span>{team.items.length} ITEMS</span>
          </div>
          <h3 className="tc-name">{label}</h3>
          <div className="tc-cta font-mono-custom">
            <span>ACCESS STORE</span>
            <b>→</b>
          </div>
        </div>
      </div>
    </div>
  );
}
