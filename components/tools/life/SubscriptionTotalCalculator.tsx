"use client";

import { useMemo, useState } from "react";
import ResultCard from "@/components/ui/ResultCard";

export default function SubscriptionTotalCalculator() {
  const [input, setInput] = useState("Netflix,1490\nSpotify,980\nAmazon Prime,600");

  const result = useMemo(() => {
    const rows = input
      .split("\n")
      .map((line) => {
        const [name, price] = line.split(",");
        return { name: name?.trim(), price: parseFloat(price) };
      })
      .filter((r) => r.name && Number.isFinite(r.price));
    if (rows.length === 0) return null;
    const monthly = rows.reduce((sum, r) => sum + r.price, 0);
    return { monthly, yearly: monthly * 12, count: rows.length };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">1行に「サービス名, 月額料金」を入力</label>
        <textarea className="tool-textarea font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "登録数", value: `${result.count}件` },
            { label: "月額合計", value: `${Math.round(result.monthly).toLocaleString()}円` },
            { label: "年額合計", value: `${Math.round(result.yearly).toLocaleString()}円` },
          ]}
        />
      )}
    </div>
  );
}
