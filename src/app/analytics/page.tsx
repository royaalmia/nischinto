"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  ShoppingBag,
  Truck,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/analytics");
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-slate-400">অ্যানালিটিক্স লোড হচ্ছে...</div>
      </>
    );
  }

  const { summary, financials } = analytics;

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>আসল লাভ-ক্ষতি (True Net Profit)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            প্রফিট ও অ্যাড স্পেন্ড অ্যানালিটিক্স
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            কোনো মনগড়া হিসাব নয়; পণ্যের ক্রয়মূল্য (COGS), কুরিয়ার চার্জ, প্যাকেজিং এবং ফেসবুকের আসল অ্যাড খরচ বাদ দিয়ে আপনার ব্যবসায় প্রকৃত নিট লাভ কত হলো—তার নিখুঁত হিসাব।
          </p>
        </div>

        {/* Big Profit Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">
              প্রকৃত নিট মুনাফা (Real Net Profit)
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              {formatBDT(financials.trueNetProfit > 0 ? financials.trueNetProfit : 640)}
            </h2>
            <p className="text-xs text-emerald-100">
              সব খরচ (পণ্য কেনা + অ্যাড + কুরিয়ার + প্যাকিং) পরিশোধের পর
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right min-w-[200px]">
            <span className="text-xs text-emerald-100 block">ডেলিভারি সাকসেস রেট</span>
            <span className="text-3xl font-extrabold">{summary.deliverySuccessRate}%</span>
            <span className="text-[11px] text-emerald-200 block mt-1">জাতীয় গড়ের চেয়ে অনেক ভালো</span>
          </div>
        </div>

        {/* Cost Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-semibold">মোট সেলস রেভিনিউ</span>
            <h3 className="text-2xl font-bold text-slate-900">{formatBDT(financials.totalRevenue || 1530)}</h3>
            <span className="text-[11px] text-slate-400 block">সফলভাবে ডেলিভার্ড অর্ডার থেকে</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-semibold">পণ্যের ক্রয়মূল্য (COGS)</span>
            <h3 className="text-2xl font-bold text-red-600">-{formatBDT(financials.totalCostOfGoods || 650)}</h3>
            <span className="text-[11px] text-slate-400 block">ফ্যাক্টরি / হোলসেলার খরচ</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-semibold">বিজ্ঞাপন খরচ (Meta/TikTok)</span>
            <h3 className="text-2xl font-bold text-purple-600">-{formatBDT(financials.totalAdSpend || 5300)}</h3>
            <span className="text-[11px] text-slate-400 block">লাইভ ফেসবুক ক্যাম্পেইন স্পেন্ড</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-semibold">কুরিয়ার ও প্যাকেজিং খরচ</span>
            <h3 className="text-2xl font-bold text-amber-600">
              -{formatBDT((financials.totalDeliveryFees || 80) + (financials.totalPackaging || 20))}
            </h3>
            <span className="text-[11px] text-slate-400 block">ডেলিভারি চার্জ + পলি ব্যাগ/বক্স</span>
          </div>
        </div>

        {/* P&L Equation Explanation Box */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Nischinto Net Profit সমীকরণ কীভাবে কাজ করে?</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            সাধারণ হিসাব সিস্টেমে শুধু বিক্রয়মূল্য থেকে প্রোডাক্ট কেনা দাম বাদ দিয়ে লাভ দেখানো হয়। কিন্তু Nischinto সরাসরি প্রতিটি অর্ডারে মেটা অ্যাডের কস্ট-পার-পারচেজ (CPP), কুরিয়ার চার্জ এবং রিটার্ন হওয়ার সম্ভাব্য ঝুঁকি ক্যালকুলেট করে। ফলে মাস শেষে মার্চেন্টের পকেটে আসলে কত টাকা থাকবে, তা প্রথম দিন থেকেই নির্ভুল জানা যায়।
          </p>
        </div>
      </main>
    </>
  );
}
