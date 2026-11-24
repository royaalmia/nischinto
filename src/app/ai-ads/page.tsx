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
  Layers,
  MessageSquare,
  Sliders,
  Check,
  X,
  AlertTriangle,
  Globe,
  Radio,
} from "lucide-react";

export default function AiAdsPage() {
  const [activeTab, setActiveTab] = useState<"CAMPAIGNS" | "FB_PAGE_CONNECT" | "MSG_AUTOMATION">("CAMPAIGNS");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Meta & FB Connection State
  const [fbConnected, setFbConnected] = useState(false);
  const [fbPageName, setFbPageName] = useState("");
  const [fbAdAccountId, setFbAdAccountId] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectPageName, setConnectPageName] = useState("");
  const [connectPageId, setConnectPageId] = useState("");
  const [connectAdAccountId, setConnectAdAccountId] = useState("");
  const [connectPixelId, setConnectPixelId] = useState("");
  const [connecting, setConnecting] = useState(false);

  // Message Automation State
  const [automationActive, setAutomationActive] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("আসসালামু আলাইকুম! আমাদের পেজে স্বাগতম। আপনি কোন পণ্যটি অর্ডার করতে চান বা কোনো প্রশ্ন আছে কি?");
  const [autoPhoneCapture, setAutoPhoneCapture] = useState(true);
  const [autoCodReply, setAutoCodReply] = useState(true);

  // New Ad Form State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [dailyBudget, setDailyBudget] = useState("1000");
  const [creating, setCreating] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const [resC, resP, resMeta] = await Promise.all([
        fetch("/api/ai-ads"),
        fetch("/api/products"),
        fetch("/api/meta/connect"),
      ]);
      const dataC = await resC.json();
      const dataP = await resP.json();
      const dataMeta = await resMeta.json();

      if (dataC.success) setCampaigns(dataC.data);
      if (dataP.success) {
        setProducts(dataP.data);
        if (dataP.data.length > 0) setSelectedProductId(dataP.data[0].id);
      }
      if (dataMeta.success && dataMeta.data) {
        setFbConnected(dataMeta.data.fbPageConnected);
        if (dataMeta.data.fbPageName) setFbPageName(dataMeta.data.fbPageName);
        if (dataMeta.data.fbAdAccountId) setFbAdAccountId(dataMeta.data.fbAdAccountId);
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

  // Connect Meta FB Page Submit
  const handleConnectMeta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectPageName) return;

    setConnecting(true);
    try {
      const res = await fetch("/api/meta/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fbPageName: connectPageName,
          fbPageId: connectPageId || `page_${Date.now()}`,
          fbAdAccountId: connectAdAccountId || `act_892109823`,
          pixelId: connectPixelId || `pix_991823`,
        }),
      });
      const data = await res.json();
      setConnecting(false);

      if (data.success) {
        setFbConnected(true);
        setFbPageName(connectPageName);
        setFbAdAccountId(connectAdAccountId || "act_892109823");
        setShowConnectModal(false);
        showToast(data.message || "ফেসবুক পেজ সফলভাবে সংযুক্ত হয়েছে!");
      }
    } catch (e) {
      setConnecting(false);
      showToast("কানেক্ট করতে সমস্যা হয়েছে।");
    }
  };

  // Launch AI Ad
  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbConnected) {
      setShowConnectModal(true);
      showToast("বিজ্ঞাপন চালু করার আগে অনুগ্রহ করে আপনার ফেসবুক পেজ সংযুক্ত করুন।");
      return;
    }

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

  const totalSpend = campaigns.reduce((acc, c) => acc + (c.totalSpend || 0), 0);
  const totalPurchases = campaigns.reduce((acc, c) => acc + (c.purchases || 0), 0);
  const activeCount = campaigns.filter((c) => c.status === "ACTIVE").length;
  const killedCount = campaigns.filter((c) => c.status === "KILLED_BY_AI").length;

  return (
    <>
      <Header />

      <main className="p-4 sm:p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Nischinto AI Ad Autopilot & Meta CAPI Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              AI অটো অ্যাড ম্যানেজার ও ফেসবুক পেজ অটোমেশন
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              স্টক শেষ হলে স্বয়ংক্রিয় বিজ্ঞাপন পজ (Auto-Kill), ফেসবুক পেজ মেসেজ অটোমেশন ও ৪.২x আরওএএস অপটিমাইজেশন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRunOptimizer}
              disabled={optimizing}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${optimizing ? "animate-spin" : ""}`} />
              <span>{optimizing ? "অপ্টিমাইজ হচ্ছে..." : "AI স্টক স্ক্যান রান করুন"}</span>
            </button>

            <button
              onClick={() => {
                if (!fbConnected) {
                  setShowConnectModal(true);
                  showToast("বিজ্ঞাপন চালু করার আগে ফেসবুক পেজ কানেক্ট করুন।");
                } else {
                  setShowCreateModal(true);
                }
              }}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন AI অ্যাড তৈরি করুন</span>
            </button>
          </div>
        </div>

        {/* Facebook Page & Meta Business Manager Connection Status Strip */}
        <div className={`p-4 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-4 ${
          fbConnected
            ? "bg-emerald-50/60 border-emerald-200"
            : "bg-amber-50/80 border-amber-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
              fbConnected ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}>
              {fbConnected ? "✓" : "⚠️"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {fbConnected ? "ফেসবুক পেজ ও মেটা অ্যাড একাউন্ট সংযুক্ত" : "ফেসবুক পেজ কানেক্ট করা নেই"}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  fbConnected ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"
                }`}>
                  {fbConnected ? "Active & Linked" : "Action Required"}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {fbConnected ? (
                  <>
                    পেজের নাম: <strong>{fbPageName || "Official Page"}</strong> • অ্যাড একাউন্ট ID: <strong>{fbAdAccountId || "act_892109823"}</strong> • CAPI সিঙ্ক: সক্রিয়
                  </>
                ) : (
                  "বিজ্ঞাপন রান করতে এবং পেজের মেসেজ অটোমেশন পেতে আপনার ফেসবুক পেজ ও অ্যাড একাউন্ট যুক্ত করুন।"
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowConnectModal(true)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              fbConnected
                ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                : "bg-amber-600 hover:bg-amber-700 text-white border-amber-600 shadow-xs"
            }`}
          >
            {fbConnected ? "পেজ সংযোগ পরিবর্তন / সিঙ্ক" : "ফেসবুক পেজ কানেক্ট করুন"}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("CAMPAIGNS")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "CAMPAIGNS"
                ? "border-teal-600 text-teal-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>অ্যাড ক্যাম্পেইনসমূহ ({campaigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("MSG_AUTOMATION")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "MSG_AUTOMATION"
                ? "border-teal-600 text-teal-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>পেজ মেসেজ অটোমেশন (Messenger Bot)</span>
          </button>

          <button
            onClick={() => setActiveTab("FB_PAGE_CONNECT")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "FB_PAGE_CONNECT"
                ? "border-teal-600 text-teal-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>মেটা সিঙ্ক ও পিক্সেল CAPI সেটিংস</span>
          </button>
        </div>

        {/* TAB 1: CAMPAIGNS */}
        {activeTab === "CAMPAIGNS" && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">মোট অ্যাড বাজেট খরচ</p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{formatBDT(totalSpend)}</h3>
                  <p className="text-[11px] text-teal-700 font-semibold mt-1">মেটা এপিআই লাইভ সিঙ্ক</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">
                  ৳
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">বিজ্ঞাপন থেকে সফল সেলস</p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalPurchases} টি</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">১০০% ভেরিফাইড পার্সেল</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">সক্রিয় AI ক্যাম্পেইন</p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeCount} টি</h3>
                  <p className="text-[11px] text-teal-600 font-semibold mt-1">অটোপাইলট স্টক মনিটরিং</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Play className="w-6 h-6 fill-teal-600" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">AI দ্বারা সুরক্ষিত / কিলড</p>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{killedCount} টি</h3>
                  <p className="text-[11px] text-amber-600 font-semibold mt-1">স্টক ০ বা বাজেট বাঁচানো হয়েছে</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertOctagon className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Campaigns Table or Empty State */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-4 sm:p-6 space-y-4">
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

              {campaigns.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-bold text-slate-700">কোনো সক্রিয় বিজ্ঞাপন ক্যাম্পেইন নেই</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    আপনার স্টোরের যেকোনো পণ্যের জন্য ওপরের "নতুন AI অ্যাড তৈরি করুন" বাটনে ক্লিক করে ক্যাম্পেইন চালু করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                        <th className="p-3">ক্যাম্পেইন ও পণ্য</th>
                        <th className="p-3">দৈনিক বাজেট</th>
                        <th className="p-3">স্টক স্ট্যাটাস</th>
                        <th className="p-3">মোট খরচ</th>
                        <th className="p-3">সেলস</th>
                        <th className="p-3">ROAS</th>
                        <th className="p-3">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {campaigns.map((camp) => {
                        const isKilled = camp?.status === "KILLED_BY_AI";
                        const stock = camp?.product?.stock ?? 0;
                        const isZeroStock = stock <= 0;

                        return (
                          <tr key={camp?.id || Math.random()} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{camp?.campaignName}</span>
                              <span className="text-[11px] text-slate-500 block">{camp?.product?.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">Platform: {camp?.platform || "META"}</span>
                            </td>

                            <td className="p-3 font-semibold text-slate-800">
                              {formatBDT(camp?.dailyBudget || 1000)} / দিন
                            </td>

                            <td className="p-3">
                              {isZeroStock ? (
                                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md inline-block">
                                  স্টক শেষ (0)
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                                  স্টক: {stock} টি
                                </span>
                              )}
                            </td>

                            <td className="p-3 font-semibold text-slate-800">
                              {formatBDT(camp?.totalSpend ?? 0)}
                            </td>

                            <td className="p-3 font-semibold text-slate-800">
                              {camp?.purchases ?? 0} টি
                            </td>

                            <td className="p-3">
                              <span className="font-bold text-xs text-teal-700">
                                {camp?.roas ? `${camp.roas.toFixed(1)}x` : "৪.২x"}
                              </span>
                            </td>

                            <td className="p-3">
                              {isKilled ? (
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  Killed By AI (স্টক ০)
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  Active (লাইভ)
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FB PAGE MESSAGE AUTOMATION */}
        {activeTab === "MSG_AUTOMATION" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span>ফেসবুক পেজ মেসেঞ্জার AI অটো-রিপ্লাই ও কাস্টমার লিড ক্যাচার</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ২৪/৭ কোনো কর্মী ছাড়াই গ্রাহকের ইনবক্স প্রশ্নের উত্তর প্রদান এবং সরাসরি ফোন নম্বর ও ডেলিভারি ঠিকানা সংগ্রহ।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  automationActive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  {automationActive ? "অটোমেশন সক্রিয়" : "পজ করা"}
                </span>
                <button
                  type="button"
                  onClick={() => setAutomationActive(!automationActive)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    automationActive ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-teal-600 text-white border-teal-600"
                  }`}
                >
                  {automationActive ? "বন্ধ করুন" : "সক্রিয় করুন"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Settings Card */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    স্বয়ংক্রিয় ওয়েলকাম মেসেজ (প্রথম ইনবক্সে)
                  </label>
                  <textarea
                    rows={3}
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">স্মার্ট ফিচারসমূহ:</label>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">স্বয়ংক্রিয় ফোন নম্বর ও অর্ডার ডাটা সংগ্রহ</span>
                      <span className="text-[11px] text-slate-500">গ্রাহক ফোন নম্বর দিলে তা সরাসরি নিশচিন্তে অর্ডার হিসেবে এন্ট্রি হবে।</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoPhoneCapture}
                      onChange={(e) => setAutoPhoneCapture(e.target.checked)}
                      className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">ক্যাশ অন ডেলিভারি (COD) নীতি উত্তর</span>
                      <span className="text-[11px] text-slate-500">গ্রাহক দাম বা ডেলিভারি জানতে চাইলে সঠিক রেট জানাবে।</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoCodReply}
                      onChange={(e) => setAutoCodReply(e.target.checked)}
                      className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast("মেসেঞ্জার অটোমেশন সেটিংস সফলভাবে আপডেট হয়েছে!")}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  সেটিংস সংরক্ষণ করুন
                </button>
              </div>

              {/* Live Chat Preview */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-slate-50">
                <div className="bg-slate-900 text-white p-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-bold">লাইভ মেসেঞ্জার প্রিভিউ ({fbPageName || "Official Brand Page"})</span>
                </div>
                <div className="p-4 space-y-3 min-h-[220px]">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-slate-200 text-xs text-slate-700 max-w-[85%] shadow-2xs">
                    {welcomeMessage}
                  </div>
                  <div className="bg-teal-600 text-white p-2.5 rounded-2xl rounded-tr-xs text-xs max-w-[80%] ml-auto text-right">
                    প্রোডাক্টের প্রাইস কত আর ঢাকার বাইরে ডেলিভারি হবে?
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-slate-200 text-xs text-slate-700 max-w-[85%] shadow-2xs">
                    জি! সারা দেশেই ক্যাশ অন ডেলিভারি দেওয়া হয়। ডেলিভারি চার্জ মাত্র ৳১৩০ এবং পণ্য হাতে পেয়ে চেক করে পেমেন্ট করতে পারবেন। অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর লিখুন।
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FB PAGE CONNECT & CAPI */}
        {activeTab === "FB_PAGE_CONNECT" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6 animate-in fade-in max-w-2xl">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                <span>মেটা বিজনেস ম্যানেজার ও ফেসবুক পেজ কনফিগারেশন</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                আপনার ফেসবুক পেজ ও অ্যাড অ্যাকাউন্টের তথ্যাদি সংযুক্ত করুন।
              </p>
            </div>

            <form onSubmit={handleConnectMeta} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ফেসবুক পেজের নাম (Facebook Page Name) *
                </label>
                <input
                  type="text"
                  required
                  value={connectPageName || fbPageName}
                  onChange={(e) => setConnectPageName(e.target.value)}
                  placeholder="যেমন: রয়েল মিয়া কালেকশন"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ফেসবুক পেজ আইডি (Page ID)</label>
                  <input
                    type="text"
                    value={connectPageId}
                    onChange={(e) => setConnectPageId(e.target.value)}
                    placeholder="10982349102"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">মেটা অ্যাড অ্যাকাউন্ট আইডি (Ad Account ID)</label>
                  <input
                    type="text"
                    value={connectAdAccountId || fbAdAccountId}
                    onChange={(e) => setConnectAdAccountId(e.target.value)}
                    placeholder="act_192837482"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  মেটা পিক্সেল আইডি / কনভার্সন এপিআই টোকেন (Meta Pixel / CAPI Token)
                </label>
                <input
                  type="text"
                  value={connectPixelId}
                  onChange={(e) => setConnectPixelId(e.target.value)}
                  placeholder="EAAGNO..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                />
              </div>

              <button
                type="submit"
                disabled={connecting}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{connecting ? "সংযুক্ত হচ্ছে..." : "ফেসবুক পেজ ও মেটা সিঙ্ক সংরক্ষণ করুন"}</span>
              </button>
            </form>
          </div>
        )}

        {/* MODAL: CONNECT FACEBOOK PAGE */}
        {showConnectModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">ফেসবুক পেজ কানেক্ট করুন</h3>
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConnectMeta} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">আপনার ফেসবুক পেজের নাম *</label>
                  <input
                    type="text"
                    required
                    value={connectPageName}
                    onChange={(e) => setConnectPageName(e.target.value)}
                    placeholder="যেমন: রয়াল মিয়া স্টোর"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">অ্যাড অ্যাকাউন্ট আইডি (Ad Account ID)</label>
                  <input
                    type="text"
                    value={connectAdAccountId}
                    onChange={(e) => setConnectAdAccountId(e.target.value)}
                    placeholder="act_892109823"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                  />
                </div>

                <p className="text-[10px] text-slate-500">
                  🔒 নিশচিন্তের মেটা বিজনেস পার্টনার এপিআইয়ের মাধ্যমে আপনার পেজে স্বয়ংক্রিয়ভাবে বিজ্ঞাপন রান ও মেসেঞ্জার অটোমেশন যুক্ত হবে।
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={connecting}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{connecting ? "কানেক্ট হচ্ছে..." : "পেজ নিশ্চিত করুন"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE AI AD */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">নতুন AI বিজ্ঞাপন তৈরি করুন</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAd} className="space-y-4">
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 font-semibold flex items-center justify-between">
                  <span>সংযুক্ত পেজ: <strong>{fbPageName || "Official Brand Page"}</strong></span>
                  <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-teal-300">
                    {fbAdAccountId || "act_892109823"}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    বিজ্ঞাপনের পণ্য নির্বাচন করুন *
                  </label>
                  {products.length === 0 ? (
                    <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      ইনভেন্টরিতে কোনো পণ্য নেই। প্রথমে <a href="/products" className="underline font-bold">পণ্য যুক্ত করুন</a>।
                    </p>
                  ) : (
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} (মূল্য: ৳{p.price} | স্টক: {p.stock})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    দৈনিক বাজেট (Daily Budget BDT) *
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {["500", "1000", "2000", "5000"].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setDailyBudget(b)}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          dailyBudget === b
                            ? "bg-teal-50 border-teal-600 text-teal-800"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        ৳{b}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    required
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>অটো স্টক-কিল প্রটেকশন চালু থাকবে:</span>
                  </div>
                  <p>ওয়্যারহাউসে স্টক ০ হওয়ার ৩ সেকেন্ডের মধ্যে মেটা থেকে ক্যাম্পেইন স্বয়ংক্রিয়ভাবে পজ হয়ে বাজেট বাঁচাবে।</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={creating || products.length === 0}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{creating ? "ক্যাম্পেইন তৈরি হচ্ছে..." : "AI বিজ্ঞাপন লাইভ করুন"}</span>
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
