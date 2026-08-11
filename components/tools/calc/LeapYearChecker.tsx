"use client";

import { useMemo, useState } from "react";

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export default function LeapYearChecker() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const result = useMemo(() => {
    const y = parseInt(year, 10);
    if (!Number.isInteger(y)) return null;
    return isLeapYear(y);
  }, [year]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">西暦年</label>
        <input type="number" className="tool-input" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <p className={`text-2xl font-bold ${result ? "text-green-600" : "text-slate-500"}`}>
            {year}年は{result ? "うるう年です" : "うるう年ではありません"}
          </p>
        </div>
      )}
    </div>
  );
}
