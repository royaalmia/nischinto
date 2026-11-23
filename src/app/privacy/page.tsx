"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. Public Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <NishchintoLogo size="md" showBangla={true} />
          </Link>

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
            <Link href="/blog" className="hover:text-teal-700 transition-colors">
              ব্লগ
            </Link>
            <Link href="/#pricing" className="hover:text-teal-700 transition-colors">
              প্যাকেজ
            </Link>
          </nav>

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

      {/* 2. Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>গোপনীয়তা ও নিরাপত্তা</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            প্রাইভেসি পলিসি (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-500 font-medium">সর্বশেষ সংস্করণ: ২৪ নভেম্বর ২০২৬</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">১. আমাদের গোপনীয়তা প্রতিশ্রুতি</h2>
          <p>
            Nishchinto.app-এ আমরা আপনার এবং আপনার সম্মানিত গ্রাহকদের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। আমাদের অ্যান্টি-থেফ্ট ফোন মাস্কিং এবং ইনক্রিপ্টেড ডাটাবেস আর্কিটেকচার নিশ্চিত করে যে আপনার ডেটা সম্পূর্ণ নিরাপদ থাকবে।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">২. আমরা কোন তথ্য সংগ্রহ করি?</h2>
          <p>
            মার্চেন্ট অ্যাকাউন্ট তৈরির জন্য নাম, মোবাইল নম্বর, ইমেইল এবং ব্যবসার নাম সংগ্রহ করা হয়। অর্ডার অটোমেশন পরিচালনার স্বার্থে কাস্টমারের নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা প্রসেস করা হয়—যা শুধুমাত্র সংশ্লিষ্ট কুরিয়ারে বুকিং ও অর্ডার কনফার্মেশনের জন্য ব্যবহৃত হয়।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৩. কাস্টমার ডেটা মাস্কিং ও কর্মচারীদের চুরি রোধ</h2>
          <p>
            আমাদের প্ল্যাটফর্মে রয়েছে বিল্ট-ইন 1-Click Phone Masking সুরক্ষা। এর মাধ্যমে মার্চেন্টের কর্মীরা গ্রাহকের ফোন নম্বর সম্পূর্ণ দেখতে বা কপি করে নিয়ে যেতে পারে না।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৪. তথ্যের তৃতীয় পক্ষের সাথে শেয়ার না করা</h2>
          <p>
            আমরা কখনোই কোনো মার্চেন্টের বিক্রয় তথ্য বা গ্রাহকের ডাটাবেস কোনো তৃতীয় পক্ষের বিজ্ঞাপনদাতা বা মার্কেটিং এজেন্সির কাছে বিক্রি করি না।
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
          প্রাইভেসি সংক্রান্ত যেকোনো বিষয়ে আমাদের সাথে যোগাযোগ করুন:{" "}
          <a href="mailto:connect@nishchinto.app" className="text-teal-700 font-semibold underline">
            connect@nishchinto.app
          </a>
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
