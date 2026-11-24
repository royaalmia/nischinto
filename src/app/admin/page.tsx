"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { formatBDT } from "@/lib/utils";
import {
  ShieldAlert,
  Users,
  DollarSign,
  TrendingUp,
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  PhoneCall,
  Truck,
  Layers,
  Settings,
  CreditCard,
  Ban,
  Database,
  Radio,
  Sliders,
  Send,
  Eye,
  Key,
  Bell,
  RefreshCw,
  Cpu,
  Lock,
  Globe,
  Terminal,
  FileText,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Check,
  X,
  LogIn,
  BadgeCheck,
} from "lucide-react";

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "MERCHANTS" | "DEPOSITS" | "PAYMENT_METHODS" | "SUBSCRIPTIONS" | "FRAUD_DB" | "AI_GATEWAYS" | "COURIERS" | "SYSTEM_SETTINGS" | "AUDIT_LOGS"
  >("OVERVIEW");

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Merchant Modal State
  const [isAddMerchantOpen, setIsAddMerchantOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState("GROWTH");

  // Payment Methods State & Modal
  const [paymentMethodsList, setPaymentMethodsList] = useState<any[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [newPmMethod, setNewPmMethod] = useState<"BKASH" | "NAGAD" | "ROCKET" | "UPAY" | "BANK">("BKASH");
  const [newPmTitle, setNewPmTitle] = useState("");
  const [newPmType, setNewPmType] = useState<"MERCHANT" | "PERSONAL" | "AGENT" | "CURRENT">("MERCHANT");
  const [newPmNumber, setNewPmNumber] = useState("");
  const [newPmBankName, setNewPmBankName] = useState("");
  const [newPmBranch, setNewPmBranch] = useState("");
  const [newPmRouting, setNewPmRouting] = useState("");
  const [newPmInstructions, setNewPmInstructions] = useState("");

  // Real Merchants State (Zero Fake Demo Stores)
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loadingMerchants, setLoadingMerchants] = useState(true);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<any[]>([
    {
      id: "LOG-501",
      action: "MERCHANT_SYNC",
      details: "রিয়েল-টাইম মার্চেন্ট ডেটাবেস সিঙ্ক সম্পন্ন",
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "২০২৬-১১-২৪ ০২:৪৫ AM",
    },
    {
      id: "LOG-502",
      action: "FRAUD_BLACKLIST_ADD",
      details: "০১৭৮৮১১২২৩৩ নম্বরটি সেন্ট্রাল ফ্রড ব্লকলিস্টে যুক্ত করা হয়েছে",
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "২০২৬-১১-২৪ ০২:৩০ AM",
    },
    {
      id: "LOG-503",
      action: "SECURITY_CHECK",
      details: "ক্লাউডফ্লেয়ার এজ ও CAPI সার্ভার সংযোগ নিশ্চিত",
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "২০২৬-১১-২৪ ০১:১৫ AM",
    },
  ]);

  // Fetch Real Registered Merchants from API & Local Storage
  const fetchMerchants = async () => {
    try {
      setLoadingMerchants(true);
      let apiMerchants: any[] = [];
      try {
        const res = await fetch("/api/admin/merchants");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          apiMerchants = json.data.map((m: any) => ({
            id: m.id,
            storeName: m.businessName || m.storeName || "আমার স্টোর",
            ownerName: m.ownerName || "মার্চেন্ট",
            phone: m.phone || "N/A",
            email: m.email || "N/A",
            plan: m.plan || "GROWTH",
            ordersProcessed: m.orders ? m.orders.length : 0,
            walletBalance: m.walletBalance ?? 0,
            joinedDate: m.createdAt ? new Date(m.createdAt).toLocaleDateString("bn-BD") : "২০২৬-১১-২৪",
            status: "ACTIVE",
          }));
        }
      } catch (err) {
        console.warn("API merchants fetch fallback to localStorage:", err);
      }

      // Check localStorage for newly registered merchants
      let localMerchants: any[] = [];
      if (typeof window !== "undefined") {
        try {
          const rawAll = localStorage.getItem("all_merchants");
          if (rawAll) {
            const parsed = JSON.parse(rawAll);
            if (Array.isArray(parsed)) {
              localMerchants = parsed.map((m: any) => ({
                id: m.id || `MCH-${Date.now()}`,
                storeName: m.businessName || m.storeName || "আমার স্টোর",
                ownerName: m.ownerName || "মার্চেন্ট",
                phone: m.phone || "N/A",
                email: m.email || "N/A",
                plan: m.plan || "PRO_AI",
                ordersProcessed: m.ordersProcessed ?? 0,
                walletBalance: m.walletBalance ?? 0,
                joinedDate: m.joinedDate || "২০২৬-১১-২৪",
                status: m.status || "ACTIVE",
              }));
            }
          }

          // Also check single merchant_user session
          const rawUser = localStorage.getItem("merchant_user");
          if (rawUser) {
            const single = JSON.parse(rawUser);
            if (single && single.businessName) {
              const formatted = {
                id: single.id || `MCH-${Date.now()}`,
                storeName: single.businessName || single.storeName,
                ownerName: single.ownerName || "মার্চেন্ট",
                phone: single.phone || "N/A",
                email: single.email || "N/A",
                plan: single.plan || "PRO_AI",
                ordersProcessed: single.ordersProcessed ?? 0,
                walletBalance: single.walletBalance ?? 0,
                joinedDate: single.joinedDate || "২০২৬-১১-২৪",
                status: "ACTIVE",
              };
              if (!localMerchants.some((m) => m.email === formatted.email && m.phone === formatted.phone)) {
                localMerchants.unshift(formatted);
              }
            }
          }
        } catch (e) {
          console.error("Local storage merchants parse error", e);
        }
      }

      // Merge and deduplicate by phone/email
      const map = new Map<string, any>();
      [...apiMerchants, ...localMerchants].forEach((m) => {
        const key = m.phone !== "N/A" ? m.phone : m.email;
        if (!map.has(key)) {
          map.set(key, m);
        }
      });

      const merged = Array.from(map.values());
      setMerchants(merged);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMerchants(false);
    }
  };

  // Real Wallet Deposit Requests Queue
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loadingDeposits, setLoadingDeposits] = useState(false);

  const fetchDeposits = async () => {
    try {
      setLoadingDeposits(true);
      const res = await fetch("/api/wallet/deposit?isAdmin=true");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setDeposits(json.data);
      }
    } catch (e) {
      console.warn("Deposits fetch failed:", e);
    } finally {
      setLoadingDeposits(false);
    }
  };

  const handleApproveDeposit = async (depId: string) => {
    try {
      const res = await fetch("/api/wallet/deposit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depositId: depId, action: "APPROVE" }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "ডিপোজিট অনুমোদিত হয়েছে!");
        fetchDeposits();
        fetchMerchants();
        logAdminAction("DEPOSIT_APPROVED", `ডিপোজিট আইডি ${depId} অনুমোদন করা হয়েছে`);
      } else {
        showToast(json.error || "অনুমোদন ব্যর্থ হয়েছে।");
      }
    } catch (e) {
      showToast("অনুমোদন সম্পন্ন করা যায়নি।");
    }
  };

  const handleRejectDeposit = async (depId: string) => {
    const reason = prompt("বাতিলের কারণ লিখুন:") || "TrxID বা তথ্যের অমিল";
    try {
      const res = await fetch("/api/wallet/deposit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depositId: depId, action: "REJECT", adminRemarks: reason }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "ডিপোজিট বাতিল করা হয়েছে।");
        fetchDeposits();
        logAdminAction("DEPOSIT_REJECTED", `ডিপোজিট আইডি ${depId} বাতিল করা হয়েছে (${reason})`);
      } else {
        showToast(json.error || "বাতিল করতে সমস্যা হয়েছে।");
      }
    } catch (e) {
      showToast("অ্যাকশন সম্পন্ন করা যায়নি।");
    }
  };

  const handleToggleVerification = (mId: string) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === mId) {
          const nextVal = !m.isVerified;
          showToast(`${m.storeName} ${nextVal ? "ভেরিফাই ও অনুমোদিত হয়েছে ✓" : "ভেরিফিকেশন প্রত্যাহার করা হয়েছে"}`);
          logAdminAction("MERCHANT_VERIFICATION", `${m.storeName} (${m.ownerName}) ভেরিফিকেশন: ${nextVal ? "APPROVED" : "REVOKED"}`);
          
          if (typeof window !== "undefined") {
            try {
              const rawAll = localStorage.getItem("all_merchants");
              if (rawAll) {
                const list = JSON.parse(rawAll);
                const updated = list.map((item: any) => item.id === mId ? { ...item, isVerified: nextVal } : item);
                localStorage.setItem("all_merchants", JSON.stringify(updated));
              }
              const rawUser = localStorage.getItem("merchant_user");
              if (rawUser) {
                const u = JSON.parse(rawUser);
                if (u.id === mId) {
                  localStorage.setItem("merchant_user", JSON.stringify({ ...u, isVerified: nextVal }));
                }
              }
            } catch (e) {}
          }
          return { ...m, isVerified: nextVal };
        }
        return m;
      })
    );
  };

  useEffect(() => {
    fetchMerchants();
    fetchDeposits();
    fetchPaymentMethods();
  }, []);

  // Payment Methods Handlers
  const fetchPaymentMethods = async () => {
    try {
      setLoadingPaymentMethods(true);
      const res = await fetch("/api/admin/payment-methods");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPaymentMethodsList(json.data);
      }
    } catch (e) {
      console.warn("Payment methods fetch error:", e);
    } finally {
      setLoadingPaymentMethods(false);
    }
  };

  const handleTogglePaymentMethodActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/payment-methods", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "পেমেন্ট অ্যাকাউন্ট স্ট্যাটাস আপডেট হয়েছে!");
        fetchPaymentMethods();
        logAdminAction("PAYMENT_METHOD_TOGGLE", `পেমেন্ট অ্যাকাউন্ট ID: ${id} স্ট্যাটাস: ${!currentStatus ? "ACTIVE" : "INACTIVE"}`);
      }
    } catch (e) {
      showToast("স্ট্যাটাস আপডেট করা যায়নি।");
    }
  };

  const handleCreatePaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPmNumber) {
      showToast("অনুগ্রহ করে অ্যাকাউন্ট নম্বর লিখুন।");
      return;
    }

    try {
      const res = await fetch("/api/admin/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: newPmMethod,
          title: newPmTitle || `${newPmMethod} অ্যাকাউন্ট`,
          accountType: newPmType,
          accountNumber: newPmNumber,
          bankName: newPmMethod === "BANK" ? newPmBankName : undefined,
          branchName: newPmMethod === "BANK" ? newPmBranch : undefined,
          routingNumber: newPmMethod === "BANK" ? newPmRouting : undefined,
          instructions: newPmInstructions || (newPmMethod === "BKASH" ? "Make Payment অপশন ব্যবহার করুন" : "Send Money অপশন ব্যবহার করুন"),
          isActive: true,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("নতুন পেমেন্ট অ্যাকাউন্ট সফলভাবে যোগ হয়েছে!");
        setIsAddPaymentOpen(false);
        setNewPmNumber("");
        setNewPmTitle("");
        setNewPmInstructions("");
        setNewPmBankName("");
        setNewPmBranch("");
        setNewPmRouting("");
        fetchPaymentMethods();
        logAdminAction("PAYMENT_METHOD_CREATED", `নতুন মেথড যোগ: ${newPmMethod} (${newPmNumber})`);
      } else {
        showToast(json.error || "অ্যাকাউন্ট যোগ করা যায়নি।");
      }
    } catch (e) {
      showToast("সার্ভার ত্রুটি!");
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই পেমেন্ট অ্যাকাউন্টটি মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/admin/payment-methods?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("পেমেন্ট অ্যাকাউন্ট মুছে ফেলা হয়েছে।");
        fetchPaymentMethods();
        logAdminAction("PAYMENT_METHOD_DELETED", `পেমেন্ট মেথড ডিলিট: ID ${id}`);
      }
    } catch (e) {
      showToast("মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // Pending Subscription Payments Queue
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);

  // Central Fraud Database Entries
  const [fraudEntries, setFraudEntries] = useState<any[]>([
    {
      phone: "01999000111",
      reportedBy: "সেন্ট্রাল কুরিয়ার ফ্রড এপিআই",
      returnCount: 7,
      deliveredCount: 1,
      riskScore: 88,
      reason: "পার্সেল রিসিভ না করে রাইডারকে ফোন বন্ধ রাখা ও ডেলিভারি রিজেক্ট করা",
      addedDate: "২০২৬-১১-২২",
      status: "BLACKLISTED",
    },
    {
      phone: "01788112233",
      reportedBy: "Steadfast Central Sync",
      returnCount: 12,
      deliveredCount: 0,
      riskScore: 98,
      reason: "অর্ডার কনফার্ম করে পরে ঠিকানা ভুল দেওয়া ও ভুয়া অর্ডার প্লেসমেন্ট",
      addedDate: "২০২৬-১১-২৩",
      status: "BLACKLISTED",
    },
  ]);

  const [newFraudPhone, setNewFraudPhone] = useState("");
  const [newFraudReason, setNewFraudReason] = useState("");

  // Courier Gateways Master Status
  const [courierGateways, setCourierGateways] = useState<any[]>([
    {
      name: "Steadfast Courier API",
      endpoint: "https://portal.steadfast.com.bd/api/v1",
      status: "OPERATIONAL",
      uptime: "৯৯.৯৮%",
      latency: "১২৪ ms",
      dailyBookings: 8450,
      errorRate: "০.০২%",
    },
    {
      name: "Pathao Courier Hermes API",
      endpoint: "https://api-hermes.pathao.com/aladdin/api/v1",
      status: "OPERATIONAL",
      uptime: "৯৯.৯৫%",
      latency: "১৪৫ ms",
      dailyBookings: 4120,
      errorRate: "০.০৫%",
    },
    {
      name: "RedX Logistics API",
      endpoint: "https://openapi.redx.com.bd/v1.0.0-beta",
      status: "OPERATIONAL",
      uptime: "৯৯.৯১%",
      latency: "১৮০ ms",
      dailyBookings: 1890,
      errorRate: "০.০৮%",
    },
    {
      name: "Paperfly Wings API",
      endpoint: "https://api.paperfly.com.bd/v1",
      status: "MAINTENANCE",
      uptime: "৯৮.২০%",
      latency: "৪৫০ ms",
      dailyBookings: 0,
      errorRate: "২.১০%",
    },
  ]);

  // AI & Notification Engine Status
  const [aiGateways, setAiGateways] = useState<any[]>([
    {
      name: "Bengali Conversational Voice Agent",
      provider: "Nischinto Neural TTS & Whisper LLM",
      status: "ACTIVE",
      costPerMinute: 1.5,
      activeChannels: 45,
      successRate: "৯১.৫%",
    },
    {
      name: "Meta Marketing & CAPI Server Engine",
      provider: "Graph API v21.0 Gateway",
      status: "ACTIVE",
      costPerMinute: 0.0,
      activeChannels: 120,
      successRate: "৯৯.২%",
    },
    {
      name: "WhatsApp Cloud Business Broadcast",
      provider: "Meta WhatsApp API (Official)",
      status: "ACTIVE",
      costPerMinute: 0.85,
      activeChannels: 80,
      successRate: "৯৮.৭%",
    },
    {
      name: "Bangladesh SMS Gateway Aggregator",
      provider: "Greenweb / Reve Multi-Route",
      status: "ACTIVE",
      costPerMinute: 0.35,
      activeChannels: 250,
      successRate: "৯৯.৮%",
    },
  ]);

  // Global Announcement / Broadcast
  const [announcement, setAnnouncement] = useState(
    "Nishchinto v2.4 আপডেট লাইভ হয়েছে। নতুন বারকোড স্ক্যানার ও ইনকমপ্লিট অর্ডার ক্যাচার এখন সক্রিয়।"
  );
  const [announcementActive, setAnnouncementActive] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logAdminAction = (action: string, details: string) => {
    const newLog = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      action,
      details,
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "এখনই",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleCreateMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newOwnerName || !newPhone) return;

    const newM: any = {
      id: `mch_${Date.now()}`,
      businessName: newStoreName,
      storeName: newStoreName,
      ownerName: newOwnerName,
      phone: newPhone,
      email: newEmail || `${newPhone}@store.nishchinto.app`,
      plan: newPlan,
      ordersProcessed: 0,
      walletBalance: 500.0,
      joinedDate: new Date().toLocaleDateString("bn-BD"),
      status: "ACTIVE",
    };

    // Save to API
    try {
      await fetch("/api/admin/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newM),
      });
    } catch (e) {
      console.warn("API save merchant skipped:", e);
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("all_merchants");
        const list = raw ? JSON.parse(raw) : [];
        localStorage.setItem("all_merchants", JSON.stringify([newM, ...list]));
      } catch (e) {}
    }

    setMerchants([newM, ...merchants]);
    setIsAddMerchantOpen(false);
    setNewStoreName("");
    setNewOwnerName("");
    setNewPhone("");
    setNewEmail("");
    showToast(`নতুন স্টোর '${newM.storeName}' সফলভাবে তৈরি হয়েছে`);
    logAdminAction("MERCHANT_CREATED", `নতুন মার্চেন্ট স্টোর ${newM.storeName} (${newM.ownerName}) তৈরি করা হয়েছে`);
  };

  // Actions
  const handleToggleMerchantStatus = (id: string) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          showToast(`মার্চেন্ট ${m.storeName} স্ট্যাটাস ${nextStatus} করা হয়েছে`);
          logAdminAction("MERCHANT_STATUS_CHANGE", `${m.storeName} স্ট্যাটাস পরিবর্তন: ${nextStatus}`);
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const handleWalletRecharge = (id: string, amount: number) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newBal = (m.walletBalance || 0) + amount;
          showToast(`${m.storeName}-এ ৳${amount} ক্রেডিট রিচার্জ সফল`);
          logAdminAction("WALLET_RECHARGE", `${m.storeName}-এ ৳${amount} রিচার্জ করা হয়েছে`);
          return { ...m, walletBalance: newBal };
        }
        return m;
      })
    );
  };

  // 1-Click Login into Merchant Account
  const handleImpersonateLogin = (m: any) => {
    if (typeof window !== "undefined") {
      const merchantSession = {
        id: m.id,
        businessName: m.storeName || m.businessName,
        ownerName: m.ownerName,
        phone: m.phone,
        email: m.email,
        plan: m.plan,
        walletBalance: m.walletBalance,
      };
      localStorage.setItem("merchant_user", JSON.stringify(merchantSession));
      sessionStorage.setItem("impersonating_merchant_name", m.storeName);
      sessionStorage.setItem("impersonating_merchant_id", m.id);
    }
    logAdminAction("IMPERSONATE_LOGIN", `সুপার অ্যাডমিন কর্তৃক ${m.storeName} (${m.ownerName})-এর অ্যাকাউন্টে প্রবেশ`);
    showToast(`${m.storeName}-এর অ্যাকাউন্টে সরাসরি লগইন করা হচ্ছে...`);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 400);
  };

  const handleApprovePayment = (id: string) => {
    setPendingPayments((prev) => prev.filter((p) => p.id !== id));
    showToast(`পেমেন্ট ${id} সফলভাবে অনুমোদন করা হয়েছে`);
    logAdminAction("PAYMENT_APPROVED", `পেমেন্ট রিকোয়েস্ট ${id} অনুমোদন করা হয়েছে`);
  };

  const handleAddFraudNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFraudPhone) return;

    const newEntry = {
      phone: newFraudPhone,
      reportedBy: "Super Admin Direct",
      returnCount: 1,
      deliveredCount: 0,
      riskScore: 95,
      reason: newFraudReason || "সুপার এডমিন কর্তৃক সরাসরি ব্লকলিস্টে যুক্ত",
      addedDate: "২০২৬-১১-২৪",
      status: "BLACKLISTED",
    };

    setFraudEntries([newEntry, ...fraudEntries]);
    setNewFraudPhone("");
    setNewFraudReason("");
    showToast(`নম্বর ${newFraudPhone} সেন্ট্রাল ফ্রড ডেটাবেসে যুক্ত হয়েছে`);
  };

  const handleDeleteFraudEntry = (phone: string) => {
    setFraudEntries((prev) => prev.filter((f) => f.phone !== phone));
    showToast(`নম্বর ${phone} ফ্রড ডেটাবেস থেকে সরানো হয়েছে`);
  };

  const filteredMerchants = merchants.filter((m) => {
    const matchesSearch =
      (m.storeName || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.ownerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.phone || "").includes(search);
    const matchesPlan = planFilter === "ALL" || m.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="sm" showBangla={true} />
          </Link>
          <span className="hidden sm:inline-block text-slate-300">|</span>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[11px] font-bold">
            <Lock className="w-3 h-3 text-red-600" />
            <span>SUPER ADMIN MASTER CONTROL</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>সার্ভার স্বাস্থ্য: ১০০% লাইভ</span>
          </div>
          <Link
            href="/dashboard"
            className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>মার্চেন্ট ড্যাশবোর্ড দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Master Tabs Subheader */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sticky top-16 z-30 overflow-x-auto scrollbar-none shadow-xs">
        <div className="flex items-center gap-1.5 py-2.5 max-w-7xl mx-auto">
          {[
            { id: "OVERVIEW", label: "প্ল্যাটফর্ম ওভারভিউ", icon: TrendingUp },
            { id: "MERCHANTS", label: "মার্চেন্ট ও স্টোরস", icon: Users, badge: merchants.length },
            {
              id: "DEPOSITS",
              label: "ডিপোজিট ও রিচার্জ অনুমোদন",
              icon: DollarSign,
              badge: deposits.filter((d) => d.status === "PENDING").length > 0
                ? `${deposits.filter((d) => d.status === "PENDING").length} পেন্ডিং`
                : undefined,
              badgeColor: "bg-teal-700 text-white",
            },
            {
              id: "PAYMENT_METHODS",
              label: "পেমেন্ট একাউন্টস ও মেথড",
              icon: CreditCard,
              badge: paymentMethodsList.filter((p) => p.isActive).length > 0
                ? `${paymentMethodsList.filter((p) => p.isActive).length} সক্রিয়`
                : undefined,
              badgeColor: "bg-emerald-600 text-white",
            },
            {
              id: "SUBSCRIPTIONS",
              label: "সাবস্ক্রিপশন ও বিলিং",
              icon: CreditCard,
              badge: pendingPayments.length > 0 ? `${pendingPayments.length} পেন্ডিং` : undefined,
              badgeColor: "bg-amber-500",
            },
            { id: "FRAUD_DB", label: "সেন্ট্রাল ফ্রড ডেটাবেস", icon: ShieldAlert, badge: fraudEntries.length },
            { id: "AI_GATEWAYS", label: "AI ও ভয়েস ইঞ্জিন", icon: Sparkles },
            { id: "COURIERS", label: "কুরিয়ার এপিআই হাব", icon: Truck },
            { id: "SYSTEM_SETTINGS", label: "গ্লোবাল সেটিংস ও ব্যানার", icon: Sliders },
            { id: "AUDIT_LOGS", label: "অডিট ও সিকিউরিটি লগ", icon: Terminal, badge: auditLogs.length },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-teal-600"}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                      tab.badgeColor || (isSelected ? "bg-teal-700 text-white" : "bg-slate-200 text-slate-700")
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================== */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>নিবন্ধিত মার্চেন্ট স্টোরস</span>
                  <Building2 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {merchants.length} টি
                </div>
                <p className="text-[11px] text-teal-700 font-medium">রিয়েল-টাইম রেজিস্টার্ড স্টোরস</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>সক্রিয় স্টোরস</span>
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-600 font-mono">
                  {merchants.filter((m) => m.status === "ACTIVE").length} টি
                </div>
                <p className="text-[11px] text-slate-500">১০০% অ্যাক্টিভ ও ভেরিফাইড</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>সেন্ট্রাল ফ্রড রেকর্ড</span>
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-amber-600 font-mono">
                  {fraudEntries.length} টি
                </div>
                <p className="text-[11px] text-slate-500">সেন্ট্রাল কুরিয়ার ব্লকলিস্ট ভেরিফাইড</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>ক্লাউড ও সার্ভার আপটাইম</span>
                  <Server className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-extrabold text-indigo-600 font-mono">
                  ৯৯.৯৮%
                </div>
                <p className="text-[11px] text-slate-500">ক্লাউডফ্লেয়ার এজ গ্লোবাল নেটওয়ার্ক</p>
              </div>
            </div>

            {/* Platform Quick Health & Live Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Recent Registrations & Live Order Volume */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>সর্বশেষ নিবন্ধিত মার্চেন্ট স্টোরস</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("MERCHANTS")}
                    className="text-xs text-teal-600 hover:underline font-bold"
                  >
                    সব দেখুন ({merchants.length}) →
                  </button>
                </div>

                {merchants.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    এখনও কোনো নতুন মার্চেন্ট একাউন্ট নিবন্ধিত হয়নি।
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 text-xs">
                    {merchants.slice(0, 5).map((m) => (
                      <div key={m.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{m.storeName}</div>
                          <div className="text-[11px] text-slate-500">
                            মালিক: {m.ownerName} • {m.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                            {m.plan}
                          </span>
                          <button
                            onClick={() => handleImpersonateLogin(m)}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1"
                          >
                            <LogIn className="w-3 h-3" />
                            <span>লগইন</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Col: Gateways Status Snapshot */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-teal-600" />
                    <span>কোর গেটওয়ে লাইভ স্ট্যাটাস</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("COURIERS")}
                    className="text-xs text-teal-600 hover:underline font-bold"
                  >
                    বিস্তারিত →
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {courierGateways.map((cg) => (
                    <div
                      key={cg.name}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-800">{cg.name}</div>
                        <div className="text-[10px] text-slate-500">ল্যাটেন্সি: {cg.latency}</div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          cg.status === "OPERATIONAL"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {cg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: MERCHANTS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "MERCHANTS" && (
          <div className="space-y-4 animate-in fade-in">
            {/* Search & Plan Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="স্টোর নাম, মালিক বা ফোন নম্বর..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-medium">প্ল্যান:</span>
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                  >
                    <option value="ALL">সব প্ল্যান</option>
                    <option value="STARTER">STARTER</option>
                    <option value="GROWTH">GROWTH</option>
                    <option value="PRO_AI">PRO_AI</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={fetchMerchants}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMerchants ? "animate-spin" : ""}`} />
                  <span>রিফ্রেশ</span>
                </button>
                <button
                  onClick={() => setIsAddMerchantOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন মার্চেন্ট যুক্ত করুন</span>
                </button>
              </div>
            </div>

            {/* Merchants Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold">
                    <th className="p-3.5 text-left">স্টোর ও আইডি</th>
                    <th className="p-3.5 text-left">মালিক ও ফোন</th>
                    <th className="p-3.5 text-left">প্ল্যান</th>
                    <th className="p-3.5 text-left">অর্ডার প্রসেসড</th>
                    <th className="p-3.5 text-left">AI ওয়ালেট</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">মাস্টার অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loadingMerchants ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        মার্চেন্ট ডেটা লোড হচ্ছে...
                      </td>
                    </tr>
                  ) : filteredMerchants.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center space-y-3">
                        <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                        <h4 className="text-sm font-bold text-slate-700">কোনো মার্চেন্ট স্টোর পাওয়া যায়নি</h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          গ্রাহক নিবন্ধন সম্পন্ন করলে অথবা ওপরের <strong>'নতুন মার্চেন্ট যুক্ত করুন'</strong> বাটনে ক্লিক করে স্টোর তৈরি করলে তা এখানে তালিকাভুক্ত হবে।
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredMerchants.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{m.storeName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {m.id}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">{m.ownerName}</div>
                          <div className="text-[10px] font-mono text-slate-500">{m.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                            {m.plan}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-slate-900">
                          {m.ordersProcessed || 0} টি
                        </td>
                        <td className="p-3.5 font-mono font-bold text-teal-700">
                          {formatBDT(m.walletBalance || 0)}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              m.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleImpersonateLogin(m)}
                              title="মার্চেন্ট ড্যাশবোর্ডে লগইন করুন"
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 shadow-2xs"
                            >
                              <LogIn className="w-3 h-3" />
                              <span>লগইন</span>
                            </button>
                            <button
                              onClick={() => handleWalletRecharge(m.id, 500)}
                              title="৳ ৫০০ ওয়ালেট ক্রেডিট রিচার্জ"
                              className="px-2 py-1 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 text-[11px] font-bold rounded-lg transition-all"
                            >
                              +৳৫০০
                            </button>
                            <button
                              onClick={() => handleToggleMerchantStatus(m.id)}
                              className={`px-2 py-1 border text-[11px] font-bold rounded-lg transition-all ${
                                m.status === "ACTIVE"
                                  ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                              }`}
                            >
                              {m.status === "ACTIVE" ? "সাসপেন্ড" : "সক্রিয়"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: WALLET DEPOSITS & RECHARGE APPROVAL */}
        {/* ============================================================== */}
        {activeTab === "DEPOSITS" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-3 gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span>মার্চেন্ট ওয়ালেট ডিপোজিট ও রিচার্জ অনুমোদন কিউ</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    বিকাশ, নগদ বা ব্যাংকের মাধ্যমে মার্চেন্টদের প্রেরিত TrxID যাচাই করে ওয়ালেট ব্যালান্স অনুমোদন ও ট্যাক্স ইনভয়েস জেনারেশন।
                  </p>
                </div>
                <button
                  onClick={fetchDeposits}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingDeposits ? "animate-spin" : ""}`} />
                  <span>রিফ্রেশ</span>
                </button>
              </div>

              {deposits.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <p className="font-bold text-slate-700">কোনো পেন্ডিং ডিপোজিট রিকোয়েস্ট নেই</p>
                  <p>মার্চেন্ট ড্যাশবোর্ড থেকে রিচার্জ রিকোয়েস্ট পাঠালে তা এখানে তালিকাভুক্ত হবে।</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                        <th className="p-3">মার্চেন্ট ও স্টোর</th>
                        <th className="p-3">পরিমাণ</th>
                        <th className="p-3">মেথড</th>
                        <th className="p-3">প্রেরক নম্বর</th>
                        <th className="p-3">ট্রানজেকশন ID (TrxID)</th>
                        <th className="p-3">ইনভয়েস নং</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {deposits.map((dep) => (
                        <tr key={dep.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">
                              {dep.merchant?.businessName || "মার্চেন্ট"}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {dep.merchant?.ownerName} • {dep.merchant?.phone}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-teal-700 text-sm">
                            {formatBDT(dep.amount)}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {dep.method}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{dep.senderNumber}</td>
                          <td className="p-3 font-mono font-bold text-indigo-700 uppercase">{dep.trxId}</td>
                          <td className="p-3 font-mono text-slate-500">{dep.invoiceNumber || "INV-PENDING"}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              dep.status === "APPROVED"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : dep.status === "REJECTED"
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}>
                              {dep.status === "APPROVED" ? "অনুমোদিত ✓" : dep.status === "REJECTED" ? "বাতিল" : "অপেক্ষমাণ"}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {dep.status === "PENDING" ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleApproveDeposit(dep.id)}
                                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                                >
                                  অনুমোদন
                                </button>
                                <button
                                  onClick={() => handleRejectDeposit(dep.id)}
                                  className="px-2 py-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-bold rounded-lg transition-all cursor-pointer"
                                >
                                  বাতিল
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium">মীমাংসিত</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: PAYMENT METHODS & ACCOUNTS MANAGER */}
        {/* ============================================================== */}
        {activeTab === "PAYMENT_METHODS" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-3 gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    <span>পেমেন্ট গেটওয়ে ও অ্যাকাউন্টস ব্যবস্থাপনা</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    মার্চেন্ট প্যানেলে ব্যালেন্স রিচার্জের সময় প্রদর্শিত বিকাশ, নগদ, রকেট ও ব্যাংক একাউন্ট নম্বর যুক্ত, সক্রিয়/নিষ্ক্রিয় ও মুছে ফেলুন।
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchPaymentMethods}
                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingPaymentMethods ? "animate-spin" : ""}`} />
                    <span>রিফ্রেশ</span>
                  </button>
                  <button
                    onClick={() => setIsAddPaymentOpen(true)}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন অ্যাকাউন্ট যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Status Summary Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-semibold">মোট অ্যাকাউন্ট</span>
                    <span className="text-lg font-bold text-slate-900">{paymentMethodsList.length} টি</span>
                  </div>
                  <CreditCard className="w-6 h-6 text-slate-400" />
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-700 block font-semibold">সক্রিয় গেটওয়ে (Active)</span>
                    <span className="text-lg font-bold text-emerald-800">
                      {paymentMethodsList.filter((p) => p.isActive).length} টি
                    </span>
                  </div>
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-amber-700 block font-semibold">নিষ্ক্রিয় (Inactive)</span>
                    <span className="text-lg font-bold text-amber-800">
                      {paymentMethodsList.filter((p) => !p.isActive).length} টি
                    </span>
                  </div>
                  <X className="w-6 h-6 text-amber-500" />
                </div>
              </div>

              {/* Accounts List Table */}
              {paymentMethodsList.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <p className="font-bold text-slate-700">কোনো পেমেন্ট অ্যাকাউন্ট পাওয়া যায়নি</p>
                  <p>উপরের বাটন চেপে বিকাশ, নগদ বা ব্যাংক একাউন্ট নম্বর যোগ করুন।</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                        <th className="p-3">মেথড ও নাম</th>
                        <th className="p-3">অ্যাকাউন্ট টাইপ</th>
                        <th className="p-3">অ্যাকাউন্ট নম্বর / A/C</th>
                        <th className="p-3">নির্দেশনা / ব্যাংক ডিটেইলস</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {paymentMethodsList.map((pm) => (
                        <tr key={pm.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                                pm.method === "BKASH"
                                  ? "bg-pink-50 text-pink-700 border border-pink-200"
                                  : pm.method === "NAGAD"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : pm.method === "ROCKET"
                                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                                  : pm.method === "BANK"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}>
                                {pm.method}
                              </span>
                              <span className="font-bold text-slate-900">{pm.title}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                              {pm.accountType}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-mono font-bold text-slate-900 text-sm">{pm.accountNumber}</span>
                          </td>
                          <td className="p-3 max-w-xs text-slate-500 text-[11px]">
                            {pm.bankName && <p className="font-semibold text-slate-700">{pm.bankName} ({pm.branchName || "Main Branch"})</p>}
                            <p>{pm.instructions || "N/A"}</p>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleTogglePaymentMethodActive(pm.id, pm.isActive)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                                pm.isActive
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                              }`}
                            >
                              <span>{pm.isActive ? "সক্রিয় ✓" : "নিষ্ক্রিয় ✕"}</span>
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeletePaymentMethod(pm.id)}
                              className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                              title="অ্যাকাউন্ট মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>মুছুন</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
        {/* ============================================================== */}
        {activeTab === "SUBSCRIPTIONS" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Pending Payments Alert */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>পেন্ডিং bKash ও Nagad পেমেন্ট অনুমোদন কিউ</span>
                </h3>
                <span className="text-xs text-amber-700 font-mono font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {pendingPayments.length} টি পেমেন্ট যাচাইয়ের অপেক্ষায়
                </span>
              </div>

              {pendingPayments.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  কোনো পেন্ডিং সাবস্ক্রিপশন পেমেন্ট নেই। সব রিকোয়েস্ট স্বয়ংক্রিয়ভাবে প্রসেসড।
                </div>
              ) : (
                <div className="divide-y divide-slate-100 text-xs">
                  {pendingPayments.map((p) => (
                    <div key={p.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{p.storeName}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {p.method}
                          </span>
                        </div>
                        <div className="text-slate-600 font-mono">
                          প্রেরক নম্বর: {p.senderNumber} • TrxID:{" "}
                          <span className="text-amber-700 font-bold">{p.trxId}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">অনুরোধকৃত প্যাকেজ: {p.planRequested} • তারিখ: {p.date}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-slate-500 block">মোট পরিশোধ</span>
                          <span className="text-base font-bold text-emerald-600 font-mono">
                            {formatBDT(p.amount)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleApprovePayment(p.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>অনুমোদন করুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Plan Pricing Controller */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>প্ল্যাটফর্ম প্যাকেজ প্রাইসিং কনফিগারেশন</span>
              </h3>
              <p className="text-xs text-slate-500">
                প্যাকেজ মূল্য ও ফিচারসমূহ মূল সাইট ও পেমেন্ট গেটওয়েতে রিয়েল-টাইম সিঙ্ক থাকে।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700">STARTER প্ল্যান</span>
                  <div className="text-lg font-bold text-slate-900 font-mono">৳ ৯৯৯ / মাস</div>
                  <p className="text-[10px] text-slate-500">৫০০ পার্সেল লিমিট, সেন্ট্রাল ফ্রড চেকার</p>
                </div>

                <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 space-y-2">
                  <span className="text-xs font-bold text-teal-800">GROWTH প্ল্যান (জনপ্রিয়)</span>
                  <div className="text-lg font-bold text-teal-700 font-mono">৳ ১,৯৯৯ / মাস</div>
                  <p className="text-[10px] text-teal-600">আনলিমিটেড অর্ডার, বারকোড ওয়্যারহাউস স্ক্যান</p>
                </div>

                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                  <span className="text-xs font-bold text-indigo-800">PRO AI স্যুট</span>
                  <div className="text-lg font-bold text-indigo-700 font-mono">৳ ৩,৯৯৯ / মাস</div>
                  <p className="text-[10px] text-indigo-600">AI অটো অ্যাড, বাংলা ভয়েস এজেন্ট, লুকঅ্যালাইক</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CENTRAL FRAUD DATABASE CONTROL */}
        {/* ============================================================== */}
        {activeTab === "FRAUD_DB" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Add New Fraud Number Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                <span>সেন্ট্রাল ব্লকলিস্টে নতুন ফ্রড নম্বর যুক্ত করুন</span>
              </h3>
              <p className="text-xs text-slate-500">
                এই নম্বরে যেকোনো মার্চেন্ট অর্ডার রিসিভ করলে সিস্টেম স্বয়ংক্রিয়ভাবে হাই-রিস্ক অ্যালার্ট জারি করবে।
              </p>

              <form onSubmit={handleAddFraudNumber} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={newFraudPhone}
                  onChange={(e) => setNewFraudPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full sm:w-60 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-teal-600 focus:bg-white"
                />
                <input
                  type="text"
                  value={newFraudReason}
                  onChange={(e) => setNewFraudReason(e.target.value)}
                  placeholder="ফ্রড বা রিটার্নের কারণ..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all shrink-0"
                >
                  ব্লকলিস্টে যোগ করুন
                </button>
              </form>
            </div>

            {/* Fraud Registry List */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold">
                    <th className="p-3.5 text-left">মোবাইল নম্বর</th>
                    <th className="p-3.5 text-left">রিটার্ন রেকর্ড</th>
                    <th className="p-3.5 text-left">রিস্ক স্কোর</th>
                    <th className="p-3.5 text-left">কারণ ও সোর্স</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {fraudEntries.map((f) => (
                    <tr key={f.phone} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-red-600">{f.phone}</td>
                      <td className="p-3.5 font-mono text-slate-700">
                        {f.returnCount} রিটার্ন / {f.deliveredCount} ডেলিভারি
                      </td>
                      <td className="p-3.5 font-mono font-bold text-red-600">{f.riskScore}%</td>
                      <td className="p-3.5">
                        <div className="text-slate-800 font-medium">{f.reason}</div>
                        <div className="text-[10px] text-slate-400">সোর্স: {f.reportedBy}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                          {f.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteFraudEntry(f.phone)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                          title="ব্লকলিস্ট থেকে রিমুভ করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: AI & VOICE GATEWAYS */}
        {/* ============================================================== */}
        {activeTab === "AI_GATEWAYS" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiGateways.map((g) => (
                <div
                  key={g.name}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{g.name}</h4>
                      <p className="text-[11px] text-slate-500">{g.provider}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {g.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block">খরচ / রেট</span>
                      <span className="text-slate-800 font-bold">৳ {g.costPerMinute}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">সক্রিয় চ্যানেল</span>
                      <span className="text-slate-800 font-bold">{g.activeChannels}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">সফলতার হার</span>
                      <span className="text-emerald-600 font-bold">{g.successRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: COURIER API HUB */}
        {/* ============================================================== */}
        {activeTab === "COURIERS" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold">
                    <th className="p-3.5 text-left">কুরিয়ার কোম্পানি</th>
                    <th className="p-3.5 text-left">এন্ডপয়েন্ট URL</th>
                    <th className="p-3.5 text-left">ল্যাটেন্সি</th>
                    <th className="p-3.5 text-left">দৈনিক বুকিং</th>
                    <th className="p-3.5 text-left">আপটাইম</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {courierGateways.map((cg) => (
                    <tr key={cg.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{cg.name}</td>
                      <td className="p-3.5 font-mono text-slate-500 text-[11px]">{cg.endpoint}</td>
                      <td className="p-3.5 font-mono text-slate-800">{cg.latency}</td>
                      <td className="p-3.5 font-mono font-bold text-teal-700">
                        {cg.dailyBookings.toLocaleString("bn-BD")} টি
                      </td>
                      <td className="p-3.5 font-mono text-emerald-600">{cg.uptime}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            cg.status === "OPERATIONAL"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {cg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: GLOBAL SETTINGS & ANNOUNCEMENTS */}
        {/* ============================================================== */}
        {activeTab === "SYSTEM_SETTINGS" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Broadcast Announcement to All Merchants */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span>সকল মার্চেন্টদের জন্য গ্লোবাল ব্যানার অ্যানাউন্সমেন্ট</span>
                </h3>
                <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementActive}
                    onChange={(e) => {
                      setAnnouncementActive(e.target.checked);
                      showToast(e.target.checked ? "ব্যানার সক্রিয় করা হয়েছে" : "ব্যানার নিষ্ক্রিয় করা হয়েছে");
                    }}
                    className="accent-teal-600 w-4 h-4"
                  />
                  <span>ব্যানার চালু রাখুন</span>
                </label>
              </div>

              <textarea
                rows={3}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white font-medium"
              />

              <button
                onClick={() => showToast("গ্লোবাল অ্যানাউন্সমেন্ট সফলভাবে সম্প্রচার করা হয়েছে")}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>আপডেট ও সম্প্রচার করুন</span>
              </button>
            </div>

            {/* Feature Flags */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>প্ল্যাটফর্ম গ্লোবাল ফিচার ফ্ল্যাগস</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  {
                    name: "AI বাংলা ভয়েস কলিং ইঞ্জিন",
                    desc: "মার্চেন্টদের জন্য স্বয়ংক্রিয় ভয়েস কলিং কনফার্মেশন সক্রিয় রাখুন",
                    enabled: true,
                  },
                  {
                    name: "সেন্ট্রাল ফ্রড গার্ড ক্রস-ম্যাচ",
                    desc: "Steadfast, Pathao ও RedX সেন্ট্রাল ডেটাবেস লাইভ যাচাই",
                    enabled: true,
                  },
                  {
                    name: "1-Click Phone Masking (ডেটা গার্ড)",
                    desc: "মার্চেন্ট কর্মীদের কাস্টমার নম্বর কপি রোধ ফিচার",
                    enabled: true,
                  },
                  {
                    name: "মেটা ও টিকটক অটো অ্যাড পজ ইঞ্জিন",
                    desc: "স্টক ০ হলে স্বয়ংক্রিয় বিজ্ঞাপন পজ অ্যালগরিদম",
                    enabled: true,
                  },
                ].map((ff, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{ff.name}</div>
                      <div className="text-[11px] text-slate-500">{ff.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      সক্রিয় (ENABLED)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: AUDIT & SECURITY LOGS */}
        {/* ============================================================== */}
        {activeTab === "AUDIT_LOGS" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-600" />
                  <span>সুপার অ্যাডমিন প্ল্যাটফর্ম অডিট ও সিকিউরিটি ট্রেইল</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  প্ল্যাটফর্মে সুপার অ্যাডমিনদের প্রতিটি অ্যাকশন, রিচার্জ, ব্লকলিস্ট এবং পরিবর্তন রিয়েল-টাইমে লগ হয়।
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                AUDIT ENGINE: ACTIVE
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold">
                    <th className="p-3.5 text-left">লগ আইডি</th>
                    <th className="p-3.5 text-left">অ্যাকশন টাইপ</th>
                    <th className="p-3.5 text-left">বিস্তারিত বিবরণ</th>
                    <th className="p-3.5 text-left">অ্যাডমিন আইডি</th>
                    <th className="p-3.5 text-left">আইপি অ্যাড্রেস</th>
                    <th className="p-3.5 text-right">টাইমস্ট্যাম্প</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] font-bold text-slate-500">{log.id}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-900">{log.details}</td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">{log.admin}</td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{log.ip}</td>
                      <td className="p-3.5 text-right font-mono text-slate-500 text-[11px]">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* New Merchant Store Creation Modal */}
      {isAddMerchantOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" />
                <span>নতুন মার্চেন্ট অ্যাকাউন্ট তৈরি করুন</span>
              </h3>
              <button
                onClick={() => setIsAddMerchantOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMerchant} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 block mb-1 font-bold">স্টোরের নাম *</label>
                <input
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  placeholder="যেমন: Dhaka Trends"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-bold">মালিকের নাম *</label>
                <input
                  type="text"
                  required
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  placeholder="যেমন: নাজমুল হোসেন"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-teal-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">প্যাকেজ প্ল্যান</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white font-medium"
                  >
                    <option value="STARTER">STARTER (৳৯৯৯)</option>
                    <option value="GROWTH">GROWTH (৳১,৯৯৯)</option>
                    <option value="PRO_AI">PRO_AI (৳৩,৯৯৯)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-bold">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="store@domain.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddMerchantOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-sm transition-all"
                >
                  স্টোর তৈরি সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Payment Method / Account Modal */}
      {isAddPaymentOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <span>নতুন পেমেন্ট অ্যাকাউন্ট যুক্ত করুন</span>
              </h3>
              <button
                onClick={() => setIsAddPaymentOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePaymentMethod} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">পেমেন্ট মেথড *</label>
                  <select
                    value={newPmMethod}
                    onChange={(e) => setNewPmMethod(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-teal-600"
                  >
                    <option value="BKASH">বিকাশ (bKash)</option>
                    <option value="NAGAD">নগদ (Nagad)</option>
                    <option value="ROCKET">রকেট (Rocket)</option>
                    <option value="UPAY">উপায় (Upay)</option>
                    <option value="BANK">ব্যাংক ট্রান্সফার (Bank)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block mb-1 font-bold">অ্যাকাউন্ট টাইপ *</label>
                  <select
                    value={newPmType}
                    onChange={(e) => setNewPmType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-teal-600"
                  >
                    <option value="MERCHANT">মার্চেন্ট (Merchant)</option>
                    <option value="PERSONAL">পার্সোনাল (Personal)</option>
                    <option value="AGENT">এজেন্ট (Agent)</option>
                    <option value="CURRENT">কারেন্ট অ্যাকাউন্ট (Current A/C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-bold">অ্যাকাউন্টের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newPmTitle}
                  onChange={(e) => setNewPmTitle(e.target.value)}
                  placeholder="যেমন: বিকাশ মার্চেন্ট অ্যাকাউন্ট / ব্র্যাক ব্যাংক"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-bold">অ্যাকাউন্ট নম্বর / A/C *</label>
                <input
                  type="text"
                  required
                  value={newPmNumber}
                  onChange={(e) => setNewPmNumber(e.target.value)}
                  placeholder="017XXXXXXXX বা ব্যাংক অ্যাকাউন্ট নম্বর"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              {newPmMethod === "BANK" && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">ব্যাংক নাম</label>
                    <input
                      type="text"
                      value={newPmBankName}
                      onChange={(e) => setNewPmBankName(e.target.value)}
                      placeholder="BRAC Bank"
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">ব্রাঞ্চ নাম</label>
                    <input
                      type="text"
                      value={newPmBranch}
                      onChange={(e) => setNewPmBranch(e.target.value)}
                      placeholder="Gulshan Branch"
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">রাউটিং নং</label>
                    <input
                      type="text"
                      value={newPmRouting}
                      onChange={(e) => setNewPmRouting(e.target.value)}
                      placeholder="060261726"
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-slate-700 block mb-1 font-bold">পেমেন্ট নির্দেশনা (Instructions)</label>
                <input
                  type="text"
                  value={newPmInstructions}
                  onChange={(e) => setNewPmInstructions(e.target.value)}
                  placeholder="যেমন: Make Payment অপশন ব্যবহার করে পেমেন্ট করুন"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer"
                >
                  অ্যাকাউন্ট যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
