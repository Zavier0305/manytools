"use client";

import { useMemo, useState } from "react";
import { gcdLcmOfList } from "@/lib/calc/mathUtils";

export default function GcdLcmCalculator() {
  const [input, setInput] = useState("12, 18, 30");

  const { result, error } = useMemo(() => {
    const numbers = input
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);
    if (numbers.length < 2) return { result: null, error: "2つ以上の整数をカンマ区切りで入力してください" };
    if (numbers.some((n) => !Number.isInteger(n))) return { result: null, error: "整数を入力してください" };
    return { result: gcdLcmOfList(numbers), error: null as string | null };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">整数(カンマまたは空白区切り)</label>
        <input type="text" className="tool-input font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && (
        <div className="tool-panel space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">最大公約数(GCD)</span>
            <span className="text-2xl font-bold text-indigo-600">{result.gcd}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500">最小公倍数(LCM)</span>
            <span className="text-2xl font-bold text-indigo-600">{result.lcm}</span>
          </div>
        </div>
      )}
    </div>
  );
}
