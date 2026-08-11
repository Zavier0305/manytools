"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState("https://example.com");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataUrl("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(text, { width: 320, margin: 1 })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("QRコードの生成に失敗しました");
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト・URL</label>
        <textarea
          className="tool-textarea min-h-[6rem]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {dataUrl && (
        <div className="flex flex-col items-center gap-3 tool-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="生成されたQRコード" width={240} height={240} className="rounded-lg" />
          <a href={dataUrl} download="qrcode.png" className="btn-secondary">
            画像をダウンロード
          </a>
        </div>
      )}
    </div>
  );
}
