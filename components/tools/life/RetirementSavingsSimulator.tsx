"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function RetirementSavingsSimulator() {
  const [currentSavings, setCurrentSavings] = useState("2000000");
  const [monthlyContribution, setMonthlyContribution] = useState("30000");
  const [years, setYears] = useState("30");
  const [annualReturn, setAnnualReturn] = useState("3");

  const result = useMemo(() => {
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const y = parseFloat(years);
    const r = parseFloat(annualReturn) / 100 / 12;
    if (![current, monthly, y, r].every(Number.isFinite)) return null;
    const months = y * 12;
    const futureCurrentValue = current * Math.pow(1 + r, months);
    const futureContributions = r === 0 ? monthly * months : monthly * ((Math.pow(1 + r, months) - 1) / r);
    return futureCurrentValue + futureContributions;
  }, [currentSavings, monthlyContribution, years, annualReturn]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">現在の貯蓄額</label>
          <input type="number" className="tool-input" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">毎月の積立額</label>
          <input type="number" className="tool-input" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">積立年数</label>
          <input type="number" className="tool-input" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">想定年利回り(%)</label>
          <input type="number" className="tool-input" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
        </div>
      </div>
      {result !== null && (
        <ResultCard items={[{ label: "退職時の想定資産額", value: `${Math.round(result).toLocaleString()}円` }]} />
      )}
      <p className="text-xs text-slate-400">※ 簡易シミュレーションであり、実際の運用成果を保証するものではありません。</p>
    </div>
  );
}
