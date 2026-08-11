"use client";

import { useMemo, useState } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/color/color";
import CopyButton from "@/components/ui/CopyButton";

export default function ColorPaletteGenerator() {
  const [baseHex, setBaseHex] = useState("#6366f1");

  const { shades, analogous, error } = useMemo(() => {
    try {
      const rgb = hexToRgb(baseHex);
      const hsl = rgbToHsl(rgb);
      const shadeLightness = [90, 75, 60, 45, 30, 15];
      const shades = shadeLightness.map((l) => rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l })));
      const analogous = [-60, -30, 0, 30, 60].map((offset) =>
        rgbToHex(hslToRgb({ h: (hsl.h + offset + 360) % 360, s: hsl.s, l: hsl.l }))
      );
      return { shades, analogous, error: null as string | null };
    } catch (e) {
      return { shades: [], analogous: [], error: e instanceof Error ? e.message : "無効な色です" };
    }
  }, [baseHex]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <input type="color" value={error ? "#000000" : baseHex} onChange={(e) => setBaseHex(e.target.value)} className="h-12 w-12 rounded-lg border border-slate-300" />
        <input type="text" className="tool-input font-mono" value={baseHex} onChange={(e) => setBaseHex(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && (
        <>
          <div>
            <h2 className="mb-2 font-semibold text-slate-800">明度バリエーション</h2>
            <Swatches colors={shades} />
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-slate-800">類似色(アナログ配色)</h2>
            <Swatches colors={analogous} />
          </div>
        </>
      )}
    </div>
  );
}

function Swatches({ colors }: { colors: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {colors.map((c, i) => (
        <div key={`${c}-${i}`} className="overflow-hidden rounded-lg border border-slate-200">
          <div className="h-16" style={{ backgroundColor: c }} />
          <div className="flex items-center justify-between bg-white px-2 py-1 text-xs">
            <span className="font-mono">{c}</span>
            <CopyButton getText={() => c} label="copy" className="text-indigo-600 hover:underline" />
          </div>
        </div>
      ))}
    </div>
  );
}
