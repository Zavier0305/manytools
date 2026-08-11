"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function RandomStringGenerator() {
  const [length, setLength] = useState(12);
  const [charset, setCharset] = useState("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
  const [count, setCount] = useState(5);
  const [results, setResults] = useState<string[]>([]);

  function generate() {
    if (!charset) return;
    const randomValues = new Uint32Array(length * count);
    crypto.getRandomValues(randomValues);
    const outputs: string[] = [];
    for (let i = 0; i < count; i++) {
      let s = "";
      for (let j = 0; j < length; j++) {
        s += charset[randomValues[i * length + j] % charset.length];
      }
      outputs.push(s);
    }
    setResults(outputs);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label className="tool-label">文字数</label>
          <input type="number" min={1} max={256} className="tool-input" value={length} onChange={(e) => setLength(Math.max(1, Number(e.target.value) || 1))} />
        </div>
        <div>
          <label className="tool-label">生成数</label>
          <input type="number" min={1} max={100} className="tool-input" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))} />
        </div>
      </div>
      <div>
        <label className="tool-label">使用する文字</label>
        <input type="text" className="tool-input font-mono" value={charset} onChange={(e) => setCharset(e.target.value)} />
      </div>
      <button type="button" className="btn" onClick={generate}>
        生成する
      </button>
      {results.length > 0 && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">結果</label>
            <CopyButton getText={() => results.join("\n")} label="すべてコピー" />
          </div>
          <textarea className="tool-textarea min-h-[10rem]" value={results.join("\n")} readOnly />
        </div>
      )}
    </div>
  );
}
