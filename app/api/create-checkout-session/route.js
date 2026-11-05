import Stripe from "stripe";
import { redis, ratelimit } from "../../lib/ratelimit";
import { computeOrder } from "../../lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(`checkout_${ip}`);
    if (!success) {
      return Response.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    const { items, checkoutData, referralCode } = await req.json();

    if (!checkoutData || !checkoutData.email) {
      return Response.json({ error: "Missing checkout details." }, { status: 400 });
    }

    const order = await computeOrder(items, checkoutData.discountCode);
    if (!order.ok) {
      return Response.json({ error: order.error }, { status: 400 });
    }

    const shippingFee = order.shippingC / 100;
    const discountAmount = order.discountC / 100;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.teamName ? `${item.name} — ${item.teamName} Edition` : item.name,
        },
        unit_amount: Math.round(parseFloat(String(item.price).replace("$", "")) * 100),
      },
      quantity: item.qty,
    }));

    if (shippingFee > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: order.shippingC,
        },
        quantity: 1,
      });
    }

    let discounts;
    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: order.discountC,
        currency: "usd",
        duration: "once",
        name: order.code ? `Code: ${order.code}` : "Discount",
      });
      discounts = [{ coupon: coupon.id }];
    }

    const origin = req.headers.get("origin") || "https://ink3dshop.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      discounts,
      customer_email: checkoutData.email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/payment`,
    });

    // Saved with the SERVER's numbers so the order email and admin panel
    // always show what was actually charged.
    const trusted = {
      ...checkoutData,
      discountCode: order.code,
      discountAmount: discountAmount.toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      finalTotal: (order.totalC / 100).toFixed(2),
    };
    try {
      await redis.set(`ink3d_pending_${session.id}`, { items, checkoutData: trusted, referralCode }, { ex: 60 * 60 * 24 });
    } catch (err) {
      console.error("Pending order save error:", err);
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return Response.json({ error: "Could not start payment." }, { status: 500 });
  }
}
