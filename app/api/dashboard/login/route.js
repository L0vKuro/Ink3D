import { redis, ratelimit } from "../../../lib/ratelimit";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(`dashlogin_${ip}`);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  const { email, password } = await req.json();
  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const affiliate = affiliates.find(a => a.email === email && a.password === password);
  if (!affiliate) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const { password: _, ...safeAffiliate } = affiliate;
  return Response.json({ success: true, affiliate: safeAffiliate });
}
