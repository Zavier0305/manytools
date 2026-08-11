"use client";

import { useMemo, useState } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, type RGB } from "@/lib/color/color";

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");

  const { rgb, hsl, error } = useMemo(() => {
    try {
      const rgbValue = hexToRgb(hex);
      return { rgb: rgbValue, hsl: rgbToHsl(rgbValue), error: null as string | null };
    } catch (e) {
      return { rgb: null, hsl: null, error: e instanceof Error ? e.message : "無効な色です" };
    }
  }, [hex]);

  function updateFromRgb(next: RGB) {
    setHex(rgbToHex(next));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={error ? "#000000" : hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-12 rounded-lg border border-slate-300" />
        <input type="text" className="tool-input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {rgb && hsl && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="tool-panel">
            <div className="mb-1 text-xs text-slate-500">HEX</div>
            <div className="font-mono text-lg">{rgbToHex(rgb)}</div>
          </div>
          <div className="tool-panel">
            <div className="mb-1 text-xs text-slate-500">RGB</div>
            <div className="font-mono text-lg">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </div>
          <div className="tool-panel">
            <div className="mb-1 text-xs text-slate-500">HSL</div>
            <div className="font-mono text-lg">
              hsl({hsl.h.toFixed(0)}, {hsl.s.toFixed(0)}%, {hsl.l.toFixed(0)}%)
            </div>
          </div>
        </div>
      )}
      {rgb && (
        <div className="space-y-2">
          {(["r", "g", "b"] as const).map((channel) => (
            <div key={channel} className="flex items-center gap-3">
              <label className="w-6 uppercase text-sm text-slate-500">{channel}</label>
              <input
                type="range"
                min={0}
                max={255}
                value={rgb[channel]}
                onChange={(e) => updateFromRgb({ ...rgb, [channel]: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="w-10 text-right font-mono text-sm">{rgb[channel]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
