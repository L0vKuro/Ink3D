/* ===== INK3D THEME (added) ===== */

/* soft purple / white / black aurora over every page */
.ink-aurora {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  mix-blend-mode: screen; opacity: .55;
  background:
    radial-gradient(60% 50% at 12% 0%, rgba(120,60,200,.35), transparent 70%),
    radial-gradient(50% 45% at 100% 20%, rgba(220,205,255,.14), transparent 70%),
    radial-gradient(70% 40% at 50% 110%, rgba(174,31,227,.18), transparent 70%);
  animation: ink-aurora-drift 18s ease-in-out infinite alternate;
}
@keyframes ink-aurora-drift {
  from { transform: translate3d(0,0,0) scale(1); }
  to   { transform: translate3d(-2%,1.5%,0) scale(1.06); }
}

/* big headlines: condensed font + white > lilac > purple gradient */
main h1[class*="text-"],
main h2[class*="text-4xl"],
main h2[class*="text-5xl"],
main h2[class*="text-6xl"],
.ink-title {
  font-family: 'Anton', 'Bebas Neue', Impact, sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: .01em;
  background-image: linear-gradient(100deg, #ffffff 0%, #ece4ff 28%, #c9a2ff 58%, #ae1fe3 82%, #ffffff 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ink-title-sheen 8s ease-in-out infinite alternate;
}
main h1 span, main h2 span { -webkit-text-fill-color: currentColor; }
@keyframes ink-title-sheen {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}

/* labels: breadcrumb + chips */
.ink-hud {
  position: fixed; left: 20px; bottom: 20px; z-index: 30;
  display: flex; flex-direction: column; gap: 8px; pointer-events: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.ink-crumb { font-size: 10px; letter-spacing: .3em; color: rgba(255,255,255,.45); }
.ink-crumb b { color: #fff; }
.ink-chips { display: flex; gap: 8px; }
.ink-chip {
  display: flex; align-items: center; font-size: 10px; letter-spacing: .18em;
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(5,5,5,.82); backdrop-filter: blur(8px);
}
.ink-chip b { background: #ece4ff; color: #050505; padding: 6px 10px; font-weight: 800; }
.ink-chip span { padding: 6px 10px; color: rgba(255,255,255,.75); }
.ink-chip-live { border-color: rgba(174,31,227,.6); padding: 6px 10px; color: #e4cfff; }
.ink-chip-live i {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: #ae1fe3; margin-right: 8px; box-shadow: 0 0 8px #ae1fe3;
  animation: ink-pulse 1.6s ease-in-out infinite;
}
@keyframes ink-pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

/* glossy black pearl with white rings (mouse + scroll reactive) */
.ink-orb-wrap {
  position: fixed; right: 28px; bottom: 44px; z-index: 30;
  width: 150px; height: 150px; pointer-events: none; perspective: 700px;
  animation: ink-bob 6s ease-in-out infinite;
}
@keyframes ink-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.ink-orb-core {
  position: absolute; inset: 0; border-radius: 50%;
  background:
    radial-gradient(circle at 32% 26%, rgba(255,255,255,.6), transparent 16%),
    radial-gradient(circle at 50% 60%, #2b0f3f 0%, #0a0510 55%, #000 100%);
  box-shadow: inset -10px -14px 30px rgba(174,31,227,.45), 0 0 40px rgba(174,31,227,.35);
}
.ink-orb { position: absolute; inset: 0; transform-style: preserve-3d; will-change: transform; }
.ink-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 3px solid transparent;
  filter: drop-shadow(0 0 6px rgba(255,255,255,.7));
}
.ink-ring.r1 { border-top-color: #fff; border-right-color: #fff; transform: rotateX(72deg); }
.ink-ring.r2 { border-left-color: #fff; border-bottom-color: rgba(255,255,255,.7); transform: rotateY(68deg) rotateZ(28deg); }
.ink-ring.r3 { border-top-color: #d9b8ff; border-bottom-color: #ae1fe3; transform: rotateX(25deg) rotateY(55deg); }
.ink-orb-label {
  position: absolute; left: 0; right: 0; bottom: -22px; text-align: center;
  font: 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .3em; color: rgba(255,255,255,.4);
}
@media (max-width: 767px) {
  .ink-orb-wrap { display: none; }
  .ink-hud { left: 12px; bottom: 12px; }
}
