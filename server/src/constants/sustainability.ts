export const sustainabilityConstants = {
 electricity: {
  solar_offset: 0.8,
  ma_kwh_per_kw_year: 1200,
  install_cost_per_watt: 3.0,
  maintenance_rate: 0.01,   // 1% of setup per year
  ma_grid_rate_per_kwh: 0.26,
},

  water: {
    water_offset: 0.3,
    base_capex: 25000,
    capex_per_gpd: 2.0,
    maintenance_rate: 0.08,   // 8% of setup per year
  },

  fuel: {
    mpg_avg: 22,
    ev_offset: 0.7,
    ev_premium_per_vehicle: 12000,
    charger_unit_installed: 6500,
    ev_annual_maint_per_ev: 400,
    charger_annual_maint: 150,
    miles_per_vehicle_year: 12000,
  },
} as const;