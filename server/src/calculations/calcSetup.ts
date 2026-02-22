import { sustainabilityConstants } from "../constants/sustainability";
import type { QuarterlyInputs } from "../types";

export function calculateSetupAndMaintenance(inputs: QuarterlyInputs) {
  const c = sustainabilityConstants;

  // --- Annual totals ---
  const annualKwh = inputs.electricity.reduce((sum, q) => sum + q.usage, 0);
  const annualWater = inputs.water.reduce((sum, q) => sum + q.usage, 0);
  const annualFuel = inputs.fuel.reduce((sum, q) => sum + q.usage, 0);

  // ========================
  // ELECTRICITY (SOLAR)
  // ========================

  const solarTarget = annualKwh * c.electricity.solar_offset;
  const systemKw = solarTarget / c.electricity.ma_kwh_per_kw_year;

  const solarSetup = systemKw * 1000 * c.electricity.install_cost_per_watt;

  const solarMaintenance = solarSetup * c.electricity.maintenance_rate;

  // ========================
  // WATER
  // ========================

  const waterTarget = annualWater * c.water.water_offset;
  const gpd = waterTarget / 365;

  const waterSetup = c.water.base_capex + gpd * c.water.capex_per_gpd;

  const waterMaintenance = waterSetup * c.water.maintenance_rate;

  // ========================
  // FUEL → EV
  // ========================

  const annualMiles = annualFuel * c.fuel.mpg_avg;
  const numVehicles = Math.ceil(annualMiles / c.fuel.miles_per_vehicle_year);

  const numEVs = Math.ceil(numVehicles * c.fuel.ev_offset);

  const numChargers = Math.ceil(numEVs / 2);

  const evSetup =
    numEVs * c.fuel.ev_premium_per_vehicle +
    numChargers * c.fuel.charger_unit_installed;

  const evMaintenance =
    numEVs * c.fuel.ev_annual_maint_per_ev +
    numChargers * c.fuel.charger_annual_maint;

  return {
    electricity: {
      setup_cost_usd: solarSetup,
      annual_maintenance_usd: solarMaintenance,
    },
    water: {
      setup_cost_usd: waterSetup,
      annual_maintenance_usd: waterMaintenance,
    },
    fuel: {
      setup_cost_usd: evSetup,
      annual_maintenance_usd: evMaintenance,
    },
  };
}