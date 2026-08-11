"use client";

import { useMemo, useState } from "react";

const HOUSEHOLD_SIZES = [
  { id: "single", label: "単身(荷物少なめ)", base: 30000 },
  { id: "single-full", label: "単身(荷物多め)", base: 60000 },
  { id: "couple", label: "2人暮らし", base: 90000 },
  { id: "family", label: "家族(3〜4人)", base: 150000 },
];

export default function MovingCostEstimator() {
  const [size, setSize] = useState(HOUSEHOLD_SIZES[0].id);
  const [distance, setDistance] = useState("50");
  const [isBusySeason, setIsBusySeason] = useState(false);

  const result = useMemo(() => {
    const base = HOUSEHOLD_SIZES.find((s) => s.id === size)?.base ?? 0;
    const dist = parseFloat(distance);
    if (!Number.isFinite(dist)) return null;
    const distanceFee = dist * 300;
    const subtotal = base + distanceFee;
    return isBusySeason ? subtotal * 1.5 : subtotal;
  }, [size, distance, isBusySeason]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">世帯タイプ</label>
        <select className="tool-input" value={size} onChange={(e) => setSize(e.target.value)}>
          {HOUSEHOLD_SIZES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="tool-label">移動距離(km)</label>
        <input type="number" className="tool-input" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={isBusySeason} onChange={(e) => setIsBusySeason(e.target.checked)} />
        繁忙期(3〜4月)
      </label>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">約{Math.round(result).toLocaleString()}円</div>
          <p className="mt-1 text-xs text-slate-400">業者・時期・オプションにより実際の金額は異なります</p>
        </div>
      )}
    </div>
  );
}
