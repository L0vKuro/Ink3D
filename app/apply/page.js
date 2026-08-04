"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";
const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-4 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
const labelClass = "font-mono-custom text-[9px] tracking-[0.4em] mb-2 block";
const tiers = [
  { icon: "🥉", label: "STARTING TIER", name: "BRONZE", color: "#cd7f32", commission: "10%", desc: "You're in. Welcome to the INK3D network. Start sharing your link and building your audience." },
  { icon: "🥈", label: "10 SALES", name: "SILVER", color: "#c0c0c0", commission: "13%", desc: "You're moving. People are buying through you and the community is noticing." },
  { icon: "🥇", label: "25 SALES", name: "GOLD", color: "#ffd60a", commission: "16%", desc: "You're a force. Your influence is real and INK3D is growing because of you." },
  { icon: "💎", label: "50 SALES", name: "DIAMOND", color: "#00b4d8", commission: "20%", desc: "Elite status. You're one of the top affiliates driving the brand forward." },
  { icon: "👑", label: "100 SALES", name: "ELITE", color: "#ae1fe3", commission: "25%", desc: "The top 1%. You don't just rep INK3D — you are INK3D." },
];
export default function Apply() {
  const [form, setForm] = useState({
    fullName: "", email: "", teamName: "", reason: "",
    twitter: "", tiktok: "", instagram: "", youtube: "", twitch: "", discord: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const loadedAt = useRef(Date.now());
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // Bot detection: submitted suspiciously fast (bots don't wait; humans take
    // several seconds to fill this form out). We deliberately do NOT block on
    // the honeypot field's value — Chrome's autofill will fill every text
    // input in a form (including ones hidden via CSS) once a user accepts an
    // autofill suggestion on any field, which made this reject real users.
    const elapsed = Date.now() - loadedAt.current;
    if (elapsed < 1200) return;
    if (!form.twitter) return alert("Twitter/X is required.");
    setLoading(true);
    try {
      const res = await fetch("/api/send-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, logo, logoName, honeypot }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  }
  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <Nav active="PROGRAM" />
        <div className="text-center max-w-lg">
          <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-6" style={{color: '#ae1fe366'}}>SYS://APPLICATION_SENT</div>
          <h1 className="text-5xl font-black tracking-tight mb-6">APPLICATION<br /><span style={{color: '#ae1fe3'}}>RECEIVED</span></h1>
          <p className="font-mono-custom text-white/30 text-sm leading-relaxed mb-10">
            // We'll review your application and reach out within 48 hours. Stay locked in.
          </p>
          <Link href="/program">
            <button className="font-black px-12 py-4 text-xs tracking-[0.25em] font-mono-custom bracket-box transition-all duration-200"
              style={{border: '1px solid #ae1fe344', color: '#ae1fe3'}}
              onMouseEnter={e => { e.currentTarget.style.background='#ae1fe3'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#ae1fe3'; }}>
              ← BACK TO PROGRAM
            </button>
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Nav active="PROGRAM" />
      <div className="pt-32 px-6 md:px-12 pb-24 max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://APPLICATION_LOADED
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            JOIN THE<br />
            <span style={{color: '#ae1fe3'}}>INK3D</span><br />
            <span style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent'}}>FAMILY</span>
          </h1>
          <p className="font-mono-custom text-white/30 text-sm max-w-xl leading-relaxed">
            // Tell us about yourself. We review every application personally.
          </p>
        </div>
        {/* AFFILIATE TIERS */}
        <div className="mb-16">
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{color: '#ae1fe366'}}>
            <span>◆</span> SYS://TIERS_LOADED
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-2">
            AFFILIATE <span style={{color: '#ae1fe3'}}>TIERS</span>
          </h2>
          <p className="font-mono-custom text-white/30 text-sm max-w-xl leading-relaxed mb-8">
            // Every affiliate starts at Bronze. The more you sell, the higher you climb — and the more you earn. There's no cap on what you can make.
          </p>
          <div className="border border-white/[0.06]">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 ${i !== tiers.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
              >
                <div className="text-3xl shrink-0">{tier.icon}</div>
                <div className="shrink-0 md:w-32">
                  <div className="font-mono-custom text-[9px] tracking-widest text-white/30 mb-1">{tier.label}</div>
                  <div className="font-black text-lg tracking-wide" style={{ color: tier.color }}>{tier.name}</div>
                </div>
                <p className="font-mono-custom text-white/40 text-sm leading-relaxed flex-1">{tier.desc}</p>
                <div className="text-left md:text-right shrink-0">
                  <div className="font-mono-custom text-[9px] text-white/20 tracking-widest">COMMISSION</div>
                  <div className="font-black text-2xl" style={{ color: tier.color }}>{tier.commission}</div>
                  <div className="font-mono-custom text-[8px] text-white/20 tracking-widest">PER SALE</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* HONEYPOT — hidden from real users, bots fill this in. NOT used to
              block submission (see handleSubmit) since browser autofill can
              populate hidden fields too; kept only for optional server-side logging. */}
          <div style={{position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none'}} aria-hidden="true">
            <input
              type="text"
              name="hp_confirm_2x9"
              id="hp_confirm_2x9"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {/* PERSONAL INFO */}
          <div className="border border-white/[0.06] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[#050505] px-3">
              <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// PERSONAL INFO</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>FULL NAME <span style={{color: '#ae1fe3'}}>*</span></label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>EMAIL <span style={{color: '#ae1fe3'}}>*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
              </div>
            </div>
          </div>
          {/* TEAM INFO */}
          <div className="border border-white/[0.06] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[#050505] px-3">
              <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// TEAM / ORG</span>
            </div>
            <div className="mb-6">
              <label className={labelClass} style={{color: '#ae1fe366'}}>TEAM / ORGANIZATION NAME <span style={{color: '#ae1fe3'}}>*</span></label>
              <input name="teamName" value={form.teamName} onChange={handleChange} required placeholder="Team or org name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={{color: '#ae1fe366'}}>LOGO UPLOAD <span className="text-white/20">(optional)</span></label>
              <div
                onClick={() => fileRef.current.click()}
                className="w-full border border-dashed border-white/[0.1] py-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:border-[#ae1fe3] group"
                style={{background: '#0a0a0a'}}
              >
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                {logo ? (
                  <div className="text-center">
                    <div className="w-20 h-20 relative mx-auto mb-3">
                      <Image src={logo} alt="Logo preview" fill className="object-contain" />
                    </div>
                    <div className="font-mono-custom text-[9px] text-white/40 tracking-widest">{logoName}</div>
                  </div>
                ) : (
                  <>
                    <div className="font-mono-custom text-[9px] text-white/20 tracking-[0.4em] mb-2 group-hover:text-[#ae1fe3] transition-colors">CLICK TO UPLOAD</div>
                    <div className="font-mono-custom text-[8px] text-white/10 tracking-widest">PNG, JPG, SVG — MAX 5MB</div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* WHY JOIN */}
          <div className="border border-white/[0.06] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[#050505] px-3">
              <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// YOUR STORY</span>
            </div>
            <label className={labelClass} style={{color: '#ae1fe366'}}>WHY DO YOU WANT TO JOIN INK3D? <span style={{color: '#ae1fe3'}}>*</span></label>
            <textarea
              name="reason" value={form.reason} onChange={handleChange} required
              placeholder="// Tell us about your audience, your content, and why INK3D is the right fit..."
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </div>
          {/* SOCIALS */}
          <div className="border border-white/[0.06] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[#050505] px-3">
              <span className="font-mono-custom text-[9px] tracking-[0.4em]" style={{color: '#ae1fe3'}}>// SOCIAL LINKS</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>TWITTER / X <span style={{color: '#ae1fe3'}}>*</span></label>
                <input name="twitter" value={form.twitter} onChange={handleChange} required placeholder="https://x.com/yourhandle" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>TIKTOK <span className="text-white/20">(optional)</span></label>
                <input name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="https://tiktok.com/@yourhandle" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>INSTAGRAM <span className="text-white/20">(optional)</span></label>
                <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://instagram.com/yourhandle" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>YOUTUBE <span className="text-white/20">(optional)</span></label>
                <input name="youtube" value={form.youtube} onChange={handleChange} placeholder="https://youtube.com/@yourchannel" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>TWITCH <span className="text-white/20">(optional)</span></label>
                <input name="twitch" value={form.twitch} onChange={handleChange} placeholder="https://twitch.tv/yourchannel" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} style={{color: '#ae1fe366'}}>DISCORD <span className="text-white/20">(optional)</span></label>
                <input name="discord" value={form.discord} onChange={handleChange} placeholder="https://discord.gg/yourserver" className={inputClass} />
              </div>
            </div>
          </div>
          {/* SUBMIT */}
          <div className="pt-4">
            {status === "error" && (
              <div className="font-mono-custom text-[10px] text-red-400 tracking-widest mb-6 text-center">// SUBMISSION FAILED — PLEASE TRY AGAIN</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 font-black text-xs tracking-[0.3em] font-mono-custom transition-all duration-200 glow-btn"
              style={{background: loading ? '#ae1fe380' : '#ae1fe3', color: '#fff'}}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background='#c040ff'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background='#ae1fe3'; }}
            >
              {loading ? '[ SUBMITTING... ]' : '[ SUBMIT APPLICATION ]'}
            </button>
            <div className="font-mono-custom text-[9px] text-white/20 tracking-widest text-center mt-4">
              // WE REVIEW EVERY APPLICATION WITHIN 48 HOURS
            </div>
          </div>
        </form>
      </div>
      <footer className="border-t border-white/[0.05]">
        <div className="px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={80} height={32} className="object-contain cursor-pointer" /></Link>
          <span className="font-mono-custom text-[10px] text-white/15 tracking-widest">© 2026 INK3D STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            {[["TWITTER","https://x.com/ink3dStudio"],["TIKTOK","https://www.tiktok.com/@ink3d.studio"],["DISCORD","https://discordapp.com/invite/rv99duMaW6"]].map(([name, href]) => (
              <Link key={name} href={href} className="font-mono-custom text-[10px] text-white/20 transition-colors tracking-widest hover:text-white/70">{name}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
