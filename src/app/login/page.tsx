"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NishchintoLogo from "@/components/NishchintoLogo";
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@nischinto.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-white flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 space-y-6">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <NishchintoLogo size="lg" showTagline={true} />
          </Link>
          <h2 className="text-xl font-bold text-slate-900 pt-2">মার্চেন্ট লগইন পোর্টাল</h2>
          <p className="text-xs text-slate-500">
            আপনার ড্যাশবোর্ডে প্রবেশ করতে ক্রেডেনশিয়াল লিখুন
          </p>
        </div>

        {/* Demo Fast Fill Pill */}
        <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-xl flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>ডেমো মার্চেন্ট অ্যাকাউন্ট প্রস্তুত</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail("owner@nischinto.com");
              setPassword("password123");
            }}
            className="text-[11px] font-bold text-teal-700 underline"
          >
            অটো-ফিল করুন
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              ইমেইল বা মোবাইল নম্বর
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
              <a href="#" className="text-[11px] font-semibold text-teal-600 hover:underline">
                ভুলে গেছেন?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "প্রবেশ করা হচ্ছে..." : "ড্যাশবোর্ডে প্রবেশ করুন"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          <span>এখনও অ্যাকাউন্ট নেই? </span>
          <Link href="/register" className="font-semibold text-teal-700 hover:underline">
            নতুন মার্চেন্ট অ্যাকাউন্ট খুলুন
          </Link>
        </div>
      </div>
    </div>
  );
}
