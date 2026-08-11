"use client";

import { useMemo, useState } from "react";

export default function DateDiffCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const s = new Date(start);
    const e = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
    const diffMs = Math.abs(e.getTime() - s.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return {
      totalDays,
      weeks: Math.floor(totalDays / 7),
      months: Math.abs(
        (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
      ),
      years: (diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2),
    };
  }, [start, end]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">開始日</label>
          <input type="date" className="tool-input" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">終了日</label>
          <input type="date" className="tool-input" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          <div className="text-center text-3xl font-bold text-indigo-600">{result.totalDays.toLocaleString()} 日</div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>週数換算</span>
            <span>約{result.weeks}週間</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>月数換算</span>
            <span>約{result.months}ヶ月</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>年数換算</span>
            <span>約{result.years}年</span>
          </div>
        </div>
      )}
    </div>
  );
}
