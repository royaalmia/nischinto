"use client";

import { useState, useEffect } from "react";
import { formatBDT } from "@/lib/utils";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";

export default function CheckoutPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  // Incomplete Order Tracker Flag
  const [incompleteSent, setIncompleteSent] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
          setSelectedProduct(data.data[0]);
        }
      });
  }, []);

  // Incomplete Order Tracker (fires when user types 11-digit phone number)
  useEffect(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length === 11 && !incompleteSent && selectedProduct && !orderSuccess) {
      // Fire incomplete order dropoff capture silently
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name || "ভিজিটর (Drop-off)",
          customerPhone: cleanPhone,
          customerAddress: address || "অসম্পূর্ণ ঠিকানা",
          district,
          productId: selectedProduct.id,
          quantity: 1,
          deliveryCharge: district === "Dhaka" ? 80 : 130,
          source: "INCOMPLETE_DROP",
          isIncomplete: true,
        }),
      }).catch(console.error);

      setIncompleteSent(true);
    }
  }, [phone, name, address, district, selectedProduct, incompleteSent, orderSuccess]);

  const deliveryCharge = district === "Dhaka" ? 80 : 130;
  const totalAmount = selectedProduct ? selectedProduct.price + deliveryCharge : 0;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          district,
          productId: selectedProduct.id,
          quantity: 1,
          deliveryCharge,
          source: "WEBSITE",
          isIncomplete: false,
        }),
      });
      const data = await res.json();
      setSubmitting(false);
      if (data.success) {
        setOrderSuccess(data.data);
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex flex-col items-center">
      {/* Brand Header */}
      <div className="max-w-2xl w-full mb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <NishchintoLogo size="sm" showBangla={false} />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-teal-600 hover:underline flex items-center gap-1"
        >
          <span>মার্চেন্ট ড্যাশবোর্ডে ফিরে যান</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8">
        {orderSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              ধন্যবাদ <strong>{orderSuccess.customer.name}</strong>! আপনার অর্ডার আইডি:{" "}
              <strong className="font-mono text-blue-600">{orderSuccess.orderNumber}</strong>।
              শীঘ্রই আমাদের প্রতিনিধি বা AI Voice এজেন্ট কল দিয়ে পার্সেলটি পাঠিয়ে দেবে।
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700"
              >
                ড্যাশবোর্ডে লাইভ অর্ডার দেখুন
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Product Selection */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                ১. পণ্য নির্বাচন করুন
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((p) => {
                  const isSelected = selectedProduct?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-extrabold text-blue-600">{formatBDT(p.price)}</span>
                        <span className="text-[10px] text-slate-500 font-medium">স্টক: {p.stock}টি</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ২. ডেলিভারি তথ্য (ক্যাশ অন ডেলিভারি)
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2 py-0.5 rounded-full">
                  হাতে পেয়ে মূল্য পরিশোধ
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">আপনার নাম</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  মোবাইল নম্বর (১১ ডিজিট)
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  💡 এখানে নম্বর টাইপ করে বের হয়ে গেলেও Nischinto তা ইনকমপ্লিট অর্ডার হিসেবে ধরে ফেলবে।
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">জেলা</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Dhaka">ঢাকা (চার্জ ৳৮০)</option>
                    <option value="Chattogram">চট্টগ্রাম (চার্জ ৳১৩০)</option>
                    <option value="Sylhet">সিলেট (চার্জ ৳১৩০)</option>
                    <option value="Rajshahi">রাজশাহী (চার্জ ৳১৩০)</option>
                    <option value="Khulna">খুলনা (চার্জ ৳১৩০)</option>
                    <option value="Barishal">বরিশাল (চার্জ ৳১৩০)</option>
                    <option value="Rangpur">রংপুর (চার্জ ৳১৩০)</option>
                    <option value="Mymensingh">ময়মনসিংহ (চার্জ ৳১৩০)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পূর্ণাঙ্গ ঠিকানা</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাড়ি নং, রোড নং, এলাকা..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>পণ্যের মূল্য</span>
                <span>{formatBDT(selectedProduct?.price || 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ ({district === "Dhaka" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"})</span>
                <span>৳{deliveryCharge}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>সর্বমোট প্রদেয় বিল</span>
                <span className="text-blue-600">{formatBDT(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-sm font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{submitting ? "অর্ডার নেওয়া হচ্ছে..." : "অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
