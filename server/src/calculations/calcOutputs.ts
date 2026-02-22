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

  const investmentVsYear: { year: number; remainingInvestment: number; cumulativeSavings: number }[] = [];

  let cumulativeSavings = 0;
  let breakEvenYear: number | null = null;

  // start from year-1 baseline & sustainable costs
  const y1 = calcYearlyBaselineAndSustainable(inputs, setupAndMaint);

  // We inflate both baseline & sustainable each year with same inflation for deterministic projection
  for (let year = 1; year <= years; year++) {
    const factor = Math.pow(1 + inflation, year - 1);

    const baselineCost = y1.baseline.total * factor;
    const sustainableCost = y1.sustainable.total * factor;

    const savings = baselineCost - sustainableCost;
    cumulativeSavings += savings;

    const remainingInvestment = Math.max(setupTotal - cumulativeSavings, 0);

    if (breakEvenYear === null && remainingInvestment <= 0) breakEvenYear = year;

    investmentVsYear.push({ year, remainingInvestment, cumulativeSavings });
  }

  return {
    setupTotal,
    breakEvenYear: breakEvenYear ?? "Not reached in horizon",
    investmentVsYear,
    year1: y1, // Graph 2 + Carbon Year 1
  };
}