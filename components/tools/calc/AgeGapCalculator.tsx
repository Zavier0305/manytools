"use client";

import { useMemo, useState } from "react";

export default function AgeGapCalculator() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");

  const result = useMemo(() => {
    if (!dateA || !dateB) return null;
    const a = new Date(dateA);
    const b = new Date(dateB);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    const diffDays = Math.abs(Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24)));
    const years = Math.floor(diffDays / 365.25);
    return { diffDays, years };
  }, [dateA, dateB]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">生年月日A</label>
          <input type="date" className="tool-input" value={dateA} onChange={(e) => setDateA(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">生年月日B</label>
          <input type="date" className="tool-input" value={dateB} onChange={(e) => setDateB(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">約{result.years}歳差</div>
          <div className="mt-1 text-sm text-slate-500">{result.diffDays.toLocaleString()}日の差</div>
        </div>
      )}
    </div>
  );
}
