import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center text-center px-6">
      <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6" style={{ color: "#ae1fe388" }}>
        SYS://404_NOT_FOUND
      </div>
      <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-4">404</h1>
      <p className="font-mono-custom text-white/30 text-sm mb-10">// this page doesn&apos;t exist (yet).</p>
      <Link
        href="/teams"
        className="font-black px-12 py-4 text-xs tracking-[0.25em]"
        style={{ background: "#ae1fe3", color: "#fff" }}
      >
        SHOP TEAMS
      </Link>
    </main>
  );
}
