"use client";

import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"表" | "裏" | null>(null);
  const [history, setHistory] = useState<("表" | "裏")[]>([]);

  function flip() {
    const outcome = Math.random() < 0.5 ? "表" : "裏";
    setResult(outcome);
    setHistory((prev) => [outcome, ...prev].slice(0, 20) as ("表" | "裏")[]);
  }

  return (
    <div className="space-y-4">
      <div className="tool-panel flex h-40 items-center justify-center">
        <span className="text-6xl font-bold text-indigo-600">{result ?? "?"}</span>
      </div>
      <button type="button" className="btn" onClick={flip}>
        コインを投げる
      </button>
      {history.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {history.map((h, i) => (
            <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm">
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
