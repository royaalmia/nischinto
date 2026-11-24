const fs = require("fs");
const path = require("path");

const albums = [
  {
    id: 1,
    folder: "album-1",
    title: "সেন্ট্রাল কুরিয়ার ফ্রড গার্ড ও রিটার্ন লস প্রতিরোধ",
    sub: "Courier Fraud Guard & Return Prevention",
    badge: "হাইয়েস্ট আরওআই বুস্টিং টপিক",
    color: "red",
    caption: `🛑 মাসে ৩০-৪০ হাজার টাকা শুধু কুরিয়ার রিটার্নে লস হচ্ছে? 

অনলাইন ব্যবসায়ীদের সবচেয়ে বড় শত্রু ভুয়া অর্ডার আর কুরিয়ার রিটার্ন। কাস্টমার অর্ডার দিয়ে পার্সেল রিসিভ না করলে আসা-যাওয়ার ডেলিভারি চার্জ সম্পূর্ণ আপনার পকেট থেকে যায়!

⚡ সমাধান: Nishchinto.app-এর 'সেন্ট্রাল কুরিয়ার ফ্রড গার্ড'।

যেভাবে আপনার লাভ বাঁচাবে:
• দেশের শীর্ষ কুরিয়ার নেটওয়ার্কের ক্রস-ম্যাচড সেন্ট্রাল ডেটাবেস
• অর্ডার কনফার্মের আগেই কাস্টমারের ০-১০০% ফ্রড রিস্ক স্কোর প্রদর্শন
• ভুয়া কাস্টমার ও সিরিয়াল রিটার্নকারীদের শনাক্ত করে সাথে সাথে হাই-রিস্ক অ্যালার্ট
• ঝুঁকিপূর্ণ অর্ডারে স্বয়ংক্রিয়ভাবে অগ্রিম ডেলিভারি চার্জ নেওয়ার রিকমেন্ডেশন

ব্যবসা চালান সম্পূর্ণ নিশ্চিন্তে। আজই ফ্রি ট্রায়াল নিন!
👉 সাইন আপ করুন: https://nishchinto.app
📞 হটলাইন: 01711223344

#Nischinto #EcommerceAutomation #FraudGuard #CourierReturn #BDShop #CourierAutomation`,
    targeting: [
      "Target Audience: Business Page Admins, Retailers, E-commerce in Bangladesh",
      "Interests: F-commerce, Steadfast Courier, Pathao, Daraz Seller, Shopify",
      "Age: ২২ - ৫০ বছর (উভয় লিঙ্গ)",
      "Location: সমগ্র বাংলাদেশ (ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট অগ্রাধিকার)"
    ],
    photos: [
      { id: 1, name: "১. কুরিয়ার রিটার্ন সমস্যার বাস্তব চিত্র" },
      { id: 2, name: "২. ০-১০০% ফ্রড রিস্ক স্কোরিং মিটার" },
      { id: 3, name: "৩. কুরিয়ার ব্লকলিস্ট ও ক্রস-ম্যাচ ডেটাবেস" },
      { id: 4, name: "৪. হাই-রিস্ক অর্ডারে অগ্রিম চার্জ সতর্কতা" },
      { id: 5, name: "৫. রিটার্ন রেট ২৫% থেকে ৫%-এ নামানোর ফলাফল" }
    ]
  },
  {
    id: 2,
    folder: "album-2",
    title: "সাবলীল বাংলা AI ভয়েস কলিং এজেন্ট",
    sub: "Bangla Conversational AI Voice Calling Agent",
    badge: "ভাইরাল আকর্ষণীয় ফিচার",
    color: "teal",
    caption: `🤖 কর্মী রেখে সারাদিন ফোন কল করার দিন শেষ! এবার মিষ্টি বাংলা ভাষায় স্বয়ংক্রিয় ফোন কল করবে আমাদের AI!

গ্রাহক আপনার পেজে বা ওয়েবসাইটে অর্ডার করার সাথে সাথেই Nishchinto AI নিজে ফোন দিয়ে সাবলীল বাংলায় বলবে:
"আসসালামু আলাইকুম! আপনি অমুক পেজ থেকে এই পণ্যটি অর্ডার করেছিলেন। সাইজ ও ডেলিভারি ঠিকানা কনফার্ম করতে ১ চাপুন।"

সুবিধাসমূহ:
• ০ সেকেন্ড অপেক্ষায় ইনস্ট্যান্ট কল—অর্ডার ক্যানসেলেশন প্রায় শূন্যের কোঠায়
• কাস্টমারের সাথে কথা বলে সাইজ, কালার ও ঠিকানা শতভাগ ভেরিফিকেশন
• কনফার্ম করার সাথে সাথে স্বয়ংক্রিয়ভাবে কুরিয়ারে পার্সেল বুকিং
• কল সেন্টারের ৩-৪ জন কর্মীর মাসিক ৩০,০০০-৪০,০০০ টাকা বেতন সাশ্রয়

স্মার্ট উদ্যোক্তা হতে আজই আপনার স্টোরে বাংলা AI ভয়েস এজেন্ট যুক্ত করুন।
👉 এখনই শুরু করুন: https://nishchinto.app

#AIVoiceAgent #EcommerceBangla #OrderConfirmation #Nischinto #VoiceBot #AutomationBD`,
    targeting: [
      "Target Audience: Clothing Brands, Gadget Shops, Cosmetics Businesses, F-commerce",
      "Interests: Artificial Intelligence, Customer Care, Call Center, Small Business",
      "Age: ২১ - ৪৫ বছর"
    ],
    photos: [
      { id: 1, name: "১. ০ সেকেন্ডে মিষ্টি বাংলা গলায় ফোন কল" },
      { id: 2, name: "২. সাইজ ও ঠিকানা হিউম্যান-লাইক ভেরিফিকেশন" },
      { id: 3, name: "৩. ৩ বার স্মার্ট অটো রি-ডায়াল সুবিধা" },
      { id: 4, name: "৪. কুরিয়ারে অটোমেটিক ট্র্যাকিং ও বুকিং" },
      { id: 5, name: "৫. কর্মীদের মাসিক ৪০,০০০ টাকা বেতন সাশ্রয়" }
    ]
  },
  {
    id: 3,
    folder: "album-3",
    title: "AI অটো অ্যাড ম্যানেজার ও অটো স্টক-কিল",
    sub: "Meta & TikTok Ad Autopilot with Auto Stock-Pause",
    badge: "মেটা অ্যাড স্পেন্ড সেভার",
    color: "indigo",
    caption: `💸 পণ্য স্টক শেষ, অথচ ফেসবুকে বিজ্ঞাপন চলে ডলার খরচ হতেই আছে? 

প্রতিদিন শত শত অনলাইন ব্যবসায়ী এই ভুলে হাজার হাজার টাকার বিজ্ঞাপন বাজেট অপচয় করেন।

🚀 Nishchinto AI অটো অ্যাড ইঞ্জিন আপনার মেটা ও টিকটক বিজ্ঞাপনের দায়িত্ব নেয়:
• ওয়্যারহাউসে যেকোনো পণ্যের স্টক ০ হওয়ার সাথে সাথে বিজ্ঞাপন অটো পজ (Auto-Kill)
• পণ্য রি-স্টক হলে স্বয়ংক্রিয়ভাবে ক্যাম্পেইন আবার চালু
• যারা পণ্য অর্ডার করে কখনো রিটার্ন করে না—তাদের ডেটা দিয়ে ১% হাই-ভ্যালু লুকঅ্যালাইক অডিয়েন্স তৈরি
• হাই-কনভার্টিং বাংলা অ্যাড কপি জেনারেট করে ১-ক্লিকে ক্যাম্পেইন পাবলিশ

আপনার প্রতিটি পয়সার বিজ্ঞাপন বাজেট কাজে লাগান।
👉 আজই টেস্ট করুন: https://nishchinto.app

#FacebookAdsBD #MetaMarketing #AdBudgetSave #NischintoApp #EcommerceAds #ROAS`,
    targeting: [
      "Target Audience: Meta Ad Account Users, Digital Marketers, Media Buyers, Brand Owners",
      "Interests: Meta Ads Manager, ROAS, Facebook Pixel, Conversions API (CAPI)",
      "Age: ২২ - ৫০ বছর"
    ],
    photos: [
      { id: 1, name: "১. স্টক ০ হলে স্বয়ংক্রিয় বিজ্ঞাপন পজ (Auto-Kill)" },
      { id: 2, name: "২. ১০ সেকেন্ডে বাংলা অ্যাড কপি জেনারেটর" },
      { id: 3, name: "৩. ১% হাই-ভ্যালু লুকঅ্যালাইক অডিয়েন্স" },
      { id: 4, name: "৪. লাইভ ROAS ৪.২x ও মেটা এপিআই সিঙ্ক" },
      { id: 5, name: "৫. বিজ্ঞাপনে লাভ দ্বিগুণ করার স্মার্ট ফর্মুলা" }
    ]
  },
  {
    id: 4,
    folder: "album-4",
    title: "ওয়্যারহাউস বারকোড স্ক্যানার ও ১-ক্লিক কুরিয়ার বুকিং",
    sub: "Warehouse Barcode & 1-Click Steadfast/Pathao Dispatch",
    badge: "লজিস্টিকস গতি ১০ গুণ",
    color: "emerald",
    caption: `📦 কুরিয়ারে ভুল পার্সেল পাঠানো ও ট্র্যাকিং মিসিং বন্ধ করুন!

দিনে ৫০-১০০টা পার্সেল প্যাক করতে গিয়ে ভুল সাইজ বা অন্য কাস্টমারের পণ্য চলে যাওয়ার অভিজ্ঞতা নিশ্চয়ই আপনার আছে?

⚡ Nishchinto ওয়্যারহাউস বারকোড ও ১-ক্লিক কুরিয়ার হাব:
• মোবাইলের ক্যামেরা বা হ্যান্ডহেল্ড স্ক্যানার দিয়ে বারকোড স্ক্যান করে নির্ভুল প্যাকিং
• ১-ক্লিকে একসাথে ১০০ পার্সেল Steadfast, Pathao বা RedX-এ বুকিং
• ইনভয়েস ও লেবেল এক ক্লিকে বাল্ক প্রিন্ট
• কুরিয়ার ডেলিভারিম্যানের কাছে পার্সেল হ্যান্ডওভার করার সাথে সাথে ডিজিটাল স্লিপ তৈরি

আপনার ওয়্যারহাউসকে করুন বড় বড় মাল্টিন্যাশনাল ব্র্যান্ডের মতো ডিজিটাল।
👉 ভিজিট করুন: https://nishchinto.app

#WarehouseAutomation #SteadfastCourier #PathaoCourier #BarcodeScanning #Nischinto`,
    targeting: [
      "Target Audience: Medium to Large volume F-Commerce, Wholesalers, Courier frequent users",
      "Interests: Courier service, Supply chain, Order fulfillment, Logistics in Bangladesh"
    ],
    photos: [
      { id: 1, name: "১. প্যাকিং স্ক্যান: ভুল প্রোডাক্ট পাঠানো অসম্ভব" },
      { id: 2, name: "২. কুরিয়ার মার্ক: রাইডার হ্যান্ডওভার অডিট" },
      { id: 3, name: "৩. ১-ক্লিকে ১০০ পার্সেল কুরিয়ার বুকিং" },
      { id: 4, name: "৪. বাল্ক ইনভয়েস ও শিপিং স্টিকার লেবেল প্রিন্ট" },
      { id: 5, name: "৫. রিটার্ন পার্সেল স্ক্যান করে স্টক এডজাস্টমেন্ট" }
    ]
  },
  {
    id: 5,
    folder: "album-5",
    title: "ইনকমপ্লিট অর্ডার ড্রপ-অফ ক্যাচার ও রিকভারি",
    sub: "Incomplete Order & Abandoned Form Recovery",
    badge: "হারানো সেলস উদ্ধার (+৩০%)",
    color: "amber",
    caption: `🛒 কাস্টমার ফর্মে নাম ও মোবাইল নম্বর লিখে সাবমিট না করেই পেজ কেটে দিয়েছে? 

সাধারণ ওয়েবসাইটে এই সেলসগুলো চিরতরে হারিয়ে যায়। কিন্তু Nishchinto-তে নয়!

🔥 ইনকমপ্লিট অর্ডার ক্যাচার ফিচার:
• গ্রাহক ফর্মে টাইপ করার সাথে সাথে রিয়েল-টাইমে ডেটা ক্যাপচার
• ফর্ম সাবমিট না হলেও ড্যাশবোর্ডে ড্রপ-অফ অর্ডার হিসেবে তালিকাভুক্ত
• ১-ক্লিকে হোয়াটসঅ্যাপ অফার বা সরাসরি ফোন কল দিয়ে হারানো সেলস উদ্ধার
• গড়ে প্রতি ১০০ জনে ২৫-৩০ জন ড্রপ-অফ কাস্টমারকে সফল ক্রেতায় রূপান্তর!

বিজ্ঞাপনে খরচ না বাড়িয়ে বিদ্যমান ট্রাফিক থেকেই ৩০% বেশি সেলস পান।
👉 ট্রায়াল শুরু করুন: https://nishchinto.app

#IncompleteOrder #DropOffRecovery #CartAbandonment #SalesGrowth #NischintoApp`,
    targeting: [
      "Target Audience: Online store owners, Conversion rate optimizers, Direct response marketers",
      "Interests: Conversion rate, WhatsApp Business, E-commerce strategy"
    ],
    photos: [
      { id: 1, name: "১. ফর্ম না সাবমিট করলেও রিয়েল-টাইমে ডেটা সেভ" },
      { id: 2, name: "২. ১-ক্লিকে হোয়াটসঅ্যাপ রিকভারি অফার" },
      { id: 3, name: "৩. সরাসরি ফোন কলে ৩০% অতিরিক্ত বিক্রি উদ্ধার" },
      { id: 4, name: "৪. ১-ক্লিক ফোন মাস্কিং ও ডেটাবেস নিরাপত্তা" },
      { id: 5, name: "৫. বাজেট না বাড়িয়েই সেলস গ্রাফ উর্ধ্বমুখী" }
    ]
  },
  {
    id: 6,
    folder: "album-6",
    title: "কাস্টম ল্যান্ডিং পেজ বিল্ডার ও ফাস্ট COD চেকআউট",
    sub: "Custom Landing Page Builder & 1-Page COD Checkout",
    badge: "৩ মিনিটে লাইভ সেলস পেজ",
    color: "sky",
    caption: `🚀 ওয়েবসাইট বানাতে লাখ টাকা খরচ বা ডেভেলপার খোঁজার দিন শেষ!

এখন মাত্র ৩ মিনিটে কোনো কোডিং ছাড়াই তৈরি করুন অত্যন্ত আকর্ষণীয়, সুপার-ফাস্ট ক্যাশ অন ডেলিভারি (COD) ল্যান্ডিং পেজ।

✨ যা যা পাচ্ছেন:
• প্রি-বিল্ট হাই-কনভার্টিং আধুনিক টেমপ্লেট
• সরাসরি আমাদের লাইভ লিংক (nishchinto.app/p/your-shop) ব্যবহারের সুবিধা
• সম্পূর্ণ এইচটিএমএল কোড ১-ক্লিকে ডাউনলোড করে আপনার নিজস্ব ডোমেইনে বসানোর সুবিধা
• ১-পেজ ফাস্ট চেকআউট, জেলা-থানা ড্রপডাউন ও অটো ডেলিভারি চার্জ ক্যালকুলেটর
• মেটা পিক্সেল ও কনভার্সন এপিআই (CAPI) ফুল ট্র্যাকিং

দেরি না করে আজই আপনার পণ্যের জন্য চমৎকার ল্যান্ডিং পেজ তৈরি করুন।
👉 ফ্রি বানিয়ে দেখুন: https://nishchinto.app/landing-pages

#LandingPageBuilder #CODCheckout #NischintoLanding #EcommerceWebsite #NoCodeBD`,
    targeting: [
      "Target Audience: New business starters, F-Commerce sellers without websites, Product launches",
      "Interests: Web design, Landing page, WordPress, Shopify alternative"
    ],
    photos: [
      { id: 1, name: "১. ৩ মিনিটে কোনো কোডিং ছাড়াই ল্যান্ডিং পেজ" },
      { id: 2, name: "২. ২০ সেকেন্ডের ১-পেজ ফাস্ট COD চেকআউট" },
      { id: 3, name: "৩. ৬৪ জেলা-থানা ড্রপডাউন ও অটো ডেলিভারি চার্জ" },
      { id: 4, name: "৪. লাইভ লিঙ্ক অথবা ১-ক্লিকে HTML কোড ডাউনলোড" },
      { id: 5, name: "৫. মেটা পিক্সেল ও CAPI ফুল ট্র্যাকিং সেটআপ" }
    ]
  },
  {
    id: 7,
    folder: "album-7",
    title: "আসল নিট লাভ-ক্ষতি ও লাইভ ফিন্যান্সিয়াল হিসাব",
    sub: "True Net Profit, COGS & Ad Spend Calculator",
    badge: "আসল নিট লাভ ও ব্যালান্স শিট",
    color: "purple",
    caption: `📊 মাস শেষে সেলস ৫ লাখ টাকা দেখাচ্ছে, কিন্তু পকেটে কোনো টাকা নেই? 

কারণ বিক্রয়মূল্য কখনো আসল লাভ নয়! পণ্যের কেনা দাম (COGS), কুরিয়ার চার্জ, রিটার্ন পার্সেলের ক্ষতি আর ফেসবুকের অ্যাড স্পেন্ড বাদ না দিলে আসল লাভের হিসাব পাওয়া অসম্ভব।

💡 Nishchinto রিয়েল-টাইম প্রফিট অ্যানালিটিক্স:
• প্রতিটা অর্ডারের স্বয়ংক্রিয় নিট প্রফিট হিসাব
• কুরিয়ার সেটেলমেন্ট ও ক্যাশ ডেটাবেস সিঙ্ক
• ফেসবুক ও টিকটক অ্যাড স্পেন্ডের সাথে লাইভ আরওআই (ROAS) সমন্বয়
• এক্সেল শিটের ঝামেলা ছাড়াই ১ স্ক্রিনে রিয়েল-টাইম লাভ-ক্ষতির চিত্র

অন্ধকারে ব্যবসা না চালিয়ে ডেটা দেখে লাভ বাড়ান।
👉 আজই সাইন আপ করুন: https://nishchinto.app

#EcommerceProfit #BusinessAnalytics #TrueNetProfit #Nischinto #SaaSBD`,
    targeting: [
      "Target Audience: Established E-commerce founders, CFOs, Experienced merchants",
      "Interests: Profitability, Accounting, Financial Management, ROI"
    ],
    photos: [
      { id: 1, name: "১. বিক্রয়মূল্য কখনো লাভ নয়—সব খরচের বাস্তবতা" },
      { id: 2, name: "২. প্রতি অর্ডারে পাই টু পাই নিট প্রফিট ব্রেকডাউন" },
      { id: 3, name: "৩. কুরিয়ার ক্যাশ কালেকশন ও সেটেলমেন্ট রিকনসিল" },
      { id: 4, name: "৪. এক্সেল ছাড়াই ১ স্ক্রিনে রিয়েল-টাইম ব্যালান্স শিট" },
      { id: 5, name: "৫. সঠিক ফিন্যান্সিয়াল ডেটায় সফল বিজনেস গ্রোথ" }
    ]
  }
];

function buildHtml() {
  let albumSections = "";

  for (const a of albums) {
    let photosHtml = "";
    for (const p of a.photos) {
      photosHtml += `
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div class="relative aspect-square bg-slate-50 overflow-hidden group">
            <img src="/fb-assets/albums/${a.folder}/photo-${p.id}.png" onerror="this.src='/fb-assets/albums/${a.folder}/photo-${p.id}.svg'" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <a href="/fb-assets/albums/${a.folder}/photo-${p.id}.png" target="_blank" class="px-3 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow-md">
                ফুলস্ক্রিন ভিউ ↗
              </a>
            </div>
          </div>
          <div class="p-3 border-t border-slate-100 space-y-2 bg-white">
            <p class="text-xs font-bold text-slate-800 line-clamp-1" title="${p.name}">
              ${p.name}
            </p>
            <div class="flex gap-1.5">
              <a href="/fb-assets/albums/${a.folder}/photo-${p.id}.png" download="nishchinto-${a.folder}-photo-${p.id}.png" class="flex-1 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold rounded-lg text-center transition-all shadow-xs">
                ডাউনলোড PNG
              </a>
              <a href="/fb-assets/albums/${a.folder}/photo-${p.id}.svg" download="nishchinto-${a.folder}-photo-${p.id}.svg" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg text-center transition-all">
                SVG
              </a>
            </div>
          </div>
        </div>
      `;
    }

    albumSections += `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <!-- Album Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-extrabold text-base">
              ${a.id}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-bold text-slate-900">${a.title}</h3>
                <span class="text-[11px] font-bold px-2.5 py-0.5 bg-teal-100 text-teal-800 rounded-full">
                  ৫টি রেডি ফটো
                </span>
              </div>
              <p class="text-xs text-slate-500 font-mono">${a.sub}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              ${a.badge}
            </span>
            <a href="/fb-assets/albums/${a.folder}/${a.folder}.zip" download="nishchinto-${a.folder}.zip" class="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-full border border-teal-200 transition-all shadow-xs">
              <span>📥</span> অ্যালবাম ZIP ডাউনলোড
            </a>
          </div>
        </div>

        <!-- 5 Photos Grid for this Album -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>🖼️</span>
              <span>এই অ্যালবামের ৫টি অফিশিয়াল মার্কেটিং ফটো (ডাউনলোড করুন):</span>
            </h4>
            <span class="text-[11px] text-slate-400">১০৮০x১০৮০ স্কয়ার ফরম্যাট (FB Post & Ad Ready)</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
            ${photosHtml}
          </div>
        </div>

        <!-- Copy & Targeting Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          <!-- Caption Copy Box -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-slate-700">📋 ফেসবুক পোস্টের ক্যাপশন / বুস্ট কপি:</span>
                <button onclick="copyToClipboard('caption_${a.id}')" class="text-[11px] font-bold text-teal-700 hover:text-teal-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                  কপি করুন
                </button>
              </div>
              <textarea id="caption_${a.id}" readonly rows="8" class="w-full text-xs text-slate-800 leading-relaxed font-normal p-3 rounded-xl border border-slate-200 bg-white shadow-2xs resize-none focus:outline-none">${a.caption}</textarea>
            </div>
          </div>

          <!-- Targeting Guide -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-xs font-bold text-slate-700">🎯 মেটা অ্যাড ম্যানেজার অডিয়েন্স টার্গেটিং:</span>
              <ul class="text-xs text-slate-600 space-y-2 list-disc list-inside bg-white p-3.5 rounded-xl border border-slate-200">
                ${a.targeting.map(t => `<li><strong>${t}</strong></li>`).join("")}
              </ul>
            </div>
            <div class="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900 font-semibold flex items-center justify-between">
              <span>💡 রিকমেন্ডেড ক্যাম্পেইন গোল:</span>
              <span class="font-bold text-teal-800">Engagement / Leads / Conversions</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nishchinto.app - Facebook Page Branding & 35-Photo Album Kit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Hind Siliguri', sans-serif; }
  </style>
  <script>
    function copyToClipboard(elementId) {
      const copyText = document.getElementById(elementId);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      alert("ক্যাপশন কপি হয়েছে!");
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-900 pb-24">

  <!-- Header -->
  <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-xs">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
          N
        </div>
        <div>
          <h1 class="text-base sm:text-lg font-bold text-slate-900 leading-tight">Nishchinto.app ফেসবুক পেজ ব্র্যান্ডিং ও মার্কেটিং কিট</h1>
          <p class="text-xs text-slate-500">প্রোফাইল ফটো, কভার ব্যানার এবং ৩৫টি রেডিমেড ফটোসহ ৭টি বুস্টিং অ্যালবাম</p>
        </div>
      </div>
      <a href="/marketing" class="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-all">
        ড্যাশবোর্ডে ফিরে যান →
      </a>
    </div>
  </header>

  <main class="max-w-6xl mx-auto p-4 sm:p-6 space-y-10">

    <!-- Section 1: Profile & Cover Photos (Exact Light Main Theme) -->
    <section class="space-y-4">
      <div class="border-b border-slate-200 pb-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-1">
          <span>মূল সাইটের লাইট থিমে তৈরি</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span>🎨</span>
          <span>ফেসবুক পেজ প্রোফাইল ফটো ও কভার ব্যানার</span>
        </h2>
        <p class="text-xs text-slate-500">হাই-রেজোলিউশন প্রোফাইল পিকচার এবং ডেস্কটপ ও মোবাইলের জন্য অপ্টিমাইজড কভার ব্যানার</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Picture Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                1:1 Square (1024x1024)
              </span>
              <span class="text-xs font-medium text-slate-400">প্রোফাইল পিকচার</span>
            </div>
            <div class="aspect-square w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner">
              <img src="/fb-assets/fb-profile-photo.jpg" alt="Facebook Profile Picture" class="w-full h-full object-cover">
            </div>
          </div>
          <div class="pt-2 flex gap-2">
            <a href="/fb-assets/fb-profile-photo.jpg" download="nishchinto-fb-profile.jpg" class="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl text-center shadow-sm">
              ডাউনলোড JPG (Ultra HD)
            </a>
            <a href="/fb-assets/profile-picture.svg" download="nishchinto-fb-profile.svg" class="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl text-center">
              ভেক্টর SVG
            </a>
          </div>
        </div>

        <!-- Cover Photo Banner Card -->
        <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                16:9 Landscape Banner (1640x624)
              </span>
              <span class="text-xs font-medium text-slate-400">পেজ কভার ব্যানার</span>
            </div>
            <div class="w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center">
              <img src="/fb-assets/fb-cover-photo.jpg" alt="Facebook Cover Photo" class="w-full h-auto object-cover">
            </div>
          </div>
          <div class="pt-2 flex gap-2">
            <a href="/fb-assets/fb-cover-photo.jpg" download="nishchinto-fb-cover.jpg" class="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl text-center shadow-sm">
              ডাউনলোড কভার ব্যানার JPG (Ultra HD)
            </a>
            <a href="/fb-assets/cover-photo.svg" download="nishchinto-fb-cover.svg" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl text-center">
              ভেক্টর SVG ব্যানার
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 7 Photo Albums (Each with 5 Photos = 35 Photos Total) -->
    <section class="space-y-6">
      <div class="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>📁</span>
            <span>ফেসবুক ফটো অ্যালবামসমূহ (প্রতিটি অ্যালবামে ৫টি করে ছবি — সর্বমোট ৩৫টি ফটো)</span>
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            প্রতিটি অ্যালবামের আলাদা আলাদা ছবি ডাউনলোড করুন এবং সাথে দেওয়া বাংলা সেলস কপি দিয়ে ফেসবুকে বুস্ট ও পোস্ট করুন।
          </p>
        </div>
        <div>
          <a href="/fb-assets/albums/nishchinto-all-albums.zip" download="nishchinto-all-albums.zip" class="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:shadow-md">
            <span>📦</span> সব ৩৫টি ফটো একসাথে ডাউনলোড করুন (Master ZIP)
          </a>
        </div>
      </div>

      <!-- Albums List -->
      <div class="space-y-8">
        ${albumSections}
      </div>
    </section>

  </main>
</body>
</html>
`;
}

const html = buildHtml();
fs.writeFileSync(path.join(__dirname, "..", "public", "fb-assets", "marketing-kit.html"), html, "utf-8");
console.log("Updated marketing-kit.html with 35 photos across 7 albums!");
