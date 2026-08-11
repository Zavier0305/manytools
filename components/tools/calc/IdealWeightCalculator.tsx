"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("170");

  const result = useMemo(() => {
    const h = parseFloat(height) / 100;
    if (!Number.isFinite(h) || h <= 0) return null;
    return {
      bmi22: 22 * h * h,
      rangeMin: 18.5 * h * h,
      rangeMax: 24.9 * h * h,
    };
  }, [height]);

  return (
    <div className="space-y-4">
      <NumberField label="身長" value={height} onChange={setHeight} suffix="cm" />
      {result && (
        <ResultCard
          items={[
            { label: "標準体重(BMI22)", value: `${result.bmi22.toFixed(1)}kg` },
            { label: "適正体重の範囲(BMI18.5〜24.9)", value: `${result.rangeMin.toFixed(1)}〜${result.rangeMax.toFixed(1)}kg` },
          ]}
        />
      )}
    </div>
  );
}
