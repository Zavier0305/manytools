"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { caesarCipher } from "@/lib/text/baseEncodings";

export default function CaesarCipherTool() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const output = useMemo(() => caesarCipher(input, shift), [input, shift]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">シフト数(復号する場合は負の値を入力)</label>
        <input
          type="number"
          className="tool-input w-32"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value) || 0)}
        />
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
