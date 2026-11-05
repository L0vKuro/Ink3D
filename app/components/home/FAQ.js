"use client";
import { useState } from "react";
import Link from "next/link";
import InView from "../fx/InView";
import SectionHead from "./SectionHead";

const QA = [
  ["How long does shipping take?", "Orders arrive in 3–7 business days."],
  ["Is shipping free?", "Yes — free shipping on all orders over $50."],
  ["Can I get gear for my team or org?", "Browse the Teams page to see designs we've built for esports orgs. Want yours? Reach out on Discord."],
  ["What about returns?", "We stand behind everything we print. Full details are on our Returns page."],
  ["Can I earn money promoting INK3D?", "Yes. Our affiliate program pays 10% commission with a 30-day cookie."],
];

const ld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-6 md:px-12 py-24 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SectionHead label="SYS://FAQ" line1="QUICK" line2="ANSWERS" />
      <div>
        {QA.map(([q, a], i) => (
          <InView key={q} delay={i * 60} y={16}>
            <div className="border-b border-white/[0.08]">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex justify-between items-center text-left py-5 font-black tracking-wider text-sm md:text-base"
                aria-expanded={open === i}
              >
                <span>{q}</span>
                <span
                  style={{
                    color: "#ae1fe3",
                    transition: "transform .3s",
                    transform: open === i ? "rotate(45deg)" : "none",
                    fontSize: 22,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div className={`fx-faq-body ${open === i ? "open" : ""}`}>
                <div>
                  <p className="font-mono-custom text-white/40 text-xs leading-relaxed pb-5">{a}</p>
                </div>
              </div>
            </div>
          </InView>
        ))}
      </div>
      <div className="mt-8 font-mono-custom text-[10px] tracking-[0.2em] text-white/25">
        MORE: <Link href="/shipping" className="hover-line text-white/50">SHIPPING</Link> ·{" "}
        <Link href="/returns" className="hover-line text-white/50">RETURNS</Link>
      </div>
    </section>
  );
}
