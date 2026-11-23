"use client";

import { useState } from "react";
import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { formatBDT } from "@/lib/utils";
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  Truck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageSquare,
  Boxes,
  ExternalLink,
  Users,
  Check,
  Menu,
  X,
} from "lucide-react";

export default function PublicHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [monthlyOrders, setMonthlyOrders] = useState(500);

  // Live Fraud Checker State on Hero
  const [demoPhone, setDemoPhone] = useState("01999000111");
  const [checkingDemo, setCheckingDemo] = useState(false);
  const [demoResult, setDemoResult] = useState<any | null>(null);

  // Active Feature Tab
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  // Calculation for ROI
  const averageReturnRateWithoutCRM = 0.22;
  const averageReturnRateWithNishchinto = 0.08;
  const courierFee = 130;

  const ordersSavedFromReturn = Math.round(
    monthlyOrders * (averageReturnRateWithoutCRM - averageReturnRateWithNishchinto)
  );
  const monthlySavings = ordersSavedFromReturn * courierFee;

  const handleDemoCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingDemo(true);
    setDemoResult(null);

    setTimeout(() => {
      setCheckingDemo(false);
      if (demoPhone.endsWith("111")) {
        setDemoResult({
          score: 88,
          level: "HIGH_RISK",
          title: "উচ্চ ঝুঁকি শনাক্ত (High Risk)",
          text: "কুরিয়ার ডেটাবেসে ৭টির মধ্যে ৬টি পার্সেল রিটার্নের রেকর্ড রয়েছে। অগ্রিম ডেলিভারি চার্জ গ্রহণ করার সুপারিশ করা হলো।",
          color: "red",
        });
      } else {
        setDemoResult({
          score: 5,
          level: "SAFE",
          title: "নিরাপদ ক্রেতা (Safe)",
          text: "পূর্বে সম্পন্ন হওয়া সকল পার্সেল সফলভাবে ডেলিভারি হয়েছে। কোনো রিটার্ন রেকর্ড পাওয়া যায়নি।",
          color: "green",
        });
      }
    }, 450);
  };

  const featureTabs = [
    {
      id: "ai-ads",
      title: "AI অটো অ্যাড ম্যানেজার",
      badge: "বিজ্ঞাপন অটোমেশন",
      headline: "বিজ্ঞাপন চলবে স্বয়ংক্রিয়ভাবে, স্টক শেষ হলে বাজেট অপচয় বন্ধ",
      description:
        "মার্চেন্টের প্রোডাক্ট সিলেক্ট করার পর সিস্টেম স্বয়ংক্রিয়ভাবে প্রফেশনাল বাংলা সেলস কপি তৈরি করে Facebook Ad Manager-এ লাইভ করে। পণ্যের স্টক শেষ হয়ে গেলে তাৎক্ষণিক বিজ্ঞাপন পজ করে দেয়।",
      points: [
        "এক ক্লিকে প্রফেশনাল বাংলা সেলস কপি ও অফার টেক্সট তৈরি",
        "স্টক শেষ হওয়ার সাথে সাথে ফেসবুক বিজ্ঞাপন স্বয়ংক্রিয়ভাবে পজ",
        "নির্দিষ্ট খরচের মধ্যে কাঙ্ক্ষিত সেল না আসলে ঝুঁকি এড়াতে অটো-কিল",
        "সফল ডেলিভারি পাওয়া আসল ক্রেতাদের ডেটা দিয়ে ১% লুকঅ্যালাইক অডিয়েন্স",
      ],
      tag: "বাজেট সুরক্ষা",
    },
    {
      id: "fraud-guard",
      title: "সেন্ট্রাল ফ্রড গার্ড",
      badge: "কুরিয়ার ক্রস-ম্যাচ",
      headline: "পার্সেল পাঠানোর আগেই কাস্টমারের অতীত ডেলিভারি রেকর্ড যাচাই",
      description:
        "অর্ডার আসার সাথে সাথে দেশের শীর্ষ কুরিয়ার কোম্পানিগুলোর (Steadfast, Pathao, RedX) কেন্দ্রীয় ডেটাবেসে নম্বর ক্রস-ম্যাচ করে ০ থেকে ১০০% রিস্ক স্কোর নির্ধারণ করে।",
      points: [
        "Steadfast, Pathao ও RedX কেন্দ্রীয় হিস্টোরি ক্রস-ম্যাচিং",
        "০ থেকে ১০০% মাল্টি-ভেক্টর রিস্ক স্কোর এবং সতর্কবার্তা",
        "অসম্পূর্ণ ও সন্দেহজনক ডেলিভারি ঠিকানা শনাক্তকরণ",
        "ঝুঁকিপূর্ণ অর্ডারের ক্ষেত্রে স্বয়ংক্রিয় অগ্রিম ডেলিভারি চার্জ গ্রহণ",
      ],
      tag: "রিটার্ন রোধ",
    },
    {
      id: "voice-agent",
      title: "বাংলা AI ভয়েস কলিং",
      badge: "ভয়েস অটোমেশন",
      headline: "মানুষের মতো সাবলীল ভাষায় কথা বলে অর্ডার ও ঠিকানা কনফার্মেশন",
      description:
        "কল সেন্টারে অতিরিক্ত জনবল না রেখেও প্রতিদিন শত শত কাস্টমারকে স্বয়ংক্রিয় কল দেওয়া যায়। কাস্টমারের সাথে কথা বলে সাইজ, কালার ও ঠিকানা নিশ্চিত করে অর্ডার কনফার্ম করে দেয়।",
      points: [
        "প্রাকৃতিক ও সাবলীল বাংলা উচ্চারণ এবং কথোপকথন বোঝার ক্ষমতা",
        "কাস্টমার সাইজ বা ডেলিভারি ঠিকানা পরিবর্তন করলে তা সিস্টেমে আপডেট",
        "প্রতিটি সফল কলের সম্পূর্ণ অডিও ট্রান্সক্রিপ্ট সংরক্ষণ",
        "কল সেন্টারের পরিচালন ব্যয় ও সময় উল্লেখযোগ্য হারে সাশ্রয়",
      ],
      tag: "কল সেন্টার সমাধান",
    },
    {
      id: "incomplete-capi",
      title: "ইনকমপ্লিট কার্ট ও CAPI",
      badge: "সার্ভার-সাইড ট্র্যাকিং",
      headline: "ফর্ম পূরণ না করে কেটে দেওয়া কাস্টমারদের তথ্য সংরক্ষণ ও রিকভারি",
      description:
        "কাস্টমার চেকআউট ফর্মে নাম ও মোবাইল নম্বর টাইপ করে বের হয়ে গেলেও সিস্টেম তাৎক্ষণিক সেই তথ্য সংরক্ষণ করে। পরবর্তীতে হোয়াটসঅ্যাপের মাধ্যমে তাদের সাথে যোগাযোগ করে অর্ডার সম্পন্ন করা যায়।",
      points: [
        "টাইপ করার সাথে সাথে ইনকমপ্লিট অর্ডারের তথ্য ক্যাচ",
        "এক ক্লিকে ব্যক্তিগত নামসহ হোয়াটসঅ্যাপ ফলো-আপ মেসেজ",
        "Facebook Conversions API (CAPI) সরাসরি সার্ভার থেকে ট্র্যাকিং",
        "ব্রাউজারের কুকি ব্লকার এড়িয়ে নির্ভুল ইভেন্ট ম্যাচিং",
      ],
      tag: "বিক্রি বৃদ্ধি",
    },
    {
      id: "courier-settlement",
      title: "কুরিয়ার ও সেটেলমেন্ট",
      badge: "লজিস্টিকস ও হিসাব",
      headline: "এক ক্লিকে কুরিয়ার বুকিং এবং কুরিয়ারের সাথে আর্থিক হিসাব সমন্বয়",
      description:
        "নির্দিষ্ট জেলায় কোন কুরিয়ারের পারফরম্যান্স ভালো, সিস্টেম স্বয়ংক্রিয়ভাবে সেটি নির্বাচন করে। কুরিয়ার কোম্পানি টাকা পাঠালে ডেলিভারি চার্জ ও COD ফি মিলিয়ে সঠিক হিসাব সংরক্ষণ করে।",
      points: [
        "জেলা ও থানা অনুযায়ী সেরা কুরিয়ার নির্বাচন (Auto Routing)",
        "একসাথে একাধিক অর্ডারের ট্র্যাকিং কোড ও লেবেল প্রিন্ট",
        "রাইডারের ভুয়া ডেলিভারি ব্যর্থতার বিরুদ্ধে ডিসপিউট রেকর্ড",
        "কুরিয়ার পেমেন্ট সেটেলমেন্ট ও ব্যাংক ট্রান্সফারের নির্ভুল হিসাব",
      ],
      tag: "আর্থিক স্বচ্ছতা",
    },
    {
      id: "inventory-team",
      title: "ইনভেন্টরি ও ডেটা গার্ড",
      badge: "নিরাপত্তা ও স্টক",
      headline: "রিটার্ন বারকোড স্ক্যানিং এবং কর্মীদের কাস্টমার নম্বর চুরি থেকে সুরক্ষা",
      description:
        "কুরিয়ার থেকে আসা রিটার্ন পার্সেল স্ক্যান করে ভালো পণ্য ও ক্ষতিগ্রস্ত পণ্য আলাদা করা যায়। এছাড়া কর্মচারীদের জন্য নম্বর মাস্কিং সুবিধা থাকায় কাস্টমার ডেটাবেস সম্পূর্ণ নিরাপদ থাকে।",
      points: [
        "রিটার্ন পার্সেল বারকোড স্ক্যানিং (ভালো স্টক ও ক্ষতিগ্রস্ত স্টক পৃথকীকরণ)",
        "ডেটা গার্ড: কর্মীদের স্ক্রিনে ফোন নম্বর মাস্কিং (01712****78)",
        "সাপ্লায়ার ও পারচেজ অর্ডার (PO) হিসাব খাতা",
        "রোল-বেসড অ্যাক্সেস কন্ট্রোল (Admin, Agent, Packer, Moderator)",
      ],
      tag: "ডেটা সুরক্ষা",
    },
  ];

  const workflowSteps = [
    {
      step: "০১",
      title: "সিস্টেম সংযোগ",
      desc: "WordPress, Shopify, Facebook ও কুরিয়ারের (Steadfast, Pathao) API যুক্ত করা হয়।",
    },
    {
      step: "০২",
      title: "অর্ডার ট্র্যাকিং",
      desc: "কাস্টমার নাম-নম্বর টাইপ করলেই তথ্য ও CAPI ইভেন্ট ড্যাশবোর্ডে সিঙ্ক হয়।",
    },
    {
      step: "০৩",
      title: "ফ্রড চেকিং",
      desc: "কুরিয়ার হিস্টোরি ক্রস-ম্যাচ করে ০-১০০% রিস্ক স্কোর ও পরামর্শ তৈরি করে।",
    },
    {
      step: "০৪",
      title: "AI ভয়েস কনফার্মেশন",
      desc: "AI স্বয়ংক্রিয়ভাবে কাস্টমারকে কল করে ঠিকানা ও অর্ডার কনফার্ম করে।",
    },
    {
      step: "০৫",
      title: "কুরিয়ার বুকিং",
      desc: "এক ক্লিকে ট্র্যাকিং কোড জেনারেট করে ইনভয়েস ও বারকোড লেবেল প্রিন্ট করা হয়।",
    },
    {
      step: "০৬",
      title: "লাইভ স্ট্যাটাস",
      desc: "পার্সেল স্ক্যান হওয়ার সাথে সাথে স্ট্যাটাস আপডেট ও স্টক সমন্বয় ঘটে।",
    },
    {
      step: "০৭",
      title: "সেটেলমেন্ট হিসাব",
      desc: "কুরিয়ার টাকা পাঠালে COD চার্জ বাদ দিয়ে পাই-টু-পাই লাভ-ক্ষতি হিসাব মিলে যায়।",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* 1. Global Public Top Announcement */}
      <div className="bg-slate-900 text-slate-200 text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <span className="text-teal-400 font-semibold">Nishchinto 2.0:</span>
        <span>প্রথম ১০০ জন মার্চেন্টের জন্য ১৪ দিনের ফ্রি ট্রায়াল চালু রয়েছে।</span>
        <Link href="/register" className="underline font-semibold text-white hover:text-teal-300 ml-1">
          শুরু করুন
        </Link>
      </div>

      {/* 2. Public Header / Navbar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-slate-100">
        <NishchintoLogo size="sm" showBangla={true} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-teal-700 transition-colors">
            ফিচারসমূহ
          </a>
          <a href="#workflow" className="hover:text-teal-700 transition-colors">
            কার্যপ্রণালী
          </a>
          <a href="#calculator" className="hover:text-teal-700 transition-colors">
            সাশ্রয় ক্যালকুলেটর
          </a>
          <a href="#why-us" className="hover:text-teal-700 transition-colors">
            পদ্ধতিগত তুলনা
          </a>
          <a href="#pricing" className="hover:text-teal-700 transition-colors">
            সাবস্ক্রিপশন
          </a>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors"
          >
            লগইন
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            মার্চেন্ট ড্যাশবোর্ড
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 animate-in fade-in">
          <nav className="flex flex-col space-y-2.5 text-xs font-semibold text-slate-700">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-700"
            >
              ফিচারসমূহ
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-700"
            >
              কার্যপ্রণালী
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-700"
            >
              সাশ্রয় ক্যালকুলেটর
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-700"
            >
              পদ্ধতিগত তুলনা
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-700"
            >
              সাবস্ক্রিপশন
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2 text-xs font-semibold border border-slate-200 rounded-xl"
            >
              লগইন
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-2.5 text-xs font-semibold bg-teal-600 text-white rounded-xl"
            >
              মার্চেন্ট ড্যাশবোর্ড
            </Link>
          </div>
        </div>
      )}

      {/* 3. Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-semibold text-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ব্যবসা চালান নিশ্চিন্তে</span>
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2] max-w-4xl mx-auto">
            ই-কমার্স অটোমেশন, ফ্রড প্রতিরোধ ও{" "}
            <span className="text-teal-700">AI অপারেটিং প্ল্যাটফর্ম</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            অর্ডার কনফার্মেশন, কুরিয়ার ফ্রড যাচাই, বাংলা ভয়েস কলিং এবং স্বয়ংক্রিয় বিজ্ঞাপন পরিচালনা—সবকিছু একই প্ল্যাটফর্মে।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              ফ্রি ট্রায়াল শুরু করুন
            </Link>
          </div>

          {/* Interactive Fraud Check Terminal */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs text-slate-300 font-medium">
                  সেন্ট্রাল কুরিয়ার ফ্রড যাচাই পোর্টাল
                </span>
                <span className="text-[10px] text-teal-400 bg-teal-950 border border-teal-800 px-2 py-0.5 rounded font-mono">
                  LIVE API CONNECTED
                </span>
              </div>

              <p className="text-xs text-slate-400">
                যেকোনো কাস্টমারের ফোন নম্বর দিয়ে কুরিয়ার নেটওয়ার্কের রেকর্ড যাচাই করুন:
              </p>

              <form onSubmit={handleDemoCheck} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={demoPhone}
                  onChange={(e) => setDemoPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-mono focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={checkingDemo}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all shrink-0"
                >
                  {checkingDemo ? "যাচাই হচ্ছে..." : "যাচাই করুন"}
                </button>
              </form>

              {demoResult && (
                <div
                  className={`p-3 rounded-xl border text-xs animate-in fade-in ${
                    demoResult.color === "red"
                      ? "bg-red-950/50 border-red-800 text-red-200"
                      : "bg-emerald-950/50 border-emerald-800 text-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{demoResult.title}</span>
                    <span className="font-mono text-xs">স্কোর: {demoResult.score}%</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">{demoResult.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Feature Tabs */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            ফিচার হাব
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            মার্চেন্টদের জন্য স্বয়ংক্রিয় অপারেশন সুবিধা
          </h2>
        </div>

        {/* Tab Buttons (Smooth scroll on mobile) */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start sm:justify-center">
          {featureTabs.map((tab, idx) => {
            const isSelected = activeFeatureTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(idx)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Active Tab Card */}
        {(() => {
          const tab = featureTabs[activeFeatureTab];
          return (
            <div className="bg-slate-50/70 rounded-2xl p-5 sm:p-8 border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-3.5">
                <span className="inline-block text-[11px] font-semibold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md">
                  {tab.badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {tab.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tab.description}
                </p>

                <div className="space-y-2 pt-1">
                  {tab.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                      <div className="w-3.5 h-3.5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-semibold text-slate-800">{tab.title}</span>
                  <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-medium">
                    {tab.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  এই ফিচারটি ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সক্রিয় থেকে মার্চেন্টের সময় ও আর্থিক ক্ষতি কমায়।
                </p>
                <div className="pt-2 flex justify-end">
                  <Link href="/dashboard" className="text-xs font-semibold text-teal-700 hover:underline">
                    ড্যাশবোর্ডে দেখুন →
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. 7-Step A-to-Z Workflow Section */}
      <section id="workflow" className="py-16 bg-slate-50/60 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              A-to-Z কার্যপ্রণালী
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              পর্দার আড়ালে (Backend-এ) কীভাবে কাজ করে?
            </h2>
            <p className="text-xs text-slate-500">
              API ও Webhook প্রযুক্তির মাধ্যমে ওয়েবসাইট, ফেসবুক ও কুরিয়ার কোম্পানির নিরবচ্ছিন্ন সংযোগ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5"
              >
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded inline-block">
                  ধাপ {ws.step}
                </span>
                <h4 className="font-semibold text-sm text-slate-900">{ws.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Nishchinto (Comparison) */}
      <section id="why-us" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            পদ্ধতিগত পার্থক্য
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            প্রচলিত পদ্ধতি বনাম নিশ্চিন্ত স্বয়ংক্রিয় প্ল্যাটফর্ম
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="p-3.5 text-left">গুরুত্বপূর্ণ অপারেশন</th>
                <th className="p-3.5 bg-teal-50/70 text-teal-950 font-bold text-left">
                  Nishchinto.app (স্বয়ংক্রিয়)
                </th>
                <th className="p-3.5 text-left">প্রচলিত ও ম্যানুয়াল পদ্ধতি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  বিজ্ঞাপন মনিটরিং ও বাজেট নিরাপত্তা
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  স্টক ০ হলেই স্বয়ংক্রিয় অ্যাড পজ ও অটো-কিল
                </td>
                <td className="p-3.5 text-slate-500">স্টক শেষ হলেও বিজ্ঞাপনে টাকা খরচ হতে থাকে</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  অর্ডার কনফার্মেশন ও কল সেন্টার
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  সাবলীল বাংলায় Conversational AI স্বয়ংক্রিয় কল
                </td>
                <td className="p-3.5 text-slate-500">কর্মী রেখে ঘণ্টার পর ঘণ্টা ফোন কল</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  কুরিয়ার ফ্রড যাচাই ও রিটার্ন প্রতিরোধ
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  কেন্দ্রীয় কুরিয়ার ডেটাবেস থেকে ০-১০০% রিস্ক স্কোর
                </td>
                <td className="p-3.5 text-slate-500">আন্দাজে পার্সেল পাঠানো ও বেশি রিটার্ন ক্ষতি</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  ইনকমপ্লিট অর্ডার ও ড্রপ-অফ ক্যাচ
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  টাইপ করার সাথে সাথে ডেটা সেভ ও WhatsApp ফলো-আপ
                </td>
                <td className="p-3.5 text-slate-500">ফর্ম সাবমিট না করলে কোনো তথ্য থাকে না</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  কর্মচারীদের কাস্টমার ডেটা চুরি রোধ
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  1-Click Phone Masking (নম্বর কপি অসম্ভব)
                </td>
                <td className="p-3.5 text-slate-500">এক্সেল শিট থেকে ডেটাবেস চুরির ঝুঁকি থাকে</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-slate-800">
                  আসল নিট লাভ-ক্ষতি হিসাব
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  COGS + কুরিয়ার + মেটা অ্যাড স্পেন্ড সহ আসল নিট লাভ
                </td>
                <td className="p-3.5 text-slate-500">শুধু বিক্রয়মূল্য থেকে অনুমানভিত্তিক হিসাব</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Interactive ROI Calculator */}
      <section id="calculator" className="py-16 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              রিটার্ন সেভার ক্যালকুলেটর
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              মাসিক রিটার্ন ক্ষতি সাশ্রয় হিসাব করুন
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-700">
                  <span>মাসিক পার্সেল সংখ্যা:</span>
                  <span className="text-base font-bold text-teal-700 font-mono">
                    {monthlyOrders} টি
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>ম্যানুয়াল পদ্ধতিতে আনুমানিক রিটার্ন লস:</span>
                  <span className="font-semibold text-slate-800">
                    {formatBDT(Math.round(monthlyOrders * averageReturnRateWithoutCRM * courierFee))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Nischinto ব্যবহারের পর রিটার্ন খরচ:</span>
                  <span className="font-semibold text-slate-800">
                    {formatBDT(Math.round(monthlyOrders * averageReturnRateWithNishchinto * courierFee))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>রিটার্ন থেকে বাঁচানো পার্সেল সংখ্যা:</span>
                  <span className="font-bold text-teal-700">
                    {ordersSavedFromReturn} টি
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 text-white text-center space-y-2">
              <span className="text-xs text-slate-400">সম্ভাব্য মাসিক সাশ্রয়</span>
              <div className="text-3xl sm:text-4xl font-bold text-teal-400 font-mono">
                {formatBDT(monthlySavings)}
              </div>
              <p className="text-xs text-slate-400 pt-1">
                এই অর্থ দিয়ে আরও অতিরিক্ত বিজ্ঞাপন চালিয়ে ব্যবসার পরিধি বাড়ানো সম্ভব।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Section */}
      <section id="pricing" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            সাবস্ক্রিপশন প্ল্যান
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            স্বচ্ছ ও সাশ্রয়ী প্যাকেজ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Starter প্ল্যান</h3>
              <p className="text-xs text-slate-500">নতুন অনলাইন উদ্যোক্তাদের জন্য</p>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              ৳ ৯৯৯ <span className="text-xs font-normal text-slate-500">/মাস</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>প্রতি মাসে ৫০০টি অর্ডার প্রসেসিং</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>Steadfast ও Pathao ইন্টিগ্রেশন</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>সেন্ট্রাল ফ্রড চেকার</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>বাল্ক ইনভয়েস ও লেবেল প্রিন্ট</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all"
            >
              শুরু করুন
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="bg-white rounded-2xl p-6 border-2 border-teal-600 shadow-sm space-y-4 relative">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              জনপ্রিয়
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-900">Growth প্ল্যান</h3>
              <p className="text-xs text-slate-500">মাঝারি ব্যবসার জন্য</p>
            </div>
            <div className="text-2xl font-bold text-teal-700 font-mono">
              ৳ ১,৯৯৯ <span className="text-xs font-normal text-slate-500">/মাস</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>আনলিমিটেড অর্ডার প্রসেসিং</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>ইনকমপ্লিট অর্ডার ক্যাচার ও রিকভারি</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>ডেটা গার্ড (ফোন নম্বর মাস্কিং)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>নিট লাভ ও কুরিয়ার সেটেলমেন্ট</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all"
            >
              গ্রোথ শুরু করুন
            </Link>
          </div>

          {/* Pro AI Plan */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">Pro AI স্যুট</h3>
              <p className="text-xs text-slate-400">ফুল-অটোমেশন ও AI স্কেলিং</p>
            </div>
            <div className="text-2xl font-bold text-teal-400 font-mono">
              ৳ ৩,৯৯৯ <span className="text-xs font-normal text-slate-400">/মাস</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>Growth প্ল্যানের সব সুবিধা</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>AI অটো অ্যাড ম্যানেজার (Meta/TikTok)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>বাংলা AI ভয়েস কলিং কনফার্মেশন</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>স্টক-আউট সেফটি ও লুকঅ্যালাইক সিঙ্ক</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-900 text-xs font-bold rounded-xl transition-all"
            >
              Pro AI ট্রায়াল নিন
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Public Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <NishchintoLogo size="sm" showBangla={true} />
          <p>© 2026 Nishchinto.app. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-teal-700 font-medium">
              মার্চেন্ট লগইন
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
