"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("// INVALID PASSWORD");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={80} height={32} className="object-contain mx-auto mb-6" /></Link>
          <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>SYS://ADMIN_ACCESS</div>
          <h1 className="text-3xl font-black tracking-tight">ADMIN PANEL</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={labelClass}>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={inputClass}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="font-mono-custom text-[9px] text-red-400 tracking-widest">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
            style={{background: loading ? '#ae1fe380' : '#ae1fe3', color: '#fff'}}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background='#c040ff'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background='#ae1fe3'; }}
          >
            {loading ? '[ VERIFYING... ]' : '[ ACCESS ]'}
          </button>
        </form>
      </div>
    </main>
  );
}
