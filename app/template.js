"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STAGGER = 70; // ms between each piece flowing in
const MAX = 16;     // pieces past this number share the last delay

function usable(el) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "NAV" || tag === "SCRIPT" || tag === "STYLE") return false;
  const cs = window.getComputedStyle(el);
  if (cs.display === "none") return false;
  if (cs.position === "fixed" || cs.position === "absolute" || cs.position === "sticky") return false;
  if (cs.animationName && cs.animationName !== "none") return false; // leave existing animations (marquees etc.) alone
  return true;
}

// Break wrappers and grids into their children so the pieces cascade one by one.
function expand(el, depth) {
  const kids = Array.from(el.children).filter((k) => k instanceof HTMLElement);
  const display = window.getComputedStyle(el).display;
  const isWrapper = el.tagName === "DIV" && kids.length >= 2;
  const isGrid = display === "grid" && kids.length >= 2;
  if (depth < 2 && (isWrapper || isGrid)) {
    const out = [];
    for (const k of kids) {
      if (!usable(k)) continue;
      out.push(...expand(k, depth + 1));
    }
    return out;
  }
  return [el];
}

export default function Template({ children }) {
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const main = root.querySelector("main");
    if (!main) return;

    const list = [];
    for (const child of Array.from(main.children)) {
      if (!usable(child)) continue;
      list.push(...expand(child, 0));
    }
    list.forEach((el, i) => {
      el.classList.add("flow-in");
      el.style.animationDelay = `${Math.min(i, MAX) * STAGGER}ms`;
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
