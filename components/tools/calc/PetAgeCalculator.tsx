"use client";

import { useMemo, useState } from "react";

function dogYears(age: number): number {
  if (age <= 0) return 0;
  if (age <= 2) return age * 12;
  return 24 + (age - 2) * 5;
}

function catYears(age: number): number {
  if (age <= 0) return 0;
  if (age <= 2) return age * 12;
  return 24 + (age - 2) * 4;
}

export default function PetAgeCalculator() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [age, setAge] = useState("3");

  const result = useMemo(() => {
    const a = parseFloat(age);
    if (!Number.isFinite(a) || a < 0) return null;
    return petType === "dog" ? dogYears(a) : catYears(a);
  }, [petType, age]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["dog", "cat"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setPetType(t)}
            className={petType === t ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
          >
            {t === "dog" ? "犬" : "猫"}
          </button>
        ))}
      </div>
      <div>
        <label className="tool-label">実際の年齢(歳)</label>
        <input type="number" className="tool-input" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">約{Math.round(result)}歳</div>
          <p className="mt-1 text-sm text-slate-500">人間年齢に換算した目安です</p>
        </div>
      )}
    </div>
  );
}
