"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { repeatText } from "@/lib/text/moreText";

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(5);
  const [separator, setSeparator] = useState("\\n");

  const output = useMemo(
    () => repeatText(text, times, separator.replace(/\\n/g, "\n").replace(/\\t/g, "\t")),
    [text, times, separator]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">繰り返すテキスト</label>
        <input type="text" className="tool-input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">回数</label>
          <input
            type="number"
            min={1}
            max={1000}
            className="tool-input"
            value={times}
            onChange={(e) => setTimes(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
        <div>
          <label className="tool-label">区切り文字(\n=改行 \t=タブ)</label>
          <input type="text" className="tool-input" value={separator} onChange={(e) => setSeparator(e.target.value)} />
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
