"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function CountdownTimer() {
  const [minutesInput, setMinutesInput] = useState("5");
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function handleSetMinutes() {
    const m = Math.max(0, parseFloat(minutesInput) || 0);
    setSecondsLeft(Math.round(m * 60));
    setRunning(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <div>
          <label className="tool-label">分</label>
          <input
            type="number"
            min={0}
            className="tool-input w-28"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
          />
        </div>
        <button type="button" className="btn-secondary" onClick={handleSetMinutes}>
          セット
        </button>
      </div>
      <div className="tool-panel text-center">
        <div className={`text-6xl font-bold tabular-nums ${secondsLeft === 0 ? "text-red-600" : "text-indigo-600"}`}>
          {formatTime(secondsLeft)}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          className="btn"
          disabled={secondsLeft === 0}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "一時停止" : "開始"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setRunning(false);
            handleSetMinutes();
          }}
        >
          リセット
        </button>
      </div>
    </div>
  );
}
