"use client";
import { useInView } from "../fx/InView";
import SectionHead from "./SectionHead";

const STEPS = [
  ["DESIGN", "Your team's look gets modeled in 3D."],
  ["PRINT", "Printed layer by layer at our studio."],
  ["FINISH", "Cleaned up, checked and packed."],
  ["SHIP", "Out the door in 3–7 business days."],
];

export default function HowItWorks() {
  const [ref, seen] = useInView(0.25);
  return (
    <section className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <SectionHead label="SYS://PROCESS" line1="HOW IT'S" line2="MADE" />
      <div ref={ref} className="relative">
        <div className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-white/10" />
        <div
          className="hidden md:block absolute left-0 top-[22px] h-px"
          style={{
            width: "100%",
            transformOrigin: "left",
            transform: seen ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1.8s cubic-bezier(.2,.7,.2,1)",
            background: "linear-gradient(90deg,#ae1fe3,#fff)",
            boxShadow: "0 0 10px #ae1fe3",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {STEPS.map(([t, d], i) => (
            <div
              key={t}
              style={{
                opacity: seen ? 1 : 0,
                transform: seen ? "none" : "translateY(24px)",
                transition: `all .8s cubic-bezier(.2,.7,.2,1) ${300 + i * 250}ms`,
              }}
            >
              <div
                className="font-mono-custom flex items-center justify-center text-xs font-black mb-5"
                style={{ width: 44, height: 44, border: "1px solid #ae1fe3", background: "#050505", color: "#ae1fe3", position: "relative", zIndex: 1 }}
              >
                0{i + 1}
              </div>
              <div className="font-black tracking-widest text-xl mb-2">{t}</div>
              <p className="font-mono-custom text-white/35 text-xs leading-relaxed max-w-[220px]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
