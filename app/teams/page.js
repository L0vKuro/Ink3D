"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductImage from "../components/ProductImage";
import TeamCard from "../components/TeamCard";
import SocialLinks from "../components/SocialLinks";
import { useCart } from "../context/CartContext";
// SOCIAL LINKS: use  social: { label: "X", href: "..." }   for one,
//               or   socials: [ { label: "X", href: "..." }, { label: "Instagram", href: "..." } ]   for many.
// X, Instagram, TikTok, YouTube and Twitch icons are drawn automatically from the label.
const teams = [
  {
    id: "overtakesector",
    name: "Overtake Sector",
    logo: "/cb LOGO.jpg",
    color: "#D41D30",
    featured: true,
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/OvertakeSector" },
    description: "OvertakeSector is built on precision, discipline, and results. The crosshair-and-star logo represents the team's mindset: lock on, take the lead, and never back down. This exclusive INK3D collection features OvertakeSector's signature Crimson Red, Onyx Grey, and Obsidian Fog colors. From keychains and lightboxes to coasters and more, every item reflects the same identity fans see on stream.",
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/Overtake Keychain.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER" },
      { name: "CUBAN NECKLACE", price: "$35.00", tag: "NECKLACE" },
      { name: "WALL ART", price: "$20.00", tag: "WALL ART" },
      { name: "FIDGET TOY", price: "$8.00", tag: "FIDGET" },
    ],
  },
  {
    id: "atlantis",
    name: "Atlantis Esports",
    logo: "/Atlantis 2026 logo.png",
    color: "#00b4d8",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/Atlsect" },
    items: [
     { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/atlantis-keychain.png" },
     { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/atlantis-lightbox.png" },
    ],
  },
  {
    id: "buckshot",
    name: "Buckshot Gaming",
    logo: "/team-Buckshot.png",
    color: "#ff4d6d",
    social: { label: "X", icon: "/twitter logo.png", href: "http://x.com/BuckshotGG" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/buckshot-keychain.png" },
    ],
  },
  {
    id: "eym",
    name: "Earn Your Medal",
    logo: "/team-EYM.jpg",
    color: "#e63946",
    socials: [
      { label: "Instagram", icon: "/insta.png", href: "https://www.instagram.com/earnyourmedal" },
      { label: "X", icon: "/twitter icon.png", href: "https://x.com/EarnYourMedal" },
      { label: "TikTok", icon: "/", href: "https://www.tiktok.com/@earnyourmedal" },
      { label: "Discord", icon: "/", href: "https://discord.gg/DfAPg8v4k" },
    ],
    description:"Welcome to the official home of EYM, a competitive gaming brand built for the relentless. Rooted deep in the esports scene, EYM represents grit, tactical dominance, and a unified community of gamers who play to win. Explore our exclusive lineups, connect with the squad, and wear the iconic iron-shield skull logo with pride.",
    items: [
     { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/eym-keychain.png" },
     { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/eym lightbox 1.jpg" },
     { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/eym coaster.jpg" },
     { name: "CAN LID", price: "$4.00", tag: "CAN LID", images: ["/EYM Can Lid Fornt.png", "/EYM Can Lid Back.png"] },
     { name: "CLOCK", price: "$40.00", tag:  "WALL CLOCK", images: ["/EYM Clock Front.png", "/EYM Clock Back.png"] },
    ],
  },
  {
    id: "godslayers",
    name: "God Slayers",
    logo: "/team-GodSlayers.jpg",
    color: "#ffd60a",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/GodSlayersGG" },
    items: [
     { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/godlayers-lightbox.png" },
     { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/godlayers-coasterset_of_4.png" },
     { name: "WALL ART", price: "$20.00", tag: "WALL ART", image: "/godlayers-wall_art.png" },
     { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/godlayers-key_chain.png" },
    ],
  },
  {
    id: "outkastz",
    name: "Outkastz",
    logo: "/team-Outkastz.png",
    color: "#2d6a4f",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/oKzEsports" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/outkastz-key_chain.png" },
    ],
  },
  {
    id: "reignabove",
    name: "Reign Above",
    logo: "/team-ReignAbove.png",
    color: "#c9a227",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/ReignAboveGG" },
    items: [
      { name: "CUBAN NECKLACE", price: "$35.00", tag: "NECKLACE", image: "/reignabove-cuban.png" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/reignabove_coasters.png" },
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/reignabove-keychain.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/reignabove-lightbox.png" },
    ],
  },
  {
    id: "sgc",
    name: "Shinto Gaming Club",
    logo: "/team-SGC (shintogamingclub).jpg",
    color: "#e63946",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/ShintoGC" },
    items: [
      { name: "CUBAN NECKLACE", price: "$35.00", tag: "NECKLACE", image: "/Shinto_Gaming_Club-Cuban_Necklace.png" },
      { name: "FIDGET TOY", price: "$8.00", tag: "FIDGET", image: "/Shinto_Gaming_Club-Fidget_toy.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/Shinto_Gaming_Club-lightbox.png" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/Shinto_Gaming_Club-_coaster_set.png" },
    ],
  },
  {
    id: "upnxt",
    name: "Team Up Nxt",
    logo: "/team-UpNxt.png",
    color: "#ff006e",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/TeamUpNxt" },
    items: [
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/upnext-lightbox.png" },
    ],
  },
  {
    id: "vaultiv",
    name: "Vault IX",
    logo: "/team-Vault ix.jpg",
    color: "#7b2d8b",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/_vaultix" },
    items: [
      { name: "WALL ART", price: "$20.00", tag: "WALL ART", image: "/vaultix-wallart.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/vaultix-lightbox.png" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", image: "/vaultix-coaster.png" },
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/vaultix-keychain.png" },
    ],
  },
  {
    id: "veriphy",
    name: "Veriphy Gaming",
    logo: "/team-Veriphy.jpg",
    color: "#ffd60a",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/VeriphyGG" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/veriphy-keychain.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/veriphy-lightbox1.avif" },
    ],
  },
  {
    id: "wlg",
    name: "White Leopard Gaming",
    logo: "/team-White Leopard.png",
    color: "#e63946",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/WhiteLeopardGG" },
    items: [
       { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", image: "/whiteleopard-lightbox.png" },
    ],
  },
  {
    id: "ninefly",
    name: "Ninefly",
    logo: "/team-Ninefly.jpg",
    color: "#ffffff",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/NineFlyeSports" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/nine fly keychain.jpg" },
      { name: "CUBAN NECKLACE", price: "$35.00", tag: "NECKLACE", image: "/ninefly-cubanhypechain.png" },
    ],
  },
  {
    id: "7ven-club",
    name: "7ven Club",
    logo: "/7ven.jpg",
    color: "#39FF14",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/7VENCLUB" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/7ven keychain.png" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX" },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", images: ["/7vencosterfront.png", "/7vencoasterside.png", "/7vencoasterright.png"] },
    ],
  },
  {
    id: "PRS",
    name: "PRS GAMING",
    logo: "/prs cover photo.png",
    color: "#89CFF0",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/PRSGamingGG" },
    items: [
      { name: "WALL ART", price: "$39.99", tag: "WALL ART" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX" },
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN" },
    ],
  },
  {
    id: "Rejects",
    name: "Rejects Esports",
    logo: "/Rejects Esports.jpg",
    color: "#D41D30",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/RejectsNA" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", images: ["/Rejects Keychain.jpg", "/rejects2.jpg"] },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", images: ["/rejects light.png", "/rejects light side.png"] },
    ],
  },
  {
    id: "OBV",
    name: "Oblivion Esports",
    logo: "/oblivion png.png",
    color: "#7F00FF",
    social: { label: "X", icon: "/twitter logo.png", href: "https://x.com/OblivionEsportz" },
    items: [
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/oblivion keychain mock up.png" },
    ],
  },
{
  id: "NXT",
  name: "NXT GENERATION",
  logo: "/nxt logo.png",
  color: "#ff991c",
  social: {
    label: "X",
    icon: "/twitter logo.png",
    href: "https://x.com/NXTGenEsportss"
  },
 items: [
      { name: "WALL ART", price: "$20.00", tag: "WALL ART", image: "/coming soon.jpg" },
      { name: "LIGHTBOX", price: "$40.00", tag: "LIGHTBOX", images: ["/nxt lightbox front.png", "/nxt lightbox back.png"] },
      { name: "COASTER SET OF 4", price: "$15.00", tag: "COASTER", images: ["/nxt coaster front.png", "/nxt coaster side.png"] },
      { name: "KEYCHAIN", price: "$5.00", tag: "KEYCHAIN", image: "/nxt keychain front.png" },
      { name: "CUBAN NECKLACE", price: "$35.00", tag: "NECKLACE", image: "/nxt hype chain.png" },
    ],
  },
];

const tagColors = {
  ACCESSORY: "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  KEYCHAIN: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  LIGHTBOX: "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  COASTER: "text-green-400 border-green-400/50 bg-green-400/10",
  NECKLACE: "text-pink-400 border-pink-400/50 bg-pink-400/10",
  "WALL ART": "text-red-400 border-red-400/50 bg-red-400/10",
  FIDGET: "text-orange-400 border-orange-400/50 bg-orange-400/10",
  "CONTROLLER STAND": "text-purple-400 border-purple-400/50 bg-purple-400/10",
  "WALL CLOCK": "text-blue-400 border-blue-400/50 bg-blue-400/10",
  "CAN LID": "text-lime-400 border-lime-400/50 bg-lime-400/10",
};

const featuredTeams = teams.filter(t => t.featured);
const regularTeams = teams.filter(t => !t.featured);
export default function Teams() {
  const [activeTeam, setActiveTeam] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const { addItem } = useCart();
  const selected = teams.find(t => t.id === activeTeam);

  useEffect(() => {
    function handlePopState() {
      setActiveTeam(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

    // clicking "TEAMS" in the top menu while inside a store goes back to the team list
  useEffect(() => {
    function onNavClick(e) {
      const link = e.target.closest && e.target.closest('a[href="/teams"]');
      if (link && activeTeam) {
        setActiveTeam(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    document.addEventListener("click", onNavClick);
    return () => document.removeEventListener("click", onNavClick);
  }, [activeTeam]);
  function openTeam(id) {
    window.history.pushState({ teamView: true }, "");
    setActiveTeam(id);
  }

  function closeTeam() {
    window.history.back();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav active="TEAMS" />
      <div className="pt-24 px-6 md:px-12 pb-24">
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
        {!activeTeam && featuredTeams.length > 0 && (
          <div className="mb-16">
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6 flex items-center gap-3" style={{color: '#ae1fe366'}}>
              <span>◆</span> SYS://EXCLUSIVE_PARTNER
            </div>
            <div className="space-y-4">
              {featuredTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => openTeam(team.id)}
                  className="tc-featured relative overflow-hidden cursor-pointer group border transition-all duration-300"
                  style={{ borderColor: team.color + '40', background: `linear-gradient(120deg, ${team.color}14, #0a0a0a 65%)` }}
                >
                  <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
                  <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                    <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 relative rounded-full overflow-hidden"
                      style={{ background: `radial-gradient(circle, ${team.color}25, transparent)`, border: `1px solid ${team.color}55`, boxShadow: `0 0 30px ${team.color}40` }}>
                      <Image src={team.logo} alt={team.name} fill className="object-contain p-0" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 font-mono-custom text-[9px] font-black tracking-[0.2em] px-2 py-1 mb-3"
                        style={{ color: team.color, border: `1px solid ${team.color}66` }}>
                        EXCLUSIVE PARTNER
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-2" style={{ color: team.color }}>{team.name.toUpperCase()}</h3>
                      {team.description && (
                        <p className="font-mono-custom text-white/40 text-sm leading-relaxed max-w-2xl mb-4 line-clamp-3">
                          {team.description}
                        </p>
                      )}
                      <div className="flex items-center justify-center md:justify-start gap-5 flex-wrap font-mono-custom text-[10px] tracking-widest text-white/30">
                        <span>{team.items.length} EXCLUSIVE ITEMS</span>
                        <SocialLinks entity={team} color={team.color} />
                      </div>
                    </div>
                    <div
                      className="font-mono-custom text-[10px] tracking-[0.25em] font-black px-8 py-4 shrink-0 transition-all duration-200 whitespace-nowrap"
                      style={{ border: `1px solid ${team.color}`, color: team.color }}
                    >
                      VIEW STORE →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!activeTeam && (
          <>
            {featuredTeams.length > 0 && (
              <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>// ALL PARTNER STORES</div>
            )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regularTeams.map((team, i) => (
              <TeamCard
                key={team.id}
                team={team}
                index={i}
                total={regularTeams.length}
                onOpen={() => openTeam(team.id)}
              />
            ))}
          </div>
          </>
        )}
        {activeTeam && selected && (
          <div>
            <button onClick={closeTeam}
              className="font-mono-custom text-[10px] tracking-widest text-white/30 hover:text-white transition-colors mb-10 flex items-center gap-2">
              ← BACK_TO_ALL_TEAMS
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
                <p className="font-mono-custom text-white/30 text-xs tracking-widest mb-4">{selected.items.length} EXCLUSIVE ITEMS — POWERED BY INK3D</p>
                <SocialLinks entity={selected} color={selected.color} />
              </div>
            </div>
            {selected.description && (
              <div className="mb-16 pb-8 border-b border-white/[0.05] max-w-3xl">
                <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-4" style={{ color: selected.color + '66' }}>// ABOUT {selected.name.toUpperCase()}</div>
                <p className="font-mono-custom text-white/40 text-sm leading-relaxed">{selected.description}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
              {selected.items.map((item, i) => (
                <div key={i} className="bg-[#050505] border border-transparent hover:border-white/10 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-square flex items-center justify-center relative overflow-hidden"
                    style={{background: `radial-gradient(circle at center, ${selected.color}08, #0a0a0a)`}}>
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/30 tracking-widest z-20">INK-{String(i+1).padStart(3,'0')}</div>
                    <ProductImage
                      image={item.image}
                      images={item.images}
                      alt={item.name}
                      imgClassName="object-contain p-6 transition-transform duration-700 group-hover:scale-105 z-10"
                      placeholderColor={selected.color}
                    />
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
                    <button
                      onClick={() => addItem({
                        id: `${selected.id}-${item.name}`,
                        name: item.name,
                        price: item.price,
                        image: item.image ?? item.images?.[0],
                        teamName: selected.name,
                      })}
                      className="w-full border border-white/[0.08] text-white/40 font-mono-custom text-[10px] tracking-[0.2em] py-3 transition-all duration-200"
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
      <Footer />
    </main>
  );
}
