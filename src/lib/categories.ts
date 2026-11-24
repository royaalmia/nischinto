export interface BusinessCategory {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  description: string;
  sampleItems: string[];
  metricsTips: string;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "FASHION",
    nameBn: "ফ্যাশন ও পোশাক",
    nameEn: "Fashion, Clothing & Apparel",
    icon: "👗",
    description: "শাড়ি, পাঞ্জাবি, টি-শার্ট, হিজাব, জুতা ও রেডিমেড পোশাক",
    sampleItems: ["পাঞ্জাবি", "ড্রপ-শোল্ডার টি-শার্ট", "কাতান শাড়ি", "লেডিস কুর্তি", "স্নিকার্স"],
    metricsTips: "সাইজ ও কালার ভ্যারিয়েন্ট চেক করুন; সাইজ মিসম্যাচ রোধে AI ভয়েস কল চালু রাখুন।",
  },
  {
    id: "GADGET",
    nameBn: "গ্যাজেট ও ইলেকট্রনিক্স",
    nameEn: "Gadgets & Consumer Electronics",
    icon: "📱",
    description: "স্মার্টওয়াচ, ইয়ারবাডস, পাওয়ারব্যাংক ও মোবাইল এক্সেসরিজ",
    sampleItems: ["স্মার্টওয়াচ", "TWS ইয়ারবাডস", "ফাস্ট চার্জার", "ব্লুটুথ স্পিকার", "পাওয়ারব্যাংক"],
    metricsTips: "হাই-ভ্যালু পণ্যে কুরিয়ার রিটার্ন এড়াতে ডেলিভারি চার্জ অগ্রিম সংগ্রহ করুন।",
  },
  {
    id: "FOOD",
    nameBn: "খাবার, মিষ্টি ও অর্গানিক ফুড",
    nameEn: "Food, Sweets & Organic Groceries",
    icon: "🍲",
    description: "খাটি সরিষার তেল, ঘি, মধু, নাটস, কাজু ও হোমমেড মিষ্টি",
    sampleItems: ["খাটি সুন্দরবনের মধু", "গাওয়া ঘি", "ড্রাই ফ্রুটস মিক্স", "ঘানি ভাঙা সরিষার তেল", "চমচম"],
    metricsTips: "পচনশীল খাবারে সেম-ডে বা ফাস্টেস্ট ২৪ ঘণ্টা কুরিয়ার ডেলিভারি নিশ্চিত করুন।",
  },
  {
    id: "COSMETICS",
    nameBn: "কসমেটিক্স ও বিউটি কেয়ার",
    nameEn: "Cosmetics & Skincare",
    icon: "💄",
    description: "স্কিনকেয়ার সিরাম, লিপস্টিক, সানস্ক্রিন, হেয়ার অয়েল ও ফেসওয়াশ",
    sampleItems: ["ভিটামিন সি সিরাম", "ময়েশ্চারাইজার", "সানস্ক্রিন SPF 50", "ম্যাটিফাইং লিপস্টিক", "অর্গানিক হেয়ার অয়েল"],
    metricsTips: "গ্রাহকদের রিপিট ক্রয়ের হার বেশি; ড্রপ-অফ রিকভারি ও হোয়াটসঅ্যাপ রিটার্গেটিং ব্যবহার করুন।",
  },
  {
    id: "JEWELRY",
    nameBn: "জুয়েলারি ও ফ্যাশন এক্সেসরিজ",
    nameEn: "Jewelry & Luxury Accessories",
    icon: "💍",
    description: "গোল্ড প্লেটেড গহনা, ইমিটেশন, ব্রেসলেট ও ট্রেন্ডি এক্সেসরিজ",
    sampleItems: ["গলার চোকার সেট", "কুন্দন কানের দুল", "সিলভার ফিঙ্গার রিং", "রিস্ট ওয়াচ", "ব্রাইডাল সেট"],
    metricsTips: "প্যাকেজিং সুরক্ষিত রাখুন; প্রিমিয়াম বক্স আনবক্সিং অভিজ্ঞতা গ্রাহক সন্তুষ্টি বাড়ায়।",
  },
  {
    id: "HOME_DECOR",
    nameBn: "হোম ডেকর ও লাইফস্টাইল",
    nameEn: "Home Decor & Living",
    icon: "🏠",
    description: "ওয়াল আর্ট, লাইটিংস, কুশন, কিচেনওয়্যার ও হোম ইম্প্রুভমেন্ট",
    sampleItems: ["ওয়াল হ্যাঙ্গিং ফ্রেম", "ফেয়ারি লাইট সেট", "ম্যাজিক কিচেন চপার", "ফ্লাওয়ার ভাস", "কুশন কভার"],
    metricsTips: "ভাঙনশীল পণ্যে অতিরিক্ত বাবল র‍্যাপ ও 'Fragile' স্টিকার প্রিন্ট করুন।",
  },
  {
    id: "BOOKS",
    nameBn: "বই, স্টেশনারি ও আর্ট",
    nameEn: "Books, Stationery & Art",
    icon: "📚",
    description: "ইসলামিক বই, উপন্যাস, সেলফ-ডেভেলপমেন্ট, খাতা ও ক্যালেন্ডার",
    sampleItems: ["প্যারাডক্সিক্যাল সাজিদ", "অ্যাটমিক হ্যাবিটস (অনুবাদ)", "লেদার জার্নাল ডায়েরি", "ক্যালিগ্রাফি সেট"],
    metricsTips: "বইমেলা ও সিজনাল ট্রেন্ডে কম্বো অফার ল্যান্ডিং পেজ তৈরি করুন।",
  },
  {
    id: "KIDS",
    nameBn: "শিশু ও মাতৃত্বকালীন পণ্য",
    nameEn: "Baby, Toys & Mother Care",
    icon: "👶",
    description: "বেবি ড্রেস, খেলনা, ডায়াপার, স্কুল ব্যাগ ও বাচ্চাদের লার্নিং কিট",
    sampleItems: ["লার্নিং টকিং ক্যাকটাস", "বেবি ফিডার সেট", "সিলিকন বেবি ওয়্যার", "মন্টেশ্বরী টয়", "ডায়াপার ব্যাকপ্যাক"],
    metricsTips: "মা-বাবাদের জন্য COD ডেলিভারিতে দ্রুত বুকিং ও এসএমএস কনফার্মেশন জরুরি।",
  },
  {
    id: "HEALTHCARE",
    nameBn: "মেডিসিন ও হেলথকেয়ার",
    nameEn: "Healthcare & Wellness",
    icon: "💊",
    description: "বিপি মেশিন, ডায়াবেটিস স্ট্রিপ, ওয়েট স্কেল ও পার্সোনাল কেয়ার",
    sampleItems: ["ডিজিটাল বিপি মনিটর", "নেবুলাইজার মেশিন", "হট ওয়াটার ব্যাগ", "ডায়াবেটিস গ্লুকোমিটার"],
    metricsTips: "মেডিকেল গ্যাজেটে ওয়ারেন্টি স্টিকার ও চালান ইনভয়েস পার্সেলের সাথে সংযুক্ত করুন।",
  },
  {
    id: "AUTOMOBILE",
    nameBn: "অটোমোবাইল ও মোটর পার্টস",
    nameEn: "Automobile & Bike Gear",
    icon: "🏍️",
    description: "বাইক হেলমেট, রেইনকোট, ফগ লাইট, মোবাইল হোল্ডার ও ইঞ্জিন অয়েল",
    sampleItems: ["DOT সার্টিফায়েড হেলমেট", "ওয়াটারপ্রুফ বাইক রাইডিং রেইনকোট", "LED ফগ লাইট", "মোবাইল হোল্ডার"],
    metricsTips: "রাইডার কমিউনিটিতে ভিডিও অ্যাড দিয়ে হাই কনভার্সন ল্যান্ডিং পেজে ট্রাফিক আনুন।",
  },
  {
    id: "GENERAL",
    nameBn: "জেনারেল ই-কমার্স / মাল্টি-আইটেম",
    nameEn: "General E-Commerce",
    icon: "🛒",
    description: "সব ধরনের মিশ্র পণ্য ও দ্রুত বর্ধনশীল অনলাইন স্টোর",
    sampleItems: ["ডেইলি ইউটিলিটি গ্যাজেট", "ট্রেন্ডিং ভাইরাল আইটেম", "কম্বো গিফট বক্স"],
    metricsTips: "সেন্ট্রাল ফ্রড স্কোর দেখে সন্দেহজনক পার্সেল অগ্রিম ডেলিভারি চার্জে কনফার্ম করুন।",
  },
];

export function getCategoryById(id: string): BusinessCategory {
  return (
    BUSINESS_CATEGORIES.find((c) => c.id === id) ||
    BUSINESS_CATEGORIES[BUSINESS_CATEGORIES.length - 1]
  );
}
