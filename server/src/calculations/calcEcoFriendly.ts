import { sustainabilityConstants } from "../constants/sustainability";
import type { QuarterlyInputs } from "../types";
import { annualize } from "./annualize";

export type SetupAndMaint = {
  electricity: { setup_cost_usd: number; annual_maintenance_usd: number };
  water: { setup_cost_usd: number; annual_maintenance_usd: number };
  fuel: { setup_cost_usd: number; annual_maintenance_usd: number };
};

export type CostBreakdown = {
  electricity: number;
  water: number;
  fuel: number;
  total: number;
};

export type SustainableBreakdown = {
  electricity_grid: number;
  electricity_ev_charging: number;
  water: number;
  fuel: number;
  maintenance: number;
  total: number;
};

export type Emissions = {
  baselineKgCO2e: number;
  sustainableKgCO2e: number;
};

// model params (not clinic values)
const EV_KWH_PER_MILE = 0.33;

// emissions factors (kg CO2e per unit) — model constants
const EF = {
  electricity_kg_per_kwh: 0.30,
  gasoline_kg_per_gallon: 8.89,
  water_kg_per_gallon: 0.0003,
};

export function calcYearlyBaselineAndSustainable(
  inputs: QuarterlyInputs,
  setupAndMaint: SetupAndMaint
) {
  const c = sustainabilityConstants;
  const { annualUsage, annualCost, unitCost } = annualize(inputs);

  const baseline: CostBreakdown = {
    electricity: annualCost.electricity,
    water: annualCost.water,
    fuel: annualCost.fuel,
    total: annualCost.total,
  };

  const solarOffset = c.electricity.solar_offset;
  const waterOffset = c.water.water_offset;
  const evOffset = c.fuel.ev_offset;
  const mpg = c.fuel.mpg_avg;

  const gridKwhAfterSolar = annualUsage.electricity_kwh * (1 - solarOffset);
  const waterAfter = annualUsage.water_gal * (1 - waterOffset);
  const fuelAfter = annualUsage.fuel_gal * (1 - evOffset);

  const evMiles = annualUsage.fuel_gal * evOffset * mpg;
  const evChargingKwh = evMiles * EV_KWH_PER_MILE;

  const maintTotal =
    setupAndMaint.electricity.annual_maintenance_usd +
    setupAndMaint.water.annual_maintenance_usd +
    setupAndMaint.fuel.annual_maintenance_usd;

const gridRate = c.electricity.ma_grid_rate_per_kwh;

const sustainable: SustainableBreakdown = {
  electricity_grid: gridKwhAfterSolar * gridRate,
  electricity_ev_charging: evChargingKwh * gridRate,
    water: waterAfter * unitCost.water_per_gal,
    fuel: fuelAfter * unitCost.fuel_per_gal,
    maintenance: maintTotal,
    total: 0,
  };

  sustainable.total =
    sustainable.electricity_grid +
    sustainable.electricity_ev_charging +
    sustainable.water +
    sustainable.fuel +
    sustainable.maintenance;

  const baselineKgCO2e =
    annualUsage.electricity_kwh * EF.electricity_kg_per_kwh +
    annualUsage.fuel_gal * EF.gasoline_kg_per_gallon +
    annualUsage.water_gal * EF.water_kg_per_gallon;

  const sustainableKgCO2e =
    (gridKwhAfterSolar + evChargingKwh) * EF.electricity_kg_per_kwh +
    fuelAfter * EF.gasoline_kg_per_gallon +
    waterAfter * EF.water_kg_per_gallon;

  const emissions: Emissions = { baselineKgCO2e, sustainableKgCO2e };

  return { baseline, sustainable, emissions };
}