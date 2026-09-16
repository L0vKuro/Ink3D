import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, checkoutData } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: "Cart is empty." }, { status: 400 });
    }

    const shippingFee = parseFloat(checkoutData.shippingFee) || 0;
    const discountAmount = parseFloat(checkoutData.discountAmount) || 0;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.teamName ? `${item.name} — ${item.teamName} Edition` : item.name,
        },
        unit_amount: Math.round(parseFloat(item.price.replace("$", "")) * 100),
      },
      quantity: item.qty,
    }));

    if (shippingFee > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shippingFee * 100),
        },
        quantity: 1,
      });
    }

    let discounts;
    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discountAmount * 100),
        currency: "usd",
        duration: "once",
        name: checkoutData.discountCode ? `Code: ${checkoutData.discountCode}` : "Discount",
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

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return Response.json({ error: "Could not start payment." }, { status: 500 });
  }
}
