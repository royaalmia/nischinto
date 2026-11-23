"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  Building2,
  Plus,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Truck,
} from "lucide-react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([
    {
      id: "SUP-1",
      name: "প্রাইম কটন টেক্সটাইল (ফ্যাক্টরি)",
      contactPerson: "কামাল উদ্দিন",
      phone: "01711002233",
      category: "টি-শার্ট ও ফেব্রিক",
      totalPurchased: 450000,
      totalPaid: 380000,
      totalDue: 70000,
      lastPO: "PO-2026-089 (৫০০ পিস ড্রপ শোল্ডার)",
    },
    {
      id: "SUP-2",
      name: "ঢাকা গ্যাজেটস ইম্পোর্টার্স",
      contactPerson: "নাজমুল হাসান",
      phone: "01822334455",
      category: "ইলেকট্রনিক্স ও ব্যাকপ্যাক",
      totalPurchased: 320000,
      totalPaid: 320000,
      totalDue: 0,
      lastPO: "PO-2026-074 (১০০ পিস ওয়াটারপ্রুফ ব্যাগ)",
    },
    {
      id: "SUP-3",
      name: "গ্রিন প্যাকেজিং ও পলি সাপ্লাই",
      contactPerson: "আরিফুর রহমান",
      phone: "01933445566",
      category: "কুরিয়ার পলি ও বক্স",
      totalPurchased: 45000,
      totalPaid: 30000,
      totalDue: 15000,
      lastPO: "PO-2026-092 (৫,০০০ পিস সিকিউরিটি পলি ব্যাগ)",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [due, setDue] = useState("0");

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const newSup = {
      id: `SUP-${suppliers.length + 1}`,
      name,
      contactPerson: "প্রতিনিধি",
      phone,
      category,
      totalPurchased: Number(due),
      totalPaid: 0,
      totalDue: Number(due),
      lastPO: "নতুন সাপ্লায়ার",
    };
    setSuppliers([...suppliers, newSup]);
    setShowAddModal(false);
    setName("");
    setCategory("");
    setPhone("");
    setDue("0");
  };

  const totalPayableDue = suppliers.reduce((acc, s) => acc + s.totalDue, 0);
  const totalPurchases = suppliers.reduce((acc, s) => acc + s.totalPurchased, 0);

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-400/20">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>সাপ্লাই চেইন ও হোলসেলার লেজার</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            সাপ্লায়ার ও পারচেজ অর্ডার (Purchase Orders)
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            কোন ফ্যাক্টরি বা হোলসেলার থেকে কত টাকার পণ্য কিনেছেন, কাকে কত টাকা পরিশোধ করেছেন আর কার কত টাকা বাকি আছে—তার পূর্ণাঙ্গ হিসাব রাখুন।
          </p>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold">সর্বমোট কাঁচামাল/পণ্য ক্রয়</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatBDT(totalPurchases)}</h3>
            <span className="text-[11px] text-slate-400">সকল পারচেজ অর্ডারের যোগফল</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold">মোট বকেয়া পাওনা (Payables)</span>
            <h3 className="text-2xl font-bold text-red-600 mt-1">{formatBDT(totalPayableDue)}</h3>
            <span className="text-[11px] text-red-500 font-medium">সাপ্লায়ারদের পরিশোধ করতে হবে</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold">অ্যাক্টিভ সাপ্লায়ার ফ্যাক্টরি</span>
            <h3 className="text-2xl font-bold text-teal-600 mt-1">{suppliers.length} টি</h3>
            <span className="text-[11px] text-slate-400">টেক্সটাইল, গ্যাজেট ও প্যাকেজিং</span>
          </div>
        </div>

        {/* Supplier List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">সাপ্লায়ার অ্যাকাউন্টস ও লেজার</h3>
              <p className="text-xs text-slate-500">বকেয়া পরিশোধ ও নতুন পারচেজ রিকুইজিশন</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সাপ্লায়ার যুক্ত করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">সাপ্লায়ার / ফ্যাক্টরি নাম</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">যোগাযোগ নম্বর</th>
                  <th className="p-3">মোট ক্রয়</th>
                  <th className="p-3">বকেয়া (Due)</th>
                  <th className="p-3">সর্বশেষ পারচেজ অর্ডার</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.contactPerson}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{s.category}</td>
                    <td className="p-3 font-mono text-slate-600">{s.phone}</td>
                    <td className="p-3 font-semibold text-slate-900">
                      {formatBDT(s.totalPurchased)}
                    </td>
                    <td className="p-3">
                      {s.totalDue > 0 ? (
                        <span className="font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-block">
                          বাকি {formatBDT(s.totalDue)}
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                          পরিশোধিত (০)
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{s.lastPO}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">নতুন সাপ্লায়ার যুক্ত করুন</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSupplier} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    ফ্যাক্টরি বা সাপ্লায়ারের নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: আরিয়ান টেক্সটাইল মিলস"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পণ্য ক্যাটাগরি</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="যেমন: গার্মেন্টস, গ্যাজেটস বা প্যাকেজিং"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    বর্তমান বকেয়া পাওনা (টাকা)
                  </label>
                  <input
                    type="number"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-teal-700"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
