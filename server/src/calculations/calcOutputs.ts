import type { QuarterlyInputs } from "../types";
import type { SetupAndMaint } from "./calcEcoFriendly";
import { calcYearlyBaselineAndSustainable } from "./calcEcoFriendly";

export function calcDeterministicOutputs(
    inputs: QuarterlyInputs,
    setupAndMaint: SetupAndMaint,
    years = 20,
    inflation = 0.02
) {
    const setupTotal =
        setupAndMaint.electricity.setup_cost_usd +
        setupAndMaint.water.setup_cost_usd +
        setupAndMaint.fuel.setup_cost_usd;

    const investmentVsYear: {
        year: number;
        remainingInvestment: number;
        cumulativeSavings: number;
    }[] = [];

    let cumulativeSavings = 0;
    let breakEvenYear: number | null = null;

    const y1 = calcYearlyBaselineAndSustainable(inputs, setupAndMaint);

    // 👇 DEBUG: check these values whenever graph looks wrong
    const annualMaintenance =
        setupAndMaint.electricity.annual_maintenance_usd +
        setupAndMaint.water.annual_maintenance_usd +
        setupAndMaint.fuel.annual_maintenance_usd;

    console.log("=== EcoForecast Debug ===");
    console.log("Setup total:          $" + setupTotal.toFixed(2));
    console.log("Baseline year 1:      $" + y1.baseline.total.toFixed(2));
    console.log("Sustainable year 1:   $" + y1.sustainable.total.toFixed(2));
    console.log("Annual maintenance:   $" + annualMaintenance.toFixed(2));
    console.log(
        "Annual savings:       $" +
            (y1.baseline.total - y1.sustainable.total).toFixed(2)
    );
    console.log(
        y1.baseline.total > y1.sustainable.total
            ? "✅ Sustainable is cheaper — break-even possible"
            : "❌ Sustainable is MORE expensive — break-even impossible (maintenance too high?)"
    );
    console.log("========================");

    for (let year = 1; year <= years; year++) {
        const factor = Math.pow(1 + inflation, year - 1);

        const baselineCost = y1.baseline.total * factor;
        const sustainableCost = y1.sustainable.total * factor;

        const savings = baselineCost - sustainableCost;
        cumulativeSavings += savings;

        const remainingInvestment = Math.max(setupTotal - cumulativeSavings, 0);

        if (breakEvenYear === null && remainingInvestment <= 0)
            breakEvenYear = year;

        investmentVsYear.push({ year, remainingInvestment, cumulativeSavings });
    }

    return {
        setupTotal,
        breakEvenYear: breakEvenYear ?? "Not reached in horizon",
        investmentVsYear,
        year1: y1,
    };
}
