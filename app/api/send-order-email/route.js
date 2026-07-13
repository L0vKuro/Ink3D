import { Resend } from "resend";
import { ratelimit } from "../../lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const { customerName, customerEmail, items, total, orderId } = await req.json();
  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff; font-family: monospace;">${item.name}${item.teamName ? ` — ${item.teamName} Edition` : ''}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff; font-family: monospace; text-align: center;">${item.qty}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #ae1fe3; font-family: monospace; text-align: right;">${item.price}</td>
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
          <div style="color: #ae1fe3;"><strong>Order ID:</strong> ${orderId}</div>
        </div>
        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <div style="font-size: 9px; color: #ae1fe366; letter-spacing: 4px; margin-bottom: 16px;">// ITEMS</div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">PRODUCT</th>
                <th style="text-align: center; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">QTY</th>
                <th style="text-align: right; color: #ae1fe3; font-size: 9px; letter-spacing: 3px; padding-bottom: 8px;">PRICE</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </div>
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
