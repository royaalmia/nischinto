"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  Settings,
  Key,
  Truck,
  Sparkles,
  MessageSquare,
  Globe,
  Save,
  CheckCircle2,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"COURIER" | "META" | "STORE">("COURIER");

  // Courier Keys
  const [steadfastApiKey, setSteadfastApiKey] = useState("sf_live_key_9876543210");
  const [steadfastSecret, setSteadfastSecret] = useState("sf_secret_token_abcdef");
  const [pathaoClientId, setPathaoClientId] = useState("pathao_client_id_456");
  const [pathaoSecret, setPathaoSecret] = useState("pathao_client_secret_xyz");

  // Meta Keys
  const [pixelId, setPixelId] = useState("982347109283741");
  const [capiToken, setCapiToken] = useState("EAAQ...meta_conversions_api_live_token");

  // Store Webhook
  const [webhookUrl] = useState("https://api.nishchinto.app/v1/webhooks/woocommerce");
  const [webhookSecret] = useState("nsh_whsec_99182374619");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("সেটিংস সফলভাবে সংরক্ষিত এবং এপিআই সংযোগ আপডেট হয়েছে!");
    setTimeout(() => setToastMessage(null), 4000);
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
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-400/20">
            <Settings className="w-3.5 h-3.5 text-teal-400" />
            <span>সিস্টেম ও এপিআই কনফিগারেশন</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            ইন্টিগ্রেশন ও সেটিংস হাব
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            আপনার Steadfast, Pathao, ফেসবুক পিক্সেল এবং WooCommerce স্টোরের API ক্রেডেনশিয়াল যুক্ত করুন। একবার কানেক্ট করলেই সকল অটোমেশন ব্যাকগ্রাউন্ডে নিরবচ্ছিন্নভাবে চলতে থাকবে।
          </p>

          <div className="flex gap-2 pt-2">
            {[
              { id: "COURIER", label: "কুরিয়ার এপিআই (Steadfast & Pathao)" },
              { id: "META", label: "মেটা CAPI ও ফেসবুক পিক্সেল" },
              { id: "STORE", label: "WooCommerce / Shopify ওয়েবহুক" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-teal-950 shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Forms */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          {activeTab === "COURIER" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Steadfast Courier Integration</h3>
                <p className="text-xs text-slate-500">
                  Steadfast মার্চেন্ট প্যানেল (portal.steadfast.com.bd) থেকে API Key সংগ্রহ করুন
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Steadfast API Key</label>
                  <input
                    type="text"
                    value={steadfastApiKey}
                    onChange={(e) => setSteadfastApiKey(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Steadfast Secret Key</label>
                  <input
                    type="password"
                    value={steadfastSecret}
                    onChange={(e) => setSteadfastSecret(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="font-bold text-base text-slate-900">Pathao Courier Integration</h3>
                <p className="text-xs text-slate-500">Pathao Developer পোর্টাল থেকে Client ID সংগ্রহ করুন</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pathao Client ID</label>
                  <input
                    type="text"
                    value={pathaoClientId}
                    onChange={(e) => setPathaoClientId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pathao Client Secret</label>
                  <input
                    type="password"
                    value={pathaoSecret}
                    onChange={(e) => setPathaoSecret(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "META" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Facebook Conversions API & Pixel</h3>
                <p className="text-xs text-slate-500">
                  ব্রাউজার কুকি ছাড়া সরাসরি সার্ভার থেকে মেটার কাছে পারচেজ ডেটা পাঠাতে পিক্সেল ও টোকেন বসান
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Meta Pixel ID</label>
                  <input
                    type="text"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CAPI Access Token (Server-Side)</label>
                  <input
                    type="password"
                    value={capiToken}
                    onChange={(e) => setCapiToken(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "STORE" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">WordPress / WooCommerce Webhook Setup</h3>
                <p className="text-xs text-slate-500">
                  আপনার ওয়ার্ডপ্রেস সাইটের WooCommerce Settings &gt; Advanced &gt; Webhooks-এ নিচের URL টি পেস্ট করুন:
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Webhook Delivery URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={webhookUrl}
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => alert("কপি করা হয়েছে: " + webhookUrl)}
                      className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Secret Key</label>
                  <input
                    type="text"
                    readOnly
                    value={webhookSecret}
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>সেটিংস সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
