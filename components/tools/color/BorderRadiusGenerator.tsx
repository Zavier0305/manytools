"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);

  const css = useMemo(() => `${tl}px ${tr}px ${br}px ${bl}px`, [tl, tr, br, bl]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SliderField label="左上" value={tl} onChange={setTl} />
        <SliderField label="右上" value={tr} onChange={setTr} />
        <SliderField label="左下" value={bl} onChange={setBl} />
        <SliderField label="右下" value={br} onChange={setBr} />
      </div>
      <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
        <div className="h-32 w-32 bg-indigo-500" style={{ borderRadius: css }} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">CSS</label>
          <CopyButton getText={() => `border-radius: ${css};`} />
        </div>
        <input type="text" className="tool-input font-mono" value={`border-radius: ${css};`} readOnly />
      </div>
    </div>
  );
}

function SliderField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="tool-label">
        {label}: {value}px
      </label>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}
