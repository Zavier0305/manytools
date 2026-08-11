"use client";

import { useMemo, useState } from "react";

export default function UnicodeCodepointViewer() {
  const [text, setText] = useState("こんにちは😀");

  const rows = useMemo(() => {
    return Array.from(text).map((ch) => {
      const codePoint = ch.codePointAt(0) ?? 0;
      const bytes = Array.from(new TextEncoder().encode(ch))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
      return {
        char: ch,
        codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
        decimal: codePoint,
        utf8: bytes,
      };
    });
  }, [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <input type="text" className="tool-input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {rows.length > 0 && (
        <div className="tool-panel max-h-96 overflow-y-auto p-0">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-2">文字</th>
                <th className="px-4 py-2">コードポイント</th>
                <th className="px-4 py-2">10進数</th>
                <th className="px-4 py-2">UTF-8バイト列</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 font-mono">
                  <td className="px-4 py-1.5">{r.char}</td>
                  <td className="px-4 py-1.5">{r.codePoint}</td>
                  <td className="px-4 py-1.5">{r.decimal}</td>
                  <td className="px-4 py-1.5">{r.utf8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
