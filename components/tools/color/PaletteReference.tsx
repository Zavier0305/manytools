"use client";

import CopyButton from "@/components/ui/CopyButton";
import { MATERIAL_PALETTE, TAILWIND_PALETTE } from "@/lib/color/paletteReferences";

export default function PaletteReference({ config }: { config?: Record<string, unknown> }) {
  const source = (config?.palette as string) === "material" ? MATERIAL_PALETTE : TAILWIND_PALETTE;

  return (
    <div className="space-y-3">
      {source.map((color) => (
        <div key={color.name} className="flex items-center gap-2 overflow-x-auto">
          <span className="w-24 shrink-0 text-sm font-medium text-slate-600">{color.name}</span>
          {Object.entries(color.shades).map(([shade, hex]) => (
            <div key={shade} className="group relative shrink-0">
              <div
                className="h-12 w-12 rounded-lg border border-slate-200"
                style={{ backgroundColor: hex }}
                title={`${color.name}-${shade}: ${hex}`}
              />
              <CopyButton
                getText={() => hex}
                label={shade}
                className="mt-1 block w-full text-center text-[10px] text-slate-400 hover:text-indigo-600"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
