"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import { BUSINESS_CATEGORIES, getCategoryById } from "@/lib/categories";
import {
  Boxes,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Package,
  Sparkles,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  X,
  Filter,
  Layers,
  ArrowUpDown,
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Search
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Add Product Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("FASHION");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("50");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit Product Modal
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSku, setEditSku] = useState("");
  const [editCategory, setEditCategory] = useState("GENERAL");
  const [editPrice, setEditPrice] = useState("");
  const [editCostPrice, setEditCostPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Delete Confirmation Modal
  const [deletingProduct, setDeletingProduct] = useState<any | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
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

  // Handle Local Photo Upload via File Reader
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে।");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (isEdit) {
        setEditImage(base64);
      } else {
        setImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Product Submit
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
          category,
          price: Number(price),
          costPrice: Number(costPrice || Number(price) * 0.5),
          stock: Number(stock),
          image,
          description,
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
        setStock("50");
        setImage("");
        setDescription("");
        fetchProducts();
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (p: any) => {
    setEditingProduct(p);
    setEditTitle(p.title);
    setEditSku(p.sku);
    setEditCategory(p.category || "GENERAL");
    setEditPrice(String(p.price));
    setEditCostPrice(String(p.costPrice));
    setEditStock(String(p.stock));
    setEditImage(p.image || "");
    setEditDescription(p.description || "");
  };

  // Edit Product Submit
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setEditSubmitting(true);
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          sku: editSku,
          category: editCategory,
          price: Number(editPrice),
          costPrice: Number(editCostPrice),
          stock: Number(editStock),
          image: editImage,
          description: editDescription,
        }),
      });
      const data = await res.json();
      setEditSubmitting(false);

      if (data.success) {
        showToast("পণ্য সফলভাবে আপডেট করা হয়েছে!");
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      setEditSubmitting(false);
      console.error(err);
    }
  };

  // Delete Product Submit
  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    try {
      setDeleteSubmitting(true);
      const res = await fetch(`/api/products/${deletingProduct.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setDeleteSubmitting(false);
      if (data.success) {
        showToast("পণ্য সফলভাবে মুছে ফেলা হয়েছে!");
        setDeletingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      setDeleteSubmitting(false);
      console.error(err);
    }
  };

  // Filter products by search & category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

        {/* Page Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Boxes className="w-6 h-6 text-teal-600" />
              <span>পণ্য ও ইনভেন্টরি ম্যানেজমেন্ট</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              পণ্যের ক্রয়মূল্য (COGS), ফটো ও রিয়েল-টাইম স্টক ট্র্যাকিং।
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="পণ্যের নাম বা SKU কোড দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-teal-600"
              >
                <option value="ALL">সকল ক্যাটাগরি</option>
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.nameBn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500 px-2">
            মোট পণ্য: <span className="text-slate-900">{filteredProducts.length}</span> টি
          </div>
        </div>

        {/* Product Cards Grid or Clean Empty State */}
        {loading ? (
          <div className="text-center p-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
            পণ্য লোড হচ্ছে...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto text-2xl">
              📦
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {products.length === 0
                  ? "আপনার স্টোরে এখনো কোনো পণ্য যুক্ত করা হয়নি"
                  : "খুঁজে পাওয়া যায়নি"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {products.length === 0
                  ? "আপনার স্টোরের প্রথম পণ্যটি যুক্ত করে কুরিয়ার ডেলিভারি ও সেলস শুরু করুন।"
                  : "অনুসন্ধানের তথ্যের সাথে কোনো পণ্য মেলেনি। ফিল্টার পরিবর্তন করে দেখুন।"}
              </p>
            </div>
            {products.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>প্রথম পণ্য যুক্ত করুন</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((p) => {
              const isOutOfStock = p.stock <= 0;
              const margin = p.price - p.costPrice;
              const marginPercent = p.price > 0 ? Math.round((margin / p.price) * 100) : 0;
              const prodCat = getCategoryById(p.category || "GENERAL");

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Product Image Banner */}
                    <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                          <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                          <span className="text-[10px]">ছবি যুক্ত করা হয়নি</span>
                        </div>
                      )}

                      {/* Category Badge Over Image */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold border border-slate-200 shadow-2xs flex items-center gap-1">
                        <span>{prodCat.icon}</span>
                        <span>{prodCat.nameBn}</span>
                      </span>

                      {/* Stock Badge Over Image */}
                      <span
                        className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs ${
                          isOutOfStock
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {isOutOfStock ? "স্টক শেষ (০)" : `স্টক: ${p.stock}`}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mb-1 border border-teal-200">
                          {p.sku}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1" title={p.title}>
                          {p.title}
                        </h3>
                      </div>

                      {/* Financial Margin Breakdown */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">বিক্রয় মূল্য</span>
                          <span className="font-bold text-slate-900">{formatBDT(p.price)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">ক্রয়মূল্য (COGS)</span>
                          <span className="font-semibold text-slate-700">{formatBDT(p.costPrice)}</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-slate-200/60 flex justify-between text-[11px]">
                          <span className="text-slate-500">গ্রস প্রফিট:</span>
                          <span className="font-bold text-emerald-600">
                            +{formatBDT(margin)} ({marginPercent}%)
                          </span>
                        </div>
                      </div>

                      {isOutOfStock && (
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5 text-[10px] text-amber-800 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>স্টক শেষ! বিজ্ঞাপন অটো-পজ থাকবে।</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="flex-1 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-teal-600" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => setDeletingProduct(p)}
                      className="py-1.5 px-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 text-xs font-bold rounded-lg transition-all flex items-center justify-center cursor-pointer"
                      title="পণ্যটি মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL: ADD PRODUCT */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">ইনভেন্টরিতে নতুন পণ্য যোগ করুন</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পণ্যের নাম <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমন: প্রিমিয়াম ড্রপ-শোল্ডার টি-শার্ট"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                    >
                      {BUSINESS_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.nameBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">SKU কোড</label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="অটো জেনারেট হবে (বা লিখুন)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">বিক্রয় মূল্য (টাকা) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="850"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ক্রয়মূল্য (COGS)</label>
                    <input
                      type="number"
                      min={0}
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      placeholder="380"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্টক পরিমাণ <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="50"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-700 block">পণ্যের ছবি আপলোড বা লিংক</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="ছবির সরাসরি লিংক (URL) দিন..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                    />
                    
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-teal-600" />
                      <span>ফাইল আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {image && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-50">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/70 text-white flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">বিবরণ (ঐচ্ছিক)</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="পণ্য সম্পর্কিত সংক্ষিপ্ত নোট..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{submitting ? "যোগ করা হচ্ছে..." : "পণ্য সংরক্ষণ করুন"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">পণ্য তথ্য এডিট করুন</h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পণ্যের নাম</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                    >
                      {BUSINESS_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.nameBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">SKU কোড</label>
                    <input
                      type="text"
                      value={editSku}
                      onChange={(e) => setEditSku(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">বিক্রয় মূল্য (টাকা)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ক্রয়মূল্য (COGS)</label>
                    <input
                      type="number"
                      min={0}
                      value={editCostPrice}
                      onChange={(e) => setEditCostPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">স্টক পরিমাণ</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-700 block">পণ্যের ছবি পরিবর্তন</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      placeholder="ছবির URL দিন..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                    />
                    
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-teal-600" />
                      <span>আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {editImage && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-50">
                      <img src={editImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setEditImage("")}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/70 text-white flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={editSubmitting}
                    className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editSubmitting ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DELETE PRODUCT CONFIRMATION */}
        {deletingProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">পণ্যটি কি মুছে ফেলতে চান?</h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  "{deletingProduct.title}"
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  মুছে ফেললে ইনভেন্টরি থেকে এটি পুরোপুরি রিমুভ হয়ে যাবে।
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingProduct(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  disabled={deleteSubmitting}
                  onClick={handleDeleteProduct}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{deleteSubmitting ? "মুছছে..." : "হ্যাঁ, মুছে ফেলুন"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
