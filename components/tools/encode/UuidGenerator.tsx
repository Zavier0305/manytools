"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

function generateUuids(count: number): string[] {
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(5));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="tool-label">生成する個数</label>
          <input
            type="number"
            min={1}
            max={100}
            className="tool-input w-24"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
          />
        </div>
        <button type="button" className="btn" onClick={() => setUuids(generateUuids(count))}>
          生成する
        </button>
        <CopyButton getText={() => uuids.join("\n")} label="すべてコピー" />
      </div>
      <textarea className="tool-textarea min-h-[14rem]" value={uuids.join("\n")} readOnly />
    </div>
  );
}
