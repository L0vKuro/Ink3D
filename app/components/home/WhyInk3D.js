import InView from "../fx/InView";
import Tilt from "../fx/Tilt";
import SectionHead from "./SectionHead";

const CARDS = [
  ["01", "PRINTED IN-HOUSE", "Every piece is 3D printed at our studio in Milford, NH."],
  ["02", "TEAM EXCLUSIVE", "Designs built around real esports orgs and creators."],
  ["03", "3–7 DAY DELIVERY", "Fast turnaround. Free shipping on orders over $50."],
  ["04", "100% SATISFACTION", "Not happy? We make it right. See our returns policy."],
];

export default function WhyInk3D() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <SectionHead label="SYS://WHY_INK3D" line1="BUILT" line2="DIFFERENT" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map(([n, t, d], i) => (
          <InView key={n} delay={i * 90}>
            <Tilt max={12} style={{ background: "#08080a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4 }}>
              <div className="p-7" style={{ transform: "translateZ(30px)" }}>
                <div className="font-mono-custom text-[11px] tracking-[0.3em] mb-6" style={{ color: "#ae1fe3" }}>
                  {n}
                </div>
                <div className="font-black tracking-wider text-lg mb-3">{t}</div>
                <p className="font-mono-custom text-white/35 text-xs leading-relaxed">{d}</p>
              </div>
            </Tilt>
          </InView>
        ))}
      </div>
    </section>
  );
}
