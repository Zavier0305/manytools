"use client";

import { useMemo, useState } from "react";
import { hexToRgb, rgbToHex } from "@/lib/color/color";

export default function ColorBlendCalculator() {
  const [colorA, setColorA] = useState("#3366ff");
  const [colorB, setColorB] = useState("#ff3366");
  const [ratio, setRatio] = useState(50);

  const blended = useMemo(() => {
    try {
      const a = hexToRgb(colorA);
      const b = hexToRgb(colorB);
      const t = ratio / 100;
      return rgbToHex({
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
      });
    } catch {
      return null;
    }
  }, [colorA, colorB, ratio]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div>
          <label className="tool-label">色A</label>
          <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="h-12 w-16 rounded-lg border border-slate-300" />
        </div>
        <div>
          <label className="tool-label">色B</label>
          <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="h-12 w-16 rounded-lg border border-slate-300" />
        </div>
      </div>
      <div>
        <label className="tool-label">混合比: 色B {ratio}%</label>
        <input type="range" min={0} max={100} value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className="w-full" />
      </div>
      {blended && (
        <div className="tool-panel flex items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-lg border border-slate-200" style={{ backgroundColor: blended }} />
          <span className="font-mono text-xl font-bold text-indigo-600">{blended}</span>
        </div>
      )}
    </div>
  );
}
