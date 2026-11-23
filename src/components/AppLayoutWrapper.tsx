"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Public / Standalone routes that do NOT have the internal merchant CRM sidebar
  // Only internal merchant operational pages (e.g. /dashboard, /orders, /ai-ads, etc.) get the sidebar
  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/p/");

  if (isPublicPage) {
    return <div className="w-full min-h-screen bg-white text-slate-900">{children}</div>;
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
