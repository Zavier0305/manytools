"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function ElectricityCostCalculator() {
  const [watt, setWatt] = useState("500");
  const [hoursPerDay, setHoursPerDay] = useState("3");
  const [days, setDays] = useState("30");
  const [pricePerKwh, setPricePerKwh] = useState("31");

  const result = useMemo(() => {
    const w = parseFloat(watt);
    const h = parseFloat(hoursPerDay);
    const d = parseFloat(days);
    const price = parseFloat(pricePerKwh);
    if (![w, h, d, price].every(Number.isFinite)) return null;
    const kwhPerDay = (w * h) / 1000;
    const totalKwh = kwhPerDay * d;
    return { kwhPerDay, totalKwh, cost: totalKwh * price };
  }, [watt, hoursPerDay, days, pricePerKwh]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="tool-label">消費電力(W)</label>
          <input type="number" className="tool-input" value={watt} onChange={(e) => setWatt(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">1日の使用時間</label>
          <input type="number" className="tool-input" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">使用日数</label>
          <input type="number" className="tool-input" value={days} onChange={(e) => setDays(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">電力量単価(円/kWh)</label>
          <input type="number" className="tool-input" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "1日の消費電力量", value: `${result.kwhPerDay.toFixed(2)} kWh` },
            { label: "合計消費電力量", value: `${result.totalKwh.toFixed(2)} kWh` },
            { label: "電気代の目安", value: `${Math.round(result.cost).toLocaleString()}円` },
          ]}
        />
      )}
      <p className="text-xs text-slate-400">※ 実際の電気料金は契約プランや燃料費調整額により異なります。</p>
    </div>
  );
}
