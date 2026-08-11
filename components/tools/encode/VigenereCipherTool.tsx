"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { vigenereCipher } from "@/lib/text/baseEncodings";

export default function VigenereCipherTool() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("KEY");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const { output, error } = useMemo(() => {
    try {
      return { output: vigenereCipher(input, key, mode), error: null as string | null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "変換に失敗しました" };
    }
  }, [input, key, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              mode === m
                ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"
            }
          >
            {m === "encode" ? "暗号化" : "復号"}
          </button>
        ))}
      </div>
      <div>
        <label className="tool-label">キー(英字)</label>
        <input type="text" className="tool-input font-mono" value={key} onChange={(e) => setKey(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">入力</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">結果</label>
            <CopyButton getText={() => output} />
          </div>
          <textarea className="tool-textarea" value={output} readOnly />
        </div>
      )}
    </div>
  );
}
