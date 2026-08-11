"use client";

import { useMemo, useState } from "react";

export default function RunningPaceCalculator() {
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");

  const result = useMemo(() => {
    const d = parseFloat(distance);
    const totalSeconds = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
    if (!Number.isFinite(d) || d <= 0 || totalSeconds <= 0) return null;
    const paceSeconds = totalSeconds / d;
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.round(paceSeconds % 60);
    const speedKmh = d / (totalSeconds / 3600);
    return { paceMin, paceSec, speedKmh };
  }, [distance, hours, minutes, seconds]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">距離(km)</label>
        <input type="number" className="tool-input w-32" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">タイム</label>
        <div className="flex items-center gap-2">
          <input type="number" className="tool-input w-20" value={hours} onChange={(e) => setHours(e.target.value)} />
          <span>時間</span>
          <input type="number" className="tool-input w-20" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          <span>分</span>
          <input type="number" className="tool-input w-20" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
          <span>秒</span>
        </div>
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {result.paceMin}分{String(result.paceSec).padStart(2, "0")}秒 / km
          </div>
          <div className="text-sm text-slate-500">平均速度: {result.speedKmh.toFixed(2)} km/h</div>
        </div>
      )}
    </div>
  );
}
