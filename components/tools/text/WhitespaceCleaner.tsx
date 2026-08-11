"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { cleanupWhitespace } from "@/lib/text/lineTools";

export default function WhitespaceCleaner() {
  const [input, setInput] = useState("");
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);

  const output = useMemo(
    () => cleanupWhitespace(input, { trimLines, collapseSpaces, removeBlankLines }),
    [input, trimLines, collapseSpaces, removeBlankLines]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
          各行の前後の空白を削除
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={collapseSpaces}
            onChange={(e) => setCollapseSpaces(e.target.checked)}
          />
          連続する空白を1つにまとめる
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={removeBlankLines}
            onChange={(e) => setRemoveBlankLines(e.target.checked)}
          />
          空行を削除
        </label>
      </div>
      <div>
        <label className="tool-label">入力</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
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
