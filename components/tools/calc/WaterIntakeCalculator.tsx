"use client";

import { useMemo, useState } from "react";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("60");
  const [activityLevel, setActivityLevel] = useState("1");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const level = parseFloat(activityLevel);
    if (!Number.isFinite(w)) return null;
    return w * 35 * level;
  }, [weight, activityLevel]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">体重(kg)</label>
          <input type="number" className="tool-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">活動量</label>
          <select className="tool-input" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="0.9">少ない</option>
            <option value="1">普通</option>
            <option value="1.2">多い(運動習慣あり)</option>
          </select>
        </div>
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">約{(result / 1000).toFixed(1)} L / 日</div>
          <p className="mt-1 text-xs text-slate-400">食事から摂る水分を含む目安の総量です</p>
        </div>
      )}
    </div>
  );
}
