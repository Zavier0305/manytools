"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function TrigCalculator() {
  const [angle, setAngle] = useState("30");
  const [unit, setUnit] = useState<"deg" | "rad">("deg");

  const result = useMemo(() => {
    const a = parseFloat(angle);
    if (!Number.isFinite(a)) return null;
    const rad = unit === "deg" ? (a * Math.PI) / 180 : a;
    return { sin: Math.sin(rad), cos: Math.cos(rad), tan: Math.tan(rad) };
  }, [angle, unit]);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <div>
          <label className="tool-label">角度</label>
          <input type="number" className="tool-input w-32" value={angle} onChange={(e) => setAngle(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">単位</label>
          <select className="tool-input" value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
            <option value="deg">度(°)</option>
            <option value="rad">ラジアン</option>
          </select>
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "sin", value: result.sin.toFixed(6) },
            { label: "cos", value: result.cos.toFixed(6) },
            { label: "tan", value: Number.isFinite(result.tan) ? result.tan.toFixed(6) : "undefined" },
          ]}
        />
      )}
    </div>
  );
}
