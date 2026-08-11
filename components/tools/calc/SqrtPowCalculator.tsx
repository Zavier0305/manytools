"use client";

import { useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function SqrtPowCalculator() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("10");
  const [rootValue, setRootValue] = useState("16");
  const [rootN, setRootN] = useState("2");

  const baseNum = parseFloat(base);
  const expNum = parseFloat(exponent);
  const powResult = Number.isFinite(baseNum) && Number.isFinite(expNum) ? Math.pow(baseNum, expNum) : NaN;

  const rootValueNum = parseFloat(rootValue);
  const rootNNum = parseFloat(rootN);
  const rootResult =
    Number.isFinite(rootValueNum) && Number.isFinite(rootNNum) && rootNNum !== 0
      ? Math.sign(rootValueNum) * Math.pow(Math.abs(rootValueNum), 1 / rootNNum)
      : NaN;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">累乗計算</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="底" value={base} onChange={setBase} />
          <NumberField label="指数" value={exponent} onChange={setExponent} />
        </div>
        <ResultCard
          items={[{ label: `${base || 0} の ${exponent || 0} 乗`, value: Number.isFinite(powResult) ? String(powResult) : "-" }]}
        />
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">n乗根(平方根含む)</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="値" value={rootValue} onChange={setRootValue} />
          <NumberField label="n (2なら平方根)" value={rootN} onChange={setRootN} />
        </div>
        <ResultCard
          items={[{ label: `${rootValue || 0} の ${rootN || 0} 乗根`, value: Number.isFinite(rootResult) ? String(rootResult) : "-" }]}
        />
      </div>
    </div>
  );
}
