import { redis } from "../../../lib/ratelimit";

export async function POST(req) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const resetData = await redis.get(`ink3d_reset_${token}`);
  if (!resetData) {
    return Response.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  if (Date.now() > resetData.expiry) {
    await redis.del(`ink3d_reset_${token}`);
    return Response.json({ error: "Token expired" }, { status: 400 });
  }

  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const updated = affiliates.map(a =>
    a.id === resetData.affiliateId ? { ...a, password } : a
  );
  await redis.set("ink3d_affiliates", updated);
  await redis.del(`ink3d_reset_${token}`);

  return Response.json({ success: true });
}
