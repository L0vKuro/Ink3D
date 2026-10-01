import { redis } from "../../../lib/ratelimit";

export async function POST(req) {
  const { affiliateId, saleAmount, note } = await req.json();
  const amount = parseFloat(saleAmount);
  if (!affiliateId || isNaN(amount) || amount <= 0) {
    return Response.json({ error: "Invalid affiliate or amount" }, { status: 400 });
  }
  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const affIndex = affiliates.findIndex(a => a.id === affiliateId);
  if (affIndex === -1) {
    return Response.json({ error: "Affiliate not found" }, { status: 404 });
  }
  const aff = affiliates[affIndex];
  const earnings = parseFloat((amount * aff.commission / 100).toFixed(2));
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
  const isNewMonth = aff.stats?.currentMonth !== thisMonth;
  const orderEntry = {
    orderId: `manual_${Date.now()}`,
    date: now.toISOString(),
    product: note?.trim() || "Manual sale",
    saleAmount: amount,
    earnings,
    customerName: "",
    via: "manual",
  };
  affiliates[affIndex] = {
    ...aff,
    stats: {
      ...aff.stats,
      currentMonth: thisMonth,
      lifetimeOrders: (aff.stats?.lifetimeOrders ?? 0) + 1,
      lifetimeSales: parseFloat(((aff.stats?.lifetimeSales ?? 0) + amount).toFixed(2)),
      lifetimeEarnings: parseFloat(((aff.stats?.lifetimeEarnings ?? 0) + earnings).toFixed(2)),
      monthlyOrders: isNewMonth ? 1 : (aff.stats?.monthlyOrders ?? 0) + 1,
      monthlySales: isNewMonth ? amount : parseFloat(((aff.stats?.monthlySales ?? 0) + amount).toFixed(2)),
      monthlyEarnings: isNewMonth ? earnings : parseFloat(((aff.stats?.monthlyEarnings ?? 0) + earnings).toFixed(2)),
      orders: [...(aff.stats?.orders ?? []), orderEntry],
    },
  };
  await redis.set("ink3d_affiliates", affiliates);
  return Response.json({ success: true, affiliate: affiliates[affIndex] });
}
