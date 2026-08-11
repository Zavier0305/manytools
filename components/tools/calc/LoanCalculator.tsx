"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("3000000");
  const [rate, setRate] = useState("3.5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate) / 100;
    const y = parseFloat(years);
    if (![p, annualRate, y].every(Number.isFinite) || y <= 0) return null;
    const months = y * 12;
    const monthlyRate = annualRate / 12;
    const monthlyPayment =
      monthlyRate === 0 ? p / months : (p * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const total = monthlyPayment * months;
    return { monthlyPayment, total, interest: total - p };
  }, [principal, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <NumberField label="借入額" value={principal} onChange={setPrincipal} suffix="円" />
        <NumberField label="年利率" value={rate} onChange={setRate} suffix="%" />
        <NumberField label="返済期間" value={years} onChange={setYears} suffix="年" />
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "毎月の返済額", value: `${Math.round(result.monthlyPayment).toLocaleString()}円` },
            { label: "返済総額", value: `${Math.round(result.total).toLocaleString()}円` },
            { label: "利息総額", value: `${Math.round(result.interest).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
