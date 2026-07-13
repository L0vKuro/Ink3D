"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Admin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tracking");

  // Tracking state
  const [tracking, setTracking] = useState({ customerEmail: "", customerName: "", trackingLink: "", orderId: "" });
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Discount state
  const [discounts, setDiscounts] = useState([]);
  const [archive, setArchive] = useState([]);
  const [discountsLoading, setDiscountsLoading] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newPercent, setNewPercent] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    if (activeTab === "discounts") loadDiscounts();
  }, [activeTab]);

  async function loadDiscounts() {
    setDiscountsLoading(true);
    const res = await fetch("/api/admin/discounts");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setDiscounts(data.codes ?? []);
    setArchive(data.archive ?? []);
    setDiscountsLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleSendTracking(e) {
    e.preventDefault();
    setTrackingLoading(true);
    setTrackingStatus(null);
    const res = await fetch("/api/admin/send-tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tracking),
    });
    if (res.status === 401) { router.push("/admin/login"); return; }
    setTrackingStatus(res.ok ? "success" : "error");
    if (res.ok) setTracking({ customerEmail: "", customerName: "", trackingLink: "", orderId: "" });
    setTrackingLoading(false);
  }

  async function addDiscount() {
    if (!newCode || !newPercent) return;
    const code = newCode.trim().toUpperCase();
    const percent = parseInt(newPercent);
    if (isNaN(percent) || percent < 1 || percent > 100) { setDiscountMsg("// INVALID PERCENT"); return; }
    const res = await fetch("/api/admin/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, percent }),
    });
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    if (res.ok) {
      setDiscounts(data.codes);
      setNewCode("");
      setNewPercent("");
      setDiscountMsg(`// ${code} ADDED`);
    } else {
      setDiscountMsg(`// ${data.error?.toUpperCase() ?? 'ERROR'}`);
    }
  }

  async function removeDiscount(code) {
    const res = await fetch("/api/admin/discounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    if (res.ok) {
      setDiscounts(data.codes);
      await loadDiscounts();
      setDiscountMsg(`// ${code} ARCHIVED`);
    }
  }

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={60} height={24} className="object-contain" /></Link>
          <div className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe366'}}>SYS://ADMIN_PANEL</div>
        </div>
        <button onClick={handleLogout} className="font-mono-custom text-[9px] text-white/20 hover:text-white transition-colors tracking-widest">[ LOGOUT ]</button>
      </div>

      <div className="px-6 md:px-12 py-12 max-w-4xl mx-auto">
        <div className="flex gap-1 mb-12 border-b border-white/[0.06]">
          {["tracking", "discounts"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="font-mono-custom text-[10px] tracking-widest px-6 py-3 transition-all duration-200"
              style={{ color: activeTab === tab ? '#ae1fe3' : 'rgba(255,255,255,0.3)', borderBottom: activeTab === tab ? '1px solid #ae1fe3' : '1px solid transparent' }}>
              {tab === "tracking" ? "// SEND TRACKING" : "// DISCOUNT CODES"}
            </button>
          ))}
        </div>

        {activeTab === "tracking" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight mb-2">SEND TRACKING</h2>
              <p className="font-mono-custom text-white/30 text-sm">// Send a tracking link to a customer via email.</p>
            </div>
            <form onSubmit={handleSendTracking} className="border border-white/[0.06] p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>CUSTOMER NAME</label>
                  <input value={tracking.customerName} onChange={e => setTracking(p => ({...p, customerName: e.target.value}))} required placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>CUSTOMER EMAIL</label>
                  <input type="email" value={tracking.customerEmail} onChange={e => setTracking(p => ({...p, customerEmail: e.target.value}))} required placeholder="customer@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>ORDER ID</label>
                <input value={tracking.orderId} onChange={e => setTracking(p => ({...p, orderId: e.target.value}))} required placeholder="PayPal Order ID" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>TRACKING LINK</label>
                <input value={tracking.trackingLink} onChange={e => setTracking(p => ({...p, trackingLink: e.target.value}))} required placeholder="https://tracking.carrier.com/..." className={inputClass} />
              </div>
              {trackingStatus === "success" && <div className="font-mono-custom text-[9px] text-green-400 tracking-widest">// TRACKING EMAIL SENT SUCCESSFULLY</div>}
              {trackingStatus === "error" && <div className="font-mono-custom text-[9px] text-red-400 tracking-widest">// FAILED TO SEND — TRY AGAIN</div>}
              <button type="submit" disabled={trackingLoading}
                className="w-full py-4 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
                style={{background: trackingLoading ? '#ae1fe380' : '#ae1fe3', color: '#fff'}}
                onMouseEnter={e => { if (!trackingLoading) e.currentTarget.style.background='#c040ff'; }}
                onMouseLeave={e => { if (!trackingLoading) e.currentTarget.style.background='#ae1fe3'; }}>
                {trackingLoading ? '[ SENDING... ]' : '[ SEND TRACKING EMAIL ]'}
              </button>
            </form>
          </div>
        )}

        {activeTab === "discounts" && (
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight mb-2">DISCOUNT CODES</h2>
                <p className="font-mono-custom text-white/30 text-sm">// Manage active discount codes. Stored permanently in Redis.</p>
              </div>
              <button
                onClick={() => setShowArchive(!showArchive)}
                className="font-mono-custom text-[9px] tracking-widest px-4 py-2 border transition-all duration-200 shrink-0"
                style={{
                  borderColor: showArchive ? '#ae1fe3' : 'rgba(255,255,255,0.08)',
                  color: showArchive ? '#ae1fe3' : 'rgba(255,255,255,0.30)',
                }}
              >
                {showArchive ? '[ HIDE ARCHIVE ]' : '[ CODE ARCHIVES ]'} {archive.length > 0 && `(${archive.length})`}
              </button>
            </div>

            {/* ARCHIVE */}
            {showArchive && (
              <div className="border border-white/[0.06] p-8 mb-6" style={{borderColor: '#ae1fe320', background: '#0a0a0a'}}>
                <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>// CODE ARCHIVES</div>
                {archive.length === 0 ? (
                  <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// NO ARCHIVED CODES</div>
                ) : (
                  <div className="space-y-3">
                    {archive.map(d => (
                      <div key={d.code} className="flex justify-between items-center border border-white/[0.04] px-4 py-3 bg-[#050505]">
                        <div className="flex items-center gap-6">
                          <span className="font-black tracking-wider text-white/30 line-through">{d.code}</span>
                          <span className="font-mono-custom text-[9px] text-white/20">{d.percent}% OFF</span>
                        </div>
                        <div className="font-mono-custom text-[9px] text-white/15 tracking-widest">
                          {d.deletedAt ? new Date(d.deletedAt).toLocaleDateString() : 'ARCHIVED'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ACTIVE CODES */}
            <div className="border border-white/[0.06] p-8 mb-6">
              <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>// ACTIVE CODES</div>
              {discountsLoading ? (
                <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// LOADING...</div>
              ) : discounts.length === 0 ? (
                <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// NO ACTIVE CODES</div>
              ) : (
                <div className="space-y-3">
                  {discounts.map(d => (
                    <div key={d.code} className="flex justify-between items-center border border-white/[0.05] px-4 py-3 bg-[#0a0a0a]">
                      <div className="flex items-center gap-6">
                        <span className="font-black tracking-wider" style={{color: '#ae1fe3'}}>{d.code}</span>
                        <span className="font-mono-custom text-[9px] text-white/40">{d.percent}% OFF</span>
                      </div>
                      <button onClick={() => removeDiscount(d.code)} className="font-mono-custom text-[9px] text-white/20 hover:text-red-400 transition-colors tracking-widest">[ REMOVE ]</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ADD CODE */}
            <div className="border border-white/[0.06] p-8">
              <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>// ADD NEW CODE</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className={labelClass}>CODE</label>
                  <input value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="SUMMER25" className={inputClass} />
                </div>
                <div className="w-32">
                  <label className={labelClass}>% OFF</label>
                  <input type="number" min="1" max="100" value={newPercent} onChange={e => setNewPercent(e.target.value)} placeholder="25" className={inputClass} />
                </div>
                <div className="flex items-end">
                  <button onClick={addDiscount} className="px-6 py-3 font-black text-xs tracking-widest font-mono-custom transition-all duration-200"
                    style={{background: '#ae1fe3', color: '#fff'}}
                    onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
                    ADD
                  </button>
                </div>
              </div>
              {discountMsg && <div className="font-mono-custom text-[9px] text-green-400 tracking-widest mt-3">{discountMsg}</div>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
