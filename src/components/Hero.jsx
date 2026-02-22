import React from "react";

export default function Hero() {
  return (
    <section id="home" className="bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-10 md:pt-14 md:pb-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left: hook */}
          <div>
            <div className="flex items-center gap-3">
              {/* optional logo circle (swap with an img if you want) */}
              <div className="h-10 w-10 rounded-full bg-[#324D3E] grid place-items-center">
                <span className="h-3 w-3 rounded-full bg-[#BECFBB]" />
              </div>
              <span className="text-sm text-[#324D3E]/80">
                EcoForecast
              </span>
            </div>

            <h1 className="mt-6 font-black tracking-tight leading-[0.95] text-[clamp(2.6rem,6vw,4.6rem)] text-[#0c120b]">
              Financial Forecasting
              <br />
              for a greener
              <br />
              future.
            </h1>

            <p className="mt-5 max-w-lg text-[#324D3E]/80">
              Model costs, compare scenarios, and make sustainability decisions
              with confidence.
            </p>
          </div>

          {/* Right: goals */}
          <div className="md:pt-10">
            <h2 className="text-2xl font-black text-[#0c120b]">Our Goals</h2>
            <p className="mt-3 text-[#324D3E]/80 max-w-md">
              Help teams understand the financial impact of greener choices —
              by turning real operational inputs into clear, actionable forecasts.
            </p>

            {/* subtle “wave” lines like your sketch */}
            <div className="mt-8 space-y-4">
              <div className="h-[2px] w-full max-w-md rounded bg-[#324D3E]/25" />
              <div className="h-[2px] w-full max-w-md rounded bg-[#324D3E]/20" />
              <div className="h-[2px] w-full max-w-md rounded bg-[#324D3E]/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}