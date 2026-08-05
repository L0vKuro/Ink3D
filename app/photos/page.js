"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const photos = [
  { file: "/ROKKR Keychain Front_.jpg", label: "ROKKR KEYCHAIN — FRONT" },
  { file: "/Shinto Gaming Keychain.jpg", label: "SHINTO GAMING KEYCHAIN" },
  { file: "/IMG_5708.jpg", label: "WLG Lightbox" },
  { file: "/Vancover Surge Keychain.jpg", label: "VANCOUVER SURGE KEYCHAIN" },
  { file: "/tpc hype chain v3.jpg", label: "TPC HYPE CHAIN " },
  { file: "/100T coaster set.jpg", label: "100T COASTER SET" },
  { file: "/Cloud 9 keychain_.jpg", label: "CLOUD9 KEYCHAIN" },
  { file: "/Envoy lightbox in his setup_.jpg", label: "ENVOY LIGHTBOX IN SETUP" },
  { file: "/Freshen up Keychain_.jpg", label: "FRESHEN UP KEYCHAIN" },
  { file: "/Optic coaster set.jpg", label: "OPTIC COASTER SET" },
  { file: "/Optic texas keychain _ Lightbox_.jpg", label: "OPTIC TEXAS KEYCHAIN + LIGHTBOX" },
  { file: "/ROKKR Keychain Back.jpg", label: "ROKKR KEYCHAIN — BACK" },
  { file: "/tpc male hype chain.jpg", label: "TPC MVP CHAIN" },
  { file: "/tpv trophy.jpg", label: "TPC MVP TROPHY" },
  { file: "/Fire-Semblance Controller Holder.jpg", label: "Fire-Semblance PS5 Controller Holder" },
  
];

export default function Photos() {
  const [selected, setSelected] = useState(null);

  // Open the lightbox and push a history entry so the browser Back button
  // closes the lightbox instead of leaving the /photos page.
  const openPhoto = useCallback((i) => {
    if (typeof window !== "undefined") {
      window.history.pushState({ lightbox: true }, "");
    }
    setSelected(i);
  }, []);

  // Close the lightbox. If we pushed a history entry for it, consume that
  // entry via history.back() so the URL bar / back button stay in sync.
  const closePhoto = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state?.lightbox) {
      window.history.back();
    } else {
      setSelected(null);
    }
  }, []);

  // Escape key closes the lightbox.
  useEffect(() => {
    if (selected === null) return;
    function onKeyDown(e) {
      if (e.key === "Escape") closePhoto();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, closePhoto]);

  // Browser Back button closes the lightbox (consumes the pushed state).
  useEffect(() => {
    function onPopState() {
      setSelected(null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Nav active="PHOTOS" />

      {/* LIGHTBOX */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)'}}
          onClick={closePhoto}
        >
          <div
            className="relative w-[90vw] max-w-3xl aspect-square"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute -top-8 left-0 font-mono-custom text-[9px] tracking-widest" style={{color: '#ae1fe388'}}>
              PHOTO_{String(selected + 1).padStart(2,'0')} — {photos[selected].label}
            </div>
            <Image
              src={photos[selected].file}
              alt={photos[selected].label}
              fill
              className="object-contain"
            />
            <button
              onClick={closePhoto}
              className="absolute -top-8 right-0 font-mono-custom text-[10px] tracking-widest text-white/30 hover:text-white transition-colors"
            >
              [ CLOSE ]
            </button>
          </div>
        </div>
      )}

      <div className="pt-24 px-6 md:px-12 pb-24 max-w-screen-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://GALLERY_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            INK3D<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>GALLERY</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-lg">
            // Behind the brand. Real moments. Real people. Real ink.
          </p>
        </div>

        {/* PHOTO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.04] mb-20">
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => openPhoto(i)}
              className="bg-[#0a0a0a] aspect-square flex items-center justify-center relative overflow-hidden group cursor-pointer border border-transparent hover:border-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 grid-bg opacity-20 z-10" />
              <Image
                src={photo.file}
                alt={photo.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-20" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                <span className="font-mono-custom text-[9px] text-white/80 tracking-widest">{photo.label}</span>
              </div>
              <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/30 tracking-widest z-30">
                PHOTO_{String(i+1).padStart(2,'0')}
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOMER MESSAGE */}
        <div className="relative overflow-hidden border border-white/[0.06] p-12 md:p-20 text-center">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full" style={{background: 'linear-gradient(to bottom, #ae1fe333, transparent)'}} />
          <div className="relative">
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6 flex items-center justify-center gap-3" style={{color: '#ae1fe355'}}>
              <span className="w-12 h-px" style={{background: '#ae1fe333'}} />
              SYS://MESSAGE
              <span className="w-12 h-px" style={{background: '#ae1fe333'}} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              WE VALUE<br />
              <span style={{color: '#ae1fe3'}}>EVERY</span><br />
              CUSTOMER
            </h2>
            <p className="font-mono-custom text-white/40 text-sm leading-relaxed max-w-2xl mx-auto mb-4">
              // Every photo in this gallery represents more than just a product — it represents a relationship. From the first order to the hundredth, every customer who rocks INK3D gear is part of something bigger.
            </p>
            <p className="font-mono-custom text-white/30 text-sm leading-relaxed max-w-2xl mx-auto">
              // We started in Milford, NH with a vision to create accessories that meant something. That vision only exists because of the people who believed in it. Thank you for being part of INK3D.
            </p>
            <div className="mt-10 font-mono-custom text-[10px] tracking-[0.4em]" style={{color: '#ae1fe366'}}>— INK3D STUDIO, EST. 2024</div>
          </div>
        </div>

      </div>
      <Footer />

    </main>
  );
}
