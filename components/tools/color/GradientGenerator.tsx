"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function GradientGenerator() {
  const [colorA, setColorA] = useState("#6366f1");
  const [colorB, setColorB] = useState("#ec4899");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css = useMemo(() => {
    if (type === "radial") return `radial-gradient(circle, ${colorA}, ${colorB})`;
    return `linear-gradient(${angle}deg, ${colorA}, ${colorB})`;
  }, [type, colorA, colorB, angle]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["linear", "radial"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={type === t ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
          >
            {t === "linear" ? "線形グラデーション" : "円形グラデーション"}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="tool-label">色1</label>
          <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="h-10 w-16 rounded-lg border border-slate-300" />
        </div>
        <div>
          <label className="tool-label">色2</label>
          <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="h-10 w-16 rounded-lg border border-slate-300" />
        </div>
        {type === "linear" && (
          <div className="flex-1 min-w-[10rem]">
            <label className="tool-label">角度: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
          </div>
        )}
      </div>
      <div className="h-40 rounded-xl border border-slate-200" style={{ backgroundImage: css }} />
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">CSS</label>
          <CopyButton getText={() => `background: ${css};`} />
        </div>
        <input type="text" className="tool-input font-mono" value={`background: ${css};`} readOnly />
      </div>
    </div>
  );
}
