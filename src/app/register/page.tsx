"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NishchintoLogo from "@/components/NishchintoLogo";
import { BUSINESS_CATEGORIES, BusinessCategory } from "@/lib/categories";
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
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // Step 1: Info & Category, Step 2: Email OTP
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("GENERAL");
  const [categorySearch, setCategorySearch] = useState("");
  const [plan, setPlan] = useState("PRO_AI");

  // OTP Fields
  const [otpCode, setOtpCode] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [resendingOtp, setResendingOtp] = useState(false);

  // State
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  // Request Email OTP (Move to Step 2)
  const handleProceedToOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

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
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "SEND" }),
      });
      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        setStep(2);
        setSuccessMsg(data.message);
        if (data.devOtp) {
          setDevOtpHint(data.devOtp);
        }
      } else {
        setErrorMsg(data.error || "ওটিপি পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setErrorMsg(null);
    setResendingOtp(true);
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "SEND" }),
      });
      const data = await res.json();
      setResendingOtp(false);
      if (data.success) {
        setSuccessMsg("আপনার ইমেইলে নতুন ৬-সংখ্যার ওটিপি কোড পাঠানো হয়েছে!");
        if (data.devOtp) setDevOtpHint(data.devOtp);
      } else {
        setErrorMsg(data.error || "পুনরায় ওটিপি পাঠানো যায়নি।");
      }
    } catch (err) {
      setResendingOtp(false);
      setErrorMsg("সংযোগ ত্রুটি!");
    }
  };

  // Verify OTP and Complete Registration
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setErrorMsg("অনুগ্রহ করে সঠিক ৬-সংখ্যার ওটিপি কোড লিখুন।");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Verify OTP
      const verifyRes = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "VERIFY", code: otpCode }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setSubmitting(false);
        setErrorMsg(verifyData.error || "ভুল ওটিপি কোড! অনুগ্রহ করে আবার চেষ্টা করুন।");
        return;
      }

      // 2. Register Merchant Account
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          ownerName,
          email,
          phone,
          category: selectedCategory,
          plan,
          emailVerified: true,
        }),
      });

      const regData = await regRes.json();
      setSubmitting(false);

      if (regData.success) {
        const registeredMerchant = regData.data || {
          id: `mch_${Date.now()}`,
          businessName,
          ownerName,
          email,
          phone,
          category: selectedCategory,
          plan,
          walletBalance: 0.0,
          ordersProcessed: 0,
          status: "ACTIVE",
          isVerified: true,
          emailVerified: true,
          joinedDate: new Date().toISOString().split("T")[0],
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("merchant_user", JSON.stringify(registeredMerchant));

          // Sync to Super Admin all_merchants registry
          try {
            const rawAll = localStorage.getItem("all_merchants");
            const allList = rawAll ? JSON.parse(rawAll) : [];
            const filtered = allList.filter(
              (m: any) => m.email !== registeredMerchant.email && m.phone !== registeredMerchant.phone
            );
            localStorage.setItem("all_merchants", JSON.stringify([registeredMerchant, ...filtered]));
          } catch (e) {
            console.error("Local sync error", e);
          }
        }

        router.push("/dashboard");
      } else {
        setErrorMsg(regData.error || "নিবন্ধন সম্পন্ন করা যায়নি।");
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <NishchintoLogo size="md" showTagline={true} />
          </Link>
          <div className="pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {step === 1 ? "নতুন মার্চেন্ট অ্যাকাউন্ট খুলুন" : "ইমেইল ওটিপি ভেরিফিকেশন"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {step === 1
                ? "আপনার স্টোরের ধরন (Category) নির্বাচন করুন ও বিনামূল্যে শুরু করুন।"
                : `${email} ঠিকানায় পাঠানো ৬-সংখ্যার কোডটি প্রবেশ করান।`}
            </p>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                step === 1
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-teal-100 text-teal-800"
              }`}
            >
              ১
            </span>
            <span className="text-xs font-bold text-slate-800">স্টোর ও ক্যাটাগরি</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                step === 2
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              ২
            </span>
            <span className="text-xs font-bold text-slate-500">ইমেইল ভেরিফাই</span>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* STEP 1: Basic Info & Business Category Selection */}
        {step === 1 && (
          <form onSubmit={handleProceedToOtp} className="space-y-4">
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
                  placeholder="যেমন: রয়াল মিয়া ফ্যাশন, সুন্দরবন ফার্ম"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            {/* Category Search & Selection Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  আপনার বিজনেসের ক্যাটাগরি নির্ধারণ করুন <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {activeCategoryObj.icon} {activeCategoryObj.nameBn}
                </span>
              </div>

              {/* Search box for category */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="ক্যাটাগরি বা পণ্যের নাম খুঁজুন (পোশাক, মধু, গ্যাজেট, ঘড়ি...)"
                  className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-600 shadow-2xs"
                />
              </div>

              {/* Category Grid */}
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-2xl p-2 bg-slate-50/50 space-y-1.5 custom-scrollbar">
                {filteredCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-teal-50 border-teal-500 shadow-2xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{cat.icon}</span>
                        <div>
                          <p className={`text-xs font-bold leading-tight ${isSelected ? "text-teal-900" : "text-slate-800"}`}>
                            {cat.nameBn}
                          </p>
                          <p className="text-[10px] text-slate-500 leading-tight">
                            {cat.sampleItems.slice(0, 3).join(", ")}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300"></div>
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
                    placeholder="যেমন: রয়েল মিয়া"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
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
                    placeholder="017XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ইমেইল অ্যাড্রেস (ওটিপি পাঠানো হবে) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="merchant@yourbrand.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
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
                  placeholder="কমপক্ষে ৬টি অক্ষর"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 hover:shadow-md cursor-pointer"
            >
              <span>{submitting ? "ওটিপি কোড পাঠানো হচ্ছে..." : "পরবর্তী ধাপ: ইমেইল ওটিপি ভেরিফাই"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Email OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister} className="space-y-5 animate-in fade-in">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl space-y-2 text-center">
              <span className="text-3xl">📩</span>
              <h3 className="text-sm font-bold text-slate-900">
                ভেরিফিকেশন ওটিপি পাঠানো হয়েছে
              </h3>
              <p className="text-xs text-slate-600">
                <strong>{email}</strong> ইমেইলে একটি ৬-সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে।
              </p>
              {devOtpHint && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white border border-teal-300 rounded-xl text-xs text-teal-800 font-mono font-bold">
                  <span>🔑 টেস্ট ওটিপি কোড:</span>
                  <span className="text-sm tracking-widest text-teal-900">{devOtpHint}</span>
                  <button
                    type="button"
                    onClick={() => setOtpCode(devOtpHint)}
                    className="ml-1 text-[10px] text-teal-600 underline font-sans"
                  >
                    অটো ফিল করুন
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block text-center mb-2">
                ৬-সংখ্যার কোডটি লিখুন
              </label>
              <div className="max-w-[280px] mx-auto">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="------"
                  className="w-full py-3 text-center text-2xl font-mono tracking-[0.5em] bg-slate-50 border-2 border-slate-300 rounded-2xl font-black text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-800 font-medium"
              >
                ← ইমেইল বা তথ্য পরিবর্তন
              </button>
              <button
                type="button"
                disabled={resendingOtp}
                onClick={handleResendOtp}
                className="text-teal-700 font-bold hover:underline flex items-center gap-1"
              >
                <RotateCcw className={`w-3 h-3 ${resendingOtp ? "animate-spin" : ""}`} />
                <span>{resendingOtp ? "পাঠানো হচ্ছে..." : "পুনরায় ওটিপি পাঠান"}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting || otpCode.length !== 6}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 hover:shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{submitting ? "যাচাই করা হচ্ছে..." : "অ্যাকাউন্ট ভেরিফাই ও সক্রিয় করুন"}</span>
            </button>
          </form>
        )}

        <div className="text-center pt-1 text-xs text-slate-500">
          <span>ইতিমধ্যে অ্যাকাউন্ট রয়েছে? </span>
          <Link href="/login" className="font-semibold text-teal-700 hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
