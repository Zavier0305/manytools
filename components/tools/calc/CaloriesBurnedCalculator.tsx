"use client";

import { useMemo, useState } from "react";

const ACTIVITIES = [
  { id: "walking", label: "ウォーキング(普通)", met: 3.5 },
  { id: "jogging", label: "ジョギング", met: 7.0 },
  { id: "running", label: "ランニング(速め)", met: 11.0 },
  { id: "cycling", label: "サイクリング", met: 6.0 },
  { id: "swimming", label: "水泳", met: 8.0 },
  { id: "yoga", label: "ヨガ", met: 2.5 },
  { id: "strength", label: "筋力トレーニング", met: 5.0 },
  { id: "basketball", label: "バスケットボール", met: 6.5 },
];

export default function CaloriesBurnedCalculator() {
  const [activity, setActivity] = useState(ACTIVITIES[0].id);
  const [weight, setWeight] = useState("60");
  const [minutes, setMinutes] = useState("30");

  const result = useMemo(() => {
    const met = ACTIVITIES.find((a) => a.id === activity)?.met ?? 0;
    const w = parseFloat(weight);
    const m = parseFloat(minutes);
    if (!Number.isFinite(w) || !Number.isFinite(m)) return null;
    return met * w * (m / 60);
  }, [activity, weight, minutes]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">運動の種類</label>
        <select className="tool-input" value={activity} onChange={(e) => setActivity(e.target.value)}>
          {ACTIVITIES.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">体重(kg)</label>
          <input type="number" className="tool-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">運動時間(分)</label>
          <input type="number" className="tool-input" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </div>
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">約{Math.round(result)} kcal</div>
        </div>
      )}
    </div>
  );
}
