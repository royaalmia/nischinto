"use client";

import Link from "next/link";
import NishchintoLogo from "@/components/NishchintoLogo";
import {
  FileText,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>আইনি তথ্যাবলী</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ব্যবহারের শর্তাবলী (Terms & Conditions)
          </h1>
          <p className="text-xs text-slate-500 font-medium">সর্বশেষ সংস্করণ: ২৪ নভেম্বর ২০২৬</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">১. প্ল্যাটফর্ম ব্যবহারের মূল নীতি</h2>
          <p>
            Nishchinto.app (নিশ্চিন্ত) একটি স্বয়ংক্রিয় ক্লাউড-ভিত্তিক বিজনেস অপারেটিং সিস্টেম। আমাদের প্ল্যাটফর্মে সাইন-আপ বা সার্ভিস ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীর প্রতি পূর্ণ সম্মতি জ্ঞাপন করছেন। যদি আপনি এই শর্তাবলীতে একমত না হন, তবে অনুগ্রহ করে সেবা গ্রহণ থেকে বিরত থাকুন।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">২. মার্চেন্ট অ্যাকাউন্টের দায়িত্বশীলতা</h2>
          <p>
            প্রতিটি মার্চেন্ট তাদের লগইন ক্রেডেনশিয়াল এবং এপিআই কির (API Key) নিরাপত্তার জন্য সম্পূর্ণভাবে দায়ী থাকবেন। অ্যাকাউন্টের মাধ্যমে সংঘটিত যেকোনো অবৈধ বা অননুমোদিত কার্যকলাপের জন্য সংশ্লিষ্ট ব্যবহারকারীই দায়ী বলে বিবেচিত হবেন।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৩. কুরিয়ার এপিআই ও থার্ড-পার্টি সার্ভিস</h2>
          <p>
            Nishchinto প্ল্যাটফর্মটি দেশের শীর্ষ কুরিয়ার কোম্পানিগুলোর (Steadfast, Pathao, RedX ইত্যাদি) সাথে এপিআই-এর মাধ্যমে সংযোগ স্থাপন করে। কুরিয়ার কোম্পানির ডেলিভারি সময়সীমা, পণ্য পৌঁছানোর জটিলতা বা কুরিয়ার চার্জ নির্ধারণের সম্পূর্ণ দায় সংশ্লিষ্ট কুরিয়ার কর্তৃপক্ষের।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৪. সাবস্ক্রিপশন, রিচার্জ ও রিফান্ড নীতি</h2>
          <p>
            মার্চেন্টদের জন্য ৭ দিনের ফ্রি ট্রায়াল সুবিধা প্রযোজ্য। ফ্রি ট্রায়াল শেষে মাসিক সাবস্ক্রিপশন ফি bKash, Nagad বা অনলাইন পেমেন্ট মেথডে প্রদেয়। সাবস্ক্রিপশন ফি বা AI ওয়ালেটের ব্যবহৃত ব্যালেন্স অপরিবর্তনযোগ্য ও অফেরতযোগ্য।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৫. সেন্ট্রাল ফ্রড ডেটাবেসের ব্যবহার</h2>
          <p>
            সেন্ট্রাল ফ্রড গার্ড ফিচারটি শুধুমাত্র ই-কমার্স ব্যবসায়ীদের রিটার্ন ও ভুয়া অর্ডারের ক্ষতি থেকে সুরক্ষার জন্য তৈরি। এই ডেটাবেসের তথ্য কোনো বাণিজ্যিক বিক্রি বা অপব্যবহার সম্পূর্ণ নিষিদ্ধ।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">৬. শর্তাবলী সংশোধন</h2>
          <p>
            Nishchinto কর্তৃপক্ষ যেকোনো সময় কোনো পূর্ব নোটিশ ছাড়াই এই শর্তাবলী পরিবর্তন বা পরিমার্জন করার অধিকার সংরক্ষণ করে। সংশোধিত শর্তাবলী প্ল্যাটফর্মে প্রকাশের সাথে সাথেই কার্যকর বলে গণ্য হবে।
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
          যেকোনো জিজ্ঞাসা বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন:{" "}
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
