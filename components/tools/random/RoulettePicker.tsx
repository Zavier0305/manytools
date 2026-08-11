"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function RoulettePicker() {
  const [input, setInput] = useState("Aさん\nBさん\nCさん\nDさん\nEさん");
  const [order, setOrder] = useState<string[]>([]);

  function shuffle() {
    const items = input.split("\n").map((s) => s.trim()).filter(Boolean);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setOrder(items);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">候補(1行に1つ)</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <button type="button" className="btn" onClick={shuffle}>
        順番を決める
      </button>
      {order.length > 0 && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">決定した順番</label>
            <CopyButton getText={() => order.map((o, i) => `${i + 1}. ${o}`).join("\n")} />
          </div>
          <ol className="tool-panel list-decimal space-y-1 pl-6">
            {order.map((o, i) => (
              <li key={i} className="font-medium">
                {o}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
