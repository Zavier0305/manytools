"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { extractEmails, extractUrls } from "@/lib/text/moreText";

export default function ListExtractor({ config }: { config?: Record<string, unknown> }) {
  const kind = (config?.extractor as string) ?? "url";
  const [text, setText] = useState("");
  const results = useMemo(
    () => (kind === "email" ? extractEmails(text) : extractUrls(text)),
    [text, kind]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {results.length > 0 && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="tool-label mb-0">
              抽出結果({results.length}件)
            </label>
            <CopyButton getText={() => results.join("\n")} label="すべてコピー" />
          </div>
          <textarea className="tool-textarea min-h-[8rem]" value={results.join("\n")} readOnly />
        </div>
      )}
    </div>
  );
}
