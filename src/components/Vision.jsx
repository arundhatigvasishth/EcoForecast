import React from "react";

export default function Vision() {
  return (
    <section className="bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#0c120b]">
          Our Vision
        </h2>
        <p className="mt-4 max-w-2xl text-[#324D3E]/80 leading-relaxed">
          EcoForecast was built to bridge the gap between sustainability initiatives and financial decision-making. Too often, organizations are forced to choose between environmental responsibility and budget certainty. We believe you should never have to guess the financial impact of smarter operational choices.
          By transforming real quarterly cost and usage data into structured forecasts, we provide leaders with the clarity they need to plan ahead, reduce uncertainty, and operate more efficiently. Our platform turns sustainability from a risk into a measurable opportunity.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white/35 p-5">
            <div className="text-sm font-semibold text-[#324D3E]">Clarity</div>
            <div className="mt-2 text-[#324D3E]/80 text-sm">
              Translate inputs into readable outcomes.
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/35 p-5">
            <div className="text-sm font-semibold text-[#324D3E]">Confidence</div>
            <div className="mt-2 text-[#324D3E]/80 text-sm">
              Explore scenarios before committing budget.
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/35 p-5">
            <div className="text-sm font-semibold text-[#324D3E]">Impact</div>
            <div className="mt-2 text-[#324D3E]/80 text-sm">
              Make choices that reduce footprint over time.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
