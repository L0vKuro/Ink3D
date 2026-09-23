"use client";
import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

// Non-team, non-exclusive INK3D products — accessories and designs that
// aren't tied to one team's branding. Items can optionally credit the
// creator who designed/submitted them via the `credit` field.
//
// To add an item once you have the name, price, and image ready:
// 1. Drop the image file in /public
// 2. Add an entry below, e.g.:
//    { id: "controller-stand", name: "CONTROLLER STAND", price: "$25.00", tag: "ACCESSORY", image: "/originals-controller-stand.png", credit: "NightStawker" },
const items = [
  // (empty until first items are finalized)
];

const tagColors = {
  ACCESSORY: "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  KEYCHAIN:  "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  LIGHTBOX:  "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  COASTER:   "text-green-400 border-green-400/50 bg-green-400/10",
  NECKLACE:  "text-pink-400 border-pink-400/50 bg-pink-400/10",
  "WALL ART": "text-red-400 border-red-400/50 bg-red-400/10",
  FIDGET:    "text-orange-400 border-orange-400/50 bg-orange-400/10",
};

export default function Originals() {
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav active="ORIGINALS" />
      <div className="pt-24 px-6 md:px-12 pb-24">
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://ORIGINALS_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            INK3D<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>ORIGINALS</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-lg">
            // Standalone gaming accessories and designs — not tied to any one team, made by INK3D and our creator partners.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border border-white/[0.06] p-16 text-center">
            <div className="text-[70px] font-black leading-none select-none mb-4" style={{WebkitTextStroke: '1px rgba(174,31,227,0.3)', color: 'transparent'}}>3D</div>
            <div className="font-mono-custom text-[10px] text-white/20 tracking-[0.3em]">// FIRST DROPS COMING SOON</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {items.map((item) => (
              <div key={item.id} className="bg-[#050505] border border-transparent hover:border-white/10 transition-all duration-300 group cursor-pointer">
                <div className="aspect-square flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 z-10" />
                  ) : (
                    <div className="relative z-10 text-center">
                      <div className="text-[70px] font-black leading-none select-none transition-all duration-500 group-hover:scale-110"
                        style={{WebkitTextStroke: '1px rgba(174,31,227,0.3)', color: 'transparent'}}>3D</div>
                      <div className="font-mono-custom text-[9px] text-white/15 tracking-[0.3em] mt-2">IMG_PLACEHOLDER</div>
                    </div>
                  )}
                </div>
                <div className="p-5 border-t border-white/[0.05]">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <span className={`font-mono-custom text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[item.tag] || 'text-white/40 border-white/20 bg-white/5'}`}>{item.tag}</span>
                      <h3 className="font-black tracking-wider text-sm mt-2">{item.name}</h3>
                      {item.credit && <p className="font-mono-custom text-[10px] text-white/20 mt-1">Designed by {item.credit}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-white text-lg">{item.price}</div>
                      <div className="font-mono-custom text-[9px] text-white/20">USD</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addItem({ id: `orig-${item.id}`, name: item.name, price: item.price, image: item.image })}
                    className="w-full border border-white/[0.08] text-white/40 font-mono-custom text-[10px] tracking-[0.2em] py-3 transition-all duration-200"
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#ae1fe3'; e.currentTarget.style.color='#ae1fe3'; e.currentTarget.style.background='#ae1fe308'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent'; }}>
                    [ ADD_TO_CART ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-white/[0.05] pt-10 text-center">
          <p className="font-mono-custom text-white/20 text-xs tracking-widest mb-4">// ARE YOU A CREATOR WITH SOMETHING TO SUBMIT?</p>
          <Link href="/program">
            <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200"
              style={{border: '1px solid #ae1fe344', color: '#ae1fe3'}}
              onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
              [ REACH OUT ]
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
