"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "../../components/Nav";
import { useCart } from "../../context/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Payment() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("ink3d_checkout");
    if (!data) { router.push("/checkout"); return; }
    setCheckoutData(JSON.parse(data));
  }, []);

  if (!checkoutData) return null;

  const itemTotal = total.toFixed(2);
  const discountAmount = checkoutData.discountAmount ? parseFloat(checkoutData.discountAmount).toFixed(2) : "0.00";
  const finalTotal = checkoutData.finalTotal;

  async function sendOrderEmail(details) {
    try {
      const ref = localStorage.getItem("ink3d_ref");

      let referralCode = ref ?? null;
      if (!referralCode && checkoutData.discountCode) {
        referralCode = `DISCOUNT:${checkoutData.discountCode}`;
      }

      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: checkoutData.fullName,
          customerEmail: checkoutData.email,
          shippingAddress: `${checkoutData.address}, ${checkoutData.city}, ${checkoutData.state} ${checkoutData.zip}, ${checkoutData.country}`,
          shippingName: checkoutData.fullName,
          discountCode: checkoutData.discountCode,
          discountAmount: checkoutData.discountAmount,
          items,
          total: finalTotal,
          orderId: details.id,
          referralCode,
        }),
      });
      if (ref) localStorage.removeItem("ink3d_ref");
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  if (orderConfirmed) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <Nav active="HOME" />
        <div className="text-center max-w-lg relative">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative z-10">
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>SYS://ORDER_CONFIRMED</div>
            <div className="text-7xl mb-6">✓</div>
            <h1 className="text-5xl font-black tracking-tight leading-none mb-4">
              THANK<br />
              <span style={{color: '#ae1fe3'}}>YOU</span>
            </h1>
            <p className="font-black text-xl tracking-wider mb-2">{customerName}</p>
            <div className="w-16 h-px mx-auto my-6" style={{background: '#ae1fe344'}} />
            <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-3">
              // Your order is confirmed and being processed.
            </p>
            <p className="font-mono-custom text-white/30 text-sm leading-relaxed mb-10">
              // You will receive a <span style={{color: '#ae1fe3'}}>tracking link</span> via email within{' '}
              <span style={{color: '#ae1fe3'}}>3-5 business days</span>.
            </p>
            <Link href="/">
              <button
                className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
                style={{background: '#ae1fe3', color: '#fff'}}
                onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}
              >
                [ CONTINUE SHOPPING ]
              </button>
            </Link>
            <div className="mt-6 font-mono-custom text-[9px] text-white/20 tracking-widest">
              INK3D STUDIO — EST. 2024
            </div>
          </div>
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

          <div className="border border-white/[0.06] p-8 relative h-fit">
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

            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, currency: "USD" }}>
              <PayPalButtons
                style={{ layout: "vertical", color: "black", label: "pay", height: 50 }}
                createOrder={(data, actions) => {
                  const breakdown = {
                    item_total: { currency_code: "USD", value: itemTotal },
                  };
                  if (parseFloat(discountAmount) > 0) {
                    breakdown.discount = { currency_code: "USD", value: discountAmount };
                  }
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: finalTotal,
                        breakdown,
                        currency_code: "USD",
                      },
                      items: items.map(item => ({
                        name: item.teamName ? `${item.name} — ${item.teamName} Edition` : item.name,
                        unit_amount: { currency_code: "USD", value: parseFloat(item.price.replace('$','')).toFixed(2) },
                        quantity: String(item.qty),
                      })),
                    }],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(async (details) => {
                    await sendOrderEmail(details);
                    setCustomerName(checkoutData.fullName);
                    clearCart();
                    sessionStorage.removeItem("ink3d_checkout");
                    setOrderConfirmed(true);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("Payment failed. Please try again.");
                }}
              />
            </PayPalScriptProvider>
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
              {checkoutData.discountCode && (
                <div className="flex justify-between font-mono-custom text-[10px] text-green-400">
                  <span>DISCOUNT ({checkoutData.discountPercent}%)</span>
                  <span>-${checkoutData.discountAmount}</span>
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
