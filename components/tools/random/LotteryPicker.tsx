"use client";

import { useState } from "react";

export default function LotteryPicker() {
  const [input, setInput] = useState("Aさん\nBさん\nCさん\nDさん");
  const [winner, setWinner] = useState<string | null>(null);

  function draw() {
    const candidates = input.split("\n").map((s) => s.trim()).filter(Boolean);
    if (candidates.length === 0) {
      setWinner(null);
      return;
    }
    setWinner(candidates[Math.floor(Math.random() * candidates.length)]);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">候補(1行に1つ)</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <button type="button" className="btn" onClick={draw}>
        抽選する
      </button>
      {winner && (
        <div className="tool-panel text-center">
          <div className="text-sm text-slate-500">当選</div>
          <div className="mt-1 text-3xl font-bold text-indigo-600">{winner}</div>
        </div>
      )}
    </div>
  );
}
