"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "低体重(やせ型)";
  if (bmi < 25) return "普通体重";
  if (bmi < 30) return "肥満度1";
  if (bmi < 35) return "肥満度2";
  if (bmi < 40) return "肥満度3";
  return "肥満度4";
}

export default function BmiCalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("60");

  const { bmi, category } = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return { bmi: null as number | null, category: "" };
    const value = w / (h * h);
    return { bmi: value, category: bmiCategory(value) };
  }, [height, weight]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="身長" value={height} onChange={setHeight} suffix="cm" />
        <NumberField label="体重" value={weight} onChange={setWeight} suffix="kg" />
      </div>
      {bmi !== null && (
        <div className="tool-panel text-center">
          <div className="text-4xl font-bold text-indigo-600">{bmi.toFixed(1)}</div>
          <div className="mt-2 text-slate-600">{category}</div>
        </div>
      )}
      <p className="text-xs text-slate-400">
        ※ BMIは目安の指標です。健康状態の判断には医師等の専門家にご相談ください。
      </p>
    </div>
  );
}
