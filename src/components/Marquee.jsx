import React from "react";

export default function Marquee() {
  const text = "Go Greener. Spend Smarter. Earn More.";

  return (
    <div className="border-y border-black/10 bg-[#BECFBB] overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap py-3 text-sm font-semibold text-[#324D3E]">
        {/* First set */}
        {[...Array(8)].map((_, i) => (
          <span key={`first-${i}`} className="mx-8">
            {text}
          </span>
        ))}

        {/* Duplicate set for seamless loop */}
        {[...Array(8)].map((_, i) => (
          <span key={`second-${i}`} className="mx-8">
            {text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}