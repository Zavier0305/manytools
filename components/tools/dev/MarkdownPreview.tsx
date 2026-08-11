"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const DEFAULT_MD = `# 見出し\n\nこれは **Markdown** プレビューツールです。\n\n- リスト項目1\n- リスト項目2\n\n\`\`\`js\nconsole.log("hello");\n\`\`\`\n`;

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [html, setHtml] = useState("");

  const rawHtml = useMemo(() => marked.parse(markdown, { async: false }) as string, [markdown]);

  useEffect(() => {
    // DOMPurify requires a browser DOM, so sanitizing must happen client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHtml(DOMPurify.sanitize(rawHtml));
  }, [rawHtml]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label className="tool-label">Markdown</label>
        <textarea
          className="tool-textarea min-h-[24rem]"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <div>
        <label className="tool-label">プレビュー</label>
        <div
          className="tool-panel markdown-body min-h-[24rem]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
