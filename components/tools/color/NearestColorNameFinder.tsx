"use client";

import { useMemo, useState } from "react";
import { hexToRgb } from "@/lib/color/color";
import { NAMED_COLORS } from "@/lib/color/namedColors";

export default function NearestColorNameFinder() {
  const [hex, setHex] = useState("#3366ff");

  const { nearest, error } = useMemo(() => {
    try {
      const rgb = hexToRgb(hex);
      let best = NAMED_COLORS[0];
      let bestDist = Infinity;
      for (const c of NAMED_COLORS) {
        const crgb = hexToRgb(c.hex);
        const dist = (rgb.r - crgb.r) ** 2 + (rgb.g - crgb.g) ** 2 + (rgb.b - crgb.b) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = c;
        }
      }
      return { nearest: best, error: null as string | null };
    } catch (e) {
      return { nearest: null, error: e instanceof Error ? e.message : "無効な色です" };
    }
  }, [hex]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={error ? "#000000" : hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-12 rounded-lg border border-slate-300" />
        <input type="text" className="tool-input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {nearest && (
        <div className="tool-panel flex items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-lg border border-slate-200" style={{ backgroundColor: nearest.hex }} />
          <div>
            <div className="text-2xl font-bold text-slate-800">{nearest.name}</div>
            <div className="font-mono text-sm text-slate-500">{nearest.hex}</div>
          </div>
        </div>
      )}
    </div>
  );
}
