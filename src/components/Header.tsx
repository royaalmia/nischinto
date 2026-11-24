"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Store,
  LogOut,
  ArrowLeft,
  BadgeCheck,
  PlusCircle,
  Copy,
  Check,
  X,
  CreditCard,
  Building,
  Smartphone,
  ExternalLink,
  User,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BUSINESS_CATEGORIES, getCategoryById } from "@/lib/categories";
import { MfsLogo } from "@/components/MfsLogos";
import { MessageSquare } from "lucide-react";

interface HeaderProps {
  phoneMasked?: boolean;
  onTogglePhoneMask?: (val: boolean) => void;
}

export default function Header({
  phoneMasked = true,
  onTogglePhoneMask,
}: HeaderProps) {
  const router = useRouter();
  const [masked, setMasked] = useState(phoneMasked);
  const [impersonatedStore, setImpersonatedStore] = useState<string | null>(null);

  // Real Merchant Profile from Session / LocalStorage
  const [merchantData, setMerchantData] = useState<{
    id?: string;
    businessName: string;
    ownerName?: string;
    category?: string;
    walletBalance: number;
    isVerified?: boolean;
  }>({
    businessName: "আমার স্টোর",
    walletBalance: 0,
    isVerified: true,
    category: "GENERAL",
  });

  // Deposit Modal State
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<"BKASH" | "NAGAD" | "ROCKET" | "BANK">("BKASH");
  const [depositAmount, setDepositAmount] = useState("500");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string | null>(null);
  const [depositErrorMsg, setDepositErrorMsg] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Recharge Thank You Popup State
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [submittedDepositInfo, setSubmittedDepositInfo] = useState<{
    amount: string;
    trxId: string;
    method: string;
  } | null>(null);

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Dynamic Payment Accounts State
  const [paymentAccounts, setPaymentAccounts] = useState<any[]>([]);

  const fetchPaymentAccounts = async () => {
    try {
      const res = await fetch("/api/admin/payment-methods?activeOnly=true");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setPaymentAccounts(json.data);
      }
    } catch (e) {
      console.warn("Payment accounts fetch error:", e);
    }
  };

  // Load Merchant Profile & Notifications (Server-backed session)
  const loadProfile = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const json = await res.json();
      if (json.success && json.authenticated && json.user) {
        setMerchantData({
          id: json.user.id,
          businessName: json.user.businessName || "আমার স্টোর",
          ownerName: json.user.ownerName || "মার্চেন্ট",
          category: json.user.category || "GENERAL",
          walletBalance: Number(json.user.walletBalance) || 0,
          isVerified: json.user.isVerified !== false,
        });
        return;
      }
    } catch (e) {
      console.warn("Session fetch fallback", e);
    }

    if (typeof window !== "undefined") {
      const storedImpersonation = sessionStorage.getItem("impersonating_merchant_name");
      if (storedImpersonation) {
        setImpersonatedStore(storedImpersonation);
      }

      const rawUser = localStorage.getItem("merchant_user");
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
          if (parsed && parsed.businessName) {
            setMerchantData({
              id: parsed.id,
              businessName: parsed.businessName,
              ownerName: parsed.ownerName,
              category: parsed.category || "GENERAL",
              walletBalance: Number(parsed.walletBalance) || 0,
              isVerified: parsed.isVerified !== false,
            });
          }
        } catch (e) {
          console.error("Failed to parse merchant_user", e);
        }
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const merchantId = merchantData.id;
      const res = await fetch(`/api/notifications${merchantId ? `?merchantId=${merchantId}` : ""}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        if (data.data.length > 0) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter((n: any) => !n.isRead).length);
        } else {
          // Default initial notification for fresh merchants
          setNotifications([
            {
              id: "notif-welcome",
              title: "Nischinto.app-এ স্বাগতম!",
              message: "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। পণ্য যোগ করে কুরিয়ার ডেলিভারি শুরু করুন।",
              type: "SYSTEM",
              isRead: false,
              createdAt: new Date().toISOString(),
            },
          ]);
          setUnreadCount(1);
        }
      }
    } catch (e) {
      console.warn("Notifications fetch error", e);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [merchantData.id]);

  useEffect(() => {
    fetchPaymentAccounts();
  }, [showDepositModal]);

  const handleToggle = () => {
    const nextVal = !masked;
    setMasked(nextVal);
    if (onTogglePhoneMask) onTogglePhoneMask(nextVal);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("impersonating_merchant_name");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("merchant_user");
    }
    router.push("/");
  };

  const handleExitImpersonation = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("impersonating_merchant_name");
    }
    router.push("/admin");
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDepositErrorMsg(null);
    setDepositSuccessMsg(null);

    if (!depositAmount || !senderNumber || !trxId) {
      setDepositErrorMsg("সকল তথ্য পূরণ করুন।");
      return;
    }

    setDepositSubmitting(true);
    try {
      const res = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantId: merchantData.id,
          amount: Number(depositAmount),
          method: depositMethod,
          senderNumber,
          trxId,
        }),
      });

      const data = await res.json();
      setDepositSubmitting(false);

      if (data.success) {
        setShowDepositModal(false);
        setSubmittedDepositInfo({
          amount: depositAmount,
          method: depositMethod,
          trxId,
        });
        setShowThankYouModal(true);
        setSenderNumber("");
        setTrxId("");
        setDepositErrorMsg(null);
        fetchNotifications();
      } else {
        setDepositErrorMsg(data.error || "ডিপোজিট রিকোয়েস্ট ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      setDepositSubmitting(false);
      setDepositErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।");
    }
  };

  const markAllNotificationsRead = async () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true, merchantId: merchantData.id }),
      });
    } catch (e) {}
  };

  const currentCategory = getCategoryById(merchantData.category || "GENERAL");

  return (
    <>
      {/* Super Admin Impersonation Notice Bar */}
      {impersonatedStore && (
        <div className="bg-amber-500 text-slate-950 px-6 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">⚠️</span>
            <span>সুপার অ্যাডমিন হিসেবে পর্যবেক্ষণ করছেন: <strong>{impersonatedStore}</strong></span>
          </div>
          <button
            onClick={handleExitImpersonation}
            className="px-3 py-1 bg-slate-900 text-amber-300 hover:bg-slate-800 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সুপার অ্যাডমিন প্যানেলে ফিরুন</span>
          </button>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Mobile Menu Trigger + Dynamic Store Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("open-mobile-menu"));
              }
            }}
            className="lg:hidden p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="মেনু খুলুন"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
            <Store className="w-4 h-4 text-teal-600 shrink-0" />
            
            {/* Real Store Name */}
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[100px] sm:max-w-[220px]">
              {impersonatedStore || merchantData.businessName}
            </span>

            {/* Verified Badge */}
            {merchantData.isVerified ? (
              <span
                title="অ্যাডমিন ভেরিফাইড মার্চেন্ট অ্যাকাউন্ট"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-2xs"
              >
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">ভেরিফাইড</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200">
                <span>পেন্ডিং</span>
              </span>
            )}

            {/* Category Pill */}
            <span
              title={`ক্যাটাগরি: ${currentCategory.nameBn}`}
              className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200"
            >
              <span>{currentCategory.icon}</span>
              <span>{currentCategory.nameBn}</span>
            </span>
          </div>
        </div>

        {/* Right: Security Masking, Real Wallet & Recharge, Notifications, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Anti-Theft Phone Masking Toggle */}
          <button
            onClick={handleToggle}
            title="কর্মীদের কাস্টমার ডেটা চুরি রোধে ফোন নম্বর মাস্কিং"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              masked
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {masked ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ডেটা গার্ড: সক্রিয়</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>ডেটা গার্ড: দৃশ্যমান</span>
              </>
            )}
          </button>

          {/* AI & SMS Real Wallet with Deposit Button */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
            <Link
              href="/billing"
              title="বিলিং ও ট্রানজেকশন হিস্টোরি দেখুন"
              className="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-teal-600" />
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">
                  ওয়ালেট
                </span>
                <span className="text-xs font-black text-slate-900 leading-tight">
                  ৳{merchantData.walletBalance.toFixed(2)}
                </span>
              </div>
            </Link>

            {/* Deposit / Recharge Button */}
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>রিচার্জ</span>
            </button>
          </div>

          {/* Notification Center Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 relative transition-all cursor-pointer"
              title="বিজ্ঞপ্তি ও নোটিফিকেশন"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">নোটিফিকেশন</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-teal-50 text-teal-800 text-[10px] font-bold rounded-full border border-teal-200">
                        {unreadCount}টি নতুন
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-teal-700 font-bold hover:underline cursor-pointer"
                    >
                      সব পঠিত করুন
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">কোনো নতুন নোটিফিকেশন নেই</p>
                  ) : (
                    notifications.map((n, idx) => (
                      <div
                        key={n.id || idx}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                          n.isRead
                            ? "bg-white border-slate-100 text-slate-600"
                            : "bg-teal-50/50 border-teal-200 text-slate-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>🔔</span>
                            <span>{n.title}</span>
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {n.createdAt ? new Date(n.createdAt).toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }) : "এখনই"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {n.message}
                        </p>
                        {n.linkUrl && (
                          <Link
                            href={n.linkUrl}
                            onClick={() => setShowNotifications(false)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:underline pt-1"
                          >
                            <span>বিস্তারিত দেখুন</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Action */}
          <Link
            href="/profile"
            title="মার্চেন্ট প্রোফাইল ও সেটিংস"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-2xs"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">প্রোফাইল</span>
          </Link>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            title="লগআউট করে হোমপেজে ফিরুন"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* DEPOSIT / BALANCE RECHARGE MODAL */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  ৳
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">ওয়ালেট ব্যালান্স রিচার্জ করুন</h3>
                  <p className="text-xs text-slate-500">বিকাশ, নগদ বা ব্যাংকের মাধ্যমে নিরাপদ ডিপোজিট</p>
                </div>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error & Success Messages */}
            {depositErrorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {depositErrorMsg}
              </div>
            )}
            {depositSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{depositSuccessMsg}</span>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">পেমেন্ট মেথড নির্বাচন করুন</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "BKASH", name: "bKash" },
                  { id: "NAGAD", name: "নগদ" },
                  { id: "ROCKET", name: "রকেট" },
                  { id: "BANK", name: "ব্যাংক" },
                ]
                  .filter((m) => paymentAccounts.length === 0 || paymentAccounts.some((p) => p.method === m.id))
                  .map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setDepositMethod(m.id as any)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        depositMethod === m.id
                          ? "bg-teal-50 text-teal-900 border-teal-500 shadow-xs ring-1 ring-teal-500"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <MfsLogo method={m.id} className="w-6 h-6 shrink-0" />
                      <span>{m.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Account Details Box with 1-Click Copy */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {depositMethod} পেমেন্ট তথ্য (Send Money / Pay):
              </span>

              {paymentAccounts.filter((p) => p.method === depositMethod).length > 0 ? (
                paymentAccounts
                  .filter((p) => p.method === depositMethod)
                  .map((acc: any) => (
                    <div key={acc.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-900 block font-mono tracking-wide">{acc.accountNumber}</span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {acc.title} ({acc.accountType})
                        </span>
                        {acc.bankName && (
                          <p className="text-[10px] text-slate-600 font-semibold">
                            {acc.bankName} • {acc.branchName}
                          </p>
                        )}
                        {acc.instructions && (
                          <p className="text-[10px] text-teal-700 font-medium">
                            💡 {acc.instructions}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber.replace(/[^0-9]/g, ""), acc.id)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                      >
                        {copiedField === acc.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === acc.id ? "কপি হয়েছে" : "কপি"}</span>
                      </button>
                    </div>
                  ))
              ) : (
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      {depositMethod === "BKASH" ? "01700-000000" : depositMethod === "NAGAD" ? "01800-000000" : depositMethod === "ROCKET" ? "01900-000000-8" : "1501204892019001"}
                    </span>
                    <span className="text-[10px] text-slate-500">{depositMethod} অফিসিয়াল অ্যাকাউন্ট</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("01700000000", depositMethod)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === depositMethod ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === depositMethod ? "কপি হয়েছে" : "কপি"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Deposit Submission Form */}
            <form onSubmit={handleDepositSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  রিচার্জের পরিমাণ (টাকা) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {["500", "1000", "2000", "5000"].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        depositAmount === amt
                          ? "bg-teal-50 border-teal-600 text-teal-800"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  required
                  min={100}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="অন্য পরিমাণ লিখুন (কমপক্ষে ৳১০০)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    প্রেরক নম্বর / একাউন্ট <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    ট্রানজেকশন আইডি (TrxID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="যেমন: BL9A3X9K7"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={depositSubmitting}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{depositSubmitting ? "জমা হচ্ছে..." : "ডিপোজিট রিকোয়েস্ট নিশ্চিত করুন"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Thank You Popup Modal after Recharge Request */}
      {showThankYouModal && submittedDepositInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">ধন্যবাদ! রিচার্জ রিকোয়েস্ট জমা হয়েছে</h3>
              <p className="text-xs text-slate-600 font-medium">
                পরিমাণ: <strong className="text-emerald-700">৳{submittedDepositInfo.amount}</strong> ({submittedDepositInfo.method}) • TrxID:{" "}
                <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{submittedDepositInfo.trxId}</span>
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-left space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-amber-700 text-sm mt-0.5">⏱️</span>
                <p className="text-amber-950 font-medium leading-relaxed">
                  <strong>অনুমোদন অপেক্ষমাণ:</strong> অ্যাডমিন কর্তৃক ট্রানজেকশন আইডি (TrxID) যাচাইয়ের পর স্বয়ংক্রিয়ভাবে ওয়ালেটে ব্যালান্স যুক্ত হবে। সাধারণ সময়: <strong>১৫-৩০ মিনিট</strong>।
                </p>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-amber-200/60">
                <span className="text-teal-700 text-sm mt-0.5">⚡</span>
                <p className="text-slate-700 leading-relaxed">
                  জরুরি ক্যাম্পেইন চলমান থাকলে বা দ্রুত ব্যালান্স পেতে সরাসরি আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন।
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি নিশচিন্ত শপ থেকে বলছি। আমি ৳${submittedDepositInfo.amount} রিচার্জের জন্য ডিপোজিট রিকোয়েস্ট পাঠিয়েছি। TrxID: ${submittedDepositInfo.trxId}। দ্রুত অ্যাপ্রুভ করার অনুরোধ করছি।`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>সাপোর্ট সেন্টারে কথা বলুন (WhatsApp)</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowThankYouModal(false);
                  setSubmittedDepositInfo(null);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                ঠিক আছে, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
