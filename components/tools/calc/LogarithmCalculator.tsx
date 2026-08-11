"use client";

import { useMemo, useState } from "react";

export default function LogarithmCalculator() {
  const [value, setValue] = useState("100");
  const [base, setBase] = useState("10");

  const result = useMemo(() => {
    const v = parseFloat(value);
    const b = parseFloat(base);
    if (!Number.isFinite(v) || !Number.isFinite(b) || v <= 0 || b <= 0 || b === 1) return null;
    return Math.log(v) / Math.log(b);
  }, [value, base]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">真数</label>
          <input type="number" className="tool-input" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">底</label>
          <input type="number" className="tool-input" value={base} onChange={(e) => setBase(e.target.value)} />
        </div>
      </div>
      {result !== null && (
        <div className="tool-panel text-center text-2xl font-bold text-indigo-600">
          log<sub>{base}</sub>({value}) = {result.toFixed(6)}
        </div>
      )}
    </div>
  );
}
