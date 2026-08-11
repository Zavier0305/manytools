"use client";

import { useMemo, useState } from "react";
import { isPrime } from "@/lib/calc/mathUtils";

export default function PrimeChecker() {
  const [input, setInput] = useState("97");
  const result = useMemo(() => {
    const n = parseInt(input, 10);
    if (!input.trim() || !Number.isInteger(n)) return null;
    return isPrime(n);
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">整数</label>
        <input type="number" className="tool-input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <p className={`text-2xl font-bold ${result ? "text-green-600" : "text-slate-500"}`}>
            {input}は{result ? "素数です" : "素数ではありません"}
          </p>
        </div>
      )}
    </div>
  );
}
