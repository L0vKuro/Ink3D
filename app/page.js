"use client";

import Link from "next/link";
import Image from "next/image";

const products = [
  { id: 1, name: "KEYCHAIN", price: "$12.99", tag: "KEYCHAIN", desc: "Carry the brand everywhere.", sku: "INK-001", rating: "4.9", reviews: "2.3K", image: "/reignabove-keychain.png", contain: true },
  { id: 2, name: "CUBAN HYPE CHAIN", price: "$34.99", tag: "CHAIN", desc: "Drip that hits different.", sku: "INK-002", rating: "4.8", reviews: "1.8K", image: "/ninefly-cubanhypechain.png", contain: true },
  { id: 3, name: "LIGHTBOX", price: "$49.99", tag: "LIGHTBOX", desc: "Light up your setup.", sku: "INK-003", rating: "5.0", reviews: "987", image: "/eym-lightbox.png", contain: true },
  { id: 4, name: "COASTER", price: "$9.99", tag: "COASTER", desc: "Protect the desk. Rep the brand.", sku: "INK-004", rating: "4.7", reviews: "1.2K", image: "/vaultix-coaster.png", contain: true },
  { id: 5, name: "CUBAN NECKLACE", price: "$59.99", tag: "NECKLACE", desc: "Heavy. Clean. Iconic.", sku: "INK-005", rating: "4.9", reviews: "756", image: "/outkastz-cuban necklace.png", contain: true },
  { id: 6, name: "WALL ART", price: "$39.99", tag: "WALL ART", desc: "Turn your wall into a statement.", sku: "INK-006", rating: "4.6", reviews: "3.1K", image: "/vaultix-wallart.pmg.png", contain: true },
];

const tagColors = {
  KEYCHAIN:   "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  CHAIN:      "text-[#ae1fe3] border-[#ae1fe3]/50 bg-[#ae1fe3]/10",
  LIGHTBOX:   "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
  COASTER:    "text-green-400 border-green-400/50 bg-green-400/10",
  NECKLACE:   "text-pink-400 border-pink-400/50 bg-pink-400/10",
  "WALL ART": "text-red-400 border-red-400/50 bg-red-400/10",
};

const stats = [
  { value: "500+", label: "UNITS SHIPPED", sub: "AND COUNTING" },
  { value: "100%", label: "SATISFACTION", sub: "GUARANTEED" },
  { value: "3-7D", label: "DELIVERY TIME", sub: "BUSINESS DAYS" },
  { value: "2024", label: "EST. MILFORD", sub: "MILFORD, NH" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain" />
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.15em] text-white/40">
            <Link href="/" className="hover-line hover:text-white transition-colors duration-200">HOME</Link>
            <Link href="/teams" className="hover-line hover:text-white transition-colors duration-200">SHOP</Link>
            <Link href="#" className="hover-line hover:text-white transition-colors duration-200">COLLECTIONS</Link>
            <Link href="#" className="hover-line hover:text-white transition-colors duration-200">ABOUT</Link>
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

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 grid-bg clip-diagonal overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none" style={{background: '#ae1fe308'}} />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{background: '#ae1fe310'}} />

        <div className="font-mono-custom text-[10px] text-white/20 tracking-[0.3em] mb-8 flex items-center gap-4">
          <span>INK3D_STUDIO</span>
          <span style={{color: '#ae1fe344'}}>——</span>
          <span>COLLECTION_2026</span>
          <span style={{color: '#ae1fe344'}}>——</span>
          <span>MILFORD_NH</span>
        </div>

        <div className="mb-6">
          <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={300} height={120} className="object-contain mx-auto flicker" />
        </div>

        <div className="relative mb-2">
          <div className="text-[clamp(4.5rem,17vw,13rem)] font-black tracking-[-0.05em] leading-[0.85] select-none glitch-wrapper" data-text="INK3D">
            INK3D
          </div>
          <div className="absolute inset-0 text-[clamp(4.5rem,17vw,13rem)] font-black tracking-[-0.05em] leading-[0.85] select-none" style={{WebkitTextStroke: '1px #ae1fe322', color: 'transparent', transform: 'translate(3px, 3px)'}}>
            INK3D
          </div>
        </div>

        <div className="text-[clamp(1.2rem,4vw,3rem)] font-black tracking-[0.25em] text-white/10 mb-8 select-none">
          STUDIO
        </div>

        <p className="text-white/40 text-sm md:text-base max-w-lg tracking-wider leading-relaxed mb-3 font-mono-custom">
          // engineered for those who refuse to blend in
        </p>
        <p className="text-white/20 text-xs tracking-[0.3em] mb-12 font-mono-custom">
          ACCESSORIES — EST. 2024 — MILFORD, NH
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/teams">
            <button className="glow-btn font-black px-12 py-4 text-xs tracking-[0.25em] transition-colors duration-200 relative overflow-hidden group" style={{background: '#ae1fe3', color: '#fff'}}>
              <span className="relative z-10">SHOP NOW</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
          </Link>
          <button className="border border-white/15 text-white/60 px-12 py-4 text-xs font-black tracking-[0.25em] hover:text-white transition-all duration-200 bracket-box">
            VIEW LOOKBOOK
          </button>
        </div>

        <div className="flex gap-8 md:gap-16 font-mono-custom text-[10px]">
          <div className="text-center">
            <div className="font-bold" style={{color: '#ae1fe3'}}>500+</div>
            <div className="text-white/20 tracking-widest">SHIPPED</div>
          </div>
          <div className="text-white/10">|</div>
          <div className="text-center">
            <div className="text-white/60 font-bold">100%</div>
            <div className="text-white/20 tracking-widest">SATISFACTION</div>
          </div>
          <div className="text-white/10">|</div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">3-7D</div>
            <div className="text-white/20 tracking-widest">DELIVERY</div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono-custom text-[9px] text-white/15 tracking-[0.4em]">SCROLL_DOWN</span>
          <div className="w-px h-12 relative overflow-hidden" style={{background: 'linear-gradient(to bottom, #ae1fe344, transparent)'}}>
            <div className="scroll-dot absolute top-0 left-0 w-full h-3" style={{background: '#ae1fe399'}} />
          </div>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div className="py-3 overflow-hidden border-y" style={{background: '#ae1fe3', borderColor: '#c040ff'}}>
        <div className="marquee-track">
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="font-black text-[11px] tracking-[0.25em] px-8 font-mono-custom text-white">
              INK3D STUDIO ◆ MILFORD NH ◆ EST. 2024 ◆ 100% SATISFACTION ◆ 3-7 DAY DELIVERY ◆ FREE SHIPPING $50+ ◆
            </span>
          ))}
        </div>
      </div>

      {/* MARQUEE 2 */}
      <div className="py-2.5 overflow-hidden border-b border-white/[0.04]">
        <div className="marquee-track-reverse">
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="text-white/10 font-black text-[10px] tracking-[0.3em] px-8 font-mono-custom">
              KEYCHAIN · CUBAN HYPE CHAIN · LIGHTBOX · COASTER · CUBAN NECKLACE · WALL ART ·
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="px-6 md:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
        {stats.map((s) => (
          <div key={s.value} className="bg-[#050505] p-8 md:p-10 text-center group hover:bg-[#0d0d0d] transition-colors duration-300 bracket-box">
            <div className="stat-number text-3xl md:text-4xl font-black mb-1 transition-colors" style={{color: '#ae1fe3'}}>{s.value}</div>
            <div className="font-mono-custom text-[10px] text-white/50 tracking-[0.2em] mb-1">{s.label}</div>
            <div className="font-mono-custom text-[9px] text-white/20 tracking-[0.15em]">{s.sub}</div>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section id="products" className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
              <span className="blink">◆</span> SYS://PRODUCTS_LOADED
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              FEATURED<br />
              <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>ITEMS</span>
            </h2>
          </div>
          <div className="font-mono-custom text-[10px] text-white/20 tracking-widest text-right">
            <div className="mb-1">ITEMS: 06</div>
            <div className="mb-1">STATUS: IN STOCK</div>
            <div style={{color: '#ae1fe344'}}>UPDATED: 2026.06.11</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/[0.04]">
          {products.map((product, i) => {
            const isWide = i === 0 || i === 5;
            return (
              <div key={product.id} className={`product-card bg-[#050505] border border-transparent cursor-pointer group ${isWide ? 'md:col-span-8' : 'md:col-span-4'}`}>
                <div className={`bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden ${isWide ? 'aspect-[16/7]' : 'aspect-square'}`}>
                  <div className="absolute inset-0 grid-bg opacity-20 z-10" />
                  <div className="absolute top-3 left-3 font-mono-custom text-[9px] text-white/50 tracking-widest z-20">{product.sku}</div>
                  <div className="absolute top-3 right-3 font-mono-custom text-[9px] tracking-widest z-20" style={{color: '#ae1fe3'}}>{product.tag}</div>
                  <div className="absolute bottom-3 right-3 font-mono-custom text-[9px] text-white/50 z-20">★ {product.rating} ({product.reviews})</div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${product.contain ? 'object-contain p-6' : 'object-cover'}`}
                  />
                  {/* Only EYM lightbox gets the gray overlay */}
                  {product.overlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-80 z-10" />
                  )}
                </div>
                <div className="p-5 border-t border-white/[0.05] relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono-custom text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[product.tag]}`}>
                          {product.tag}
                        </span>
                        <span className="font-mono-custom text-[9px] text-white/20">#{product.sku}</span>
                      </div>
                      <h3 className="font-black tracking-wider text-sm md:text-base mb-1">{product.name}</h3>
                      <p className="text-white/30 text-xs font-mono-custom">{product.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-white text-lg">{product.price}</div>
                      <div className="font-mono-custom text-[9px] text-white/20">USD</div>
                    </div>
                  </div>
                  <button className="mt-4 w-full border border-white/[0.08] text-white/40 font-mono-custom text-[10px] tracking-[0.2em] py-3 transition-all duration-200"
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#ae1fe3'; e.currentTarget.style.color='#ae1fe3'; e.currentTarget.style.background='#ae1fe308'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent'; }}>
                    [ ADD_TO_CART ]
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-6 md:mx-12 mb-24 relative overflow-hidden clip-diagonal-reverse">
        <div className="px-10 md:px-16 py-16 md:py-20 relative" style={{background: '#ae1fe3'}}>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px'}} />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="font-mono-custom text-white/40 text-[10px] tracking-[0.4em] mb-3">// LIMITED_TIME_OFFER</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] leading-none mb-2">FREE<br />SHIPPING</h2>
              <p className="font-mono-custom text-white/50 text-sm tracking-widest">ON_ALL_ORDERS &gt; $50.00</p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-white font-black px-12 py-5 tracking-[0.2em] text-xs font-mono-custom transition-all duration-200 hover:bg-black hover:text-white" style={{color: '#ae1fe3'}}>
                SHOP_ALL_DROPS →
              </button>
              <div className="font-mono-custom text-[9px] text-white/30 tracking-widest text-center">OFFER_EXPIRES: NEVER</div>
            </div>
          </div>
        </div>
      </section>

      {/* AFFILIATE */}
      <section className="px-6 md:px-12 py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6 flex items-center justify-center gap-3" style={{color: '#ae1fe355'}}>
            <span className="w-8 h-px" style={{background: '#ae1fe333'}} />
            SYS://AFFILIATE_PROGRAM
            <span className="w-8 h-px" style={{background: '#ae1fe333'}} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-3 leading-none">
            EARN WITH<br />
            <span className="flicker" style={{color: '#ae1fe3'}}>INK3D</span>
          </h2>
          <p className="font-mono-custom text-white/30 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            // Join our affiliate network. Promote products.<br />
            // Earn commission on every sale you drive.
          </p>
          <div className="grid grid-cols-3 gap-px bg-white/[0.05] mb-10">
            {[["10%","COMMISSION"],["30D","COOKIE"],["$50","MIN PAYOUT"]].map(([val, label]) => (
              <div key={label} className="bg-[#050505] py-6 bracket-box">
                <div className="stat-number text-2xl font-black" style={{color: '#ae1fe3'}}>{val}</div>
                <div className="font-mono-custom text-[9px] text-white/30 tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
          <button className="font-black px-12 py-4 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200"
            style={{border: '1px solid #ae1fe344', color: '#ae1fe3', background: 'transparent'}}
            onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
            [ APPLY_NOW ]
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05]">
        <div className="px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div>
              <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={100} height={40} className="object-contain mb-3" />
              <div className="font-mono-custom text-[10px] text-white/20 tracking-widest">STUDIO // ACCESSORIES</div>
              <div className="font-mono-custom text-[10px] text-white/10 mt-1">MILFORD, NH — EST. 2024</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[11px]">
              {[
                { title: "SHOP", links: ["All Products","New Arrivals","Collections","Sale"] },
                { title: "INFO", links: ["About","Contact","Affiliates","Press"] },
                { title: "LEGAL", links: ["Privacy","Terms","Returns","Shipping"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="font-mono-custom text-[9px] tracking-[0.3em] mb-3" style={{color: '#ae1fe355'}}>{col.title}</div>
                  {col.links.map(link => (
                    <Link key={link} href="#" className="block text-white/25 hover:text-white/70 transition-colors mb-2 tracking-wider hover-line">{link}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono-custom text-[10px] text-white/15 tracking-widest">© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
              {[["TWITTER","https://x.com/ink3dStudio"],["TIKTOK","https://www.tiktok.com/@ink3d.studio"],["DISCORD","https://discordapp.com/invite/rv99duMaW6"]].map(([name, href]) => (
                <Link key={name} href={href} className="font-mono-custom text-[10px] text-white/20 transition-colors tracking-widest hover-line hover:text-white/70">{name}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
