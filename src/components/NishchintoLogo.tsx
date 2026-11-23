import Image from "next/image";

interface NishchintoLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showBangla?: boolean;
}

export default function NishchintoLogo({
  size = "md",
  showTagline = false,
  showBangla = true,
}: NishchintoLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3">
        {/* Dynamic Squircle N Logo with Checkmark */}
        <div
          className={`${iconSizes[size]} relative rounded-2xl bg-white shadow-md shadow-teal-500/15 border border-slate-100 flex items-center justify-center p-1.5 shrink-0 overflow-visible`}
        >
          {/* Stylized Cyan-Teal Gradient N */}
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="nGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c49f" />
                <stop offset="50%" stopColor="#00b4d8" />
                <stop offset="100%" stopColor="#0077b6" />
              </linearGradient>
            </defs>
            {/* Ribbon N Shape */}
            <path
              d="M26 22 C26 18 31 16 34 19 L66 65 L66 25 C66 21 72 21 74 25 L74 78 C74 82 69 84 66 81 L34 35 L34 75 C34 79 26 79 26 75 Z"
              fill="url(#nGrad)"
            />
          </svg>

          {/* Green Verified Checkmark Badge */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-2.5 h-2.5 md:w-3 md:h-3 stroke-[3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Wordmark Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textSizes[size]} font-black tracking-tight text-slate-900 leading-none`}
            >
              Nishchinto
            </span>
            <span className="text-[11px] font-bold bg-teal-500 text-white px-1.5 py-0.5 rounded-md shadow-sm">
              .app
            </span>
          </div>

          {showBangla && (
            <span className="text-xs font-bold text-teal-600 tracking-wide mt-0.5">
              নিশ্চিন্ত
            </span>
          )}
        </div>
      </div>

      {showTagline && (
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50/60 border border-teal-200/60 text-[11px] font-bold text-slate-700 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>ব্যবসা চালান নিশ্চিন্তে</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
        </div>
      )}
    </div>
  );
}
