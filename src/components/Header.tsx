"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Store,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  phoneMasked?: boolean;
  onTogglePhoneMask?: (val: boolean) => void;
}

export default function Header({
  phoneMasked = true,
  onTogglePhoneMask,
}: HeaderProps) {
  const router = useRouter();
  const [masked, setMasked] = useState(phoneMasked);
  const [impersonatedStore, setImpersonatedStore] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("impersonating_merchant_name");
      if (stored) {
        setImpersonatedStore(stored);
      }
    }
  }, []);

  const handleToggle = () => {
    const nextVal = !masked;
    setMasked(nextVal);
    if (onTogglePhoneMask) onTogglePhoneMask(nextVal);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("impersonating_merchant_name");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("merchant_user");
    }
    // Redirect directly to the main public homepage as requested
    router.push("/");
  };

  const handleExitImpersonation = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("impersonating_merchant_name");
    }
    router.push("/admin");
  };

  return (
    <>
      {/* Super Admin Impersonation Notice Bar */}
      {impersonatedStore && (
        <div className="bg-amber-500 text-slate-950 px-6 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">⚠️</span>
            <span>সুপার অ্যাডমিন হিসেবে পর্যবেক্ষণ করছেন: <strong>{impersonatedStore}</strong></span>
          </div>
          <button
            onClick={handleExitImpersonation}
            className="px-3 py-1 bg-slate-900 text-amber-300 hover:bg-slate-800 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সুপার অ্যাডমিন প্যানেলে ফিরুন</span>
          </button>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Store Selector & Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
            <Store className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">
              {impersonatedStore || "Nischinto Fashion & Gadgets"}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
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
                <span className="hidden sm:inline">ডেটা গার্ড: সক্রিয় (Masked)</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">ডেটা গার্ড: দৃশ্যমান (Unmasked)</span>
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

          {/* Logout Button: Takes user directly to the main homepage */}
          <button
            onClick={handleLogout}
            title="লগআউট করুন"
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>
    </>
  );
}
