"use client";

import { useEffect, useMemo, useState } from "react";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toLocalInputValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    const now = new Date();
    // Current time is only well-defined client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimestamp(String(Math.floor(now.getTime() / 1000)));
    setDateInput(toLocalInputValue(now));
  }, []);

  const fromTimestamp = useMemo(() => {
    const n = Number(timestamp);
    if (!Number.isFinite(n)) return null;
    const ms = unit === "seconds" ? n * 1000 : n;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return null;
    return { iso: date.toISOString(), local: date.toLocaleString("ja-JP") };
  }, [timestamp, unit]);

  const fromDate = useMemo(() => {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return { seconds: Math.floor(date.getTime() / 1000), ms: date.getTime() };
  }, [dateInput]);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">タイムスタンプ → 日時</h2>
        <div className="flex gap-3">
          <input
            type="text"
            className="tool-input font-mono"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
          <select className="tool-input w-40" value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
            <option value="seconds">秒</option>
            <option value="milliseconds">ミリ秒</option>
          </select>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setTimestamp(String(unit === "seconds" ? Math.floor(Date.now() / 1000) : Date.now()))}
        >
          現在時刻を入力
        </button>
        {fromTimestamp && (
          <div className="tool-panel space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">ローカル時刻</span>
              <span>{fromTimestamp.local}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ISO 8601</span>
              <span className="font-mono">{fromTimestamp.iso}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">日時 → タイムスタンプ</h2>
        <input
          type="datetime-local"
          step={1}
          className="tool-input"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        {fromDate && (
          <div className="tool-panel space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Unixタイムスタンプ(秒)</span>
              <span className="font-mono">{fromDate.seconds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Unixタイムスタンプ(ミリ秒)</span>
              <span className="font-mono">{fromDate.ms}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
