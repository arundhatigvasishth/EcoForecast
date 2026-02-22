import React from "react";

export default function CarbonFootprint() {
    return (
        <div className="rounded-2xl bg-white/60 p-6 border border-black/10 shadow-sm">
            <h2 className="text-xl font-black mb-4">
                Carbon Footprint Projection
            </h2>

            <div className="flex items-end gap-4 h-40">

                {[80, 70, 55, 40, 25].map((val, i) => (
                    <div
                        key={i}
                        className="bg-[#324D3E] w-10 rounded-t-lg"
                        style={{ height: `${val}%` }}
                    />
                ))}

            </div>

            <p className="mt-4 text-sm text-[#324D3E]/70">
                CO₂ emissions expected to decline annually with sustainable adoption.
            </p>
        </div>
    );
}