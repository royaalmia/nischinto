"use client";

import Link from "next/link";
import Image from "next/image";
import NishchintoLogo from "@/components/NishchintoLogo";
import {
  Sparkles,
  ShieldAlert,
  PhoneCall,
  Truck,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Lock,
  Boxes,
  HelpCircle,
} from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-white text-slate-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NishchintoLogo size="md" showBangla={true} />

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-teal-600 transition-colors"
          >
            লগইন
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 text-center space-y-8">
        {/* Brand Mockup Display */}
        <div className="flex justify-center">
          <div className="relative p-6 rounded-3xl bg-white shadow-2xl shadow-teal-500/10 border border-teal-100 flex flex-col items-center max-w-sm w-full">
            <div className="w-28 h-28 relative rounded-3xl bg-white shadow-xl shadow-teal-500/20 border border-slate-100 flex items-center justify-center p-3 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00c49f" />
                    <stop offset="50%" stopColor="#00b4d8" />
                    <stop offset="100%" stopColor="#0077b6" />
                  </linearGradient>
                </defs>
                <path
                  d="M26 22 C26 18 31 16 34 19 L66 65 L66 25 C66 21 72 21 74 25 L74 78 C74 82 69 84 66 81 L34 35 L34 75 C34 79 26 79 26 75 Z"
                  fill="url(#heroGrad)"
                />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-md">
                <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nishchinto</h1>
              <span className="text-xs font-bold bg-teal-500 text-white px-2 py-0.5 rounded-md">
                .app
              </span>
            </div>
            <span className="text-sm font-bold text-teal-600 mb-4">নিশ্চিন্ত</span>

            {/* Official Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/80 border border-teal-200/80 text-xs font-bold text-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ব্যবসা চালান নিশ্চিন্তে</span>
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            </div>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            বাংলাদেশের সেরা ই-কমার্স অটোমেশন ও{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              AI গ্রোথ অপারেটিং সিস্টেম
            </span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            অর্ডার কনফার্মেশন, কুরিয়ার ফ্রড চেকার, বাংলা AI ভয়েস কল থেকে শুরু করে স্বয়ংক্রিয় ফেসবুক অ্যাড চালানো—সবকিছু এবার একই প্ল্যাটফর্মে।
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/25 transition-all flex items-center gap-2"
          >
            <span>ফ্রি ট্রায়াল শুরু করুন (ড্যাশবোর্ড)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/checkout"
            className="px-6 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
          >
            লাইভ চেকআউট ডেমো দেখুন
          </Link>
        </div>

        {/* Comparison Table: Nishchinto vs Competitors */}
        <div className="pt-16 text-left">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              তুলনামূলক পার্থক্য
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              কেন Nishchinto.app অন্যান্য সফটওয়্যারের চেয়ে যোজন যোজন এগিয়ে?
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold">
                  <th className="p-4">ফিচার তালিকা</th>
                  <th className="p-4 bg-teal-50/50 text-teal-900 font-black text-sm">
                    ✨ Nishchinto.app
                  </th>
                  <th className="p-4">BizMation / Posware</th>
                  <th className="p-4">সাধারণ ই-কমার্স</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    AI অটো অ্যাড ম্যানেজার (Meta/TikTok Auto-Run)
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ ১-ক্লিকে কপি, অডিয়েন্স ও অ্যাড চালু
                  </td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই (ম্যানুয়াল করতে হয়)</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    আউট-অফ-স্টক অটো অ্যাড পজ (টাকা অপচয় রোধ)
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ স্টক ০ হলেই স্বয়ংক্রিয় পজ
                  </td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    বাংলিশ ও বাংলা Conversational AI ভয়েস কল
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ মানুষের মতো কথা বলে অর্ডার কনফার্ম
                  </td>
                  <td className="p-4 text-amber-600 font-semibold">⚠️ রোবটিক সাধারণ IVR</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    সেন্ট্রাল কুরিয়ার ফ্রড গার্ড (Steadfast, Pathao, RedX)
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ ০-১০০% মাল্টি-ভেক্টর রিস্ক স্কোর
                  </td>
                  <td className="p-4 text-emerald-600 font-semibold">✅ বেসিক ডেলিভারি রেশিও</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    ডেটা গার্ড (কর্মচারীদের কাস্টমার নম্বর চুরি রোধ)
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ 1-Click Phone Masking
                  </td>
                  <td className="p-4 text-slate-400 font-semibold">সীমিত</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">
                    আসল লাভ-ক্ষতি (COGS + Ad Spend + Courier)
                  </td>
                  <td className="p-4 bg-teal-50/30 font-bold text-emerald-700">
                    ✅ রিয়েল-টাইম True Net Profit
                  </td>
                  <td className="p-4 text-slate-400 font-semibold">আংশিক</td>
                  <td className="p-4 text-red-500 font-semibold">❌ নেই</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
