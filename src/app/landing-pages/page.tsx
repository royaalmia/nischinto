"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { BUSINESS_CATEGORIES, getCategoryById } from "@/lib/categories";
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
  Upload,
  Check,
  X,
  Package,
} from "lucide-react";

interface LandingPageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category?: string;
  originalPrice: number;
  offerPrice: number;
  deliveryChargeInside: number;
  deliveryChargeOutside: number;
  imageUrl: string;
  features: string[];
  ordersCount: number;
  conversionRate: string;
}

export default function LandingPagesManagement() {
  const [pages, setPages] = useState<LandingPageItem[]>([]);
  const [storeProducts, setStoreProducts] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New Landing Page Form State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("FASHION");
  const [subtitle, setSubtitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState(2000);
  const [offerPrice, setOfferPrice] = useState(1200);
  const [deliveryChargeInside, setDeliveryChargeInside] = useState(70);
  const [deliveryChargeOutside, setDeliveryChargeOutside] = useState(130);
  const [imageUrl, setImageUrl] = useState("");
  const [featuresText, setFeaturesText] = useState(
    "১০০% অরিজিনাল কোয়ালিটি নিশ্চিত\nপণ্য হাতে পেয়ে চেক করে পেমেন্ট করার সুবিধা\nসারা দেশে দ্রুত ক্যাশ অন ডেলিভারি\n৭ দিনের সহজ রিপ্লেসমেন্ট সুবিধা"
  );

  // Load merchant inventory products and saved landing pages
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setStoreProducts(json.data);
        }
      } catch (e) {
        console.warn("Products fetch failed:", e);
      }
    };

    fetchInventory();

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("merchant_landing_pages");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setPages(parsed);
          }
        } catch (e) {}
      }
    }
  }, []);

  // AI Content Assistant State
  const [aiGenerating, setAiGenerating] = useState(false);

  // When user selects a product from their inventory, auto-fill form
  const handleSelectProduct = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = storeProducts.find((p) => p.id === prodId);
    if (prod) {
      setTitle(prod.title);
      setCategory(prod.category || "GENERAL");
      setOfferPrice(prod.price);
      setOriginalPrice(Math.round(prod.price * 1.35));
      if (prod.image) setImageUrl(prod.image);
      const cleanSlug = prod.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30);
      setSlug(cleanSlug || `item-${Date.now().toString().slice(-4)}`);
      setSubtitle(`🔥 সীমিত সময়ের মেগা অফার! "${prod.title}" বিশেষ ছাড়ে সংগ্রহ করুন।`);
    }
  };

  // AI Content Generator: creates high-converting titles, subtitles, features & offers tailored to category
  const handleAiGenerateContent = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);

      const targetTitle = title.trim() || (
        category === "FASHION" ? "প্রিমিয়াম ড্রপ-শোল্ডার ওভারসাইজড টি-শার্ট" :
        category === "FOOD" ? "১০০% খাঁটি সুন্দরবন প্রাকৃতিক চাকের মধু" :
        category === "GADGETS" ? "অ্যাক্টিভ নয়েজ ক্যানসেলিং ট্রু ওয়্যারলেস ইয়ারবাডস প্রো" :
        category === "COSMETICS" ? "অর্গানিক গ্লোয়িং অ্যান্ড রিপেয়ার স্কিনকেয়ার সিরাম" :
        category === "JEWELRY" ? "হাতে তৈরি রাজকীয় ডিজাইনার পার্টি জুয়েলারি সেট" :
        category === "HOME" ? "স্মার্ট মডার্ন লিভিং রুম ও অফিস ডেকোরেশন ল্যাম্প" :
        category === "KIDS" ? "শিশুদের মেধা বিকাশে এডুকেশনাল ইন্টারেক্টিভ লার্নিং টয়" :
        "এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি সুপার প্রোডাক্ট"
      );

      if (!title) setTitle(targetTitle);

      const cleanSlug = targetTitle
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30);
      if (!slug) setSlug(cleanSlug || `deal-${Date.now().toString().slice(-4)}`);

      // Subtitle
      setSubtitle(`🔥 মেগা ডিসকাউন্ট অফার! "${targetTitle}" ডেলিভারি ম্যানের সামনে পণ্য দেখে শতভাগ নিশ্চিত হয়ে মূল্য পরিশোধ করুন।`);

      // Category-specific high-converting features
      let feats = "";
      if (category === "FASHION") {
        feats = "১০০% প্রিমিয়াম কম্বড কটন ফেব্রিক ও আধুনিক আরামদায়ক ফিটিং\nরং এবং প্রিন্টের স্থায়িত্বে ১০০% লাইফটাইম গ্যারান্টি\nকুরিয়ারে পার্সেল খুলে চেক করে নেওয়ার সুবিধা\nসারা দেশে ২-৩ দিনে দ্রুততম ক্যাশ অন ডেলিভারি\nসাইজ সংক্রান্ত কোনো সমস্যা হলে ৭ দিনের সহজ এক্সচেঞ্জ গ্যারান্টি";
      } else if (category === "FOOD") {
        feats = "১০০% খাঁটি, প্রাকৃতিক ও কেমিক্যালমুক্ত স্বাস্থ্যকর উপাদান\nবিএসটিআই ও ল্যাব টেস্টের সর্বোচ্চ মাননিয়ন্ত্রণ নিশ্চিত\nসরাসরি বাগান ও খামার থেকে সংগৃহীত ফ্রেশ পণ্য\nসারা দেশে দ্রুত সুরক্ষিত ফুড-গ্রেড প্যাকেজিং ও হোম ডেলিভারি\nকোনো ভেজাল প্রমাণে ১০০% মানি ব্যাক গ্যারান্টি";
      } else if (category === "GADGETS") {
        feats = "অরিজিনাল হাই-ফাই বাউন্সিং বেস ও ক্রিস্টাল ক্লিয়ার সাউন্ড কোয়ালিটি\nদীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ ও আল্ট্রা-ফাস্ট টাইপ-সি চার্জিং\nহালকা, টেকসই ও প্রিমিয়াম ওয়াটারপ্রুফ ডিজাইন\n৬ মাসের অফিসিয়াল ব্র্যান্ড রিপ্লেসমেন্ট ওয়ারেন্টি\nরাইডারের সামনে সম্পূর্ণ পার্সেল চেক করে পেমেন্ট করার সুবিধা";
      } else if (category === "COSMETICS") {
        feats = "ডার্মাটোলজিস্ট টেস্টেড ও ১০০% নিরাপদ অর্গানিক উপাদান\nত্বকের আর্দ্রতা ধরে রেখে ন্যাচারাল গ্লো ফিরিয়ে আনে\nকোনো প্যারাবেন, ক্ষতিকারক কেমিক্যাল বা সাইড-ইফেক্ট নেই\nসব ধরণের স্কিন টাইপে প্রতিদিন ব্যবহারের উপযোগী\nসরাসরি অথেনটিক ইমপোর্টেড ব্র্যান্ড কোয়ালিটি";
      } else {
        feats = "১০০% অরিজিনাল এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি\nপণ্য হাতে পেয়ে পুরোপুরি চেক করে নেওয়ার পূর্ণ স্বাধীনতা\nসারা দেশে দ্রুত ক্যাশ অন ডেলিভারি (Cash on Delivery)\nপণ্যে কোনো ত্রুটি থাকলে তাৎক্ষণিক ফ্রি রিটার্ন বা রিপ্লেসমেন্ট\n২৪/৭ গ্রাহক সেবা ও অর্ডারের পর সার্বক্ষণিক লাইভ ট্র্যাকিং";
      }
      setFeaturesText(feats);

      if (!offerPrice || offerPrice === 1200) {
        setOfferPrice(1250);
        setOriginalPrice(1850);
      }
    }, 400);
  };

  // Upload image from device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে।");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
      subtitle: subtitle || "🔥 সীমিত সময়ের জন্য আকর্ষণীয় বিশেষ ছাড়! এখনই অর্ডার করুন।",
      category,
      originalPrice: Number(originalPrice) || 2000,
      offerPrice: Number(offerPrice) || 1200,
      deliveryChargeInside: Number(deliveryChargeInside) || 70,
      deliveryChargeOutside: Number(deliveryChargeOutside) || 130,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      features: feats.length ? feats : ["১০০% প্রিমিয়াম কোয়ালিটি নিশ্চিত", "ক্যাশ অন ডেলিভারি সুবিধা"],
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
    setSelectedProductId("");
    setSlug("");
    setTitle("");
    setSubtitle("");
    setImageUrl("");
  };

  const handleDeletePage = (id: string, itemSlug: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই ল্যান্ডিং পেজটি মুছে ফেলতে চান?")) return;
    const filtered = pages.filter((p) => p.id !== id);
    setPages(filtered);
    if (typeof window !== "undefined") {
      localStorage.setItem("merchant_landing_pages", JSON.stringify(filtered));
      localStorage.removeItem(`landing_${itemSlug}`);
    }
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
    .top-strip { background: linear-gradient(to right, #0d9488, #059669); color: white; text-align: center; padding: 8px 12px; font-weight: bold; font-size: 13px; }
    .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .hero-title { font-size: 26px; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 8px; }
    .hero-sub { font-size: 14px; color: #475569; text-align: center; margin-bottom: 20px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; }
    @media (max-width: 640px) { .grid-2 { grid-template-columns: 1fr; } }
    .img-box img { width: 100%; border-radius: 16px; object-fit: cover; max-height: 380px; }
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
    .footer-watermark { text-align: center; padding: 24px 16px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; margin-top: 30px; }
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

        <button type="submit" id="submitBtn" class="order-btn">
          অর্ডার কনফার্ম করুন • ৳<span id="totalVal">${item.offerPrice + item.deliveryChargeInside}</span>
        </button>
      </form>
    </div>

    <!-- Powered by Nischinto -->
    <div class="footer-watermark">
      ⚡ Powered by <a href="https://nishchinto.app" target="_blank">Nischinto.app</a> — দ্রুততম ই-কমার্স ও এফ-কমার্স অপারেটিং সিস্টেম
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
      const totalVal = document.getElementById('totalVal');

      if (zone === 'inside') {
        insideBtn.classList.add('active');
        outsideBtn.classList.remove('active');
        totalVal.innerText = basePrice + delInside;
      } else {
        outsideBtn.classList.add('active');
        insideBtn.classList.remove('active');
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

      <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>হাই-কনভার্সন ল্যান্ডিং পেজ নির্মাতা</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              কাস্টম ল্যান্ডিং পেজ বিল্ডার
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              আপনার স্টোরের পণ্য ব্যবহার করে ১-ক্লিকে ল্যান্ডিং পেজ তৈরি করুন। সরাসরি নিশচিন্ত লিংক ব্যবহার করুন অথবা ওয়েবসাইট ব্যবহারের জন্য ফুল কোড ডাউনলোড করুন।
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto shrink-0 cursor-pointer hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ল্যান্ডিং পেজ তৈরি করুন</span>
          </button>
        </div>

        {/* Empty State or Landing Pages Grid */}
        {pages.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto text-2xl">
              🚀
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                কোনো ল্যান্ডিং পেজ তৈরি করা হয়নি
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                আপনার স্টোরের যেকোনো পণ্য দিয়ে ৩ মিনিটে হাই-কনভার্টিং ল্যান্ডিং পেজ তৈরি করুন।
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>প্রথম ল্যান্ডিং পেজ তৈরি করুন</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map((item) => {
              const catObj = getCategoryById(item.category || "GENERAL");
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                            /p/{item.slug}
                          </span>
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {catObj.icon} {catObj.nameBn}
                          </span>
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={item.title}>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-teal-700">
                            ৳{item.offerPrice.toLocaleString()}
                          </span>
                          <span className="text-slate-400 line-through text-[11px]">
                            ৳{item.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-2 text-xs font-semibold">
                    <Link
                      href={`/p/${item.slug}`}
                      target="_blank"
                      className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-center flex items-center justify-center gap-1 transition-colors"
                      title="লাইভ প্রিভিউ"
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-600" />
                      <span>লাইভ পেজ</span>
                    </Link>

                    <button
                      onClick={() => handleCopyUrl(item.slug)}
                      className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedSlug === item.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>URL লিংক</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownloadStandaloneHTML(item)}
                      className="px-2 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg text-teal-800 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="সম্পূর্ণ HTML কোড ডাউনলোড"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-600" />
                      <span>কোড</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL: CREATE CUSTOM LANDING PAGE */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>নতুন ল্যান্ডিং পেজ তৈরি করুন</span>
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateLandingPage} className="space-y-4">
                
                {/* ⚡ Nishchinto AI Landing Page Assistant Banner */}
                <div className="p-3.5 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 border border-teal-300/60 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>⚡ Nishchinto AI ল্যান্ডিং পেজ অ্যাসিস্ট্যান্ট</span>
                        <span className="text-[9px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded-full font-bold">1-Click</span>
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        ১-ক্লিকে পণ্যের হাই-কনভার্টিং শিরোনাম, আকর্ষণীয় সাবটাইটেল, ফিচারস ও অফার সাজিয়ে নিন।
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAiGenerateContent}
                    disabled={aiGenerating}
                    className="px-3.5 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${aiGenerating ? "animate-spin" : ""}`} />
                    <span>{aiGenerating ? "সাজানো হচ্ছে..." : "AI দিয়ে সাজান"}</span>
                  </button>
                </div>

                {/* 1. Pick from Inventory Option */}
                {storeProducts.length > 0 && (
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-1.5">
                    <label className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-teal-700" />
                      <span>ইনভেন্টরি থেকে পণ্য সিলেক্ট করুন (অটো-ফিল হবে)</span>
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleSelectProduct(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="">-- যেকোনো পণ্য নির্বাচন করুন --</option>
                      {storeProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} (মূল্য: ৳{p.price} | স্টক: {p.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      পণ্যের নাম (Product Title) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: প্রিমিয়াম ড্রপ-শোল্ডার টি-শার্ট"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      কাস্টম URL স্ল্যাগ (URL Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: drop-shoulder-tshirt"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-500"
                    >
                      {BUSINESS_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.nameBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        আকর্ষণীয় অফার সাব-টাইটেল
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const t = title || "এই বিশেষ অফার";
                          setSubtitle(`🔥 সীমিত সময়ের আকর্ষণীয় মেগা অফার! "${t}" ডেলিভারি ম্যানের সামনে পণ্য দেখে শতভাগ নিশ্চিত হয়ে ক্যাশ অন ডেলিভারিতে সংগ্রহ করুন।`);
                        }}
                        className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-teal-600" />
                        <span>AI সাব-টাইটেল</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="যেমন: 🔥 সীমিত সময়ের মেগা অফার! ৫০% ডিসকাউন্টে সংগ্রহ করুন"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                    />
                  </div>
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
                    <label className="text-xs font-bold text-slate-700 block mb-1">অফার মূল্য (৳) *</label>
                    <input
                      type="number"
                      required
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono text-teal-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ঢাকার ভেতর ডেলিভারি</label>
                    <input
                      type="number"
                      value={deliveryChargeInside}
                      onChange={(e) => setDeliveryChargeInside(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ঢাকার বাইরে ডেলিভারি</label>
                    <input
                      type="number"
                      value={deliveryChargeOutside}
                      onChange={(e) => setDeliveryChargeOutside(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Photo Upload / URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">পণ্যের ছবি (URL বা ডিভাইস থেকে আপলোড)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="ছবির লিংক (URL) দিন..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-teal-600" />
                      <span>আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {imageUrl && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-50">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/70 text-white flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      আকর্ষণীয় সুবিধা ও ফিচার (প্রতি লাইনে একটি)
                    </label>
                    <button
                      type="button"
                      onClick={handleAiGenerateContent}
                      className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>AI ফিচার জেনারেটর</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
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
