"use client";

import { useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";

export default function PercentageCalculator() {
  const [a1, setA1] = useState("25");
  const [b1, setB1] = useState("200");

  const [a2, setA2] = useState("15");
  const [b2, setB2] = useState("80");

  const [from, setFrom] = useState("100");
  const [to, setTo] = useState("120");

  const r1 = parseFloat(b1) ? (parseFloat(a1) / parseFloat(b1)) * 100 : NaN;
  const r2 = (parseFloat(a2) / 100) * parseFloat(b2);
  const r3 = parseFloat(from) ? ((parseFloat(to) - parseFloat(from)) / parseFloat(from)) * 100 : NaN;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">AはBの何%?</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="A" value={a1} onChange={setA1} />
          <NumberField label="B" value={b1} onChange={setB1} />
        </div>
        <ResultCard items={[{ label: "結果", value: Number.isFinite(r1) ? `${r1.toFixed(2)}%` : "-" }]} />
      </div>
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">Bのa%はいくつ?</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="a (%)" value={a2} onChange={setA2} />
          <NumberField label="B" value={b2} onChange={setB2} />
        </div>
        <ResultCard items={[{ label: "結果", value: Number.isFinite(r2) ? String(r2) : "-" }]} />
      </div>
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">増減率(変化率)</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="変化前" value={from} onChange={setFrom} />
          <NumberField label="変化後" value={to} onChange={setTo} />
        </div>
        <ResultCard items={[{ label: "増減率", value: Number.isFinite(r3) ? `${r3 > 0 ? "+" : ""}${r3.toFixed(2)}%` : "-" }]} />
      </div>
    </div>
  );
}
