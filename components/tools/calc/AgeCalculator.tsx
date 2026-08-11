"use client";

import { useMemo, useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    if (birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const daysUntilNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, daysUntilNextBirthday };
  }, [birthDate]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">生年月日</label>
        <input
          type="date"
          className="tool-input"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          <div className="text-center text-3xl font-bold text-indigo-600">
            {result.years}歳 {result.months}ヶ月 {result.days}日
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>生まれてからの日数</span>
            <span>{result.totalDays.toLocaleString()} 日</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>次の誕生日まで</span>
            <span>{result.daysUntilNextBirthday} 日</span>
          </div>
        </div>
      )}
    </div>
  );
}
