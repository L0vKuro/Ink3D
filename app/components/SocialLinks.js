import Image from "next/image";
import Link from "next/link";

// A creator/team can have ONE social:   social: { label, icon, href }
// or MANY:                              socials: [ { label, href }, { label, href } ]
// Icons for X, Instagram, TikTok, YouTube and Twitch are drawn automatically from
// the `label`. `icon` (a picture file) is only used for any other label.
export function getSocials(entity) {
  if (Array.isArray(entity.socials) && entity.socials.length > 0) return entity.socials;
  if (entity.social) return [entity.social];
  return [];
}

function kindOf(label) {
  const l = String(label || "").toLowerCase().trim();
  if (l === "x" || l === "twitter") return "x";
  if (l === "instagram" || l === "insta" || l === "ig") return "instagram";
  if (l === "tiktok") return "tiktok";
  if (l === "youtube" || l === "yt") return "youtube";
  if (l === "twitch") return "twitch";
  return null;
}

function Icon({ kind }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true };
  if (kind === "x")
    return (
      <svg {...common} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (kind === "instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (kind === "tiktok")
    return (
      <svg {...common} fill="currentColor">
        <path d="M16.5 3c.3 2.2 1.7 3.9 4 4.2v3.1c-1.5 0-2.9-.5-4-1.3v6.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 1 0 1.7 2.4V3h3.1z" />
      </svg>
    );
  if (kind === "youtube")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    );
  if (kind === "twitch")
    return (
      <svg {...common} fill="currentColor">
        <path d="M4 3h17v11.5l-4.5 4.5H12l-3 3v-3H4V3zm2 2v12h4v2.2L12.2 17H16l3-3V5H6zm4.5 3h1.8v5h-1.8V8zm4.2 0h1.8v5h-1.8V8z" />
      </svg>
    );
  return null;
}

export default function SocialLinks({ entity, color = "#ae1fe3" }) {
  const socials = getSocials(entity);
  if (socials.length === 0) return null;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socials.map((s, i) => {
        const kind = kindOf(s.label);
        return (
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
            {kind ? (
              <Icon kind={kind} />
            ) : s.icon ? (
              <Image src={s.icon} alt={s.label} width={18} height={18} className="object-contain" />
            ) : null}
            <span className="font-mono-custom text-[10px] tracking-widest">{s.label}</span>
            <span className="text-[10px]">↗</span>
          </Link>
        );
      })}
    </div>
  );
}
