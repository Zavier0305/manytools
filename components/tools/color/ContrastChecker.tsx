"use client";

import { useMemo, useState } from "react";
import { contrastRatio, hexToRgb } from "@/lib/color/color";

export default function ContrastChecker() {
  const [fg, setFg] = useState("#1e293b");
  const [bg, setBg] = useState("#ffffff");

  const { ratio, error } = useMemo(() => {
    try {
      const ratio = contrastRatio(hexToRgb(fg), hexToRgb(bg));
      return { ratio, error: null as string | null };
    } catch (e) {
      return { ratio: null, error: e instanceof Error ? e.message : "無効な色です" };
    }
  }, [fg, bg]);

  const checks = ratio
    ? [
        { label: "通常テキスト AA (4.5:1以上)", pass: ratio >= 4.5 },
        { label: "通常テキスト AAA (7:1以上)", pass: ratio >= 7 },
        { label: "大きいテキスト AA (3:1以上)", pass: ratio >= 3 },
        { label: "大きいテキスト AAA (4.5:1以上)", pass: ratio >= 4.5 },
      ]
    : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">文字色</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-14 rounded-lg border border-slate-300" />
            <input type="text" className="tool-input font-mono" value={fg} onChange={(e) => setFg(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="tool-label">背景色</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-14 rounded-lg border border-slate-300" />
            <input type="text" className="tool-input font-mono" value={bg} onChange={(e) => setBg(e.target.value)} />
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && (
        <>
          <div className="flex items-center justify-center rounded-xl border border-slate-200 p-10 text-2xl font-bold" style={{ color: fg, backgroundColor: bg }}>
            サンプルテキスト Sample Text
          </div>
          <div className="tool-panel text-center">
            <div className="text-4xl font-bold text-indigo-600">{ratio?.toFixed(2)} : 1</div>
          </div>
          <ul className="space-y-1 text-sm">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center justify-between">
                <span className="text-slate-600">{c.label}</span>
                <span className={c.pass ? "font-medium text-green-600" : "font-medium text-red-600"}>
                  {c.pass ? "合格" : "不合格"}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
