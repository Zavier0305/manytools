"use client";

import { useMemo, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as RegExpMatchArray[], error: null as string | null };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return { matches: Array.from(text.matchAll(re)), error: null as string | null };
    } catch (e) {
      return { matches: [] as RegExpMatchArray[], error: e instanceof Error ? e.message : "無効な正規表現です" };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    const parts: { text: string; match: boolean }[] = [];
    let lastIndex = 0;
    for (const m of matches) {
      const index = m.index ?? 0;
      if (index > lastIndex) parts.push({ text: text.slice(lastIndex, index), match: false });
      parts.push({ text: m[0], match: true });
      lastIndex = index + m[0].length;
    }
    if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), match: false });
    return parts;
  }, [matches, error, text]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="tool-label">正規表現パターン</label>
          <input
            type="text"
            className="tool-input font-mono"
            placeholder="例: [a-z]+@[a-z]+\.com"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
        </div>
        <div className="w-28">
          <label className="tool-label">フラグ</label>
          <input
            type="text"
            className="tool-input font-mono"
            placeholder="gi"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="tool-label">対象テキスト</label>
        <textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      {!error && highlighted && (
        <div className="tool-panel whitespace-pre-wrap break-words font-mono text-sm">
          {highlighted.map((part, i) =>
            part.match ? (
              <mark key={i} className="rounded bg-yellow-200 px-0.5">
                {part.text}
              </mark>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </div>
      )}
      <p className="text-sm text-slate-500">{matches.length} 件マッチしました</p>
    </div>
  );
}
