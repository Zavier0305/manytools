"use client";

import { useMemo, useState } from "react";

const SIGNS: { name: string; from: [number, number]; to: [number, number] }[] = [
  { name: "山羊座", from: [12, 22], to: [1, 19] },
  { name: "水瓶座", from: [1, 20], to: [2, 18] },
  { name: "魚座", from: [2, 19], to: [3, 20] },
  { name: "牡羊座", from: [3, 21], to: [4, 19] },
  { name: "牡牛座", from: [4, 20], to: [5, 20] },
  { name: "双子座", from: [5, 21], to: [6, 21] },
  { name: "蟹座", from: [6, 22], to: [7, 22] },
  { name: "獅子座", from: [7, 23], to: [8, 22] },
  { name: "乙女座", from: [8, 23], to: [9, 22] },
  { name: "天秤座", from: [9, 23], to: [10, 23] },
  { name: "蠍座", from: [10, 24], to: [11, 22] },
  { name: "射手座", from: [11, 23], to: [12, 21] },
];

function findSign(month: number, day: number): string {
  for (const sign of SIGNS) {
    const [fm, fd] = sign.from;
    const [tm, td] = sign.to;
    if (fm <= tm) {
      if ((month === fm && day >= fd) || (month === tm && day <= td) || (month > fm && month < tm)) {
        return sign.name;
      }
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td) || month > fm || month < tm) {
        return sign.name;
      }
    }
  }
  return "不明";
}

export default function ZodiacSignChecker() {
  const [date, setDate] = useState("");
  const result = useMemo(() => {
    if (!date) return null;
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return null;
    return findSign(d.getMonth() + 1, d.getDate());
  }, [date]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">誕生日</label>
        <input type="date" className="tool-input" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel text-center text-3xl font-bold text-indigo-600">{result}</div>
      )}
    </div>
  );
}
