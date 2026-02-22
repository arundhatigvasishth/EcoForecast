import React from "react";

export default function Offer() {
  return (
    <section id="about" className="bg-[#f4f1ea]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[clamp(2.7rem,6vw,5rem)] leading-[0.95] font-black">
              What We Offer
            </h2>
            <p className="mt-4 max-w-md text-black/70">
              This is the space to introduce your business and what it has to offer.
              Define the qualities and values that make it unique.
            </p>

            <button className="mt-10 inline-flex items-center justify-center rounded-sm bg-[#0c120b] px-10 py-4 text-white text-sm font-medium hover:opacity-95 active:opacity-90">
              Book Now
            </button>
          </div>

          <div className="md:justify-self-end">
            <div className="relative w-full md:w-[520px] aspect-[4/3] overflow-hidden rounded-sm border border-black/10 bg-white/40">
              <img
                src="/offer.jpg"
                alt="What we offer"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="absolute inset-0 grid place-items-center text-black/60 text-sm pointer-events-none">
                <span className="rounded-full bg-white/70 px-3 py-1 border border-black/10">
                  Add public/offer.jpg (optional)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}