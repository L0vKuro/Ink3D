import Stripe from "stripe";
import { redis } from "../../lib/ratelimit";

// TEST-mode key only. The mobile app can never charge a real card.
// Created lazily (inside the request) so the site builds even when the
// test key hasn't been added to Vercel yet.
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY_TEST;
  if (!key) return null;
  return new Stripe(key);
}

export async function POST(req) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return Response.json({ error: "Mobile payments are not configured yet." }, { status: 503 });
    }

    const { items, checkoutData, referralCode } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: "Cart is empty." }, { status: 400 });
    }

    const itemsTotal = items.reduce(
      (sum, item) => sum + parseFloat(String(item.price).replace("$", "")) * item.qty,
      0
    );
    const shippingFee = parseFloat(checkoutData.shippingFee) || 0;
    const discountAmount = parseFloat(checkoutData.discountAmount) || 0;
    const amount = Math.round((itemsTotal + shippingFee - discountAmount) * 100);

    if (!Number.isFinite(amount) || amount < 50) {
      return Response.json({ error: "Order total is too low." }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: checkoutData.email,
      metadata: { source: "mobile" },
    });

    // Saved so the webhook can finalize the order after payment succeeds.
    await redis.set(
      `ink3d_pending_${paymentIntent.id}`,
      {
        items,
        checkoutData: { ...checkoutData, finalTotal: (amount / 100).toFixed(2) },
        referralCode,
      },
      { ex: 60 * 60 * 24 }
    );

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("PaymentIntent error:", err);
    return Response.json({ error: "Could not start payment." }, { status: 500 });
  }
}
