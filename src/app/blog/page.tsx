"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { ArrowLeft, BookOpen, Clock, ArrowRight, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: "reduce-courier-return-loss",
      title: "কুরিয়ার রিটার্ন রেট ২৫% থেকে ৫%-এ নামিয়ে আনার পরীক্ষিত কৌশল",
      excerpt:
        "অনলাইন বিজনেসে লাভের টাকা কুরিয়ার রিটার্ন চার্জে গলে যায়। কীভাবে সেন্ট্রাল ফ্রড স্কোরিং ও অগ্রিম চার্জ নিয়ে ডেলিভারি সাকসেস ৯০%+ করবেন?",
      category: "লজিস্টিকস ও ফ্রড",
      readTime: "৫ মিনিট পাঠ",
      date: "২৪ নভেম্বর ২০২৬",
      icon: ShieldAlert,
      color: "teal",
    },
    {
      id: "incomplete-order-dropoff-recovery",
      title: "ইনকমপ্লিট অর্ডার ড্রপ-অফ ক্যাচার: কীভাবে না হওয়া বিক্রি উদ্ধার করবেন?",
      excerpt:
        "বিজ্ঞাপনের ভিজিটররা চেকআউট ফর্মে নাম ও ফোন নম্বর লিখেও ফর্ম সাবমিট না করে কেটে দেন। এই ড্রপ-অফ ডেটা দিয়ে কীভাবে ৩০% অতিরিক্ত বিক্রি নিশ্চিত করবেন?",
      category: "কনভার্সন অপটিমাইজেশন",
      readTime: "৪ মিনিট পাঠ",
      date: "২২ নভেম্বর ২০২৬",
      icon: TrendingUp,
      color: "indigo",
    },
    {
      id: "bangla-ai-voice-confirmation-guide",
      title: "বাংলা AI ভয়েস কল: কল সেন্টারের খরচ বাঁচিয়ে ১০০% অর্ডার কনফার্মেশন",
      excerpt:
        "কর্মী রেখে সারাদিন ম্যানুয়াল ফোন কল করার দিন শেষ। কীভাবে সাবলীল বাংলা এআই মিষ্টি গলায় কথা বলে সেকেন্ডের মধ্যে গ্রাহকের সাইজ ও ঠিকানা নিশ্চিত করে?",
      category: "এআই অটোমেশন",
      readTime: "৬ মিনিট পাঠ",
      date: "১৮ নভেম্বর ২০২৬",
      icon: Sparkles,
      color: "emerald",
    },
  ];

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>ই-কমার্স নলেজ হাব</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            অনলাইন ব্যবসা বৃদ্ধির <br />
            <span className="text-teal-700">বাস্তব কৌশল ও গাইড</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            রিটার্ন লস কমানো, স্বয়ংক্রিয় বিজ্ঞাপন ম্যানেজমেন্ট ও ডেলিভারি সাকসেস রেট বৃদ্ধির কার্যকর দিকনির্দেশনা
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => {
            const Icon = art.icon;
            return (
              <div
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded font-bold bg-teal-50 text-teal-800">
                      {art.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug hover:text-teal-700 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">{art.date}</span>
                  <Link
                    href="/register"
                    className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>পড়ুন ও শুরু করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
