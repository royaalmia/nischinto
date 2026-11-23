"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  MessageSquare,
  Sparkles,
  Send,
  Zap,
  CheckCircle2,
  Users,
  ShieldCheck,
  RefreshCw,
  Activity,
  Layers,
} from "lucide-react";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"WHATSAPP" | "CAPI">("WHATSAPP");

  // Broadcast Form State
  const [targetGroup, setTargetGroup] = useState("DELIVERED_CUSTOMERS");
  const [templateName, setTemplateName] = useState("SPECIAL_OFFER_DISCOUNT");
  const [customOffer, setCustomOffer] = useState("স্পেশাল ২০% ছাড় ও ফ্রি ডেলিভারি!");
  const [sending, setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast("হোয়াটসঅ্যাপ ব্রডকাস্ট ক্যাম্পেইন সফলভাবে শিডিউল করা হয়েছে!");
    }, 1000);
  };

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

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>অফিশিয়াল WhatsApp Cloud API ও মেটা CAPI</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            WhatsApp ও SMS মার্কেটিং এবং সার্ভার-সাইড ট্র্যাকিং (CAPI)
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            ব্রাউজার কুকি ব্লক থাকলেও সরাসরি সার্ভার থেকে ফেসবুকের কাছে আসল ক্রেতাদের ডেটা পাঠায়। এছাড়া পুরনো হাজার হাজার কাস্টমারের কাছে ব্যক্তিগত নামসহ অফার মেসেজ পাঠিয়ে বাড়তি সেলস জেনারেট করুন।
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveTab("WHATSAPP")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "WHATSAPP"
                  ? "bg-white text-teal-950 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              বাল্ক WhatsApp ও SMS ব্রডকাস্ট
            </button>
            <button
              onClick={() => setActiveTab("CAPI")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "CAPI"
                  ? "bg-white text-teal-950 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Facebook CAPI সার্ভার ট্র্যাকিং
            </button>
          </div>
        </div>

        {activeTab === "WHATSAPP" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  নতুন WhatsApp ব্রডকাস্ট ক্যাম্পেইন তৈরি করুন
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  অফিশিয়াল মেটা অনুমোদিত টেমপ্লেট দিয়ে ১-ক্লিকে হাজার কাস্টমারকে পাঠান
                </p>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    কাদের কাছে পাঠাবেন (অডিয়েন্স গ্রুপ)
                  </label>
                  <select
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="DELIVERED_CUSTOMERS">
                      সফল ক্রেতাগণ (যাঁরা পার্সেল ডেলিভারি নিয়েছেন - ৩,৪৫০ জন)
                    </option>
                    <option value="ABANDONED_CART">
                      ইনকমপ্লিট / ড্রপ-অফ কার্ট (গত ৭ দিনে ফর্ম কেটে বের হওয়া - ১৮২ জন)
                    </option>
                    <option value="HIGH_VALUE_VIP">
                      ভিআইপি কাস্টমার (২টির বেশি সফল অর্ডার দেওয়া - ৭২০ জন)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    অফার ও মেসেজ বিস্তারিত
                  </label>
                  <input
                    type="text"
                    value={customOffer}
                    onChange={(e) => setCustomOffer(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                {/* Message Live Preview */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="text-[11px] font-bold text-emerald-900 block">
                    হোয়াটসঅ্যাপ মেসেজ লাইভ প্রিভিউ:
                  </span>
                  <div className="p-3 bg-white rounded-xl shadow-sm text-xs text-slate-800 leading-relaxed font-sans max-w-md">
                    <p>আসসালামু আলাইকুম <strong>তানভীর আহমেদ</strong> ভাই! 👋</p>
                    <p className="mt-1">
                      নিশ্চিন্ত শপ থেকে আপনার জন্য একটি বিশেষ সারপ্রাইজ: <strong>{customOffer}</strong>।
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      অফারটি গ্রহণ করতে সরাসরি এই মেসেজে রিপ্লাই দিন অথবা আমাদের ওয়েবসাইটে ভিজিট করুন।
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? "মেসেজ পাঠানো হচ্ছে..." : "এখনই ব্রডকাস্ট ক্যাম্পেইন পাঠান"}</span>
                </button>
              </form>
            </div>

            {/* Campaign Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">ক্যাম্পেইন ডেলিভারি স্ট্যাটাস</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-600">মোট ডেলিভার্ড মেসেজ</span>
                    <span className="text-sm font-bold text-slate-900">১২,৮৪০ টি</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-600">মেসেজ ওপেন রেট (Read Rate)</span>
                    <span className="text-sm font-bold text-emerald-600">৯৬.২%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-600">সরাসরি অর্ডার কনভার্সন</span>
                    <span className="text-sm font-bold text-teal-600">৳ ২,৪৫,০০০</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CAPI Tab */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Facebook Conversions API (CAPI) লাইভ সার্ভার গেটওয়ে
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  iOS 14+ এবং ব্রাউজার অ্যাড-ব্লকার এড়িয়ে সরাসরি Nischinto সার্ভার থেকে মেটার কাছে ইভেন্ট পাঠানো হচ্ছে।
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>ইভেন্ট ম্যাচ কোয়ালিটি: ৯.৪ / ১০ (চমৎকার)</span>
              </div>
            </div>

            {/* Live Event Stream */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">লাইভ ইভেন্ট স্ট্রিম (সর্বশেষ পাঠানো ডেটা):</span>
              <div className="space-y-2">
                {[
                  {
                    event: "Purchase",
                    order: "NSH-1001",
                    value: "৳ 1,530",
                    status: "Delivered & Deduplicated",
                    time: "২ মিনিট আগে",
                  },
                  {
                    event: "AddToCart",
                    order: "NSH-1002",
                    value: "৳ 1,380",
                    status: "Server-side matched",
                    time: "১২ মিনিট আগে",
                  },
                  {
                    event: "InitiateCheckout",
                    order: "INCOMP-8821",
                    value: "৳ 770",
                    status: "Phone hashed & synced",
                    time: "৩৫ মিনিট আগে",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <div>
                        <span className="font-bold text-slate-900">{item.event}</span>
                        <span className="text-slate-400 font-mono ml-2">({item.order})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-slate-700">{item.value}</span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-medium">
                        {item.status}
                      </span>
                      <span className="text-slate-400 text-[11px]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
