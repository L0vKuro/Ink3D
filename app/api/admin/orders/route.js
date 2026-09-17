import { redis } from "../../../lib/ratelimit";

export async function GET() {
  try {
    const orders = await redis.get("ink3d_orders");
    return Response.json({ orders: orders ?? [] });
  } catch {
    return Response.json({ orders: [] });
  }
}

export async function PATCH(req) {
  const { id, fulfilled } = await req.json();
  const existing = await redis.get("ink3d_orders") ?? [];
  const updated = existing.map(o => o.id === id ? { ...o, fulfilled } : o);
  await redis.set("ink3d_orders", updated);
  return Response.json({ success: true });
}
