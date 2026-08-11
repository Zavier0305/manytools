"use client";

import { useMemo, useState } from "react";
import { diffLines } from "@/lib/text/diff";

export default function JsonDiffTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const { ops, error } = useMemo(() => {
    if (!left.trim() || !right.trim()) return { ops: null, error: null as string | null };
    try {
      const a = JSON.stringify(JSON.parse(left), null, 2);
      const b = JSON.stringify(JSON.parse(right), null, 2);
      return { ops: diffLines(a, b), error: null as string | null };
    } catch (e) {
      return { ops: null, error: e instanceof Error ? `JSONエラー: ${e.message}` : "有効なJSONではありません" };
    }
  }, [left, right]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="tool-label">JSON A</label>
          <textarea className="tool-textarea min-h-[12rem]" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">JSON B</label>
          <textarea className="tool-textarea min-h-[12rem]" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {ops && (
        <div className="tool-panel overflow-x-auto p-0">
          <pre className="font-mono text-sm leading-relaxed">
            {ops.map((op, idx) => (
              <div
                key={idx}
                className={
                  op.type === "add"
                    ? "bg-green-50 px-3 py-0.5 text-green-800"
                    : op.type === "remove"
                      ? "bg-red-50 px-3 py-0.5 text-red-800"
                      : "px-3 py-0.5 text-slate-600"
                }
              >
                {op.type === "add" ? "+ " : op.type === "remove" ? "- " : "  "}
                {op.line || " "}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
