import Stripe from "stripe";
import { redis } from "../../../lib/ratelimit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      try {
        const pending = await redis.get(`ink3d_pending_${session.id}`);
        if (pending) {
          const { items, checkoutData, referralCode } = pending;
          await fetch("https://ink3dshop.com/api/send-order-email", {
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
              orderId: session.id,
              referralCode,
            }),
          });
          await redis.del(`ink3d_pending_${session.id}`);
        } else {
          console.error("Webhook: no pending data found for session", session.id);
        }
      } catch (err) {
        console.error("Webhook order finalize error:", err);
        return Response.json({ error: "Processing failed" }, { status: 500 });
      }
    }
  }

  return Response.json({ received: true });
}
