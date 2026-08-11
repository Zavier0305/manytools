"use client";

import { useMemo, useState } from "react";

export default function Base64ImagePreviewer() {
  const [input, setInput] = useState("");

  const src = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    return trimmed.startsWith("data:") ? trimmed : `data:image/png;base64,${trimmed}`;
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">Base64文字列(data:image/...から始まる場合はそのまま貼り付け)</label>
        <textarea className="tool-textarea min-h-[8rem] font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {src && (
        <div className="tool-panel flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="プレビュー"
            className="max-h-64 rounded-lg"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}
    </div>
  );
}
