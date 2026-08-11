"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function TriangleCalculator() {
  const [mode, setMode] = useState<"base-height" | "three-sides">("base-height");
  const [base, setBase] = useState("10");
  const [height, setHeight] = useState("6");
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");

  const area = useMemo(() => {
    if (mode === "base-height") {
      const b = parseFloat(base);
      const h = parseFloat(height);
      if (!Number.isFinite(b) || !Number.isFinite(h)) return null;
      return (b * h) / 2;
    }
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    if (![a, b, c].every(Number.isFinite)) return null;
    if (a + b <= c || a + c <= b || b + c <= a) return null;
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }, [mode, base, height, sideA, sideB, sideC]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("base-height")}
          className={mode === "base-height" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          底辺と高さ
        </button>
        <button
          type="button"
          onClick={() => setMode("three-sides")}
          className={mode === "three-sides" ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
        >
          3辺の長さ
        </button>
      </div>
      {mode === "base-height" ? (
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="底辺" value={base} onChange={setBase} />
          <NumberField label="高さ" value={height} onChange={setHeight} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <NumberField label="辺a" value={sideA} onChange={setSideA} />
          <NumberField label="辺b" value={sideB} onChange={setSideB} />
          <NumberField label="辺c" value={sideC} onChange={setSideC} />
        </div>
      )}
      {area !== null ? (
        <ResultCard items={[{ label: "面積", value: area.toFixed(4) }]} />
      ) : (
        mode === "three-sides" && <p className="text-sm text-red-600">三角形が成立しません</p>
      )}
    </div>
  );
}
