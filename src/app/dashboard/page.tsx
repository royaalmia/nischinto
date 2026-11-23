"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT, maskPhone, getFraudBadge } from "@/lib/utils";
import {
  Package,
  Search,
  Filter,
  PhoneCall,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneMasked, setPhoneMasked] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Modals state
  const [activeFraudOrder, setActiveFraudOrder] = useState<any | null>(null);
  const [activeAiCallOrder, setActiveAiCallOrder] = useState<any | null>(null);
  const [aiCalling, setAiCalling] = useState(false);
  const [aiCallResult, setAiCallResult] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/orders", window.location.origin);
      if (selectedStatus !== "ALL") url.searchParams.set("status", selectedStatus);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1-Click Confirm
  const handleConfirm = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/confirm`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 1-Click Courier Dispatch
  const handleSendCourier = async (orderId: string, forcedCourier?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/send-courier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forcedCourier }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // AI Voice Call Trigger
  const handleAiCall = async (order: any) => {
    try {
      setActiveAiCallOrder(order);
      setAiCalling(true);
      setAiCallResult(null);

      const res = await fetch(`/api/orders/${order.id}/ai-call`, { method: "POST" });
      const data = await res.json();
      setAiCalling(false);
      if (data.success) {
        setAiCallResult(data.data.callResult);
        fetchOrders();
      }
    } catch (err) {
      setAiCalling(false);
      console.error(err);
    }
  };

  // Bulk Actions
  const handleBulkAction = async (action: "CONFIRM" | "SEND_COURIER") => {
    if (selectedOrders.length === 0) return;
    try {
      const res = await fetch("/api/orders/bulk-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds: selectedOrders, action }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        setSelectedOrders([]);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((o) => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((item) => item !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  // Metrics
  const totalDelivered = orders.filter((o) => o.status === "DELIVERED").length;
  const totalIncomplete = orders.filter((o) => o.status === "INCOMPLETE").length;
  const totalHighRisk = orders.filter((o) => o.fraudScore >= 70).length;

  return (
    <>
      <Header
        phoneMasked={phoneMasked}
        onTogglePhoneMask={(val) => setPhoneMasked(val)}
      />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">মোট অর্ডার</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{orders.length} টি</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                সফল ডেলিভারি: {totalDelivered} টি
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">ইনকমপ্লিট / ড্রপ অফ</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{totalIncomplete} টি</h3>
              <p className="text-[11px] text-slate-500 mt-1">ফর্ম না পাঠিয়ে বের হওয়া কাস্টমার</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">উচ্চ ঝুঁকি / ফ্রড আটকানো</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{totalHighRisk} টি</h3>
              <p className="text-[11px] text-red-500 font-semibold mt-1">অগ্রিম পেমেন্ট রিকমেন্ডেড</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">AI অটোমেশন রেট</p>
              <h3 className="text-2xl font-bold text-indigo-600 mt-1">৯৪.৫%</h3>
              <p className="text-[11px] text-indigo-600 font-semibold mt-1">AI কল ও কুরিয়ার সিঙ্ক সক্রিয়</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "সব অর্ডার", value: "ALL" },
                { label: "অপেক্ষমান (Pending)", value: "PENDING" },
                { label: "ইনকমপ্লিট (Drop-off)", value: "INCOMPLETE" },
                { label: "কনফার্মড", value: "CONFIRMED" },
                { label: "কুরিয়ারে আছে", value: "IN_COURIER" },
                { label: "ডেলিভার্ড", value: "DELIVERED" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedStatus === tab.value
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ফোন নম্বর, অর্ডার আইডি দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bulk Action Bar (Visible when orders selected) */}
          {selectedOrders.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>{selectedOrders.length}টি অর্ডার সিলেক্ট করা হয়েছে</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction("CONFIRM")}
                  className="px-3 py-1.5 bg-white text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100"
                >
                  একসাথে কনফার্ম করুন
                </button>
                <button
                  onClick={() => handleBulkAction("SEND_COURIER")}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>কুরিয়ারে পাঠান (Steadfast/Pathao)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>ইনভয়েস প্রিন্ট</span>
                </button>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3 w-8">
                    <input
                      type="checkbox"
                      checked={
                        selectedOrders.length === orders.length && orders.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                  </th>
                  <th className="p-3">অর্ডার নং ও সোর্স</th>
                  <th className="p-3">কাস্টমার ও ঠিকানা</th>
                  <th className="p-3">পণ্য ও পরিমাণ</th>
                  <th className="p-3">বিল ও ডেলিভারি</th>
                  <th className="p-3">ফ্রড রিস্ক স্কোর</th>
                  <th className="p-3">স্ট্যাটাস ও কুরিয়ার</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      অর্ডার লোড হচ্ছে...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      কোনো অর্ডার পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const fraud = getFraudBadge(order.fraudScore);
                    const isSelected = selectedOrders.includes(order.id);
                    const firstItem = order.items[0];

                    return (
                      <tr
                        key={order.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOrder(order.id)}
                            className="rounded text-blue-600 focus:ring-0"
                          />
                        </td>

                        {/* Order Number & Source */}
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">
                            {order.orderNumber}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                          </span>
                          <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {order.source}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 block">
                            {order.customer.name}
                          </span>
                          <span className="text-slate-500 font-mono text-[11px] block">
                            {maskPhone(order.customer.phone, phoneMasked)}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate max-w-[180px] block" title={order.customer.address}>
                            {order.customer.address || "ঠিকানা নেই"}
                          </span>
                        </td>

                        {/* Products */}
                        <td className="p-3">
                          {firstItem ? (
                            <div>
                              <span className="font-medium text-slate-800 line-clamp-1">
                                {firstItem.product.title}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {firstItem.quantity}টি × {formatBDT(firstItem.unitPrice)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400">আইটেম নেই</span>
                          )}
                        </td>

                        {/* Total Bill & Net Profit */}
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">
                            {formatBDT(order.totalAmount)}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold block">
                            নিট লাভ: {formatBDT(order.netProfit)}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            চার্জ: ৳{order.deliveryCharge}
                          </span>
                        </td>

                        {/* Fraud Risk Score Badge */}
                        <td className="p-3">
                          <button
                            onClick={() => setActiveFraudOrder(order)}
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${fraud.bg}`}
                          >
                            <span>{fraud.label}</span>
                            <span className="text-[10px] opacity-75">({order.fraudScore}%)</span>
                          </button>
                        </td>

                        {/* Status & Courier */}
                        <td className="p-3">
                          <div className="space-y-1">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                order.status === "DELIVERED"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : order.status === "IN_COURIER"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "CONFIRMED"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : order.status === "INCOMPLETE"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {order.status}
                            </span>

                            {order.courierTrackingId && (
                              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                <Truck className="w-3 h-3 text-blue-600" />
                                <span>{order.courierTrackingId}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="p-3 text-right space-x-1">
                          {/* AI Voice Call Button */}
                          <button
                            onClick={() => handleAiCall(order)}
                            title="AI বাংলা ভয়েস কল দিয়ে কনফার্ম করুন"
                            className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all"
                          >
                            <PhoneCall className="w-4 h-4" />
                          </button>

                          {/* Quick Confirm */}
                          {order.status === "PENDING" && (
                            <button
                              onClick={() => handleConfirm(order.id)}
                              title="অর্ডার কনফার্ম করুন"
                              className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Send Courier Button */}
                          {order.status === "CONFIRMED" && (
                            <button
                              onClick={() => handleSendCourier(order.id)}
                              title="কুরিয়ারে পাঠান (Steadfast/Pathao)"
                              className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
                            >
                              <Truck className="w-4 h-4" />
                            </button>
                          )}

                          {/* WhatsApp Recovery for Incomplete Orders */}
                          {order.status === "INCOMPLETE" && (
                            <a
                              href={`https://wa.me/88${order.customer.phone}?text=${encodeURIComponent(
                                `আসসালামু আলাইকুম ${order.customer.name}! নিশচিন্ত শপে আপনার পছন্দের পণ্যটি কার্টে রাখা আছে। অর্ডারটি কনফার্ম করতে এখানে রিপ্লাই দিন।`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              title="হোয়াটসঅ্যাপে রিকভারি মেসেজ পাঠান"
                              className="inline-flex p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal 1: Fraud Analysis Detail Modal */}
        {activeFraudOrder && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    AI ফ্রড অ্যানালাইসিস রিপোর্ট
                  </h3>
                </div>
                <button
                  onClick={() => setActiveFraudOrder(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                  <span className="text-xs text-slate-500 font-semibold">কাস্টমার নাম:</span>
                  <span className="text-xs font-bold text-slate-800">
                    {activeFraudOrder.customer.name}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                  <span className="text-xs text-slate-500 font-semibold">ফোন নম্বর:</span>
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {activeFraudOrder.customer.phone}
                  </span>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-red-800 block">
                    ঝুঁকি কারণ ও কুরিয়ার রেকর্ড:
                  </span>
                  <p className="text-xs text-red-700 leading-relaxed">
                    {activeFraudOrder.fraudReason ||
                      "কাস্টমারের কুরিয়ার ডেটাবেস চেক করা হয়েছে। পূর্ববর্তী রেকর্ড বিশ্লেষণ করে এই স্কোর দেওয়া হয়েছে।"}
                  </p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="text-xs font-bold text-blue-900 block mb-1">
                    Nischinto AI পরামর্শ:
                  </span>
                  <p className="text-xs text-blue-800">
                    {activeFraudOrder.fraudScore >= 70
                      ? "⚠️ এই কাস্টমারকে পার্সেল পাঠানোর আগে ন্যূনতম ১২০ টাকা ডেলিভারি চার্জ অগ্রিম নিন, অন্যথায় পার্সেল রিটার্ন আসার সম্ভাবনা ৯০%।"
                      : "✅ অর্ডারটি স্বাভাবিক। কুরিয়ারে বুকিং দেওয়া যেতে পারে।"}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveFraudOrder(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: AI Bengali Voice Call Simulation Modal */}
        {activeAiCallOrder && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    Nischinto AI Voice Agent কলিং
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveAiCallOrder(null);
                    setAiCallResult(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {aiCalling ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto"></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      কাস্টমারকে কল করা হচ্ছে...
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {activeAiCallOrder.customer.phone} ({activeAiCallOrder.customer.name})
                    </p>
                    <p className="text-[11px] text-indigo-600 font-semibold mt-2">
                      বাংলায় কথা বলে অর্ডার ও ঠিকানা কনফার্ম করা হচ্ছে...
                    </p>
                  </div>
                </div>
              ) : aiCallResult ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900">
                        কল সফল! কাস্টমার নিশ্চিত করেছেন
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700">
                      {aiCallResult.durationSeconds}s (৳{aiCallResult.costBDT})
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-1">
                      কথোপকথনের লাইভ ট্রান্সক্রিপ্ট (Transcript):
                    </span>
                    <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-sans leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                      {aiCallResult.transcript}
                    </pre>
                  </div>

                  <p className="text-xs text-slate-500">
                    অর্ডার স্ট্যাটাস স্বয়ংক্রিয়ভাবে{" "}
                    <strong className="text-indigo-600">CONFIRMED</strong> এ আপডেট করা
                    হয়েছে।
                  </p>
                </div>
              ) : null}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setActiveAiCallOrder(null);
                    setAiCallResult(null);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  সম্পন্ন
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
