"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function TipCalculator() {
  const [bill, setBill] = useState("5000");
  const [tipPercent, setTipPercent] = useState("10");
  const [people, setPeople] = useState("1");

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent) / 100;
    const p = parseInt(people, 10);
    if (!Number.isFinite(b) || !Number.isFinite(t) || !p || p <= 0) return null;
    const tipAmount = b * t;
    const total = b + tipAmount;
    return { tipAmount, total, perPerson: total / p };
  }, [bill, tipPercent, people]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <NumberField label="会計金額" value={bill} onChange={setBill} suffix="円" />
        <NumberField label="チップ率" value={tipPercent} onChange={setTipPercent} suffix="%" />
        <NumberField label="人数" value={people} onChange={setPeople} suffix="人" />
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "チップ額", value: `${Math.round(result.tipAmount).toLocaleString()}円` },
            { label: "合計金額", value: `${Math.round(result.total).toLocaleString()}円` },
            { label: "1人あたり", value: `${Math.round(result.perPerson).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
