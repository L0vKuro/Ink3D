"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function Payment() {
  const router = useRouter();
  const { items, total } = useCart();
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("ink3d_checkout");
    if (!data) { router.push("/checkout"); return; }
    setCheckoutData(JSON.parse(data));
  }, []);

  if (!checkoutData) return null;

  const shippingFee = checkoutData.shippingFee ? parseFloat(checkoutData.shippingFee).toFixed(2) : "0.00";
  const finalTotal = checkoutData.finalTotal;

  async function handlePay() {
    setLoading(true);
    setPayError("");
    try {
      const ref = localStorage.getItem("ink3d_ref");
      const referralCode = ref ?? (checkoutData.discountCode ? `DISCOUNT:${checkoutData.discountCode}` : null);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, checkoutData, referralCode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPayError("Could not start payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setPayError("Could not start payment. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav active="HOME" />
      <div className="pt-28 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>// CHECKOUT</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-12">COMPLETE YOUR ORDER</h1>
        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          <div className="border border-white/[0.06] p-5 sm:p-8 relative h-fit">
            <div className="absolute -top-3 left-6 bg-[#050505] px-3">
              <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// SECURE PAYMENT</span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="font-mono-custom text-[9px] text-white/30 hover:text-white transition-colors tracking-widest mb-8 flex items-center gap-2"
            >
              ← BACK TO INFO
            </button>
            <div className="mb-6 p-4 border border-white/[0.05] bg-[#0a0a0a]">
              <div className="font-mono-custom text-[9px] text-white/30 tracking-widest mb-1">SHIPPING TO</div>
              <div className="font-black text-sm">{checkoutData.fullName}</div>
              <div className="font-mono-custom text-[10px] text-white/40">{checkoutData.address}, {checkoutData.city}, {checkoutData.state} {checkoutData.zip}</div>
              <div className="font-mono-custom text-[10px] text-white/40">{checkoutData.email}</div>
            </div>
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-5 font-black text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
              style={{background: '#ae1fe3', color: '#fff', opacity: loading ? 0.6 : 1}}
            >
              {loading ? 'REDIRECTING...' : '[ PAY WITH CARD ]'}
            </button>
            {payError && <div className="font-mono-custom text-[9px] text-red-400 mt-3 tracking-widest">{payError}</div>}
          </div>
          <div className="border border-white/[0.06] p-6 h-fit md:sticky md:top-28">
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
              {checkoutData.discountCode && (
                <div className="flex justify-between font-mono-custom text-[10px] text-green-400">
                  <span>DISCOUNT ({checkoutData.discountPercent}%)</span>
                  <span>-${checkoutData.discountAmount}</span>
                </div>
              )}
              {parseFloat(shippingFee) > 0 && (
                <div className="flex justify-between font-mono-custom text-[10px] text-white/40">
                  <span>SHIPPING</span>
                  <span>${shippingFee}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-lg pt-2 border-t border-white/[0.06]">
                <span>TOTAL</span>
                <span style={{color: '#ae1fe3'}}>${finalTotal}</span>
              </div>
              <div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center pt-2">🔒 SECURED BY STRIPE</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
