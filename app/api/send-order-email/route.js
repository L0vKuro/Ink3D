import { Resend } from "resend";
import { ratelimit } from "../../lib/ratelimit";
import { sanitize } from "../../lib/sanitize";
import { redis } from "../../lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const raw = await req.json();
  const customerName = sanitize(raw.customerName);
  const customerEmail = sanitize(raw.customerEmail);
  const shippingAddress = sanitize(raw.shippingAddress);
  const shippingName = sanitize(raw.shippingName);
  const discountCode = sanitize(raw.discountCode);
  const discountAmount = sanitize(raw.discountAmount);
  const total = sanitize(raw.total);
  const orderId = sanitize(raw.orderId);
  const referralCode = sanitize(raw.referralCode);
  const items = raw.items;

  // AFFILIATE ATTRIBUTION
  if (referralCode) {
    try {
      const affiliates = await redis.get("ink3d_affiliates") ?? [];
      const affIndex = affiliates.findIndex(a => a.referralCode === referralCode);
      if (affIndex !== -1) {
        const aff = affiliates[affIndex];
        const saleAmount = parseFloat(total);
        const earnings = parseFloat((saleAmount * aff.commission / 100).toFixed(2));
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;

        const orderEntry = {
          orderId,
          date: now.toISOString(),
          product: items.map(i => i.name).join(", "),
          saleAmount,
          earnings,
          customerName,
        };

        const currentMonth = aff.stats?.currentMonth;
        const isNewMonth = currentMonth !== thisMonth;

        affiliates[affIndex] = {
          ...aff,
          stats: {
            ...aff.stats,
            currentMonth: thisMonth,
            lifetimeOrders: (aff.stats?.lifetimeOrders ?? 0) + 1,
            lifetimeSales: parseFloat(((aff.stats?.lifetimeSales ?? 0) + saleAmount).toFixed(2)),
            lifetimeEarnings: parseFloat(((aff.stats?.lifetimeEarnings ?? 0) + earnings).toFixed(2)),
            monthlyOrders: isNewMonth ? 1 : (aff.stats?.monthlyOrders ?? 0) + 1,
            monthlySales: isNewMonth ? saleAmount : parseFloat(((aff.stats?.monthlySales ?? 0) + saleAmount).toFixed(2)),
            monthlyEarnings: isNewMonth ? earnings : parseFloat(((aff.stats?.monthlyEarnings ?? 0) + earnings).toFixed(2)),
            orders: [...(aff.stats?.orders ?? []), orderEntry],
          },
        };

        await redis.set("ink3d_affiliates", affiliates);
      }
    } catch (err) {
      console.error("Affiliate attribution error:", err);
    }
  }

  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff; font-family: monospace;">${sanitize(item.name)}${item.teamName ? ` — ${sanitize(item.teamName)} Edition` : ''}${item.size ? ` (${sanitize(item.size)})` : ''}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff; font-family: monospace; text-align: center;">${item.qty}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #ae1fe3; font-family: monospace; text-align: right;">${sanitize(item.price)}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff; font-family: monospace; text-align: right;">$${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}</td>
    </tr>
  `).join('');

  await resend.emails.send({
    from: "INK3D Studio <orders@ink3d.lol>",
    to: ["rmsm97@yahoo.com", "dalmazank7@gmail.com"],
    subject: `NEW ORDER — ${orderId} — $${total}`,
    html: `
      <div style="background: #050505; padding: 40px; font-family: monospace; color: #fff; max-width: 600px;">
        <div style="color: #ae1fe3; font-size: 11px; letter-spacing: 4px; margin-bottom: 8px;">SYS://ORDER_RECEIVED</div>
        <h1 style="color: #fff; font-size: 32px; margin: 0 0 32px 0; letter-spacing: -1px;">NEW ORDER</h1>

        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// CUSTOMER</div>
          <div style="color: #fff; margin-bottom: 4px;"><strong>Name:</strong> ${customerName}</div>
          <div style="color: #fff; margin-bottom: 4px;"><strong>Email:</strong> ${customerEmail}</div>
          <div style="color: #ae1fe3; margin-bottom: 4px;"><strong>Order ID:</strong> ${orderId}</div>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// SHIPPING ADDRESS</div>
          <div style="color: #fff; margin-bottom: 4px;"><strong>Ship To:</strong> ${shippingName}</div>
          <div style="color: #fff;">${shippingAddress}</div>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// ITEMS</div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">PRODUCT</th>
                <th style="text-align: center; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">QTY</th>
                <th style="text-align: right; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">UNIT</th>
                <th style="text-align: right; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </div>

        ${discountCode ? `
        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// DISCOUNT</div>
          <div style="color: #22c55e; margin-bottom: 4px;"><strong>Code:</strong> ${discountCode}</div>
          <div style="color: #22c55e;"><strong>Amount:</strong> -$${discountAmount}</div>
        </div>
        ` : ''}

        ${referralCode ? `
        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// REFERRAL</div>
          <div style="color: #ae1fe3;"><strong>Referred by:</strong> ${referralCode}</div>
        </div>
        ` : ''}

        <div style="background: #ae1fe3; padding: 20px 24px; display: flex; justify-content: space-between;">
          <span style="font-size: 12px; letter-spacing: 3px; color: #fff;">TOTAL</span>
          <span style="font-size: 20px; font-weight: 900; color: #fff;">$${total}</span>
        </div>

        <div style="margin-top: 32px; font-size: 9px; color: #ffffff20; letter-spacing: 3px; text-align: center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });
  return Response.json({ success: true });
}
