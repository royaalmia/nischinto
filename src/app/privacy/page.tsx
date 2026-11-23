"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="md" showBangla={true} />
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-700 hover:text-teal-700 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমপেজে ফিরুন</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>ডেটা নিরাপত্তা ও সুরক্ষা</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            প্রাইভেসি ও ডেটা সুরক্ষা পলিসি (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-500">সর্বশেষ সংস্করণ: ২৪ নভেম্বর ২০২৬</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">১. আমাদের গোপনীয়তা রক্ষা অঙ্গীকার</h2>
          <p>
            Nishchinto.app-এ আমরা আপনার এবং আপনার সম্মানিত ক্রেতাদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। আমরা কখনোই আপনার স্টোরের কাস্টমার ডেটাবেস, ফোন নম্বর বা বিক্রয় তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি, লিজ বা শেয়ার করি না।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">২. আমরা কোন কোন তথ্য সংগ্রহ করি</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>মার্চেন্টের নাম, ব্যবসার নাম, অফিসিয়াল ফোন নম্বর ও ইমেইল ঠিকানা।</li>
            <li>অর্ডার প্রসেসিংয়ের উদ্দেশ্যে প্রয়োজনীয় কাস্টমারের নাম, ডেলিভারি ঠিকানা ও ফোন নম্বর।</li>
            <li>কুরিয়ার ট্র্যাকিং আইডি ও কনসাইনমেন্ট স্ট্যাটাস ডেটা।</li>
            <li>সার্ভিস সংক্রান্ত এআই ভয়েস কল লগ ও মেসেজ ডেলিভারি রিপোর্ট।</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৩. 1-Click Phone Masking ও কর্মী সুরক্ষা</h2>
          <p>
            মার্চেন্টদের মূল্যবান কাস্টমার ডেটাবেস চুরি হওয়া রোধ করতে আমাদের প্ল্যাটফর্মে রয়েছে <strong>ডেটা গার্ড (ফোন নম্বর মাস্কিং)</strong> প্রযুক্তি। এর মাধ্যমে সাব-অ্যাকাউন্ট বা মডারেটরদের স্ক্রিনে কাস্টমারের ফোন নম্বরের একাংশ স্বয়ংক্রিয়ভাবে গোপন থাকে, যাতে কোনো কর্মী একসাথে ডেটাবেস কপি করতে না পারে।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৪. তথ্যের এনক্রিপশন ও ক্লাউড নিরাপত্তা</h2>
          <p>
            সকল সংবেদনশীল তথ্য ও এপিআই সিক্রেট টোকেন ইন্ডাস্ট্রি স্ট্যান্ডার্ড AES-256 এনক্রিপশনের মাধ্যমে ক্লাউডফ্লেয়ারের সুরক্ষিত নেটওয়ার্কে সংরক্ষিত হয়।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৫. আপনার অধিকার</h2>
          <p>
            যেকোনো সময় আপনি আপনার অ্যাকাউন্ট ও সংরক্ষিত তথ্যের কপি চাইতে পারেন কিংবা সম্পূর্ণ অ্যাকাউন্ট ডিলিট করার অনুরোধ জানাতে পারেন।
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
          প্রাইভেসি বিষয়ক যেকোনো প্রয়োজনে আমাদের ডেটা সিকিউরিটি টিমের সাথে যোগাযোগ করুন: <a href="mailto:connect@nishchinto.app" className="text-teal-700 font-semibold underline">connect@nishchinto.app</a>
        </div>
      </main>
    </div>
  );
}
