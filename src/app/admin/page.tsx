"use client";

import { useState } from "react";
import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { formatBDT } from "@/lib/utils";
import {
  ShieldAlert,
  Users,
  DollarSign,
  TrendingUp,
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
  Plus,
  Search,
  Filter,
} from "lucide-react";

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<"MERCHANTS" | "GATEWAYS" | "SUBSCRIPTIONS">("MERCHANTS");
  const [search, setSearch] = useState("");

  const [merchants, setMerchants] = useState<any[]>([
    {
      id: "MCH-01",
      storeName: "Nischinto Fashion & Gadgets",
      ownerName: "রহিম চৌধুরী",
      phone: "01711223344",
      plan: "PRO_AI",
      ordersProcessed: 1420,
      walletBalance: 1450.0,
      joinedDate: "2026-10-12",
      status: "ACTIVE",
    },
    {
      id: "MCH-02",
      storeName: "Elite Footwear BD",
      ownerName: "শফিকুল ইসলাম",
      phone: "01822998877",
      plan: "GROWTH",
      ordersProcessed: 680,
      walletBalance: 420.0,
      joinedDate: "2026-10-24",
      status: "ACTIVE",
    },
    {
      id: "MCH-03",
      storeName: "Organic Essentials Bangladesh",
      ownerName: "ফারহানা সুলতানা",
      phone: "01933556677",
      plan: "STARTER",
      ordersProcessed: 185,
      walletBalance: 150.0,
      joinedDate: "2026-11-02",
      status: "ACTIVE",
    },
    {
      id: "MCH-04",
      storeName: "Trendy Baby Shop",
      ownerName: "তানভীর হাসান",
      phone: "01677112233",
      plan: "PRO_AI",
      ordersProcessed: 2340,
      walletBalance: 3200.0,
      joinedDate: "2026-09-18",
      status: "ACTIVE",
    },
  ]);

  const [gateways] = useState<any[]>([
    {
      name: "Steadfast Courier API",
      type: "Logistics",
      status: "OPERATIONAL",
      uptime: "৯৯.৯৮%",
      latency: "১২৪ ms",
    },
    {
      name: "Pathao Courier Hermes API",
      type: "Logistics",
      status: "OPERATIONAL",
      uptime: "৯৯.৯৫%",
      latency: "১৪৫ ms",
    },
    {
      name: "Meta Marketing & CAPI Gateway",
      type: "Advertising",
      status: "OPERATIONAL",
      uptime: "১০০.০%",
      latency: "৯২ ms",
    },
    {
      name: "WhatsApp Cloud API (Meta)",
      type: "Communication",
      status: "OPERATIONAL",
      uptime: "৯৯.৯৯%",
      latency: "৭৮ ms",
    },
    {
      name: "Bengali AI Voice Synthesizer",
      type: "AI Engine",
      status: "OPERATIONAL",
      uptime: "৯৯.৯২%",
      latency: "২০০ ms",
    },
  ]);

  const totalStores = merchants.length + 138; // 142 total merchants
  const totalPlatformGMV = 38450000; // 3.84 Crore BDT
  const totalMRR = 485000; // 4.85 Lakh BDT

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Super Admin Top Header */}
      <header className="h-20 bg-slate-900 text-white px-8 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <NishchintoLogo size="sm" showBangla={false} />
          </Link>
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-700">
            <span className="text-xs font-mono font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2.5 py-1 rounded-md">
              SUPER ADMIN CONSOLE
            </span>
            <span className="text-[11px] text-slate-400">প্ল্যাটফর্ম ওনার প্যানেল</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <span>মার্চেন্ট ড্যাশবোর্ড দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                মোট মার্চেন্ট স্টোর
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{totalStores} টি</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                +১৮ জন এই সপ্তাহে যোগ দিয়েছেন
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                মাসিক সাবস্ক্রিপশন (MRR)
              </span>
              <h3 className="text-3xl font-black text-teal-600 mt-1">{formatBDT(totalMRR)}</h3>
              <p className="text-[11px] text-slate-400 mt-1">মার্চেন্ট সাবস্ক্রিপশন ফি</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                প্ল্যাটফর্ম অর্ডার ভলিউম (GMV)
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{formatBDT(totalPlatformGMV)}</h3>
              <p className="text-[11px] text-slate-400 mt-1">সকল মার্চেন্টের অর্ডার বিক্রয়</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                এপিআই হেলথ ও আপটাইম
              </span>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">৯৯.৯৭%</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">সকল গেটওয়ে সচল</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-3 border-b border-slate-200 pb-3">
          {[
            { id: "MERCHANTS", label: "মার্চেন্ট স্টোরসমূহ (Stores)" },
            { id: "GATEWAYS", label: "সিস্টেম এপিআই গেটওয়ে ও হেলথ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "MERCHANTS" ? (
          /* Merchant Stores Management */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  নিবন্ধিত মার্চেন্ট স্টোর তালিকা
                </h3>
                <p className="text-xs text-slate-500">
                  মার্চেন্ট অ্যাকাউন্ট অ্যাক্টিভেশন, প্ল্যান পরিবর্তন ও ব্যালেন্স রিচার্জ কন্ট্রোল
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="স্টোর নাম, ফোন নম্বর দিয়ে খুঁজুন..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="p-3">স্টোর ও মালিক</th>
                    <th className="p-3">সাবস্ক্রিপশন প্ল্যান</th>
                    <th className="p-3">প্রসেস করা অর্ডার</th>
                    <th className="p-3">AI ওয়ালেট ব্যালেন্স</th>
                    <th className="p-3">যোগদানের তারিখ</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchants.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{m.storeName}</span>
                        <span className="text-[11px] text-slate-500">
                          {m.ownerName} ({m.phone})
                        </span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            m.plan === "PRO_AI"
                              ? "bg-amber-100 text-amber-900"
                              : m.plan === "GROWTH"
                              ? "bg-teal-100 text-teal-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {m.plan}
                        </span>
                      </td>

                      <td className="p-3 font-semibold text-slate-800">
                        {m.ordersProcessed.toLocaleString("bn-BD")} টি
                      </td>

                      <td className="p-3 font-bold text-slate-900">{formatBDT(m.walletBalance)}</td>

                      <td className="p-3 text-slate-500">{m.joinedDate}</td>

                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {m.status}
                        </span>
                      </td>

                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => alert(`${m.storeName}-এর প্ল্যান সফলভাবে আপগ্রেড করা হয়েছে!`)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold"
                        >
                          প্ল্যান চেঞ্জ
                        </button>
                        <button
                          onClick={() => alert(`${m.storeName}-এর ওয়ালেটে ৫০০ টাকা ক্রেডিট যোগ করা হয়েছে!`)}
                          className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-[11px] font-bold"
                        >
                          + ক্রেডিট টপআপ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* System Gateways Monitoring */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                কোর এপিআই গেটওয়ে মনিটরিং
              </h3>
              <p className="text-xs text-slate-500">
                Steadfast, Pathao, মেটা ও টেলকো এপিআই সংযোগের লাইভ পারফরম্যান্স
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gateways.map((g, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {g.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>সচল</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{g.name}</h4>

                  <div className="flex justify-between text-xs pt-2 border-t border-slate-200/60 text-slate-600">
                    <span>আপটাইম: <strong className="text-slate-900">{g.uptime}</strong></span>
                    <span>লেটেন্সি: <strong className="font-mono text-teal-600">{g.latency}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
