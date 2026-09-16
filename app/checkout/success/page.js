"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [customerName, setCustomerName] = useState("");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    verifyAndFinish();
  }, []);

  async function verifyAndFinish() {
    const sessionId = searchParams.get("session_id");
    const raw = sessionStorage.getItem("ink3d_checkout");
    if (!sessionId || !raw) {
      setStatus("error");
      return;
    }
    const checkoutData = JSON.parse(raw);
    try {
      const res = await fetch(`/api/verify-checkout-session?session_id=${sessionId}`);
      const data = await res.json();
      if (!data.paid) {
        setStatus("error");
        return;
      }
      await sendOrderEmail(checkoutData, sessionId);
      setCustomerName(checkoutData.fullName);
      clearCart();
      sessionStorage.removeItem("ink3d_checkout");
      setStatus("success");
    } catch (err) {
      console.error("Order finalize error:", err);
      setStatus("error");
    }
  }

  async function sendOrderEmail(checkoutData, orderId) {
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
          total: checkoutData.finalTotal,
          orderId,
          referralCode,
        }),
      });
      if (ref) localStorage.removeItem("ink3d_ref");
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  if (status === "verifying") {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <Nav active="HOME" />
        <div className="font-mono-custom text-[10px] text-white/40 tracking-widest">// CONFIRMING PAYMENT...</div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <Nav active="HOME" />
        <div className="text-center max-w-lg">
          <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6 text-red-400">SYS://PAYMENT_NOT_CONFIRMED</div>
          <h1 className="text-3xl font-black tracking-tight mb-4">SOMETHING WENT WRONG</h1>
          <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-10">
            // We couldn't confirm this payment. If you were charged, contact us — otherwise, your cart is still saved.
          </p>
          <Link href="/checkout/payment">
            <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom glow-btn" style={{background: '#ae1fe3', color: '#fff'}}>
              [ BACK TO PAYMENT ]
            </button>
          </Link>
        </div>
      </main>
    );
  }

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
            <button className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom glow-btn" style={{background: '#ae1fe3', color: '#fff'}}>
              [ CONTINUE SHOPPING ]
            </button>
          </Link>
          <div className="mt-6 font-mono-custom text-[9px] text-white/20 tracking-widest">
            INK3D STUDIO — EST. 2024
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
