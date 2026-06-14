"use client";

import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "12+", label: "PARTNER ORGS", sub: "AND GROWING" },
  { value: "500+", label: "UNITS SHIPPED", sub: "WORLDWIDE" },
  { value: "100%", label: "SATISFACTION", sub: "GUARANTEED" },
  { value: "2024", label: "EST. MILFORD", sub: "MILFORD, NH" },
];

const values = [
  { icon: "⚡", title: "PRECISION", desc: "Every design is crafted with cutting-edge technology and obsessive attention to detail." },
  { icon: "🎨", title: "CREATIVITY", desc: "We don't just print logos — we bring your team's identity to life in ways that stand out." },
  { icon: "🏆", title: "EXCELLENCE", desc: "Trusted by top-tier teams and rising stars alike. We deliver nothing less than exceptional." },
  { icon: "🤝", title: "PARTNERSHIP", desc: "We're not just a vendor. We're a long-term partner invested in your brand's success." },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" /></Link>
            <span className="font-mono-custom text-[10px] text-white/20 tracking-widest hidden md:block">SYS://ABOUT_v2.6</span>
          </div>
          <div className="hidden md:flex gap-6 text-[11px] font-bold tracking-[0.15em] text-white/40">
            <Link href="/" className="hover:text-white transition-colors duration-200">HOME</Link>
            <Link href="/teams" className="hover:text-white transition-colors duration-200">TEAMS</Link>
            <Link href="/creators" className="hover:text-white transition-colors duration-200">CREATORS</Link>
            <Link href="/program" className="hover:text-white transition-colors duration-200">PROGRAM</Link>
            <Link href="/merch" className="hover:text-white transition-colors duration-200">MERCH</Link>
            <Link href="/about" className="transition-colors duration-200" style={{color: '#ae1fe3'}}>ABOUT</Link>
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

      <div className="pt-32 pb-24">

        {/* HERO SECTION */}
        <div className="px-6 md:px-12 mb-24">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://ABOUT_LOADED
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-8">
            THE<br />
            <span style={{color: '#ae1fe3'}}>LEADING</span><br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>3D DESIGN</span><br />
            SHOP IN ESPORTS
          </h1>
          <div className="max-w-2xl">
            <p className="font-mono-custom text-white/50 text-sm leading-relaxed mb-6">
              // As the leading 3D design and merchandise shop in Esports, we are dedicated to bringing your team's vision to life with precision and creativity.
            </p>
            <p className="font-mono-custom text-white/30 text-sm leading-relaxed">
              // Specializing in high-quality, custom 3D designs, we offer an extensive range of products that allow Esports Organizations, Streamers, and fans to stand out in style.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] mb-24">
          {stats.map((s) => (
            <div key={s.value} className="bg-[#050505] p-8 md:p-12 text-center group hover:bg-[#0d0d0d] transition-colors duration-300 bracket-box">
              <div className="stat-number text-4xl md:text-5xl font-black mb-2" style={{color: '#ae1fe3'}}>{s.value}</div>
              <div className="font-mono-custom text-[10px] text-white/50 tracking-[0.2em] mb-1">{s.label}</div>
              <div className="font-mono-custom text-[9px] text-white/20 tracking-[0.15em]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* MISSION STATEMENT */}
        <div className="px-6 md:px-12 mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// OUR MISSION</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                BRINGING YOUR<br />
                <span style={{color: '#ae1fe3'}}>VISION</span> TO LIFE
              </h2>
              <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-6">
                // From intricately detailed logos to stunning apparel, accessories, and collectibles, our designs combine cutting-edge technology with a deep understanding of esports culture.
              </p>
              <p className="font-mono-custom text-white/40 text-sm leading-relaxed">
                // Trusted by top-tier teams and rising stars alike, we pride ourselves on delivering exceptional products that elevate your brand and help you make a lasting impact in the competitive gaming world.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, #ae1fe315, transparent 70%)'}} />
                <Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={280} height={280} className="object-contain relative z-10 flicker" />
              </div>
              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2" style={{borderColor: '#ae1fe3'}} />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2" style={{borderColor: '#ae1fe3'}} />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2" style={{borderColor: '#ae1fe3'}} />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2" style={{borderColor: '#ae1fe3'}} />
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="px-6 md:px-12 mb-24">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// WHAT WE STAND FOR</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-12">
            OUR <span style={{color: '#ae1fe3'}}>VALUES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
            {values.map((v) => (
              <div key={v.title} className="bg-[#050505] p-8 hover:bg-[#0d0d0d] transition-colors duration-300 group">
                <div className="text-3xl mb-4">{v.icon}</div>
                <div className="font-black tracking-wider text-sm mb-3 group-hover:text-white transition-colors" style={{color: '#ae1fe3'}}>{v.title}</div>
                <div className="font-mono-custom text-[11px] text-white/30 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FULL ABOUT TEXT */}
        <div className="px-6 md:px-12 mb-24">
          <div className="border border-white/[0.06] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute top-0 left-0 w-full h-px" style={{background: 'linear-gradient(to right, #ae1fe3, transparent)'}} />
            <div className="relative">
              <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>// FULL STORY</div>
              <blockquote className="text-white/60 text-base md:text-lg leading-relaxed font-mono-custom border-l-2 pl-8" style={{borderColor: '#ae1fe3'}}>
                "Whether you're looking for unique fan gear or professional Esports merch, we're here to make your ideas a reality with unmatched craftsmanship and attention to detail."
              </blockquote>
              <div className="mt-8 font-mono-custom text-[10px] tracking-widest" style={{color: '#ae1fe366'}}>— INK3D STUDIO, MILFORD NH, EST. 2024</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 md:px-12">
          <div className="text-center py-20 border border-white/[0.05] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, #ae1fe308, transparent 70%)'}} />
            <div className="relative">
              <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{color: '#ae1fe355'}}>// READY TO START</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                LET'S BUILD<br />
                <span style={{color: '#ae1fe3'}}>SOMETHING</span>
              </h2>
              <p className="font-mono-custom text-white/30 text-sm mb-10 max-w-md mx-auto">
                // Whether you're a team, a creator, or a fan — INK3D has something for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/teams">
                  <button className="glow-btn font-black px-12 py-4 text-xs tracking-[0.25em] font-mono-custom transition-all duration-200"
                    style={{background: '#ae1fe3', color: '#fff'}}>
                    SHOP TEAMS
                  </button>
                </Link>
                <Link href="/program">
                  <button className="font-black px-12 py-4 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200"
                    style={{border: '1px solid #ae1fe344', color: '#ae1fe3', background: 'transparent'}}
                    onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
                    JOIN PROGRAM
                  </button>
                </Link>
              </div>
            </div>
          </div>
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
