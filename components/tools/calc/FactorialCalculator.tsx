"use client";

import { useMemo, useState } from "react";
import { factorial } from "@/lib/calc/mathUtils";

export default function FactorialCalculator() {
  const [input, setInput] = useState("10");

  const { result, error } = useMemo(() => {
    const n = parseInt(input, 10);
    if (!input.trim()) return { result: null, error: null as string | null };
    if (!Number.isInteger(n) || n < 0) return { result: null, error: "0以上の整数を入力してください" };
    if (n > 170) return { result: null, error: "170以下の整数を入力してください(数値が大きすぎます)" };
    return { result: factorial(n), error: null as string | null };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">整数 n</label>
        <input type="number" className="tool-input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="tool-panel text-center text-2xl font-bold text-indigo-600 break-all">
          {input}! = {result.toLocaleString()}
        </div>
      )}
    </div>
  );
}
