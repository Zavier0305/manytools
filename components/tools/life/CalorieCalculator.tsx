"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

const ACTIVITY_LEVELS = [
  { id: "1.2", label: "ほとんど運動しない" },
  { id: "1.375", label: "軽い運動(週1〜3日)" },
  { id: "1.55", label: "中程度の運動(週3〜5日)" },
  { id: "1.725", label: "激しい運動(週6〜7日)" },
  { id: "1.9", label: "非常に激しい運動・肉体労働" },
];

export default function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("60");
  const [activity, setActivity] = useState("1.375");

  const result = useMemo(() => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (![a, h, w].every(Number.isFinite)) return null;
    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * parseFloat(activity);
    return { bmr, tdee };
  }, [gender, age, height, weight, activity]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGender(g)}
            className={gender === g ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
          >
            {g === "male" ? "男性" : "女性"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">年齢</label>
          <input type="number" className="tool-input" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">身長(cm)</label>
          <input type="number" className="tool-input" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">体重(kg)</label>
          <input type="number" className="tool-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="tool-label">活動レベル</label>
        <select className="tool-input" value={activity} onChange={(e) => setActivity(e.target.value)}>
          {ACTIVITY_LEVELS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "基礎代謝量(BMR)", value: `${Math.round(result.bmr)} kcal/日` },
            { label: "推定消費カロリー(TDEE)", value: `${Math.round(result.tdee)} kcal/日` },
          ]}
        />
      )}
      <p className="text-xs text-slate-400">
        ※ Mifflin-St Jeor式による簡易推定値です。個人差があるため目安としてご利用ください。
      </p>
    </div>
  );
}
