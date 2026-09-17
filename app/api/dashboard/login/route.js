import { redis, ratelimit } from "../../../lib/ratelimit";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(`dashlogin_${ip}`);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  const { email, password } = await req.json();
  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const index = affiliates.findIndex(a => a.email === email);
  if (index === -1) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const affiliate = affiliates[index];
  // Stored passwords are either a bcrypt hash (starts with $2) or, for
  // accounts created before this was added, still plaintext. Handle both,
  // and silently upgrade a plaintext match to a hash so every account ends
  // up migrated the first time its owner logs in — no manual reset needed.
  const isHashed = typeof affiliate.password === "string" && affiliate.password.startsWith("$2");
  let valid = false;
  if (isHashed) {
    valid = await bcrypt.compare(password, affiliate.password);
  } else {
    valid = affiliate.password === password;
    if (valid) {
      const rehashed = await bcrypt.hash(password, 10);
      const updated = [...affiliates];
      updated[index] = { ...affiliate, password: rehashed };
      await redis.set("ink3d_affiliates", updated);
    }
  }
  if (!valid) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const { password: _, ...safeAffiliate } = affiliate;
  return Response.json({ success: true, affiliate: safeAffiliate });
}
