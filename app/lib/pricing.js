import { redis } from "./ratelimit";
import { validateItems } from "./prices";

const cents = (s) => Math.round(parseFloat(String(s).replace("$", "")) * 100);

// The server works out the whole order itself. Nothing the phone or browser
// says about discounts, shipping or totals is trusted.
export async function computeOrder(items, discountCode) {
  const check = validateItems(items);
  if (!check.ok) return { ok: false, error: check.error };

  let subtotalC = 0;
  for (const item of items) subtotalC += cents(item.price) * Number(item.qty);

  let percent = 0;
  let appliedCode = null;
  const code = String(discountCode || "").trim().toUpperCase();
  if (code) {
    try {
      const manual = (await redis.get("ink3d_discounts")) ?? [];
      const affiliates = (await redis.get("ink3d_affiliates")) ?? [];
      const all = [
        ...manual.map((d) => ({ code: d.code, percent: d.percent })),
        ...affiliates.map((a) => ({ code: a.discountCode, percent: a.discountPercent })),
      ];
      const found = all.find((d) => d.code && String(d.code).toUpperCase() === code);
      if (found) {
        percent = Math.min(100, Math.max(0, Number(found.percent) || 0));
        appliedCode = found.code;
      }
    } catch (err) {
      console.error("Discount lookup error:", err);
    }
  }

  const discountC = Math.round((subtotalC * percent) / 100);
  // same rule as the checkout page: $8 shipping under $50
  const hasShippable = items.some((i) => !i.size);
  const shippingC = hasShippable && subtotalC < 5000 ? 800 : 0;
  const totalC = subtotalC - discountC + shippingC;

  return { ok: true, subtotalC, discountC, shippingC, totalC, percent, code: appliedCode };
}
