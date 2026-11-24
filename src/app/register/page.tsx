"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NishchintoLogo from "@/components/NishchintoLogo";
import { BUSINESS_CATEGORIES } from "@/lib/categories";
import {
  Lock,
  Mail,
  User,
  Store,
  Phone,
  ArrowRight,
  CheckCircle2,
  Search,
  Check,
  Clock,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // Form Fields
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("GENERAL");
  const [categorySearch, setCategorySearch] = useState("");
  const [plan] = useState("PRO_AI");

  // State
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedStore, setSubmittedStore] = useState("");

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return BUSINESS_CATEGORIES;
    const query = categorySearch.toLowerCase();
    return BUSINESS_CATEGORIES.filter(
      (c) =>
        c.nameBn.toLowerCase().includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.sampleItems.some((item) => item.toLowerCase().includes(query))
    );
  }, [categorySearch]);

  const activeCategoryObj = useMemo(() => {
    return (
      BUSINESS_CATEGORIES.find((c) => c.id === selectedCategory) ||
      BUSINESS_CATEGORIES[0]
    );
  }, [selectedCategory]);

  // Submit registration directly (No OTP required - Pending Admin Approval)
  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!businessName || !ownerName || !email || !phone || !password) {
      setErrorMsg("অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          ownerName,
          email,
          phone,
          password,
          category: selectedCategory,
          plan,
        }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        setSubmittedStore(businessName);
        setIsSubmitted(true);
      } else {
        setErrorMsg(data.error || "নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 py-8 sm:py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <NishchintoLogo size="md" showTagline={true} />
          </Link>
          <div className="pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isSubmitted ? "নিবন্ধন আবেদন গৃহীত হয়েছে" : "নতুন মার্চেন্ট অ্যাকাউন্ট খুলুন"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isSubmitted
                ? "অ্যাডমিন অনুমোদন সম্পন্ন হওয়ার পর আপনার অ্যাকাউন্ট সক্রিয় হবে"
                : "আপনার স্টোরের তথ্য দিন ও বিজনেস শুরু করুন"}
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* SUCCESS / PENDING APPROVAL SCREEN */}
        {isSubmitted ? (
          <div className="space-y-6 text-center animate-in fade-in">
            <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-3xl space-y-3">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Clock className="w-7 h-7 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                আপনার আবেদন সফলভাবে জমা নেওয়া হয়েছে!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                স্টোর: <strong className="text-slate-900">{submittedStore}</strong>। প্ল্যাটফর্মের নিরাপত্তা ও গুণগত মান নিশ্চিত করতে আপনার মার্চেন্ট প্রোফাইলটি বর্তমানে <strong>অ্যাডমিন অনুমোদনের (Pending Approval)</strong> অপেক্ষায় রয়েছে।
              </p>
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 font-medium">
                অ্যাডমিন কর্তৃক ভেরিফাই ও অনুমোদন (Approve) করার পর আপনি আপনার ইমেইল/ফোন ও পাসওয়ার্ড দিয়ে সরাসরি লগইন করতে পারবেন।
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>লগইন পেজে যান</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="block text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                হোমপেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM (NO OTP REQUIRED) */
          <form onSubmit={handleSubmitRegistration} className="space-y-4">
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
                  placeholder="Type your store name"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  বিজনেসের ক্যাটাগরি <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-teal-800 font-bold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {activeCategoryObj.icon} {activeCategoryObj.nameBn}
                </span>
              </div>

              {/* Instant Category Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Type your category (e.g. Fashion, Food, Gadgets)"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                />
              </div>

              {/* Compact Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50 custom-scrollbar">
                {filteredCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="text-sm shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.nameBn}</span>
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Type your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

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
                    placeholder="Type your valid phone"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ইমেইল অ্যাড্রেস <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email address"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                লগইন পাসওয়ার্ড <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
            >
              <span>{submitting ? "আবেদন জমা হচ্ছে..." : "নিবন্ধন আবেদন জমা দিন"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {!isSubmitted && (
          <div className="text-center pt-1 text-xs text-slate-500">
            <span>ইতিমধ্যে অ্যাকাউন্ট রয়েছে? </span>
            <Link href="/login" className="font-semibold text-teal-700 hover:underline">
              লগইন করুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
