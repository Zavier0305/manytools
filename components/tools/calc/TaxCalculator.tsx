"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";

export default function TaxCalculator() {
  const [price, setPrice] = useState("1000");
  const [rate, setRate] = useState("10");
  const [mode, setMode] = useState<"excl-to-incl" | "incl-to-excl">("excl-to-incl");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (!Number.isFinite(p) || !Number.isFinite(r)) return null;
    if (mode === "excl-to-incl") {
      const tax = p * r;
      return { base: p, tax, total: p + tax };
    }
    const base = p / (1 + r);
    return { base, tax: p - base, total: p };
  }, [price, rate, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("excl-to-incl")}
          className={mode === "excl-to-incl" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          税抜 → 税込
        </button>
        <button
          type="button"
          onClick={() => setMode("incl-to-excl")}
          className={mode === "incl-to-excl" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          税込 → 税抜
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label={mode === "excl-to-incl" ? "税抜価格" : "税込価格"} value={price} onChange={setPrice} suffix="円" />
        <NumberField label="消費税率" value={rate} onChange={setRate} suffix="%" />
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">税抜価格</span>
            <span>{Math.round(result.base).toLocaleString()}円</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">消費税額</span>
            <span>{Math.round(result.tax).toLocaleString()}円</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">税込価格</span>
            <span className="text-2xl font-bold text-indigo-600">{Math.round(result.total).toLocaleString()}円</span>
          </div>
        </div>
      )}
    </div>
  );
}
