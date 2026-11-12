import Image from "next/image";
import Link from "next/link";

// A creator/team can have ONE social:   social: { label, icon, href }
// or MANY:                              socials: [ { label, icon, href }, { label, icon, href } ]
export function getSocials(entity) {
  if (Array.isArray(entity.socials) && entity.socials.length > 0) return entity.socials;
  if (entity.social) return [entity.social];
  return [];
}

export default function SocialLinks({ entity, color = "#ae1fe3" }) {
  const socials = getSocials(entity);
  if (socials.length === 0) return null;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socials.map((s, i) => (
        <Link
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-3 py-2 transition-all duration-200 hover:brightness-125"
          style={{ border: `1px solid ${color}55`, color: color + "dd", background: color + "0d" }}
        >
          {s.icon ? (
            <Image src={s.icon} alt={s.label} width={18} height={18} className="object-contain" />
          ) : null}
          <span className="font-mono-custom text-[10px] tracking-widest">{s.label}</span>
          <span className="text-[10px]">↗</span>
        </Link>
      ))}
    </div>
  );
}
