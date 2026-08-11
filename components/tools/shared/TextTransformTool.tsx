"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export interface TransformMode {
  id: string;
  label: string;
}

export default function TextTransformTool({
  transform,
  modes,
  defaultMode,
  inputLabel = "入力",
  outputLabel = "結果",
  inputPlaceholder = "ここにテキストを入力してください",
  defaultInput = "",
  monospace = true,
}: {
  transform: (input: string, modeId: string) => string;
  modes?: TransformMode[];
  defaultMode?: string;
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  defaultInput?: string;
  monospace?: boolean;
}) {
  const [input, setInput] = useState(defaultInput);
  const [mode, setMode] = useState(defaultMode ?? modes?.[0]?.id ?? "");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null as string | null };
    try {
      return { output: transform(input, mode), error: null as string | null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "変換に失敗しました" };
    }
  }, [input, mode, transform]);

  return (
    <div className="space-y-4">
      {modes && modes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={
                mode === m.id
                  ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white"
                  : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              }
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div>
        <label className="tool-label">{inputLabel}</label>
        <textarea
          className={monospace ? "tool-textarea" : "tool-textarea font-sans"}
          placeholder={inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">{outputLabel}</label>
          <CopyButton getText={() => output} />
        </div>
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <textarea
            className={monospace ? "tool-textarea" : "tool-textarea font-sans"}
            value={output}
            readOnly
          />
        )}
      </div>
    </div>
  );
}
