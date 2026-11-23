"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "MERCHANTS" | "SUBSCRIPTIONS" | "FRAUD_DB" | "AI_GATEWAYS" | "COURIERS" | "SYSTEM_SETTINGS" | "AUDIT_LOGS"
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

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<any[]>([
    {
      id: "LOG-501",
      action: "MERCHANT_CREDIT_RECHARGE",
      details: "Trendy Baby Shop-এ ৳৫০০ ওয়ালেট ক্রেডিট রিচার্জ সম্পন্ন",
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
      action: "SUBSCRIPTION_APPROVED",
      details: "Elite Footwear BD-এর Growth সাবস্ক্রিপশন (TrxID: BKH98762512) অনুমোদিত",
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "২০২৬-১১-২৪ ০১:১৫ AM",
    },
    {
      id: "LOG-504",
      action: "ANNOUNCEMENT_BROADCAST",
      details: "Nishchinto v2.4 আপডেট ব্যানার সকল মার্চেন্টদের জন্য সম্প্রচারিত",
      admin: "SuperAdmin (royaalmia)",
      ip: "103.145.118.24",
      time: "২০২৬-১১-২৩ ১১:২০ PM",
    },
  ]);

  // Platform Metrics
  const platformStats = {
    totalMRR: 785400,
    activeStores: 428,
    totalGMV: 48250000,
    totalOrders: 184750,
    fraudEntriesCount: 23540,
    totalAiMinutes: 64200,
    systemUptime: "৯৯.৯৮%",
  };

  // Merchants State
  const [merchants, setMerchants] = useState<any[]>([
    {
      id: "MCH-01",
      storeName: "Nischinto Fashion & Gadgets",
      ownerName: "রহিম চৌধুরী",
      phone: "01711223344",
      email: "rahim@nischinto-demo.com",
      plan: "PRO_AI",
      ordersProcessed: 1420,
      walletBalance: 1450.0,
      joinedDate: "2026-10-12",
      status: "ACTIVE",
    },
    {
      id: "MCH-02",
      storeName: "Elite Footwear BD",
      ownerName: "শফিকুল ইসলাম",
      phone: "01822998877",
      email: "shafiq@elitefootwear.com",
      plan: "GROWTH",
      ordersProcessed: 680,
      walletBalance: 420.0,
      joinedDate: "2026-10-24",
      status: "ACTIVE",
    },
    {
      id: "MCH-03",
      storeName: "Organic Essentials Bangladesh",
      ownerName: "ফারহানা সুলতানা",
      phone: "01933556677",
      email: "farhana@organicessentials.com",
      plan: "STARTER",
      ordersProcessed: 185,
      walletBalance: 150.0,
      joinedDate: "2026-11-02",
      status: "ACTIVE",
    },
    {
      id: "MCH-04",
      storeName: "Trendy Baby Shop",
      ownerName: "তানভীর হাসান",
      phone: "01677112233",
      email: "tanvir@trendybaby.com",
      plan: "PRO_AI",
      ordersProcessed: 2340,
      walletBalance: 3200.0,
      joinedDate: "2026-09-18",
      status: "ACTIVE",
    },
    {
      id: "MCH-05",
      storeName: "Dhaka Watch Gallery",
      ownerName: "আরিফুল হক",
      phone: "01555667788",
      email: "arif@dhakawatch.com",
      plan: "GROWTH",
      ordersProcessed: 910,
      walletBalance: 80.0,
      joinedDate: "2026-10-05",
      status: "ACTIVE",
    },
    {
      id: "MCH-06",
      storeName: "Glamour Cosmetics BD",
      ownerName: "নুসরাত জাহান",
      phone: "01311445566",
      email: "nusrat@glamourbd.com",
      plan: "STARTER",
      ordersProcessed: 320,
      walletBalance: 0.0,
      joinedDate: "2026-11-10",
      status: "SUSPENDED",
    },
  ]);

  // Pending Subscription Payments Queue
  const [pendingPayments, setPendingPayments] = useState<any[]>([
    {
      id: "PAY-108",
      storeName: "Elite Footwear BD",
      method: "bKash",
      senderNumber: "01822998877",
      trxId: "BKH98762512",
      amount: 1999,
      planRequested: "GROWTH (1 Month)",
      date: "২০২৬-১১-২৪ ১০:১৫ AM",
    },
    {
      id: "PAY-109",
      storeName: "Trendy Baby Shop",
      method: "Nagad",
      senderNumber: "01677112233",
      trxId: "NGD45612389",
      amount: 3999,
      planRequested: "PRO_AI (1 Month)",
      date: "২০২৬-১১-২৪ ১১:৪০ AM",
    },
  ]);

  // Central Fraud Database Entries
  const [fraudEntries, setFraudEntries] = useState<any[]>([
    {
      phone: "01999000111",
      reportedBy: "Nischinto Fashion & 4 others",
      returnCount: 7,
      deliveredCount: 1,
      riskScore: 88,
      reason: "পার্সেল রিসিভ না করে রাইডারকে ফোন বন্ধ রাখা ও ডেলিভারি ড্যামেজ দেখানো",
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
    {
      phone: "01855667788",
      reportedBy: "Pathao Fraud Intelligence",
      returnCount: 5,
      deliveredCount: 2,
      riskScore: 72,
      reason: "বারংবার কুরিয়ারে সিওডি ডেলিভারি রিজেকশন",
      addedDate: "২০২৬-১১-২০",
      status: "WARNING",
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

  const handleCreateMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newOwnerName || !newPhone) return;

    const newM: any = {
      id: `MCH-0${merchants.length + 1}`,
      storeName: newStoreName,
      ownerName: newOwnerName,
      phone: newPhone,
      email: newEmail || `${newPhone}@store.nishchinto.app`,
      plan: newPlan,
      ordersProcessed: 0,
      walletBalance: 200.0,
      joinedDate: "২০২৬-১১-২৪",
      status: "ACTIVE",
    };

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
          const newBal = m.walletBalance + amount;
          showToast(`${m.storeName}-এ ৳${amount} ক্রেডিট রিচার্জ সফল`);
          logAdminAction("WALLET_RECHARGE", `${m.storeName}-এ ৳${amount} রিচার্জ করা হয়েছে`);
          return { ...m, walletBalance: newBal };
        }
        return m;
      })
    );
  };

  const handleApprovePayment = (id: string) => {
    setPendingPayments((prev) => prev.filter((p) => p.id !== id));
    showToast(`পেমেন্ট ${id} সফলভাবে অনুমোদন করা হয়েছে এবং মার্চেন্ট প্ল্যান আপডেট হয়েছে`);
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
      m.storeName.toLowerCase().includes(search.toLowerCase()) ||
      m.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchesPlan = planFilter === "ALL" || m.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-teal-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-teal-400 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="sm" showBangla={true} />
          </Link>
          <span className="hidden sm:inline-block text-slate-700">|</span>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-red-950/70 border border-red-800 rounded-lg text-red-300 text-[11px] font-bold">
            <Lock className="w-3 h-3 text-red-400" />
            <span>SUPER ADMIN MASTER CONTROL</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-mono">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-300">সার্ভার স্বাস্থ্য: ১০০% লাইভ</span>
          </div>
          <Link
            href="/dashboard"
            className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>মার্চেন্ট ড্যাশবোর্ড দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Master Tabs Subheader */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-6 sticky top-16 z-30 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 py-2">
          {[
            { id: "OVERVIEW", label: "প্ল্যাটফর্ম ওভারভিউ", icon: TrendingUp },
            { id: "MERCHANTS", label: "মার্চেন্ট ও স্টোরস", icon: Users, badge: merchants.length },
            {
              id: "SUBSCRIPTIONS",
              label: "সাবস্ক্রিপশন ও বিলিং",
              icon: CreditCard,
              badge: pendingPayments.length > 0 ? `${pendingPayments.length} পেন্ডিং` : undefined,
              badgeColor: "bg-amber-500",
            },
            { id: "FRAUD_DB", label: "সেন্ট্রাল ফ্রড ডেটাবেস", icon: ShieldAlert, badge: "২৩,৫৪০" },
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
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-teal-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      tab.badgeColor || (isSelected ? "bg-teal-700 text-white" : "bg-slate-800 text-slate-300")
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
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>মাসিক রিকারিং রেভিনিউ (MRR)</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  {formatBDT(platformStats.totalMRR)}
                </div>
                <p className="text-[11px] text-slate-400">গত মাসের চেয়ে +১৮.৪% প্রবৃদ্ধি</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>সক্রিয় মার্চেন্ট স্টোরস</span>
                  <Building2 className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {platformStats.activeStores} টি
                </div>
                <p className="text-[11px] text-teal-400">STARTER: ১৪২ | GROWTH: ১৮৬ | PRO AI: ১০০</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>মোট প্ল্যাটফর্ম GMV</span>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">
                  {formatBDT(platformStats.totalGMV)}
                </div>
                <p className="text-[11px] text-slate-400">সর্বমোট প্রসেসকৃত পার্সেল ভ্যালু</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>সেন্ট্রাল ফ্রড ডেটাবেস</span>
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400 font-mono">
                  {platformStats.fraudEntriesCount.toLocaleString("bn-BD")} টি
                </div>
                <p className="text-[11px] text-slate-400">কুরিয়ার নেটওয়ার্কে ক্রস-ম্যাচড রেকর্ড</p>
              </div>
            </div>

            {/* Platform Quick Health & Live Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Recent Registrations & Live Order Volume */}
              <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-400" />
                    <span>সর্বশেষ নিবন্ধিত মার্চেন্ট স্টোরস</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("MERCHANTS")}
                    className="text-xs text-teal-400 hover:underline font-semibold"
                  >
                    সব দেখুন →
                  </button>
                </div>

                <div className="divide-y divide-slate-700/60 text-xs">
                  {merchants.slice(0, 4).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-200">{m.storeName}</div>
                        <div className="text-[11px] text-slate-400">
                          মালিক: {m.ownerName} • {m.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                          {m.plan}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            m.status === "ACTIVE"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-red-950 text-red-300 border border-red-800"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Gateways Status Snapshot */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    <Server className="w-4 h-4 text-teal-400" />
                    <span>কোর গেটওয়ে লাইভ স্ট্যাটাস</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("COURIERS")}
                    className="text-xs text-teal-400 hover:underline font-semibold"
                  >
                    ডিটেইলস →
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {courierGateways.map((cg) => (
                    <div
                      key={cg.name}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{cg.name}</div>
                        <div className="text-[10px] text-slate-400">লেভেল ল্যাটেন্সি: {cg.latency}</div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          cg.status === "OPERATIONAL"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
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
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="স্টোর নাম, মালিক বা ফোন নম্বর..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-400">প্ল্যান:</span>
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="ALL">সব প্ল্যান</option>
                    <option value="STARTER">STARTER</option>
                    <option value="GROWTH">GROWTH</option>
                    <option value="PRO_AI">PRO_AI</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsAddMerchantOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন মার্চেন্ট যুক্ত করুন</span>
              </button>
            </div>

            {/* Merchants Table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-400 font-semibold">
                    <th className="p-3.5 text-left">স্টোর ও মালিক</th>
                    <th className="p-3.5 text-left">যোগাযোগ</th>
                    <th className="p-3.5 text-left">প্ল্যান</th>
                    <th className="p-3.5 text-left">অর্ডার প্রসেসড</th>
                    <th className="p-3.5 text-left">AI ওয়ালেট</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">মাস্টার অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {filteredMerchants.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white">{m.storeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {m.id}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-200">{m.ownerName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{m.phone}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                          {m.plan}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-white">
                        {m.ordersProcessed.toLocaleString("bn-BD")} টি
                      </td>
                      <td className="p-3.5 font-mono font-bold text-teal-400">
                        {formatBDT(m.walletBalance)}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            m.status === "ACTIVE"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-red-950 text-red-400 border border-red-800"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleWalletRecharge(m.id, 500)}
                            title="৳ ৫০০ ওয়ালেট ক্রেডিট রিচার্জ"
                            className="px-2 py-1 bg-teal-600/30 hover:bg-teal-600 border border-teal-500 text-teal-200 text-[10px] font-bold rounded-lg transition-all"
                          >
                            +৳৫০০
                          </button>
                          <button
                            onClick={() => handleToggleMerchantStatus(m.id)}
                            title={m.status === "ACTIVE" ? "স্টোর সাসপেন্ড করুন" : "স্টোর সক্রিয় করুন"}
                            className={`px-2 py-1 border text-[10px] font-bold rounded-lg transition-all ${
                              m.status === "ACTIVE"
                                ? "bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-800"
                                : "bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:bg-emerald-800"
                            }`}
                          >
                            {m.status === "ACTIVE" ? "সাসপেন্ড" : "সক্রিয়"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SUBSCRIPTIONS & BILLING APPROVAL */}
        {/* ============================================================== */}
        {activeTab === "SUBSCRIPTIONS" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Pending Payments Alert */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>পেন্ডিং bKash ও Nagad পেমেন্ট অনুমোদন কিউ</span>
                </h3>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {pendingPayments.length} টি পেমেন্ট যাচাইয়ের অপেক্ষায়
                </span>
              </div>

              {pendingPayments.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  কোনো পেন্ডিং সাবস্ক্রিপশন পেমেন্ট নেই। সব রিকোয়েস্ট অনুমোদিত।
                </div>
              ) : (
                <div className="divide-y divide-slate-700 text-xs">
                  {pendingPayments.map((p) => (
                    <div key={p.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{p.storeName}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                            {p.method}
                          </span>
                        </div>
                        <div className="text-slate-400 font-mono">
                          প্রেরক নম্বর: {p.senderNumber} • TrxID:{" "}
                          <span className="text-amber-400 font-bold">{p.trxId}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">অনুরোধকৃত প্যাকেজ: {p.planRequested} • তারিখ: {p.date}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">মোট পরিশোধ</span>
                          <span className="text-base font-bold text-emerald-400 font-mono">
                            {formatBDT(p.amount)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleApprovePayment(p.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
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
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span>প্ল্যাটফর্ম প্যাকেজ প্রাইসিং কনফিগারেশন</span>
              </h3>
              <p className="text-xs text-slate-400">
                এখানে প্যাকেজ মূল্য পরিবর্তন করলে তা স্বয়ংক্রিয়ভাবে হোমপেজ ও পেমেন্ট গেটওয়েতে আপডেট হবে।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-slate-300">STARTER প্ল্যান</span>
                  <div className="text-lg font-bold text-white font-mono">৳ ৯৯৯ / মাস</div>
                  <p className="text-[10px] text-slate-400">৫০০ পার্সেল লিমিট, সেন্ট্রাল ফ্রড চেকার</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-teal-700/60 space-y-2">
                  <span className="text-xs font-bold text-teal-400">GROWTH প্ল্যান (জনপ্রিয়)</span>
                  <div className="text-lg font-bold text-teal-400 font-mono">৳ ১,৯৯৯ / মাস</div>
                  <p className="text-[10px] text-slate-400">আনলিমিটেড অর্ডার, বারকোড ওয়্যারহাউস স্ক্যান</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-indigo-700/60 space-y-2">
                  <span className="text-xs font-bold text-indigo-400">PRO AI স্যুট</span>
                  <div className="text-lg font-bold text-indigo-400 font-mono">৳ ৩,৯৯৯ / মাস</div>
                  <p className="text-[10px] text-slate-400">AI অটো অ্যাড, বাংলা ভয়েস এজেন্ট, লুকঅ্যালাইক</p>
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
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>সেন্ট্রাল ব্লকলিস্টে নতুন ফ্রড নম্বর যুক্ত করুন</span>
              </h3>
              <p className="text-xs text-slate-400">
                এই নম্বরে যেকোনো মার্চেন্ট অর্ডার রিসিভ করলে সিস্টেম স্বয়ংক্রিয়ভাবে হাই-রিস্ক অ্যালার্ট জারি করবে।
              </p>

              <form onSubmit={handleAddFraudNumber} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={newFraudPhone}
                  onChange={(e) => setNewFraudPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full sm:w-60 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  value={newFraudReason}
                  onChange={(e) => setNewFraudReason(e.target.value)}
                  placeholder="ফ্রড বা রিটার্নের কারণ..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                >
                  ব্লকলিস্টে যোগ করুন
                </button>
              </form>
            </div>

            {/* Fraud Registry List */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-400 font-semibold">
                    <th className="p-3.5 text-left">মোবাইল নম্বর</th>
                    <th className="p-3.5 text-left">রিটার্ন রেকর্ড</th>
                    <th className="p-3.5 text-left">রিস্ক স্কোর</th>
                    <th className="p-3.5 text-left">কারণ ও সোর্স</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {fraudEntries.map((f) => (
                    <tr key={f.phone} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-red-400">{f.phone}</td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {f.returnCount} রিটার্ন / {f.deliveredCount} ডেলিভারি
                      </td>
                      <td className="p-3.5 font-mono font-bold text-red-400">{f.riskScore}%</td>
                      <td className="p-3.5">
                        <div className="text-slate-200">{f.reason}</div>
                        <div className="text-[10px] text-slate-500">সোর্স: {f.reportedBy}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                          {f.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteFraudEntry(f.phone)}
                          className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
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
                  className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white">{g.name}</h4>
                      <p className="text-[11px] text-slate-400">{g.provider}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {g.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">খরচ / রেট</span>
                      <span className="text-slate-200 font-bold">৳ {g.costPerMinute}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">সক্রিয় চ্যানেল</span>
                      <span className="text-slate-200 font-bold">{g.activeChannels}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">সফলতার হার</span>
                      <span className="text-emerald-400 font-bold">{g.successRate}</span>
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
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-400 font-semibold">
                    <th className="p-3.5 text-left">কুরিয়ার কোম্পানি</th>
                    <th className="p-3.5 text-left">এন্ডপয়েন্ট URL</th>
                    <th className="p-3.5 text-left">ল্যাটেন্সি</th>
                    <th className="p-3.5 text-left">দৈনিক বুকিং</th>
                    <th className="p-3.5 text-left">আপটাইম</th>
                    <th className="p-3.5 text-left">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {courierGateways.map((cg) => (
                    <tr key={cg.name} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-3.5 font-bold text-white">{cg.name}</td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">{cg.endpoint}</td>
                      <td className="p-3.5 font-mono text-slate-200">{cg.latency}</td>
                      <td className="p-3.5 font-mono font-semibold text-teal-400">
                        {cg.dailyBookings.toLocaleString("bn-BD")} টি
                      </td>
                      <td className="p-3.5 font-mono text-emerald-400">{cg.uptime}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            cg.status === "OPERATIONAL"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-amber-950 text-amber-400 border border-amber-800"
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
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>সকল মার্চেন্টদের জন্য গ্লোবাল ব্যানার অ্যানাউন্সমেন্ট</span>
                </h3>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementActive}
                    onChange={(e) => {
                      setAnnouncementActive(e.target.checked);
                      showToast(e.target.checked ? "ব্যানার সক্রিয় করা হয়েছে" : "ব্যানার নিষ্ক্রিয় করা হয়েছে");
                    }}
                    className="accent-teal-500 w-4 h-4"
                  />
                  <span>ব্যানার চালু রাখুন</span>
                </label>
              </div>

              <textarea
                rows={3}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />

              <button
                onClick={() => showToast("গ্লোবাল অ্যানাউন্সমেন্ট সফলভাবে সম্প্রচার করা হয়েছে")}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>আপডেট ও সম্প্রচার করুন</span>
              </button>
            </div>

            {/* Feature Flags */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
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
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-200">{ff.name}</div>
                      <div className="text-[11px] text-slate-400">{ff.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
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
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  <span>সুপার অ্যাডমিন প্ল্যাটফর্ম অডিট ও সিকিউরিটি ট্রেইল</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  প্ল্যাটফর্মে সুপার অ্যাডমিনদের প্রতিটি অ্যাকশন, রিচার্জ, ব্লকলিস্ট এবং পরিবর্তন রিয়েল-টাইমে লগ হয়।
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                AUDIT ENGINE: ACTIVE
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-x-auto shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-400 font-semibold">
                    <th className="p-3.5 text-left">লগ আইডি</th>
                    <th className="p-3.5 text-left">অ্যাকশন টাইপ</th>
                    <th className="p-3.5 text-left">বিস্তারিত বিবরণ</th>
                    <th className="p-3.5 text-left">অ্যাডমিন আইডি</th>
                    <th className="p-3.5 text-left">আইপি অ্যাড্রেস</th>
                    <th className="p-3.5 text-right">টাইমস্ট্যাম্প</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] font-bold text-slate-400">{log.id}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-white">{log.details}</td>
                      <td className="p-3.5 text-slate-300 font-mono text-[11px]">{log.admin}</td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">{log.ip}</td>
                      <td className="p-3.5 text-right font-mono text-slate-400 text-[11px]">{log.time}</td>
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-400" />
                <span>নতুন মার্চেন্ট অ্যাকাউন্ট তৈরি করুন</span>
              </h3>
              <button
                onClick={() => setIsAddMerchantOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMerchant} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">স্টোরের নাম *</label>
                <input
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  placeholder="যেমন: Dhaka Trends"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">মালিকের নাম *</label>
                <input
                  type="text"
                  required
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  placeholder="যেমন: নাজমুল হোসেন"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">প্যাকেজ প্ল্যান</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="STARTER">STARTER (৳৯৯৯)</option>
                    <option value="GROWTH">GROWTH (৳১,৯৯৯)</option>
                    <option value="PRO_AI">PRO_AI (৳৩,৯৯৯)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="store@domain.com"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddMerchantOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-md transition-all"
                >
                  স্টোর তৈরি সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
