"use client";

import { useMemo, useState } from "react";
import { evaluateExpression } from "@/lib/calc/evaluateExpression";

const BUTTONS = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "(", ")",
  "+",
];

export default function Calculator() {
  const [expr, setExpr] = useState("");

  const { result, error } = useMemo(() => {
    if (!expr.trim()) return { result: "", error: null as string | null };
    try {
      const value = evaluateExpression(expr);
      return { result: Number.isFinite(value) ? String(Math.round(value * 1e10) / 1e10) : "", error: null as string | null };
    } catch (e) {
      return { result: "", error: e instanceof Error ? e.message : "計算できません" };
    }
  }, [expr]);

  function press(token: string) {
    setExpr((prev) => prev + token);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">式</label>
        <input
          type="text"
          className="tool-input font-mono text-lg"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="例: (12 + 3) * 4 / 2"
        />
      </div>
      <div className="tool-panel text-right">
        {error ? (
          <span className="text-sm text-red-600">{error}</span>
        ) : (
          <span className="text-3xl font-bold text-indigo-600">{result || "0"}</span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {BUTTONS.map((b) => (
          <button key={b} type="button" onClick={() => press(b)} className="btn-secondary py-3 text-lg">
            {b}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setExpr("")}
          className="btn-secondary col-span-2 py-3 text-lg text-red-600"
        >
          クリア
        </button>
        <button
          type="button"
          onClick={() => setExpr((prev) => prev.slice(0, -1))}
          className="btn-secondary col-span-2 py-3 text-lg"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
