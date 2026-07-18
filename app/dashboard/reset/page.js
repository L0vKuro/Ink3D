"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";

  async function handleReset(e) {
    e.preventDefault();
    if (password !== confirm) { setError("// PASSWORDS DO NOT MATCH"); return; }
    if (password.length < 6) { setError("// PASSWORD MUST BE AT LEAST 6 CHARACTERS"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/dashboard/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json();
      setError(`// ${data.error?.toUpperCase() ?? 'ERROR'}`);
    }
    setLoading(false);
  }

  if (!token) {
    return (
      <div className="text-center">
        <div className="font-mono-custom text-[9px] text-red-400 tracking-widest mb-4">// INVALID RESET LINK</div>
        <Link href="/dashboard" className="font-mono-custom text-[9px] text-white/30 hover:text-white tracking-widest">← BACK TO LOGIN</Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-black tracking-tight mb-4">PASSWORD UPDATED</h2>
        <p className="font-mono-custom text-white/30 text-sm mb-8">// Your password has been reset successfully.</p>
        <Link href="/dashboard">
          <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
            style={{background: '#ae1fe3', color: '#fff'}}
            onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
            [ LOGIN NOW ]
          </button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <div>
        <label className={labelClass}>NEW PASSWORD</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>CONFIRM PASSWORD</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" className={inputClass} required />
      </div>
      {error && <div className="font-mono-custom text-[9px] text-red-400 tracking-widest">{error}</div>}
      <button type="submit" disabled={loading}
        className="w-full py-4 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
        style={{background: loading ? '#ae1fe380' : '#ae1fe3', color: '#fff'}}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background='#c040ff'; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background='#ae1fe3'; }}>
        {loading ? '[ RESETTING... ]' : '[ SET NEW PASSWORD ]'}
      </button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={80} height={32} className="object-contain mx-auto mb-6" /></Link>
          <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>SYS://PASSWORD_RESET</div>
          <h1 className="text-3xl font-black tracking-tight">RESET PASSWORD</h1>
        </div>
        <Suspense fallback={<div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center">// LOADING...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}
