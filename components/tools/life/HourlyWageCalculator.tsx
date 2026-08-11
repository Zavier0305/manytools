"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function HourlyWageCalculator() {
  const [wage, setWage] = useState("1200");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [daysPerWeek, setDaysPerWeek] = useState("3");

  const result = useMemo(() => {
    const w = parseFloat(wage);
    const h = parseFloat(hoursPerDay);
    const d = parseFloat(daysPerWeek);
    if (![w, h, d].every(Number.isFinite)) return null;
    const daily = w * h;
    const weekly = daily * d;
    const monthly = weekly * 4.345;
    return { daily, weekly, monthly };
  }, [wage, hoursPerDay, daysPerWeek]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">時給</label>
          <input type="number" className="tool-input" value={wage} onChange={(e) => setWage(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">1日の勤務時間</label>
          <input type="number" className="tool-input" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">週の勤務日数</label>
          <input type="number" className="tool-input" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "1日の給与", value: `${Math.round(result.daily).toLocaleString()}円` },
            { label: "週給", value: `${Math.round(result.weekly).toLocaleString()}円` },
            { label: "月収の目安", value: `${Math.round(result.monthly).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
