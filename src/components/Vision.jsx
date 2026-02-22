import React from "react";

export default function Vision() {
  return (
    <section className="bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#0c120b]">
          Our Vision
        </h2>
        <p className="mt-4 max-w-2xl text-[#324D3E]/80 leading-relaxed">
          We want to help businesses go greener by making sustainability choices
          easier to understand financially — so teams can plan smarter, reduce waste,
          and grow responsibly.
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
