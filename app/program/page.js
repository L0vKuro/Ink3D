"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";

export default function Program() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Nav active="PROGRAM" />

      <div className="pt-32 px-6 md:px-12 pb-24 max-w-5xl mx-auto">

        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://PROGRAM_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            INK3D<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>AFFILIATE</span><br />
            PROGRAM
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-xl leading-relaxed">
            // Built for creators, streamers, and esports orgs who want to turn their influence into income.
          </p>
        </div>

        <div className="mb-20 relative" style={{paddingTop: '56.25%'}}>
          <div className="absolute inset-0 border border-white/[0.06] overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1201098282?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
              title="INK3D Affiliate Program"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// WHAT IS IT</div>
            <h2 className="text-3xl font-black tracking-tight mb-4">
              EARN WITH<br />
              <span style={{color: '#ae1fe3'}}>EVERY SALE</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed font-mono-custom">
              The INK3D Affiliate Program gives you the tools to promote exclusive custom accessories and earn a commission on every sale you drive. Whether you're a content creator, esports org, or community leader — if you have an audience, we have a deal for you.
            </p>
          </div>
          <div>
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// HOW IT WORKS</div>
            <div className="space-y-4">
              {[
                { step: "01", title: "APPLY", desc: "Fill out the application and tell us about your audience and platform." },
                { step: "02", title: "GET APPROVED", desc: "We review your application and set you up with your unique affiliate link." },
                { step: "03", title: "PROMOTE", desc: "Share your link with your community across socials, streams, and content." },
                { step: "04", title: "GET PAID", desc: "Earn 10% commission on every sale made through your link. Simple." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="font-mono-custom text-[11px] font-black shrink-0 mt-0.5" style={{color: '#ae1fe3'}}>{item.step}</span>
                  <div>
                    <div className="font-black text-sm tracking-wider mb-1">{item.title}</div>
                    <div className="font-mono-custom text-[11px] text-white/30">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px bg-white/[0.04] mb-20">
          {[["10%","COMMISSION PER SALE"],["30D","COOKIE WINDOW"],["$50","MIN PAYOUT"]].map(([val, label]) => (
            <div key={label} className="bg-[#050505] py-10 text-center bracket-box">
              <div className="stat-number text-3xl md:text-4xl font-black mb-2" style={{color: '#ae1fe3'}}>{val}</div>
              <div className="font-mono-custom text-[9px] text-white/30 tracking-[0.2em]">{label}</div>
            </div>
          ))}
        </div>

        <div className="text-center py-16 border border-white/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe355'}}>// READY TO JOIN</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              APPLY <span style={{color: '#ae1fe3'}}>NOW</span>
            </h2>
            <p className="font-mono-custom text-white/30 text-sm mb-10 max-w-md mx-auto">
              // Applications are reviewed within 48 hours. We'll reach out via email once approved.
            </p>
            <Link href="/apply">
              <button
                className="font-black px-16 py-5 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200 glow-btn"
                style={{background: '#ae1fe3', color: '#fff'}}
                onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
                [ APPLY_NOW ]
              </button>
            </Link>
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
