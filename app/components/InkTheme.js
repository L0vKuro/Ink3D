/* glossy black pearl with white rings (mouse + scroll reactive) */
.ink-orb-wrap {
  position: fixed; top: 0; left: 0; z-index: 30;
  width: 150px; height: 150px; pointer-events: none;
  transform-origin: 0 0;
  transition: transform .9s cubic-bezier(.22, 1, .36, 1);
  will-change: transform;
  opacity: 0;
}
.ink-orb-wrap.ready { opacity: 1; }
.ink-orb-wrap.docked { z-index: 60; }
.ink-orb-bob {
  position: absolute; inset: 0; perspective: 700px;
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
  transition: opacity .3s ease;
}
.ink-orb-wrap.docked .ink-orb-label { opacity: 0; }
@media (max-width: 767px) {
  .ink-orb-wrap:not(.docked) { display: none; }
  .ink-hud { left: 12px; bottom: 12px; }
}
