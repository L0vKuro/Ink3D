import { redis } from "../../../lib/ratelimit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();
  const affiliates = await redis.get("ink3d_affiliates") ?? [];
  const affiliate = affiliates.find(a => a.email === email);

  if (!affiliate) {
    return Response.json({ success: true }); // don't reveal if email exists
  }

  const token = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const expiry = Date.now() + 1000 * 60 * 30; // 30 minutes

  await redis.set(`ink3d_reset_${token}`, { affiliateId: affiliate.id, expiry });

  await resend.emails.send({
    from: "INK3D Studio <orders@ink3d.lol>",
    to: email,
    subject: "INK3D — PASSWORD RESET REQUEST",
    html: `
      <div style="background:#050505;padding:40px;font-family:monospace;color:#fff;max-width:600px;">
        <div style="color:#ae1fe3;font-size:11px;letter-spacing:4px;margin-bottom:8px;">SYS://PASSWORD_RESET</div>
        <h1 style="color:#fff;font-size:32px;margin:0 0 32px 0;letter-spacing:-1px;">RESET YOUR PASSWORD</h1>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// INSTRUCTIONS</div>
          <p style="color:#fff;margin:0 0 8px 0;">Click the button below to reset your password. This link expires in 30 minutes.</p>
          <p style="color:#ffffff40;font-size:11px;margin:0;">If you did not request this, ignore this email.</p>
        </div>
        <a href="https://ink3d.lol/dashboard/reset?token=${token}" style="display:block;background:#ae1fe3;color:#fff;text-align:center;padding:16px;font-weight:900;font-size:12px;letter-spacing:3px;text-decoration:none;margin-bottom:24px;">
          RESET PASSWORD →
        </a>
        <div style="font-size:9px;color:#ffffff20;letter-spacing:3px;text-align:center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
