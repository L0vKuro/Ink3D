import Link from "next/link";

const products = [
  { id: 1, name: "PHANTOM CASE", price: "$34.99", tag: "NEW", desc: "Ultra-slim. Zero compromises." },
  { id: 2, name: "NEON GRIP", price: "$19.99", tag: "HOT", desc: "Lock in. Stand out." },
  { id: 3, name: "VOID CHARGER", price: "$49.99", tag: "LIMITED", desc: "100W. Silent. Ruthless." },
  { id: 4, name: "STEALTH BAND", price: "$29.99", tag: "NEW", desc: "Wear the night shift." },
  { id: 5, name: "CIPHER DOCK", price: "$59.99", tag: "HOT", desc: "Your setup. Elevated." },
  { id: 6, name: "RAW CABLE", price: "$14.99", tag: "STAPLE", desc: "Braided. Built to last." },
];

const tagColors = {
  NEW: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  HOT: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  LIMITED: "text-red-400 border-red-400/40 bg-red-400/10",
  STAPLE: "text-white/50 border-white/20 bg-white/5",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#080808]/75 backdrop-blur-lg border-b border-white/[0.06] px-6 md:px-12 py-4 flex justify-between items-center">
        <span className="text-xl font-black tracking-[0.2em] flicker text-orange-500">INK3D</span>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.15em] text-white/50">
          <Link href="#" className="hover:text-white transition-colors">HOME</Link>
          <Link href="#products" className="hover:text-white transition-colors">SHOP</Link>
          <Link href="#" className="hover:text-white transition-colors">COLLECTIONS</Link>
          <Link href="#" className="hover:text-white transition-colors">ABOUT</Link>
        </div>
        <button className="border border-orange-500/70 text-orange-500 px-5 py-2 text-xs font-black tracking-[0.15em] hover:bg-orange-500 hover:text-black transition-all duration-200">
          CART (0)
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px] pointer-events-none" />

        <p className="text-orange-500 text-[10px] font-black tracking-[0.5em] mb-6 uppercase">
          New Drop — 2026 Collection
        </p>

        <h1 className="text-[clamp(5rem,18vw,14rem)] font-black tracking-[-0.04em] leading-[0.9] flicker select-none">
          INK3D
        </h1>

        <p className="mt-8 text-white/40 text-base md:text-lg max-w-md tracking-wide leading-relaxed">
          Bold tech accessories engineered for those who refuse to blend in.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="#products">
            <button className="glow-btn bg-orange-500 text-black font-black px-10 py-4 text-xs tracking-[0.2em] hover:bg-orange-400 transition-colors duration-200">
              SHOP NOW
            </button>
          </Link>
          <button className="border border-white/20 text-white/70 px-10 py-4 text-xs font-black tracking-[0.2em] hover:border-white/50 hover:text-white transition-all duration-200">
            VIEW LOOKBOOK
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-orange-500 py-3 overflow-hidden border-y border-orange-400">
        <div className="marquee-track gap-0">
          {Array(16).fill(null).map((_, i) => (
            <span key={i} className="text-black font-black text-[11px] tracking-[0.3em] px-6">
              INK3D STUDIO &nbsp;/&nbsp; TECH ACCESSORIES &nbsp;/&nbsp; FREE SHIPPING OVER $50 &nbsp;/&nbsp; NEW DROP 2026 &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="products" className="px-6 md:px-12 py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-orange-500 text-[10px] font-black tracking-[0.4em] mb-3">— FEATURED DROPS</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              THE LINEUP
            </h2>
          </div>
          <button className="text-xs font-black tracking-[0.2em] text-white/40 hover:text-orange-500 transition-colors border-b border-white/10 hover:border-orange-500 pb-1 self-start md:self-auto">
            VIEW ALL →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-[#080808] border border-transparent cursor-pointer group">
              {/* Thumb */}
              <div className="card-thumb aspect-square bg-[#111] flex items-center justify-center relative overflow-hidden">
                <span className="text-[80px] font-black text-white/[0.04] group-hover:text-orange-500/20 transition-colors duration-500 select-none">
                  3D
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
              </div>
              {/* Info */}
              <div className="p-5 border-t border-white/[0.06]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[9px] font-black tracking-[0.2em] border px-2 py-0.5 ${tagColors[product.tag]}`}>
                      {product.tag}
                    </span>
                    <h3 className="font-black tracking-wide mt-2 text-sm">{product.name}</h3>
                    <p className="text-white/30 text-xs mt-1">{product.desc}</p>
                  </div>
                  <span className="font-black text-white/80 text-sm">{product.price}</span>
                </div>
                <button className="mt-4 w-full border border-white/10 text-white/50 text-[10px] font-black tracking-[0.2em] py-2.5 hover:border-orange-500 hover:text-orange-500 transition-all duration-200">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="mx-6 md:mx-12 mb-28 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px'}} />
        <div className="relative px-10 py-14 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-black/60 text-[10px] font-black tracking-[0.4em] mb-2">LIMITED TIME</p>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none">
              FREE<br />SHIPPING
            </h2>
            <p className="text-black/60 font-bold tracking-widest text-sm mt-3">ON ALL ORDERS OVER $50</p>
          </div>
          <button className="bg-black text-white font-black px-10 py-5 tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all duration-200 shrink-0">
            SHOP ALL DROPS
          </button>
        </div>
      </section>

      {/* ── AFFILIATE STRIP ── */}
      <section className="px-6 md:px-12 mb-28 text-center">
        <p className="text-white/20 text-[10px] tracking-[0.4em] mb-4">— JOIN THE FAMILY</p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
          BECOME AN <span className="text-orange-500">AFFILIATE</span>
        </h2>
        <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed mb-8">
          Promote INK3D and earn commissions on every sale. Apply to join our affiliate program.
        </p>
        <button className="border border-orange-500/50 text-orange-500 font-black px-10 py-4 text-xs tracking-[0.2em] hover:bg-orange-500 hover:text-black transition-all duration-200">
          APPLY NOW
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/25 text-[10px] tracking-[0.2em]">
          <span className="text-orange-500 font-black text-lg flicker">INK3D</span>
          <span>© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <Link href="https://x.com/ink3dStudio" className="hover:text-orange-500 transition-colors">TWITTER</Link>
            <Link href="https://www.tiktok.com/@ink3d.studio" className="hover:text-orange-500 transition-colors">TIKTOK</Link>
            <Link href="https://discordapp.com/invite/rv99duMaW6" className="hover:text-orange-500 transition-colors">DISCORD</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
