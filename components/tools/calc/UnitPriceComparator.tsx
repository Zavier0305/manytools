"use client";

import { useMemo, useState } from "react";

export default function UnitPriceComparator() {
  const [priceA, setPriceA] = useState("500");
  const [amountA, setAmountA] = useState("350");
  const [priceB, setPriceB] = useState("780");
  const [amountB, setAmountB] = useState("500");

  const result = useMemo(() => {
    const pa = parseFloat(priceA);
    const aa = parseFloat(amountA);
    const pb = parseFloat(priceB);
    const ab = parseFloat(amountB);
    if (![pa, aa, pb, ab].every((v) => Number.isFinite(v) && v > 0)) return null;
    return { unitA: pa / aa, unitB: pb / ab };
  }, [priceA, amountA, priceB, amountB]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="tool-panel space-y-2">
          <h2 className="font-semibold text-slate-800">商品A</h2>
          <div>
            <label className="tool-label">価格</label>
            <input type="number" className="tool-input" value={priceA} onChange={(e) => setPriceA(e.target.value)} />
          </div>
          <div>
            <label className="tool-label">量(g・mlなど)</label>
            <input type="number" className="tool-input" value={amountA} onChange={(e) => setAmountA(e.target.value)} />
          </div>
        </div>
        <div className="tool-panel space-y-2">
          <h2 className="font-semibold text-slate-800">商品B</h2>
          <div>
            <label className="tool-label">価格</label>
            <input type="number" className="tool-input" value={priceB} onChange={(e) => setPriceB(e.target.value)} />
          </div>
          <div>
            <label className="tool-label">量(g・mlなど)</label>
            <input type="number" className="tool-input" value={amountB} onChange={(e) => setAmountB(e.target.value)} />
          </div>
        </div>
      </div>
      {result && (
        <div className="tool-panel text-center">
          <p className="text-sm text-slate-500">
            単価: A = {result.unitA.toFixed(3)}円/単位 ・ B = {result.unitB.toFixed(3)}円/単位
          </p>
          <p className="mt-2 text-xl font-bold text-indigo-600">
            {result.unitA < result.unitB ? "商品Aの方がお得です" : result.unitA > result.unitB ? "商品Bの方がお得です" : "同じ単価です"}
          </p>
        </div>
      )}
    </div>
  );
}
