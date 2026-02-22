import React from "react";

export default function ComparisonGraph() {
    return (
        <div className="rounded-2xl bg-white/60 p-6 border border-black/10 shadow-sm">
            <h2 className="text-xl font-black mb-6">
                Cost Comparison (Traditional vs Sustainable)
            </h2>

            <div className="flex justify-around items-end h-40">

                <div className="flex flex-col items-center">
                    <div className="bg-red-400 w-16 h-32 rounded-t-xl" />
                    <span className="mt-2 text-sm">Traditional</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-green-500 w-16 h-20 rounded-t-xl" />
                    <span className="mt-2 text-sm">Sustainable</span>
                </div>

            </div>

            <div className="text-sm text-[#324D3E]/70 mt-4 text-center">
                Traditional: Electricity, Water, Fuel <br />
                Sustainable: Solar, Water Recycling, EVs
            </div>
        </div>
    );
}