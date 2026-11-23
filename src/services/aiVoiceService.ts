// Nischinto Conversational Bengali AI Voice Agent Service

export interface AiVoiceCallResult {
  success: boolean;
  status: "COMPLETED" | "NO_ANSWER" | "FAILED" | "CANCELLED_BY_CUSTOMER";
  durationSeconds: number;
  costBDT: number;
  customerIntent: "CONFIRMED" | "CANCELLED" | "CHANGE_SIZE" | "RESCHEDULED";
  transcript: string;
  notes: string;
}

export class AiVoiceService {
  /**
   * Calls a customer using Bengali conversational AI
   */
  static async simulateBengaliVoiceCall(params: {
    customerName: string;
    phone: string;
    productTitle: string;
    totalAmount: number;
    address: string;
    fraudScore: number;
  }): Promise<AiVoiceCallResult> {
    const { customerName, productTitle, totalAmount, address, fraudScore } = params;

    // If customer is extremely high fraud (80+), simulated behavior may be no answer or rejection
    if (fraudScore >= 85) {
      return {
        success: false,
        status: "NO_ANSWER",
        durationSeconds: 15,
        costBDT: 0.5,
        customerIntent: "CANCELLED",
        transcript: "AI: আসসালামু আলাইকুম, নিশ্চিন্ত শপ থেকে কল করা হয়েছে...\n[ফোনটি রিং হয়ে কেটে গেল, কাস্টমার ফোন রিসিভ করেনি]।",
        notes: "কল রিসিভ করেনি। উচ্চ ঝুঁকির কাস্টমার।",
      };
    }

    // Realistic Bengali conversation transcript
    const transcript = `
[AI]: আসসালামু আলাইকুম ${customerName} ভাই/আপু, নিশ্চিন্ত প্ল্যাটফর্মের মার্চেন্ট শপ থেকে কল করেছি।
[Customer]: ওয়ালাইকুম আসসালাম। বলুন?
[AI]: আপনি আমাদের স্টোর থেকে "${productTitle}" অর্ডার করেছিলেন। মোট বিল ৳${totalAmount} টাকা। আপনার ডেলিভারি ঠিকানা: "${address}"। পার্সেলটি কি আমরা কনফার্ম করে পাঠিয়ে দেব?
[Customer]: হ্যাঁ ভাই, কনফার্ম করে পাঠিয়ে দিন। সাইজটা ঠিকঠাক দিয়েন।
[AI]: জ্বি অবশ্যই! প্রোডাক্টটি সম্পূর্ণ চেক করে আগামী ২ থেকে ৩ কার্যদিবসের মধ্যে আপনার ঠিকানায় ক্যাশ অন ডেলিভারিতে পৌঁছে যাবে। নিশ্চিন্তে কেনাকাটার জন্য ধন্যবাদ!
[Customer]: ধন্যবাদ ভাই।
`.trim();

    return {
      success: true,
      status: "COMPLETED",
      durationSeconds: 38,
      costBDT: 1.5,
      customerIntent: "CONFIRMED",
      transcript,
      notes: "কাস্টমার ফোনে কথা বলে অর্ডার ও ঠিকানা কনফার্ম করেছেন।",
    };
  }
}
