"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  function generate() {
    if (min > max) {
      setError("最小値は最大値以下にしてください");
      setResults([]);
      return;
    }
    const rangeSize = max - min + 1;
    if (unique && count > rangeSize) {
      setError("重複なしの場合、生成数は範囲の数値の個数以下にしてください");
      setResults([]);
      return;
    }
    setError(null);
    if (unique) {
      const pool = Array.from({ length: rangeSize }, (_, i) => min + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, count));
    } else {
      setResults(Array.from({ length: count }, () => Math.floor(Math.random() * rangeSize) + min));
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="tool-label">最小値</label>
          <input type="number" className="tool-input" value={min} onChange={(e) => setMin(Number(e.target.value))} />
        </div>
        <div>
          <label className="tool-label">最大値</label>
          <input type="number" className="tool-input" value={max} onChange={(e) => setMax(Number(e.target.value))} />
        </div>
        <div>
          <label className="tool-label">生成数</label>
          <input
            type="number"
            min={1}
            max={1000}
            className="tool-input"
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
        <label className="flex items-end gap-2 pb-2 text-sm text-slate-700">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
          重複なし
        </label>
      </div>
      <button type="button" className="btn" onClick={generate}>
        生成する
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {results.length > 0 && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">結果</label>
            <CopyButton getText={() => results.join(", ")} />
          </div>
          <div className="tool-panel flex flex-wrap gap-2">
            {results.map((r, i) => (
              <span key={i} className="rounded-lg bg-indigo-50 px-3 py-1 font-mono text-indigo-700">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
