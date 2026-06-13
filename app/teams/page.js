"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const teams = [
  {
    id: "atlantis",
    name: "Atlantis Esports",
    logo: "/team-Atlantis.jpg",
    color: "#00b4d8",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/reignabove-keychain.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/eym-lightbox.png" },
    ],
  },
  {
    id: "buckshot",
    name: "Buckshot Gaming",
    logo: "/team-Buckshot.png",
    color: "#ff4d6d",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/buckshot-keychain.png" },
    ],
  },
  {
    id: "eym",
    name: "Earn Your Medal",
    logo: "/team-EYM.jpg",
    color: "#e63946",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/eym-keychain.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/eym-lightbox.png" },
    ],
  },
  {
    id: "godslayers",
    name: "God Slayers",
    logo: "/team-GodSlayers.jpg",
    color: "#ffd60a",
    items: [
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/godlayers-lightbox.png" },
      { name: "COASTER SET OF 4", price: "$24.99", tag: "COASTER", image: "/godlayers-coasterset_of_4.png" },
      { name: "WALL ART", price: "$39.99", tag: "WALL ART", image: "/godlayers-wall_art.png" },
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/godlayers-key_chain.png" },
    ],
  },
  {
    id: "outkatz",
    name: "Outkatz",
    logo: "/team-Outkastz.png",
    color: "#2d6a4f",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/outkastz-key_chain.png" },
    ],
  },
  {
    id: "reignabove",
    name: "Reign Above",
    logo: "/team-ReignAbove.png",
    color: "#c9a227",
    items: [
      { name: "CUBAN NECKLACE", price: "$59.99", tag: "NECKLACE", image: "/reignabove-cuban.png" },
      { name: "COASTER SET OF 4", price: "$24.99", tag: "COASTER", image: "/reignabove-coasters.png" },
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/reignabove-keychain.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/reignabove-lightbox.png" },
    ],
  },
  {
    id: "sgc",
    name: "Shinto Gaming Club",
    logo: "/team-SGC (shintogamingclub).jpg",
    color: "#e63946",
    items: [
      { name: "CUBAN NECKLACE", price: "$59.99", tag: "NECKLACE", image: "/Shinto_Gaming_Club-Cuban_Necklace.png" },
      { name: "FIDGET TOY", price: "$14.99", tag: "FIDGET", image: "/Shinto_Gaming_Club-Fidget_toy.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/Shinto_Gaming_Club-lightbox.png" },
      { name: "COASTER SET OF 4", price: "$24.99", tag: "COASTER", image: "/Shinto_Gaming_Club-_coaster_set.png" },
    ],
  },
  {
    id: "upnxt",
    name: "Team Up Nxt",
    logo: "/team-UpNxt.png",
    color: "#ff006e",
    items: [
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/eym-lightbox.png" },
    ],
  },
  {
    id: "vaultiv",
    name: "Vault IV",
    logo: "/team-Vault ix.jpg",
    color: "#7b2d8b",
    items: [
      { name: "WALL ART", price: "$39.99", tag: "WALL ART", image: "/vaultix-wallart_pmg.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/vaultix-lightbox.png" },
      { name: "COASTER SET OF 4", price: "$24.99", tag: "COASTER", image: "/vaultix-coaster.png" },
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/reignabove-keychain.png" },
    ],
  },
  {
    id: "veriphy",
    name: "Veriphy Gaming",
    logo: "/team-Veriphy.jpg",
    color: "#ffd60a",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/veriphy-keychain.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/veriphy-lightbox.png" },
    ],
  },
  {
    id: "wlg",
    name: "White Leopard Gaming",
    logo: "/team-White Leopard.png",
    color: "#e63946",
    items: [
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/whiteleopard-lightbox.png" },
    ],
  },
  {
    id: "ninefly",
    name: "Ninefly",
    logo: "/team-Ninefly.jpg",
    color: "#ffffff",
    items: [
      { name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", image: "/ninefly-keychain.png" },
      { name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", image: "/ninefly-cubanhypechain.png" },
    ],
  },
];

const tagColors = {
  KEYCHAIN:   "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  LIGHTBOX:   "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  COASTER:    "text-green-400 border-green-400/50 bg-green-400/10",
  NECKLACE:   "text-pink-400 border-pink-400/50 bg-pink-400/10",
  "WALL ART": "text-red-400 border-red-400/50 bg-red-400/10",
  FIDGET:     "text-orange-400 border-orange-400/50 bg-orange-400/10",
};

export default function Teams() {
  const [activeTeam, setActiveTeam] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const selected = teams.find(t => t.id === activeTeam);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" />
            </Link>
            <span className="font-mono-custom text-[10px] text-white/20 tracking-widest hidden md:block">SYS://TEAMS_v2.6</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.15em] text-white/40">
            <Link href="/" className="hover:text-white transition-colors duration-200">HOME</Link>
            <Link href="/teams" className="transition-colors duration-200" style={{color: '#ae1fe3'}}>TEAMS</Link>
           <Link href="/program" className="hover:text-white transition-colors duration-200">PROGRAM</Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">ABOUT</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-custom text-[10px] hidden md:block" style={{color: '#ae1fe388'}}>
              <span className="blink">▋</span> ONLINE
            </span>
            <button className="px-5 py-2 text-[11px] font-black tracking-[0.15em] transition-all duration-200 bracket-box" style={{border: '1px solid #ae1fe388', color: '#ae1fe3'}}
              onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
              CART (0)
            </button>
          </div>
        </div>
        <div className="h-px" style={{background: 'linear-gradient(to right, transparent, #ae1fe344, transparent)'}} />
      </nav>

      <div className="pt-24 px-6 md:px-12 pb-24">

        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://TEAMS_LOADED — {teams.length} ORGS
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            PARTNER<br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>STORES</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-lg">
            // Select a team to browse their exclusive INK3D collection
          </p>
        </div>

        {/* TEAM GRID */}
        {!activeTeam && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setActiveTeam(team.id)}
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
                className="bg-[#0a0a0a] cursor-pointer transition-all duration-300 border border-transparent"
                style={{
                  borderColor: hoveredTeam === team.id ? team.color + '60' : 'transparent',
                  boxShadow: hoveredTeam === team.id ? `0 0 20px ${team.color}33, 0 0 40px ${team.color}15, inset 0 0 20px ${team.color}08` : 'none',
                }}
              >
                <div className="h-48 relative overflow-hidden flex items-center justify-center p-6"
                  style={{background: hoveredTeam === team.id ? `radial-gradient(circle at center, ${team.color}12, transparent 70%)` : `radial-gradient(circle at center, ${team.color}05, transparent 70%)`}}>
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      fill
                      className="object-contain transition-transform duration-500"
                      style={{transform: hoveredTeam === team.id ? 'scale(1.1)' : 'scale(1)'}}
                    />
                  </div>
                </div>
                <div className="p-4 border-t" style={{borderColor: hoveredTeam === team.id ? team.color + '30' : 'rgba(255,255,255,0.05)'}}>
                  <div className="font-mono-custom text-[9px] tracking-widest mb-1" style={{color: team.color + '99'}}>{team.items.length} ITEMS</div>
                  <h3 className="font-black text-sm tracking-wide transition-colors" style={{color: hoveredTeam === team.id ? team.color : 'rgba(255,255,255,0.8)'}}>{team.name}</h3>
                  <div className="mt-3 text-[10px] font-mono-custom tracking-widest border-t pt-2 flex justify-between items-center" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
                    <span className="text-white/20">VIEW STORE</span>
                    <span style={{color: team.color + '80'}}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INDIVIDUAL TEAM STORE */}
        {activeTeam && selected && (
          <div>
            <button
              onClick={() => setActiveTeam(null)}
              className="font-mono-custom text-[10px] tracking-widest text-white/30 hover:text-white transition-colors mb-10 flex items-center gap-2"
            >
              ← BACK_TO_ALL_TEAMS
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 pb-8 border-b border-white/[0.05]">
              <div className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 relative"
                style={{background: `radial-gradient(circle, ${selected.color}15, transparent)`, border: `1px solid ${selected.color}30`, boxShadow: `0 0 20px ${selected.color}33`}}>
                <Image src={selected.logo} alt={selected.name} fill className="object-contain p-2" />
              </div>
              <div>
                <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-2" style={{color: selected.color + '66'}}>
                  SYS://STORE_LOADED
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-2" style={{color: selected.color}}>
                  {selected.name.toUpperCase()}
                </h2>
                <p className="font-mono-custom text-white/30 text-xs tracking-widest">
                  {selected.items.length} EXCLUSIVE ITEMS — POWERED BY INK3D
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
              {selected.items.map((item, i) => (
                <div key={i} className="bg-[#050505] border border-transparent hover:border-white/10 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-square flex items-center justify-center relative overflow-hidden"
                    style={{background: `radial-gradient(circle at center, ${selected.color}08, #0a0a0a)`}}>
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/30 tracking-widest z-20">INK-{String(i+1).padStart(3,'0')}</div>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 z-10"
                      />
                    ) : (
                      <div className="relative z-10 text-center">
                        <div className="text-[70px] font-black leading-none select-none transition-all duration-500 group-hover:scale-110"
                          style={{WebkitTextStroke: `1px ${selected.color}33`, color: 'transparent'}}>
                          3D
                        </div>
                        <div className="font-mono-custom text-[9px] text-white/15 tracking-[0.3em] mt-2">IMG_PLACEHOLDER</div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-white/[0.05]">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <span className={`font-mono-custom text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[item.tag] || 'text-white/40 border-white/20 bg-white/5'}`}>
                          {item.tag}
                        </span>
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
