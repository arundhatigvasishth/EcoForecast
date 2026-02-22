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

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-20 md:pb-20 text-black">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          
          {/* Left: Hook */}
          <div className="self-start">
            <h1 className="font-black tracking-tight leading-[0.95] text-[clamp(2.6rem,6vw,4.6rem)]">
              Financial Forecasting
              <br />
              for a greener
              <br />
              future.
            </h1>
          </div>

          {/* Right: Goals */}
          <div className="self-start">
            <h2 className="text-2xl font-black ">
              Our Goals
            </h2>

            <p className="mt-4 max-w-md leading-relaxed">
              How can small and medium-sized businesses{" "}
              <span className="font-extrabold">go green</span> without paying for{" "}
              <span className="font-extrabold">
                expensive sustainability audits
              </span>, especially when their carbon data is buried in{" "}
              <span className="font-extrabold">
                scattered receipts, utility bills, and logistics logs
              </span>?
            </p>

            <p className="mt-4 max-w-md leading-relaxed">
              EcoForecast turns scattered data into{" "}
              <span className="font-extrabold">
                clear financial projections
              </span>, enabling{" "}
              <span className="font-extrabold">
                smarter sustainability
              </span>{" "}
              decisions without{" "}
              <span className="font-extrabold">costly</span> third-party audits.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}