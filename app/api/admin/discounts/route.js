import { redis } from "../../../lib/ratelimit";

export async function GET() {
  try {
    const codes = await redis.get("ink3d_discounts");
    return Response.json({ codes: codes ?? [] });
  } catch {
    return Response.json({ codes: [] });
  }
}

export async function POST(req) {
  const { password, code, percent } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existing = await redis.get("ink3d_discounts") ?? [];
  if (existing.find(d => d.code === code)) {
    return Response.json({ error: "Code already exists" }, { status: 400 });
  }
  const updated = [...existing, { code, percent }];
  await redis.set("ink3d_discounts", updated);
  return Response.json({ success: true, codes: updated });
}

export async function DELETE(req) {
  const { password, code } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existing = await redis.get("ink3d_discounts") ?? [];
  const updated = existing.filter(d => d.code !== code);
  await redis.set("ink3d_discounts", updated);
  return Response.json({ success: true, codes: updated });
}
