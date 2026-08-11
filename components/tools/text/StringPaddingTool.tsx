"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { padString } from "@/lib/text/moreText";

export default function StringPaddingTool() {
  const [text, setText] = useState("");
  const [length, setLength] = useState(10);
  const [padChar, setPadChar] = useState("*");
  const [side, setSide] = useState<"left" | "right" | "both">("right");

  const output = useMemo(() => padString(text, length, padChar, side), [text, length, padChar, side]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト(複数行可)</label>
        <textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="tool-label">目標の長さ</label>
          <input
            type="number"
            min={1}
            className="tool-input"
            value={length}
            onChange={(e) => setLength(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
        <div>
          <label className="tool-label">埋める文字</label>
          <input type="text" className="tool-input" value={padChar} onChange={(e) => setPadChar(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">位置</label>
          <select className="tool-input" value={side} onChange={(e) => setSide(e.target.value as typeof side)}>
            <option value="right">右側</option>
            <option value="left">左側</option>
            <option value="both">両側</option>
          </select>
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">結果</label>
          <CopyButton getText={() => output} />
        </div>
        <textarea className="tool-textarea" value={output} readOnly />
      </div>
    </div>
  );
}
