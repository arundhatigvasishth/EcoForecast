import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreakEven from "./Components/BreakEven";
import InvestmentGraph from "./Components/graph1";
import ComparisonGraph from "./Components/graph2";
import CarbonFootprint from "./Components/carbonFootPrintBar";
import AISummaryButton from "./Components/AISummaryButton";

const OutputsPage = () => {
    const { id } = useParams();
    const [computed, setComputed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOutput() {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/outputs/${id}`
                );
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                const data = await res.json();
                setComputed(data.computed);
            } catch (err) {
                console.error("Failed to fetch output data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOutput();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f4f0]">
                <p className="text-lg text-[#324D3E] font-semibold animate-pulse">
                    Loading sustainability data…
                </p>
            </div>
        );
    }

    if (error || !computed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f4f0]">
                <p className="text-red-500 font-semibold">
                    Failed to load data: {error ?? "Unknown error"}
                </p>
            </div>
        );
    }

    const {
        breakEven,
        investmentVsYear = [],
        costComparisonYear1,
        carbonYear1,
    } = computed;

    // costComparisonYear1 = { baseline: { electricity, water, fuel, total, ... }, sustainable: { ... } }
    // Transform into [{ category, Traditional, Sustainable }] for ComparisonGraph
    // Filter out non-numeric values and the 'total' key for cleaner per-category view
    const costProjectionData = costComparisonYear1?.baseline
        ? Object.keys(costComparisonYear1.baseline)
              .filter((key) => {
                  const val = costComparisonYear1.baseline[key];
                  return typeof val === "number";
              })
              .map((key) => ({
                  category: key,
                  Traditional: costComparisonYear1.baseline[key] ?? 0,
                  Sustainable: costComparisonYear1.sustainable?.[key] ?? 0,
              }))
        : [];

    // carbonYear1 = { baselineKgCO2e, sustainableKgCO2e }
    // Project 20 years: baseline stays flat, sustainable improves 3% per year
    const carbonData = carbonYear1
        ? Array.from({ length: 20 }, (_, i) => ({
              year: `Year ${i + 1}`,
              Baseline: carbonYear1.baselineKgCO2e,
              Sustainable: carbonYear1.sustainableKgCO2e * Math.pow(0.97, i),
          }))
        : [];

    return (
        <div className="min-h-screen bg-[#f0f4f0] px-6 py-10">
            <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-3xl font-black text-[#324D3E]">
                    Sustainability Report
                </h1>
                <p className="text-sm text-gray-500 mt-1">ID: {id}</p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Break-even */}
                <BreakEven year={breakEven ?? "Not reached in horizon"} />

                {/* Investment vs Year — already an array */}
                {investmentVsYear.length > 0 && (
                    <InvestmentGraph
                        data={investmentVsYear}
                        breakEven={breakEven}
                    />
                )}

                {/* Cost Comparison — transformed from costComparisonYear1 */}
                {costProjectionData.length > 0 && (
                    <ComparisonGraph data={costProjectionData} />
                )}

                {/* Carbon Footprint — transformed from carbonYear1 */}
                {carbonData.length > 0 && <CarbonFootprint data={carbonData} />}

                {/* AI Summary */}
                <AISummaryButton />
            </div>
        </div>
    );
};

export default OutputsPage;
