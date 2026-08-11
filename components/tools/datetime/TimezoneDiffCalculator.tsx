"use client";

import { useEffect, useMemo, useState } from "react";

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

function getOffsetHours(zone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "longOffset",
  }).formatToParts(at);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours + Math.sign(hours || 1) * (minutes / 60);
}

export default function TimezoneDiffCalculator() {
  const [zoneA, setZoneA] = useState(TIMEZONES[0].zone);
  const [zoneB, setZoneB] = useState(TIMEZONES[1].zone);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // The current time/offset is only meaningful client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);

  const diff = useMemo(() => {
    if (!now) return null;
    return getOffsetHours(zoneA, now) - getOffsetHours(zoneB, now);
  }, [zoneA, zoneB, now]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">都市A</label>
          <select className="tool-input" value={zoneA} onChange={(e) => setZoneA(e.target.value)}>
            {TIMEZONES.map((t) => (
              <option key={t.zone} value={t.zone}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="tool-label">都市B</label>
          <select className="tool-input" value={zoneB} onChange={(e) => setZoneB(e.target.value)}>
            {TIMEZONES.map((t) => (
              <option key={t.zone} value={t.zone}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {diff !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {diff === 0 ? "時差なし" : `${Math.abs(diff)}時間${diff > 0 ? "進んでいます" : "遅れています"}`}
          </div>
        </div>
      )}
    </div>
  );
}
