import Stripe from "stripe";
import { redis, ratelimit } from "../../lib/ratelimit";
import { computeOrder } from "../../lib/pricing";

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
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(`paymentintent_${ip}`);
    if (!success) {
      return Response.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    const stripe = getStripe();
    if (!stripe) {
      return Response.json({ error: "Mobile payments are not configured yet." }, { status: 503 });
    }

    const { items, checkoutData, referralCode } = await req.json();

    if (!checkoutData || !checkoutData.email || !checkoutData.fullName) {
      return Response.json({ error: "Missing checkout details." }, { status: 400 });
    }

    const order = await computeOrder(items, checkoutData.discountCode);
    if (!order.ok) {
      return Response.json({ error: order.error }, { status: 400 });
    }

    const amount = order.totalC;
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

    const trusted = {
      ...checkoutData,
      discountCode: order.code,
      discountAmount: (order.discountC / 100).toFixed(2),
      shippingFee: (order.shippingC / 100).toFixed(2),
      finalTotal: (amount / 100).toFixed(2),
    };
    await redis.set(
      `ink3d_pending_${paymentIntent.id}`,
      { items, checkoutData: trusted, referralCode },
      { ex: 60 * 60 * 24 }
    );

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      total: amount / 100,
    });
  } catch (err) {
    console.error("PaymentIntent error:", err);
    return Response.json({ error: "Could not start payment." }, { status: 500 });
  }
}
