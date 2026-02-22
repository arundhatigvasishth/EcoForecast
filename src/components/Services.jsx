import React from "react";

const tone = {
  pistage: "bg-[#D9E4D7]",
  evergreen: "bg-[#BECFBB]",
  matcha: "bg-[#8EA48B]",
};

export default function Services() {
  const items = [
    {
      title: "Smart Data Input",
      desc: "Enter real usage + cost data to ground forecasts in reality.",
      bg: tone.pistage,
    },
    {
      title: "Monte Carlo Simulation",
      desc: "Run scenarios to understand uncertainty and range of outcomes.",
      bg: tone.evergreen,
    },
    {
      title: "Predictive Output",
      desc: "Get insights that help you plan budgets and sustainability goals.",
      bg: tone.matcha,
    },
  ];

  return (
    <section id="works" className="bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#0c120b]">
          What we do
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className={[
                "relative rounded-2xl border border-black/10 overflow-hidden",
                "min-h-[260px] p-6",
                s.bg,
              ].join(" ")}
            >
              <div className="absolute left-6 top-6 h-3.5 w-3.5 rounded-full bg-[#324D3E]" />
              <div className="pt-10">
                <h3 className="text-xl font-bold text-[#0c120b]">{s.title}</h3>
                <p className="mt-3 text-[#324D3E]/80">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}