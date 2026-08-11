"use client";

import { useMemo, useState } from "react";
import { fromRoman, toRoman } from "@/lib/calc/roman";

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState<"to-roman" | "from-roman">("to-roman");
  const [input, setInput] = useState("2024");

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      if (mode === "to-roman") return { output: toRoman(parseInt(input, 10)), error: null as string | null };
      return { output: String(fromRoman(input)), error: null as string | null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "変換できません" };
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("to-roman")}
          className={mode === "to-roman" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          数値→ローマ数字
        </button>
        <button
          type="button"
          onClick={() => setMode("from-roman")}
          className={mode === "from-roman" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          ローマ数字→数値
        </button>
      </div>
      <input type="text" className="tool-input" value={input} onChange={(e) => setInput(e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && <div className="tool-panel text-center text-3xl font-bold text-indigo-600">{output}</div>}
    </div>
  );
}
