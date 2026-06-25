"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";

const tiers = [
  {
    rank: "BRONZE",
    emoji: "🥉",
    sales: 0,
    commission: "10%",
    color: "#cd7f32",
    desc: "You're in. Welcome to the INK3D network. Start sharing your link and building your audience.",
    start: true,
  },
  {
    rank: "SILVER",
    emoji: "🥈",
    sales: 10,
    commission: "13%",
    color: "#c0c0c0",
    desc: "You're moving. People are buying through you and the community is noticing.",
  },
  {
    rank: "GOLD",
    emoji: "🥇",
    sales: 25,
    commission: "16%",
    color: "#ffd60a",
    desc: "You're a force. Your influence is real and INK3D is growing because of you.",
  },
  {
    rank: "DIAMOND",
    emoji: "💎",
    sales: 50,
    commission: "20%",
    color: "#00b4d8",
    desc: "Elite status. You're one of the top affiliates driving the brand forward.",
  },
  {
    rank: "ELITE",
    emoji: "👑",
    sales: 100,
    commission: "25%",
    color: "#ae1fe3",
    desc: "The top 1%. You don't just rep INK3D — you are INK3D.",
  },
];

export default function Tiers() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Nav active="PROGRAM" />

      <div className="pt-32 px-6 md:px-12 pb-24 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://TIERS_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            AFFILIATE<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>TIERS</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-xl leading-relaxed">
            // Every affiliate starts at Bronze. The more you sell, the higher you climb — and the more you earn. There's no cap on what you can make.
          </p>
        </div>

        {/* TIERS */}
        <div className="space-y-px mb-20">
          {tiers.map((tier, i) => (
            <div
              key={tier.rank}
              className="relative bg-[#0a0a0a] p-8 md:p-10 border border-transparent transition-all duration-300 group"
              style={{borderColor: tier.color + '20'}}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{background: `radial-gradient(ellipse at left, ${tier.color}08, transparent 70%)`}} />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">

                {/* LEFT — rank */}
                <div className="flex items-center gap-5 md:w-48 shrink-0">
                  <div className="text-4xl">{tier.emoji}</div>
                  <div>
                    <div className="font-mono-custom text-[9px] tracking-[0.3em] mb-1" style={{color: tier.color + '80'}}>
                      {tier.start ? 'STARTING TIER' : `${tier.sales} SALES`}
                    </div>
                    <div className="font-black text-xl tracking-wider" style={{color: tier.color}}>{tier.rank}</div>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="hidden md:block w-px h-16 shrink-0" style={{background: tier.color + '20'}} />

                {/* CENTER — description */}
                <div className="flex-1">
                  <p className="font-mono-custom text-white/40 text-sm leading-relaxed">{tier.desc}</p>
                </div>

                {/* RIGHT — commission */}
                <div className="md:text-right shrink-0">
                  <div className="font-mono-custom text-[9px] tracking-widest text-white/20 mb-1">COMMISSION</div>
                  <div className="font-black text-3xl" style={{color: tier.color}}>{tier.commission}</div>
                  <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">PER SALE</div>
                </div>

              </div>

              {/* progress line between tiers */}
              {i < tiers.length - 1 && (
                <div className="absolute -bottom-px left-10 right-10 h-px" style={{background: `linear-gradient(to right, ${tier.color}40, ${tiers[i+1].color}40)`}} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-16 border border-white/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe355'}}>// READY TO CLIMB</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              START AT <span style={{color: '#cd7f32'}}>BRONZE</span>
            </h2>
            <p className="font-mono-custom text-white/30 text-sm mb-10 max-w-md mx-auto">
              // Sign up today and start earning. Every sale moves you closer to the top.
            </p>
            <a href="https://jczaxqshor.goaffpro.com/create-account" target="_blank" rel="noopener noreferrer">
              <button
                className="font-black px-16 py-5 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200 glow-btn"
                style={{background: '#ae1fe3', color: '#fff'}}
                onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
                [ APPLY_NOW ]
              </button>
            </a>
          </div>
        </div>

      </div>

      <footer className="border-t border-white/[0.05]">
        <div className="px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" />
          </Link>
          <span className="font-mono-custom text-[10px] text-white/15 tracking-widest">© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            {[["TWITTER","https://x.com/ink3dStudio"],["TIKTOK","https://www.tiktok.com/@ink3d.studio"],["DISCORD","https://discordapp.com/invite/rv99duMaW6"]].map(([name, href]) => (
              <Link key={name} href={href} className="font-mono-custom text-[10px] text-white/20 transition-colors tracking-widest hover:text-white/70">{name}</Link>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}
