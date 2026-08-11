"use client";

import { useMemo, useState } from "react";

export default function WorkHoursCalculator() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  const [breakMinutes, setBreakMinutes] = useState("60");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let minutes = eh * 60 + em - (sh * 60 + sm);
    if (minutes < 0) minutes += 24 * 60;
    minutes -= parseFloat(breakMinutes) || 0;
    if (minutes < 0) minutes = 0;
    return { hours: Math.floor(minutes / 60), minutes: Math.round(minutes % 60), totalMinutes: minutes };
  }, [start, end, breakMinutes]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">出勤時刻</label>
          <input type="time" className="tool-input" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">退勤時刻</label>
          <input type="time" className="tool-input" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">休憩時間(分)</label>
          <input type="number" className="tool-input" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {result.hours}時間{result.minutes}分
          </div>
          <div className="mt-1 text-sm text-slate-500">合計 {result.totalMinutes.toFixed(0)} 分</div>
        </div>
      )}
    </div>
  );
}
