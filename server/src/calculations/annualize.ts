import type { QuarterlyInputs } from "../types";

export function annualize(inputs: QuarterlyInputs) {
  const sumUsage = (arr: { usage: number }[]) => arr.reduce((s, x) => s + x.usage, 0);
  const sumCost = (arr: { cost: number }[]) => arr.reduce((s, x) => s + x.cost, 0);

  const eUsage = sumUsage(inputs.electricity);
  const wUsage = sumUsage(inputs.water);
  const fUsage = sumUsage(inputs.fuel);

  const eCost = sumCost(inputs.electricity);
  const wCost = sumCost(inputs.water);
  const fCost = sumCost(inputs.fuel);

  return {
    annualUsage: {
      electricity_kwh: eUsage,
      water_gal: wUsage,
      fuel_gal: fUsage,
    },
    annualCost: {
      electricity: eCost,
      water: wCost,
      fuel: fCost,
      total: eCost + wCost + fCost,
    },
    unitCost: {
      electricity_per_kwh: eUsage > 0 ? eCost / eUsage : 0,
      water_per_gal: wUsage > 0 ? wCost / wUsage : 0,
      fuel_per_gal: fUsage > 0 ? fCost / fUsage : 0,
    },
  };
}