"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import {
  Globe,
  Plus,
  Copy,
  ExternalLink,
  Download,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Trash2,
  Eye,
  FileCode,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface LandingPageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  offerPrice: number;
  deliveryChargeInside: number;
  deliveryChargeOutside: number;
  imageUrl: string;
  features: string[];
  ordersCount: number;
  conversionRate: string;
}

const initialLandingPages: LandingPageItem[] = [
  {
    id: "1",
    slug: "ultra-watch",
    title: "স্মার্ট আল্ট্রা ওয়াচ সিরিজ ৯ (প্রিমিয়াম এডিশন)",
    subtitle: "🔥 সীমিত সময়ের মেগা অফার! সম্পূর্ণ পানিরোধক ও ব্লুটুথ কলিং স্মার্টওয়াচ ৫০% ডিসকাউন্টে সংগ্রহ করুন।",
    originalPrice: 3200,
    offerPrice: 1650,
    deliveryChargeInside: 70,
    deliveryChargeOutside: 130,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    features: [
      "১০০% অরিজিনাল অ্যামোলেড ডিসপ্লে ও ওয়াটারপ্রুফ বডি",
      "সরাসরি ব্লুটুথ কলিং, নোটিফিকেশন ও হেলথ ট্র্যাকিং",
      "পণ্য হাতে পেয়ে পুরোপুরি চেক করে পেমেন্ট করার নিশ্চয়তা",
      "৭ দিনের তাৎক্ষণিক ক্যাশ-ব্যাক বা রিপ্লেসমেন্ট গ্যারান্টি",
    ],
    ordersCount: 142,
    conversionRate: "14.8%",
  },
  {
    id: "2",
    slug: "premium-panjabi",
    title: "প্রিমিয়াম ডিজাইনার পিওর কটন পাঞ্জাবি",
    subtitle: "✨ এক্সক্লুসিভ কালেকশন! প্রিমিয়াম ১০০% সুতি কাপড়ে আরামদায়ক ফিটিং ও আকর্ষণীয় এমব্রয়ডারি ওয়ার্ক।",
    originalPrice: 2800,
    offerPrice: 1450,
    deliveryChargeInside: 70,
    deliveryChargeOutside: 130,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    features: [
      "১০০% প্রিমিয়াম কম্বড কটন ফেব্রিক—গরমে সর্বোচ্চ আরামদায়ক",
      "কালার ও সুতার নিখুঁত স্থায়িত্বের ১০০% কালার গ্যারান্টি",
      "সারা দেশে দ্রুত হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা",
      "পছন্দ না হলে কোনো চার্জ ছাড়াই ফেরত দেওয়ার সুযোগ",
    ],
    ordersCount: 89,
    conversionRate: "16.2%",
  },
];

export default function LandingPagesCockpit() {
  const [pages, setPages] = useState<LandingPageItem[]>(initialLandingPages);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New Landing Page Form State
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState(2500);
  const [offerPrice, setOfferPrice] = useState(1350);
  const [deliveryChargeInside, setDeliveryChargeInside] = useState(70);
  const [deliveryChargeOutside, setDeliveryChargeOutside] = useState(130);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80");
  const [featuresText, setFeaturesText] = useState(
    "১০০% অরিজিনাল কোয়ালিটি নিশ্চিত\nপণ্য হাতে পেয়ে চেক করে পেমেন্ট করার সুবিধা\nসারা দেশে দ্রুত ক্যাশ অন ডেলিভারি\n৭ দিনের সহজ রিটার্ন পলিসি"
  );

  // Load any previously saved pages from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("merchant_landing_pages");
      if (stored) {
        try {
          setPages(JSON.parse(stored));
        } catch (e) {}
      }
    }
  }, []);

  const handleCopyUrl = (itemSlug: string) => {
    const fullUrl = `${window.location.origin}/p/${itemSlug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(itemSlug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleCreateLandingPage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-") || "offer-" + Date.now();
    const feats = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);

    const newPage: LandingPageItem = {
      id: String(Date.now()),
      slug: cleanSlug,
      title: title || "প্রিমিয়াম প্রোডাক্ট অফার",
      subtitle: subtitle || "🔥 সীমিত সময়ের জন্য আকর্ষণীয় বিশেষ ছাড়! এখনই অর্ডার করুন।",
      originalPrice: Number(originalPrice) || 2000,
      offerPrice: Number(offerPrice) || 1200,
      deliveryChargeInside: Number(deliveryChargeInside) || 70,
      deliveryChargeOutside: Number(deliveryChargeOutside) || 130,
      imageUrl,
      features: feats.length ? feats : ["১০০% প্রিমিয়াম কোয়ালিটি নিশ্চিত", "ক্যাশ অন ডেলিভারি সুবিধা"],
      ordersCount: 0,
      conversionRate: "0.0%",
    };

    const updated = [newPage, ...pages];
    setPages(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("merchant_landing_pages", JSON.stringify(updated));
      localStorage.setItem(`landing_${cleanSlug}`, JSON.stringify(newPage));
    }

    setShowCreateModal(false);
    // Reset form
    setSlug("");
    setTitle("");
    setSubtitle("");
  };

  // Download Standalone Ready-to-use HTML code
  const handleDownloadStandaloneHTML = (item: LandingPageItem) => {
    const htmlCode = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title} | অর্ডার করুন</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; font-family: 'Hind Siliguri', sans-serif; margin: 0; padding: 0; }
    body { background-color: #f8fafc; color: #0f172a; line-height: 1.5; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .top-strip { background: linear-gradient(to right, #dc2626, #d97706); color: white; text-align: center; padding: 8px 12px; font-weight: bold; font-size: 13px; }
    .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .hero-title { font-size: 26px; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 8px; }
    .hero-sub { font-size: 14px; color: #475569; text-align: center; margin-bottom: 20px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; }
    @media (max-width: 640px) { .grid-2 { grid-template-columns: 1fr; } }
    .img-box img { width: 100%; border-radius: 16px; object-fit: cover; }
    .price-box { background: #f0fdfa; border: 1px solid #ccfbf1; padding: 14px; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .old-price { font-size: 12px; color: #64748b; text-decoration: line-through; }
    .curr-price { font-size: 26px; font-weight: 800; color: #0f766e; }
    .badge { background: #0d9488; color: white; padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: bold; }
    .features { list-style: none; margin-bottom: 16px; }
    .features li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; margin-bottom: 8px; }
    .features li::before { content: "✓"; color: #0d9488; font-weight: bold; }
    .checkout-box { border: 2px solid #0d9488; border-radius: 20px; padding: 24px; background: white; }
    .checkout-title { text-align: center; font-size: 20px; font-weight: 800; margin-bottom: 4px; }
    .checkout-sub { text-align: center; font-size: 12px; color: #64748b; margin-bottom: 18px; }
    .form-group { margin-bottom: 14px; }
    .form-group label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 4px; color: #334155; }
    .form-group input, .form-group textarea { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; outline: none; }
    .form-group input:focus, .form-group textarea:focus { border-color: #0d9488; }
    .zones { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .zone-btn { padding: 10px; border: 1px solid #cbd5e1; border-radius: 10px; background: #f8fafc; cursor: pointer; text-align: left; font-size: 12px; font-weight: bold; }
    .zone-btn.active { border-color: #0d9488; background: #f0fdfa; color: #0f766e; }
    .order-btn { width: 100%; padding: 14px; background: #0d9488; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.2s; }
    .order-btn:hover { background: #0f766e; }
    .footer-watermark { text-align: center; padding: 20px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; margin-top: 30px; }
    .footer-watermark a { color: #0d9488; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="top-strip">
    🔥 সীমিত সময়ের বিশেষ মেগা অফার! সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি
  </div>

  <div class="container">
    <div class="card">
      <h1 class="hero-title">${item.title}</h1>
      <p class="hero-sub">${item.subtitle}</p>

      <div class="grid-2">
        <div class="img-box">
          <img src="${item.imageUrl}" alt="${item.title}">
        </div>
        <div>
          <div class="price-box">
            <div>
              <div class="old-price">পূর্বের মূল্য: ৳${item.originalPrice}</div>
              <div class="curr-price">৳${item.offerPrice}</div>
            </div>
            <span class="badge">স্পেশাল ডিসকাউন্ট</span>
          </div>

          <ul class="features">
            ${item.features.map((f) => `<li>${f}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </div>

    <!-- Instant Checkout Box -->
    <div class="checkout-box">
      <h2 class="checkout-title">ক্যাশ অন ডেলিভারিতে অর্ডার করুন</h2>
      <p class="checkout-sub">পণ্য হাতে পাওয়ার পর ডেলিভারিম্যানকে মূল্য পরিশোধ করার নিশ্চয়তা</p>

      <form id="orderForm">
        <div class="form-group">
          <label>আপনার সম্পূর্ণ নাম *</label>
          <input type="text" id="custName" required placeholder="যেমন: মোঃ সাকিব হাসান">
        </div>

        <div class="form-group">
          <label>১১ ডিজিটের মোবাইল নম্বর *</label>
          <input type="tel" id="custPhone" required placeholder="01XXXXXXXXX">
        </div>

        <div class="form-group">
          <label>সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/জেলা) *</label>
          <textarea id="custAddr" required rows="2" placeholder="যেমন: বাড়ি #১২, ধানমন্ডি, ঢাকা"></textarea>
        </div>

        <div class="form-group">
          <label>ডেলিভারি লোকেশন</label>
          <div class="zones">
            <div class="zone-btn active" id="insideBtn" onclick="selectZone('inside')">
              ঢাকার ভেতরে<br><small>চার্জ: ৳${item.deliveryChargeInside}</small>
            </div>
            <div class="zone-btn" id="outsideBtn" onclick="selectZone('outside')">
              ঢাকার বাইরে<br><small>চার্জ: ৳${item.deliveryChargeOutside}</small>
            </div>
          </div>
        </div>

        <div style="background:#f1f5f9; padding:12px; border-radius:10px; margin-bottom:14px; font-size:13px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>পণ্যের মূল্য:</span>
            <span>৳<span id="priceVal">${item.offerPrice}</span></span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>ডেলিভারি চার্জ:</span>
            <span>৳<span id="delVal">${item.deliveryChargeInside}</span></span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:15px; border-top:1px solid #cbd5e1; padding-top:6px; color:#0f766e;">
            <span>সর্বমোট প্রদেয় বিল:</span>
            <span>৳<span id="totalVal">${item.offerPrice + item.deliveryChargeInside}</span></span>
          </div>
        </div>

        <button type="submit" class="order-btn" id="submitBtn">অর্ডার কনফার্ম করুন</button>
      </form>
    </div>

    <!-- Mandatory Powered by Nishchinto Footer -->
    <div class="footer-watermark">
      ⚡ Powered by <a href="https://nishchinto.app" target="_blank">Nishchinto.app (নিশ্চিন্ত)</a> | ব্যবসা চালান নিশ্চিন্তে
    </div>
  </div>

  <script>
    let currentZone = 'inside';
    const basePrice = ${item.offerPrice};
    const delInside = ${item.deliveryChargeInside};
    const delOutside = ${item.deliveryChargeOutside};

    function selectZone(zone) {
      currentZone = zone;
      const insideBtn = document.getElementById('insideBtn');
      const outsideBtn = document.getElementById('outsideBtn');
      const delVal = document.getElementById('delVal');
      const totalVal = document.getElementById('totalVal');

      if (zone === 'inside') {
        insideBtn.classList.add('active');
        outsideBtn.classList.remove('active');
        delVal.innerText = delInside;
        totalVal.innerText = basePrice + delInside;
      } else {
        outsideBtn.classList.add('active');
        insideBtn.classList.remove('active');
        delVal.innerText = delOutside;
        totalVal.innerText = basePrice + delOutside;
      }
    }

    document.getElementById('orderForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.innerText = 'অর্ডার প্রসেস হচ্ছে...';
      btn.disabled = true;

      const payload = {
        source: 'Landing Page (${item.slug})',
        customerName: document.getElementById('custName').value,
        customerPhone: document.getElementById('custPhone').value,
        customerAddress: document.getElementById('custAddr').value,
        totalAmount: basePrice + (currentZone === 'inside' ? delInside : delOutside),
        deliveryCharge: currentZone === 'inside' ? delInside : delOutside,
        items: [{ name: '${item.title}', price: basePrice, quantity: 1 }]
      };

      try {
        await fetch('https://nishchinto.app/api/webhooks/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {}

      alert('ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই প্রতিনিধি আপনাকে কল করবেন।');
      btn.innerText = 'অর্ডার সম্পন্ন হয়েছে ✓';
    });
  </script>
</body>
</html>`;

    // Trigger download
    const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `landing-${item.slug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
      <Header />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>হাই-কনভার্সন ল্যান্ডিং পেজ নির্মাতা</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              কাস্টম ল্যান্ডিং পেজ বিল্ডার
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              আপনার স্টোরের পণ্য দিয়ে ১-ক্লিকে ল্যান্ডিং পেজ তৈরি করুন। সরাসরি Nishchinto লিংকে ড্রাইভ করুন অথবা ওয়েবসাইট ব্যবহারের জন্য সম্পূর্ণ কোড ডাউনলোড করুন।
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ল্যান্ডিং পেজ তৈরি করুন</span>
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">
                        /p/{item.slug}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        কনভার্সন: {item.conversionRate}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-extrabold text-teal-700 text-sm">
                        ৳{item.offerPrice.toLocaleString()}
                      </span>
                      <span className="text-slate-400 line-through text-[11px]">
                        ৳{item.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        ({item.ordersCount} টি সেলস)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Bullets preview */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                  {item.features.slice(0, 2).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200 grid grid-cols-3 gap-2 text-xs font-semibold">
                {/* 1. Open Live View */}
                <Link
                  href={`/p/${item.slug}`}
                  target="_blank"
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-center flex items-center justify-center gap-1.5 transition-colors"
                  title="সরাসরি লাইভ ল্যান্ডিং পেজ দেখুন"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-600" />
                  <span>লাইভ পেজ</span>
                </Link>

                {/* 2. Copy URL */}
                <button
                  onClick={() => handleCopyUrl(item.slug)}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-center flex items-center justify-center gap-1.5 transition-colors"
                  title="মার্কেটিংয়ের জন্য লিংক কপি করুন"
                >
                  <Copy className="w-3.5 h-3.5 text-teal-600" />
                  <span>{copiedSlug === item.slug ? "কপি হয়েছে!" : "লিংক কপি"}</span>
                </button>

                {/* 3. Download HTML Code */}
                <button
                  onClick={() => handleDownloadStandaloneHTML(item)}
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-center flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  title="আপনার নিজের ওয়েবসাইটে যুক্ত করার জন্য সম্পূর্ণ HTML কোড ডাউনলোড করুন"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>কোড ডাউনলোড</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Instructions Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-teal-600" />
            <span>কীভাবে আপনার ওয়েবসাইট বা ফেসবুক বিজ্ঞাপনে ল্যান্ডিং পেজ ব্যবহার করবেন?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900">১. সরাসরি Nishchinto URL ব্যবহার:</span>
              <p>
                কোনো ওয়েবসাইট ছাড়াই শুধু <strong>&lsquo;লিংক কপি&rsquo;</strong> বাটনে ক্লিক করে ফেসবুক বুস্টিং বা হোয়াটসঅ্যাপে শেয়ার করুন। কাস্টমার অর্ডার করার সাথে সাথে অর্ডার ড্যাশবোর্ডে ও সেন্ট্রাল ফ্রড গার্ডে চলে আসবে।
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900">২. নিজস্ব ডোমেইনে কোড ডাউনলোড করে যুক্ত:</span>
              <p>
                <strong>&lsquo;কোড ডাউনলোড&rsquo;</strong> বাটনে ক্লিক করলেই একটি স্ট্যান্ডঅ্যালোন <code>.html</code> ফাইল ডাউনলোড হবে। এটি আপনার cPanel, WordPress বা ডোমেইনে সরাসরি আপলোড করলেই ফুল লাইভ হয়ে যাবে।
              </p>
            </div>
          </div>
          <div className="pt-2 text-[11px] text-slate-500 font-medium">
            * প্রতিটি তৈরি হওয়া ল্যান্ডিং পেজের ফুটারে ব্র্যান্ড সিকিউরিটি হিসেবে <strong>Powered by Nishchinto</strong> দৃশ্যমান থাকবে।
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    নতুন হাই-কনভার্সন ল্যান্ডিং পেজ তৈরি
                  </h3>
                  <p className="text-xs text-slate-500">
                    পণ্যের বিবরণ ও অফার মূল্য নির্ধারণ করে পাবলিশ করুন
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateLandingPage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      পণ্যের নাম (Product Title) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: স্মার্ট আল্ট্রা ওয়াচ সিরিজ ৯"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      কাস্টম URL স্ল্যাগ (URL Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ultra-watch"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    আকর্ষণীয় অফার হেডলাইন (Headline)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: 🔥 সীমিত সময়ের মেগা অফার! ৫০% ডিসকাউন্টে সংগ্রহ করুন"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পূর্বের মূল্য (৳)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">অফার মূল্য (৳)</label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono text-teal-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ঢাকার ভেতরে চার্জ</label>
                    <input
                      type="number"
                      value={deliveryChargeInside}
                      onChange={(e) => setDeliveryChargeInside(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ঢাকার বাইরে চার্জ</label>
                    <input
                      type="number"
                      value={deliveryChargeOutside}
                      onChange={(e) => setDeliveryChargeOutside(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    পণ্যের ছবির লিংক (Image URL)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    আকর্ষণীয় ফিচার ও সুবিধাসমূহ (প্রতি লাইনে একটি)
                  </label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    তৈরি ও পাবলিশ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
