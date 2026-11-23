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
  Phone,
  Mail,
  MapPin,
  Barcode,
  Layers,
  Calculator,
  ChevronRight,
  ClipboardList,
  AlertTriangle,
  Receipt,
  RotateCcw,
  UserCheck,
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

  // Contact Form State
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

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
          text: "কুরিয়ার নেটওয়ার্কে ৭টির মধ্যে ৬টি পার্সেল রিটার্নের রেকর্ড পাওয়া গেছে। ডেলিভারির পূর্বে অগ্রিম কুরিয়ার চার্জ নেয়ার পরামর্শ দেয়া হলো।",
          color: "red",
        });
      } else {
        setDemoResult({
          score: 5,
          level: "SAFE",
          title: "নিরাপদ ক্রেতা (Safe)",
          text: "পূর্বে সম্পন্ন হওয়া ৯৫% পার্সেল সফলভাবে ডেলিভারি সম্পন্ন হয়েছে। কোনো ভুয়া ক্যানসেলেশন রেকর্ড পাওয়া যায়নি।",
          color: "green",
        });
      }
    }, 400);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackName("");
      setCallbackPhone("");
    }, 4000);
  };

  const featureTabs = [
    {
      id: "orders-pipeline",
      title: "অর্ডার ও লিড পাইপলাইন",
      badge: "১৭টি স্ট্যাটাস ট্র্যাকিং",
      icon: ClipboardList,
      headline: "পেন্ডিং থেকে ডেলিভারি—প্রতিটি অর্ডারের পাই টু পাই লাইফসাইকেল",
      description:
        "অর্ডার আসার মুহূর্ত থেকে পেন্ডিং, কনফার্মড, হোল্ড ফলো-আপ, প্রসেসিং, ইন-কুরিয়ার, রিটার্ন এবং হ্যান্ড ডেলিভারি পর্যন্ত প্রতিটি ধাপ স্বয়ংক্রিয়ভাবে ট্র্যাক করুন।",
      points: [
        "১৭টি ডেডিকেটেড স্ট্যাটাস দিয়ে নিখুঁত অর্ডার মনিটরিং (পেন্ডিং, হোল্ড, প্রসেসিং, হ্যান্ড ডেলিভারি)",
        "ইনকমপ্লিট অর্ডার ড্রপ-অফ ক্যাচার: চেকআউট ফর্মে টাইপ করে ছেড়ে যাওয়া ক্রেতাদের নম্বর সংরক্ষণ",
        "প্রি-অর্ডার ও ফেসবুক লিড এক ক্লিকে নিয়মিত অর্ডারে রূপান্তর",
        "এক ক্লিকে শত শত ইনভয়েস ও কুরিয়ার শিপিং লেবেল বাল্ক প্রিন্ট",
      ],
      tag: "অপারেশন স্পিড",
    },
    {
      id: "barcode-scan",
      title: "ওয়্যারহাউস ও বারকোড স্ক্যান",
      badge: "প্যাকিং ও হ্যান্ডওভার স্ক্যান",
      icon: Barcode,
      headline: "ভুল পণ্য ও কুরিয়ার মিসিং পার্সেলের ক্ষতি শূন্যে নামিয়ে আনুন",
      description:
        "প্যাকিং করার সময় এবং কুরিয়ারের রাইডারের কাছে পার্সেল হস্তান্তরের সময় প্রতিটি বারকোড স্ক্যান করুন। কোনো পার্সেল হারিয়ে গেলে বা ভুল ডেলিভারি হলে তাৎক্ষণিক সতর্কবার্তা পাবেন।",
      points: [
        "প্যাকিং স্ক্যান: প্রতিটি অর্ডারের সাথে পণ্য মিলিয়ে স্ক্যান, ভুল প্রোডাক্ট পাঠানো অসম্ভব",
        "কুরিয়ার মার্ক স্ক্যান: ডেলিভারিম্যানকে পার্সেল হস্তান্তরের নিখুঁত ডিজিটাল অডিট",
        "রিটার্ন কালেকশন স্ক্যান: কুরিয়ার হাব থেকে ফেরত আসা পার্সেল স্ক্যান করে স্টক এডজাস্টমেন্ট",
        "ড্যামেজ ও স্ক্র্যাপ পণ্য আলাদা করে সাপ্লায়ার থেকে ক্ষতিপূরণ দাবি",
      ],
      tag: "জিরো ওয়্যারহাউস এরর",
    },
    {
      id: "fraud-guard",
      title: "সেন্ট্রাল ফ্রড গার্ড",
      badge: "কুরিয়ার ক্রস-ম্যাচ",
      icon: ShieldAlert,
      headline: "পার্সেল পাঠানোর আগেই সেন্ট্রাল কুরিয়ার ডেটাবেসে ক্রেতার ইতিহাস যাচাই",
      description:
        "অর্ডার আসার সাথে সাথে দেশের শীর্ষ কুরিয়ার কোম্পানিগুলোর (Steadfast, Pathao, RedX) কেন্দ্রীয় ডেটাবেসে নম্বর ক্রস-ম্যাচ করে ০ থেকে ১০০% রিস্ক স্কোর নির্ধারণ করে।",
      points: [
        "Steadfast, Pathao ও RedX সেন্ট্রাল নেটওয়ার্কে ০-১০০% রিস্ক স্কোরিং",
        "বারবার পার্সেল ফেরত দেয়া এবং ভুয়া কাস্টমারদের মোবাইল নম্বর ও আইপি ব্লকলিস্ট",
        "হাই রিস্ক অর্ডারে স্বয়ংক্রিয়ভাবে অগ্রিম ডেলিভারি চার্জ নেওয়ার অ্যালার্ট",
        "ডেলিভারি সাকসেস রেশিও (DSR) দেখে নিরাপদ পার্সেল দ্রুত অনুমোদন",
      ],
      tag: "রিটার্ন ক্ষতি সাশ্রয়",
    },
    {
      id: "ai-calls",
      title: "বাংলা AI ভয়েস কলিং",
      badge: "হিউম্যান-লাইক AI এজেন্ট",
      icon: PhoneCall,
      headline: "মানুষের মতো সাবলীল বাংলায় স্বয়ংক্রিয়ভাবে অর্ডার কনফার্মেশন",
      description:
        "কোনো রোবটিক আইভিআর নয়; আমাদের AI কাস্টমারকে কল করে মানুষের মতো মিষ্টি ও স্পষ্ট বাংলায় কথা বলে অর্ডার, পণ্যের সাইজ এবং ঠিকানা নিশ্চিত করে।",
      points: [
        "সাবলীল বাংলা ও বাংলিশে অর্ডার নিশ্চিতকরণ, সাইজ ও ডেলিভারি ঠিকানা ভেরিফিকেশন",
        "গ্রাহক ফোনে সম্মতি দিলে ড্যাশবোর্ডে অর্ডার স্বয়ংক্রিয়ভাবে 'CONFIRMED' স্ট্যাটাস প্রাপ্তি",
        "কোনো কারণে কাস্টমার কল রিসিভ না করলে নির্ধারিত সময়ে ৩ বার অটো রি-ডায়াল",
        "কল সেন্টারের বাড়তি কর্মী ও হাজার হাজার টাকার মাসিক বেতন সাশ্রয়",
      ],
      tag: "কল সেন্টার অটোমেশন",
    },
    {
      id: "ai-ads",
      title: "AI অটো অ্যাড ম্যানেজার",
      badge: "মেটা ও টিকটক অটো-পাইলট",
      icon: Sparkles,
      headline: "স্টক শেষ হলে স্বয়ংক্রিয় বিজ্ঞাপন পজ—বাজেটের প্রতিটি টাকার নিরাপত্তা",
      description:
        "মার্চেন্টের প্রোডাক্ট সিলেক্ট করার পর সিস্টেম প্রফেশনাল বাংলা সেলস কপি তৈরি করে লাইভ করে। পণ্যের স্টক শেষ হওয়া মাত্রই ফেসবুক বিজ্ঞাপন পজ করে টাকা বাঁচায়।",
      points: [
        "এক ক্লিকে আকর্ষণীয় বাংলা বিজ্ঞাপন টেক্সট, হেডলাইন ও অফার জেনারেট",
        "স্টক শেষ হওয়ার সাথে সাথে ফেসবুক বিজ্ঞাপন স্বয়ংক্রিয়ভাবে পজ (জিরো বাজেট লস)",
        "সফল ডেলিভারি পাওয়া ১০০% আসল ক্রেতাদের ডেটা দিয়ে ১% লুকঅ্যালাইক অডিয়েন্স",
        "কাঙ্ক্ষিত সেল না আসলে আর্থিক ক্ষতি এড়াতে অটো-কিল অ্যালগরিদম",
      ],
      tag: "বিজ্ঞাপন বাজেট সুরক্ষা",
    },
    {
      id: "inventory",
      title: "ইনভেন্টরি, লেজার ও প্রডাকশন",
      badge: "স্টক লেজার ও সাপ্লায়ার খাতা",
      icon: Boxes,
      headline: "প্রতিটি পণ্যের ইন-আউট হিসাব, সাপ্লায়ার বাকি খাতা ও প্রডাকশন ট্র্যাকিং",
      description:
        "পণ্য কেনা থেকে শুরু করে ওয়্যারহাউসে ইন, অর্ডার ডেলিভারিতে আউট, ড্যামেজ এডজাস্টমেন্ট এবং সাপ্লায়ারদের পাওনা-দেনার নিখুঁত খতিয়ান।",
      points: [
        "স্টক লেজার: প্রতিটি আইটেমের রিয়েল-টাইম ব্যালেন্স, ইনপুট, সেলস এবং ড্যামেজ অডিট",
        "সাপ্লায়ার খাতা: সাপ্লায়ারদের বিল, বাকি পেমেন্ট ও পারচেজ রিটার্ন পরিচালনা",
        "ম্যানুফ্যাকচারিং ও বিল অব ম্যাটেরিয়ালস (BOM): কাঁচামাল থেকে তৈরি পণ্যের হিসাব",
        "লো-স্টক অ্যালার্ট: পণ্য শেষের পথে থাকলে আগাম সতর্কতা নোটিফিকেশন",
      ],
      tag: "ইনভেন্টরি অডিট",
    },
    {
      id: "settlements",
      title: "কুরিয়ার সেটেলমেন্ট ও ট্রু প্রফিট",
      badge: "পাই টু পাই লাভ-ক্ষতি",
      icon: TrendingUp,
      headline: "কুরিয়ার থেকে আসা টাকা ভ্যালিডেশন এবং ব্যবসার প্রকৃত নিট লাভ হিসাব",
      description:
        "কুরিয়ার কোম্পানি সিওডি বিল পরিশোধ করলে সিস্টেমে প্রতিটি অর্ডারের টাকা ম্যাচ করান। প্রোডাক্ট কেনা খরচ, কুরিয়ার ফি এবং ফেসবুক অ্যাড খরচ বাদ দিয়ে আসল লাভ জানুন।",
      points: [
        "কুরিয়ার COD পেমেন্ট ভ্যালিডেশন: কোন অর্ডারের টাকা পেয়েছেন আর কোনটি বাকি তা স্বয়ংক্রিয় ট্র্যাকিং",
        "প্রকৃত নিট লাভ: বিক্রয়মূল্য - (COGS + কুরিয়ার চার্জ + মেটা অ্যাড স্পেন্ড + প্যাকিং খরচ)",
        "অতিরিক্ত খরচ ও আয়ের হিসাব (Other Expenses & Incomes)",
        "এক ক্লিকে মাসিক ব্যালেন্স শিট ও আর্থিক রিপোর্ট ডাউনলোড",
      ],
      tag: "সঠিক আর্থিক খতিয়ান",
    },
    {
      id: "data-guard",
      title: "ডেটা গার্ড ও টিম পারমিশন",
      badge: "কাস্টমার নম্বর চুরি রোধ",
      icon: Lock,
      headline: "কর্মচারীদের কাস্টমার ডেটাবেস কপি বা চুরি করা সম্পূর্ণ অসম্ভব",
      description:
        "অনলাইন বিজনেসে কর্মীদের মাধ্যমে গ্রাহকের ফোন নম্বর চুরি রোধে রয়েছে ওয়ান-ক্লিক ফোন মাস্কিং এবং প্রতিটি কর্মীর জন্য আলাদা রোল-বেসড রেস্ট্রিকশন।",
      points: [
        "1-Click Phone Masking: কর্মীরা কাস্টমারের পুরো নম্বর দেখতে বা কপি করতে পারে না",
        "রোল বেসড অ্যাক্সেস (RBAC): অর্ডার কনফার্মার, প্যাকার ও একাউন্ট্যান্টের জন্য পৃথক অনুমতি",
        "IP ও মোবাইল ব্লকলিস্ট: দুষ্টচক্রের ভুয়া অর্ডার প্রবেশ বন্ধ করা",
        "কর্মীদের প্রতিটি অ্যাকশনের অডিট লগ রেকর্ড সংরক্ষণ",
      ],
      tag: "বিজনেস সিকিউরিটি",
    },
  ];

  const workflowSteps = [
    {
      step: "০১",
      title: "অর্ডার বা লিড গ্রহণ",
      desc: "ওয়েবসাইট, ফেসবুক ফর্ম, শপিফাই বা চেকআউট ড্রপ-অফ থেকে সমস্ত অর্ডার এক ড্যাশবোর্ডে সংগৃহীত হয়।",
    },
    {
      step: "০২",
      title: "সেন্ট্রাল ফ্রড স্কোরিং",
      desc: "Steadfast, Pathao ও RedX সেন্ট্রাল নেটওয়ার্কে নম্বর স্বয়ংক্রিয়ভাবে যাচাই হয়ে রিস্ক স্কোর তৈরি হয়।",
    },
    {
      step: "০৩",
      title: "বাংলা AI ভয়েস কনফার্মেশন",
      desc: "মানুষের মতো সাবলীল বাংলায় গ্রাহককে স্বয়ংক্রিয় কল করে অর্ডার, সাইজ ও ডেলিভারি ঠিকানা নিশ্চিত করা হয়।",
    },
    {
      step: "০৪",
      title: "বারকোড প্যাকিং ও মার্ক স্ক্যান",
      desc: "প্যাকিংয়ের সময় সঠিক পণ্য স্ক্যান ও কুরিয়ার হ্যান্ডওভারের সময় মার্ক স্ক্যান সম্পন্ন হয়।",
    },
    {
      step: "০৫",
      title: "কুরিয়ার এপিআই বুকিং ও ট্র্যাকিং",
      desc: "১-ক্লিকে কুরিয়ারে কনসাইনমেন্ট তৈরি, ট্র্যাকিং আইডি জেনারেট এবং গ্রাহককে এসএমএস আপডেট প্রেরণ।",
    },
    {
      step: "০৬",
      title: "COD সেটেলমেন্ট ও ট্রু প্রফিট",
      desc: "কুরিয়ার থেকে টাকা রিসিভ হলে কুরিয়ার ফি, COGS ও অ্যাড খরচ বাদ দিয়ে আসল নিট লাভ বের করা হয়।",
    },
    {
      step: "০৭",
      title: "স্টক অনুযায়ী অ্যাড বাজেট কন্ট্রোল",
      desc: "ইনভেন্টরিতে স্টক শেষ হলে ফেসবুক অ্যাড অটো-পজ হয় এবং আসল ক্রেতাদের ডেটা দিয়ে লুকঅ্যালাইক তৈরি হয়।",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. Top Corporate Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              হটলাইন:{" "}
              <a href="tel:01960821012" className="text-white hover:text-teal-300 font-mono font-bold">
                01960821012
              </a>
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              ইমেইল:{" "}
              <a href="mailto:connect@nishchinto.app" className="hover:text-teal-300">
                connect@nishchinto.app
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3 text-teal-400" />
              হেড অফিস: নীলফামারী, বাংলাদেশ
            </span>
            <span className="text-slate-600">|</span>
            <a
              href="https://www.facebook.com/nishchintobd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1"
            >
              <span>ফেসবুক পেজ</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Public Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="md" showBangla={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-700">
            <a href="#features" className="hover:text-teal-600 transition-colors">
              ফিচারসমূহ
            </a>
            <a href="#workflow" className="hover:text-teal-600 transition-colors">
              কার্যপ্রণালী
            </a>
            <a href="#why-us" className="hover:text-teal-600 transition-colors">
              কেন Nishchinto?
            </a>
            <a href="#calculator" className="hover:text-teal-600 transition-colors">
              হিসাব ক্যালকুলেটর
            </a>
            <a href="#pricing" className="hover:text-teal-600 transition-colors">
              প্যাকেজ
            </a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">
              যোগাযোগ
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-2 transition-colors"
            >
              মার্চেন্ট লগইন
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              ফ্রি অ্যাকাউন্ট খুলুন
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-teal-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 text-xs font-semibold text-slate-800 shadow-lg animate-in slide-in-from-top-2">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            ফিচারসমূহ
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            কার্যপ্রণালী
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            কেন Nishchinto?
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            হিসাব ক্যালকুলেটর
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            প্যাকেজ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-slate-100"
          >
            যোগাযোগ
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 border border-slate-200 rounded-xl text-slate-800 font-semibold"
            >
              মার্চেন্ট লগইন
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-teal-600 text-white rounded-xl font-semibold shadow-sm"
            >
              ফ্রি অ্যাকাউন্ট খুলুন
            </Link>
          </div>
        </div>
      )}

      {/* 3. Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-semibold text-slate-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ব্যবসা চালান নিশ্চিন্তে</span>
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2] max-w-4xl mx-auto">
            বাংলাদেশের ই-কমার্স ও এফ-কমার্স অটোমেশনের{" "}
            <span className="text-teal-700">সর্বাধুনিক অপারেটিং প্ল্যাটফর্ম</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            চিরাচরিত জটিল সফটওয়্যার বা ম্যানুয়াল খাতার ঝামেলা বাদ দিন। অর্ডার ট্র্যাকিং, বারকোড ওয়্যারহাউস স্ক্যান, সেন্ট্রাল কুরিয়ার ফ্রড গার্ড, সাবলীল বাংলা AI ভয়েস কনফার্মেশন ও স্বয়ংক্রিয় বিজ্ঞাপন ম্যানেজমেন্ট—সবকিছু পরিচালিত হবে নিশ্চিন্তে।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>ফ্রি অ্যাকাউন্ট খুলুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              ফিচারসমূহ ঘুরে দেখুন
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ৭ দিনের ফ্রি ট্রায়াল
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              কোনো সেটআপ ফি নেই
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              সরাসরি সাপোর্ট
            </span>
          </div>

          {/* Interactive Live Central Fraud Checker Terminal */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs text-slate-200 font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-teal-400" />
                  সেন্ট্রাল কুরিয়ার ফ্রড গার্ড লাইভ টেস্ট
                </span>
                <span className="text-[10px] text-teal-400 bg-teal-950 border border-teal-800 px-2 py-0.5 rounded font-mono">
                  LIVE COURIER NETWORK
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                যেকোনো কাস্টমারের ফোন নম্বর দিয়ে কুরিয়ার নেটওয়ার্কে (Steadfast, Pathao, RedX) তার অতীত ডেলিভারি ও রিটার্ন রেকর্ড যাচাই করুন:
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
                  className={`p-3.5 rounded-xl border text-xs animate-in fade-in ${
                    demoResult.color === "red"
                      ? "bg-red-950/60 border-red-800 text-red-200"
                      : "bg-emerald-950/60 border-emerald-800 text-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{demoResult.title}</span>
                    <span className="font-mono text-xs font-bold">রিস্ক স্কোর: {demoResult.score}%</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">{demoResult.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Categorized Feature Hub (Inspired by BizMation insights) */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            পূর্ণাঙ্গ ফিচার স্যুট
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            অনলাইন ব্যবসার প্রতিটি ধাপ পরিচালনার নিখুঁত সমাধান
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            অর্ডার নেওয়া থেকে শুরু করে ওয়্যারহাউস প্যাকিং, কুরিয়ার হ্যান্ডওভার এবং নিট প্রফিট খতিয়ান
          </p>
        </div>

        {/* Tab Buttons (Horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start sm:justify-center">
          {featureTabs.map((tab, idx) => {
            const isSelected = activeFeatureTab === idx;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(idx)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-teal-600"}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Detail Card */}
        {(() => {
          const tab = featureTabs[activeFeatureTab];
          const Icon = tab.icon;
          return (
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 bg-teal-100 px-3 py-1 rounded-md">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.badge}</span>
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {tab.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tab.description}
                </p>

                <div className="space-y-2.5 pt-1">
                  {tab.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                      <div className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Graphic/Mockup Box */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-slate-900">{tab.title}</span>
                  </div>
                  <span className="text-[10px] text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded font-bold">
                    {tab.tag}
                  </span>
                </div>

                <div className="space-y-3 py-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">অটোমেশন স্ট্যাটাস:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      সক্রিয় ও রিয়েল-টাইম
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">কুরিয়ার এপিআই ইন্টিগ্রেশন:</span>
                    <span className="font-semibold text-slate-800">Steadfast, Pathao, RedX</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">ডেটা প্রটেকশন:</span>
                    <span className="font-semibold text-slate-800">এনক্রিপ্টেড ও মাস্কড</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">Nishchinto কোর ইঞ্জিন</span>
                  <Link
                    href="/register"
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>ফ্রি ট্রায়ালে পরখ করুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. 7-Step A-to-Z Workflow Section */}
      <section id="workflow" className="py-16 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              A-to-Z কার্যপ্রণালী
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              পর্দার আড়ালে (Backend-এ) কীভাবে কাজ করে?
            </h2>
            <p className="text-xs text-slate-500">
              API ও Webhook প্রযুক্তির মাধ্যমে ওয়েবসাইট, ফেসবুক ও কুরিয়ার কোম্পানির নিরবচ্ছিন্ন অটোমেশন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded inline-block font-mono">
                    ধাপ {ws.step}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{ws.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Nishchinto (Comparison Matrix) */}
      <section id="why-us" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
            কেন Nishchinto?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            কেন আধুনিক ব্যবসায়ীদের পছন্দ Nishchinto?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            কীভাবে আপনার ব্যবসাকে ঘণ্টার পর ঘণ্টা সময় অপচয় এবং লাখ টাকার রিটার্ন ক্ষতি থেকে মুক্ত রাখবেন
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
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
                <td className="p-3.5 text-slate-500">কর্মী রেখে ঘণ্টার পর ঘণ্টা ম্যানুয়াল ফোন কল</td>
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
                  প্যাকিং ও হ্যান্ডওভার বারকোড স্ক্যান
                </td>
                <td className="p-3.5 bg-teal-50/30 font-semibold text-teal-900">
                  প্যাকিং স্ক্যান ও কুরিয়ার মার্ক স্ক্যানিং
                </td>
                <td className="p-3.5 text-slate-500">ম্যানুয়াল চেক, ভুল পণ্য চলে যাওয়া ও পার্সেল মিসিং</td>
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
                  <span className="font-bold text-teal-700 font-mono">
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
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                এই অর্থ সাশ্রয় করে অতিরিক্ত বিজ্ঞাপন চালিয়ে আপনার ব্যবসার পরিধি বহুগুণ বৃদ্ধি করুন।
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
          <p className="text-xs text-slate-500">৭ দিনের ফ্রি ট্রায়াল—কোনো লুকানো চার্জ নেই</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Starter প্ল্যান</h3>
                <p className="text-xs text-slate-500">নতুন অনলাইন উদ্যোগের জন্য</p>
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
                  <span>Steadfast ও Pathao এপিআই কানেকশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>সেন্ট্রাল ফ্রড চেকার স্কোরিং</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>বাল্ক ইনভয়েস ও শিপিং লেবেল প্রিন্ট</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all"
            >
              ৭ দিনের ফ্রি ট্রায়াল শুরু করুন
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="bg-white rounded-2xl p-6 border-2 border-teal-600 shadow-sm space-y-4 relative flex flex-col justify-between">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              সর্বাধিক জনপ্রিয়
            </span>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Growth প্ল্যান</h3>
                <p className="text-xs text-slate-500">দ্রুত বর্ধনশীল অনলাইন ব্যবসার জন্য</p>
              </div>
              <div className="text-2xl font-bold text-teal-700 font-mono">
                ৳ ১,৯৯৯ <span className="text-xs font-normal text-slate-500">/মাস</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>আনলিমিটেড অর্ডার ও কুরিয়ার ট্র্যাকিং</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>ওয়্যারহাউস প্যাকিং ও কুরিয়ার মার্ক স্ক্যান</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>ইনকমপ্লিট অর্ডার ড্রপ-অফ ক্যাচার</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>ডেটা গার্ড: ফোন নম্বর মাস্কিং সুবিধা</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>প্রকৃত নিট লাভ ও কুরিয়ার সিওডি সেটেলমেন্ট</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              গ্রোথ ট্রায়াল নিন
            </Link>
          </div>

          {/* Pro AI Plan */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-white">Pro AI স্যুট</h3>
                <p className="text-xs text-slate-400">ফুল-অটোমেশন ও স্কেলিং</p>
              </div>
              <div className="text-2xl font-bold text-teal-400 font-mono">
                ৳ ৩,৯৯৯ <span className="text-xs font-normal text-slate-400">/মাস</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>Growth প্ল্যানের সমস্ত সুবিধা</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>AI অটো অ্যাড ম্যানেজার (Meta/TikTok)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>সাবলীল বাংলা AI ভয়েস কলিং কনফার্মেশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>স্টক ০ হলে অ্যাড স্বয়ংক্রিয় পজ নিরাপত্তা</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>১% লুকঅ্যালাইক অডিয়েন্স সার্ভার সিঙ্ক</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="block w-full text-center py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-900 text-xs font-bold rounded-xl transition-all"
            >
              Pro AI প্ল্যান চালু করুন
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Contact & Company Support Section (New Trust Section) */}
      <section id="contact" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Contact Info */}
            <div className="space-y-5">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                যোগাযোগ ও কর্পোরেট অফিস
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                আপনার ব্যবসার প্রবৃদ্ধি নিয়ে সরাসরি কথা বলুন
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                আমাদের অভিজ্ঞ টিম আপনার ই-কমার্স বা এফ-কমার্স বিজনেসের অটোমেশন সেটআপে সবসময় পাশে আছে। যেকোনো প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করুন।
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">অফিসিয়াল হটলাইন</span>
                    <a href="tel:01960821012" className="font-bold text-slate-900 font-mono hover:text-teal-700 text-sm">
                      01960821012
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ইমেইল সাপোর্ট</span>
                    <a href="mailto:connect@nishchinto.app" className="font-semibold text-slate-900 hover:text-teal-700">
                      connect@nishchinto.app
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">অফিস ঠিকানা</span>
                    <span className="font-semibold text-slate-900">
                      নীলফামারী, বাংলাদেশ
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ফেসবুক পেজ</span>
                    <a
                      href="https://www.facebook.com/nishchintobd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      facebook.com/nishchintobd
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Callback Form */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                দ্রুত কলব্যাক বা ডেমোর জন্য অনুরোধ করুন
              </h4>
              <p className="text-[11px] text-slate-500">
                আপনার নাম ও মোবাইল নম্বর দিন, আমাদের টিম আপনাকে সরাসরি কল করে সম্পূর্ণ সিস্টেমটি বুঝিয়ে দেবে।
              </p>

              {callbackSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold text-center">
                  ধন্যবাদ! আমরা খুব দ্রুত আপনার দেয়া নম্বরে যোগাযোগ করছি।
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      আপনার নাম / ব্যবসার নাম
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="উদাঃ রফিক আহমেদ"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm"
                  >
                    কলব্যাক রিকোয়েস্ট পাঠান
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Public Footer */}
      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-600">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <NishchintoLogo size="sm" showBangla={true} />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                বাংলাদেশের ই-কমার্স ও এফ-কমার্স ব্যবসার স্বয়ংক্রিয় অপারেটিং প্ল্যাটফর্ম।
              </p>
              <div className="text-[11px] text-slate-500">
                <span>হটলাইন: </span>
                <a href="tel:01960821012" className="font-mono font-bold text-slate-800">
                  01960821012
                </a>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 text-xs">সমাধানসমূহ</h5>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li><a href="#features" className="hover:text-teal-700">অর্ডার ও লিড ম্যানেজমেন্ট</a></li>
                <li><a href="#features" className="hover:text-teal-700">ওয়্যারহাউস বারকোড স্ক্যান</a></li>
                <li><a href="#features" className="hover:text-teal-700">সেন্ট্রাল কুরিয়ার ফ্রড গার্ড</a></li>
                <li><a href="#features" className="hover:text-teal-700">বাংলা AI ভয়েস কনফার্মেশন</a></li>
                <li><a href="#features" className="hover:text-teal-700">AI অটো অ্যাড ম্যানেজার</a></li>
              </ul>
            </div>

            {/* Col 3: Operations & Inventory */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 text-xs">অপারেশন ও নিরাপত্তা</h5>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li><a href="#features" className="hover:text-teal-700">স্টক লেজার ও সাপ্লায়ার খাতা</a></li>
                <li><a href="#features" className="hover:text-teal-700">কুরিয়ার সিওডি সেটেলমেন্ট</a></li>
                <li><a href="#features" className="hover:text-teal-700">ডেটা গার্ড: ফোন মাস্কিং</a></li>
                <li><a href="#features" className="hover:text-teal-700">আইপি ও মোবাইল ব্লকলিস্ট</a></li>
                <li><a href="#why-us" className="hover:text-teal-700">প্রকৃত নিট লাভ হিসাব</a></li>
              </ul>
            </div>

            {/* Col 4: Corporate & Connect */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 text-xs">অফিস ও যোগাযোগ</h5>
              <p className="text-[11px] text-slate-500">
                অফিস: নীলফামারী, বাংলাদেশ
              </p>
              <p className="text-[11px] text-slate-500">
                ইমেইল: <a href="mailto:connect@nishchinto.app" className="text-teal-700">connect@nishchinto.app</a>
              </p>
              <p className="text-[11px]">
                <a
                  href="https://www.facebook.com/nishchintobd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>facebook.com/nishchintobd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-block px-3.5 py-1.5 bg-teal-600 text-white rounded-lg text-[11px] font-semibold"
                >
                  ফ্রি ট্রায়াল শুরু করুন
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-400">
            <p>© 2026 Nishchinto.app. সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex items-center gap-4">
              <Link href="/login" className="hover:text-teal-700 font-medium">
                মার্চেন্ট লগইন
              </Link>
              <Link href="/register" className="hover:text-teal-700 font-medium">
                অ্যাকাউন্ট রেজিস্ট্রেশন
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
