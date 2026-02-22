import React from "react";

export default function AISummaryButton() {
    return (
        <div className="rounded-2xl bg-white/60 p-6 border border-black/10 shadow-sm text-center">
            <h2 className="text-xl font-black mb-4">
                AI Sustainability Summary
            </h2>

            <button
                className="bg-[#324D3E] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                onClick={() => alert("AI summary coming soon...")}
            >
                Generate AI Summary
            </button>
        </div>
    );
}