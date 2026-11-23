"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Download,
  ShieldAlert,
} from "lucide-react";

export default function SettlementsPage() {
  const [settlements, setSettlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock sample settlements
    setSettlements([
      {
        id: "SET-1",
        orderNumber: "NSH-1001",
        courierName: "STEADFAST",
        consignmentId: "SF-88992211",
        codAmount: 1530.0,
        deliveryFee: 80.0,
        codFee: 15.3,
        netPayable: 1434.7,
        status: "PAID",
        bankRefNumber: "EBL-NPSB-9872134",
        settledAt: "2026-11-23",
      },
      {
        id: "SET-2",
        orderNumber: "NSH-1002",
        courierName: "PATHAO",
        consignmentId: "PT-442299",
        codAmount: 1380.0,
        deliveryFee: 80.0,
        codFee: 13.8,
        netPayable: 1286.2,
        status: "PENDING",
        bankRefNumber: null,
        settledAt: null,
      },
    ]);
    setLoading(false);
  }, []);

  const totalPaid = settlements
    .filter((s) => s.status === "PAID")
    .reduce((acc, s) => acc + s.netPayable, 0);

  const totalPending = settlements
    .filter((s) => s.status === "PENDING")
    .reduce((acc, s) => acc + s.netPayable, 0);

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>অটো কুরিয়ার রিকনসিলিয়েশন</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            কুরিয়ার পেমেন্ট সেটেলমেন্ট ও হিসাব-নিকাশ
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            কুরিয়ার কোম্পানি আপনার ব্যাংকে বা বিকাশে টাকা পাঠালে, প্রতিটি পার্সেলের ডেলিভারি চার্জ ও COD ফি মিলিয়ে স্বয়ংক্রিয়ভাবে হিসাব রাখুন। কোন পার্সেলের টাকা পেয়েছেন আর কোনটি বকেয়া আছে—সব নিখুঁতভাবে দেখুন।
          </p>
        </div>

        {/* Settlement Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">ব্যাংকে পাওয়া টাকা (Paid)</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{formatBDT(totalPaid)}</h3>
              <p className="text-[11px] text-slate-400 mt-1">সব কুরিয়ার চার্জ কেটে নেট প্রাপ্তি</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">কুরিয়ারে বকেয়া (Pending)</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{formatBDT(totalPending)}</h3>
              <p className="text-[11px] text-slate-400 mt-1">কুরিয়ার থেকে পাঠানো বাকি আছে</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">কুরিয়ার ফি ও চার্জ</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">৳১৮৮.৮০</h3>
              <p className="text-[11px] text-slate-400 mt-1">ডেলিভারি ফি + ১% COD কমিশন</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">পার্সেলভিত্তিক সেটেলমেন্ট স্টেটমেন্ট</h3>
            <button
              onClick={() => alert("CSV এক্সপোর্ট ডাউনলোড করা হয়েছে")}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>CSV এক্সপোর্ট</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">অর্ডার ও কুরিয়ার</th>
                  <th className="p-3">ট্র্যাকিং কনসাইনমেন্ট</th>
                  <th className="p-3">COD কালেকশন</th>
                  <th className="p-3">ডেলিভারি ফি</th>
                  <th className="p-3">১% COD ফি</th>
                  <th className="p-3">মার্চেন্ট নেট পেয়্যাবল</th>
                  <th className="p-3">সেটেলমেন্ট স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {settlements.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{s.orderNumber}</span>
                      <span className="text-[10px] font-semibold text-blue-600">{s.courierName}</span>
                    </td>

                    <td className="p-3 font-mono text-slate-700">{s.consignmentId}</td>

                    <td className="p-3 font-semibold text-slate-800">{formatBDT(s.codAmount)}</td>

                    <td className="p-3 text-red-600 font-medium">-৳{s.deliveryFee}</td>

                    <td className="p-3 text-red-600 font-medium">-৳{s.codFee}</td>

                    <td className="p-3 font-bold text-emerald-700">{formatBDT(s.netPayable)}</td>

                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {s.status === "PAID" ? "পরিশোধিত (Bank Ref: " + s.bankRefNumber + ")" : "বকেয়া (Pending)"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
