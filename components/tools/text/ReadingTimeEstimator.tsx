"use client";

import { useMemo, useState } from "react";
import { estimateReadingTimeMinutes } from "@/lib/text/moreText";

export default function ReadingTimeEstimator() {
  const [text, setText] = useState("");
  const minutes = useMemo(() => estimateReadingTimeMinutes(text), [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="tool-panel text-center">
        <div className="text-3xl font-bold text-indigo-600">
          約{minutes < 1 ? "1分未満" : `${Math.ceil(minutes)}分`}
        </div>
        <p className="mt-1 text-sm text-slate-500">
          日本語は400文字/分、英語は200単語/分で計算した目安です
        </p>
      </div>
    </div>
  );
}
