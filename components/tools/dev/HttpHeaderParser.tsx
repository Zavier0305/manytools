"use client";

import { useMemo, useState } from "react";

export default function HttpHeaderParser() {
  const [input, setInput] = useState("Content-Type: application/json\nCache-Control: no-cache\nX-Request-Id: abc123");

  const rows = useMemo(() => {
    return input
      .split("\n")
      .map((line) => {
        const idx = line.indexOf(":");
        if (idx === -1) return null;
        return { key: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
      })
      .filter((r): r is { key: string; value: string } => r !== null && r.key !== "");
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">HTTPヘッダー(1行に1つ、Key: Value形式)</label>
        <textarea className="tool-textarea min-h-[10rem] font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {rows.length > 0 && (
        <div className="tool-panel overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-2">ヘッダー名</th>
                <th className="px-4 py-2">値</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="whitespace-nowrap px-4 py-1.5 font-mono text-indigo-600">{r.key}</td>
                  <td className="px-4 py-1.5 font-mono">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
