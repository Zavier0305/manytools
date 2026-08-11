"use client";

import { useMemo, useState } from "react";

export default function PaintCoverageCalculator() {
  const [wallWidth, setWallWidth] = useState("4");
  const [wallHeight, setWallHeight] = useState("2.5");
  const [coats, setCoats] = useState("2");
  const [coveragePerLiter, setCoveragePerLiter] = useState("10");

  const result = useMemo(() => {
    const w = parseFloat(wallWidth);
    const h = parseFloat(wallHeight);
    const c = parseFloat(coats);
    const coverage = parseFloat(coveragePerLiter);
    if (![w, h, c, coverage].every(Number.isFinite) || coverage <= 0) return null;
    const area = w * h;
    const litersNeeded = (area * c) / coverage;
    return { area, litersNeeded };
  }, [wallWidth, wallHeight, coats, coveragePerLiter]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">壁の幅(m)</label>
          <input type="number" className="tool-input" value={wallWidth} onChange={(e) => setWallWidth(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">壁の高さ(m)</label>
          <input type="number" className="tool-input" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">塗り回数</label>
          <input type="number" className="tool-input" value={coats} onChange={(e) => setCoats(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">1Lあたりの塗布面積(m²)</label>
          <input type="number" className="tool-input" value={coveragePerLiter} onChange={(e) => setCoveragePerLiter(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-sm text-slate-500">壁の面積: {result.area.toFixed(2)}m²</div>
          <div className="text-3xl font-bold text-indigo-600">{result.litersNeeded.toFixed(2)} L</div>
        </div>
      )}
    </div>
  );
}
