"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Globe, CreditCard, User, Menu } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const handleOpenMenu = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-mobile-menu"));
    }
  };

  const navItems = [
    { label: "অর্ডার", href: "/dashboard", icon: Package },
    { label: "ল্যান্ডিং পেজ", href: "/landing-pages", icon: Globe },
    { label: "বিলিং", href: "/billing", icon: CreditCard },
    { label: "প্রোফাইল", href: "/profile", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 flex items-center justify-around px-2 shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? "text-teal-700 font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-transform ${
                isActive ? "text-teal-600 stroke-[2.5] scale-110" : "text-slate-400"
              }`}
            />
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </Link>
        );
      })}

      {/* Full Menu Trigger */}
      <button
        onClick={handleOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
      >
        <Menu className="w-5 h-5 text-slate-500" />
        <span className="text-[10px] mt-0.5 tracking-tight">সব মেনু</span>
      </button>
    </div>
  );
}
