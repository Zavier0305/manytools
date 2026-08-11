"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("5000");
  const [discount, setDiscount] = useState("20");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(discount) / 100;
    if (!Number.isFinite(p) || !Number.isFinite(d)) return null;
    const savedAmount = p * d;
    return { savedAmount, finalPrice: p - savedAmount };
  }, [price, discount]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">元の価格</label>
          <input type="number" className="tool-input" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">割引率</label>
          <div className="flex items-center gap-2">
            <input type="number" className="tool-input" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            <span className="text-sm text-slate-500">%</span>
          </div>
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "割引額", value: `${Math.round(result.savedAmount).toLocaleString()}円` },
            { label: "割引後の価格", value: `${Math.round(result.finalPrice).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
