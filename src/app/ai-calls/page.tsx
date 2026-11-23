"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { formatBDT, maskPhone } from "@/lib/utils";
import {
  PhoneCall,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  MessageSquare,
  Play,
  Volume2,
} from "lucide-react";

export default function AiCallsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTranscript, setActiveTranscript] = useState<string | null>(null);

  useEffect(() => {
    fetchOrdersWithCalls();
  }, []);

  const fetchOrdersWithCalls = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        // Collect all aiCalls from orders
        const allCalls: any[] = [];
        data.data.forEach((o: any) => {
          if (o.aiCalls && o.aiCalls.length > 0) {
            o.aiCalls.forEach((c: any) => {
              allCalls.push({ ...c, orderNumber: o.orderNumber, customerName: o.customer.name });
            });
          }
        });
        setCalls(allCalls);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>বাংলিশ ও বাংলা কথোপকথন এজেন্ট</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              AI ভয়েস কলিং (Autonomous Voice Agent)
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              কল সেন্টারে লোক না রেখেই দিনে হাজার হাজার কাস্টমারকে স্বয়ংক্রিয়ভাবে কল করে পণ্য, সাইজ ও ডেলিভারি ঠিকানা নিশ্চিত করুন। কাস্টমারের রেসপন্স অনুযায়ী অর্ডার স্বয়ংক্রিয়ভাবে কনফার্ম হয়ে যায়।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2 min-w-[200px]">
            <span className="text-xs text-slate-300 block">কল প্রতি খরচ</span>
            <div className="text-2xl font-extrabold text-white">৳ ১.৫০ <span className="text-xs font-normal text-slate-300">/সফল কল</span></div>
            <p className="text-[11px] text-emerald-400 font-semibold">সফলতার হার: ৯২.৩%</p>
          </div>
        </div>

        {/* Calls Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">ভয়েস কল হিস্টোরি ও ট্রান্সক্রিপ্ট</h3>
            <span className="text-xs text-slate-500">মোট সম্পন্ন কল: {calls.length}টি</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">অর্ডার নং ও কাস্টমার</th>
                  <th className="p-3">ফোন নম্বর</th>
                  <th className="p-3">স্থায়িত্ব ও খরচ</th>
                  <th className="p-3">কল স্ট্যাটাস</th>
                  <th className="p-3">কাস্টমার সিদ্ধান্ত</th>
                  <th className="p-3 text-right">কথোপকথন (Transcript)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      কল হিস্টোরি লোড হচ্ছে...
                    </td>
                  </tr>
                ) : calls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      এখনো কোনো ভয়েস কল রেকর্ড নেই। অর্ডার পেজ থেকে কাস্টমারকে কল করতে পারবেন।
                    </td>
                  </tr>
                ) : (
                  calls.map((call) => (
                    <tr key={call.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{call.orderNumber}</span>
                        <span className="text-slate-500">{call.customerName}</span>
                      </td>

                      <td className="p-3 font-mono font-medium text-slate-800">
                        {maskPhone(call.phone, true)}
                      </td>

                      <td className="p-3">
                        <span className="font-semibold text-slate-800 block">{call.durationSec} সেকেন্ড</span>
                        <span className="text-[11px] text-slate-400">চার্জ: ৳{call.cost}</span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            call.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {call.status === "COMPLETED" ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3 h-3 text-red-600" />
                          )}
                          <span>{call.status}</span>
                        </span>
                      </td>

                      <td className="p-3 font-semibold text-indigo-700">
                        {call.customerIntent || "N/A"}
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => setActiveTranscript(call.transcript)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>ট্রান্সক্রিপ্ট দেখুন</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transcript Modal */}
        {activeTranscript && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    রেকর্ডেড অডিও ট্রান্সক্রিপ্ট
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTranscript(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-sans leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                {activeTranscript}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTranscript(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
