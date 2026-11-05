import { redis } from "../../lib/ratelimit";

export async function GET() {
  try {
    await redis.ping();
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false }, { status: 503 });
  }
}
