"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function CssFilterGenerator() {
  const [grayscale, setGrayscale] = useState(0);
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);

  const css = useMemo(
    () =>
      `grayscale(${grayscale}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg)`,
    [grayscale, blur, brightness, contrast, saturate, hueRotate]
  );

  const sliders: [string, number, number, (v: number) => void][] = [
    ["グレースケール(%)", grayscale, 100, setGrayscale],
    ["ぼかし(px)", blur, 20, setBlur],
    ["明るさ(%)", brightness, 200, setBrightness],
    ["コントラスト(%)", contrast, 200, setContrast],
    ["彩度(%)", saturate, 200, setSaturate],
    ["色相回転(deg)", hueRotate, 360, setHueRotate],
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sliders.map(([label, value, max, setter]) => (
          <div key={label}>
            <label className="tool-label">
              {label}: {value}
            </label>
            <input type="range" min={0} max={max} value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-center rounded-xl bg-slate-100 p-6">
        <div
          className="h-32 w-32 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500"
          style={{ filter: css }}
        />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">CSS</label>
          <CopyButton getText={() => `filter: ${css};`} />
        </div>
        <textarea className="tool-textarea min-h-[4rem] font-mono text-sm" value={`filter: ${css};`} readOnly />
      </div>
    </div>
  );
}
