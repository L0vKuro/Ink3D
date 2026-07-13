"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CartSidebar() {
  const { items, removeItem, updateQty, total, count, open, setOpen, clearCart } = useCart();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  async function sendOrderEmail(details) {
    try {
      const shipping = details.purchase_units?.[0]?.shipping;
      const shippingAddress = shipping?.address
        ? `${shipping.address.address_line_1}${shipping.address.address_line_2 ? ', ' + shipping.address.address_line_2 : ''}, ${shipping.address.admin_area_2}, ${shipping.address.admin_area_1} ${shipping.address.postal_code}, ${shipping.address.country_code}`
        : 'Not provided';

      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
          customerEmail: details.payer.email_address,
          shippingAddress,
          shippingName: shipping?.name?.full_name ?? `${details.payer.name.given_name} ${details.payer.name.surname}`,
          items,
          total: total.toFixed(2),
          orderId: details.id,
        }),
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  function handleClose() {
    setOpen(false);
    setOrderConfirmed(false);
    setCustomerName("");
    clearCart();
  }

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          onClick={orderConfirmed ? undefined : () => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-[100] bg-[#080808] border-l border-white/[0.06] flex flex-col transition-transform duration-300"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {orderConfirmed ? (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32" style={{background: 'linear-gradient(to bottom, #ae1fe3, transparent)'}} />
            <div className="relative z-10">
              <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>SYS://ORDER_CONFIRMED</div>
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-4xl font-black tracking-tight leading-none mb-4">
                THANK<br />
                <span style={{color: '#ae1fe3'}}>YOU</span>
              </h2>
              <p className="font-black text-lg tracking-wider mb-2">{customerName}</p>
              <div className="w-16 h-px mx-auto mb-6" style={{background: '#ae1fe344'}} />
              <p className="font-mono-custom text-white/40 text-sm leading-relaxed mb-3">
                // Your order is confirmed and being processed.
              </p>
              <p className="font-mono-custom text-white/30 text-sm leading-relaxed mb-10">
                // You will receive a <span style={{color: '#ae1fe3'}}>tracking link</span> via email within <span style={{color: '#ae1fe3'}}>3-5 business days</span>.
              </p>
              <button
                onClick={handleClose}
                className="font-black px-10 py-4 text-xs tracking-[0.25em] font-mono-custom transition-all duration-200 glow-btn"
                style={{background: '#ae1fe3', color: '#fff'}}
                onMouseEnter={e => { e.currentTarget.style.background='#c040ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#ae1fe3'; }}
              >
                [ CONTINUE SHOPPING ]
              </button>
              <div className="mt-6 font-mono-custom text-[9px] text-white/20 tracking-widest">
                INK3D STUDIO — EST. 2024
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06]">
              <div>
                <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-1" style={{ color: '#ae1fe366' }}>SYS://CART_LOADED</div>
                <div className="font-black text-lg tracking-wider">CART <span style={{ color: '#ae1fe3' }}>({count})</span></div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono-custom text-[10px] text-white/30 hover:text-white transition-colors tracking-widest"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="font-mono-custom text-[9px] text-white/20 tracking-widest mb-3">// CART_EMPTY</div>
                  <p className="text-white/20 text-sm font-mono-custom">No items yet. Start shopping.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 border border-white/[0.05] p-4 bg-[#0a0a0a]">
                    <div className="w-20 h-20 relative shrink-0 bg-[#111]">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-sm tracking-wider mb-1 truncate">{item.name}</div>
                      {item.teamName && (
                        <div className="font-mono-custom text-[9px] text-white/30 mb-2">{item.teamName} Edition</div>
                      )}
                      <div className="font-black text-sm mb-3" style={{ color: '#ae1fe3' }}>{item.price}</div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors font-mono-custom text-xs flex items-center justify-center"
                        >−</button>
                        <span className="font-mono-custom text-sm w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors font-mono-custom text-xs flex items-center justify-center"
                        >+</button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto font-mono-custom text-[9px] text-white/20 hover:text-red-400 transition-colors tracking-widest"
                        >[ REMOVE ]</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/[0.06]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono-custom text-[10px] text-white/40 tracking-widest">SUBTOTAL</span>
                  <span className="font-black text-xl">${total.toFixed(2)}</span>
                </div>
                <div className="mb-3">
                  <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButtons
                      style={{ layout: "vertical", color: "black", label: "pay", height: 45 }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              value: total.toFixed(2),
                              breakdown: {
                                item_total: { currency_code: "USD", value: total.toFixed(2) }
                              },
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
                          setCustomerName(details.payer.name.given_name);
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
                <div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center">FREE SHIPPING ON ORDERS OVER $50</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
