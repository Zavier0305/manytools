"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { randomHexColor } from "@/lib/color/color";

export default function RandomColorGenerator() {
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 8 }, randomHexColor));

  return (
    <div className="space-y-4">
      <button type="button" className="btn" onClick={() => setColors(Array.from({ length: 8 }, randomHexColor))}>
        新しい色を生成
      </button>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {colors.map((c, i) => (
          <div key={`${c}-${i}`} className="overflow-hidden rounded-lg border border-slate-200">
            <div className="h-20" style={{ backgroundColor: c }} />
            <div className="flex items-center justify-between bg-white px-2 py-1.5 text-sm">
              <span className="font-mono">{c}</span>
              <CopyButton getText={() => c} label="コピー" className="text-indigo-600 hover:underline text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
