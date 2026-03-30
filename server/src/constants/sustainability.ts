export const sustainabilityConstants = {
    electricity: {
        solar_offset: 0.8,
        ma_kwh_per_kw_year: 1200,
        install_cost_per_watt: 3.0,
        maintenance_rate: 0.01, // 1% of setup per year
        ma_grid_rate_per_kwh: 0.26,
    },

    water: {
        water_offset: 0.3,
        base_capex: 25000,
        capex_per_gpd: 2.0,
        maintenance_rate: 0.02, // ✅ fixed: was 0.08 (8% was way too high)
    },

    fuel: {
        mpg_avg: 22,
        ev_offset: 0.7,
        ev_premium_per_vehicle: 5000, // ✅ reduced: just the upgrade premium, not full vehicle cost
        charger_unit_installed: 3000, // ✅ reduced: Level 2 charger installed cost
        ev_annual_maint_per_ev: 300,
        charger_annual_maint: 100,
        miles_per_vehicle_year: 25000, // ✅ increased: commercial vehicles drive more
    },
} as const;
