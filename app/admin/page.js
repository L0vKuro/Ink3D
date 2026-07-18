"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const TIERS = ["BRONZE", "SILVER", "GOLD", "DIAMOND", "ELITE"];
const TIER_COMMISSIONS = { BRONZE: 10, SILVER: 13, GOLD: 16, DIAMOND: 20, ELITE: 25 };

export default function Admin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tracking");

  const [tracking, setTracking] = useState({ customerEmail: "", customerName: "", trackingLink: "", orderId: "" });
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const [discounts, setDiscounts] = useState([]);
  const [archive, setArchive] = useState([]);
  const [discountsLoading, setDiscountsLoading] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newPercent, setNewPercent] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [showArchive, setShowArchive] = useState(false);

  const [affiliates, setAffiliates] = useState([]);
  const [affiliatesLoading, setAffiliatesLoading] = useState(false);
  const [affiliateMsg, setAffiliateMsg] = useState("");
  const [showCreateAffiliate, setShowCreateAffiliate] = useState(false);
  const [resetPasswordId, setResetPasswordId] = useState(null);
  const [resetPassword, setResetPassword] = useState("");
  const [newAffiliate, setNewAffiliate] = useState({
    name: "", email: "", password: "", referralCode: "", discountCode: "", discountPercent: "", tier: "BRONZE",
  });

  useEffect(() => {
    if (activeTab === "discounts") loadDiscounts();
    if (activeTab === "affiliates") loadAffiliates();
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

  async function loadAffiliates() {
    setAffiliatesLoading(true);
    const res = await fetch("/api/admin/affiliates");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setAffiliates(data.affiliates ?? []);
    setAffiliatesLoading(false);
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
    if (res.ok) {
      await loadDiscounts();
      setDiscountMsg(`// ${code} ARCHIVED`);
    }
  }

  async function createAffiliate() {
    const { name, email, password, referralCode, discountCode, discountPercent, tier } = newAffiliate;
    if (!name || !email || !password || !referralCode || !discountCode || !discountPercent) {
      setAffiliateMsg("// ALL FIELDS REQUIRED");
      return;
    }
    const res = await fetch("/api/admin/affiliates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, referralCode, discountCode, discountPercent, tier }),
    });
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    if (res.ok) {
      await loadAffiliates();
      setNewAffiliate({ name: "", email: "", password: "", referralCode: "", discountCode: "", discountPercent: "", tier: "BRONZE" });
      setShowCreateAffiliate(false);
      setAffiliateMsg(`// ${name.toUpperCase()} ADDED — WELCOME EMAIL SENT`);
    } else {
      setAffiliateMsg(`// ${data.error?.toUpperCase() ?? 'ERROR'}`);
    }
  }

  async function deleteAffiliate(id, name) {
    if (!confirm(`Remove ${name} from the program?`)) return;
    const res = await fetch("/api/admin/affiliates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await loadAffiliates();
      setAffiliateMsg(`// ${name.toUpperCase()} REMOVED`);
    }
  }

  async function handleResetPassword(id) {
    if (!resetPassword) return;
    const res = await fetch("/api/admin/affiliates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: resetPassword }),
    });
    if (res.ok) {
      setResetPasswordId(null);
      setResetPassword("");
      setAffiliateMsg("// PASSWORD RESET — EMAIL SENT");
    }
  }

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";
  const tierColors = { BRONZE: '#cd7f32', SILVER: '#c0c0c0', GOLD: '#ffd60a', DIAMOND: '#00b4d8', ELITE: '#ae1fe3' };

  const regularCodes = discounts.filter(d => !d.affiliateId);
  const affiliateCodes = discounts.filter(d => d.affiliateId);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={60} height={24} className="object-contain" /></Link>
          <div className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe366'}}>SYS://ADMIN_PANEL</div>
        </div>
        <button onClick={handleLogout} className="font-mono-custom text-[9px] text-white/20 hover:text-white transition-colors tracking-widest">[ LOGOUT ]</button>
      </div>

      <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
        <div className="flex gap-1 mb-12 border-b border-white/[0.06] overflow-x-auto">
          {["tracking", "discounts", "affiliates"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="font-mono-custom text-[10px] tracking-widest px-6 py-3 transition-all duration-200 whitespace-nowrap"
              style={{ color: activeTab === tab ? '#ae1fe3' : 'rgba(255,255,255,0.3)', borderBottom: activeTab === tab ? '1px solid #ae1fe3' : '1px solid transparent' }}>
              {tab === "tracking" ? "// SEND TRACKING" : tab === "discounts" ? "// DISCOUNT CODES" : "// AFFILIATES"}
            </button>
          ))}
        </div>

        {/* TRACKING TAB */}
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

        {/* DISCOUNTS TAB */}
        {activeTab === "discounts" && (
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight mb-2">DISCOUNT CODES</h2>
                <p className="font-mono-custom text-white/30 text-sm">// Manage active discount codes.</p>
              </div>
              <button onClick={() => setShowArchive(!showArchive)}
                className="font-mono-custom text-[9px] tracking-widest px-4 py-2 border transition-all duration-200 shrink-0"
                style={{ borderColor: showArchive ? '#ae1fe3' : 'rgba(255,255,255,0.08)', color: showArchive ? '#ae1fe3' : 'rgba(255,255,255,0.30)' }}>
                {showArchive ? '[ HIDE ARCHIVE ]' : '[ CODE ARCHIVES ]'} {archive.length > 0 && `(${archive.length})`}
              </button>
            </div>

            {showArchive && (
              <div className="border p-8 mb-6" style={{borderColor: '#ae1fe320', background: '#0a0a0a'}}>
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
              ) : regularCodes.length === 0 && affiliateCodes.length === 0 ? (
                <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// NO ACTIVE CODES</div>
              ) : (
                <div className="space-y-3">
                  {regularCodes.map(d => (
                    <div key={d.code} className="flex justify-between items-center border border-white/[0.05] px-4 py-3 bg-[#0a0a0a]">
                      <div className="flex items-center gap-6">
                        <span className="font-black tracking-wider" style={{color: '#ae1fe3'}}>{d.code}</span>
                        <span className="font-mono-custom text-[9px] text-white/40">{d.percent}% OFF</span>
                      </div>
                      <button onClick={() => removeDiscount(d.code)} className="font-mono-custom text-[9px] text-white/20 hover:text-red-400 transition-colors tracking-widest">[ REMOVE ]</button>
                    </div>
                  ))}
                  {affiliateCodes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/[0.04]">
                      <div className="font-mono-custom text-[9px] tracking-[0.3em] mb-3 text-white/20">// AFFILIATE CODES — MANAGE IN AFFILIATES TAB</div>
                      {affiliateCodes.map(d => (
                        <div key={d.code} className="flex justify-between items-center border border-white/[0.03] px-4 py-3 bg-[#0a0a0a] mb-2 opacity-40">
                          <div className="flex items-center gap-6">
                            <span className="font-black tracking-wider text-white/50">{d.code}</span>
                            <span className="font-mono-custom text-[9px] text-white/30">{d.percent}% OFF</span>
                            <span className="font-mono-custom text-[9px] text-white/20">— {d.affiliateName}</span>
                          </div>
                          <span className="font-mono-custom text-[9px] text-white/20 tracking-widest">AFFILIATE</span>
                        </div>
                      ))}
                    </div>
                  )}
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

        {/* AFFILIATES TAB */}
        {activeTab === "affiliates" && (
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight mb-2">AFFILIATES</h2>
                <p className="font-mono-custom text-white/30 text-sm">// Manage affiliate accounts and view their stats.</p>
              </div>
              <button onClick={() => setShowCreateAffiliate(!showCreateAffiliate)}
                className="font-mono-custom text-[9px] tracking-widest px-4 py-2 transition-all duration-200 shrink-0"
                style={{background: showCreateAffiliate ? 'transparent' : '#ae1fe3', color: showCreateAffiliate ? '#ae1fe3' : '#fff', border: '1px solid #ae1fe3'}}
                onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = showCreateAffiliate ? 'transparent' : '#ae1fe3'; e.currentTarget.style.color = showCreateAffiliate ? '#ae1fe3' : '#fff'; }}>
                {showCreateAffiliate ? '[ CANCEL ]' : '[ + CREATE AFFILIATE ]'}
              </button>
            </div>

            {affiliateMsg && <div className="font-mono-custom text-[9px] text-green-400 tracking-widest mb-6">{affiliateMsg}</div>}

            {showCreateAffiliate && (
              <div className="border border-white/[0.06] p-8 mb-8" style={{borderColor: '#ae1fe330'}}>
                <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe3'}}>// NEW AFFILIATE</div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>FULL NAME</label>
                    <input value={newAffiliate.name} onChange={e => setNewAffiliate(p => ({...p, name: e.target.value}))} placeholder="David Almazan" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>EMAIL</label>
                    <input type="email" value={newAffiliate.email} onChange={e => setNewAffiliate(p => ({...p, email: e.target.value}))} placeholder="david@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>PASSWORD</label>
                    <input type="text" value={newAffiliate.password} onChange={e => setNewAffiliate(p => ({...p, password: e.target.value}))} placeholder="Set their password" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>TIER</label>
                    <select value={newAffiliate.tier} onChange={e => setNewAffiliate(p => ({...p, tier: e.target.value}))} className={`${inputClass} cursor-pointer`}>
                      {TIERS.map(t => (
                        <option key={t} value={t}>{t} — {TIER_COMMISSIONS[t]}% commission</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>REFERRAL CODE</label>
                    <input value={newAffiliate.referralCode} onChange={e => setNewAffiliate(p => ({...p, referralCode: e.target.value.toUpperCase()}))} placeholder="DAVID" className={inputClass} />
                    <div className="font-mono-custom text-[8px] text-white/20 mt-1">ink3d.lol/?ref={newAffiliate.referralCode || 'CODE'}</div>
                  </div>
                  <div>
                    <label className={labelClass}>DISCOUNT CODE</label>
                    <input value={newAffiliate.discountCode} onChange={e => setNewAffiliate(p => ({...p, discountCode: e.target.value.toUpperCase()}))} placeholder="DAVID10" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>DISCOUNT %</label>
                    <input type="number" min="1" max="100" value={newAffiliate.discountPercent} onChange={e => setNewAffiliate(p => ({...p, discountPercent: e.target.value}))} placeholder="10" className={inputClass} />
                  </div>
                </div>
                <button onClick={createAffiliate}
                  className="w-full py-4 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
                  style={{background: '#ae1fe3', color: '#fff'}}
                  onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}>
                  [ CREATE ACCOUNT + SEND WELCOME EMAIL ]
                </button>
              </div>
            )}

            <div className="space-y-4">
              {affiliatesLoading ? (
                <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// LOADING...</div>
              ) : affiliates.length === 0 ? (
                <div className="border border-white/[0.06] p-8 text-center">
                  <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">// NO AFFILIATES YET</div>
                </div>
              ) : (
                affiliates.map(a => (
                  <div key={a.id} className="border border-white/[0.06] p-6 bg-[#0a0a0a]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-black text-lg tracking-wider">{a.name}</span>
                          <span className="font-mono-custom text-[9px] font-black px-2 py-0.5 tracking-widest" style={{background: tierColors[a.tier] + '20', color: tierColors[a.tier], border: `1px solid ${tierColors[a.tier]}40`}}>{a.tier}</span>
                        </div>
                        <div className="font-mono-custom text-[10px] text-white/30">{a.email}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setResetPasswordId(a.id); setResetPassword(""); }}
                          className="font-mono-custom text-[9px] text-white/20 hover:text-yellow-400 transition-colors tracking-widest">
                          [ RESET PW ]
                        </button>
                        <button onClick={() => deleteAffiliate(a.id, a.name)}
                          className="font-mono-custom text-[9px] text-white/20 hover:text-red-400 transition-colors tracking-widest">
                          [ REMOVE ]
                        </button>
                      </div>
                    </div>

                    {resetPasswordId === a.id && (
                      <div className="flex gap-3 mb-4">
                        <input value={resetPassword} onChange={e => setResetPassword(e.target.value)} placeholder="New password" className={`${inputClass} flex-1`} />
                        <button onClick={() => handleResetPassword(a.id)}
                          className="px-4 font-mono-custom text-[9px] tracking-widest font-black transition-all duration-200"
                          style={{background: '#ae1fe3', color: '#fff'}}>
                          SEND
                        </button>
                        <button onClick={() => setResetPasswordId(null)}
                          className="px-4 font-mono-custom text-[9px] tracking-widest text-white/30 hover:text-white transition-colors">
                          CANCEL
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-[#050505] p-3 border border-white/[0.04]">
                        <div className="font-mono-custom text-[8px] text-white/30 tracking-widest mb-1">LIFETIME ORDERS</div>
                        <div className="font-black text-xl" style={{color: '#ae1fe3'}}>{a.stats?.lifetimeOrders ?? 0}</div>
                      </div>
                      <div className="bg-[#050505] p-3 border border-white/[0.04]">
                        <div className="font-mono-custom text-[8px] text-white/30 tracking-widest mb-1">LIFETIME SALES</div>
                        <div className="font-black text-xl" style={{color: '#ae1fe3'}}>${(a.stats?.lifetimeSales ?? 0).toFixed(2)}</div>
                      </div>
                      <div className="bg-[#050505] p-3 border border-white/[0.04]">
                        <div className="font-mono-custom text-[8px] text-white/30 tracking-widest mb-1">LIFETIME EARNINGS</div>
                        <div className="font-black text-xl text-green-400">${(a.stats?.lifetimeEarnings ?? 0).toFixed(2)}</div>
                      </div>
                      <div className="bg-[#050505] p-3 border border-white/[0.04]">
                        <div className="font-mono-custom text-[8px] text-white/30 tracking-widest mb-1">COMMISSION</div>
                        <div className="font-black text-xl" style={{color: tierColors[a.tier]}}>{a.commission}%</div>
                      </div>
                    </div>

                    <div className="flex gap-6 font-mono-custom text-[9px] text-white/30">
                      <span>REF LINK: <span className="text-white/50">ink3d.lol/?ref={a.referralCode}</span></span>
                      <span>DISCOUNT: <span style={{color: '#ae1fe3'}}>{a.discountCode}</span> ({a.discountPercent}% off)</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
