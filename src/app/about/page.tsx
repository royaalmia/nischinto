"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import { ArrowLeft, ShieldCheck, Heart, Sparkles, MapPin, Users, Target, Rocket } from "lucide-react";

export default function AboutPage() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-12">
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
            বাংলাদেশের ই-কমার্স ও এফ-কমার্স উদ্যোক্তারা যেন ভুয়া অর্ডার, কুরিয়ার রিটার্ন ক্ষতি ও জটিল হিসাবের ভয় ছাড়া সম্পূর্ণ নিশ্চিন্তে ব্যবসা পরিচালনা করতে পারেন—সেই লক্ষ্যেই Nishchinto-র জন্ম।
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
                রয়েল মিয়া (Royel Mia)
              </h2>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>নীলফামারী, বাংলাদেশ (Nilphamari, Bangladesh)</span>
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              ফাউন্ডার ও চিফ আর্কিটেক্ট
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              বাংলাদেশের লাখ লাখ তরুণ-তরুণী যখন অনলাইন ব্যবসা ও ফেসবুক কমার্সে নিজের ক্যারিয়ার গড়তে আসেন, তখন সবচেয়ে বড় ধাক্কাটি আসে কুরিয়ার রিটার্ন লস এবং ভুয়া অর্ডারের কারণে। শত শত অর্ডার প্যাক করে পাঠিয়ে দেখা যায় কাস্টমার ফোন ধরছে না, কুরিয়ার পার্সেল ফেরত এনে দ্বিগুণ চার্জ কাটছে, আর লাভ তো দূরের কথা—জমানো মূলধনই শেষ হয়ে যাচ্ছে।
            </p>
            <p>
              রাজধানী ঢাকার বাইরে উত্তরবঙ্গের ঐতিহ্যবাহী জেলা <strong>নীলফামারী</strong> থেকে উদ্যোক্তা <strong>রয়েল মিয়া</strong> বাংলাদেশের তৃণমূল পর্যায়ের এই অনলাইন ব্যবসায়ীদের বাস্তব বেদনা ও সংকট খুব কাছ থেকে অনুভব করেন। তিনি বিশ্বাস করেন, একজন উদ্যোক্তার সবচেয়ে মূল্যবান সময় ব্যয় হওয়া উচিত পণ্যের মান উন্নয়ন ও মার্কেটিংয়ে—সারাদিন ফোন করে ঠিকানা নিশ্চিত করা বা এক্সেল শিটে হিসাব মেলানোর মতো ক্লান্তিজনক কাজে নয়।
            </p>
            <p className="border-l-2 border-teal-500 pl-4 py-1 text-slate-100 font-medium italic">
              &ldquo;আমাদের স্বপ্ন খুব স্পষ্ট—আমরা চাই বাংলাদেশের প্রতিটি প্রান্তের ক্ষুদ্র ও বড় উদ্যোক্তা যেন কোনো ভয় বা সংশয় ছাড়া গর্বের সাথে বলতে পারেন: &lsquo;আমি ব্যবসা চালাই সম্পূর্ণ নিশ্চিন্তে&rsquo;।&rdquo;
            </p>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
            <h3 className="font-bold text-sm text-slate-900">দেশীয় উদ্যোক্তাবান্ধব</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              বিদেশি জটিল ডলার সফটওয়্যার নয়; সম্পূর্ণ বাংলাদেশি পরিবেশ, সহজ পেমেন্ট (bKash/Nagad) ও সার্বক্ষণিক আন্তরিক সাপোর্ট।
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-teal-50 border border-teal-200 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-teal-950">
            আপনিও যুক্ত হোন নিশ্চিন্ত পরিবারে
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            আপনার অনলাইন ব্যবসাকে নতুন উচ্চতায় নিতে আজই ৭ দিনের ফ্রি ট্রায়াল শুরু করুন। কোনো ক্রেডিট কার্ডের প্রয়োজন নেই।
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Free Trial শুরু করুন
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
