"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function MortgageDownPaymentCalculator() {
  const [price, setPrice] = useState("40000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const dp = parseFloat(downPaymentPercent) / 100;
    if (!Number.isFinite(p) || !Number.isFinite(dp)) return null;
    const downPayment = p * dp;
    return { downPayment, loanAmount: p - downPayment };
  }, [price, downPaymentPercent]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">物件価格</label>
          <input type="number" className="tool-input" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">頭金の割合</label>
          <div className="flex items-center gap-2">
            <input type="number" className="tool-input" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(e.target.value)} />
            <span className="text-sm text-slate-500">%</span>
          </div>
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "頭金", value: `${Math.round(result.downPayment).toLocaleString()}円` },
            { label: "借入必要額", value: `${Math.round(result.loanAmount).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
