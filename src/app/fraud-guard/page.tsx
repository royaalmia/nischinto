"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Truck,
  Phone,
  HelpCircle,
  Sparkles,
  Lock,
} from "lucide-react";

export default function FraudGuardPage() {
  const [phoneInput, setPhoneInput] = useState("01999000111");
  const [addressInput, setAddressInput] = useState("Mirpur 10, Dhaka");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    setAnalyzing(true);
    setResult(null);

    // Call test fraud check
    setTimeout(() => {
      setAnalyzing(false);
      const isHighFraud = phoneInput.endsWith("111");
      const isSafe = phoneInput.endsWith("456");

      if (isHighFraud) {
        setResult({
          score: 88,
          level: "HIGH_RISK",
          carrier: "Banglalink",
          totalOrders: 7,
          delivered: 1,
          returned: 6,
          successRate: 14,
          reasons: [
            "কুরিয়ার নেটওয়ার্কে মারাত্মক রিটার্ন রেকর্ড (৭টির মধ্যে ৬টিই রিটার্ন)।",
            "পূর্ববর্তী ৩টি অনলাইন শপে পার্সেল নেওয়ার সময় ফোন বন্ধ রাখার রেকর্ড রয়েছে।",
            "ডেলিভারি ঠিকানা বারবার পরিবর্তন করার নজির পাওয়া গেছে।",
          ],
          recommendation:
            "উচ্চ ঝুঁকি! পার্সেল পাঠানোর পূর্বে অবশ্যই ন্যূনতম ১২০ টাকা ডেলিভারি চার্জ বিকাশ বা নগদে অগ্রিম গ্রহণ করুন। অন্যথায় এই পার্সেল রিটার্ন আসার সম্ভাবনা প্রায় শতভাগ।",
          requireAdvance: true,
        });
      } else if (isSafe) {
        setResult({
          score: 5,
          level: "SAFE",
          carrier: "Grameenphone",
          totalOrders: 6,
          delivered: 6,
          returned: 0,
          successRate: 100,
          reasons: [
            "কুরিয়ার নেটওয়ার্কে ১০০% সফল ডেলিভারি রেকর্ড।",
            "সরাসরি গ্রামীণফোন ভ্যালিড নম্বর।",
            "কোনো ফেইক অর্ডার বা রিটার্ন রেকর্ড নেই।",
          ],
          recommendation: "নিরাপদ ক্রেতা! কোনো প্রকার দ্বিধা ছাড়া অবিলম্বে পার্সেল পাঠিয়ে দিন।",
          requireAdvance: false,
        });
      } else {
        setResult({
          score: 48,
          level: "MEDIUM",
          carrier: "Robi",
          totalOrders: 4,
          delivered: 2,
          returned: 2,
          successRate: 50,
          reasons: [
            "কাস্টমারের পূর্ববর্তী পার্সেল ডেলিভারি সাকসেস রেট ৫০%।",
            "কুরিয়ারে ২টি পার্সেল সফল এবং ২টি পার্সেল রিটার্নের রেকর্ড আছে।",
          ],
          recommendation: "সতর্কতা! অর্ডারের সাইজ ও ঠিকানা ফোনে কল দিয়ে নিশ্চিত করে তবেই পার্সেল পাঠান।",
          requireAdvance: false,
        });
      }
    }, 600);
  };

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-400/20">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>সেন্ট্রাল কুরিয়ার ফ্রড গার্ড</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            মাল্টি-ভেক্টর ফ্রড ডিটেকশন ও রিস্ক স্কোর
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            কাস্টমারের ফোন নম্বর দিয়ে দেশের শীর্ষস্থানীয় সব কুরিয়ারের (Steadfast, Pathao, RedX) কেন্দ্রীয় হিস্টোরি ক্রস-ম্যাচ করুন। কাস্টমার আগে কয়টি পার্সেল রিসিভ করেছে আর কয়টি রিটার্ন করেছে, তা দেখে রিটার্ন লস বাঁচান।
          </p>
        </div>

        {/* Checker Form */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">ফোন নম্বর ভেরিফিকেশন ও ক্রস-ম্যাচ</h3>

          <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">কাস্টমারের ফোন নম্বর</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ডেলিভারি ঠিকানা (ঐচ্ছিক)</label>
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="রোড, বাড়ি, এলাকা..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{analyzing ? "কুরিয়ার হিস্টোরি খোঁজা হচ্ছে..." : "ফ্রড হিস্টোরি চেক করুন"}</span>
              </button>
            </div>
          </form>

          {/* Quick presets for testing */}
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
            <span>টেস্ট করার নম্বর:</span>
            <button
              onClick={() => {
                setPhoneInput("01999000111");
                handleAnalyze({ preventDefault: () => {} } as any);
              }}
              className="text-red-600 font-bold hover:underline"
            >
              উচ্চ ঝুঁকি (01999000111)
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setPhoneInput("01755123456");
                handleAnalyze({ preventDefault: () => {} } as any);
              }}
              className="text-emerald-600 font-bold hover:underline"
            >
              নিরাপদ (01755123456)
            </button>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-400">অ্যানালাইসিস ফলাফল</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  ফোন: {phoneInput} ({result.carrier})
                </h3>
              </div>

              <div
                className={`px-4 py-2 rounded-xl text-sm font-extrabold border flex items-center gap-2 ${
                  result.level === "HIGH_RISK"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : result.level === "MEDIUM"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {result.level === "HIGH_RISK" && <AlertTriangle className="w-5 h-5" />}
                {result.level === "SAFE" && <CheckCircle2 className="w-5 h-5" />}
                <span>
                  {result.level === "HIGH_RISK"
                    ? "উচ্চ ঝুঁকি (High Risk)"
                    : result.level === "MEDIUM"
                    ? "সতর্কতা (Medium Risk)"
                    : "নিরাপদ ক্রেতা (Safe)"}{" "}
                  - রিস্ক স্কোর: {result.score}%
                </span>
              </div>
            </div>

            {/* Courier Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500 font-semibold">মোট পার্সেল রেকর্ড</span>
                <p className="text-2xl font-bold text-slate-800 mt-1">{result.totalOrders} টি</p>
                <span className="text-[11px] text-slate-400">Steadfast + Pathao + RedX</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl">
                <span className="text-xs text-emerald-800 font-semibold">সফল ডেলিভারি</span>
                <p className="text-2xl font-bold text-emerald-700 mt-1">{result.delivered} টি</p>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  সাকসেস রেট: {result.successRate}%
                </span>
              </div>

              <div className="p-4 bg-red-50 rounded-xl">
                <span className="text-xs text-red-800 font-semibold">রিটার্ন / ফেইল্ড পার্সেল</span>
                <p className="text-2xl font-bold text-red-700 mt-1">{result.returned} টি</p>
                <span className="text-[11px] text-red-600 font-semibold">
                  মার্চেন্টের আনুমানিক ক্ষতি: ৳{result.returned * 130}
                </span>
              </div>
            </div>

            {/* Reasons and Advice */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-800 block">বিশ্লেষণ ও ফ্যাক্টরসমূহ:</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {result.reasons.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  result.requireAdvance
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : "bg-blue-50 border-blue-200 text-blue-900"
                }`}
              >
                <span className="text-xs font-bold block mb-1">
                  Nischinto AI রিকমেন্ডেশন:
                </span>
                <p className="text-xs leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
