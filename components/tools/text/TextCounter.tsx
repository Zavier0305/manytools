"use client";

import { useMemo, useState } from "react";

function countStats(text: string) {
  const chars = Array.from(text).length;
  const charsNoSpaces = Array.from(text.replace(/\s/g, "")).length;
  const lines = text === "" ? 0 : text.replace(/\r\n/g, "\n").split("\n").length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const bytes = new TextEncoder().encode(text).length;
  return { chars, charsNoSpaces, lines, words, bytes };
}

export default function TextCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  const items = [
    { label: "文字数(空白含む)", value: stats.chars },
    { label: "文字数(空白除く)", value: stats.charsNoSpaces },
    { label: "単語数", value: stats.words },
    { label: "行数", value: stats.lines },
    { label: "バイト数(UTF-8)", value: stats.bytes },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <textarea
          className="tool-textarea min-h-[16rem]"
          placeholder="ここにテキストを入力してください"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="tool-panel text-center">
            <div className="text-2xl font-bold text-indigo-600">{item.value}</div>
            <div className="mt-1 text-xs text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
