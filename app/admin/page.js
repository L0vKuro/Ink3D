"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("tracking");

  // Tracking state
  const [tracking, setTracking] = useState({ customerEmail: "", customerName: "", trackingLink: "", orderId: "" });
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Discount state
  const [discounts, setDiscounts] = useState([
    { code: "INK3D10", percent: 10 },
    { code: "INK3D20", percent: 20 },
  ]);
  const [newCode, setNewCode] = useState("");
  const [newPercent, setNewPercent] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("// INVALID PASSWORD");
    }
  }

  async function handleSendTracking(e) {
    e.preventDefault();
    setTrackingLoading(true);
    setTrackingStatus(null);
    const res = await fetch("/api/admin/send-tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tracking),
    });
    setTrackingStatus(res.ok ? "success" : "error");
    if (res.ok) setTracking({ customerEmail: "", customerName: "", trackingLink: "", orderId: "" });
    setTrackingLoading(false);
  }

  function addDiscount() {
    if (!newCode || !newPercent) return;
    const code = newCode.trim().toUpperCase();
    const percent = parseInt(newPercent);
    if (isNaN(percent) || percent < 1 || percent > 100) { setDiscountMsg("// INVALID PERCENT"); return; }
    if (discounts.find(d => d.code === code)) { setDiscountMsg("// CODE ALREADY EXISTS"); return; }
    setDiscounts(prev => [...prev, { code, percent }]);
    setNewCode("");
    setNewPercent("");
    setDiscountMsg(`// ${code} ADDED`);
  }

  function removeDiscount(code) {
    setDiscounts(prev => prev.filter(d => d.code !== code));
    setDiscountMsg(`// ${code} REMOVED`);
  }

  const inputClass = "w-full bg-[#0a0a0a] border border-white/[0.08] text-white font-mono-custom text-sm px-4 py-3 outline-none focus:border-[#ae1fe3] transition-colors duration-200 placeholder:text-white/20 tracking-wider";
  const labelClass = "font-mono-custom text-[9px] tracking-[0.3em] mb-2 block text-white/40";

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Link href="/"><Image src="/ink3d_v4_transparent_1.png" alt="INK3D" width={80} height={32} className="object-contain mx-auto mb-6" /></Link>
            <div className="font-mono-custom text-[9px] tracking-[0.4em] mb-2" style={{color: '#ae1fe366'}}>SYS://ADMIN_ACCESS</div>
            <h1 className="text-3xl font-black tracking-tight">ADMIN PANEL</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
