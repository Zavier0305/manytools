"use client";

import { useMemo, useState } from "react";

function getIsoWeek(date: Date): { week: number; year: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, year: d.getUTCFullYear() };
}

export default function IsoWeekNumberCalculator() {
  const [date, setDate] = useState("");
  const result = useMemo(() => {
    if (!date) return null;
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return null;
    return getIsoWeek(d);
  }, [date]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">日付</label>
        <input type="date" className="tool-input" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">第{result.week}週</div>
          <div className="mt-1 text-sm text-slate-500">({result.year}年)</div>
        </div>
      )}
    </div>
  );
}
