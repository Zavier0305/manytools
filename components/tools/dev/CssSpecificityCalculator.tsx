"use client";

import { useMemo, useState } from "react";
import { calculateSpecificity } from "@/lib/dev/cssSpecificity";

export default function CssSpecificityCalculator() {
  const [selector, setSelector] = useState("#header .nav > ul li a:hover");
  const specificity = useMemo(() => calculateSpecificity(selector), [selector]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">CSSセレクタ</label>
        <input type="text" className="tool-input font-mono" value={selector} onChange={(e) => setSelector(e.target.value)} />
      </div>
      <div className="tool-panel text-center">
        <div className="text-3xl font-bold text-indigo-600 font-mono">
          {specificity.ids}, {specificity.classes}, {specificity.elements}
        </div>
        <div className="mt-2 flex justify-center gap-6 text-sm text-slate-500">
          <span>ID: {specificity.ids}</span>
          <span>クラス/属性/擬似クラス: {specificity.classes}</span>
          <span>要素/擬似要素: {specificity.elements}</span>
        </div>
      </div>
    </div>
  );
}
