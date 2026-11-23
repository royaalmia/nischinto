"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  Boxes,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Package,
  Sparkles,
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("50");
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          sku,
          price: Number(price),
          costPrice: Number(costPrice),
          stock: Number(stock),
        }),
      });
      const data = await res.json();
      setSubmitting(false);
      if (data.success) {
        showToast("পণ্য সফলভাবে ইনভেন্টরিতে যোগ করা হয়েছে!");
        setShowAddModal(false);
        setTitle("");
        setSku("");
        setPrice("");
        setCostPrice("");
        fetchProducts();
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">পণ্য ও ইনভেন্টরি ম্যানেজমেন্ট</h1>
            <p className="text-xs text-slate-500 mt-1">
              পণ্যের ক্রয়মূল্য (COGS) ও রিয়েল-টাইম স্টক ট্র্যাকিং।
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-3 text-center p-8 text-slate-400">পণ্য লোড হচ্ছে...</div>
          ) : (
            products.map((p) => {
              const isOutOfStock = p.stock <= 0;
              const margin = p.price - p.costPrice;
              const marginPercent = Math.round((margin / p.price) * 100);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1">
                        {p.sku}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h3>
                    </div>

                    {isOutOfStock ? (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md shrink-0">
                        স্টক নেই (0)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                        স্টক: {p.stock} টি
                      </span>
                    )}
                  </div>

                  {/* Price & Margin breakdown */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">বিক্রয় মূল্য</span>
                      <span className="font-bold text-slate-900">{formatBDT(p.price)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">ক্রয়মূল্য (COGS)</span>
                      <span className="font-semibold text-slate-700">{formatBDT(p.costPrice)}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200/60 flex justify-between text-[11px]">
                      <span className="text-slate-500">গ্রস প্রফিট মার্জিন:</span>
                      <span className="font-bold text-emerald-600">
                        {formatBDT(margin)} ({marginPercent}%)
                      </span>
                    </div>
                  </div>

                  {isOutOfStock && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-[11px] text-amber-800 font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>স্টক ০ থাকায় Nischinto AI এর ফেসবুক বিজ্ঞাপন স্বয়ংক্রিয়ভাবে পজ করেছে।</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal: Add Product */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">ইনভেন্টরিতে নতুন পণ্য যোগ করুন</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পণ্যের নাম</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমন: প্রিমিয়াম ড্রপ শোল্ডার টি-শার্ট"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">SKU কোড</label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="যেমন: TS-001"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রাথমিক স্টক সংখ্যা</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">বিক্রয় মূল্য (টাকা)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="যেমন: 650"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ক্রয়মূল্য / COGS (টাকা)
                    </label>
                    <input
                      type="number"
                      required
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      placeholder="যেমন: 280"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-700"
                  >
                    {submitting ? "সংরক্ষণ হচ্ছে..." : "পণ্য সংরক্ষণ করুন"}
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
