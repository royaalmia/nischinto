"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import {
  BookOpen,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

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
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. Public Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="md" showBangla={true} />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-700">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              হোমপেজ
            </Link>
            <Link href="/#features" className="hover:text-teal-700 transition-colors">
              ফিচারসমূহ
            </Link>
            <Link href="/about" className="hover:text-teal-700 transition-colors">
              আমাদের গল্প
            </Link>
            <Link href="/blog" className="text-teal-700 font-bold">
              ব্লগ
            </Link>
            <Link href="/#pricing" className="hover:text-teal-700 transition-colors">
              প্যাকেজ
            </Link>
          </nav>

          {/* CTA: Login & Free Trial */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-2 transition-colors"
            >
              লগইন
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
            >
              Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Blog Hub */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
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

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {art.date}
                  </span>
                  <Link
                    href={`/blog#${art.id}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>পড়ুন ও শুরু করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Knowledge Newsletter Strip */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
            সাপ্তাহিক ই-কমার্স আপডেট
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            নতুন স্ট্র্যাটেজি ও কুরিয়ার আপডেটের নোটিফিকেশন পান
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            বাংলাদেশের শীর্ষ অনলাইন উদ্যোক্তারা কীভাবে ব্যবসা স্কেল করছেন, সেই বাস্তব টিপস সরাসরি আপনার ইনবক্সে।
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500 font-medium"
            />
            <button className="w-full sm:w-auto px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all shrink-0">
              সাবস্ক্রাইব করুন
            </button>
          </div>
        </div>
      </main>

      {/* 3. Public Footer */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <NishchintoLogo size="sm" showBangla={true} />
              <p className="text-xs text-slate-500 leading-relaxed">
                বাংলাদেশের অগ্রগামী ই-কমার্স ও এফ-কমার্স অটোমেশন অপারেটিং সিস্টেম। অর্ডার প্রসেসিং থেকে শুরু করে সেন্ট্রাল ফ্রড গার্ড ও বাংলা এআই স্বয়ংক্রিয় সমাধান।
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-slate-900 text-sm">কোম্পানি</h5>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-teal-700 transition-colors">
                    আমাদের গল্প
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-teal-700 transition-colors">
                    ফিচারস
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-teal-700 transition-colors">
                    প্রাইসিং
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-teal-700 transition-colors">
                    ব্লগ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-slate-900 text-sm">সাপোর্ট</h5>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <a href="tel:01960821012" className="hover:text-teal-700 font-mono">
                    +880 1960-821012
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <a href="mailto:connect@nishchinto.app" className="hover:text-teal-700">
                    connect@nishchinto.app
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>Nilphamari, Bangladesh</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-slate-900 text-sm">লিগ্যাল</h5>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/privacy" className="hover:text-teal-700 transition-colors">
                    প্রাইভেসি পলিসি
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-teal-700 transition-colors">
                    টার্মস অব সার্ভিস
                  </Link>
                </li>
                <li>
                  <a href="mailto:connect@nishchinto.app" className="hover:text-teal-700 transition-colors">
                    যোগাযোগ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Nishchinto.app । সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/nishchintobd"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="X / Twitter"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="YouTube"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801960821012"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center text-slate-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
