"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Public / standalone pages that do NOT have the internal merchant CRM sidebar
  const isPublicPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/admin" ||
    pathname === "/checkout" ||
    pathname === "/welcome";

  if (isPublicPage) {
    return <div className="w-full min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen flex w-full bg-slate-50 text-slate-900 antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {children}
      </div>
    </div>
  );
}
