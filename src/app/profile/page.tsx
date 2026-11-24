"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { BUSINESS_CATEGORIES, getCategoryById } from "@/lib/categories";
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  Lock,
  BadgeCheck,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Building,
  Sparkles,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { formatBDT } from "@/lib/utils";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Profile Form State
  const [merchantId, setMerchantId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [isVerified, setIsVerified] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [plan, setPlan] = useState("PRO_AI");

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("merchant_user");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          setMerchantId(u.id || "");
          setBusinessName(u.businessName || "");
          setOwnerName(u.ownerName || "");
          setPhone(u.phone || "");
          setEmail(u.email || "");
          setCategory(u.category || "GENERAL");
          setAddress(u.address || "");
          setDistrict(u.district || "Dhaka");
          setIsVerified(u.isVerified !== false);
          setWalletBalance(Number(u.walletBalance) || 0);
          setPlan(u.plan || "PRO_AI");
        } catch (e) {
          console.error("Profile parse error", e);
        }
      }
    }
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/merchants/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: merchantId,
          email,
          businessName,
          ownerName,
          phone,
          category,
          address,
          district,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        showToast("প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে ✓");
        // Update Local Storage
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("merchant_user");
          const old = raw ? JSON.parse(raw) : {};
          const updated = {
            ...old,
            businessName,
            ownerName,
            phone,
            category,
            address,
            district,
          };
          localStorage.setItem("merchant_user", JSON.stringify(updated));
        }
      } else {
        showToast(data.error || "প্রোফাইল আপডেট ব্যর্থ হয়েছে", "error");
      }
    } catch (err) {
      setLoading(false);
      showToast("সার্ভার সংযোগ ত্রুটি", "error");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      showToast("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।", "error");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/merchants/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: merchantId,
          email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      setPasswordLoading(false);

      if (data.success) {
        showToast("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে ✓");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(data.error || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে", "error");
      }
    } catch (err) {
      setPasswordLoading(false);
      showToast("সার্ভার সংযোগ ত্রুটি", "error");
    }
  };

  const activeCategory = getCategoryById(category);

  return (
    <>
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
              toastMsg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {toastMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{toastMsg.text}</span>
          </div>
        )}

        {/* Profile Header Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-teal-700 shadow-inner">
              <Store className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {businessName || "আমার স্টোর"}
                </h1>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ভেরিফাইড মার্চেন্ট</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    <span>অনুমোদন অপেক্ষমাণ</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>মালিক: <strong>{ownerName || "মার্চেন্ট"}</strong></span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold text-[11px]">
                  <span>{activeCategory.icon}</span>
                  <span>{activeCategory.nameBn}</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">বর্তমান ব্যালান্স</span>
              <span className="text-lg font-black text-teal-700">{formatBDT(walletBalance)}</span>
            </div>
            <Link
              href="/billing"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>বিলিং ও রিচার্জ</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Form (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>মার্চেন্ট ও স্টোর তথ্য</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  আপনার বিজনেসের মৌলিক তথ্য ও ঠিকানা আপডেট করুন।
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    ব্যবসা বা স্টোরের নাম <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    স্টোর ওনারের নাম <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    ইমেইল অ্যাড্রেস
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">ইমেইল পরিবর্তনের জন্য সাপোর্টে যোগাযোগ করুন</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  বিজনেসের ক্যাটাগরি <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                >
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.nameBn} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    পূর্ণাঙ্গ ঠিকানা বা ওয়্যারহাউজ অ্যাড্রেস
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="বাড়ি/দোকান নং, রোড নং, এলাকা..."
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    জেলা / সিটি
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="যেমন: Dhaka"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "সংরক্ষণ হচ্ছে..." : "প্রোফাইল পরিবর্তন সংরক্ষণ করুন"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Password Change Form (1 Col) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <span>পাসওয়ার্ড পরিবর্তন</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে নতুন পাসওয়ার্ড দিন।
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  বর্তমান পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="বর্তমান পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  নতুন পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  নতুন পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পুনরায় নতুন পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{passwordLoading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}</span>
                </button>
              </div>
            </form>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1.5 text-slate-600">
              <span className="font-bold text-slate-800 block">🔒 পাসওয়ার্ড টিপস:</span>
              <p className="text-[11px] leading-relaxed">
                পাসওয়ার্ডে অন্তত একটি সংখ্যা ও বিশেষ চিহ্ন ব্যবহার করলে অ্যাকাউন্ট আরও সুরক্ষিত থাকে।
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
