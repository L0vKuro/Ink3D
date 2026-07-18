"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [affiliate, setAffiliate] = useState(null);
  const [statsView, setStatsView] = useState("lifetime");

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";
  const tierColors = { BRONZE: '#cd7f32', SILVER: '#c0c0c0', GOLD: '#ffd60a', DIAMOND: '#00b4d8', ELITE: '#ae1fe3' };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/dashboard/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setAffiliate(data.affiliate);
    } else {
      setError("// INVALID EMAIL OR PASSWORD");
    }
    setLoading(false);
  }

  function handleLogout() {
    setAffiliate(null);
    setEmail("");
    setPassword("");
  }

  const stats = affiliate ? {
    orders: statsView === "lifetime" ? (affiliate.stats?.lifetimeOrders ?? 0) : (affiliate.stats?.monthlyOrders ?? 0),
    sales: statsView === "lifetime" ? (affiliate.stats?.lifetimeSales ?? 0) : (affiliate.stats?.monthlySales ?? 0),
    earnings: statsView === "lifetime" ? (affiliate.stats?.lifetimeEarnings ?? 0) : (affiliate.stats?.monthlyEarnings ?? 0),
  } : null;

  const orders = affiliate?.stats?.orders ?? [];
  const now = new Date();
  const thisMonthOrders = orders.filter(o => {
    const d = new Date(o.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const displayOrders = statsView === "lifetime" ? orders : thisMonthOrders;

  if (!affiliate) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={80} height={32} className="object-contain mx-auto mb-6" /></Link>
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>SYS://AFFILIATE_ACCESS</div>
            <h1 className="text-3xl font-black tracking-tight">AFFILIATE DASHBOARD</h1>
            <p className="font-mono-custom text-white/20 text-xs mt-2 tracking-widest">// INK3D PROGRAM MEMBERS ONLY</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label className={labelClass}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" className={inputClass} autoComplete="current-password" />
            </div>
            {error && <div className="font-mono-custom text-[9px] text-red-400 tracking-widest">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full py-4 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
              style={{background: loading ? '#ae1fe380' : '#ae1fe3', color: '#fff'}}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background='#c040ff'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background='#ae1fe3'; }}>
              {loading ? '[ LOGGING IN... ]' : '[ ACCESS DASHBOARD ]'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* HEADER */}
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={60} height={24} className="object-contain" /></Link>
          <div className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe366'}}>SYS://DASHBOARD_LOADED</div>
        </div>
        <button onClick={handleLogout} className="font-mono-custom text-[9px] text-white/20 hover:text-white transition-colors tracking-widest">[ LOGOUT ]</button>
      </div>

      <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto">

        {/* WELCOME */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{affiliate.name.toUpperCase()}</h1>
            <span className="font-mono-custom text-[10px] font-black px-3 py-1 tracking-widest"
              style={{background: tierColors[affiliate.tier] + '20', color: tierColors[affiliate.tier], border: `1px solid ${tierColors[affiliate.tier]}40`}}>
              {affiliate.tier}
            </span>
          </div>
          <div className="font-mono-custom text-white/30 text-sm">{affiliate.email} — {affiliate.commission}% COMMISSION</div>
        </div>

        {/* STATS TOGGLE */}
        <div className="flex gap-2 mb-8">
          {["lifetime", "month"].map(v => (
            <button key={v} onClick={() => setStatsView(v)}
              className="font-mono-custom text-[10px] tracking-widest px-5 py-2 transition-all duration-200"
              style={{
                background: statsView === v ? '#ae1fe3' : 'transparent',
                color: statsView === v ? '#fff' : 'rgba(255,255,255,0.3)',
                border: '1px solid',
                borderColor: statsView === v ? '#ae1fe3' : 'rgba(255,255,255,0.08)',
              }}>
              {v === "lifetime" ? "LIFETIME" : "THIS MONTH"}
            </button>
          ))}
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.04] mb-12">
          {[
            { label: "ORDERS", value: stats.orders },
            { label: "TOTAL SALES", value: `$${stats.sales.toFixed(2)}` },
            { label: "EARNINGS", value: `$${stats.earnings.toFixed(2)}`, green: true },
          ].map(s => (
            <div key={s.label} className="bg-[#050505] p-8 text-center">
              <div className="font-mono-custom text-[9px] text-white/30 tracking-widest mb-2">{s.label}</div>
              <div className="font-black text-3xl md:text-4xl" style={{color: s.green ? '#22c55e' : '#ae1fe3'}}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* REFERRAL LINK & DISCOUNT CODE */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border border-white/[0.06] p-6">
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// YOUR REFERRAL LINK</div>
            <div className="bg-[#0a0a0a] border border-white/[0.05] px-4 py-3 font-mono-custom text-sm text-white/60 mb-3 break-all">
              ink3d.lol/?ref={affiliate.referralCode}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(`https://ink3d.lol/?ref=${affiliate.referralCode}`); }}
              className="font-mono-custom text-[9px] tracking-widest px-4 py-2 transition-all duration-200"
              style={{border: '1px solid #ae1fe344', color: '#ae1fe3'}}
              onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
              [ COPY LINK ]
            </button>
          </div>
          <div className="border border-white/[0.06] p-6">
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-4" style={{color: '#ae1fe366'}}>// YOUR DISCOUNT CODE</div>
            <div className="bg-[#0a0a0a] border border-white/[0.05] px-4 py-3 font-black text-2xl tracking-widest mb-3" style={{color: '#ae1fe3'}}>
              {affiliate.discountCode}
            </div>
            <div className="font-mono-custom text-[9px] text-white/30 tracking-widest">{affiliate.discountPercent}% OFF FOR YOUR CUSTOMERS</div>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="border border-white/[0.06] p-6">
          <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>
            // {statsView === "lifetime" ? "ALL" : "THIS MONTH'S"} ORDERS
          </div>
          {displayOrders.length === 0 ? (
            <div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center py-8">// NO ORDERS YET</div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 font-mono-custom text-[8px] text-white/30 tracking-widest pb-2 border-b border-white/[0.05]">
                <span>DATE</span>
                <span>PRODUCT</span>
                <span>SALE</span>
                <span>YOUR EARNINGS</span>
              </div>
              {displayOrders.map((o, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 font-mono-custom text-[10px] py-2 border-b border-white/[0.03]">
                  <span className="text-white/40">{new Date(o.date).toLocaleDateString()}</span>
                  <span className="text-white/70 truncate">{o.product}</span>
                  <span className="text-white/70">${o.saleAmount?.toFixed(2)}</span>
                  <span className="text-green-400 font-black">${o.earnings?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <footer className="border-t border-white/[0.05] mt-12">
        <div className="px-6 md:px-12 py-8 flex justify-between items-center">
          <span className="font-mono-custom text-[9px] text-white/15 tracking-widest">© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
          <Link href="/" className="font-mono-custom text-[9px] text-white/20 hover:text-white transition-colors tracking-widest">← BACK TO STORE</Link>
        </div>
      </footer>
    </main>
  );
}
