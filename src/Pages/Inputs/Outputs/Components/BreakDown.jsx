import React from "react";

export default function Breakdown() {
    return (
        <div className="rounded-2xl bg-white/60 p-6 border border-black/10 shadow-sm">
            <h2 className="text-xl font-black mb-4">Output Breakdown</h2>

            <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-3 bg-white/70 rounded-xl border border-black/10"
                    >
                        Placeholder metric #{i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}