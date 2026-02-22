import React from "react";

const tone = {
  matcha: "bg-[#8EA48B]",
  earlygreen: "bg-[#728A6E]",
  calmgreen: "bg-[#324D3E]",
};

export default function Services() {
  const items = [
    {
      title: "Smart Data Input",
      desc: "Enter your quarterly energy, water, and fuel usage along with associated operating costs. By grounding projections in your real financial and resource data, we create a personalized foundation for accurate forecasting and strategic planning.",
      bg: tone.matcha,
      text: "text-[#2B4336]",
    },
    {
      title: "Strategic Financial Analysis",
      desc: "We apply advanced financial modeling to assess cost patterns, evaluate uncertainty, and project future performance. By analyzing a range of potential scenarios, we deliver structured forecasts grounded in real operational data.",
      bg: tone.earlygreen,
      text: "text-[#2B4336]",
    },
    {
      title: "Predictive Output",
      desc: "Receive clear, forward-looking financial projections that help you understand how sustainability decisions may impact your future costs and efficiency. Our forecasts provide visibility into spending trends, risk exposure, and long-term financial performance, empowering you to plan with confidence.",
      bg: tone.calmgreen,
      text: "text-[#8EA48B]",
    },
  ];

  return (
    <section id="works" className="bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#2B4336]">
          Can sustainability become your financial advantage?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className={[
                "relative rounded-2xl border border-black/10 overflow-hidden",
                "min-h-[260px] p-6 transition hover:shadow-md hover:-translate-y-1",
                s.bg,
              ].join(" ")}
            >
              {/* Pistage Bullet */}
              <div className="absolute left-6 top-6 h-3.5 w-3.5 rounded-full bg-[#D9E4D7]" />

              <div className="pt-10">
                <h3 className={`text-xl font-bold ${s.text}`}>
                  {s.title}
                </h3>

                <p className={`mt-3 ${s.text} opacity-90`}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}