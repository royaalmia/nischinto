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
            <div className="space-y-8">
              {/* Top Banner */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Globe className="w-4 h-4 text-teal-600" />
                  <span>ওয়েবসাইট ও ল্যান্ডিং পেজ কানেকশন গাইড</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  আপনার WooCommerce, Shopify বা যেকোনো কাস্টম HTML/Elementor ল্যান্ডিং পেজে কাস্টমার অর্ডার করার সাথে সাথে Nishchinto ড্যাশবোর্ডে অর্ডার সিঙ্ক হবে এবং স্বয়ংক্রিয় ফ্রড ভেরিফিকেশন সম্পন্ন হবে।
                </p>
              </div>

              {/* 1. WooCommerce Integration */}
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold">W</span>
                      <span>১. WordPress / WooCommerce অটো-সিঙ্ক Webhook</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      WordPress ড্যাশবোর্ডে গিয়ে <strong className="text-slate-700">WooCommerce &gt; Settings &gt; Advanced &gt; Webhooks &gt; Add Webhook</strong>-এ নিচের তথ্যগুলো বসান:
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    STATUS: ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Webhook Delivery URL (টপিক: Order created)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://nishchinto.app/api/webhooks/orders"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText("https://nishchinto.app/api/webhooks/orders");
                          setToastMessage("Webhook URL কপি করা হয়েছে!");
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Secret Key</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={webhookSecret}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(webhookSecret);
                          setToastMessage("Secret Key কপি করা হয়েছে!");
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Shopify Integration */}
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">S</span>
                    <span>২. Shopify Webhook Integration</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Shopify Admin &gt; Settings &gt; Notifications &gt; Webhooks-এ Event দিন <strong className="text-slate-700">Order creation</strong> এবং Format দিন <strong className="text-slate-700">JSON</strong>:
                  </p>
                </div>

                <div className="flex gap-2 text-xs">
                  <input
                    type="text"
                    readOnly
                    value="https://nishchinto.app/api/webhooks/orders"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText("https://nishchinto.app/api/webhooks/orders");
                      setToastMessage("Shopify Webhook URL কপি করা হয়েছে!");
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি</span>
                  </button>
                </div>
              </div>

              {/* 3. Custom Landing Page Snippet */}
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-cyan-100 text-cyan-700 flex items-center justify-center text-[10px] font-bold">&lt;/&gt;</span>
                      <span>৩. কাস্টম ল্যান্ডিং পেজ ফর্ম কোড (HTML / Elementor / PHP)</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      যেকোনো কাস্টম ল্যান্ডিং পেজে নিচের জাভাস্ক্রিপ্ট কোডটি পেস্ট করলে ফর্ম সাবমিট হওয়া মাত্রই রিয়েল-টাইম Nishchinto-তে অর্ডার তৈরি হয়ে যাবে:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const snippet = `<script>
document.querySelector('#order-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  await fetch('https://nishchinto.app/api/webhooks/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: formData.get('name'),
      customerPhone: formData.get('phone'),
      customerAddress: formData.get('address'),
      totalAmount: 1250,
      deliveryCharge: 80,
      source: 'CUSTOM_LANDING_PAGE'
    })
  });
  window.location.href = '/thank-you';
});
</script>`;
                      navigator.clipboard?.writeText(snippet);
                      setToastMessage("ল্যান্ডিং পেজ কোড স্নsnippet কপি করা হয়েছে!");
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>কোড কপি করুন</span>
                  </button>
                </div>

                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  <span className="text-slate-500">// ল্যান্ডিং পেজের চেকআউট ফর্মে এই কোডটি যুক্ত করুন</span><br/>
                  <span className="text-teal-400">fetch</span>(<span className="text-amber-300">&apos;https://nishchinto.app/api/webhooks/orders&apos;</span>, &#123;<br/>
                  &nbsp;&nbsp;method: <span className="text-amber-300">&apos;POST&apos;</span>,<br/>
                  &nbsp;&nbsp;headers: &#123; <span className="text-amber-300">&apos;Content-Type&apos;</span>: <span className="text-amber-300">&apos;application/json&apos;</span> &#125;,<br/>
                  &nbsp;&nbsp;body: JSON.stringify(&#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;customerName: <span className="text-amber-300">&apos;গ্রাহকের নাম&apos;</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;customerPhone: <span className="text-amber-300">&apos;01XXXXXXXXX&apos;</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;customerAddress: <span className="text-amber-300">&apos;গ্রাহকের ঠিকানা&apos;</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;totalAmount: <span className="text-purple-400">1250</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;source: <span className="text-amber-300">&apos;CUSTOM_LANDING_PAGE&apos;</span><br/>
                  &nbsp;&nbsp;&#125;)<br/>
                  &#125;);
                </div>
              </div>

              {/* 4. Live Test Order Button */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>সংযোগ পরীক্ষা করুন (Send Live Test Webhook Order)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    একটি ক্লিকেই আপনার ওয়েবসাইট থেকে Nishchinto-তে টেস্ট অর্ডার পাঠিয়ে ফ্রড ভেরিফিকেশন ও ট্র্যাকিং পরীক্ষা করুন।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setToastMessage("টেস্ট অর্ডার পাঠানো হচ্ছে...");
                      const res = await fetch("/api/webhooks/orders", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          customerName: "পরীক্ষামূলক ক্রেতা",
                          customerPhone: "01755123456",
                          customerAddress: "বাড়ি ১২, সেক্টর ৭, উত্তরা, ঢাকা",
                          totalAmount: 950,
                          deliveryCharge: 80,
                          source: "WEBHOOK_TEST",
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setToastMessage(`সংযোগ সফল! অর্ডার #${data.orderNumber} ড্যাশবোর্ডে সিঙ্ক হয়েছে (রিস্ক স্কোর: ${data.fraudScore}%)`);
                      } else {
                        setToastMessage("টেস্ট অর্ডার সম্পন্ন হয়নি। পুনরায় চেষ্টা করুন।");
                      }
                    } catch (e: any) {
                      setToastMessage("টেস্ট অর্ডারের সংযোগ ব্যর্থ হয়েছে।");
                    }
                    setTimeout(() => setToastMessage(null), 5000);
                  }}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                >
                  টেস্ট অর্ডার পাঠান
                </button>
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
