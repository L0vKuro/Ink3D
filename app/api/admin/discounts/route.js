import { redis } from "../../../lib/ratelimit";

export async function GET() {
  try {
    const codes = await redis.get("ink3d_discounts");
    const archive = await redis.get("ink3d_discounts_archive");
    const affiliates = await redis.get("ink3d_affiliates") ?? [];

    // Include affiliate discount codes in the list
    const affiliateCodes = affiliates.map(a => ({
      code: a.discountCode,
      percent: a.discountPercent,
      affiliateId: a.id,
      affiliateName: a.name,
    }));

    return Response.json({
      codes: [...(codes ?? []), ...affiliateCodes],
      archive: archive ?? []
    });
  } catch {
    return Response.json({ codes: [], archive: [] });
  }
}

export async function POST(req) {
  const { code, percent } = await req.json();
  const existing = await redis.get("ink3d_discounts") ?? [];
  if (existing.find(d => d.code === code)) {
    return Response.json({ error: "Code already exists" }, { status: 400 });
  }
  const updated = [...existing, { code, percent }];
  await redis.set("ink3d_discounts", updated);
  return Response.json({ success: true, codes: updated });
}

export async function DELETE(req) {
  const { code } = await req.json();
  const existing = await redis.get("ink3d_discounts") ?? [];
  const removed = existing.find(d => d.code === code);
  const updated = existing.filter(d => d.code !== code);
  await redis.set("ink3d_discounts", updated);

  if (removed) {
    const archive = await redis.get("ink3d_discounts_archive") ?? [];
    const alreadyArchived = archive.find(d => d.code === removed.code);
    if (!alreadyArchived) {
      await redis.set("ink3d_discounts_archive", [...archive, { ...removed, deletedAt: new Date().toISOString() }]);
    }
  }

  return Response.json({ success: true, codes: updated });
}
