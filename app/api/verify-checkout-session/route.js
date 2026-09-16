import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) {
    return Response.json({ error: "Missing session_id" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return Response.json({ paid: session.payment_status === "paid" });
  } catch (err) {
    console.error("Verify session error:", err);
    return Response.json({ error: "Could not verify session." }, { status: 500 });
  }
}
