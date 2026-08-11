"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function LoremPicsumGenerator() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [grayscale, setGrayscale] = useState(false);
  const [seed, setSeed] = useState("");

  const url = useMemo(() => {
    const base = seed ? `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}` : `https://picsum.photos/${width}/${height}`;
    return grayscale ? `${base}${base.includes("?") ? "&" : "?"}grayscale` : base;
  }, [width, height, grayscale, seed]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">幅(px)</label>
          <input type="number" className="tool-input" value={width} onChange={(e) => setWidth(Number(e.target.value) || 1)} />
        </div>
        <div>
          <label className="tool-label">高さ(px)</label>
          <input type="number" className="tool-input" value={height} onChange={(e) => setHeight(Number(e.target.value) || 1)} />
        </div>
      </div>
      <div>
        <label className="tool-label">シード(任意・同じ画像を再現したい場合)</label>
        <input type="text" className="tool-input" value={seed} onChange={(e) => setSeed(e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} />
        グレースケール
      </label>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">URL</label>
          <CopyButton getText={() => url} />
        </div>
        <input type="text" className="tool-input font-mono text-sm" value={url} readOnly />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Lorem Picsum プレビュー" className="mx-auto rounded-lg border border-slate-200" />
      <p className="text-xs text-slate-400">
        ※ このプレビューは外部サービス picsum.photos から画像を取得します。
      </p>
    </div>
  );
}
