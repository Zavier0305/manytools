"use client";

import { useEffect, useState } from "react";

const TIMEZONES = [
  { label: "東京", zone: "Asia/Tokyo" },
  { label: "ニューヨーク", zone: "America/New_York" },
  { label: "ロサンゼルス", zone: "America/Los_Angeles" },
  { label: "ロンドン", zone: "Europe/London" },
  { label: "パリ", zone: "Europe/Paris" },
  { label: "モスクワ", zone: "Europe/Moscow" },
  { label: "ドバイ", zone: "Asia/Dubai" },
  { label: "デリー", zone: "Asia/Kolkata" },
  { label: "シンガポール", zone: "Asia/Singapore" },
  { label: "上海", zone: "Asia/Shanghai" },
  { label: "シドニー", zone: "Australia/Sydney" },
  { label: "ホノルル", zone: "Pacific/Honolulu" },
];

export default function WorldClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {TIMEZONES.map((tz) => (
        <div key={tz.zone} className="tool-panel flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-800">{tz.label}</div>
            <div className="text-xs text-slate-400">{tz.zone}</div>
          </div>
          <div className="text-xl font-bold tabular-nums text-indigo-600">
            {now
              ? new Intl.DateTimeFormat("ja-JP", {
                  timeZone: tz.zone,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).format(now)
              : "--:--:--"}
          </div>
        </div>
      ))}
    </div>
  );
}
