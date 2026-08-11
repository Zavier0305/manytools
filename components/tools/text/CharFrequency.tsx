"use client";

import { useMemo, useState } from "react";
import { charFrequency } from "@/lib/text/lineTools";

export default function CharFrequency() {
  const [input, setInput] = useState("");
  const freq = useMemo(() => charFrequency(input), [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {freq.length > 0 && (
        <div className="tool-panel max-h-96 overflow-y-auto p-0">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-2">文字</th>
                <th className="px-4 py-2">出現回数</th>
                <th className="px-4 py-2">割合</th>
              </tr>
            </thead>
            <tbody>
              {freq.map((f) => (
                <tr key={f.char} className="border-t border-slate-100">
                  <td className="px-4 py-1.5 font-mono">{f.char === " " ? "(空白)" : f.char}</td>
                  <td className="px-4 py-1.5">{f.count}</td>
                  <td className="px-4 py-1.5">{f.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
