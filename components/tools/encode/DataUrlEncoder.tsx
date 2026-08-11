"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function DataUrlEncoder() {
  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    if (file.size > 2 * 1024 * 1024) {
      setError("2MB以下のファイルを選択してください");
      setDataUrl("");
      return;
    }
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">画像・ファイルを選択(2MBまで)</label>
        <input
          type="file"
          className="tool-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {dataUrl && (
        <div className="space-y-3">
          {dataUrl.startsWith("data:image/") && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt={fileName} className="mx-auto max-h-48 rounded-lg border border-slate-200" />
          )}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="tool-label mb-0">Data URL</label>
              <CopyButton getText={() => dataUrl} />
            </div>
            <textarea className="tool-textarea min-h-[8rem]" value={dataUrl} readOnly />
          </div>
        </div>
      )}
    </div>
  );
}
