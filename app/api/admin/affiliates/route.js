import { redis } from "../../../lib/ratelimit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const affiliates = await redis.get("ink3d_affiliates");
    return Response.json({ affiliates: affiliates ?? [] });
  } catch {
    return Response.json({ affiliates: [] });
  }
}

export async function POST(req) {
  const { name, email, password, referralCode, discountCode, discountPercent, tier } = await req.json();

  const existing = await redis.get("ink3d_affiliates") ?? [];

  if (existing.find(a => a.email === email)) {
    return Response.json({ error: "Email already exists" }, { status: 400 });
  }
  if (existing.find(a => a.referralCode === referralCode.toUpperCase())) {
    return Response.json({ error: "Referral code already exists" }, { status: 400 });
  }
  if (existing.find(a => a.discountCode === discountCode.toUpperCase())) {
    return Response.json({ error: "Discount code already exists" }, { status: 400 });
  }

  const tierCommissions = { BRONZE: 10, SILVER: 13, GOLD: 16, DIAMOND: 20, ELITE: 25 };

  const newAffiliate = {
    id: `aff_${Date.now()}`,
    name,
    email,
    password,
    referralCode: referralCode.toUpperCase(),
    discountCode: discountCode.toUpperCase(),
    discountPercent: parseInt(discountPercent),
    tier: tier.toUpperCase(),
    commission: tierCommissions[tier.toUpperCase()] ?? 10,
    createdAt: new Date().toISOString(),
    stats: {
      lifetimeOrders: 0,
      lifetimeSales: 0,
      lifetimeEarnings: 0,
      monthlyOrders: 0,
      monthlySales: 0,
      monthlyEarnings: 0,
      orders: [],
    },
  };

  const updated = [...existing, newAffiliate];
  await redis.set("ink3d_affiliates", updated);

  await resend.emails.send({
    from: "INK3D Studio <orders@ink3d.lol>",
    to: email,
    subject: "WELCOME TO INK3D — YOUR DASHBOARD IS READY",
    html: `
      <div style="background:#050505;padding:40px;font-family:monospace;color:#fff;max-width:600px;">
        <div style="color:#ae1fe3;font-size:11px;letter-spacing:4px;margin-bottom:8px;">SYS://ACCESS_GRANTED</div>
        <h1 style="color:#fff;font-size:32px;margin:0 0 32px 0;letter-spacing:-1px;">WELCOME TO INK3D</h1>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// YOUR CREDENTIALS</div>
          <div style="margin-bottom:8px;"><strong>Email:</strong> ${email}</div>
          <div style="margin-bottom:8px;"><strong>Password:</strong> ${password}</div>
          <div style="margin-bottom:8px;"><strong>Tier:</strong> ${tier.toUpperCase()}</div>
          <div style="margin-bottom:8px;"><strong>Commission:</strong> ${newAffiliate.commission}%</div>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// YOUR LINKS & CODES</div>
          <div style="margin-bottom:8px;"><strong>Referral Link:</strong> <a href="https://ink3d.lol/?ref=${referralCode.toUpperCase()}" style="color:#ae1fe3;">ink3d.lol/?ref=${referralCode.toUpperCase()}</a></div>
          <div style="margin-bottom:8px;"><strong>Discount Code:</strong> <span style="color:#ae1fe3;">${discountCode.toUpperCase()}</span> (${discountPercent}% off)</div>
        </div>
        <a href="https://ink3d.lol/dashboard" style="display:block;background:#ae1fe3;color:#fff;text-align:center;padding:16px;font-weight:900;font-size:12px;letter-spacing:3px;text-decoration:none;margin-bottom:24px;">
          ACCESS YOUR DASHBOARD →
        </a>
        <div style="font-size:9px;color:#ffffff20;letter-spacing:3px;text-align:center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });

  return Response.json({ success: true, affiliate: newAffiliate });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const existing = await redis.get("ink3d_affiliates") ?? [];
  const updated = existing.filter(a => a.id !== id);
  await redis.set("ink3d_affiliates", updated);
  return Response.json({ success: true });
}

export async function PATCH(req) {
  const { id, password } = await req.json();
  const existing = await redis.get("ink3d_affiliates") ?? [];
  const affiliate = existing.find(a => a.id === id);
  if (!affiliate) return Response.json({ error: "Not found" }, { status: 404 });

  const updated = existing.map(a => a.id === id ? { ...a, password } : a);
  await redis.set("ink3d_affiliates", updated);

  await resend.emails.send({
    from: "INK3D Studio <orders@ink3d.lol>",
    to: affiliate.email,
    subject: "INK3D — YOUR PASSWORD HAS BEEN RESET",
    html: `
      <div style="background:#050505;padding:40px;font-family:monospace;color:#fff;max-width:600px;">
        <div style="color:#ae1fe3;font-size:11px;letter-spacing:4px;margin-bottom:8px;">SYS://PASSWORD_RESET</div>
        <h1 style="color:#fff;font-size:32px;margin:0 0 32px 0;">PASSWORD RESET</h1>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="margin-bottom:8px;"><strong>Email:</strong> ${affiliate.email}</div>
          <div style="margin-bottom:8px;"><strong>New Password:</strong> ${password}</div>
        </div>
        <a href="https://ink3d.lol/dashboard" style="display:block;background:#ae1fe3;color:#fff;text-align:center;padding:16px;font-weight:900;font-size:12px;letter-spacing:3px;text-decoration:none;">
          LOGIN TO DASHBOARD →
        </a>
        <div style="margin-top:32px;font-size:9px;color:#ffffff20;letter-spacing:3px;text-align:center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
