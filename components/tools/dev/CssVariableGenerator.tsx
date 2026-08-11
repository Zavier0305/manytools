"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function CssVariableGenerator() {
  const [input, setInput] = useState("primary,#6366f1\nsecondary,#ec4899\naccent,#22c55e");

  const output = useMemo(() => {
    const rows = input
      .split("\n")
      .map((line) => line.split(",").map((v) => v.trim()))
      .filter(([name, value]) => name && value);
    if (rows.length === 0) return "";
    return `:root {\n${rows.map(([name, value]) => `  --color-${name}: ${value};`).join("\n")}\n}`;
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">1行に「変数名, 値」を入力</label>
        <textarea className="tool-textarea font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {output && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">CSS変数</label>
            <CopyButton getText={() => output} />
          </div>
          <textarea className="tool-textarea min-h-[10rem] font-mono text-sm" value={output} readOnly />
        </div>
      )}
    </div>
  );
}
