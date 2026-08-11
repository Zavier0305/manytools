"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function SavingsGoalSimulator() {
  const [goal, setGoal] = useState("1000000");
  const [current, setCurrent] = useState("100000");
  const [months, setMonths] = useState("12");

  const result = useMemo(() => {
    const g = parseFloat(goal);
    const c = parseFloat(current);
    const m = parseFloat(months);
    if (![g, c, m].every(Number.isFinite) || m <= 0) return null;
    const remaining = Math.max(0, g - c);
    return { remaining, monthly: remaining / m };
  }, [goal, current, months]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">目標金額</label>
          <input type="number" className="tool-input" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">現在の貯金額</label>
          <input type="number" className="tool-input" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">達成までの月数</label>
          <input type="number" className="tool-input" value={months} onChange={(e) => setMonths(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "残り必要額", value: `${Math.round(result.remaining).toLocaleString()}円` },
            { label: "毎月の貯金額目安", value: `${Math.round(result.monthly).toLocaleString()}円/月` },
          ]}
        />
      )}
    </div>
  );
}
