import React from "react";

export default function Marquee() {
  const text = "Go Greener. Spend Smarter. Earn More.";

  return (
    <div className="border-y border-black/10 bg-[#BECFBB] overflow-hidden">
      <div className="animate-[marquee_16s_linear_infinite] whitespace-nowrap py-3 text-sm font-semibold text-[#324D3E]">
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}