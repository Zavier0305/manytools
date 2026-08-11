"use client";

import { useMemo, useState } from "react";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("170");
  const [waist, setWaist] = useState("80");
  const [neck, setNeck] = useState("38");
  const [hip, setHip] = useState("95");

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const hp = parseFloat(hip);
    if (![h, w, n].every(Number.isFinite)) return null;
    if (gender === "male") {
      const bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      return Number.isFinite(bf) ? bf : null;
    }
    if (!Number.isFinite(hp)) return null;
    const bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
    return Number.isFinite(bf) ? bf : null;
  }, [gender, height, waist, neck, hip]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGender(g)}
            className={gender === g ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
          >
            {g === "male" ? "男性" : "女性"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="tool-label">身長(cm)</label>
          <input type="number" className="tool-input" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">ウエスト(cm)</label>
          <input type="number" className="tool-input" value={waist} onChange={(e) => setWaist(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">首周り(cm)</label>
          <input type="number" className="tool-input" value={neck} onChange={(e) => setNeck(e.target.value)} />
        </div>
        {gender === "female" && (
          <div>
            <label className="tool-label">腰周り(cm)</label>
            <input type="number" className="tool-input" value={hip} onChange={(e) => setHip(e.target.value)} />
          </div>
        )}
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">{result.toFixed(1)}%</div>
          <p className="mt-1 text-xs text-slate-400">米海軍式(US Navy Method)による推定値です</p>
        </div>
      )}
    </div>
  );
}
