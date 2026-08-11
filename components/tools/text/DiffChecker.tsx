"use client";

import { useMemo, useState } from "react";
import { diffLines } from "@/lib/text/diff";

export default function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const ops = useMemo(() => diffLines(left, right), [left, right]);
  const added = ops.filter((o) => o.type === "add").length;
  const removed = ops.filter((o) => o.type === "remove").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="tool-label">テキストA(変更前)</label>
          <textarea className="tool-textarea min-h-[12rem]" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">テキストB(変更後)</label>
          <textarea className="tool-textarea min-h-[12rem]" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>
      <p className="text-sm text-slate-500">
        <span className="text-green-600">+{added} 追加</span> ・{" "}
        <span className="text-red-600">-{removed} 削除</span>
      </p>
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
    </div>
  );
}
