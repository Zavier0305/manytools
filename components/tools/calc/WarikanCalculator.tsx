"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";

export default function WarikanCalculator() {
  const [total, setTotal] = useState("10000");
  const [people, setPeople] = useState("4");
  const [roundTo, setRoundTo] = useState("100");

  const result = useMemo(() => {
    const t = parseFloat(total);
    const p = parseInt(people, 10);
    const r = parseFloat(roundTo) || 1;
    if (!t || !p || p <= 0) return null;
    const raw = t / p;
    const perPerson = Math.ceil(raw / r) * r;
    const totalCollected = perPerson * p;
    return { perPerson, totalCollected, surplus: totalCollected - t };
  }, [total, people, roundTo]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <NumberField label="合計金額" value={total} onChange={setTotal} suffix="円" />
        <NumberField label="人数" value={people} onChange={setPeople} suffix="人" />
        <div>
          <label className="tool-label">端数の切り上げ単位</label>
          <select className="tool-input" value={roundTo} onChange={(e) => setRoundTo(e.target.value)}>
            <option value="1">1円</option>
            <option value="10">10円</option>
            <option value="100">100円</option>
            <option value="1000">1000円</option>
          </select>
        </div>
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">1人あたりの金額</span>
            <span className="text-2xl font-bold text-indigo-600">{result.perPerson.toLocaleString()}円</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">合計徴収額</span>
            <span>{result.totalCollected.toLocaleString()}円</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">お釣り(余剰分)</span>
            <span>{result.surplus.toLocaleString()}円</span>
          </div>
        </div>
      )}
    </div>
  );
}
