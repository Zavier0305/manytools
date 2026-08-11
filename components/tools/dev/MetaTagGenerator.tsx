"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("ページタイトル");
  const [description, setDescription] = useState("ページの説明文をここに入力します。");
  const [url, setUrl] = useState("https://example.com");
  const [image, setImage] = useState("https://example.com/ogp.png");

  const output = useMemo(
    () =>
      [
        `<title>${title}</title>`,
        `<meta name="description" content="${description}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        `<meta name="twitter:image" content="${image}" />`,
      ].join("\n"),
    [title, description, url, image]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="tool-label">タイトル</label>
          <input type="text" className="tool-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">URL</label>
          <input type="text" className="tool-input" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="tool-label">説明文</label>
        <textarea className="tool-textarea min-h-[4rem]" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">OGP画像URL</label>
        <input type="text" className="tool-input" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">生成されたタグ</label>
          <CopyButton getText={() => output} />
        </div>
        <textarea className="tool-textarea min-h-[12rem] font-mono text-sm" value={output} readOnly />
      </div>
    </div>
  );
}
