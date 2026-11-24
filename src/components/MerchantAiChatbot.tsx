"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldCheck,
  ChevronUp,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  linkUrl?: string;
  linkText?: string;
  time: string;
}

const FAQ_SUGGESTIONS = [
  "কুরিয়ার রিটার্ন রেট কীভাবে ৫%-এ নামাবো?",
  "কীভাবে ব্যালান্স রিচার্জ করবো?",
  "স্টেডফাস্ট ও পাঠাও কীভাবে কানেক্ট করবো?",
  "ল্যান্ডিং পেজের কোড ওয়েবসাইটে কীভাবে লাগাবো?",
  "AI ভয়েস কলিং কীভাবে কাজ করে?",
];

export default function MerchantAiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "আসসালামু আলাইকুম! আমি নিশচিন্তের ভার্চুয়াল AI বিজনেস সহকারী।\n\nআপনার স্টোর পরিচালনা, কুরিয়ার বুকিং, ফ্রড চেক, ব্যালান্স রিচার্জ কিংবা বিজ্ঞাপন সম্পর্কিত যেকোনো প্রশ্ন করুন। আমি আপনাকে তাৎক্ষণিক সহায়তা করতে প্রস্তুত!",
      time: "এখনই",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Smart Knowledge Engine for Merchants
  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "";
      let linkUrl = "";
      let linkText = "";

      const q = query.toLowerCase();

      if (q.includes("রিটার্ন") || q.includes("fraud") || q.includes("ফ্রড") || q.includes("লিপস্টিক") || q.includes("স্কোর")) {
        botReply = "কুরিয়ার রিটার্ন কমাতে আমাদের 'সেন্ট্রাল ফ্রড গার্ড' ব্যবহার করুন:\n১. ০-১০০% ফ্রড রিস্ক স্কোর দেখুন।\n২. ৬০%-এর বেশি রিস্ক হলে অগ্রিম ডেলিভারি চার্জ গ্রহণ করুন।\n৩. মিষ্টি বাংলা AI ভয়েস কলিং সক্রিয় রাখুন।";
        linkUrl = "/fraud-guard";
        linkText = "ফ্রড গার্ড ড্যাশবোর্ড দেখুন →";
      } else if (q.includes("রিচার্জ") || q.includes("ব্যালান্স") || q.includes("ডিপোজিট") || q.includes("টাকা") || q.includes("bkash")) {
        botReply = "ওয়ালেট রিচার্জ করতে:\n১. হেডারের 'ওয়ালেট' অপশনে 'রিচার্জ' বাটনে ক্লিক করুন।\n২. বিকাশ, নগদ বা ব্যাংক একাউন্টে টাকা পাঠান।\n৩. প্রেরক নম্বর ও TrxID সাবমিট করলেই অ্যাডমিন যাচাই করে ব্যালান্স যোগ করে দেবেন এবং ইনভয়েস জেনারেট হবে।";
        linkUrl = "/settings";
        linkText = "ব্যালান্স ও সেটিংস পেজ →";
      } else if (q.includes("কুরিয়ার") || q.includes("steadfast") || q.includes("pathao") || q.includes("স্টেডফাস্ট") || q.includes("পাঠাও")) {
        botReply = "স্টেডফাস্ট ও পাঠাও সংযোগ করতে:\n১. সেটিংস > কুরিয়ার ট্যাবে যান।\n২. আপনার স্টেডফাস্ট ও পাঠাও API Key এবং Secret Key দিন।\n৩. অর্ডার ড্যাশবোর্ড থেকে ১-ক্লিকেই পার্সেল কুরিয়ারে বুকিং হয়ে যাবে এবং ট্র্যাকিং আইডি জেনারেট হবে।";
        linkUrl = "/settings";
        linkText = "কুরিয়ার কনফিগার করুন →";
      } else if (q.includes("ল্যান্ডিং") || q.includes("landing") || q.includes("কোড") || q.includes("code")) {
        botReply = "কাস্টম ল্যান্ডিং পেজ তৈরি ও ব্যবহারের নিয়ম:\n১. 'ল্যান্ডিং পেজ' মেনুতে যান।\n২. আপনার ইনভেন্টরির পণ্য সিলেক্ট করে ১-ক্লিকে ল্যান্ডিং পেজ তৈরি করুন।\n৩. সরাসরি নিশচিন্ত লিংক (/p/slug) শেয়ার করতে পারেন অথবা সম্পূর্ণ HTML কোড ডাউনলোড করে আপনার যেকোনো ডোমেইনে আপলোড করতে পারেন। ল্যান্ডিং পেজের অর্ডারে কোনো কোডিং ছাড়াই নিশচিন্তের সেন্ট্রাল অর্ডারে যুক্ত হবে।";
        linkUrl = "/landing-pages";
        linkText = "ল্যান্ডিং পেজ বিল্ডারে যান →";
      } else if (q.includes("ভয়েস") || q.includes("voice") || q.includes("কল") || q.includes("ai call")) {
        botReply = "নিশচিন্ত বাংলা AI ভয়েস এজেন্ট:\n১. অর্ডার হওয়ামাত্রই গ্রাহককে মিষ্টি বাংলা ভাষায় কল করে জামার সাইজ ও ঠিকানা ভেরিফাই করে।\n২. গ্রাহক কল না ধরলে স্বয়ংক্রিয়ভাবে ৩ বার স্মার্ট রি-ডায়াল করে।\n৩. প্রতি কলে কল সেন্টারের কর্মীদের তুলনায় ৯০% খরচ ও সময় বাঁচে।";
        linkUrl = "/ai-calls";
        linkText = "ভয়েস কলিং লগ দেখুন →";
      } else if (q.includes("পণ্য") || q.includes("product") || q.includes("ছবি") || q.includes("দাম")) {
        botReply = "পণ্য যোগ বা ম্যানেজ করতে:\n১. 'পণ্য ও ইনভেন্টরি' মেনুতে গিয়ে 'নতুন পণ্য যোগ করুন' বাটনে ক্লিক করুন।\n২. পণ্যের নাম, ক্যাটাগরি, বিক্রয়মূল্য, ক্রয়মূল্য (COGS), স্টক ও ছবি দিন।\n৩. স্টক ০ হলে AI বিজ্ঞাপন নিজে থেকেই বন্ধ হয়ে আপনার বাজেট রক্ষা করবে।";
        linkUrl = "/products";
        linkText = "পণ্য তালিকায় যান →";
      } else {
        botReply = `ধন্যবাদ আপনার প্রশ্নের জন্য! নিশচিন্ত ই-কমার্স অপারেটিং সিস্টেম আপনার ব্যবসা স্বয়ংক্রিয় করতে প্রস্তুত।\n\nআপনি চাইলে অর্ডার ড্যাশবোর্ড, পণ্য ইনভেন্টরি, ফ্রড প্রটেকশন কিংবা সেটিংস থেকে যেকোনো ফিচার সহজে পরিচালনা করতে পারেন। নির্দিষ্ট কোনো অপশনে সহায়তা লাগলে বলুন।`;
        linkUrl = "/dashboard";
        linkText = "অর্ডার ড্যাশবোর্ডে যান →";
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: botReply,
        linkUrl,
        linkText,
        time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer border border-teal-500/30"
          title="নিশচিন্ত AI বিজনেস সহকারী"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black">নিশচিন্ত AI সহকারী</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-teal-100 font-medium">যেকোনো প্রশ্ন করুন • ২৪/৭</p>
          </div>
        </button>
      )}

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-[340px] sm:w-[380px] h-[520px] flex flex-col justify-between overflow-hidden animate-in zoom-in-95">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">নিশচিন্ত AI বিজনেস সহকারী</h3>
                  <span className="text-[9px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                    অনলাইন
                  </span>
                </div>
                <p className="text-[10px] text-teal-100">মার্চেন্ট সাপোর্ট ও সমাধান ইঞ্জিন</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/70 custom-scrollbar text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 items-start ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white font-bold"
                      : "bg-teal-600 text-white font-bold"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[82%] space-y-1.5 ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 rounded-tl-xs border border-slate-200 shadow-2xs"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-xs">
                    {m.text}
                  </p>

                  {m.linkUrl && (
                    <div className="pt-1">
                      <Link
                        href={m.linkUrl}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors"
                      >
                        <span>{m.linkText || "বিস্তারিত দেখুন"}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  )}

                  <span
                    className={`block text-[9px] ${
                      m.sender === "user" ? "text-slate-400 text-right" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-9">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                <span>AI উত্তর তৈরি করছে...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto custom-scrollbar no-scrollbar">
            {FAQ_SUGGESTIONS.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleSend(faq)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-900 text-[10px] font-semibold transition-all shrink-0 cursor-pointer"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন (যেমন: কুরিয়ার কানেকশন...)"
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
