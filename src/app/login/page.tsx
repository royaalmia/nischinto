"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NishchintoLogo from "@/components/NishchintoLogo";
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        if (typeof window !== "undefined" && data.user) {
          localStorage.setItem("merchant_user", JSON.stringify(data.user));
        }
        router.push(data.redirect || "/dashboard");
      } else {
        setErrorMsg(data.error || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <NishchintoLogo size="md" showTagline={true} />
          </Link>
          <h2 className="text-xl font-bold text-slate-900 pt-1">মার্চেন্ট লগইন</h2>
          <p className="text-xs text-slate-500">
            আপনার ড্যাশবোর্ডে প্রবেশ করতে ক্রেডেনশিয়াল লিখুন
          </p>
        </div>

        {/* Error / Pending alert */}
        {errorMsg && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-medium border leading-relaxed ${
              errorMsg.includes("অনুমোদনের") || errorMsg.includes("Pending")
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {errorMsg}
          </div>
        )}

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
