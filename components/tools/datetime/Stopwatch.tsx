"use client";

import { useEffect, useRef, useState } from "react";

function formatElapsed(ms: number): string {
  const totalCentis = Math.floor(ms / 10);
  const centis = totalCentis % 100;
  const totalSeconds = Math.floor(ms / 1000);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="tool-panel text-center">
        <div className="text-5xl font-bold tabular-nums text-indigo-600">{formatElapsed(elapsed)}</div>
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" className="btn" onClick={() => setRunning((r) => !r)}>
          {running ? "一時停止" : "開始"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={!running}
          onClick={() => setLaps((prev) => [elapsed, ...prev])}
        >
          ラップ
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
            setLaps([]);
          }}
        >
          リセット
        </button>
      </div>
      {laps.length > 0 && (
        <div className="tool-panel max-h-64 overflow-y-auto p-0">
          <table className="w-full text-sm">
            <tbody>
              {laps.map((lap, i) => (
                <tr key={i} className="border-t border-slate-100 first:border-t-0">
                  <td className="px-4 py-1.5 text-slate-500">ラップ {laps.length - i}</td>
                  <td className="px-4 py-1.5 text-right font-mono">{formatElapsed(lap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
