"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";
import { useCart } from "../context/CartContext";

const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";

export default function Checkout() {
  const router = useRouter();
  const { items, total } = useCart();
  const [form, setForm] = useState({
    fullName: "", email: "",
    address: "", city: "", state: "", zip: "", country: "US",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const discountAmount = discountApplied ? (total * discountApplied.percent / 100) : 0;
  const finalTotal = (total - discountAmount).toFixed(2);

  // Auto-apply discount from ref link
  useEffect(() => {
    const ref = localStorage.getItem("ink3d_ref");
    if (ref) {
      autoApplyRefDiscount(ref);
    }
  }, []);

  async function autoApplyRefDiscount(ref) {
    try {
      const res = await fetch("/api/admin/discounts");
      const data = await res.json();
      const affiliateCode = data.codes?.find(d => d.affiliateId && d.code === ref);
      if (!affiliateCode) {
        // Try matching by referral code — find affiliate whose referralCode matches ref
        const allCodes = data.codes ?? [];
        // Look for affiliate discount code linked to this ref
        const res2 = await fetch("/api/admin/affiliates");
        const affData = await res2.json();
        const affiliate = affData.affiliates?.find(a => a.referralCode === ref);
        if (affiliate) {
          const matchedCode = allCodes.find(d => d.code === affiliate.discountCode);
          if (matchedCode) {
            setDiscountCode(matchedCode.code);
            setDiscountApplied({ percent: matchedCode.percent, code: matchedCode.code });
          }
        }
      } else {
        setDiscountCode(affiliateCode.code);
        setDiscountApplied({ percent: affiliateCode.percent, code: affiliateCode.code });
      }
    } catch (err) {
      console.error("Auto-apply ref discount error:", err);
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  }

  async function applyDiscount() {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;
    setDiscountLoading(true);
    setDiscountError("");
    try {
      const res = await fetch("/api/admin/discounts");
      const data = await res.json();
      const found = data.codes?.find(d => d.code === code);
      if (found) {
        setDiscountApplied({ percent: found.percent, code: found.code });
        setDiscountError("");
      } else {
        setDiscountApplied(null);
        setDiscountError("Invalid discount code.");
      }
    } catch {
      setDiscountError("Error validating code. Try again.");
    }
    setDiscountLoading(false);
  }

  function validate() {
    const e = {};
    if (!form.fullName) e.fullName = "Required";
    if (!form.email) e.email = "Required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.zip) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleContinue() {
    if (!validate()) return;
    sessionStorage.setItem("ink3d_checkout", JSON.stringify({
      ...form,
      discountCode: discountApplied ? discountApplied.code : null,
      discountPercent: discountApplied ? discountApplied.percent : null,
      discountAmount: discountAmount.toFixed(2),
      finalTotal,
    }));
    router.push("/checkout/payment");
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <Nav active="HOME" />
        <div className="text-center">
          <div className="font-mono-custom text-[9px] text-white/20 tracking-widest mb-4">// CART_EMPTY</div>
          <h1 className="text-4xl font-black mb-6">YOUR CART IS EMPTY</h1>
          <Link href="/teams">
            <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom glow-btn" style={{background: '#ae1fe3', color: '#fff'}}>SHOP NOW</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav active="HOME" />

      <div className="pt-28 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>// CHECKOUT</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-12">COMPLETE YOUR ORDER</h1>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">

          <div className="space-y-8">

            <div className="border border-white/[0.06] p-8 relative">
              <div className="absolute -top-3 left-6 bg-[#050505] px-3">
                <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// CONTACT INFORMATION</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>FULL NAME <span style={{color: '#ae1fe3'}}>*</span></label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" className={inputClass} style={{borderColor: errors.fullName ? '#ff4444' : undefined}} />
                  {errors.fullName && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.fullName}</div>}
                </div>
                <div>
                  <label className={labelClass}>EMAIL <span style={{color: '#ae1fe3'}}>*</span></label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} style={{borderColor: errors.email ? '#ff4444' : undefined}} />
                  {errors.email && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.email}</div>}
                </div>
              </div>
            </div>

            <div className="border border-white/[0.06] p-8 relative">
              <div className="absolute -top-3 left-6 bg-[#050505] px-3">
                <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// SHIPPING ADDRESS</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>STREET ADDRESS <span style={{color: '#ae1fe3'}}>*</span></label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St" className={inputClass} style={{borderColor: errors.address ? '#ff4444' : undefined}} />
                  {errors.address && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.address}</div>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>CITY <span style={{color: '#ae1fe3'}}>*</span></label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass} style={{borderColor: errors.city ? '#ff4444' : undefined}} />
                    {errors.city && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.city}</div>}
                  </div>
                  <div>
                    <label className={labelClass}>STATE <span style={{color: '#ae1fe3'}}>*</span></label>
                    <input name="state" value={form.state} onChange={handleChange} placeholder="TX" className={inputClass} style={{borderColor: errors.state ? '#ff4444' : undefined}} />
                    {errors.state && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.state}</div>}
                  </div>
                  <div>
                    <label className={labelClass}>ZIP <span style={{color: '#ae1fe3'}}>*</span></label>
                    <input name="zip" value={form.zip} onChange={handleChange} placeholder="12345" className={inputClass} style={{borderColor: errors.zip ? '#ff4444' : undefined}} />
                    {errors.zip && <div className="font-mono-custom text-[9px] text-red-400 mt-1">{errors.zip}</div>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>COUNTRY <span style={{color: '#ae1fe3'}}>*</span></label>
                  <select name="country" value={form.country} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="MX">Mexico</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border border-white/[0.06] p-8 relative">
              <div className="absolute -top-3 left-6 bg-[#050505] px-3">
                <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// DISCOUNT CODE</span>
              </div>
              <div className="flex gap-3">
                <input
                  value={discountCode}
                  onChange={e => { setDiscountCode(e.target.value); setDiscountError(""); }}
                  placeholder="Enter code"
                  className={`${inputClass} flex-1`}
                  style={{borderColor: discountApplied ? '#22c55e' : discountError ? '#ff4444' : undefined}}
                />
                <button
                  onClick={applyDiscount}
                  disabled={discountLoading}
                  className="font-black px-6 font-mono-custom text-[10px] tracking-widest transition-all duration-200"
                  style={{background: '#ae1fe3', color: '#fff', opacity: discountLoading ? 0.5 : 1}}
                  onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}
                >
                  {discountLoading ? '...' : 'APPLY'}
                </button>
              </div>
              {discountApplied && (
                <div className="font-mono-custom text-[9px] text-green-400 mt-2 tracking-widest">
                  ✓ {discountApplied.percent}% DISCOUNT APPLIED {discountApplied.code ? `(${discountApplied.code})` : ''}
                </div>
              )}
              {discountError && <div className="font-mono-custom text-[9px] text-red-400 mt-2 tracking-widest">{discountError}</div>}
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
              style={{background: '#ae1fe3', color: '#fff'}}
              onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}
            >
              CONTINUE TO PAYMENT →
            </button>
          </div>

          <div className="border border-white/[0.06] p-6 h-fit sticky top-28">
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe3'}}>// ORDER SUMMARY</div>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 relative shrink-0 bg-[#0a0a0a] border border-white/[0.05]">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-mono-custom text-[9px] font-black" style={{background: '#ae1fe3'}}>
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-xs tracking-wider truncate">{item.name}</div>
                    {item.teamName && <div className="font-mono-custom text-[9px] text-white/30">{item.teamName} Edition</div>}
                    {item.size && <div className="font-mono-custom text-[9px] text-white/30">Size: {item.size}</div>}
                    <div className="font-black text-sm mt-1" style={{color: '#ae1fe3'}}>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-4 space-y-2">
              <div className="flex justify-between font-mono-custom text-[10px] text-white/40">
                <span>SUBTOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between font-mono-custom text-[10px] text-green-400">
                  <span>DISCOUNT ({discountApplied.percent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-lg pt-2 border-t border-white/[0.06]">
                <span>TOTAL</span>
                <span style={{color: '#ae1fe3'}}>${finalTotal}</span>
              </div>
              <div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center pt-2">🔒 SECURED BY PAYPAL</div>
            </div>
          </div>

        </div>
      </div>

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
