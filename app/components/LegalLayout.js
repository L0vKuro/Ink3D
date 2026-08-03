import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalLayout({ eyebrow, title, updated, children }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav />
      <div className="pt-28 px-6 md:px-12 pb-24 max-w-3xl mx-auto">
        <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{ color: '#ae1fe366' }}>// {eyebrow}</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">{title}</h1>
        <div className="font-mono-custom text-[10px] text-white/25 tracking-widest mb-12">LAST UPDATED — {updated}</div>
        <div className="space-y-10">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="font-black text-base md:text-lg tracking-wide mb-3" style={{ color: '#ae1fe3' }}>{heading}</h2>
      <div className="font-mono-custom text-white/50 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
