import React from "react";
import { useNavigate } from "react-router-dom";

import Breakdown from "./components/Breakdown";
import BreakEven from "EcoForecast/src/Pages/Inputs/Outputs/Components/BreakEven.jsx";
import InvestmentGraph from "./components/InvestmentGraph";
import ComparisonGraph from "./components/ComparisonGraph";
import CarbonFootprint from "./components/CarbonFootprint";
import AISummaryButton from "./components/AISummaryButton";

export default function OutputsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#D9E4D7] text-[#0c120b]">
            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-black">
                            Sustainability Outputs
                        </h1>
                        <p className="text-[#324D3E]/80 mt-2">
                            Compare traditional vs sustainable impact.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/inputs")}
                        className="rounded-xl bg-[#324D3E] text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
                    >
                        Edit Inputs
                    </button>
                </div>

                <div className="mt-10 space-y-10">
                    <Breakdown />
                    <BreakEven />
                    <InvestmentGraph />
                    <ComparisonGraph />
                    <CarbonFootprint />
                    <AISummaryButton />
                </div>

            </div>
        </div>
    );
}