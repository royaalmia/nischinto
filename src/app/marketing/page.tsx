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
  const [activeTab, setActiveTab] = useState<"WHATSAPP" | "CAPI" | "FB_BRANDING">("WHATSAPP");

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

          <div className="flex flex-wrap gap-2 pt-2">
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
            <button
              onClick={() => setActiveTab("FB_BRANDING")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "FB_BRANDING"
                  ? "bg-white text-teal-950 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>FB পেজ ব্র্যান্ডিং ও বুস্টিং কিট</span>
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
        ) : activeTab === "CAPI" ? (
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
        ) : (
          <div className="space-y-6 animate-in fade-in">
            {/* Profile & Cover Download Section */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    অফিশিয়াল ফেসবুক পেজ প্রোফাইল ফটো ও কভার ব্যানার
                  </h3>
                  <p className="text-xs text-slate-500">
                    নিশ্চিন্ত ব্র্যান্ডিংয়ের জন্য হাই-রেজোলিউশন প্রোফাইল পিকচার এবং ডেস্কটপ ও মোবাইলের জন্য অপ্টিমাইজড ব্যানার
                  </p>
                </div>
                <a
                  href="/fb-assets/marketing-kit.html"
                  target="_blank"
                  className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl transition-all"
                >
                  ফুলস্ক্রিন মার্কেটিং কিট খুলুন ↗
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Photo */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      1:1 Square (1024x1024)
                    </span>
                    <div className="aspect-square w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                      <img src="/fb-assets/fb-profile-photo.jpg" alt="FB Profile Photo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a
                      href="/fb-assets/fb-profile-photo.jpg"
                      download="nishchinto-profile.jpg"
                      className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl text-center shadow-xs"
                    >
                      ডাউনলোড JPG
                    </a>
                    <a
                      href="/fb-assets/profile-picture.svg"
                      download="nishchinto-profile.svg"
                      className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl text-center hover:bg-slate-50"
                    >
                      ভেক্টর SVG
                    </a>
                  </div>
                </div>

                {/* Cover Banner */}
                <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      16:9 Landscape Banner (1640x624)
                    </span>
                    <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs">
                      <img src="/fb-assets/fb-cover-photo.jpg" alt="FB Cover Photo" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a
                      href="/fb-assets/fb-cover-photo.jpg"
                      download="nishchinto-cover.jpg"
                      className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl text-center shadow-xs"
                    >
                      ডাউনলোড কভার ব্যানার (Ultra HD)
                    </a>
                    <a
                      href="/fb-assets/cover-photo.svg"
                      download="nishchinto-cover.svg"
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl text-center hover:bg-slate-50"
                    >
                      ভেক্টর SVG ব্যানার
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Albums List */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900">
                  ফেসবুক পোস্ট ও বুস্টিং অ্যালবাম (৭টি আলাদা টপিক)
                </h3>
                <p className="text-xs text-slate-500">
                  প্রতিটি অ্যালবামের জন্য পয়েন্ট আকারে ফিচার ও রেডিমেড সেলস কপি তৈরি করা আছে
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "১. সেন্ট্রাল কুরিয়ার ফ্রড গার্ড ও রিটার্ন লস প্রতিরোধ",
                    sub: "Courier Fraud Guard & Return Prevention",
                    color: "border-red-200 bg-red-50/50",
                    badge: "bg-red-100 text-red-800",
                    desc: "ভুয়া অর্ডার ও সিরিয়াল রিটার্নকারীদের ক্রস-ম্যাচ করে ০-১০০% ফ্রড স্কোর ও রিকমেন্ডেশন।",
                  },
                  {
                    title: "২. সাবলীল বাংলা AI ভয়েস কলিং এজেন্ট",
                    sub: "Bangla Conversational AI Voice Calling Agent",
                    color: "border-teal-200 bg-teal-50/50",
                    badge: "bg-teal-100 text-teal-800",
                    desc: "কল সেন্টারের ৩-৪ জনের বেতন বাঁচিয়ে ০ সেকেন্ডে মিষ্টি বাংলা গলায় ১০০% অর্ডার কনফার্ম।",
                  },
                  {
                    title: "৩. AI অটো অ্যাড ম্যানেজার ও অটো স্টক-কিল",
                    sub: "Meta & TikTok Ad Autopilot with Auto Stock-Pause",
                    color: "border-indigo-200 bg-indigo-50/50",
                    badge: "bg-indigo-100 text-indigo-800",
                    desc: "স্টক ০ হওয়ার সাথে সাথে বিজ্ঞাপন অটো বন্ধ; বাজেট অপচয় শূন্যের কোঠায়।",
                  },
                  {
                    title: "৪. ওয়্যারহাউস বারকোড স্ক্যানার ও ১-ক্লিক কুরিয়ার",
                    sub: "Warehouse Barcode & 1-Click Steadfast/Pathao Dispatch",
                    color: "border-emerald-200 bg-emerald-50/50",
                    badge: "bg-emerald-100 text-emerald-800",
                    desc: "ভুল পণ্য যাওয়া বন্ধ এবং ১-ক্লিকে ১০০ পার্সেল Steadfast ও Pathao-তে বুকিং ও লেবেল প্রিন্ট।",
                  },
                  {
                    title: "৫. ইনকমপ্লিট অর্ডার ড্রপ-অফ ক্যাচার ও রিকভারি",
                    sub: "Incomplete Order & Abandoned Form Recovery",
                    color: "border-amber-200 bg-amber-50/50",
                    badge: "bg-amber-100 text-amber-800",
                    desc: "ফর্ম সাবমিট না করে কেটে দিলেও ডেটা ক্যাপচার এবং হোয়াটসঅ্যাপে না হওয়া সেলস উদ্ধার (+৩০%)।",
                  },
                  {
                    title: "৬. কাস্টম ল্যান্ডিং পেজ ও ১-পেজ ফাস্ট চেকআউট",
                    sub: "Custom Landing Page Builder & 1-Page COD Checkout",
                    color: "border-blue-200 bg-blue-50/50",
                    badge: "bg-blue-100 text-blue-800",
                    desc: "৩ মিনিটে কোনো কোডিং ছাড়াই হাই-কনভার্টিং ল্যান্ডিং পেজ ও ১-ক্লিক এইচটিএমএল কোড এক্সপোর্ট।",
                  },
                  {
                    title: "৭. আসল নিট লাভ-ক্ষতি ও ফিন্যান্সিয়াল হিসাব",
                    sub: "True Net Profit, COGS & Ad Spend Calculator",
                    color: "border-purple-200 bg-purple-50/50",
                    badge: "bg-purple-100 text-purple-800",
                    desc: "COGS, কুরিয়ার চার্জ ও ফেসবুক অ্যাড স্পেন্ড বাদ দিয়ে আপনার পকেটের আসল নিট লাভের হিসাব।",
                  },
                ].map((alb, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${alb.color} space-y-2`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-xs text-slate-900">{alb.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${alb.badge} shrink-0`}>
                        টপিক {i + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{alb.sub}</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{alb.desc}</p>
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
