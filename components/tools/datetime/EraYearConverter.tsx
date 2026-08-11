"use client";

import { useMemo, useState } from "react";
import { ERAS, eraToWestern, westernToEra } from "@/lib/calc/japaneseEra";

export default function EraYearConverter() {
  const [mode, setMode] = useState<"to-era" | "to-western">("to-era");
  const [westernYear, setWesternYear] = useState(String(new Date().getFullYear()));
  const [eraName, setEraName] = useState(ERAS[0].name);
  const [eraYear, setEraYear] = useState("1");

  const { output, error } = useMemo(() => {
    try {
      if (mode === "to-era") {
        const y = parseInt(westernYear, 10);
        if (!Number.isInteger(y)) return { output: "", error: null as string | null };
        return { output: westernToEra(y), error: null as string | null };
      }
      const y = parseInt(eraYear, 10);
      if (!Number.isInteger(y)) return { output: "", error: null as string | null };
      return { output: `西暦${eraToWestern(eraName, y)}年`, error: null as string | null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "変換できません" };
    }
  }, [mode, westernYear, eraName, eraYear]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("to-era")}
          className={mode === "to-era" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          西暦→元号
        </button>
        <button
          type="button"
          onClick={() => setMode("to-western")}
          className={mode === "to-western" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          元号→西暦
        </button>
      </div>
      {mode === "to-era" ? (
        <div>
          <label className="tool-label">西暦年</label>
          <input type="number" className="tool-input" value={westernYear} onChange={(e) => setWesternYear(e.target.value)} />
        </div>
      ) : (
        <div className="flex gap-3">
          <select className="tool-input" value={eraName} onChange={(e) => setEraName(e.target.value)}>
            {ERAS.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <input type="number" className="tool-input" value={eraYear} onChange={(e) => setEraYear(e.target.value)} />
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && <div className="tool-panel text-center text-2xl font-bold text-indigo-600">{output}</div>}
    </div>
  );
}
