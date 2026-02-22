import React from "react";

export default function InvestmentGraph() {
    const years = [2025, 2026, 2027, 2028, 2029];

    return (
        <div className="rounded-2xl bg-white/60 p-6 border border-black/10 shadow-sm">
            <h2 className="text-xl font-black mb-4">
                Investment vs Year
            </h2>

            <div className="space-y-3">
                {years.map((year, i) => (
                    <div key={year} className="flex items-center gap-4">
                        <div className="w-16 font-semibold">{year}</div>
                        <div className="flex-1 bg-black/10 rounded-full h-3">
                            <div
                                className="bg-[#324D3E] h-3 rounded-full"
                                style={{ width: `${20 + i * 15}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}