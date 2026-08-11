"use client";

import { useMemo, useState } from "react";

export default function WeekdayCalculator() {
  const [date, setDate] = useState("");

  const result = useMemo(() => {
    if (!date) return null;
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return null;
    return {
      ja: d.toLocaleDateString("ja-JP", { weekday: "long" }),
      en: d.toLocaleDateString("en-US", { weekday: "long" }),
      dayOfYear: Math.floor(
        (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
      ),
    };
  }, [date]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">日付</label>
        <input type="date" className="tool-input" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-3xl font-bold text-indigo-600">{result.ja}曜日</div>
          <div className="text-sm text-slate-500">{result.en}</div>
          <div className="text-sm text-slate-500">その年の{result.dayOfYear}日目</div>
        </div>
      )}
    </div>
  );
}
