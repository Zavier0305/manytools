"use client";

import { useMemo, useState } from "react";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/color/color";

export default function ColorLightenDarken() {
  const [hex, setHex] = useState("#3366ff");
  const [amount, setAmount] = useState(0);

  const result = useMemo(() => {
    try {
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb);
      const newL = Math.min(100, Math.max(0, hsl.l + amount));
      return rgbToHex(hslToRgb({ ...hsl, l: newL }));
    } catch {
      return null;
    }
  }, [hex, amount]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-12 rounded-lg border border-slate-300" />
        <input type="text" className="tool-input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">
          明度調整: {amount > 0 ? `+${amount}` : amount}
        </label>
        <input type="range" min={-50} max={50} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
      </div>
      {result && (
        <div className="tool-panel flex items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-lg border border-slate-200" style={{ backgroundColor: result }} />
          <span className="font-mono text-xl font-bold text-indigo-600">{result}</span>
        </div>
      )}
    </div>
  );
}
