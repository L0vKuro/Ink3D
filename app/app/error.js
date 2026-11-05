"use client";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center text-center px-6">
      <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-6" style={{ color: "#ae1fe388" }}>
        SYS://ERROR_CAUGHT
      </div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">SOMETHING BROKE</h1>
      <p className="font-mono-custom text-white/30 text-sm mb-10">// our bad. try again or head home.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="font-black px-10 py-4 text-xs tracking-[0.25em]"
          style={{ background: "#ae1fe3", color: "#fff" }}
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          className="border border-white/15 text-white/60 px-10 py-4 text-xs font-black tracking-[0.25em] hover:text-white"
        >
          HOME
        </Link>
      </div>
    </main>
  );
}
