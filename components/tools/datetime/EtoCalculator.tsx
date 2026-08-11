"use client";

import { useMemo, useState } from "react";

const ETO = ["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"];
const ETO_ANIMAL: Record<string, string> = {
  子: "ねずみ", 丑: "うし", 寅: "とら", 卯: "うさぎ", 辰: "たつ", 巳: "へび",
  午: "うま", 未: "ひつじ", 申: "さる", 酉: "とり", 戌: "いぬ", 亥: "いのしし",
};

export default function EtoCalculator() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const result = useMemo(() => {
    const y = parseInt(year, 10);
    if (!Number.isInteger(y)) return null;
    const eto = ETO[((y % 12) + 12) % 12];
    return { eto, animal: ETO_ANIMAL[eto] };
  }, [year]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">西暦年</label>
        <input type="number" className="tool-input" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel text-center">
          <div className="text-4xl font-bold text-indigo-600">{result.eto}年</div>
          <div className="mt-1 text-slate-500">({result.animal}年)</div>
        </div>
      )}
    </div>
  );
}
