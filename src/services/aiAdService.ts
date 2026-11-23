// Nischinto Autonomous AI Ad Manager (Meta & TikTok Growth Engine)

export interface GenerateAdCopyInput {
  productTitle: string;
  price: number;
  description?: string;
  category?: string;
}

export interface GeneratedAdCopy {
  headline: string;
  primaryText: string;
  targetAudience: string;
  callToAction: string;
}

export class AiAdService {
  /**
   * Generates high-converting Bengali sales copy and audience targeting
   */
  static generateAdCopy(input: GenerateAdCopyInput): GeneratedAdCopy {
    const { productTitle, price } = input;
    return {
      headline: `🔥 প্রিমিয়াম ${productTitle} | মাত্র ৳${price} টাকায় অফার!`,
      primaryText: `আপনি কি সেরা কোয়ালিটির ${productTitle} খুঁজছেন? 
আমরা দিচ্ছি ১০০% অরিজিনাল কোয়ালিটি গ্যারান্টি! 

✅ সারা দেশে দ্রুত হোম ডেলিভারি
✅ পার্সেল হাতে পেয়ে খুলে দেখে মূল্য পরিশোধের সুবিধা (ক্যাশ অন ডেলিভারি)
✅ ৭ দিনের সহজ রিটার্ন পলিসি

স্টক অত্যন্ত সীমিত! সুযোগ হাতছাড়া না করে আজই "Order Now" বাটনে ক্লিক করে নিশ্চিন্তে অর্ডার করুন।`,
      targetAudience: "Age 20-45, Online Shoppers, E-commerce Enthusiasts, Mobile Devices (iOS & Android)",
      callToAction: "ORDER_NOW",
    };
  }

  /**
   * Evaluates ad campaign performance and applies auto-kill or auto-pause rules
   */
  static evaluateAdCampaign(campaign: {
    id: string;
    productStock: number;
    status: string;
    totalSpend: number;
    purchases: number;
    roas: number;
  }): {
    shouldPause: boolean;
    reason?: string;
  } {
    // Rule 1: Out of Stock Protection
    if (campaign.productStock <= 0) {
      return {
        shouldPause: true,
        reason: "স্টক শেষ (Stock = 0)। বাজেট অপচয় বন্ধ করতে AI স্বয়ংক্রিয়ভাবে অ্যাড পজ করেছে।",
      };
    }

    // Rule 2: Money Bleeder Protection (Spend > 1000 with 0 sales)
    if (campaign.totalSpend >= 1000 && campaign.purchases === 0) {
      return {
        shouldPause: true,
        reason: "অ্যাডটি ভালো কনভার্ট হচ্ছে না (১০০০ টাকার বেশি খরচ কিন্তু ০ সেল)। টাকা বাঁচাতে বন্ধ করা হয়েছে।",
      };
    }

    // Rule 3: Low ROAS (ROAS < 1.3 after minimum spend)
    if (campaign.totalSpend >= 2000 && campaign.roas < 1.3) {
      return {
        shouldPause: true,
        reason: "ROAS কম (১.৩ এর নিচে)। লাভজনক না হওয়ায় ক্যাম্পেইন অপ্টিমাইজেশনের জন্য পজ করা হয়েছে।",
      };
    }

    return { shouldPause: false };
  }
}
