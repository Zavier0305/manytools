"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function UtilityBillTotalCalculator() {
  const [electricity, setElectricity] = useState("8000");
  const [gas, setGas] = useState("4000");
  const [water, setWater] = useState("3000");
  const [internet, setInternet] = useState("5000");

  const result = useMemo(() => {
    const values = [electricity, gas, water, internet].map(Number);
    if (!values.every(Number.isFinite)) return null;
    const total = values.reduce((a, b) => a + b, 0);
    return { total, yearly: total * 12 };
  }, [electricity, gas, water, internet]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">電気代</label>
          <input type="number" className="tool-input" value={electricity} onChange={(e) => setElectricity(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">ガス代</label>
          <input type="number" className="tool-input" value={gas} onChange={(e) => setGas(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">水道代</label>
          <input type="number" className="tool-input" value={water} onChange={(e) => setWater(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">インターネット代</label>
          <input type="number" className="tool-input" value={internet} onChange={(e) => setInternet(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "月間合計", value: `${Math.round(result.total).toLocaleString()}円` },
            { label: "年間合計", value: `${Math.round(result.yearly).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
