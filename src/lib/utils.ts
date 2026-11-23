import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBDT(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace("BDT", "৳");
}

export function maskPhone(phone: string, masked: boolean = true): string {
  if (!masked || !phone || phone.length < 8) return phone;
  // E.g. 01712345678 -> 01712****78
  return phone.substring(0, 5) + "****" + phone.substring(phone.length - 2);
}

export function getFraudBadge(score: number): {
  label: string;
  color: string;
  bg: string;
  text: string;
} {
  if (score >= 70) {
    return {
      label: "উচ্চ ঝুঁকি (High Risk)",
      color: "red",
      bg: "bg-red-50 text-red-700 border-red-200",
      text: "text-red-700",
    };
  }
  if (score >= 40) {
    return {
      label: "সতর্কতা (Medium Risk)",
      color: "yellow",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      text: "text-amber-700",
    };
  }
  return {
    label: "নিরাপদ ক্রেতা (Safe)",
    color: "green",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    text: "text-emerald-700",
  };
}
