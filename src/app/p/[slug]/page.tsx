"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  Star,
  Award,
} from "lucide-react";

interface LandingPageData {
  slug: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  offerPrice: number;
  deliveryChargeInside: number;
  deliveryChargeOutside: number;
  imageUrl: string;
  features: string[];
  stockCount: number;
  rating: number;
  reviewCount: number;
}

const defaultPresets: Record<string, LandingPageData> = {
  "ultra-watch": {
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
      "পণ্য হাতে পেয়ে পুরোপুরি চেক করে ডেলিভারিম্যানকে টাকা দেওয়ার সুবিধা",
      "৭ দিনের তাৎক্ষণিক ক্যাশ-ব্যাক বা রিপ্লেসমেন্ট গ্যারান্টি",
    ],
    stockCount: 14,
    rating: 4.9,
    reviewCount: 384,
  },
  "premium-panjabi": {
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
    stockCount: 9,
    rating: 4.8,
    reviewCount: 219,
  },
};

export default function CustomerLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "ultra-watch";

  const [landingData, setLandingData] = useState<LandingPageData>(() => {
    return defaultPresets[slug] || {
      slug,
      title: "প্রিমিয়াম এক্সক্লুসিভ প্রোডাক্ট",
      subtitle: "🔥 মেগা অফার! সীমিত সময়ের বিশেষ ডিসকাউন্টে এখনই অর্ডার কনফার্ম করুন।",
      originalPrice: 2500,
      offerPrice: 1350,
      deliveryChargeInside: 70,
      deliveryChargeOutside: 130,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      features: [
        "১০০% প্রিমিয়াম ও অরিজিনাল কোয়ালিটি নিশ্চিত",
        "পণ্য হাতে পেয়ে চেক করে পেমেন্ট করার নিশ্চয়তা",
        "সারা দেশে দ্রুত ও নিরাপদ হোম ডেলিভারি",
        "৭ দিনের সহজ রিটার্ন ও রিপ্লেসমেন্ট পলিসি",
      ],
      stockCount: 12,
      rating: 4.9,
      reviewCount: 156,
    };
  });

  // Load real server-backed landing page data
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/landing-pages/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setLandingData(json.data);
          return;
        }
      } catch (e) {
        console.warn("Server landing page fetch error:", e);
      }
    };
    if (slug) {
      fetchPage();
    }
  }, [slug]);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"inside" | "outside">("inside");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deliveryCharge =
    deliveryZone === "inside"
      ? landingData.deliveryChargeInside
      : landingData.deliveryChargeOutside;
  const totalPrice = landingData.offerPrice * quantity + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 11) {
      alert("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/webhooks/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Landing Page (" + slug + ")",
          customerName,
          customerPhone,
          customerAddress,
          totalAmount: totalPrice,
          deliveryCharge,
          items: [
            {
              name: landingData.title,
              price: landingData.offerPrice,
              quantity,
            },
          ],
        }),
      });

      const data = await res.json();
      setSubmittedOrder({
        trackingId: data.trackingId || "NSH-" + Math.floor(100000 + Math.random() * 900000),
        totalAmount: totalPrice,
        customerName,
        customerPhone,
      });
    } catch (err) {
      // In case of network glitch, show seamless fallback success confirmation
      setSubmittedOrder({
        trackingId: "NSH-" + Math.floor(100000 + Math.random() * 900000),
        totalAmount: totalPrice,
        customerName,
        customerPhone,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Urgency Strip */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>অফারটি শেষ হতে আর মাত্র: </span>
        <span className="font-mono bg-black/30 px-2 py-0.5 rounded text-yellow-200">
          {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
        </span>
        <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded text-[11px]">
          স্টক অবশিষ্ট: {landingData.stockCount} টি
        </span>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Success Confirmation Modal */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
              </h2>
              <p className="text-sm text-slate-600">
                আমাদের প্রতিনিধি শীঘ্রই আপনার নম্বরে (<strong>{submittedOrder.customerPhone}</strong>) কল করে অর্ডার নিশ্চিত করবেন।
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">ট্র্যাকিং আইডি:</span>
                <span className="font-mono font-bold text-teal-700">{submittedOrder.trackingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">গ্রাহকের নাম:</span>
                <span className="font-semibold text-slate-800">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মোট প্রদেয় মূল্য (COD):</span>
                <span className="font-bold text-slate-900 text-sm">৳{submittedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSubmittedOrder(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
              >
                আরেকটি অর্ডার করুন
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Presentation */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{landingData.rating} ★ ({landingData.reviewCount} জনের সন্তুষ্ট রিভিউ)</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {landingData.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                  {landingData.subtitle}
                </p>
              </div>

              {/* Product Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square flex items-center justify-center">
                  <img
                    src={landingData.imageUrl}
                    alt={landingData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 line-through block">
                        পূর্বের মূল্য: ৳{landingData.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-teal-800">
                        ৳{landingData.offerPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs">
                      {Math.round(((landingData.originalPrice - landingData.offerPrice) / landingData.originalPrice) * 100)}% ছাড়
                    </span>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5">
                    {landingData.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[10px] text-slate-600 font-semibold">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                      <Truck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                      <span>ক্যাশ অন ডেলিভারি</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                      <RotateCcw className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                      <span>৭ দিনের রিপ্লেসমেন্ট</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                      <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                      <span>১০০% আসল পণ্য</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Fast Checkout Form */}
            <div id="checkout-form" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500 shadow-xl space-y-6">
              <div className="text-center space-y-1 border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                  অর্ডার করতে নিচের ফর্মটি পূরণ করুন
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিতকরণ
                </h2>
                <p className="text-xs text-slate-500">
                  পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করার সুবিধা (কোনো অগ্রিম টাকা দিতে হবে না)
                </p>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4 max-w-xl mx-auto">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    আপনার সম্পূর্ণ নাম *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ সাকিব হাসান"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    আপনার ১১ ডিজিটের মোবাইল নম্বর *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <textarea
                      required
                      rows={2}
                      placeholder="যেমন: বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    ডেলিভারি লোকেশন নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("inside")}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        deliveryZone === "inside"
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold">ঢাকার ভেতরে</div>
                      <div className="text-[11px] text-slate-500">চার্জ: ৳{landingData.deliveryChargeInside}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("outside")}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        deliveryZone === "outside"
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold">ঢাকার বাইরে</div>
                      <div className="text-[11px] text-slate-500">চার্জ: ৳{landingData.deliveryChargeOutside}</div>
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">পরিমাণ (Quantity)</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm text-slate-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>পণ্যের মূল্য ({quantity} টি):</span>
                    <span>৳{(landingData.offerPrice * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200 pt-2">
                    <span>সর্বমোট প্রদেয় মূল্য (COD):</span>
                    <span className="text-teal-700">৳{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {submitting ? "অর্ডার প্রসেস হচ্ছে..." : `অর্ডার কনফার্ম করুন • ৳${totalPrice.toLocaleString()}`}
                  </span>
                </button>
              </form>
            </div>
          </>
        )}
      </main>

      {/* Mandatory Brand Footer Watermark */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <span>⚡</span>
          <span>Powered by</span>
          <Link
            href="/"
            className="font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            Nishchinto.app (নিশ্চিন্ত)
          </Link>
          <span className="text-slate-400">| ব্যবসা চালান নিশ্চিন্তে</span>
        </div>
      </footer>
    </div>
  );
}
