"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { formatBDT } from "@/lib/utils";
import {
  Barcode,
  Scan,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Boxes,
  Trash2,
  Search,
} from "lucide-react";

export default function InventoryDamagePage() {
  const [barcodeInput, setBarcodeInput] = useState("SF-88992211");
  const [condition, setCondition] = useState<"GOOD" | "DAMAGED">("GOOD");
  const [scannedParcels, setScannedParcels] = useState<any[]>([
    {
      id: "RET-1",
      trackingId: "SF-88992211",
      orderNumber: "NSH-1004",
      productName: "Waterproof Travel Laptop Backpack",
      condition: "GOOD",
      action: "স্টকে পুনরায় যোগ করা হয়েছে (+১)",
      time: "১০ মিনিট আগে",
    },
    {
      id: "RET-2",
      trackingId: "PT-112233",
      orderNumber: "NSH-0994",
      productName: "Premium Drop-Shoulder T-Shirt",
      condition: "DAMAGED",
      action: "ড্যামেজ স্টকে যোগ ও কুরিয়ার ক্ষতিপূরণ ক্লেইম",
      time: "১ ঘন্টা আগে",
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput) return;

    const newEntry = {
      id: `RET-${Date.now().toString().slice(-4)}`,
      trackingId: barcodeInput,
      orderNumber: `NSH-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: "প্রিমিয়াম পণ্য (স্ক্যানকৃত)",
      condition,
      action:
        condition === "GOOD"
          ? "ভালো স্টকে যোগ করা হয়েছে (+১)"
          : "ড্যামেজ লসে পাঠানো হয়েছে ও কুরিয়ার ক্ষতিপূরণ ফাইল হয়েছে",
      time: "মাত্র এইমাত্র",
    };

    setScannedParcels([newEntry, ...scannedParcels]);
    setBarcodeInput("");
    setToastMessage(
      condition === "GOOD"
        ? "পার্সেল চেক সফল: পণ্য আবার ভালো ইনভেন্টরি স্টকে যোগ হয়েছে!"
        : "ড্যামেজ পার্সেল হিসেবে তালিকাভুক্ত হয়েছে এবং কুরিয়ার ক্লেইম রেজিস্টার হয়েছে।"
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <Barcode className="w-3.5 h-3.5 text-blue-400" />
            <span>রিভার্স লজিস্টিকস ও বারকোড ট্র্যাকার</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            রিটার্ন ও ড্যামেজ ইনভেন্টরি ম্যানেজমেন্ট
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            কুরিয়ার থেকে আসা রিটার্ন পার্সেল স্ক্যানার দিয়ে স্ক্যান করে নিমিষেই আলাদা করুন—কোনটি ভালো স্টকে আবার বিক্রি হবে আর কোনটি ভেঙে নষ্ট হয়ে ড্যামেজ হিসেবে কুরিয়ারের কাছে ক্ষতিপূরণ চাইতে হবে।
          </p>
        </div>

        {/* Scanner Input Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Scan className="w-5 h-5 text-teal-600" />
            <span>রিটার্ন পার্সেল বারকোড স্ক্যান করুন</span>
          </h3>

          <form onSubmit={handleScanSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                কুরিয়ার ট্র্যাকিং বারকোড / কনসাইনমেন্ট আইডি
              </label>
              <div className="relative">
                <Barcode className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="বারকোড স্ক্যানার দিয়ে স্ক্যান করুন বা টাইপ করুন (যেমন: SF-88992211)"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                পণ্যটির বর্তমান অবস্থা (Condition)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCondition("GOOD")}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    condition === "GOOD"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  ✅ ভালো স্টক (Good)
                </button>
                <button
                  type="button"
                  onClick={() => setCondition("DAMAGED")}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    condition === "DAMAGED"
                      ? "bg-red-50 text-red-800 border-red-300 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  ⚠️ নষ্ট / ড্যামেজ
                </button>
              </div>
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>স্টক আপডেট ও এন্ট্রি নিশ্চিত করুন</span>
              </button>
            </div>
          </form>
        </div>

        {/* Scan Log Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            সর্বশেষ স্ক্যানকৃত রিটার্ন রেকর্ড
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">ট্র্যাকিং ও অর্ডার নং</th>
                  <th className="p-3">পণ্যের বিবরণ</th>
                  <th className="p-3">অবস্থা</th>
                  <th className="p-3">অ্যাকশন গৃহীত</th>
                  <th className="p-3 text-right">সময়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scannedParcels.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <span className="font-mono font-bold text-slate-900 block">
                        {p.trackingId}
                      </span>
                      <span className="text-[10px] text-slate-400">{p.orderNumber}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{p.productName}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.condition === "GOOD"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.condition === "GOOD" ? "ভালো পণ্য (Good Stock)" : "ভাঙা/নষ্ট (Damaged)"}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{p.action}</td>
                    <td className="p-3 text-right text-slate-400">{p.time}</td>
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
