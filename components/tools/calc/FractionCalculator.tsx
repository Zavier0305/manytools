"use client";

import { useMemo, useState } from "react";
import { reduceFraction } from "@/lib/calc/mathUtils";

export default function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [op, setOp] = useState("+");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");

  const { result, error } = useMemo(() => {
    const a = parseInt(n1, 10);
    const b = parseInt(d1, 10);
    const c = parseInt(n2, 10);
    const d = parseInt(d2, 10);
    if (![a, b, c, d].every(Number.isFinite) || b === 0 || d === 0) {
      return { result: null, error: "分母を0にすることはできません" };
    }
    try {
      let num: number;
      let den: number;
      switch (op) {
        case "+":
          num = a * d + c * b;
          den = b * d;
          break;
        case "-":
          num = a * d - c * b;
          den = b * d;
          break;
        case "*":
          num = a * c;
          den = b * d;
          break;
        default:
          if (c === 0) return { result: null, error: "0で割ることはできません" };
          num = a * d;
          den = b * c;
      }
      const [rn, rd] = reduceFraction(num, den);
      return { result: { num: rn, den: rd, decimal: rn / rd }, error: null as string | null };
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : "計算できません" };
    }
  }, [n1, d1, op, n2, d2]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <FractionInput num={n1} den={d1} onNum={setN1} onDen={setD1} />
        <select className="tool-input w-16 text-center" value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <FractionInput num={n2} den={d2} onNum={setN2} onDen={setD2} />
      </div>
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      {result && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {result.den === 1 ? result.num : `${result.num} / ${result.den}`}
          </div>
          <div className="mt-1 text-sm text-slate-500">≈ {result.decimal.toFixed(6)}</div>
        </div>
      )}
    </div>
  );
}

function FractionInput({
  num,
  den,
  onNum,
  onDen,
}: {
  num: string;
  den: string;
  onNum: (v: string) => void;
  onDen: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <input type="number" className="tool-input w-20 text-center" value={num} onChange={(e) => onNum(e.target.value)} />
      <div className="h-px w-16 bg-slate-400" />
      <input type="number" className="tool-input w-20 text-center" value={den} onChange={(e) => onDen(e.target.value)} />
    </div>
  );
}
