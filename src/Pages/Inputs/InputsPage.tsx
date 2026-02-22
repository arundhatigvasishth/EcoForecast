import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QuarterlyInputs, QuarterInputs } from "./Types";
import { DEFAULT_QUARTER_INPUTS } from "./Types";
import { save4QuartersToMongo } from "./API";
import { validateInputs, toNumberOrNull, isValidNonNegative } from "./validators";

function calcPreview(inputs: QuarterlyInputs) {
  const ePaid = toNumberOrNull(inputs.electricity.amountPaid);
  const wPaid = toNumberOrNull(inputs.water.amountPaid);
  const fPaid = toNumberOrNull(inputs.fuel.amountPaid);

  const e = isValidNonNegative(ePaid) ? ePaid! : null;
  const w = isValidNonNegative(wPaid) ? wPaid! : null;
  const f = isValidNonNegative(fPaid) ? fPaid! : null;

  const total = (e ?? 0) + (w ?? 0) + (f ?? 0);
  return { e, w, f, total };
}

type QKey = keyof QuarterInputs; // "q1" | "q2" | "q3" | "q4"

const QUARTER_LABELS: Record<QKey, string> = {
  q1: "1st Quarter (Q1)",
  q2: "2nd Quarter (Q2)",
  q3: "3rd Quarter (Q3)",
  q4: "4th Quarter (Q4)",
};

function moneyOrDash(n: number | null) {
  if (n === null || Number.isNaN(n)) return "—";
  return `$${n.toFixed(2)}`;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/35 backdrop-blur-sm p-5 shadow-sm">
      {children}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/40 px-3 py-2">
      <div className="text-xs font-semibold text-[#324D3E]/70">{label}</div>
      <div className="text-sm font-extrabold text-[#324D3E]">{value}</div>
    </div>
  );
}

export default function InputsPage() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [quarters, setQuarters] = useState<QuarterInputs>(DEFAULT_QUARTER_INPUTS);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const previews = useMemo(() => {
    const p1 = calcPreview(quarters.q1);
    const p2 = calcPreview(quarters.q2);
    const p3 = calcPreview(quarters.q3);
    const p4 = calcPreview(quarters.q4);

    const yearlyTotal = (p1.total ?? 0) + (p2.total ?? 0) + (p3.total ?? 0) + (p4.total ?? 0);
    return { q1: p1, q2: p2, q3: p3, q4: p4, yearlyTotal };
  }, [quarters]);

  function updateField(
    q: QKey,
    key: keyof QuarterlyInputs,
    field: "usage" | "amountPaid",
    value: string
  ) {
    setSuccess("");
    setError("");

    // keep your original behavior (empty string allowed)
    const parsed: number | "" = value === "" ? "" : Number(value);

    setQuarters((prev) => ({
      ...prev,
      [q]: {
        ...prev[q],
        [key]: {
          ...prev[q][key],
          [field]: parsed,
        },
      },
    }));
  }

  function onClear() {
    setCompany("");
    setQuarters(DEFAULT_QUARTER_INPUTS);
    setError("");
    setSuccess("");
  }

  async function onSave() {
    setError("");
    setSuccess("");

    if (!company.trim()) {
      setError("Please enter a company/clinic name.");
      return;
    }

    const order: QKey[] = ["q1", "q2", "q3", "q4"];
    for (const q of order) {
      const err = validateInputs(quarters[q]);
      if (err) {
        setError(`${QUARTER_LABELS[q]}: ${err}`);
        return;
      }
    }

    try {
      setSaving(true);
      const id = await save4QuartersToMongo(company.trim(), quarters);
      sessionStorage.setItem("latest_input_id", id);
      setSuccess(`Saved! (id: ${id})`);
      navigate("/outputs");
    } catch (e: any) {
      setError(e?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#D9E4D7]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#324D3E]">
            Yearly Inputs
          </h1>
          <p className="text-[#324D3E]/80 max-w-2xl">
            Enter resource usage and amount paid for each quarter. We’ll calculate a spend preview
            before you continue.
          </p>
        </div>

        {/* Alerts */}
        {(error || success) && (
          <div className="mt-6 space-y-3">
            {error && (
              <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">
                <div className="font-semibold">Fix this before continuing</div>
                <div className="text-sm mt-1">{error}</div>
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-950">
                <div className="font-semibold">Saved</div>
                <div className="text-sm mt-1">{success}</div>
              </div>
            )}
          </div>
        )}

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Left: form */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#324D3E]">Company / Clinic</h2>
                  <p className="text-sm text-[#324D3E]/70 mt-1">
                    This name will be associated with the saved quarterly records.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-semibold text-[#324D3E]">
                  Name <span className="text-[#324D3E]/60">(required)</span>
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Sunrise Community Clinic"
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3
                             text-[#324D3E] placeholder:text-[#324D3E]/40
                             outline-none focus:ring-2 focus:ring-[#324D3E]/30"
                />
              </div>
            </Card>

            <QuarterSection
              title={QUARTER_LABELS.q1}
              inputs={quarters.q1}
              previewTotal={previews.q1.total}
              onChange={(key, field, value) => updateField("q1", key, field, value)}
            />
            <QuarterSection
              title={QUARTER_LABELS.q2}
              inputs={quarters.q2}
              previewTotal={previews.q2.total}
              onChange={(key, field, value) => updateField("q2", key, field, value)}
            />
            <QuarterSection
              title={QUARTER_LABELS.q3}
              inputs={quarters.q3}
              previewTotal={previews.q3.total}
              onChange={(key, field, value) => updateField("q3", key, field, value)}
            />
            <QuarterSection
              title={QUARTER_LABELS.q4}
              inputs={quarters.q4}
              previewTotal={previews.q4.total}
              onChange={(key, field, value) => updateField("q4", key, field, value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClear}
                disabled={saving}
                className="rounded-xl border border-black/10 bg-white/40 px-5 py-3 font-semibold text-[#324D3E]
                           hover:bg-white/60 transition disabled:opacity-60"
              >
                Clear
              </button>

              <button
                onClick={onSave}
                disabled={saving}
                className="rounded-xl bg-[#324D3E] px-5 py-3 font-semibold text-white
                           hover:bg-[#2a4034] transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </div>

          {/* Right: sticky summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#324D3E]/80">Yearly Total Spend</div>
                  <div className="mt-2 text-3xl font-black text-[#324D3E]">
                    ${previews.yearlyTotal.toFixed(2)}
                  </div>
                  <div className="mt-2 text-sm text-[#324D3E]/70">
                    Preview based on quarterly “Amount Paid” fields.
                  </div>
                </div>

                <div className="h-10 w-10 rounded-2xl bg-white/50 border border-black/10 grid place-items-center">
                  <span className="text-[#324D3E] font-black">$</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <MiniStat label="Q1" value={moneyOrDash(previews.q1.total)} />
                <MiniStat label="Q2" value={moneyOrDash(previews.q2.total)} />
                <MiniStat label="Q3" value={moneyOrDash(previews.q3.total)} />
                <MiniStat label="Q4" value={moneyOrDash(previews.q4.total)} />
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold text-[#324D3E]">Tips</div>
              <ul className="mt-2 text-sm text-[#324D3E]/75 space-y-2">
                <li>• Use non-negative numbers only.</li>
                <li>• Fill all fields before saving (validators will guide you).</li>
                <li>• Units are flexible (kWh, gallons/liters, miles) — be consistent per quarter.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuarterSection(props: {
  title: string;
  inputs: QuarterlyInputs;
  previewTotal: number | null;
  onChange: (key: keyof QuarterlyInputs, field: "usage" | "amountPaid", value: string) => void;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-[#324D3E]">{props.title}</h2>
          <p className="text-sm text-[#324D3E]/70 mt-1">
            Enter usage + amount paid for each category.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-semibold text-[#324D3E]/70">Spend Preview</div>
          <div className="text-lg font-black text-[#324D3E]">
            {props.previewTotal === null ? "—" : `$${props.previewTotal.toFixed(2)}`}
          </div>
        </div>
      </div>

      {/* Header row (desktop) */}
      <div className="mt-5 hidden md:grid grid-cols-[220px_1fr_1fr] gap-3 text-xs font-bold text-[#324D3E]/70">
        <div>Category</div>
        <div>Usage (Quarter)</div>
        <div>Amount Paid (Quarter)</div>
      </div>

      <div className="mt-3 space-y-3">
        <Row
          label="Electricity"
          hint="kWh"
          usage={props.inputs.electricity.usage}
          paid={props.inputs.electricity.amountPaid}
          onUsage={(v) => props.onChange("electricity", "usage", v)}
          onPaid={(v) => props.onChange("electricity", "amountPaid", v)}
        />
        <Row
          label="Water"
          hint="gallons (or liters)"
          usage={props.inputs.water.usage}
          paid={props.inputs.water.amountPaid}
          onUsage={(v) => props.onChange("water", "usage", v)}
          onPaid={(v) => props.onChange("water", "amountPaid", v)}
        />
        <Row
          label="Fuel"
          hint="gallons (or miles)"
          usage={props.inputs.fuel.usage}
          paid={props.inputs.fuel.amountPaid}
          onUsage={(v) => props.onChange("fuel", "usage", v)}
          onPaid={(v) => props.onChange("fuel", "amountPaid", v)}
        />
      </div>

      <div className="mt-5 border-t border-black/10 pt-4 text-sm text-[#324D3E]/80">
        <span className="font-semibold">Quarter Spend Preview:</span>{" "}
        <span className="font-extrabold text-[#324D3E]">
          {props.previewTotal === null ? "—" : `$${props.previewTotal.toFixed(2)}`}
        </span>
      </div>
    </Card>
  );
}

function Row(props: {
  label: string;
  hint: string;
  usage: number | "";
  paid: number | "";
  onUsage: (v: string) => void;
  onPaid: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr] gap-3 items-center">
      <div className="text-sm font-semibold text-[#324D3E]">
        {props.label} <span className="font-normal text-[#324D3E]/60">({props.hint})</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="md:hidden text-xs font-bold text-[#324D3E]/70">Usage</label>
        <input
          type="number"
          min={0}
          step="any"
          value={props.usage}
          onChange={(e) => props.onUsage(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-[#324D3E]
                     outline-none focus:ring-2 focus:ring-[#324D3E]/30"
          placeholder="0"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="md:hidden text-xs font-bold text-[#324D3E]/70">Amount Paid</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#324D3E]/50 font-semibold">
            $
          </span>
          <input
            type="number"
            min={0}
            step="any"
            value={props.paid}
            onChange={(e) => props.onPaid(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white/60 pl-8 pr-4 py-3 text-[#324D3E]
                       outline-none focus:ring-2 focus:ring-[#324D3E]/30"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
}