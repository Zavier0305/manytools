"use client";

import { useMemo, useState } from "react";
import { countParagraphs, countSentences } from "@/lib/text/moreText";

export default function SingleStatCounter({ config }: { config?: Record<string, unknown> }) {
  const stat = (config?.stat as string) ?? "sentence";
  const [text, setText] = useState("");
  const count = useMemo(
    () => (stat === "paragraph" ? countParagraphs(text) : countSentences(text)),
    [text, stat]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="tool-panel text-center">
        <div className="text-3xl font-bold text-indigo-600">{count}</div>
        <p className="mt-1 text-sm text-slate-500">{stat === "paragraph" ? "段落数" : "文の数"}</p>
      </div>
    </div>
  );
}
