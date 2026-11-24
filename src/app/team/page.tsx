"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  Users,
  ShieldCheck,
  Lock,
  Plus,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const json = await res.json();
        if (json.success && json.authenticated && json.user) {
          setTeamMembers([
            {
              id: "USR-OWNER",
              name: `${json.user.ownerName || "মার্চেন্ট"} (অ্যাকাউন্ট ওনার)`,
              email: json.user.email || "merchant@store.nishchinto.app",
              role: "SUPER_ADMIN",
              phoneAccess: "UNMASKED",
              ordersHandled: 0,
              status: "ACTIVE",
            },
          ]);
        }
      } catch (e) {
        console.warn("Team session fetch error", e);
      }
    };
    fetchTeam();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CALL_AGENT");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: `USR-${teamMembers.length + 1}`,
      name,
      email,
      role,
      phoneAccess: "MASKED", // always default to masked for security
      ordersHandled: 0,
      status: "ACTIVE",
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    setName("");
    setEmail("");
    setToastMessage("টিম মেম্বার সফলভাবে যুক্ত করা হয়েছে এবং ডেটা গার্ড মাস্কিং চালু হয়েছে!");
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
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-400/20">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>ডেটা চুরি প্রতিরোধ ও রোল-বেসড সিকিউরিটি</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            টিম মেম্বার ও পারমিশন কন্ট্রোল (RBAC)
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            আপনার কল সেন্টার কর্মী বা মডারেটররা যাতে কাস্টমারদের মূল্যবান ফোন নম্বর চুরি বা এক্সপোর্ট করতে না পারে, সেজন্য তাদের স্ক্রিনে নম্বর মাস্ক করা থাকে। এজেন্টরা ক্লিক-টু-কল করতে পারবে কিন্তু নম্বর কপি করতে পারবে না।
          </p>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">টিম মেম্বার ও অ্যাক্সেস লেভেল</h3>
              <p className="text-xs text-slate-500">কর্মীভিত্তিক পারমিশন এবং কাস্টমার ডেটা ভিজিবিলিটি</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কর্মী যোগ করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="p-3">কর্মীর নাম ও ইমেইল</th>
                  <th className="p-3">ভূমিকা (Role)</th>
                  <th className="p-3">ফোন নম্বর ভিজিবিলিটি</th>
                  <th className="p-3">হ্যান্ডেল করা অর্ডার</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{m.name}</span>
                      <span className="text-[10px] text-slate-400">{m.email}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {m.role === "SUPER_ADMIN"
                          ? "মালিক (Super Admin)"
                          : m.role === "CALL_AGENT"
                          ? "কল সেন্টার এজেন্ট"
                          : m.role === "PACKING_STAFF"
                          ? "প্যাকিং স্টাফ"
                          : "মডারেটর"}
                      </span>
                    </td>
                    <td className="p-3">
                      {m.phoneAccess === "MASKED" ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          <EyeOff className="w-3 h-3 text-emerald-600" />
                          <span>নম্বর মাস্কড (সুরক্ষিত)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <Eye className="w-3 h-3 text-slate-500" />
                          <span>সম্পূর্ণ দৃশ্যমান (Owner)</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{m.ordersHandled} টি</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
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
                <h3 className="font-bold text-base text-slate-900">নতুন টিম মেম্বার যুক্ত করুন</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">কর্মীর নাম</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: সাকিব আল হাসান"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@company.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ভূমিকা (Role)</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="CALL_AGENT">কল সেন্টার এজেন্ট (নম্বর মাস্কিং সহ)</option>
                    <option value="PACKING_STAFF">প্যাকিং স্টাফ (শুধু ইনভয়েস ও বারকোড)</option>
                    <option value="MODERATOR">মডারেটর (চ্যাট ও মেসেঞ্জার)</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ডেটা গার্ড সুরক্ষা সক্রিয় থাকবে:</span>
                  </span>
                  <p>এই কর্মী কোনোভাবেই কাস্টমারদের ফোন নম্বর এক্সপোর্ট বা কপি করতে পারবে না।</p>
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
                    কর্মী যুক্ত করুন
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
