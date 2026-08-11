"use client";

import { useMemo, useState } from "react";

function sizeCategory(cm: number): { label: string; price: number } {
  if (cm <= 60) return { label: "60サイズ", price: 800 };
  if (cm <= 80) return { label: "80サイズ", price: 1000 };
  if (cm <= 100) return { label: "100サイズ", price: 1200 };
  if (cm <= 120) return { label: "120サイズ", price: 1500 };
  if (cm <= 140) return { label: "140サイズ", price: 1800 };
  if (cm <= 160) return { label: "160サイズ", price: 2100 };
  return { label: "160サイズ超", price: 2500 };
}

export default function ShippingCostEstimator() {
  const [width, setWidth] = useState("30");
  const [height, setHeight] = useState("20");
  const [depth, setDepth] = useState("15");
  const [weight, setWeight] = useState("2");

  const result = useMemo(() => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    const d = parseFloat(depth);
    const wt = parseFloat(weight);
    if (![w, h, d, wt].every(Number.isFinite)) return null;
    const sum = w + h + d;
    const category = sizeCategory(sum);
    const weightSurcharge = wt > 10 ? (wt - 10) * 100 : 0;
    return { sum, category, total: category.price + weightSurcharge };
  }, [width, height, depth, weight]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">幅(cm)</label>
          <input type="number" className="tool-input" value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">高さ(cm)</label>
          <input type="number" className="tool-input" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">奥行き(cm)</label>
          <input type="number" className="tool-input" value={depth} onChange={(e) => setDepth(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="tool-label">重量(kg)</label>
        <input type="number" className="tool-input w-32" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-sm text-slate-500">
            3辺合計 {result.sum}cm({result.category.label}相当)
          </div>
          <div className="text-3xl font-bold text-indigo-600">約{result.total.toLocaleString()}円</div>
          <p className="text-xs text-slate-400">※ 配送業者・地域により実際の料金は異なります。目安としてご利用ください。</p>
        </div>
      )}
    </div>
  );
}
