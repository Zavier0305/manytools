"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setPhase((currentPhase) => {
              const nextPhase = currentPhase === "work" ? "break" : "work";
              setSecondsLeft((nextPhase === "work" ? workMinutes : breakMinutes) * 60);
              if (currentPhase === "work") setCycles((c) => c + 1);
              return nextPhase;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, workMinutes, breakMinutes]);

  function resetAll() {
    setRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
    setCycles(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div>
          <label className="tool-label">作業時間(分)</label>
          <input
            type="number"
            min={1}
            className="tool-input w-24"
            value={workMinutes}
            onChange={(e) => {
              const v = Math.max(1, Number(e.target.value) || 1);
              setWorkMinutes(v);
              if (!running && phase === "work") setSecondsLeft(v * 60);
            }}
          />
        </div>
        <div>
          <label className="tool-label">休憩時間(分)</label>
          <input
            type="number"
            min={1}
            className="tool-input w-24"
            value={breakMinutes}
            onChange={(e) => {
              const v = Math.max(1, Number(e.target.value) || 1);
              setBreakMinutes(v);
              if (!running && phase === "break") setSecondsLeft(v * 60);
            }}
          />
        </div>
      </div>
      <div className="tool-panel text-center">
        <div className={`text-sm font-medium ${phase === "work" ? "text-indigo-600" : "text-green-600"}`}>
          {phase === "work" ? "作業中" : "休憩中"}
        </div>
        <div className="text-6xl font-bold tabular-nums text-slate-900">{formatTime(secondsLeft)}</div>
        <div className="mt-2 text-sm text-slate-500">完了サイクル: {cycles}</div>
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" className="btn" onClick={() => setRunning((r) => !r)}>
          {running ? "一時停止" : "開始"}
        </button>
        <button type="button" className="btn-secondary" onClick={resetAll}>
          リセット
        </button>
      </div>
    </div>
  );
}
