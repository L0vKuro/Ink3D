import { ratelimit } from "../../../lib/ratelimit";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(`adminverify_${ip}`);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return Response.json({ success: true });
  }
  return Response.json({ error: "Invalid password" }, { status: 401 });
}
