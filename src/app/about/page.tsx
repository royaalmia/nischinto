"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  MapPin,
  Users,
  Target,
  Rocket,
  CheckCircle2,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function AboutPage() {
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
            <Link href="/about" className="text-teal-700 font-bold">
              আমাদের গল্প
            </Link>
            <Link href="/blog" className="hover:text-teal-700 transition-colors">
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

      {/* 2. Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-14">
        {/* Hero Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>আমাদের গল্প ও লক্ষ্য</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            উদ্যোক্তাদের মানসিক শান্তি নিশ্চিত করাই <br />
            <span className="text-teal-700">আমাদের মূল অঙ্গীকার</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            বাংলাদেশের ই-কমার্স ও এফ-কমার্স উদ্যোক্তারা যেন ভুয়া অর্ডার, কুরিয়ার রিটার্ন ক্ষতি ও জটিল হিসাবের ভয় ছাড়া সম্পূর্ণ নিশ্চিন্তে ব্যবসা পরিচালনা করতে পারেন—সেই লক্ষ্যেই Nishchinto-র সৃষ্টি।
          </p>
        </div>

        {/* Founder Story Card */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                উদ্যোক্তা ও স্বপ্নদ্রষ্টা
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                রয়েল মিয়া (Royal Mia)
              </h2>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Nilphamari, Bangladesh</span>
              </p>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              ফাউন্ডার ও চিফ আর্কিটেক্ট
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              বাংলাদেশের লাখ লাখ তরুণ-তরুণী যখন অনলাইন ব্যবসা ও ফেসবুক কমার্সে নিজের ক্যারিয়ার গড়তে আসেন, তখন সবচেয়ে বড় বাধা হয়ে দাঁড়ায় কুরিয়ার রিটার্ন ক্ষতি এবং ভুয়া অর্ডার। শত শত অর্ডার প্যাক করে পাঠিয়ে দেখা যায় কাস্টমার ফোন ধরছে না, কুরিয়ার কোম্পানি পার্সেল ফেরত এনে দ্বিগুণ চার্জ কাটছে, আর লাভ তো দূরের কথা—জমানো মূলধনই ক্ষয়ে যাচ্ছে।
            </p>
            <p>
              উত্তরবঙ্গের শান্ত ও সমৃদ্ধ জেলা <strong>Nilphamari</strong> থেকে উদ্যোক্তা <strong>রয়েল মিয়া (Royal Mia)</strong> বাংলাদেশের তৃণমূল পর্যায়ের এই অনলাইন ব্যবসায়ীদের বাস্তব বেদনা ও সংকট খুব কাছ থেকে প্রত্যক্ষ করেন। তিনি বিশ্বাস করেন, একজন উদ্যোক্তার সবচেয়ে মূল্যবান সময় ব্যয় হওয়া উচিত পণ্যের মান উন্নয়ন ও মার্কেটিংয়ে—সারাদিন ফোন করে ঠিকানা নিশ্চিত করা বা এক্সেল শিটে হিসাব মেলানোর মতো ক্লান্তিজনক কাজে নয়।
            </p>
            <p className="border-l-2 border-teal-500 pl-4 py-1 text-slate-100 font-medium italic">
              &ldquo;আমাদের স্বপ্ন খুব স্পষ্ট—আমরা চাই বাংলাদেশের প্রতিটি প্রান্তের ক্ষুদ্র ও বড় উদ্যোক্তা যেন কোনো ভয় বা সংশয় ছাড়া গর্বের সাথে বলতে পারেন: &lsquo;আমি ব্যবসা চালাই সম্পূর্ণ নিশ্চিন্তে&rsquo;।&rdquo;
            </p>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">নিরাপত্তা ও ফ্রড রোধ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              সেন্ট্রাল কুরিয়ার নেটওয়ার্কে ক্রস-ম্যাচ করে পার্সেল পাঠানোর আগেই ফেক গ্রাহক শনাক্ত করা এবং রিটার্ন ক্ষতি শূন্যের কোঠায় নামানো।
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">বাংলা এআই স্বয়ংক্রিয়তা</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              রোবটিক জটিলতা ছাড়া মানুষের মতো সাবলীল মিষ্টি বাংলায় অর্ডার কনফার্মেশন ও স্বয়ংক্রিয় স্টক-অ্যাড সিঙ্ক প্রযুক্তি।
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">উদ্যোক্তা-বান্ধব সমর্থন</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              যেকোনো সমস্যায় পাশে থাকা ডেডিকেটেড সাপোর্ট টিম এবং বাংলাদেশের উদ্যোক্তাদের বাস্তব চাহিদার প্রতি অঙ্গীকার।
            </p>
          </div>
        </div>

        {/* Mission Banner */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-xl font-bold text-teal-950">
            আমাদের সাথে যাত্রা শুরু করতে প্রস্তুত?
          </h3>
          <p className="text-xs sm:text-sm text-teal-800 max-w-xl mx-auto">
            কোনো ক্রেডিট কার্ড ছাড়াই ৭ দিনের ফ্রি ট্রায়ালে Nishchinto-র সমস্ত ফিচার ব্যবহার করে দেখুন।
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-block"
            >
              ফ্রি ট্রায়াল শুরু করুন
            </Link>
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
            <p>© 2026 Nishchinto Technologies । সর্বস্বত্ব সংরক্ষিত।</p>
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
