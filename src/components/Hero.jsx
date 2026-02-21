import React from "react";

export default function Hero() {
  return (
    <section id="home" className="bg-[#f4f1ea]">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="relative">
          <h1 className="leading-[0.9] font-black tracking-tight text-[clamp(3rem,7vw,6.25rem)]">
            We Specialize in
            <br />
            Strategy, Design &amp;
            <br />
            Marketing
          </h1>

          <a
            href="#contact"
            className="absolute right-0 top-10 md:top-16 md:translate-x-10
                       h-28 w-28 md:h-32 md:w-32 rounded-full bg-[#0c120b] text-white
                       grid place-items-center text-sm font-medium shadow-lg
                       hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}