"use client";

import { useMemo, useState } from "react";

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export default function BusinessDaysCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const s = new Date(start);
    const e = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || s > e) return null;
    return countBusinessDays(s, e);
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
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">{result}日</div>
          <p className="mt-1 text-xs text-slate-400">土日を除いた平日の日数です(祝日は考慮していません)</p>
        </div>
      )}
    </div>
  );
}
