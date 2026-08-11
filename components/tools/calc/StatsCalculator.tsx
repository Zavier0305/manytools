"use client";

import { useMemo, useState } from "react";
import { mean, median, stddev, variance } from "@/lib/calc/mathUtils";
import ResultCard from "@/components/ui/ResultCard";

export default function StatsCalculator() {
  const [input, setInput] = useState("4, 8, 15, 16, 23, 42");

  const result = useMemo(() => {
    const numbers = input
      .split(/[,\s\n]+/)
      .filter(Boolean)
      .map(Number)
      .filter((n) => Number.isFinite(n));
    if (numbers.length === 0) return null;
    return {
      count: numbers.length,
      sum: numbers.reduce((a, b) => a + b, 0),
      mean: mean(numbers),
      median: median(numbers),
      variance: variance(numbers),
      stddev: stddev(numbers),
      min: Math.min(...numbers),
      max: Math.max(...numbers),
    };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">数値(カンマ・空白・改行区切り)</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result && (
        <ResultCard
          items={[
            { label: "個数", value: String(result.count) },
            { label: "合計", value: result.sum.toFixed(4) },
            { label: "平均", value: result.mean.toFixed(4) },
            { label: "中央値", value: result.median.toFixed(4) },
            { label: "分散", value: result.variance.toFixed(4) },
            { label: "標準偏差", value: result.stddev.toFixed(4) },
            { label: "最小値", value: String(result.min) },
            { label: "最大値", value: String(result.max) },
          ]}
        />
      )}
    </div>
  );
}
