"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import { MfsLogo } from "@/components/MfsLogos";
import {
  CreditCard,
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Printer,
  X,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
} from "lucide-react";

export default function BillingPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [merchant, setMerchant] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      let merchantId = "";
      let mUser: any = null;

      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("merchant_user");
        if (raw) {
          mUser = JSON.parse(raw);
          merchantId = mUser.id || "";
          setMerchant(mUser);
          setWalletBalance(Number(mUser.walletBalance) || 0);
        }
      }

      const res = await fetch(`/api/wallet/deposit${merchantId ? `?merchantId=${merchantId}` : ""}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setDeposits(data.data);
      }
    } catch (e) {
      console.warn("Failed to fetch billing deposits", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingData();
  }, []);

  const totalApproved = deposits
    .filter((d) => d.status === "APPROVED")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  const totalPending = deposits
    .filter((d) => d.status === "PENDING")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  return (
    <>
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-teal-600" />
              <span>বিলিং, ওয়ালেট ও রিচার্জ হিস্টোরি</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              আপনার ওয়ালেট ব্যালান্স, অতীতের সকল রিচার্জ ও অফিসিয়াল ইনভয়েস ডাউনলোড করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBillingData}
              title="রিফ্রেশ করুন"
              className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>বর্তমান ওয়ালেট ব্যালান্স</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {formatBDT(walletBalance)}
            </div>
            <p className="text-[11px] text-teal-700 font-medium">
              অর্ডার ডেলিভারি ও AI ক্যাম্পেইনে ব্যবহারযোগ্য
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>সর্বমোট অনুমোদিত রিচার্জ</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
              {formatBDT(totalApproved)}
            </div>
            <p className="text-[11px] text-slate-500">
              যাচাইকৃত সফল লেনদেনের মোট হিসাব
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>অনুমোদন অপেক্ষমাণ ডিপোজিট</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight">
              {formatBDT(totalPending)}
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              অ্যাডমিন যাচাই প্রক্রিয়াধীন রয়েছে
            </p>
          </div>
        </div>

        {/* Recharge History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-4">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                রিচার্জ ও পেমেন্ট হিস্টোরি
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              মোট লেনদেন: {deposits.length}টি
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3.5">তারিখ ও সময়</th>
                  <th className="p-3.5">পেমেন্ট মেথড</th>
                  <th className="p-3.5">প্রেরক নম্বর</th>
                  <th className="p-3.5">TrxID</th>
                  <th className="p-3.5 text-right">পরিমাণ (টাকা)</th>
                  <th className="p-3.5 text-center">স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">ইনভয়েস / একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                      <span>রিচার্জ হিস্টোরি লোড হচ্ছে...</span>
                    </td>
                  </tr>
                ) : deposits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-500 space-y-2">
                      <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="font-bold text-slate-700 text-sm">কোনো রিচার্জ হিস্টোরি পাওয়া যায়নি</p>
                      <p className="text-xs text-slate-400">
                        হেডারের &quot;রিচার্জ&quot; বাটনে ক্লিক করে বিকাশ, নগদ বা ব্যাংকে ব্যালান্স যোগ করুন।
                      </p>
                    </td>
                  </tr>
                ) : (
                  deposits.map((dep: any) => {
                    const isApproved = dep.status === "APPROVED";
                    const isPending = dep.status === "PENDING";
                    const isRejected = dep.status === "REJECTED";

                    return (
                      <tr key={dep.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 text-slate-600 font-medium">
                          {new Date(dep.createdAt).toLocaleString("bn-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <MfsLogo method={dep.method} className="w-5 h-5 shrink-0" />
                            <span className="font-bold text-slate-800 uppercase">{dep.method}</span>
                          </div>
                        </td>

                        <td className="p-3.5 font-mono text-slate-600">
                          {dep.senderNumber || "—"}
                        </td>

                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          {dep.trxId}
                        </td>

                        <td className="p-3.5 text-right font-black text-slate-900 text-sm">
                          {formatBDT(dep.amount)}
                        </td>

                        <td className="p-3.5 text-center">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>অনুমোদিত</span>
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>যাচাই অপেক্ষমাণ</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>বাতিল</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 text-right">
                          {isApproved ? (
                            <button
                              onClick={() => setSelectedInvoice(dep)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-teal-600" />
                              <span>ইনভয়েস</span>
                            </button>
                          ) : isPending ? (
                            <a
                              href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                                `আসসালামু আলাইকুম, আমি নিশচিন্ত শপ থেকে বলছি। আমি ৳${dep.amount} রিচার্জ করেছি (TrxID: ${dep.trxId})। অনুগ্রহ করে দ্রুত অনুমোদন করবেন।`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-all"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-600" />
                              <span>সাপোর্ট</span>
                            </a>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">—</span>
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

        {/* Official Printable Invoice Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              {/* Invoice Actions Top */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    অফিসিয়াল রিচার্জ ইনভয়েস
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>প্রিন্ট / PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Invoice Body */}
              <div id="printable-invoice" className="space-y-6 text-slate-800">
                {/* Header Brand */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Nishchinto Technologies</h3>
                    <p className="text-xs text-slate-500">Bangladeshi E-commerce & F-commerce OS</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">https://nishchinto.app</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-lg border border-emerald-300">
                      PAID & VERIFIED ✓
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                      INV-{selectedInvoice.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      তারিখ: {new Date(selectedInvoice.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                </div>

                {/* Billed To / Merchant Details */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      গ্রাহক / মার্চেন্ট
                    </span>
                    <p className="font-bold text-slate-900">
                      {merchant?.businessName || selectedInvoice.merchant?.businessName || "আমার স্টোর"}
                    </p>
                    <p className="text-slate-600">
                      মালিক: {merchant?.ownerName || selectedInvoice.merchant?.ownerName || "মার্চেন্ট"}
                    </p>
                    <p className="font-mono text-slate-500">
                      {merchant?.phone || selectedInvoice.merchant?.phone || selectedInvoice.senderNumber}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      পেমেন্ট বিবরণ
                    </span>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MfsLogo method={selectedInvoice.method} className="w-4 h-4 shrink-0" />
                      <span>{selectedInvoice.method} পেমেন্ট</span>
                    </div>
                    <p className="font-mono text-slate-600">
                      প্রেরক: {selectedInvoice.senderNumber}
                    </p>
                    <p className="font-mono font-bold text-teal-800">
                      TrxID: {selectedInvoice.trxId}
                    </p>
                  </div>
                </div>

                {/* Itemized Table */}
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="py-2 text-left">বিবরণ</th>
                      <th className="py-2 text-center">পরিমাণ</th>
                      <th className="py-2 text-right">মূল্য (টাকা)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3">
                        <span className="font-bold text-slate-900 block">
                          Nischinto Prepaid Wallet Credit Top-up
                        </span>
                        <span className="text-[11px] text-slate-500">
                          মার্চেন্ট অ্যাকাউন্টে স্বয়ংক্রিয় প্রিপেইড ব্যালান্স রিচার্জ
                        </span>
                      </td>
                      <td className="py-3 text-center">১</td>
                      <td className="py-3 text-right font-bold text-slate-900">
                        {formatBDT(selectedInvoice.amount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-500">প্ল্যাটফর্ম ও গেটওয়ে ফি</td>
                      <td className="py-2 text-center text-slate-500">১</td>
                      <td className="py-2 text-right font-medium text-emerald-600">৳০.০০ (ফ্রি)</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-900 text-sm font-black text-slate-900">
                      <td colSpan={2} className="pt-3 text-left">সর্বমোট পরিশোধিত (Total Paid)</td>
                      <td className="pt-3 text-right text-emerald-700">
                        {formatBDT(selectedInvoice.amount)}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {/* Footer notes */}
                <div className="pt-4 border-t border-slate-200 text-center space-y-1">
                  <p className="text-[11px] text-slate-500">
                    এটি একটি কম্পিউটার জেনারেটেড ডিজিটাল ইনভয়েস। কোনো ম্যানুয়াল স্বাক্ষরের প্রয়োজন নেই।
                  </p>
                  <p className="text-[10px] text-slate-400">
                    © 2026 Nishchinto Technologies । সর্বস্বত্ব সংরক্ষিত।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
