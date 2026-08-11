"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function GasolineCostCalculator() {
  const [distance, setDistance] = useState("300");
  const [efficiency, setEfficiency] = useState("15");
  const [pricePerLiter, setPricePerLiter] = useState("170");

  const result = useMemo(() => {
    const dist = parseFloat(distance);
    const eff = parseFloat(efficiency);
    const price = parseFloat(pricePerLiter);
    if (![dist, eff, price].every(Number.isFinite) || eff <= 0) return null;
    const liters = dist / eff;
    return { liters, cost: liters * price };
  }, [distance, efficiency, pricePerLiter]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">走行距離(km)</label>
          <input type="number" className="tool-input" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">燃費(km/L)</label>
          <input type="number" className="tool-input" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">ガソリン単価(円/L)</label>
          <input type="number" className="tool-input" value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "必要な燃料量", value: `${result.liters.toFixed(2)} L` },
            { label: "燃料費の目安", value: `${Math.round(result.cost).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
