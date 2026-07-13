import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const { fullName, email, teamName, reason, twitter, tiktok, instagram, youtube, twitch, discord, logo, logoName } = await req.json();
  const socials = [
    twitter && `<div style="margin-bottom:6px;"><strong>Twitter/X:</strong> <a href="${twitter}" style="color:#ae1fe3;">${twitter}</a></div>`,
    tiktok && `<div style="margin-bottom:6px;"><strong>TikTok:</strong> <a href="${tiktok}" style="color:#ae1fe3;">${tiktok}</a></div>`,
    instagram && `<div style="margin-bottom:6px;"><strong>Instagram:</strong> <a href="${instagram}" style="color:#ae1fe3;">${instagram}</a></div>`,
    youtube && `<div style="margin-bottom:6px;"><strong>YouTube:</strong> <a href="${youtube}" style="color:#ae1fe3;">${youtube}</a></div>`,
    twitch && `<div style="margin-bottom:6px;"><strong>Twitch:</strong> <a href="${twitch}" style="color:#ae1fe3;">${twitch}</a></div>`,
    discord && `<div style="margin-bottom:6px;"><strong>Discord:</strong> <a href="${discord}" style="color:#ae1fe3;">${discord}</a></div>`,
  ].filter(Boolean).join('');

  const logoHtml = logo ? `
    <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
      <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// LOGO</div>
      <img src="${logo}" alt="Logo" style="max-width:200px;max-height:200px;object-fit:contain;" />
      <div style="font-size:9px;color:#ffffff40;margin-top:8px;">${logoName}</div>
    </div>
  ` : '';

  await resend.emails.send({
    from: "INK3D Studio <apply@ink3d.lol>",
    to: ["rmsm97@yahoo.com", "dalmazank7@gmail.com"],
    subject: `NEW APPLICATION — ${fullName} — ${teamName}`,
    html: `
      <div style="background:#050505;padding:40px;font-family:monospace;color:#fff;max-width:600px;">
        <div style="color:#ae1fe3;font-size:11px;letter-spacing:4px;margin-bottom:8px;">SYS://APPLICATION_RECEIVED</div>
        <h1 style="color:#fff;font-size:32px;margin:0 0 32px 0;letter-spacing:-1px;">NEW APPLICATION</h1>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// APPLICANT</div>
          <div style="margin-bottom:6px;"><strong>Name:</strong> ${fullName}</div>
          <div style="margin-bottom:6px;"><strong>Email:</strong> ${email}</div>
          <div style="margin-bottom:6px;"><strong>Team/Org:</strong> ${teamName}</div>
        </div>
        ${logoHtml}
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// WHY INK3D</div>
          <div style="color:#fff;line-height:1.8;white-space:pre-wrap;">${reason}</div>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:24px;margin-bottom:24px;">
          <div style="font-size:9px;color:#ae1fe366;letter-spacing:4px;margin-bottom:16px;">// SOCIALS</div>
          ${socials}
        </div>
        <div style="margin-top:32px;font-size:9px;color:#ffffff20;letter-spacing:3px;text-align:center;">
          INK3D STUDIO — MILFORD, NH — EST. 2024
        </div>
      </div>
    `,
  });
  return Response.json({ success: true });
}
