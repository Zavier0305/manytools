"use client";

import { useState } from "react";

export default function DiceRoller() {
  const [count, setCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);

  function roll() {
    setResults(Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1));
  }

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="tool-label">サイコロの数</label>
          <input
            type="number"
            min={1}
            max={20}
            className="tool-input w-24"
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
          />
        </div>
        <div>
          <label className="tool-label">面の数</label>
          <select className="tool-input w-32" value={sides} onChange={(e) => setSides(Number(e.target.value))}>
            {[4, 6, 8, 10, 12, 20].map((s) => (
              <option key={s} value={s}>
                {s}面
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="button" className="btn" onClick={roll}>
        サイコロを振る
      </button>
      {results.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-3">
            {results.map((r, i) => (
              <div key={i} className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white text-3xl font-bold text-indigo-600 shadow-sm">
                {r}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">合計: {total}</p>
        </div>
      )}
    </div>
  );
}
