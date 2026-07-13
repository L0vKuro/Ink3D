import { Resend } from "resend";
import { ratelimit } from "../../../lib/ratelimit";
import { sanitize } from "../../../lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return Response.json({ error: "Too many requests" }, { status: 429 });

  const raw = await req.json();
  const customerEmail = sanitize(raw.customerEmail);
  const customerName = sanitize(raw.customerName);
  const trackingLink = sanitize(raw.trackingLink);
  const orderId = sanitize(raw.orderId);

  await resend.emails.send({
    from: "INK3D Studio <orders@ink3d.lol>",
    to: customerEmail,
    subject: `YOUR ORDER IS ON THE WAY — ${orderId}`,
    html: `
      <div style="background:#050505;padding:40px;font-family:monospace;color:#fff;max-width:600px;">
        <div style="color:#ae1fe3;font-size:11px;letter-spacing:4px;margin-bottom:8px;">SYS://TRACKING_LOADED</div>
        <h1 style="color:#fff;font-size:32px;margin:0 0 32px 0;letter-spacing:-1px;">YOUR ORDER<br/>IS ON THE WAY</h1>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// ORDER DETAILS</div>
          <div style="margin-bottom:6px;"><strong>Name:</strong> ${customerName}</div>
          <div style="margin-bottom:6px; color:#ae1fe3;"><strong>Order ID:</strong> ${orderId}</div>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// TRACKING</div>
          <a href="${trackingLink}" style="color:#ae1fe3;font-size:14px;font-weight:900;letter-spacing:2px;">TRACK YOUR ORDER →</a>
          <div style="margin-top:8px;font-size:9px;color:#ffffff40;">${trackingLink}</div>
        </div>
        <div style="margin-top:32px;font-size:9px;color:#ffffff20;letter-spacing:3px;text-align:center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
