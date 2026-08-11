"use client";

import { useMemo, useState } from "react";
import { primeFactorize } from "@/lib/calc/mathUtils";

export default function PrimeFactorization() {
  const [input, setInput] = useState("360");

  const { factors, error } = useMemo(() => {
    const n = parseInt(input, 10);
    if (!input.trim()) return { factors: null, error: null as string | null };
    if (!Number.isInteger(n) || n < 2) return { factors: null, error: "2以上の整数を入力してください" };
    if (n > 1e12) return { factors: null, error: "数値が大きすぎます" };
    return { factors: primeFactorize(n), error: null as string | null };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">整数</label>
        <input type="number" className="tool-input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {factors && (
        <div className="tool-panel text-center text-2xl font-bold text-indigo-600">
          {factors.map((f, i) => (
            <span key={f.prime}>
              {i > 0 && <span className="mx-2 text-slate-400">×</span>}
              {f.prime}
              {f.exponent > 1 && <sup>{f.exponent}</sup>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
