"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function CircleCalculator() {
  const [radius, setRadius] = useState("10");

  const result = useMemo(() => {
    const r = parseFloat(radius);
    if (!Number.isFinite(r) || r < 0) return null;
    return {
      area: Math.PI * r * r,
      circumference: 2 * Math.PI * r,
      diameter: r * 2,
    };
  }, [radius]);

  return (
    <div className="space-y-4">
      <NumberField label="半径" value={radius} onChange={setRadius} suffix="(単位は任意)" />
      {result && (
        <ResultCard
          items={[
            { label: "直径", value: result.diameter.toFixed(4) },
            { label: "円周", value: result.circumference.toFixed(4) },
            { label: "面積", value: result.area.toFixed(4) },
          ]}
        />
      )}
    </div>
  );
}
