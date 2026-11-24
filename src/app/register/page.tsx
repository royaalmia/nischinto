"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NishchintoLogo from "@/components/NishchintoLogo";
import { Lock, Mail, User, Store, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("PRO_AI");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          ownerName,
          email,
          phone,
          plan,
        }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        if (typeof window !== "undefined") {
          const registeredMerchant = data.data || {
            id: `mch_${Date.now()}`,
            businessName,
            ownerName,
            email,
            phone,
            plan,
            walletBalance: 200.0,
            ordersProcessed: 0,
            status: "ACTIVE",
            joinedDate: new Date().toISOString().split("T")[0],
          };

          // Set current logged in merchant
          localStorage.setItem("merchant_user", JSON.stringify(registeredMerchant));

          // Save to all_merchants registry so Super Admin displays it
          try {
            const rawAll = localStorage.getItem("all_merchants");
            const allList = rawAll ? JSON.parse(rawAll) : [];
            const filtered = allList.filter((m: any) => m.email !== registeredMerchant.email && m.phone !== registeredMerchant.phone);
            localStorage.setItem("all_merchants", JSON.stringify([registeredMerchant, ...filtered]));
          } catch (e) {
            console.error("Failed to sync registered merchant to localStorage", e);
          }
        }

        // Redirect directly to merchant dashboard
        router.push("/dashboard");
      } else {
        setErrorMsg(data.error || "নিবন্ধন সম্পন্ন করা যায়নি। পুনরায় চেষ্টা করুন।");
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrorMsg("সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <NishchintoLogo size="md" showTagline={true} />
          </Link>
          <h2 className="text-xl font-bold text-slate-900 pt-1">
            নতুন মার্চেন্ট অ্যাকাউন্ট খুলুন
          </h2>
          <p className="text-xs text-slate-500">
            ১৪ দিনের ফ্রি ট্রায়াল শুরু করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ব্যবসা বা স্টোরের নাম
            </label>
            <div className="relative">
              <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="যেমন: স্টাইলিশ ফ্যাশন বিডি"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                আপনার পূর্ণ নাম
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="যেমন: তানভীর হাসান"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                মোবাইল নম্বর
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="store@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              পাসওয়ার্ড নির্ধারণ করুন
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬টি অক্ষর বা সংখ্যা"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              প্ল্যান নির্বাচন
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "STARTER", name: "Starter", price: "৳৯৯৯" },
                { id: "GROWTH", name: "Growth", price: "৳১,৯৯৯" },
                { id: "PRO_AI", name: "Pro AI", price: "৳৩,৯৯৯" },
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    plan === p.id
                      ? "border-teal-600 bg-teal-50 text-teal-900 font-bold"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="block font-semibold">{p.name}</span>
                  <span className="text-[10px] text-slate-500">{p.price}/মাস</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>{submitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "মার্চেন্ট অ্যাকাউন্ট খুলুন"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-1 text-xs text-slate-500">
          <span>ইতিমধ্যে অ্যাকাউন্ট রয়েছে? </span>
          <Link href="/login" className="font-semibold text-teal-700 hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
