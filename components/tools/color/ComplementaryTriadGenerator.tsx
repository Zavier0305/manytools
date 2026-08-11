"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/color/color";

export default function ComplementaryTriadGenerator() {
  const [hex, setHex] = useState("#3366ff");

  const { complementary, triad, error } = useMemo(() => {
    try {
      const hsl = rgbToHsl(hexToRgb(hex));
      const complementary = rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + 180) % 360 }));
      const triad = [120, 240].map((offset) => rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + offset) % 360 })));
      return { complementary, triad, error: null as string | null };
    } catch (e) {
      return { complementary: null, triad: [], error: e instanceof Error ? e.message : "無効な色です" };
    }
  }, [hex]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={error ? "#000000" : hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-12 rounded-lg border border-slate-300" />
        <input type="text" className="tool-input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {complementary && (
        <div className="space-y-4">
          <div>
            <h2 className="mb-2 font-semibold text-slate-800">補色</h2>
            <Swatches colors={[hex, complementary]} />
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-slate-800">トライアド配色</h2>
            <Swatches colors={[hex, ...triad]} />
          </div>
        </div>
      )}
    </div>
  );
}

function Swatches({ colors }: { colors: string[] }) {
  return (
    <div className="flex gap-3">
      {colors.map((c, i) => (
        <div key={`${c}-${i}`} className="overflow-hidden rounded-lg border border-slate-200">
          <div className="h-16 w-24" style={{ backgroundColor: c }} />
          <div className="flex items-center justify-between bg-white px-2 py-1 text-xs">
            <span className="font-mono">{c}</span>
            <CopyButton getText={() => c} label="copy" className="text-indigo-600 hover:underline" />
          </div>
        </div>
      ))}
    </div>
  );
}
