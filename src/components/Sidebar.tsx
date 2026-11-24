"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NishchintoLogo from "./NishchintoLogo";
import {
  Package,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Truck,
  DollarSign,
  ShoppingCart,
  Boxes,
  Zap,
  TrendingUp,
  MessageSquare,
  Barcode,
  Users,
  Settings,
  Building2,
  Globe,
  CreditCard,
  User,
} from "lucide-react";

const navigation = [
  { name: "অর্ডার ড্যাশবোর্ড", href: "/dashboard", icon: Package },
  { name: "কাস্টম ল্যান্ডিং পেজ", href: "/landing-pages", icon: Globe, badge: "Builder" },
  { name: "AI অটো অ্যাড ম্যানেজার", href: "/ai-ads", icon: Sparkles, badge: "Autopilot" },
  { name: "AI ভয়েস কলিং", href: "/ai-calls", icon: PhoneCall, badge: "Bangla" },
  { name: "সেন্ট্রাল ফ্রড গার্ড", href: "/fraud-guard", icon: ShieldAlert },
  { name: "WhatsApp ও SMS মার্কেটিং", href: "/marketing", icon: MessageSquare, badge: "CAPI" },
  { name: "কুরিয়ার ও সেটেলমেন্ট", href: "/settlements", icon: Truck },
  { name: "বিলিং ও রিচার্জ", href: "/billing", icon: CreditCard, badge: "Invoice" },
  { name: "প্রফিট ও অ্যাড অ্যানালিটিক্স", href: "/analytics", icon: TrendingUp },
  { name: "রিটার্ন বারকোড স্ক্যানার", href: "/inventory-damage", icon: Barcode },
  { name: "সাপ্লায়ার ও পারচেজ (PO)", href: "/suppliers", icon: Building2 },
  { name: "টিম পারমিশন (RBAC)", href: "/team", icon: Users },
  { name: "পণ্য ও ইনভেন্টরি", href: "/products", icon: Boxes },
  { name: "মার্চেন্ট প্রোফাইল", href: "/profile", icon: User },
  { name: "ইন্টিগ্রেশন ও সেটিংস", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <NishchintoLogo size="sm" showBangla={true} />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            কোর অপারেশন
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-800 shadow-sm border border-teal-200/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-teal-600" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tight ${
                      isActive
                        ? "bg-teal-200 text-teal-900"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Plan / Subscription Summary in Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-xl border border-teal-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-teal-950">PRO AI প্ল্যান</span>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
              সক্রিয়
            </span>
          </div>
          <p className="text-[10px] text-slate-600 mb-2">
            AI অটো অ্যাড, ভয়েস এজেন্ট ও কুরিয়ার সিঙ্ক সক্রিয়।
          </p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-3/4 rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
