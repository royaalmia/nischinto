// Nischinto Courier Service Layer (Steadfast, Pathao, Auto-Routing Engine)

export interface CourierBookingRequest {
  orderNumber: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  district: string;
  thana: string;
  codAmount: number;
  note?: string;
}

export interface CourierBookingResponse {
  success: boolean;
  courierName: "STEADFAST" | "PATHAO" | "REDX";
  trackingCode: string;
  consignmentId: string;
  deliveryFee: number;
  message: string;
}

export class CourierService {
  /**
   * Smart Courier Auto-Routing: Picks the best courier based on location & speed
   */
  static selectBestCourier(district?: string): "STEADFAST" | "PATHAO" {
    if (!district) return "STEADFAST";
    const d = district.toLowerCase();
    // Pathao has highest speed inside Dhaka Metro & Chittagong City
    if (d.includes("dhaka") || d.includes("chattogram")) {
      return "PATHAO";
    }
    // Steadfast has superior nationwide coverage across remote Thanas
    return "STEADFAST";
  }

  /**
   * Book parcel with Steadfast Courier (API Ready with simulation)
   */
  static async bookSteadfast(req: CourierBookingRequest): Promise<CourierBookingResponse> {
    // In production, this performs HTTP POST to https://portal.steadfast.com.bd/api/v1/create_order
    const trackingCode = "SF-" + Math.floor(10000000 + Math.random() * 90000000);
    const consignmentId = "STDF_" + Date.now();
    const isInsideDhaka = (req.district || "").toLowerCase().includes("dhaka");
    const deliveryFee = isInsideDhaka ? 70 : 130;

    return {
      success: true,
      courierName: "STEADFAST",
      trackingCode,
      consignmentId,
      deliveryFee,
      message: "পার্সেল সফলভাবে Steadfast-এ বুক করা হয়েছে।",
    };
  }

  /**
   * Book parcel with Pathao Courier (API Ready with simulation)
   */
  static async bookPathao(req: CourierBookingRequest): Promise<CourierBookingResponse> {
    // In production, this performs HTTP POST to https://api-hermes.pathao.com/aladdin/api/v1/orders
    const trackingCode = "PT-" + Math.floor(100000 + Math.random() * 900000);
    const consignmentId = "PTH_" + Date.now();
    const isInsideDhaka = (req.district || "").toLowerCase().includes("dhaka");
    const deliveryFee = isInsideDhaka ? 60 : 120;

    return {
      success: true,
      courierName: "PATHAO",
      trackingCode,
      consignmentId,
      deliveryFee,
      message: "পার্সেল সফলভাবে Pathao Courier-এ বুক করা হয়েছে।",
    };
  }

  /**
   * Unified Booking dispatcher
   */
  static async dispatchOrder(
    req: CourierBookingRequest,
    forcedCourier?: "STEADFAST" | "PATHAO"
  ): Promise<CourierBookingResponse> {
    const chosen = forcedCourier || this.selectBestCourier(req.district);
    if (chosen === "PATHAO") {
      return this.bookPathao(req);
    }
    return this.bookSteadfast(req);
  }
}
