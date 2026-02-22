import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breakdown from "./Components/Breakdown";
import BreakEven from "./Components/BreakEven";
import InvestmentGraph from "./Components/graph1";
import ComparisonGraph from "./Components/graph2";
import CarbonFootprint from "./Components/carbonFootPrintBar";
import AISummaryButton from "./Components/AISummaryButton";

export default function OutputsPage() {
    const navigate = useNavigate();
    const [computed, setComputed] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/api/outputs/699a4386790df6e6308b3f52")
            .then((res) => res.json())
            .then((data) => {
                console.log("FULL RESPONSE:", data);
                setComputed(data.computed);
            });
    }, []);
    if (!computed) {
        return <div className="p-10">Loading...</div>;
    }
    /*const costData = [
        {
            name: "Year 1",
            Traditional: computed.costComparisonYear1.baseline.total,
            Sustainable: computed.costComparisonYear1.sustainable.total,
        },
    ];*/

    /*const carbonData = [
        {
            name: "Year 1",
            Baseline: computed.carbonYear1.baselineKgCO2e,
            Sustainable: computed.carbonYear1.sustainableKgCO2e,
        },
    ];*/
    /*const costProjectionData = computed.investmentVsYear.map((item) => ({
        year: item.year,
        Traditional: item.cumulativeSavings + item.remainingInvestment,
        Sustainable: item.remainingInvestment,
    }));*/
    const baseTraditional = computed.costComparisonYear1.baseline.total;
    const baseSustainable = computed.costComparisonYear1.sustainable.total;

    const costProjectionData = computed.investmentVsYear
        .slice(0, 10)
        .map((item) => ({
            year: item.year,
            Traditional: baseTraditional * Math.pow(1.02, item.year - 1), // assume 2% inflation
            Sustainable: baseSustainable * Math.pow(1.01, item.year - 1), // slower growth
        }));
    const baseCarbonTraditional = computed.carbonYear1.baselineKgCO2e;
    const baseCarbonSustainable = computed.carbonYear1.sustainableKgCO2e;

    const carbonProjectionData = computed.investmentVsYear
        .slice(0, 10)
        .map((item) => ({
            year: item.year,
            Baseline: baseCarbonTraditional * Math.pow(0.99, item.year - 1), // slight efficiency
            Sustainable: baseCarbonSustainable * Math.pow(0.97, item.year - 1), // stronger reduction
        }));
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
                    {/*<Breakdown />*/}
                    <BreakEven year={computed.breakEven} />
                    <InvestmentGraph
                        data={computed.investmentVsYear}
                        breakEven={computed.breakEven}
                    />
                    <ComparisonGraph data={costProjectionData} />
                    <CarbonFootprint data={carbonProjectionData} />
                    <AISummaryButton />
                </div>
            </div>
        </div>
    );
}
