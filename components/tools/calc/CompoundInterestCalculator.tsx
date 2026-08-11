"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("1");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const y = parseFloat(years);
    const n = parseFloat(frequency);
    if (![p, r, y, n].every(Number.isFinite) || n <= 0) return null;
    const futureValue = p * Math.pow(1 + r / n, n * y);
    return { futureValue, interest: futureValue - p };
  }, [principal, rate, years, frequency]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="元本" value={principal} onChange={setPrincipal} suffix="円" />
        <NumberField label="年利率" value={rate} onChange={setRate} suffix="%" />
        <NumberField label="運用年数" value={years} onChange={setYears} suffix="年" />
        <div>
          <label className="tool-label">複利計算の頻度</label>
          <select className="tool-input" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="1">年1回</option>
            <option value="2">半年ごと</option>
            <option value="4">四半期ごと</option>
            <option value="12">毎月</option>
            <option value="365">毎日</option>
          </select>
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "将来価値", value: `${Math.round(result.futureValue).toLocaleString()}円` },
            { label: "利息合計", value: `${Math.round(result.interest).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
