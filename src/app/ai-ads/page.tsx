"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertOctagon,
  Play,
  Pause,
  Plus,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Target,
  Zap,
} from "lucide-react";

export default function AiAdsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Ad Form State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [dailyBudget, setDailyBudget] = useState("1000");
  const [creating, setCreating] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const [resC, resP] = await Promise.all([
        fetch("/api/ai-ads"),
        fetch("/api/products"),
      ]);
      const dataC = await resC.json();
      const dataP = await resP.json();

      if (dataC.success) setCampaigns(dataC.data);
      if (dataP.success) {
        setProducts(dataP.data);
        if (dataP.data.length > 0) setSelectedProductId(dataP.data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Launch AI Ad
  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      const res = await fetch("/api/ai-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProductId,
          dailyBudget: Number(dailyBudget),
          platform: "META",
        }),
      });
      const data = await res.json();
      setCreating(false);
      if (data.success) {
        showToast(data.message);
        setShowCreateModal(false);
        fetchCampaigns();
      }
    } catch (err) {
      setCreating(false);
      console.error(err);
    }
  };

  // Run AI Autopilot Optimizer
  const handleRunOptimizer = async () => {
    try {
      setOptimizing(true);
      const res = await fetch("/api/ai-ads/optimize", { method: "POST" });
      const data = await res.json();
      setOptimizing(false);
      if (data.success) {
        showToast(data.message);
        fetchCampaigns();
      }
    } catch (err) {
      setOptimizing(false);
      console.error(err);
    }
  };

  const totalSpend = campaigns.reduce((acc, c) => acc + c.totalSpend, 0);
  const totalPurchases = campaigns.reduce((acc, c) => acc + c.purchases, 0);
  const activeCount = campaigns.filter((c) => c.status === "ACTIVE").length;
  const killedCount = campaigns.filter((c) => c.status === "KILLED_BY_AI").length;

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/15">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Nischinto Autopilot Marketing Engine</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              AI অটো অ্যাড ম্যানেজার (Meta & TikTok)
            </h1>

            <p className="text-sm text-blue-100 leading-relaxed">
              মার্চেন্টের জন্য ফেসবুক ও টিকটকে হাই-কনভার্টিং বিজ্ঞাপন চালানো এখন সম্পূর্ণ স্বয়ংক্রিয়।
              AI নিজে কপি তৈরি করে অ্যাড পাবলিশ করে, এবং কোনো পণ্যের স্টক ০ হয়ে গেলে ফালতু টাকা খরচ হওয়া বন্ধ করতে
              <strong className="text-white"> সাথে সাথে অ্যাড বন্ধ করে দেয়!</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2.5 bg-white text-blue-900 rounded-xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>নতুন AI অ্যাড তৈরি করুন</span>
              </button>

              <button
                onClick={handleRunOptimizer}
                disabled={optimizing}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold backdrop-blur-md transition-all flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${optimizing ? "animate-spin" : ""}`} />
                <span>{optimizing ? "অ্যানালাইসিস হচ্ছে..." : "AI অপ্টিমাইজার রান করুন"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ad Metrics KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">মোট অ্যাড স্পেন্ড</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatBDT(totalSpend)}</h3>
              <p className="text-[11px] text-slate-400 mt-1">মেটা অ্যাডস অ্যাকাউন্ট সিঙ্কড</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">মোট পারচেজ (সেলস)</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{totalPurchases} টি</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">গড় ROAS: ৪.২x</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">সক্রিয় ক্যাম্পেইন</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{activeCount} টি</h3>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">২৪/৭ AI গার্ডে চালুকৃত</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">AI দ্বারা সুরক্ষিত / কিলড</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{killedCount} টি</h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">স্টক ০ বা বাজেট বাঁচানো হয়েছে</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">লাইভ বিজ্ঞাপন ক্যাম্পেইনসমূহ</h3>
              <p className="text-xs text-slate-500">
                AI স্বয়ংক্রিয়ভাবে স্টক লেভেল ও রিটার্ন রেট পর্যবেক্ষণ করছে।
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>CAPI Server-Side Tracking: Active</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">ক্যাম্পেইন নাম ও পণ্য</th>
                  <th className="p-3">দৈনিক বাজেট</th>
                  <th className="p-3">স্টক স্ট্যাটাস</th>
                  <th className="p-3">মোট খরচ</th>
                  <th className="p-3">সেলস / পারচেজ</th>
                  <th className="p-3">ROAS</th>
                  <th className="p-3">স্ট্যাটাস ও AI সিদ্ধান্ত</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      বিজ্ঞাপন লোড হচ্ছে...
                    </td>
                  </tr>
                ) : campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      কোনো অ্যাক্টিভ ক্যাম্পেইন নেই। ওপরের বাটনে ক্লিক করে নতুন অ্যাড তৈরি করুন।
                    </td>
                  </tr>
                ) : (
                  campaigns.map((camp) => {
                    const isKilled = camp.status === "KILLED_BY_AI";
                    const isZeroStock = camp.product.stock <= 0;

                    return (
                      <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{camp.campaignName}</span>
                          <span className="text-[11px] text-slate-500 block">{camp.product.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Platform: {camp.platform}</span>
                        </td>

                        <td className="p-3 font-semibold text-slate-800">
                          {formatBDT(camp.dailyBudget)} / দিন
                        </td>

                        <td className="p-3">
                          {isZeroStock ? (
                            <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-block">
                              স্টক শেষ (0)
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                              স্টক আছে ({camp.product.stock} টি)
                            </span>
                          )}
                        </td>

                        <td className="p-3 font-semibold text-slate-800">
                          {formatBDT(camp.totalSpend)}
                        </td>

                        <td className="p-3 font-semibold text-slate-800">
                          {camp.purchases} টি
                          <span className="block text-[10px] text-slate-400">
                            {camp.clicks} ক্লিক
                          </span>
                        </td>

                        <td className="p-3">
                          <span
                            className={`font-bold text-xs ${
                              camp.roas >= 3
                                ? "text-emerald-600"
                                : camp.roas > 0
                                ? "text-amber-600"
                                : "text-slate-400"
                            }`}
                          >
                            {camp.roas > 0 ? `${camp.roas.toFixed(2)}x` : "N/A"}
                          </span>
                        </td>

                        <td className="p-3">
                          {isKilled ? (
                            <div className="space-y-1">
                              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                                AI Auto-Paused
                              </span>
                              <p className="text-[10px] text-red-600 max-w-[200px] leading-tight">
                                {camp.killReason || "বাজেট অপচয় রোধে বন্ধ"}
                              </p>
                            </div>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Active (চলছে)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: 1-Click Launch AI Ad */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    ১-ক্লিকে AI অ্যাড পাবলিশ করুন
                  </h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateAd} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    কোন পণ্যের জন্য বিজ্ঞাপন চালাবেন?
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} - মূল্য: ৳{p.price} (স্টক: {p.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    প্রতিদিনের বাজেট (টাকা / BDT)
                  </label>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    min="300"
                    step="100"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="যেমন: 1000"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    বাজেট শেষ হওয়ার আগে বা স্টক ০ হয়ে গেলে AI নিজে অ্যাড বন্ধ করে দেবে।
                  </p>
                </div>

                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>AI স্বয়ংক্রিয়ভাবে যা যা তৈরি করবে:</span>
                  </span>
                  <ul className="text-[11px] text-indigo-800 space-y-0.5 list-disc list-inside">
                    <li>উচ্চ কনভার্টিং বাংলা প্রাইমারি সেলস কপি ও অফার টেক্সট</li>
                    <li>১% High-Value Lookalike Audience (যাঁরা অর্ডার নিয়ে রিটার্ন করে না)</li>
                    <li>Meta Graph API দিয়ে অটোমেটিক Campaign ও AdSet সেটআপ</li>
                  </ul>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{creating ? "বিজ্ঞাপন তৈরি হচ্ছে..." : "এখনই লঞ্চ করুন"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
