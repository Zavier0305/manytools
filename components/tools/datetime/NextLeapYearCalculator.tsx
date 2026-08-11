"use client";

import { useMemo, useState } from "react";

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export default function NextLeapYearCalculator() {
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const result = useMemo(() => {
    const y = parseInt(year, 10);
    if (!Number.isInteger(y)) return null;
    let next = y + 1;
    while (!isLeapYear(next)) next++;
    return next;
  }, [year]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">基準の年</label>
        <input type="number" className="tool-input" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-sm text-slate-500">次のうるう年は</div>
          <div className="text-3xl font-bold text-indigo-600">{result}年</div>
        </div>
      )}
    </div>
  );
}
