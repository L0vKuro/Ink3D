"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Nav from "../components/Nav";

const creators = [
  {
    id: "impulse",
    name: "Impulse",
    logo: "/impulse-logo.png",
    color: "#ae1fe3",
    desc: "Content creator and community builder partnered with INK3D.",
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/impulse-keychain.png" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/impulse-coaster.png" },
    ],
  },
  {
    id: "nightstawker",
    name: "NightStawker",
    logo: "/nightstawker-logo.png",
    color: "#00b4d8",
    desc: "Streamer and content creator repping INK3D.",
    items: [],
  },
];

const tagColors = {
  KEYCHAIN: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  COASTER:  "text-green-400 border-green-400/50 bg-green-400/10",
};

export default function Creators() {
  const [activeCreator, setActiveCreator] = useState(null);
  const [hoveredCreator, setHoveredCreator] = useState(null);
  const selected = creators.find(c => c.id === activeCreator);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Nav active="CREATORS" />

      <div className="pt-24 px-6 md:px-12 pb-24">
        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://CREATORS_LOADED — {creators.length} CREATORS
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            INK3D<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>CREATORS</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-lg">
            // Select a creator to browse their exclusive INK3D collection
          </p>
        </div>

        {/* CREATOR GRID */}
        {!activeCreator && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
              {creators.map((creator) => (
                <div
                  key={creator.id}
                  onClick={() => creator.items.length > 0 && setActiveCreator(creator.id)}
                  onMouseEnter={() => setHoveredCreator(creator.id)}
                  onMouseLeave={() => setHoveredCreator(null)}
                  className="bg-[#0a0a0a] transition-all duration-300 border border-transparent"
                  style={{
                    cursor: creator.items.length > 0 ? 'pointer' : 'default',
                    borderColor: hoveredCreator === creator.id ? creator.color + '60' : 'transparent',
                    boxShadow: hoveredCreator === creator.id ? `0 0 20px ${creator.color}33, 0 0 40px ${creator.color}15, inset 0 0 20px ${creator.color}08` : 'none',
                  }}
                >
                  <div className="h-48 relative overflow-hidden flex items-center justify-center p-6"
                    style={{background: hoveredCreator === creator.id ? `radial-gradient(circle at center, ${creator.color}12, transparent 70%)` : `radial-gradient(circle at center, ${creator.color}05, transparent 70%)`}}>
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="relative z-10 w-24 h-24">
                      <Image src={creator.logo} alt={creator.name} fill className="object-contain transition-transform duration-500"
                        style={{transform: hoveredCreator === creator.id ? 'scale(1.1)' : 'scale(1)'}} />
                    </div>
                  </div>
                  <div className="p-4 border-t" style={{borderColor: hoveredCreator === creator.id ? creator.color + '30' : 'rgba(255,255,255,0.05)'}}>
                    <div className="font-mono-custom text-[9px] tracking-widest mb-1" style={{color: creator.color + '99'}}>
                      {creator.items.length > 0 ? `${creator.items.length} ITEMS` : 'COMING SOON'}
                    </div>
                    <h3 className="font-black text-sm tracking-wide transition-colors" style={{color: hoveredCreator === creator.id ? creator.color : 'rgba(255,255,255,0.8)'}}>{creator.name}</h3>
                    <div className="mt-3 text-[10px] font-mono-custom tracking-widest border-t pt-2 flex justify-between items-center" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
                      <span className="text-white/20">{creator.items.length > 0 ? 'VIEW STORE' : 'STAY TUNED'}</span>
                      {creator.items.length > 0 && <span style={{color: creator.color + '80'}}>→</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="border border-white/[0.06] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// CREATOR PARTNERSHIP</div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-6">
                    WHAT DOES IT<br />
                    MEAN TO BE AN<br />
                    <span style={{color: '#ae1fe3'}}>INK3D CREATOR?</span>
                  </h2>
                  <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-6">
                    // Being an INK3D creator means more than just wearing the brand. It means having your own custom-designed accessories built around your identity — keychains, lightboxes, coasters, chains and more — all made exclusively for you and your community.
                  </p>
                  <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-8">
                    // As a creator partner, you get your own dedicated store on our platform, a share of every sale your community makes, and the ability to collaborate directly with INK3D on future product drops. Your brand. Your store. Your revenue.
                  </p>
                  <Link href="/program">
                    <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200"
                      style={{background: '#ae1fe3', color: '#fff'}}
                      onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
                      [ APPLY TO BE A CREATOR ]
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
                  {[
                    { icon: "🎨", title: "CUSTOM PRODUCTS", desc: "Products designed around your brand and identity." },
                    { icon: "🏪", title: "YOUR OWN STORE", desc: "A dedicated storefront on the INK3D platform." },
                    { icon: "💰", title: "EARN REVENUE", desc: "Make money every time your community buys." },
                    { icon: "🤝", title: "COLLAB DROPS", desc: "Work directly with INK3D on future products." },
                  ].map((item) => (
                    <div key={item.title} className="bg-[#050505] p-6 bracket-box">
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <div className="font-black text-xs tracking-widest mb-2" style={{color: '#ae1fe3'}}>{item.title}</div>
                      <div className="font-mono-custom text-[10px] text-white/30">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* INDIVIDUAL CREATOR STORE */}
        {activeCreator && selected && (
          <div>
            <button onClick={() => setActiveCreator(null)} className="font-mono-custom text-[10px] tracking-widest text-white/30 hover:text-white transition-colors mb-10 flex items-center gap-2">
              ← BACK_TO_ALL_CREATORS
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 pb-8 border-b border-white/[0.05]">
              <div className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 relative"
                style={{background: `radial-gradient(circle, ${selected.color}15, transparent)`, border: `1px solid ${selected.color}30`, boxShadow: `0 0 20px ${selected.color}33`}}>
                <Image src={selected.logo} alt={selected.name} fill className="object-contain p-2" />
              </div>
              <div>
                <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-2" style={{color: selected.color + '66'}}>SYS://STORE_LOADED</div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-2" style={{color: selected.color}}>
                  {selected.name.toUpperCase()}
                </h2>
                <p className="font-mono-custom text-white/30 text-xs tracking-widest">{selected.items.length} EXCLUSIVE ITEMS — POWERED BY INK3D</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
              {selected.items.map((item, i) => (
                <div key={i} className="bg-[#050505] border border-transparent hover:border-white/10 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-square flex items-center justify-center relative overflow-hidden"
                    style={{background: `radial-gradient(circle at center, ${selected.color}08, #0a0a0a)`}}>
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/30 tracking-widest z-20">INK-{String(i+1).padStart(3,'0')}</div>
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 z-10" />
                    )}
                  </div>
                  <div className="p-5 border-t border-white/[0.05]">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <span className={`font-mono-custom text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[item.tag] || 'text-white/40 border-white/20 bg-white/5'}`}>{item.tag}</span>
                        <h3 className="font-black tracking-wider text-sm mt-2">{item.name}</h3>
                        <p className="font-mono-custom text-[10px] text-white/20 mt-1">{selected.name} Edition</p>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-white text-lg">{item.price}</div>
                        <div className="font-mono-custom text-[9px] text-white/20">USD</div>
                      </div>
                    </div>
                    <button className="w-full border border-white/[0.08] text-white/40 font-mono-custom text-[10px] tracking-[0.2em] py-3 transition-all duration-200"
                      onMouseEnter={e => { e.currentTarget.style.borderColor=selected.color; e.currentTarget.style.color=selected.color; e.currentTarget.style.background=selected.color+'10'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent'; }}>
                      [ ADD_TO_CART ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05]">
        <div className="px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" /></Link>
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
