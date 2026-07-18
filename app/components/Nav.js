"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

const links = [
  { label: "HOME", href: "/" },
  { label: "TEAMS", href: "/teams" },
  { label: "CREATORS", href: "/creators" },
  { label: "PROGRAM", href: "/program" },
  { label: "MERCH", href: "/merch" },
  { label: "ABOUT", href: "/about" },
  { label: "PHOTOS", href: "/photos" },
];

export default function Nav({ active }) {
  const { count, setOpen } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) sessionStorage.setItem("ink3d_ref", ref.toUpperCase());
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/ink3d_v4_transparent_1.png" alt="INK3D Logo" width={50} height={50} className="object-contain cursor-pointer" />
            </Link>
          </div>
          <div className="hidden md:flex gap-6 text-[11px] font-bold tracking-[0.15em] text-white/40">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
                style={{ color: active === link.label ? '#ae1fe3' : undefined }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-custom text-[10px] hidden md:block" style={{ color: '#ae1fe388' }}>
              <span className="blink">▋</span> ONLINE
            </span>
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 text-[11px] font-black tracking-[0.15em] transition-all duration-200 bracket-box"
              style={{ border: '1px solid #ae1fe388', color: '#ae1fe3' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ae1fe3'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ae1fe3'; }}
            >
              CART ({count})
            </button>
          </div>
        </div>
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #ae1fe344, transparent)' }} />
      </nav>
      <CartSidebar />
    </>
  );
}
