"use client";

import { useMemo, useState } from "react";
import { areAnagrams } from "@/lib/text/moreText";

export default function AnagramChecker() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const result = useMemo(() => (a.trim() && b.trim() ? areAnagrams(a, b) : null), [a, b]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="tool-label">テキストA</label>
          <input type="text" className="tool-input" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">テキストB</label>
          <input type="text" className="tool-input" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <p className={`text-2xl font-bold ${result ? "text-green-600" : "text-slate-500"}`}>
            {result ? "アナグラムです!🎉" : "アナグラムではありません"}
          </p>
        </div>
      )}
    </div>
  );
}
