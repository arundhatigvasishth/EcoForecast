import React from "react";

export default function Marquee({ text }) {
  return (
    <div className="border-y border-black/10 bg-[#9bff84] overflow-hidden">
      <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap py-3 text-sm font-medium">
        <span className="mx-6">{text}</span>
        <span className="mx-6">{text}</span>
        <span className="mx-6">{text}</span>
        <span className="mx-6">{text}</span>
        <span className="mx-6">{text}</span>
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