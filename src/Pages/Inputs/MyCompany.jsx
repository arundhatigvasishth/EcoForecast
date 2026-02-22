import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyCompany() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#D9E4D7] text-[#324D3E]">
      <div className="mx-auto max-w-6xl px-6 py-14">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">
              Riverbend Community Health Clinic
            </h1>
            <p className="mt-2 text-[#324D3E]/70">
              Springfield, Massachusetts • Mid-Sized Outpatient Facility
            </p>
          </div>

          <button
            onClick={() => navigate("/inputs")}
            className="rounded-xl bg-[#324D3E] px-6 py-3 text-white font-semibold hover:bg-[#2a4034] transition"
          >
            + New Forecast
          </button>
        </div>

        {/* OVERVIEW SECTION */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {/* PROFILE CARD */}
          <div className="rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm p-6 shadow-sm">
            <h2 className="text-lg font-extrabold">Company Profile</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Industry</span>
                <span>Healthcare (Outpatient Clinic)</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Employees</span>
                <span>86 Full-Time Staff</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Annual Patients</span>
                <span>~18,400</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Facility Size</span>
                <span>32,000 sq ft</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Energy Mix</span>
                <span>Grid + 18% Solar Offset</span>
              </div>

              <div className="pt-3 border-t border-black/10 text-[#324D3E]/70">
                Riverbend Clinic serves the greater Hampden County region,
                focusing on primary care, women’s health, and preventative services.
                The clinic is actively evaluating sustainable upgrades to reduce
                operating costs and environmental impact.
              </div>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <div className="rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm p-6 shadow-sm">
            <h2 className="text-lg font-extrabold">Sustainability Snapshot</h2>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <Stat label="Last Forecast Year" value="2025" />
              <Stat label="Projected 5-Year Savings" value="$184,200" />
              <Stat label="Carbon Reduction Goal" value="28%" />
              <Stat label="Energy Cost Trend" value="↑ 6.2% YoY" />

            </div>

            <div className="mt-6 text-sm text-[#324D3E]/70">
              Based on the most recent quarterly data submission and projected
              operational scaling.
            </div>
          </div>

        </div>

        {/* SAVED RUNS SECTION */}
        <div className="mt-14">
          <h2 className="text-2xl font-black">
            Previous Forecast Runs
          </h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-white/60 text-[#324D3E]/80">
                <tr>
                  <th className="text-left px-6 py-4">Date</th>
                  <th className="text-left px-6 py-4">Scenario</th>
                  <th className="text-left px-6 py-4">Projected Savings</th>
                  <th className="text-left px-6 py-4">Carbon Reduction</th>
                  <th className="text-left px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <RunRow
                  date="March 12, 2026"
                  scenario="Solar Expansion Phase II"
                  savings="$72,400"
                  carbon="14%"
                  status="Recommended"
                />
                <RunRow
                  date="January 3, 2026"
                  scenario="Water Recycling System"
                  savings="$41,800"
                  carbon="9%"
                  status="Under Review"
                />
                <RunRow
                  date="October 18, 2025"
                  scenario="Fleet Electrification"
                  savings="$69,900"
                  carbon="11%"
                  status="Approved"
                />
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/50 px-4 py-4">
      <div className="text-xs font-semibold text-[#324D3E]/70">
        {label}
      </div>
      <div className="mt-2 text-lg font-extrabold">
        {value}
      </div>
    </div>
  );
}

function RunRow({ date, scenario, savings, carbon, status }) {
  return (
    <tr className="hover:bg-white/60 transition">
      <td className="px-6 py-4">{date}</td>
      <td className="px-6 py-4 font-semibold">{scenario}</td>
      <td className="px-6 py-4">{savings}</td>
      <td className="px-6 py-4">{carbon}</td>
      <td className="px-6 py-4">
        <span className="rounded-full bg-[#D9E4D7] px-3 py-1 text-xs font-semibold border border-black/10">
          {status}
        </span>
      </td>
    </tr>
  );
}