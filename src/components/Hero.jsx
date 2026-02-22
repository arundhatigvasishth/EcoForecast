import React from "react";
import heroBg from "../assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Reduced overlay for better image visibility */}
      <div className="absolute inset-0 bg-[#D9E4D7]/40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          
          {/* Left: Hook */}
          <div className="self-start">
            <h1 className="font-black tracking-tight leading-[0.95] text-[clamp(2.6rem,6vw,4.6rem)] text-[#0c120b]">
              Financial Forecasting
              <br />
              for a greener
              <br />
              future.
            </h1>
          </div>

          {/* Right: Goals */}
          <div className="self-start">
            <h2 className="text-2xl font-black text-[#0c120b]">
              Our Goals
            </h2>

            <p className="mt-4 text-[#2B4336]/90 max-w-md leading-relaxed">
              Sustainable transformation shouldn't be reserved for organizations
              with large audit budgets. Yet for many small and medium-sized
              businesses, carbon-related data lives in scattered receipts,
              invoices, and operational logs, making it difficult to identify
              the areas that truly matter.
            </p>

            <p className="mt-4 text-[#2B4336]/90 max-w-md leading-relaxed">
              EcoForecast centralizes that information, transforms it into
              structured financial projections, and empowers teams to pursue
              sustainability with clarity and confidence and without the cost
              and complexity of traditional third-party audits.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}