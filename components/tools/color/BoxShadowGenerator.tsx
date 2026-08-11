"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function BoxShadowGenerator() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);

  const css = useMemo(() => {
    const rgb = hexToRgba(color, opacity / 100);
    return `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgb}`;
  }, [offsetX, offsetY, blur, spread, color, opacity, inset]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SliderField label="横方向" value={offsetX} min={-50} max={50} onChange={setOffsetX} />
        <SliderField label="縦方向" value={offsetY} min={-50} max={50} onChange={setOffsetY} />
        <SliderField label="ぼかし" value={blur} min={0} max={100} onChange={setBlur} />
        <SliderField label="広がり" value={spread} min={-50} max={50} onChange={setSpread} />
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="tool-label">色</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 rounded-lg border border-slate-300" />
        </div>
        <SliderField label="不透明度" value={opacity} min={0} max={100} onChange={setOpacity} unit="%" />
        <label className="flex items-center gap-2 pb-2 text-sm text-slate-700">
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
          内側(inset)
        </label>
      </div>
      <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100">
        <div className="h-24 w-24 rounded-xl bg-white" style={{ boxShadow: css }} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">CSS</label>
          <CopyButton getText={() => `box-shadow: ${css};`} />
        </div>
        <input type="text" className="tool-input font-mono" value={`box-shadow: ${css};`} readOnly />
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

function SliderField({
  label,
  value,
  min,
  max,
  onChange,
  unit = "px",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  return (
    <div>
      <label className="tool-label">
        {label}: {value}
        {unit}
      </label>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}
