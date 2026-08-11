"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { generateDummyRecords, type DummyRecord } from "@/lib/dev/dummyData";

export default function DummyDataGenerator() {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [records, setRecords] = useState<DummyRecord[]>([]);

  function generate() {
    setRecords(generateDummyRecords(Math.min(100, Math.max(1, count))));
  }

  const output =
    format === "json"
      ? JSON.stringify(records, null, 2)
      : records.length > 0
        ? ["name,email,phone,address", ...records.map((r) => `${r.name},${r.email},${r.phone},${r.address}`)].join("\n")
        : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="tool-label">生成件数</label>
          <input
            type="number"
            min={1}
            max={100}
            className="tool-input w-24"
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
          />
        </div>
        <div>
          <label className="tool-label">形式</label>
          <select className="tool-input" value={format} onChange={(e) => setFormat(e.target.value as typeof format)}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <button type="button" className="btn" onClick={generate}>
          生成する
        </button>
      </div>
      {output && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">結果</label>
            <CopyButton getText={() => output} />
          </div>
          <textarea className="tool-textarea min-h-[16rem] font-mono text-sm" value={output} readOnly />
        </div>
      )}
    </div>
  );
}
