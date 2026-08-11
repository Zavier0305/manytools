"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("2");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const y = parseFloat(years);
    if (![p, r, y].every(Number.isFinite)) return null;
    const interest = p * r * y;
    return { interest, total: p + interest };
  }, [principal, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">元本</label>
          <input type="number" className="tool-input" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">年利率</label>
          <input type="number" className="tool-input" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">年数</label>
          <input type="number" className="tool-input" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "利息(単利)", value: `${Math.round(result.interest).toLocaleString()}円` },
            { label: "元利合計", value: `${Math.round(result.total).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
