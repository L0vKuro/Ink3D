import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  ["TWITTER", "https://x.com/ink3dStudio"],
  ["TIKTOK", "https://www.tiktok.com/@ink3d.studio"],
  ["DISCORD", "https://discordapp.com/invite/rv99duMaW6"],
];

const legalLinks = [
  ["COOKIE POLICY", "/cookie-policy"],
  ["TERMS", "/terms"],
  ["RETURNS", "/returns"],
  ["SHIPPING", "/shipping"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="px-6 md:px-12 py-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" /></Link>
          <span className="font-mono-custom text-[10px] text-white/15 tracking-widest">© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            {socialLinks.map(([name, href]) => (
              <Link key={name} href={href} className="font-mono-custom text-[10px] text-white/20 transition-colors tracking-widest hover:text-white/70">{name}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 border-t border-white/[0.04] pt-4">
          {legalLinks.map(([name, href]) => (
            <Link key={name} href={href} className="font-mono-custom text-[9px] text-white/15 transition-colors tracking-widest hover:text-white/60">{name}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
