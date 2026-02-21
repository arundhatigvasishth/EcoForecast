import React from "react";

function toneClasses(tone) {
  switch (tone) {
    case "lavender":
      return "bg-[#cfd0ff]";
    case "mint":
      return "bg-[#a8ffae]";
    default:
      return "bg-[#f3f1ea]";
  }
}

export default function Services({ items }) {
  return (
    <section id="works" className="bg-[#0c120b] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-16 md:pt-20 md:pb-20">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-black">
          Our Services
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          Describe the service and how your customers or clients can benefit from it.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className={[
                "relative rounded-2xl border border-black/10 overflow-hidden",
                "min-h-[280px] flex flex-col justify-end",
                toneClasses(s.tone),
              ].join(" ")}
            >
              <div className="absolute left-6 top-6 h-4 w-4 rounded-full bg-black" />
              <div className="p-6 text-black">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-black/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}