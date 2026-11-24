import React from "react";

export function BkashLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#E2136E" />
      {/* bKash stylized bird origami silhouette */}
      <path
        d="M26 22L74 38L52 78L40 54L26 22Z"
        fill="white"
      />
      <path
        d="M52 78L74 38L62 62L52 78Z"
        fill="#FFD2E5"
      />
      <path
        d="M26 22L40 54L32 60L26 22Z"
        fill="#FFB3D4"
      />
    </svg>
  );
}

export function NagadLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#F7931E" />
      {/* Nagad flame symbol */}
      <path
        d="M50 18C50 18 64 34 64 52C64 63.0457 55.0457 72 44 72C32.9543 72 24 63.0457 24 52C24 42 30 36 34 32C34 40 40 44 44 44C48 44 52 40 52 32C52 26 50 18 50 18Z"
        fill="#ED1C24"
      />
      <path
        d="M54 38C54 38 68 50 68 64C68 73.9411 59.9411 82 50 82C40.0589 82 32 73.9411 32 64C32 58 36 52 40 48C40 56 46 60 50 60C54 60 56 56 56 48C56 42 54 38 54 38Z"
        fill="#FFE600"
      />
      <circle cx="50" cy="54" r="8" fill="white" />
    </svg>
  );
}

export function RocketLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#8C3494" />
      {/* Rocket rocket/diamond icon */}
      <path
        d="M50 18L72 50L50 82L28 50L50 18Z"
        fill="#F68B1F"
      />
      <circle cx="50" cy="50" r="14" fill="white" />
      <path
        d="M50 30L62 50L50 70L38 50L50 30Z"
        fill="#8C3494"
      />
    </svg>
  );
}

export function BankLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#0284C7" />
      {/* Classic Bank pillar structure */}
      <path d="M50 20L22 36H78L50 20Z" fill="white" />
      <rect x="28" y="40" width="8" height="28" rx="2" fill="white" />
      <rect x="46" y="40" width="8" height="28" rx="2" fill="white" />
      <rect x="64" y="40" width="8" height="28" rx="2" fill="white" />
      <rect x="20" y="72" width="60" height="8" rx="2" fill="white" />
    </svg>
  );
}

export function MfsLogo({
  method,
  className = "w-6 h-6",
}: {
  method: string;
  className?: string;
}) {
  switch (method?.toUpperCase()) {
    case "BKASH":
      return <BkashLogo className={className} />;
    case "NAGAD":
      return <NagadLogo className={className} />;
    case "ROCKET":
      return <RocketLogo className={className} />;
    case "BANK":
    default:
      return <BankLogo className={className} />;
  }
}
