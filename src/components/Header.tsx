"use client";

import { useState } from "react";
import {
  Bell,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Sparkles,
  Store,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  phoneMasked?: boolean;
  onTogglePhoneMask?: (val: boolean) => void;
}

export default function Header({
  phoneMasked = true,
  onTogglePhoneMask,
}: HeaderProps) {
  const [masked, setMasked] = useState(phoneMasked);

  const handleToggle = () => {
    const nextVal = !masked;
    setMasked(nextVal);
    if (onTogglePhoneMask) onTogglePhoneMask(nextVal);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Store Selector & Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          <Store className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-800">
            Nischinto Fashion & Gadgets
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <Link
          href="/checkout"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <span>স্টোর প্রিভিউ</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Right: Security Masking, Wallet Credits & Actions */}
      <div className="flex items-center gap-3">
        {/* Anti-Theft Phone Masking Toggle */}
        <button
          onClick={handleToggle}
          title="কর্মীদের কাস্টমার ডেটা চুরি রোধে ফোন নম্বর মাস্কিং"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            masked
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          {masked ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ডেটা গার্ড: সক্রিয় (Masked)</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>ডেটা গার্ড: দৃশ্যমান (Unmasked)</span>
            </>
          )}
        </button>

        {/* AI & SMS Wallet Credits */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          <Wallet className="w-4 h-4 text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium leading-none">
              AI ওয়ালেট
            </span>
            <span className="text-xs font-bold text-slate-800 leading-tight">
              ৳১,৪৫০.০০
            </span>
          </div>
        </div>

        {/* AI Ad 1-Click Action */}
        <Link
          href="/ai-ads"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm shadow-blue-500/20 hover:opacity-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI অটো অ্যাড</span>
        </Link>
      </div>
    </header>
  );
}
