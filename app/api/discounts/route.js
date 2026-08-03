import { redis } from "../../lib/ratelimit";

// Public, read-only discount lookup for the storefront checkout page.
// Unlike /api/admin/discounts, this route is NOT behind admin auth (see
// middleware.js — only /api/admin/* is protected), so anonymous customers
// can validate a discount code or an affiliate ?ref= link at checkout.
// Only the fields the storefront needs are exposed (no emails/passwords).
export async function GET() {
  try {
    const manualCodes = await redis.get("ink3d_discounts") ?? [];
    const affiliates = await redis.get("ink3d_affiliates") ?? [];

    const affiliateCodes = affiliates.map(a => ({
      code: a.discountCode,
      percent: a.discountPercent,
      referralCode: a.referralCode,
    }));

    return Response.json({
      codes: [...manualCodes, ...affiliateCodes],
    });
  } catch (err) {
    console.error("Public discounts lookup error:", err);
    return Response.json({ codes: [] });
  }
}
