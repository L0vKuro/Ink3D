"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const merch = [
  {
    id: 1,
    name: "INK3D HOODIE",
    price: "$53.00",
    tag: "HOODIE",
    desc: "Premium heavyweight hoodie. Wear the brand.",
    images: [
      { label: "FRONT", src: "/Ink3DHoodie-Front.png" },
      { label: "BACK", src: "/Ink3DHoodie-Back.png" },
      { label: "LEFT", src: "/Ink3DHoodie-Left.png" },
      { label: "RIGHT", src: "/Ink3DHoodie-Right.png" },
    ],
  },
  {
    id: 2,
    name: "INK3D TEE — FRONT LOGO",
    price: "$35.00",
    tag: "TEE",
    desc: "Clean front logo tee. Streetwear cut.",
    images: [
      { label: "FRONT", src: "/Ink3D_Front_Logo-_Front.png" },
      { label: "BACK", src: "/Ink3D_Front_Logo-_back.png" },
    ],
  },
  {
    id: 3,
    name: "INK3D TEE — BACK LOGO",
    price: "$35.00",
    tag: "TEE",
    desc: "Bold back logo tee. Statement piece.",
    images: [
      { label: "FRONT", src: "/Ink3D_Back_Logo-_Front.png" },
      { label: "BACK", src: "/Ink3D_Back_Logo-_Back.png" },
    ],
  },
];

const tagColors = {
  HOODIE: "text-[#ae1fe3] border-[#ae1fe3]/50 bg-[#ae1fe3]/10",
  TEE:    "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
};

function MerchCard({ item, index }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="product-card bg-[#050505] border border-transparent group">

      {/* IMAGE VIEWER */}
      <div className="aspect-square flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/30 tracking-widest z-20">INK-{String(index+1).padStart(3,'0')}</div>
        <div className="absolute top-3 right-3 font-mono-custom text-[9px] tracking-widest z-20" style={{color: '#ae1fe3'}}>{item.images[activeImg].label}</div>

        <Image
          src={item.images[activeImg].src}
          alt={item.name}
          fill
          className="object-contain p-6 transition-all duration-500 z-10"
        />
      </div>

      {/* IMAGE SWITCHER TABS */}
      <div className="flex border-t border-white/[0.05]">
        {item.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className="flex-1 py-2 font-mono-custom text-[9px] tracking-widest transition-all duration-200"
            style={{
              background: activeImg === i ? '#ae1fe315' : 'transparent',
              color: activeImg === i ? '#ae1fe3' : 'rgba(255,255,255,0.2)',
              borderBottom: activeImg === i ? '1px solid #ae1fe3' : '1px solid transparent',
            }}
          >
            {img.label}
          </button>
        ))}
      </div>

      {/* INFO */}
      <div className="p-5 border-t border-white/[0.05]">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span className={`font-mono-custom text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[item.tag]}`}>{item.tag}</span>
            <h3 className="font-black tracking-wider text-sm mt-2">{item.name}</h3>
            <p className="font-mono-custom text-[10px] text-white/30 mt-1">{item.desc}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-black text-white text-lg">{item.price}</div>
            <div className="font-mono-custom text-[9px] text-white/20">USD</div>
          </div>
        </div>
        <button
          className="w-full border border-white/[0.08] text-white/40 font-mono-custom text-[10px] tracking-[0.2em] py-3 transition-all duration-200"
          onMouseEnter={e => { e.currentTarget.style.borderColor='#ae1fe3'; e.currentTarget.style.color='#ae1fe3'; e.currentTarget.style.background='#ae1fe308'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent'; }}>
          [ ADD_TO_CART ]
        </button>
      </div>
    </div>
  );
}

export default function Merch() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" /></Link>
            <span className="font-mono-custom text-[10px] text-white/20 tracking-widest hidden md:block">SYS://MERCH_v2.6</span>
          </div>
          <div className="hidden md:flex gap-6 text-[11px] font-bold tracking-[0.15em] text-white/40">
            <Link href="/" className="hover:text-white transition-colors duration-200">HOME</Link>
            <Link href="/teams" className="hover:text-white transition-colors duration-200">TEAMS</Link>
            <Link href="/creators" className="hover:text-white transition-colors duration-200">CREATORS</Link>
            <Link href="/program" className="hover:text-white transition-colors duration-200">PROGRAM</Link>
            <Link href="/merch" className="transition-colors duration-200" style={{color: '#ae1fe3'}}>MERCH</Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">ABOUT</Link>
            <Link href="/photos" className="hover:text-white transition-colors duration-200">PHOTOS</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-custom text-[10px] hidden md:block" style={{color: '#ae1fe388'}}><span className="blink">▋</span> ONLINE</span>
            <button className="px-5 py-2 text-[11px] font-black tracking-[0.15em] transition-all duration-200 bracket-box" style={{border: '1px solid #ae1fe388', color: '#ae1fe3'}}
              onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
              CART (0)
            </button>
          </div>
        </div>
        <div className="h-px" style={{background: 'linear-gradient(to right, transparent, #ae1fe344, transparent)'}} />
      </nav>

      <div className="pt-24 px-6 md:px-12 pb-24 max-w-screen-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://MERCH_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            INK3D<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>MERCH</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-lg">
            // Official INK3D Studio apparel. Wear the brand.
          </p>
        </div>

        {/* MERCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
          {merch.map((item, i) => (
            <MerchCard key={item.id} item={item} index={i} />
          ))}
        </div>

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
