"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";

export default function QuadraticEquationCalculator() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-3");
  const [c, setC] = useState("2");

  const result = useMemo(() => {
    const av = parseFloat(a);
    const bv = parseFloat(b);
    const cv = parseFloat(c);
    if (![av, bv, cv].every(Number.isFinite) || av === 0) return null;
    const discriminant = bv * bv - 4 * av * cv;
    if (discriminant < 0) {
      const real = -bv / (2 * av);
      const imag = Math.sqrt(-discriminant) / (2 * av);
      return { type: "complex" as const, text: `x = ${real.toFixed(4)} ± ${imag.toFixed(4)}i` };
    }
    const sqrtD = Math.sqrt(discriminant);
    const x1 = (-bv + sqrtD) / (2 * av);
    const x2 = (-bv - sqrtD) / (2 * av);
    if (discriminant === 0) return { type: "real" as const, text: `x = ${x1.toFixed(4)} (重解)` };
    return { type: "real" as const, text: `x = ${x1.toFixed(4)}, ${x2.toFixed(4)}` };
  }, [a, b, c]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">ax² + bx + c = 0 を解きます</p>
      <div className="grid grid-cols-3 gap-3">
        <NumberField label="a" value={a} onChange={setA} />
        <NumberField label="b" value={b} onChange={setB} />
        <NumberField label="c" value={c} onChange={setC} />
      </div>
      {result && (
        <div className="tool-panel text-center text-2xl font-bold text-indigo-600">{result.text}</div>
      )}
      {!result && a && b && c && parseFloat(a) === 0 && (
        <p className="text-sm text-red-600">aは0以外を入力してください</p>
      )}
    </div>
  );
}
