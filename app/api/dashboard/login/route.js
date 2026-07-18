import { redis } from "../../../lib/ratelimit";

export async function POST(req) {
  const { email, password } = await req.json();
  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const affiliate = affiliates.find(a => a.email === email && a.password === password);
  if (!affiliate) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const { password: _, ...safeAffiliate } = affiliate;
  return Response.json({ success: true, affiliate: safeAffiliate });
}
