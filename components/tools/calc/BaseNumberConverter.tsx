"use client";

import { useMemo, useState } from "react";

const BASES = [
  { id: 2, label: "2進数" },
  { id: 8, label: "8進数" },
  { id: 10, label: "10進数" },
  { id: 16, label: "16進数" },
];

export default function BaseNumberConverter() {
  const [value, setValue] = useState("42");
  const [base, setBase] = useState(10);

  const { decimal, error } = useMemo(() => {
    if (!value.trim()) return { decimal: null as number | null, error: null as string | null };
    const parsed = parseInt(value.trim(), base);
    if (Number.isNaN(parsed)) return { decimal: null, error: `${base}進数として解釈できません` };
    return { decimal: parsed, error: null as string | null };
  }, [value, base]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1">
          <label className="tool-label">数値</label>
          <input
            type="text"
            className="tool-input font-mono"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <label className="tool-label">入力する進数</label>
          <select
            className="tool-input"
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
          >
            {BASES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {decimal !== null && (
        <div className="tool-panel space-y-2">
          {BASES.map((b) => (
            <div key={b.id} className="flex items-baseline justify-between font-mono">
              <span className="text-sm text-slate-500">{b.label}</span>
              <span className="text-lg font-bold text-indigo-600">{decimal.toString(b.id)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
