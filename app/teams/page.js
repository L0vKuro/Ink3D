import Image from "next/image";
import Link from "next/link";

// EASY WAY (per team or creator): just add any of these lines
//   instagram: "https://instagram.com/...",
//   x: "https://x.com/...",
//   tiktok: "https://tiktok.com/@...",
//   discord: "https://discord.gg/...",
//   youtube: "https://youtube.com/...",
//   twitch: "https://twitch.tv/...",
// Only the ones that exist are shown, always in this order, with the right icon.
// The older  social: {...}  and  socials: [...]  formats still work too.

function kindOf(label) {
  const l = String(label || "").toLowerCase().trim();
  if (l === "x" || l === "twitter") return "x";
  if (l === "instagram" || l === "insta" || l === "ig") return "instagram";
  if (l === "tiktok") return "tiktok";
  if (l === "discord") return "discord";
  if (l === "youtube" || l === "yt") return "youtube";
  if (l === "twitch") return "twitch";
  return null;
}

const ORDER = ["instagram", "x", "tiktok", "discord", "youtube", "twitch"];
const NAMES = { instagram: "Instagram", x: "X", tiktok: "TikTok", discord: "Discord", youtube: "YouTube", twitch: "Twitch" };
const rank = (s) => {
  const k = kindOf(s.label);
  return k ? ORDER.indexOf(k) : 99;
};

export function getSocials(entity) {
  const base =
    Array.isArray(entity.socials) && entity.socials.length > 0
      ? entity.socials
      : entity.social
      ? [entity.social]
      : [];
  const list = base.filter((s) => s && s.href);
  ORDER.forEach((k) => {
    const url = entity[k];
    if (url && !list.some((s) => kindOf(s.label) === k)) list.push({ label: NAMES[k], href: url });
  });
  return list.sort((a, b) => rank(a) - rank(b));
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
  if (kind === "discord")
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
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
            ) : s.icon && s.icon.length > 1 ? (
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
